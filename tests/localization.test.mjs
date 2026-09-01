import test from 'node:test'
import assert from 'node:assert/strict'
import { loadTs } from './helpers/load-ts.mjs'
const { localeFromPath, stripLocale, localePath, translate, mediaCacheKey, formatMediaDate, absolutePageUrl } = await loadTs('shared/localization.ts')
const { resolveGuideTopic } = await loadTs('shared/guide-localization.ts')
const { legalEnglish } = await loadTs('shared/legal-en.ts')

test('default Indonesia and English prefix boundaries', () => {
  for (const path of ['/', '/artikel/foo', '/english', '/enough']) assert.equal(localeFromPath(path), 'id')
  for (const path of ['/en', '/en/', '/en?x=1', '/en/panduan#transport']) assert.equal(localeFromPath(path), 'en')
  assert.equal(stripLocale('/en?x=1'), '/?x=1')
})
test('localized paths round-trip without duplicate prefixes and retain filters/hash', () => {
  for (const path of ['/', '/makkah', '/panduan#transport', '/hari-ini?category=Transportasi']) {
    assert.equal(localePath(localePath(path, 'en'), 'id'), path)
    assert.equal(localePath(localePath(path, 'en'), 'en'), localePath(path, 'en'))
  }
  assert.equal(localePath('/?search=train', 'en'), '/en?search=train')
})
test('external links, anchors, assets and API paths never receive a language prefix', () => {
  for (const path of ['https://tour.sudutharamain.id', '//example.com', '#map', 'mailto:hello@example.com', '/api/media/articles', '/images/x.jpg', '/_nuxt/x.js', '/assets/x']) assert.equal(localePath(path, 'en'), path)
})
test('locale cache keys isolate data and normalize query ordering', () => {
  assert.notEqual(mediaCacheKey('articles', 'id'), mediaCacheKey('articles', 'en'))
  assert.notEqual(mediaCacheKey('article', 'en', { slug: 'one' }), mediaCacheKey('article', 'en', { slug: 'two' }))
  assert.equal(mediaCacheKey('articles', 'en', { city: 'makkah', limit: 10, search: undefined }), mediaCacheKey('articles', 'en', { limit: 10, city: 'makkah' }))
})
test('UI translation preserves Indonesian and interpolates English safely', () => {
  assert.equal(translate('id', 'Panduan'), 'Panduan')
  assert.equal(translate('en', 'Panduan'), 'Guides')
  assert.equal(translate('en', '{minutes} menit baca', { minutes: 3 }), '3 min read')
  for (const value of ['Editorial text', 'constructor', '__proto__', 'toString']) assert.equal(translate('en', value), value)
  assert.equal(translate('en', null), '')
})
test('date formatting is locale-aware and uses the same timezone during SSR/hydration', () => {
  assert.equal(formatMediaDate('2026-08-30T22:00:00Z', 'id'), '31 Agu 2026')
  assert.equal(formatMediaDate('2026-08-30T22:00:00Z', 'en'), '31 Aug 2026')
  assert.equal(formatMediaDate('invalid', 'en'), '—')
})
test('SEO URLs strip query/hash/trailing slash', () => {
  assert.equal(absolutePageUrl('https://sudutharamain.id/', '/en/panduan/?x=1#topic'), 'https://sudutharamain.id/en/panduan')
  assert.equal(absolutePageUrl('https://sudutharamain.id', '/'), 'https://sudutharamain.id/')
})
test('guide localized hash resolves by stable ID, not another article with a similar slug', () => {
  const id = [{ id: 1, slug: 'kereta' }, { id: 2, slug: 'bus' }]
  const en = [{ id: 1, slug: 'train' }]
  assert.equal(resolveGuideTopic(en, id, '#kereta').topic.slug, 'train')
  assert.equal(resolveGuideTopic(en, id, '#kereta').unavailable, false)
  assert.equal(resolveGuideTopic(en, id, '#bus').unavailable, true)
  assert.equal(resolveGuideTopic([], id, '#kereta').topic, null)
  assert.equal(resolveGuideTopic(en, id, '#%').unavailable, true)
  assert.equal(resolveGuideTopic(en, id, '').unavailable, false)
  assert.equal(resolveGuideTopic(en, [{ id: 2, slug: 'train' }], '#train').topic.id, 1)
})
test('English legal/about copies retain all existing sections and stable IDs', () => {
  assert.equal(legalEnglish.about.length, 6)
  assert.equal(legalEnglish.privacy.length, 9)
  assert.equal(legalEnglish.terms.length, 12)
  for (const sections of Object.values(legalEnglish)) {
    assert.equal(new Set(sections.map(section => section.id)).size, sections.length)
    for (const section of sections) assert.ok(section.title && (section.paragraphs?.length || section.bullets?.length))
  }
})
