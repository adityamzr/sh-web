import { localeFromPath, localePath as pathForLocale, stripLocale, translate, type SupportedLocale } from '~/shared/localization'

export function useLocale() {
  const route = useRoute()
  const locale = computed(() => localeFromPath(route.path))
  const basePath = computed(() => stripLocale(route.path))
  const t = (value: unknown, params?: Record<string, string | number>) => translate(locale.value, value, params)
  const localePath = (path: string, target: SupportedLocale = locale.value) => pathForLocale(path, target)
  return { locale, basePath, t, localePath }
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
