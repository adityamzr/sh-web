import { fetchMediaArticle } from '~/composables/useMediaArticles'
import { fetchMediaGuides } from '~/composables/useMediaGuides'
import { setMediaPreload } from '~/composables/useMediaPreload'
import { localeFromPath, localePath, mediaCacheKey, stripLocale, type SupportedLocale } from '~/shared/localization'

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig()
  const englishEnabled = config.public.englishEnabled === true
  const locale = localeFromPath(to.path)
  const basePath = stripLocale(to.path)
  const content = useContentLocaleLinks()
  content.value = null

  // When English disabled, redirect any /en access to Indonesian with 302 (temporary)
  if (!englishEnabled && locale === 'en') {
    // Handle article slug redirect via master article
    if (basePath.startsWith('/artikel/') && to.params.slug) {
      const enSlug = String(to.params.slug)
      try {
        const enArticle = await fetchMediaArticle(enSlug, 'en').catch(() => null)
        if (enArticle) {
          const idSlug = (enArticle as any).localizedSlugs?.id || (enArticle as any).slug
          if (idSlug) {
            return navigateTo(localePath('/artikel/' + idSlug, 'id'), { redirectCode: 302 })
          }
        }
        const idArticle = await fetchMediaArticle(enSlug, 'id').catch(() => null)
        if (idArticle) {
          return navigateTo(localePath('/artikel/' + idArticle.slug, 'id'), { redirectCode: 302 })
        }
      } catch {}
      return navigateTo('/hari-ini', { redirectCode: 302 })
    }
    // For other routes, strip locale and preserve hash
    const hash = (to as any).hash || ''
    const target = (basePath || '/') + hash
    return navigateTo(target, { redirectCode: 302 })
  }

  // Client-side navigation must never wait for CMS lookups. Pages populate the
  // localized content links after their lazy data has arrived. Keep resolving
  // them during SSR so canonical/hreflang output remains complete.
  if (import.meta.client) return

  // Resolve alternate slugs BEFORE the navbar renders, including SSR.
  // The page reuses these async-data entries rather than issuing a second request.
  if (basePath.startsWith('/artikel/') && to.params.slug) {
    const slug = String(to.params.slug)
    const articleKey = mediaCacheKey('article', locale, { slug })
    let article = null
    let articleStatus: number | undefined
    try { article = await fetchMediaArticle(slug, locale) } catch (error: any) { articleStatus = error?.statusCode || error?.response?.status || 500 }
    setMediaPreload(articleKey, article, articleStatus)
    let idSlug: string | undefined
    if (!article && locale === 'en' && articleStatus === 404) {
      const original = await fetchMediaArticle(slug, 'id').catch(() => null)
      idSlug = original?.slug
      if (original?.localizedSlugs?.en && englishEnabled) return navigateTo(localePath('/artikel/' + original.localizedSlugs.en, 'en'), { redirectCode: 302 })
    }
    const rawPaths = article
      ? Object.fromEntries(Object.entries(article.localizedSlugs ?? { [locale]: slug }).filter(([, value]) => value).map(([language, value]) => [language, localePath('/artikel/' + value, language as SupportedLocale)]))
      : idSlug ? { id: localePath('/artikel/' + idSlug, 'id') } : {}
    const publicPaths = englishEnabled ? rawPaths : { id: rawPaths.id || localePath('/artikel/' + slug, 'id') }
    content.value = {
      key: to.path,
      paths: publicPaths,
      fallback: { id: idSlug ? localePath('/artikel/' + idSlug, 'id') : '/hari-ini', en: '/en/hari-ini?translation=unavailable' },
    }
  } else if (basePath === '/panduan' || basePath === '/panduan/') {
    const alternate = locale === 'id' ? 'en' : 'id'
    const currentKey = mediaCacheKey('guides', locale), alternateKey = 'guide-alternates-' + alternate
    const [guides, alternates] = await Promise.all([
      fetchMediaGuides(locale).catch(() => []),
      englishEnabled ? fetchMediaGuides(alternate).catch(() => []) : Promise.resolve([] as any[]),
    ])
    setMediaPreload(currentKey, guides); setMediaPreload(alternateKey, alternates)
    const first = guides[0], translated = alternates.find((guide: any) => guide.id === first?.id)
    content.value = {
      key: to.path,
      paths: englishEnabled
        ? { [locale]: localePath('/panduan', locale) + (first ? '#' + first.slug : ''), ...(translated ? { [alternate]: localePath('/panduan', alternate) + '#' + translated.slug } : {}) }
        : { id: localePath('/panduan', 'id') + (first ? '#' + first.slug : '') },
      fallback: { [alternate]: localePath('/panduan?translation=unavailable', alternate) },
    }
  }
})
