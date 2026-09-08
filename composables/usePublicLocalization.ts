export function usePublicLocalization() {
  let englishEnabledValue = true
  try {
    const config = (globalThis as any).useRuntimeConfig ? (globalThis as any).useRuntimeConfig() : null
    // In Nuxt, useRuntimeConfig is auto-imported; in tests it may be missing, fallback to true
    if (config) {
      englishEnabledValue = config.public?.englishEnabled === true
    } else {
      // Try direct call if available (Nuxt auto-import)
      const cfg = typeof useRuntimeConfig !== 'undefined' ? useRuntimeConfig() : null
      if (cfg) englishEnabledValue = cfg.public?.englishEnabled === true
    }
  } catch {
    englishEnabledValue = true
  }

  const englishEnabled = computed(() => {
    try {
      const cfg = (typeof useRuntimeConfig !== 'undefined' ? useRuntimeConfig() : null) as any
      if (cfg?.public?.englishEnabled !== undefined) {
        return cfg.public.englishEnabled === true
      }
    } catch {}
    return englishEnabledValue
  })

  return {
    englishEnabled,
  }
}
