<script setup lang="ts">
import { ChevronLeft, ChevronRight, Download, ExternalLink, Heart, Search, X } from 'lucide-vue-next'
import { visualGalleryData, type VisualCategory } from '~/data/visual'

useSeoMeta({
  title: 'Visual Haramain — Sudut Haramain',
  description: 'Jelajahi foto Makkah dan Madinah melalui suasana kota, masjid, jalan, arsitektur, lanskap, dan kehidupan sehari-hari.',
})

type VisualFilter = 'Semua' | VisualCategory | 'Makkah' | 'Madinah'

const route = useRoute()
const router = useRouter()
const searchQuery = ref('')
const activeFilter = ref<VisualFilter>('Semua')
const visibleLimit = ref(18)
const selectedIndex = ref<number | null>(null)
const lightboxContent = ref<HTMLElement | null>(null)
const liked = ref<Set<string>>(new Set())
const filters: VisualFilter[] = ['Semua', 'Masjid', 'Landscape', 'Arsitektur', 'Jalan', 'Transportasi', 'Kuliner', 'Makkah', 'Madinah']
const selectedItem = computed(() => selectedIndex.value === null ? null : filteredVisuals.value[selectedIndex.value])

const filteredVisuals = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()
  return visualGalleryData.filter((item) => {
    const matchesFilter = activeFilter.value === 'Semua' || (activeFilter.value === 'Makkah' || activeFilter.value === 'Madinah' ? item.city === activeFilter.value.toLocaleLowerCase() : item.category === activeFilter.value)
    const searchText = [item.title, item.locationName, item.city, item.category, ...item.tags].join(' ').toLocaleLowerCase()
    return matchesFilter && (!query || searchText.includes(query))
  })
})

const visibleVisuals = computed(() => filteredVisuals.value.slice(0, visibleLimit.value))

function queryFilter(value: unknown): VisualFilter {
  const city = typeof value === 'string' ? value.toLowerCase() : ''
  return city === 'makkah' ? 'Makkah' : city === 'madinah' ? 'Madinah' : 'Semua'
}

function showMore() { visibleLimit.value += 12 }

function selectFilter(filter: VisualFilter) {
  visibleLimit.value = 18
  activeFilter.value = filter
  router.replace({ query: filter === 'Makkah' || filter === 'Madinah' ? { city: filter.toLocaleLowerCase() } : {} })
}

function resetFilters() {
  visibleLimit.value = 18
  searchQuery.value = ''
  activeFilter.value = 'Semua'
  router.replace({ query: {} })
}

function resetLightboxScroll() { nextTick(() => { if (lightboxContent.value) lightboxContent.value.scrollTop = 0 }) }
function openLightbox(index: number) { selectedIndex.value = index; document.body.style.overflow = 'hidden'; resetLightboxScroll() }
function closeLightbox() { selectedIndex.value = null; document.body.style.overflow = '' }
function toggleLike(id: string) { const next = new Set(liked.value); next.has(id) ? next.delete(id) : next.add(id); liked.value = next }
function previous() { if (selectedIndex.value !== null && filteredVisuals.value.length) { selectedIndex.value = (selectedIndex.value + filteredVisuals.value.length - 1) % filteredVisuals.value.length; resetLightboxScroll() } }
function next() { if (selectedIndex.value !== null && filteredVisuals.value.length) { selectedIndex.value = (selectedIndex.value + 1) % filteredVisuals.value.length; resetLightboxScroll() } }
function onKeydown(event: KeyboardEvent) { if (event.key === 'Escape') closeLightbox(); if (event.key === 'ArrowLeft') previous(); if (event.key === 'ArrowRight') next() }

watch(() => route.query.city, (city) => { activeFilter.value = queryFilter(city); visibleLimit.value = 18 }, { immediate: true })
watch(searchQuery, () => { visibleLimit.value = 18 })
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => { window.removeEventListener('keydown', onKeydown); document.body.style.overflow = '' })
</script>

