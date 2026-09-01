import { createServer } from 'node:http'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { setTimeout as delay } from 'node:timers/promises'

const article = (id, locale) => ({
  id, slug: id === 2 ? 'hanya-indonesia' : locale === 'en' ? 'english-transport' : 'transportasi-indonesia',
  title: locale === 'en' ? 'English transport article' : 'Artikel transportasi Indonesia',
  excerpt: locale === 'en' ? 'EN_EXCERPT fixture' : 'ID_EXCERPT fixture',
  body: [{ type: 'paragraph', text: locale === 'en' ? 'EN_BODY fixture' : 'ID_BODY fixture' }, { type: 'heading', level: 2, text: locale === 'en' ? 'English heading' : 'Judul bagian' }, { type: 'list', items: [locale === 'en' ? 'English list item' : 'Daftar Indonesia'] }],
  city: 'MAKKAH', category: 'Transportasi', tags: [], contentType: 'article',
  publishedAt: '2026-08-31T00:00:00Z', heroImage: '/images/makkah-editorial.jpg', heroImageAlt: locale === 'en' ? 'English image alt' : 'Alt Indonesia',
  availableLocales: id === 2 ? ['id'] : ['id', 'en'], localizedSlugs: id === 2 ? { id: 'hanya-indonesia' } : { id: 'transportasi-indonesia', en: 'english-transport' },
})

export async function startFixtureApp({ port = 0 } = {}) {
  const requests = [], state = { empty: false, fail: false }, logs = []
  const api = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://fixture.local'), locale = url.searchParams.get('locale') || 'id'
    let body = ''
    for await (const chunk of req) body += chunk
    requests.push({ path: url.pathname, query: Object.fromEntries(url.searchParams), method: req.method, body })
    res.setHeader('Content-Type', 'application/json')
    const send = (data, status = 200) => { res.statusCode = status; res.end(JSON.stringify(status === 200 ? { data } : { statusCode: status, statusMessage: data })) }
    if (!['id', 'en'].includes(locale)) return send('Unsupported locale', 400)
    if (state.fail) return send('Fixture unavailable', 503)
    const path = url.pathname.replace('/api/v1/media', '')
    if (req.method === 'POST') return send({ id: 1, success: true })
    if (path === '/articles') {
      const list = state.empty ? [] : locale === 'en' ? [article(1, locale)] : [article(1, locale), article(2, locale)]
      return send(list.filter(item => !url.searchParams.get('search') || `${item.title} ${item.excerpt}`.toLowerCase().includes(url.searchParams.get('search').toLowerCase())))
    }
    if (path.startsWith('/articles/')) {
      const slug = decodeURIComponent(path.slice('/articles/'.length))
      const item = [article(1, locale), ...(locale === 'id' ? [article(2, locale)] : [])].find(item => item.slug === slug)
      return item ? send(item) : send('Article not found', 404)
    }
    if (path === '/guides') return send(state.empty ? [] : [
      { id: 10, slug: locale === 'en' ? 'train-guide' : 'panduan-kereta', title: locale === 'en' ? 'Train guide' : 'Panduan kereta', summary: locale === 'en' ? 'English guide summary' : 'Ringkasan Indonesia', group: 'TRANSPORTASI', body: [{ type: 'paragraph', text: locale === 'en' ? 'EN_GUIDE_BODY' : 'ID_GUIDE_BODY' }], sortOrder: 0 },
      ...(locale === 'id' ? [{ id: 11, slug: 'panduan-bus', title: 'Panduan bus', group: 'TRANSPORTASI', body: [{ type: 'paragraph', text: 'ID_ONLY_GUIDE' }], sortOrder: 1 }] : []),
    ])
    if (path === '/gallery') return send(state.empty ? [] : [{ id: 20, city: 'MAKKAH', title: locale === 'en' ? 'English photo' : 'Foto Indonesia', altText: locale === 'en' ? 'English photo alt' : 'Alt foto Indonesia', description: locale === 'en' ? 'EN_PHOTO_DESCRIPTION' : 'ID_PHOTO_DESCRIPTION', imageUrl: '/images/makkah-editorial.jpg', locationName: locale === 'en' ? 'English station' : 'Stasiun Indonesia', category: 'TRANSPORTASI', coordinates: { latitude: 21.42, longitude: 39.82 }, publishedAt: '2026-08-31' }])
    if (path === '/locations') return send(state.empty ? [] : [{ id: 30, name: locale === 'en' ? 'English station' : 'Stasiun Indonesia', shortDescription: locale === 'en' ? 'EN_LOCATION_DESCRIPTION' : 'ID_LOCATION_DESCRIPTION', city: url.searchParams.get('city') || 'MAKKAH', category: 'TRANSPORTASI', latitude: 21.42, longitude: 39.82 }])
    if (path.startsWith('/page-settings/')) return send({ heroImageUrl: '/images/makkah-editorial.jpg', heroHeadline: locale === 'en' ? null : 'ID_HOME_HEADLINE', heroSubheadline: null, heroTopicOverride: null, featuredArticleId: 1, supportingArticleIds: [], editorialArticleIds: [1], translationAvailable: locale === 'id' })
    send('Unknown fixture route', 404)
  })
  api.listen(0, '127.0.0.1'); await once(api, 'listening')
  const apiUrl = `http://127.0.0.1:${api.address().port}`
  if (!port) {
    const probe = createServer(); probe.listen(0, '127.0.0.1'); await once(probe, 'listening')
    port = probe.address().port; await new Promise(resolve => probe.close(resolve))
  }
  const app = spawn(process.execPath, ['.output/server/index.mjs'], { cwd: new URL('../..', import.meta.url), env: { ...process.env, HOST: '0.0.0.0', PORT: String(port), NUXT_API_BASE_URL: apiUrl, NUXT_PUBLIC_SITE_URL: 'https://sudutharamain.id' }, stdio: ['ignore', 'pipe', 'pipe'] })
  app.stdout.on('data', chunk => logs.push(String(chunk)))
  app.stderr.on('data', chunk => logs.push(String(chunk)))
  const origin = `http://127.0.0.1:${port}`
  const close = async () => {
    if (app.exitCode === null) { app.kill(); await once(app, 'exit') }
    api.closeAllConnections(); await new Promise(resolve => api.close(resolve))
  }
  try {
    for (let attempt = 0; attempt < 150; attempt++) {
      if (app.exitCode !== null) throw new Error(logs.join(''))
      try { if ((await fetch(origin + '/api/media/articles')).ok) return { origin, apiUrl, requests, state, logs, close } } catch {}
      await delay(100)
    }
    throw new Error('Fixture app did not start: ' + logs.join(''))
  } catch (error) { await close(); throw error }
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const fixture = await startFixtureApp({ port: Number(process.env.FIXTURE_PORT || 3103) })
  console.log('Fixture app:', fixture.origin)
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await fixture.close(); process.exit(0) })
}
