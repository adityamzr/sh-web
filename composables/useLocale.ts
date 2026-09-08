import { localeFromPath, localePath as pathForLocale, stripLocale, translate, type SupportedLocale } from '~/shared/localization'
import { usePublicLocalization } from '~/composables/usePublicLocalization'

export function useLocale() {
  const route = useRoute()
  const { englishEnabled } = usePublicLocalization()
  const rawLocale = computed(() => localeFromPath(route.path))
  // When English is disabled, force public locale to id to avoid stale preference and ensure Indonesian-only UI
  const locale = computed<SupportedLocale>(() => {
    if (!englishEnabled.value && rawLocale.value === 'en') return 'id'
    return rawLocale.value
  })
  const basePath = computed(() => stripLocale(route.path))
  const t = (value: unknown, params?: Record<string, string | number>) => translate(locale.value, value, params)
  const localePath = (path: string, target: SupportedLocale = locale.value) => {
    // When English disabled, never generate /en links for public navigation
    if (!englishEnabled.value && target === 'en') {
      return pathForLocale(path, 'id')
    }
    return pathForLocale(path, target)
  }
  return { locale, basePath, t, localePath, rawLocale }
}

type ContentLinks = { key: string; paths: Partial<Record<SupportedLocale, string>>; fallback?: Partial<Record<SupportedLocale, string>> }
export function useContentLocaleLinks() {
  return useState<ContentLinks | null>('media-content-locale-links', () => null)
}
export function useLanguageSwitch() {
  const route = useRoute()
  const { locale, localePath, t } = useLocale()
  const content = useContentLocaleLinks()
  const target = computed<SupportedLocale>(() => locale.value === 'id' ? 'en' : 'id')
  // Hashes are not sent to SSR. Add them only after hydration.
  const clientHash = ref('')
  onMounted(() => { clientHash.value = route.hash })
  watch(() => route.hash, hash => { clientHash.value = hash })
  const current = computed(() => content.value?.key === route.path ? content.value : null)
  const unavailable = computed(() => Boolean(current.value && !current.value.paths[target.value]))
  const href = computed(() => current.value
    ? current.value.paths[target.value] ?? current.value.fallback?.[target.value] ?? localePath('/hari-ini?translation=unavailable', target.value)
    : localePath(route.fullPath.split('#')[0], target.value) + clientHash.value)
  return { locale, target, href, unavailable, t }
}
