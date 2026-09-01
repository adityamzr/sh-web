import { englishMessages } from './messages'

export const SUPPORTED_LOCALES = ['id', 'en'] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]
export const DEFAULT_LOCALE: SupportedLocale = 'id'
export const localeFromPath = (path: string): SupportedLocale => /^\/en(?:[/?#]|$)/.test(path) ? 'en' : 'id'
export function stripLocale(path: string) {
  const result = path.replace(/^\/en(?=\/|\?|#|$)/, '')
  return !result || /^[?#]/.test(result) ? '/' + result : result
}
export function localePath(path: string, locale: SupportedLocale) {
  // External links, anchors, assets and API URLs must never receive a locale prefix.
  if (!path.startsWith('/') || path.startsWith('//') || /^\/(?:api|images|assets|_nuxt)(?:\/|$)/.test(path)) return path
  const bare = stripLocale(path)
  return locale === 'id' ? bare : bare === '/' ? '/en' : /^\/[?#]/.test(bare) ? '/en' + bare.slice(1) : '/en' + bare
}
export function translate(locale: SupportedLocale, value: unknown, params: Record<string, string | number> = {}) {
  const source = value == null ? '' : String(value)
  const text = locale === 'en' && Object.hasOwn(englishMessages, source) ? englishMessages[source]! : source
  return text.replace(/\{(\w+)\}/g, (match, key) => Object.hasOwn(params, key) ? String(params[key]) : match)
}
export function mediaCacheKey(resource: string, locale: SupportedLocale, query: Record<string, unknown> = {}) {
  const sorted = Object.fromEntries(Object.entries(query).filter(([, value]) => value !== undefined).sort(([a], [b]) => a.localeCompare(b)))
  return `media:${locale}:${resource}:${JSON.stringify(sorted)}`
}
export function formatMediaDate(value: string | null | undefined, locale: SupportedLocale) {
  if (!value || Number.isNaN(new Date(value).getTime())) return '—'
  return new Date(value).toLocaleDateString(locale === 'en' ? 'en-GB' : 'id-ID', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Riyadh' })
}
export function absolutePageUrl(siteUrl: string, path: string) {
  return siteUrl.replace(/\/$/, '') + (path.split(/[?#]/)[0].replace(/\/+$/, '') || '/')
}
