import { before, after, test } from 'node:test'
import assert from 'node:assert/strict'
import { startFixtureApp } from '../helpers/fixture-app.mjs'
let app
before(async () => { app = await startFixtureApp() })
after(async () => { await app?.close() })
const routes = ['/', '/hari-ini', '/makkah', '/madinah', '/panduan', '/visual', '/tentang-kami', '/kebijakan-privasi', '/syarat-ketentuan']
const rendered = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, '')
for (const locale of ['id', 'en']) for (const route of [...routes, locale === 'en' ? '/artikel/english-transport' : '/artikel/transportasi-indonesia']) {
  const path = locale === 'en' ? '/en' + (route === '/' ? '' : route) : route
  test(`SSR ${path}: language, canonical, navigation and isolated content`, async () => {
    const response = await fetch(app.origin + path)
    const html = await response.text(), visible = rendered(html)
    assert.equal(response.status, 200, html.slice(0, 400))
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`))
    assert.ok(html.includes(`rel="canonical" href="https://sudutharamain.id${path}"`), 'self canonical')
    assert.ok(html.includes('hreflang="id"') && html.includes('hreflang="en"') && html.includes('hreflang="x-default"'))
    assert.ok(html.includes(`href="${locale === 'en' ? '/en' : ''}/panduan"`))
    assert.ok(!html.includes(app.apiUrl), 'private API URL must not be in rendered HTML or payload')
    if (locale === 'en') assert.doesNotMatch(visible, /ID_BODY|ID_EXCERPT|ID_GUIDE_BODY|ID_PHOTO_DESCRIPTION|ID_LOCATION_DESCRIPTION|ID_HOME_HEADLINE|>Panduan<|>Tentang Kami<|>Kirim kontribusi</)
    if (route.startsWith('/artikel')) {
      assert.ok(visible.includes(locale === 'en' ? 'EN_BODY fixture' : 'ID_BODY fixture'))
      assert.ok(html.includes('href="/en/artikel/english-transport"') || html.includes('href="/artikel/transportasi-indonesia"'))
      assert.ok(html.includes('https://sudutharamain.id/en/artikel/english-transport'))
    }
  })
}
test('all public GET proxies forward English including article detail and page settings', async () => {
  for (const path of ['/articles', '/articles/english-transport', '/guides', '/gallery', '/locations', '/page-settings/home', '/page-settings/makkah']) {
    const response = await fetch(app.origin + '/api/media' + path + '?locale=en&city=MAKKAH&search=English')
    assert.equal(response.status, 200)
    const upstream = app.requests.at(-1)
    assert.equal(upstream.query.locale, 'en', path)
    assert.equal(upstream.query.search, 'English', path)
  }
  assert.equal((await fetch(app.origin + '/api/media/articles?locale=ar')).status, 400)
})
test('English search is sent to backend and results are locale-aware', async () => {
  const html = rendered(await (await fetch(app.origin + '/en/hari-ini?search=English')).text())
  assert.ok(html.includes('English transport article'))
  assert.ok(app.requests.some(request => request.query.locale === 'en' && request.query.search === 'English'))
  assert.ok(!html.includes('Artikel transportasi Indonesia'))
})
test('missing EN detail is 404/noindex, links to ID and never renders ID body', async () => {
  const response = await fetch(app.origin + '/en/artikel/hanya-indonesia')
  const html = await response.text(), visible = rendered(html)
  assert.equal(response.status, 404)
  assert.ok(html.includes('noindex,follow'))
  assert.ok(visible.includes('href="/artikel/hanya-indonesia"'))
  assert.ok(!visible.includes('ID_BODY'))
  assert.ok(!html.includes('hreflang="en"'))
})
test('ID article without complete EN switches to explicit English listing fallback', async () => {
  const html = await (await fetch(app.origin + '/artikel/hanya-indonesia')).text()
  assert.ok(html.includes('/en/hari-ini?translation=unavailable'))
  assert.ok(!html.includes('hreflang="en" href="https://sudutharamain.id/en/artikel/'))
})
test('English URL using ID slug redirects to localized EN slug', async () => {
  const response = await fetch(app.origin + '/en/artikel/transportasi-indonesia', { redirect: 'manual' })
  assert.equal(response.status, 302)
  assert.equal(response.headers.get('location'), '/en/artikel/english-transport')
})
test('feedback and contribution proxies retain payload and master slug resolution contract', async () => {
  for (const slug of ['transportasi-indonesia', 'english-transport']) {
    const response = await fetch(app.origin + '/api/media/articles/' + slug + '/feedback', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ value: 'HELPFUL' }) })
    assert.equal(response.status, 200)
    assert.equal(app.requests.at(-1).path, '/api/v1/media/articles/' + slug + '/feedback')
    assert.deepEqual(JSON.parse(app.requests.at(-1).body), { value: 'HELPFUL' })
  }
  const payload = { type: 'LOCATION', city: 'MAKKAH', message: 'Synthetic test only', sourcePage: '/en/makkah' }
  assert.equal((await fetch(app.origin + '/api/media/contributions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })).status, 200)
  assert.deepEqual(JSON.parse(app.requests.at(-1).body), payload)
})
test('empty English dataset keeps localized defaults and empty states', async () => {
  app.state.empty = true
  try {
    for (const path of ['/en', '/en/hari-ini', '/en/panduan', '/en/visual', '/en/makkah', '/en/madinah']) {
      const response = await fetch(app.origin + path), visible = rendered(await response.text())
      assert.equal(response.status, 200)
      assert.doesNotMatch(visible, /ID_BODY|ID_GUIDE_BODY|ID_HOME_HEADLINE/)
      if (path === '/en/panduan') assert.ok(visible.includes('href="/panduan"'))
    }
  } finally { app.state.empty = false }
})
test('unknown English route is localized and noindex', async () => {
  const response = await fetch(app.origin + '/en/does-not-exist', { headers: { Accept: 'text/html' } }), html = await response.text()
  assert.equal(response.status, 404)
  assert.ok(html.includes('lang="en"') && html.includes('Page not found.') && html.includes('noindex,follow'))
})
test('upstream failures preserve status without leaking private API host or showing ID content', async () => {
  app.state.fail = true
  try {
    const response = await fetch(app.origin + '/en/artikel/english-transport'), html = await response.text()
    assert.equal(response.status, 503)
    assert.ok(html.includes('noindex,follow'))
    assert.ok(!html.includes(app.apiUrl))
    assert.ok(!rendered(html).includes('ID_BODY'))
  } finally { app.state.fail = false }
})
test('middleware and page share article async data instead of fetching detail twice', async () => {
  const start = app.requests.length
  await fetch(app.origin + '/en/artikel/english-transport')
  assert.equal(app.requests.slice(start).filter(request => request.path === '/api/v1/media/articles/english-transport').length, 1)
})
test('middleware and Panduan page share both locale datasets', async () => {
  const start = app.requests.length
  await fetch(app.origin + '/en/panduan')
  const requests = app.requests.slice(start).filter(request => request.path === '/api/v1/media/guides')
  assert.equal(requests.length, 2)
  assert.deepEqual(requests.map(request => request.query.locale).sort(), ['en', 'id'])
})
