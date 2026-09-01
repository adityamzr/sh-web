import test from 'node:test'
import assert from 'node:assert/strict'
import { computed, ref, toValue } from 'vue'
import { loadTs } from './helpers/load-ts.mjs'
const articles = await loadTs('composables/useMediaArticles.ts')
const gallery = await loadTs('composables/useMediaGallery.ts')
const guides = await loadTs('composables/useMediaGuides.ts')
const locations = await loadTs('composables/useMediaLocations.ts')
const home = await loadTs('composables/useMediaHomeSettings.ts')
const page = await loadTs('composables/useMediaPageSettings.ts')
const fixture = { id: 7, title: 'English title', slug: 'english-slug', body: [{ type: 'paragraph', text: 'English body' }], localizedSlugs: { id: 'judul-id', en: 'english-slug' }, availableLocales: ['id', 'en'], category: 'Transportasi', city: 'MAKKAH' }

test('all fetchers forward locale and preserve semantic category/city codes', async t => {
  const calls = []
  t.mock.method(globalThis, 'fetch', globalThis.fetch)
  globalThis.$fetch = async (url, options) => { calls.push({ url, options }); return { data: url.includes('page-settings') ? { heroHeadline: null } : url.includes('/articles/') ? fixture : [fixture] } }
  t.after(() => { delete globalThis.$fetch })
  for (const locale of ['id', 'en']) {
    await articles.fetchMediaArticles({ city: 'makkah', category: 'Transportasi', search: 'train', locale: 'bad' }, locale)
    const article = await articles.fetchMediaArticle('english-slug', locale)
    assert.deepEqual(article.localizedSlugs, fixture.localizedSlugs)
    assert.deepEqual(article.body, fixture.body)
    await gallery.fetchMediaGallery({}, locale)
    await guides.fetchMediaGuides(locale)
    await locations.fetchMediaLocations('MAKKAH', locale)
    const settings = await home.fetchMediaHomeSettings(locale)
    assert.equal(settings.heroHeadline, null) // no Indonesian fallback in API adapter
    assert.ok(calls.slice(-6).every(call => call.options.query.locale === locale))
  }
  assert.equal(calls[0].options.query.category, 'Transportasi')
  assert.equal(calls[0].options.query.search, 'train')
  assert.ok(calls.every(call => call.url.startsWith('/api/media/') && !call.url.startsWith('/en')))
})
test('article and gallery normalization use localized fields without replacing editorial content', () => {
  const article = articles.normalizeArticle({ ...fixture, title: 'Panduan', body: [{ type: 'paragraph', text: 'Panduan' }] }, 'en')
  assert.equal(article.title, 'Panduan')
  assert.equal(article.body[0].text, 'Panduan')
  assert.equal(article.readingTime, '1 min read')
  const photo = gallery.normalizeGallery({ id: 1, title: 'English photo', altText: 'English alt', category: 'TRANSPORTASI', coordinates: { latitude: 21.4, longitude: 39.8 }, publishedAt: '2026-08-31' }, 'en')
  assert.equal(photo.alt, 'English alt')
  assert.equal(photo.category, 'Transportasi')
  assert.equal(photo.mapUrl, 'https://www.google.com/maps/search/?api=1&query=21.4,39.8')
  assert.equal(photo.date, '31 Aug 2026')
})
test('all async-data composables use locale-separated keys, including reactive article search', async t => {
  const locale = ref('en'), keys = [], query = ref({ search: 'train' })
  const states = new Map()
  Object.assign(globalThis, { computed, toValue, useLocale: () => ({ locale }), useState: key => { if (!states.has(key)) states.set(key, ref({ ready: false, data: null })); return states.get(key) }, createError: value => Object.assign(new Error(value.statusMessage), value), $fetch: async url => ({ data: url.includes('page-settings') ? {} : url.includes('/articles/') ? fixture : [] }), useAsyncData: async (key, handler) => { keys.push(key); return { data: ref(await handler()), pending: ref(false), error: ref(null) } } })
  t.after(() => { for (const key of ['computed', 'toValue', 'useLocale', 'useState', 'createError', '$fetch', 'useAsyncData']) delete globalThis[key] })
  await articles.useMediaArticles(query)
  await articles.useMediaArticle('english-slug')
  await gallery.useMediaGallery()
  await guides.useMediaGuides()
  await locations.useMediaLocations('MAKKAH')
  await home.useMediaHomeSettings()
  await page.useMediaPageSettings('makkah')
  assert.ok(keys.every(key => key.value.startsWith('media:en:')))
  const first = keys[0].value
  query.value = { search: 'bus' }
  assert.notEqual(keys[0].value, first)
  locale.value = 'id'
  assert.ok(keys.every(key => key.value.startsWith('media:id:')))
})
