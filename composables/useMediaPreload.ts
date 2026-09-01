type Preload<T> = { ready: boolean; data: T | null; status?: number }

const stateKey = (key: string) => `media-preload:${key}`

export function setMediaPreload<T>(key: string, data: T | null, status?: number) {
  useState<Preload<T>>(stateKey(key), () => ({ ready: false, data: null })).value = { ready: true, data, status }
}

export function takeMediaPreload<T>(key: string) {
  const state = useState<Preload<T>>(stateKey(key), () => ({ ready: false, data: null }))
  if (!state.value.ready) return { used: false as const, data: null }
  const cached = state.value
  state.value = { ready: false, data: null }
  if (cached.status) throw createError({ statusCode: cached.status, statusMessage: cached.status === 404 ? 'Media content not found' : 'Media API request failed' })
  return { used: true as const, data: cached.data }
}
