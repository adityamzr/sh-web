import { absolutePageUrl, localePath, stripLocale } from '~/shared/localization'
import { usePublicLocalization } from '~/composables/usePublicLocalization'

export function useLocaleSeo() {
  const route = useRoute()
  const { locale } = useLocale()
  const { englishEnabled } = usePublicLocalization()
  const content = useContentLocaleLinks()
  const config = useRuntimeConfig()
  useHead(() => {
    const rawPaths = content.value?.key === route.path && stripLocale(route.path).startsWith('/artikel/')
      ? content.value.paths
      : { id: localePath(route.path, 'id'), en: localePath(route.path, 'en') }

    // When English disabled, do not advertise English alternates
    const paths = englishEnabled.value
      ? rawPaths
      : { id: rawPaths.id }

    const absolute = (path: string) => absolutePageUrl(config.public.siteUrl, path)
    // Ensure canonical is always Indonesian when English disabled
    const canonicalPath = englishEnabled.value ? route.path : stripLocale(route.path) || '/'
    return {
      htmlAttrs: { lang: englishEnabled.value ? locale.value : 'id' },
      link: [
        { key: 'canonical', rel: 'canonical', href: absolute(canonicalPath) },
        ...Object.entries(paths).filter(([, path]) => path).map(([lang, path]) => ({ key: `alternate-${lang}`, rel: 'alternate', hreflang: lang, href: absolute(path!) })),
        ...(paths.id ? [{ key: 'alternate-default', rel: 'alternate', hreflang: 'x-default', href: absolute(paths.id) }] : []),
      ],
      meta: [
        { property: 'og:locale', content: englishEnabled.value && locale.value === 'en' ? 'en_GB' : 'id_ID' },
        { property: 'og:url', content: absolute(canonicalPath) },
        { property: 'og:site_name', content: 'Sudut Haramain' },
      ],
    }
  })
}
