/**
 * Media API helper - server-only
 * Uses private runtimeConfig.apiBaseUrl (NUXT_API_BASE_URL)
 * Fails fast if not configured.
 */

export function getMediaApiBaseUrl(): string {
  const config = useRuntimeConfig()
  const raw = (config as any).apiBaseUrl as string | undefined

  const base = String(raw || '').trim().replace(/\/$/, '')

  if (!base) {
    // Fail fast - do not silently build malformed URLs
    // Log for server observability
    console.error('[mediaApi] NUXT_API_BASE_URL is not configured')
    throw createError({
      statusCode: 500,
      statusMessage: 'Media API base URL is not configured. Set NUXT_API_BASE_URL in server environment.',
    })
  }

  // Basic validation - must be http(s)
  if (!/^https?:\/\//i.test(base)) {
    console.error(`[mediaApi] Invalid NUXT_API_BASE_URL: ${base}`)
    throw createError({
      statusCode: 500,
      statusMessage: 'Invalid Media API configuration',
    })
  }

  return base
}

export async function mediaApiFetch<T>(path: string, opts: any = {}): Promise<T> {
  const base = getMediaApiBaseUrl()

  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`

  // Prevent double /api prefix issues
  // Expected base is like https://admin.example.com
  // Final URL: ${base}/api/v1/media${cleanPath}
  const url = `${base}/api/v1/media${cleanPath}`

  try {
    return await $fetch<T>(url, opts)
  } catch (err: any) {
    // Preserve original status if available, log for debugging
    const status = err?.statusCode || err?.response?.status || 500
    const message = err?.statusMessage || err?.data?.statusMessage || err?.message || 'Media API request failed'
    console.error(`[mediaApi] ${opts?.method || 'GET'} ${url} -> ${status}: ${message}`)
    // Keep the upstream host and raw API/database error details server-side.
    throw createError({
      statusCode: status,
      statusMessage: status === 404 ? 'Media content not found' : status === 400 ? 'Invalid media request' : 'Media API request failed',
    })
  }
}
