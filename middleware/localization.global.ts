import { fetchMediaArticle } from '~/composables/useMediaArticles'
import { fetchMediaGuides } from '~/composables/useMediaGuides'
import { setMediaPreload } from '~/composables/useMediaPreload'
import { localeFromPath, localePath, mediaCacheKey, stripLocale, type SupportedLocale } from '~/shared/localization'

export default defineNuxtRouteMiddleware(async (to) => {
  const locale = localeFromPath(to.path)
  const basePath = stripLocale(to.path)
  const content = useContentLocaleLinks()
  content.value = null
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
      if (original?.localizedSlugs?.en) return navigateTo(localePath('/artikel/' + original.localizedSlugs.en, 'en'), { redirectCode: 302 })
    }
    content.value = {
      key: to.path,
      paths: article
        ? Object.fromEntries(Object.entries(article.localizedSlugs ?? { [locale]: slug }).filter(([, value]) => value).map(([language, value]) => [language, localePath('/artikel/' + value, language as SupportedLocale)]))
        : idSlug ? { id: localePath('/artikel/' + idSlug, 'id') } : {},
      fallback: { id: idSlug ? localePath('/artikel/' + idSlug, 'id') : '/hari-ini', en: '/en/hari-ini?translation=unavailable' },
    }
  } else if (basePath === '/panduan' || basePath === '/panduan/') {
    const alternate = locale === 'id' ? 'en' : 'id'
    const currentKey = mediaCacheKey('guides', locale), alternateKey = 'guide-alternates-' + alternate
    const [guides, alternates] = await Promise.all([fetchMediaGuides(locale).catch(() => []), fetchMediaGuides(alternate).catch(() => [])])
    setMediaPreload(currentKey, guides); setMediaPreload(alternateKey, alternates)
    const first = guides[0], translated = alternates.find(guide => guide.id === first?.id)
    content.value = {
      key: to.path,
      paths: { [locale]: localePath('/panduan', locale) + (first ? '#' + first.slug : ''), ...(translated ? { [alternate]: localePath('/panduan', alternate) + '#' + translated.slug } : {}) },
      fallback: { [alternate]: localePath('/panduan?translation=unavailable', alternate) },
    }
  }
})
