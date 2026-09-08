import { fetchMediaArticle } from '~/composables/useMediaArticles'
import { localeFromPath, stripLocale, localePath } from '~/shared/localization'

export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig()
  const englishEnabled = config.public.englishEnabled === true

  // If English is enabled, allow bilingual behavior
  if (englishEnabled) return

  // When English disabled, redirect any /en URL to Indonesian equivalent with 302
  const rawLocale = localeFromPath(to.path)
  if (rawLocale !== 'en') return

  const basePath = stripLocale(to.path) || '/'
  const hash = to.hash || ''

  // Static route redirects: /en -> /, /en/makkah -> /makkah, etc.
  // For /artikel/:slug we need to resolve master article's Indonesian slug
  if (basePath.startsWith('/artikel/') && to.params.slug) {
    const enSlug = String(to.params.slug)
    try {
      // Try to fetch article by English slug
      const article = await fetchMediaArticle(enSlug, 'en').catch(() => null)
      if (article) {
        const idSlug = (article as any).localizedSlugs?.id || (article as any).localizedSlugs?.['id']
        // If Indonesian slug exists and differs, redirect to it
        if (idSlug && idSlug !== enSlug) {
          return navigateTo(localePath('/artikel/' + idSlug, 'id') + hash, { redirectCode: 302 })
        }
        // If same slug or no alternate, redirect to Indonesian version of same slug
        if (idSlug) {
          return navigateTo(localePath('/artikel/' + idSlug, 'id') + hash, { redirectCode: 302 })
        }
        // Fallback: if article has id slug via available data, try to use it
        // If we have article but no id slug, redirect to its id path if possible
        return navigateTo(localePath('/artikel/' + enSlug, 'id') + hash, { redirectCode: 302 })
      }

      // If English slug not found, try Indonesian slug directly (maybe user typed Indonesian slug under /en)
      const idArticle = await fetchMediaArticle(enSlug, 'id').catch(() => null)
      if (idArticle) {
        return navigateTo(localePath('/artikel/' + idArticle.slug, 'id') + hash, { redirectCode: 302 })
      }

      // Safe fallback: cannot resolve, redirect to article discovery
      return navigateTo('/hari-ini', { redirectCode: 302 })
    } catch {
      return navigateTo('/hari-ini', { redirectCode: 302 })
    }
  }

  // For /panduan with hash that may be English guide slug, try to resolve Indonesian guide
  // To keep centralized and avoid heavy logic, redirect to basePath (stripLocale) which is /panduan
  // Hash preservation is safe for guides
  if (basePath.startsWith('/panduan')) {
    // Preserve hash if present (e.g., /en/panduan#some-guide -> /panduan#some-guide)
    // The panduan page itself will handle hash scrolling, and content links will be Indonesian
    return navigateTo(basePath + hash, { redirectCode: 302 })
  }

  // For all other static routes: /en -> /, /en/makkah -> /makkah, etc.
  // Preserve hash, drop query for safety (avoid forwarding arbitrary params)
  const target = basePath + hash
  // Avoid redirect loop: if target is same as current path, skip
  if (target === to.path) return
  return navigateTo(target || '/', { redirectCode: 302 })
})
