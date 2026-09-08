import { localePath } from '~/shared/localization'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = (config.public.siteUrl as string) || 'https://sudutharamain.id'
  const englishEnabled = config.public.englishEnabled === true

  const staticRoutes = [
    '/',
    '/hari-ini',
    '/makkah',
    '/madinah',
    '/visual',
    '/panduan',
    '/tentang-kami',
    '/kebijakan-privasi',
    '/syarat-ketentuan',
  ]

  // Build list of paths
  let paths: string[] = [...staticRoutes]
  if (englishEnabled) {
    const enStatic = staticRoutes.map((p) => localePath(p, 'en'))
    paths = [...paths, ...enStatic]
  }

  // Try to include articles
  try {
    const idRes = await $fetch<{ data: any[] }>('/api/media/articles', { query: { locale: 'id', limit: 1000 } }).catch(() => ({ data: [] }))
    const idArticles = idRes.data || []
    for (const art of idArticles) {
      if (art?.slug) paths.push(`/artikel/${art.slug}`)
    }
    if (englishEnabled) {
      const enRes = await $fetch<{ data: any[] }>('/api/media/articles', { query: { locale: 'en', limit: 1000 } }).catch(() => ({ data: [] }))
      const enArticles = enRes.data || []
      for (const art of enArticles) {
        if (art?.slug) paths.push(`/en/artikel/${art.slug}`)
      }
    }
  } catch {}

  // Ensure no /en paths when disabled
  if (!englishEnabled) {
    paths = paths.filter((p) => !p.startsWith('/en'))
  }

  // Deduplicate
  paths = [...new Set(paths)]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${siteUrl}${p}</loc></url>`).join('\n')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
