<script setup lang="ts">
import { ChevronLeft, ChevronRight, Download, ExternalLink, Heart, X } from 'lucide-vue-next'
import { makkahLocations } from '~/data/makkah'

interface GalleryItem {
  id: string
  src: string
  alt: string
  locationName: string
  date: string
  description: string
  orientation: 'portrait' | 'landscape'
  explorerId?: string
}

const galleryItems: GalleryItem[] = [
  { id: 'ajyad-morning', src: '/images/gallery-ajyad.jpg', alt: 'Pagi di kawasan Ajyad', locationName: 'Ajyad', date: '12 Mei 2026', description: 'Lapisan bangunan dan jalan yang membentuk sisi lain Makkah.', orientation: 'portrait', explorerId: 'masjidil-haram' },
  { id: 'misfalah-street', src: '/images/gallery-misfalah.jpg', alt: 'Jalan di kawasan Misfalah', locationName: 'Misfalah', date: '10 Mei 2026', description: 'Ritme jalan lokal di luar arus utama jamaah.', orientation: 'landscape', explorerId: 'makkah-station' },
  { id: 'taneem-mosque', src: '/images/gallery-taneem.jpg', alt: 'Arsitektur Masjid Aisyah di Tan’im', locationName: 'Tan’im', date: '8 Mei 2026', description: 'Ruang tenang dan arsitektur Masjid Aisyah di Tan’im.', orientation: 'portrait', explorerId: 'masjid-aisyah' },
  { id: 'market-detail', src: '/images/gallery-market.jpg', alt: 'Detail pasar lokal Makkah', locationName: 'Pusat Makkah', date: '5 Mei 2026', description: 'Tekstur toko dan sudut kecil yang memberi warna pada keseharian kota.', orientation: 'landscape' },
  { id: 'transport-evening', src: '/images/gallery-transport.jpg', alt: 'Transportasi kota Makkah saat senja', locationName: 'Sekitar Haram', date: '2 Mei 2026', description: 'Pergerakan kota saat sore berganti malam.', orientation: 'landscape', explorerId: 'al-shabeka' },
  { id: 'haram-distant', src: '/images/makkah-editorial.jpg', alt: 'Makkah dari kejauhan', locationName: 'Makkah', date: '29 April 2026', description: 'Skala kota yang mengelilingi pusat ibadah.', orientation: 'portrait', explorerId: 'masjidil-haram' },
  { id: 'madinah-edge', src: '/images/madinah-editorial.jpg', alt: 'Suasana kawasan Madinah', locationName: 'Perjalanan dari Makkah', date: '26 April 2026', description: 'Catatan visual dari perjalanan menuju kota berikutnya.', orientation: 'landscape' },
  { id: 'saudi-local', src: '/images/saudi-local-detail.jpg', alt: 'Detail lingkungan lokal', locationName: 'Kawasan Lokal', date: '22 April 2026', description: 'Detail sederhana yang sering terlewat ketika melihat terlalu cepat.', orientation: 'portrait', explorerId: 'hira-cultural-district' },
]

const selectedIndex = ref<number | null>(null)
const liked = ref<Set<string>>(new Set())
const selectedItem = computed(() => selectedIndex.value === null ? null : galleryItems[selectedIndex.value])
const selectedMapUrl = computed(() => { const id = selectedItem.value?.explorerId; return id ? makkahLocations.find((location) => location.id === id)?.externalMapsUrl : undefined })

function openLightbox(index: number) { selectedIndex.value = index; document.body.style.overflow = 'hidden' }
function closeLightbox() { selectedIndex.value = null; document.body.style.overflow = '' }
function toggleLike(id: string) { const next = new Set(liked.value); next.has(id) ? next.delete(id) : next.add(id); liked.value = next }
function previous() { if (selectedIndex.value !== null) selectedIndex.value = (selectedIndex.value + galleryItems.length - 1) % galleryItems.length }
function next() { if (selectedIndex.value !== null) selectedIndex.value = (selectedIndex.value + 1) % galleryItems.length }
function onKeydown(event: KeyboardEvent) { if (event.key === 'Escape') closeLightbox(); if (event.key === 'ArrowLeft') previous(); if (event.key === 'ArrowRight') next() }
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => { window.removeEventListener('keydown', onKeydown); document.body.style.overflow = '' })
</script>

