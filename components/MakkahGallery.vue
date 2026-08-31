<script setup lang="ts">
import { useImageError } from '~/composables/useImageError'
const { onImageError, onImageFallback } = useImageError()

import { ChevronLeft, ChevronRight, Download, ExternalLink, Heart, X } from 'lucide-vue-next'
import { useMediaGallery } from '~/composables/useMediaGallery'
const { items: apiItems, pending, error } = await useMediaGallery({ city: 'MAKKAH' })
const galleryItems = computed(() => (apiItems.value || []).slice(0, 9).filter(item => item && item.src))
const selectedIndex = ref<number | null>(null)
const lightboxContent = ref<HTMLElement | null>(null)
const liked = ref<Set<number>>(new Set())
const selectedItem = computed(() => selectedIndex.value === null ? null : galleryItems.value[selectedIndex.value])
const selectedMapUrl = computed(() => selectedItem.value?.mapUrl)

function resetLightboxScroll() {
  nextTick(() => { if (lightboxContent.value) lightboxContent.value.scrollTop = 0 })
}
function openLightbox(i: number) {
  if (!galleryItems.value[i]) return
  selectedIndex.value = i
  document.body.style.overflow = 'hidden'
  resetLightboxScroll()
}
function closeLightbox() {
  selectedIndex.value = null
  document.body.style.overflow = ''
}
function toggleLike(id: number) {
  const n = new Set(liked.value)
  n.has(id) ? n.delete(id) : n.add(id)
  liked.value = n
}
function previous() {
  if (selectedIndex.value !== null && galleryItems.value.length) {
    selectedIndex.value = (selectedIndex.value + galleryItems.value.length - 1) % galleryItems.value.length
    resetLightboxScroll()
  }
}
function next() {
  if (selectedIndex.value !== null && galleryItems.value.length) {
    selectedIndex.value = (selectedIndex.value + 1) % galleryItems.value.length
    resetLightboxScroll()
  }
}
function onKeydown(e: KeyboardEvent) {
  if (selectedIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') previous()
  if (e.key === 'ArrowRight') next()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section class="bg-sht-off-white py-14 sm:py-28" aria-labelledby="makkah-gallery-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">VISUAL MAKKAH</p>
        <h2 id="makkah-gallery-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Sudut-Sudut Makkah</h2>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">Potongan kota, jalan, suasana, dan detail yang sering terlewat ketika Makkah dilihat terlalu cepat.</p>
      </div>

      <div v-if="pending" class="mt-12 columns-2 gap-2 sm:gap-3 lg:columns-3 lg:gap-4">
        <div v-for="i in 6" :key="i" class="mb-2 aspect-[3/4] animate-pulse rounded-xl bg-sht-stone/40 sm:mb-3 lg:mb-4"></div>
      </div>

      <div v-else-if="error && !galleryItems.length" class="mt-12">
        <CommonErrorState title="Visual Makkah belum dapat dimuat" description="Silakan coba lagi nanti." :show-retry="false" />
      </div>

      <div v-else-if="!galleryItems.length" class="mt-12">
        <CommonEmptyState title="Belum ada visual Makkah" description="Foto-foto Makkah akan muncul di sini setelah tersedia." />
      </div>

      <div v-else class="mt-12 columns-2 gap-2 sm:columns-2 sm:gap-3 lg:columns-3 lg:gap-4">
        <figure v-for="(item, index) in galleryItems" :key="item.id" class="group relative mb-2 max-h-[380px] break-inside-avoid overflow-hidden sm:mb-3 sm:max-h-[520px] lg:mb-4 lg:max-h-[600px]">
          <button type="button" class="block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" :aria-label="`Buka foto ${item.locationName}`" @click="openLightbox(index)">
            <img :src="item.src" :alt="item.alt" loading="lazy" width="800" :height="1000" class="block h-auto max-h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:max-h-[520px] lg:max-h-[600px]" @error="onImageError" />
            <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sht-olive-dark/75 to-transparent p-4 pt-12 text-xs font-semibold uppercase tracking-[0.14em] text-white opacity-0 transition-opacity group-hover:opacity-100 line-clamp-1">{{ item.locationName }} <span aria-hidden="true">↗</span></span>
          </button>
        </figure>
      </div>

      <NuxtLink v-if="galleryItems.length" to="/visual?city=makkah" class="mt-8 inline-flex items-center text-sm font-semibold text-sht-olive transition-colors hover:text-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">Lihat Semua Visual Haramain <span class="ml-1 text-sht-gold" aria-hidden="true">→</span></NuxtLink>
    </div>

    <Teleport to="body">
      <div v-if="selectedItem" class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-sht-olive-dark/90 p-0 sm:p-8" role="dialog" aria-modal="true" :aria-label="`Foto ${selectedItem.locationName}`" @click.self="closeLightbox">
        <button type="button" class="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sht-off-white/10 text-sht-off-white hover:bg-sht-off-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" aria-label="Tutup foto" @click="closeLightbox"><X class="h-6 w-6" aria-hidden="true" /></button>
        <button type="button" class="absolute left-2 top-[24dvh] z-10 inline-flex h-11 w-11 -translate-y-1/2 sm:top-1/2 items-center justify-center rounded-full bg-sht-off-white/10 text-sht-off-white hover:bg-sht-off-white/20 sm:left-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" aria-label="Foto sebelumnya" @click="previous"><ChevronLeft class="h-6 w-6" aria-hidden="true" /></button>
        <button type="button" class="absolute right-2 top-[24dvh] z-10 inline-flex h-11 w-11 -translate-y-1/2 sm:top-1/2 items-center justify-center rounded-full bg-sht-off-white/10 text-sht-off-white hover:bg-sht-off-white/20 sm:right-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" aria-label="Foto berikutnya" @click="next"><ChevronRight class="h-6 w-6" aria-hidden="true" /></button>
        <div ref="lightboxContent" class="lightbox-content grid h-[100dvh] max-h-[100dvh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-none bg-sht-off-white sm:h-auto sm:max-h-[90vh] sm:rounded-2xl lg:grid-cols-[1.5fr_0.5fr]">
          <div class="flex h-[48dvh] max-h-[58dvh] items-center justify-center bg-black/10 sm:h-auto sm:min-h-[35vh]">
            <img :src="selectedItem.src" :alt="selectedItem.alt" class="max-h-[58dvh] w-full object-contain sm:max-h-[62vh] lg:max-h-[90vh]" @error="onImageError" />
          </div>
          <div class="p-6 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:p-8">
            <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage line-clamp-1">{{ selectedItem.locationName }}</p>
            <p class="mt-2 text-xs text-sht-charcoal/50">{{ selectedItem.date }}</p>
            <p class="mt-5 text-sm leading-relaxed text-sht-charcoal/70 break-words">{{ selectedItem.description || 'Deskripsi belum tersedia.' }}</p>
            <div class="mt-8 flex flex-wrap gap-2">
              <button type="button" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 py-2 text-sm font-semibold text-sht-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" :class="liked.has(selectedItem.id) ? 'bg-sht-gold/20 border-sht-gold' : ''" @click="toggleLike(selectedItem.id)"><Heart class="h-4 w-4" :fill="liked.has(selectedItem.id) ? 'currentColor' : 'none'" aria-hidden="true" />{{ liked.has(selectedItem.id) ? 'Disukai' : 'Like' }}</button>
              <a :href="selectedItem.src" :download="`sudut-haramain-${selectedItem.id}.jpg`" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 py-2 text-sm font-semibold text-sht-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold"><Download class="h-4 w-4" aria-hidden="true" />Download</a>
              <a v-if="selectedMapUrl" :href="selectedMapUrl" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 py-2 text-sm font-semibold text-sht-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold"><ExternalLink class="h-4 w-4" aria-hidden="true" />Lihat di Peta</a>
            </div>
            <p class="mt-6 text-xs text-sht-charcoal/45">{{ (selectedIndex ?? 0) + 1 }} / {{ galleryItems.length }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>
