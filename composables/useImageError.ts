export function useImageError() {
  function onImageError(event: Event) {
    const target = event.target as HTMLImageElement | null
    if (target) {
      target.style.display = 'none'
    }
  }

  function onImageFallback(event: Event, fallback: string = '/images/makkah-editorial.jpg') {
    const target = event.target as HTMLImageElement | null
    if (target) {
      // Prevent infinite loop if fallback also fails
      if (target.src !== fallback && !target.dataset.fallbackAttempted) {
        target.dataset.fallbackAttempted = 'true'
        target.src = fallback
      } else {
        target.style.display = 'none'
      }
    }
  }

  return {
    onImageError,
    onImageFallback,
  }
}