<template>
  <div class="bg-sht-off-white">
    <section class="pb-0 pt-28 sm:pt-32" aria-labelledby="visual-heading">
      <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />VISUAL HARAMAIN</p>
        <h1 id="visual-heading" class="mt-4 max-w-3xl font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Lihat Haramain dari lebih dekat.</h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70 sm:text-lg">Jelajahi foto Makkah dan Madinah melalui suasana kota, masjid, jalan, arsitektur, lanskap, dan kehidupan sehari-hari.</p>
        <label class="relative mt-8 block max-w-3xl"><span class="sr-only">Cari foto, lokasi, atau suasana</span><Search class="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-sht-sage" aria-hidden="true" /><input v-model="searchQuery" type="search" placeholder="Cari foto, lokasi, atau suasana..." aria-label="Cari foto, lokasi, atau suasana" class="min-h-[58px] w-full rounded-full border border-sht-stone bg-white pl-14 pr-5 text-base outline-none transition-colors placeholder:text-sht-charcoal/40 focus:border-sht-olive focus:ring-2 focus:ring-sht-olive/15" /></label>
        <div class="mt-5 -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter visual"><button v-for="filter in filters" :key="filter" type="button" class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" :class="activeFilter === filter ? 'border-sht-olive bg-sht-olive text-sht-off-white' : 'border-sht-stone bg-white text-sht-olive hover:border-sht-gold'" :aria-pressed="activeFilter === filter" @click="selectFilter(filter)">{{ filter }}</button></div>
      </div>
    </section>

    <section class="py-10 sm:py-12" aria-labelledby="visual-results-heading">
      <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8"><div class="mb-5 flex items-center justify-between gap-4"><p id="visual-results-heading" class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">{{ filteredVisuals.length }} visual</p><button v-if="searchQuery || activeFilter !== 'Semua'" type="button" class="text-sm font-semibold text-sht-olive underline underline-offset-4" @click="resetFilters">Reset Filter</button></div><div v-if="filteredVisuals.length" class="columns-2 gap-2 sm:columns-2 sm:gap-3 lg:columns-3 lg:gap-4"><figure v-for="(item, index) in visibleVisuals" :key="item.id" class="group relative mb-2 break-inside-avoid overflow-hidden sm:mb-3 lg:mb-4"><button type="button" class="block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" :aria-label="`Buka foto ${item.title}`" @click="openLightbox(index)"><img :src="item.src" :alt="item.alt" loading="lazy" width="800" :height="item.orientation === 'portrait' ? 1000 : 600" class="block h-auto max-h-[330px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] sm:max-h-[500px] lg:max-h-[620px]" /><span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sht-olive-dark/80 to-transparent p-3 pt-14 text-xs font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition-opacity group-hover:opacity-100 sm:p-4 sm:pt-16 sm:text-sm">{{ item.locationName }} <span aria-hidden="true">↗</span></span></button></figure></div><div v-if="visibleVisuals.length < filteredVisuals.length" class="mt-10 text-center"><button type="button" class="inline-flex min-h-[46px] items-center justify-center rounded-full bg-sht-olive px-6 py-3 text-sm font-semibold text-sht-off-white transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" @click="showMore">Tampilkan Lebih Banyak <span class="ml-2 text-sht-gold">{{ visibleVisuals.length }} dari {{ filteredVisuals.length }} visual</span></button></div><div v-else-if="!filteredVisuals.length" class="border-t border-sht-stone py-16 text-center"><p class="font-hero text-2xl font-bold text-sht-olive-dark">Belum ada visual yang sesuai dengan pencarian Anda.</p><button type="button" class="mt-4 text-sm font-semibold text-sht-olive underline underline-offset-4" @click="resetFilters">Reset pencarian</button></div></div>
    </section>

    <Teleport to="body"><div v-if="selectedItem" class="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-sht-olive-dark/90 p-0 sm:p-8" role="dialog" aria-modal="true" :aria-label="`Foto ${selectedItem.locationName}`" @click.self="closeLightbox"><button type="button" class="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-sht-off-white/10 text-sht-off-white hover:bg-sht-off-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" aria-label="Tutup foto" @click="closeLightbox"><X class="h-6 w-6" aria-hidden="true" /></button><button type="button" class="absolute left-2 top-[24dvh] z-10 inline-flex h-11 w-11 -translate-y-1/2 sm:top-1/2 items-center justify-center rounded-full bg-sht-off-white/10 text-sht-off-white hover:bg-sht-off-white/20 sm:left-6" aria-label="Foto sebelumnya" @click="previous"><ChevronLeft class="h-6 w-6" aria-hidden="true" /></button><button type="button" class="absolute right-2 top-[24dvh] z-10 inline-flex h-11 w-11 -translate-y-1/2 sm:top-1/2 items-center justify-center rounded-full bg-sht-off-white/10 text-sht-off-white hover:bg-sht-off-white/20 sm:right-6" aria-label="Foto berikutnya" @click="next"><ChevronRight class="h-6 w-6" aria-hidden="true" /></button><div ref="lightboxContent" class="lightbox-content grid h-[100dvh] max-h-[100dvh] w-full max-w-6xl overflow-y-auto overscroll-contain rounded-none bg-sht-off-white sm:h-auto sm:max-h-[90vh] sm:rounded-2xl lg:grid-cols-[1.5fr_0.5fr]"><div class="flex h-[48dvh] max-h-[58dvh] items-center justify-center bg-black/10 sm:h-auto sm:min-h-[35vh]"><img :src="selectedItem.src" :alt="selectedItem.alt" class="max-h-[58dvh] w-full object-contain sm:max-h-[62vh] lg:max-h-[90vh]" /></div><div class="p-6 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:p-8"><p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">{{ selectedItem.locationName }} · {{ selectedItem.city }}</p><p class="mt-2 text-xs text-sht-charcoal/50">{{ selectedItem.date }}</p><h2 class="mt-3 font-hero text-2xl font-bold text-sht-olive-dark">{{ selectedItem.title }}</h2><p class="mt-5 text-sm leading-relaxed text-sht-charcoal/70">{{ selectedItem.description }}</p><div class="mt-8 flex flex-wrap gap-2"><button type="button" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 py-2 text-sm font-semibold text-sht-olive" :class="liked.has(selectedItem.id) ? 'border-sht-gold bg-sht-gold/20' : ''" @click="toggleLike(selectedItem.id)"><Heart class="h-4 w-4" :fill="liked.has(selectedItem.id) ? 'currentColor' : 'none'" aria-hidden="true" />{{ liked.has(selectedItem.id) ? 'Disukai' : 'Like' }}</button><a :href="selectedItem.src" :download="`visual-haramain-${selectedItem.id}.jpg`" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 py-2 text-sm font-semibold text-sht-olive"><Download class="h-4 w-4" aria-hidden="true" />Download</a><a v-if="selectedItem.mapUrl" :href="selectedItem.mapUrl" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 py-2 text-sm font-semibold text-sht-olive"><ExternalLink class="h-4 w-4" aria-hidden="true" />Lihat di Peta</a></div><p class="mt-6 text-xs text-sht-charcoal/45">{{ (selectedIndex ?? 0) + 1 }} / {{ filteredVisuals.length }}</p></div></div></div></Teleport>
  </div>
</template>

<style scoped>
@media (min-width: 640px) {
  .columns-2 figure { max-height: 500px; }
}
@media (min-width: 1024px) {
  .columns-2 figure { max-height: 620px; }
}
</style>
