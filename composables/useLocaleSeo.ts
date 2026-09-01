import { absolutePageUrl, localePath, stripLocale } from '~/shared/localization'

export function useLocaleSeo() {
  const route = useRoute()
  const { locale } = useLocale()
  const content = useContentLocaleLinks()
  const config = useRuntimeConfig()
  useHead(() => {
    const paths = content.value?.key === route.path && stripLocale(route.path).startsWith('/artikel/')
      ? content.value.paths
      : { id: localePath(route.path, 'id'), en: localePath(route.path, 'en') }
    const absolute = (path: string) => absolutePageUrl(config.public.siteUrl, path)
    return {
      htmlAttrs: { lang: locale.value },
      link: [
        { key: 'canonical', rel: 'canonical', href: absolute(route.path) },
        ...Object.entries(paths).filter(([, path]) => path).map(([lang, path]) => ({ key: `alternate-${lang}`, rel: 'alternate', hreflang: lang, href: absolute(path!) })),
        ...(paths.id ? [{ key: 'alternate-default', rel: 'alternate', hreflang: 'x-default', href: absolute(paths.id) }] : []),
      ],
      meta: [
        { property: 'og:locale', content: locale.value === 'en' ? 'en_GB' : 'id_ID' },
        { property: 'og:url', content: absolute(route.path) },
        { property: 'og:site_name', content: 'Sudut Haramain' },
      ],
    }
  })
}