<template>
  <section class="bg-sht-off-white py-20 sm:py-28" aria-labelledby="gallery-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-3xl"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">VISUAL MAKKAH</p><h2 id="gallery-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Sudut-Sudut Makkah</h2><p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">Potongan kota, jalan, suasana, dan detail yang sering terlewat ketika Makkah dilihat terlalu cepat.</p></div>
      <div class="mt-12 columns-2 gap-2 sm:columns-2 sm:gap-3 lg:columns-3 lg:gap-4"><figure v-for="(item, index) in galleryItems" :key="item.id" class="group relative mb-2 max-h-[380px] break-inside-avoid overflow-hidden sm:mb-3 sm:max-h-[520px] lg:mb-4 lg:max-h-[600px]"><button type="button" class="block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" :aria-label="`Buka foto ${item.locationName}`" @click="openLightbox(index)"><img :src="item.src" :alt="item.alt" loading="lazy" width="800" :height="item.orientation === 'portrait' ? 1000 : 600" class="block h-auto max-h-[380px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:max-h-[520px] lg:max-h-[600px]" /><span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sht-olive-dark/75 to-transparent p-4 pt-12 text-xs font-semibold uppercase tracking-[0.14em] text-white opacity-0 transition-opacity group-hover:opacity-100">{{ item.locationName }} <span aria-hidden="true">↗</span></span></button></figure></div>
    </div>

    <Teleport to="body"><div v-if="selectedItem" class="fixed inset-0 z-[100] flex items-center justify-center bg-sht-olive-dark/90 p-4 sm:p-8" role="dialog" aria-modal="true" :aria-label="`Foto ${selectedItem.locationName}`" @click.self="closeLightbox"><button type="button" class="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sht-off-white/10 text-sht-off-white hover:bg-sht-off-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" aria-label="Tutup foto" @click="closeLightbox"><X class="h-6 w-6" aria-hidden="true" /></button><button type="button" class="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-sht-off-white/10 text-sht-off-white hover:bg-sht-off-white/20 sm:left-6" aria-label="Foto sebelumnya" @click="previous"><ChevronLeft class="h-6 w-6" aria-hidden="true" /></button><button type="button" class="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-sht-off-white/10 text-sht-off-white hover:bg-sht-off-white/20 sm:right-6" aria-label="Foto berikutnya" @click="next"><ChevronRight class="h-6 w-6" aria-hidden="true" /></button><div class="grid max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl bg-sht-off-white lg:grid-cols-[1.5fr_0.5fr]"><div class="flex min-h-[35vh] items-center justify-center bg-black/10"><img :src="selectedItem.src" :alt="selectedItem.alt" class="max-h-[62vh] w-full object-contain lg:max-h-[90vh]" /></div><div class="overflow-y-auto p-6 sm:p-8"><p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">{{ selectedItem.locationName }}</p><p class="mt-2 text-xs text-sht-charcoal/50">{{ selectedItem.date }}</p><p class="mt-5 text-sm leading-relaxed text-sht-charcoal/70">{{ selectedItem.description }}</p><div class="mt-8 flex flex-wrap gap-2"><button type="button" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 py-2 text-sm font-semibold text-sht-olive" :class="liked.has(selectedItem.id) ? 'bg-sht-gold/20 border-sht-gold' : ''" @click="toggleLike(selectedItem.id)"><Heart class="h-4 w-4" :fill="liked.has(selectedItem.id) ? 'currentColor' : 'none'" aria-hidden="true" />{{ liked.has(selectedItem.id) ? 'Disukai' : 'Like' }}</button><a :href="selectedItem.src" :download="`sudut-haramain-${selectedItem.id}.jpg`" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 py-2 text-sm font-semibold text-sht-olive"><Download class="h-4 w-4" aria-hidden="true" />Download</a><a v-if="selectedMapUrl" :href="selectedMapUrl" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 py-2 text-sm font-semibold text-sht-olive"><ExternalLink class="h-4 w-4" aria-hidden="true" />Lihat di Peta</a></div><p class="mt-6 text-xs text-sht-charcoal/45">{{ (selectedIndex ?? 0) + 1 }} / {{ galleryItems.length }}</p></div></div></div></Teleport>
  </section>
</template>
