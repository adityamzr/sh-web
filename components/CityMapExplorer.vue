<script setup lang="ts">
import type { Map, Marker } from 'maplibre-gl'
import type { MakkahCategory, MakkahLocation } from '~/data/makkah'
import 'maplibre-gl/dist/maplibre-gl.css'

const props = defineProps<{
  locations: MakkahLocation[]
  center: [number, number]
}>()

const mapElement = ref<HTMLElement | null>(null)
const map = shallowRef<Map | null>(null)
const markerConstructor = shallowRef<typeof import('maplibre-gl').Marker | null>(null)
const markers: Marker[] = []
const activeCategory = ref<'Semua' | MakkahCategory>('Semua')
const selectedId = ref(props.locations[0]?.id ?? '')
const mapError = ref(false)
const categories: Array<'Semua' | MakkahCategory> = ['Semua', 'Haram', 'Transportasi', 'Miqat', 'Kuliner', 'Fasilitas', 'Ziarah']

const visibleLocations = computed(() => activeCategory.value === 'Semua' ? props.locations : props.locations.filter((location) => location.category === activeCategory.value))
const selectedLocation = computed(() => props.locations.find((location) => location.id === selectedId.value) ?? visibleLocations.value[0] ?? null)

function markerClass(location: MakkahLocation) {
  const selected = selectedId.value === location.id
  const el = document.createElement('button')
  el.type = 'button'
  el.className = `makkah-marker ${selected ? 'is-selected' : ''}`
  el.setAttribute('aria-label', `Pilih ${location.name}`)
  el.innerHTML = '<span aria-hidden="true"></span>'
  el.addEventListener('click', () => selectLocation(location))
  return el
}

function clearMarkers() {
  markers.forEach((marker) => marker.remove())
  markers.length = 0
}

function renderMarkers() {
  if (!map.value || !import.meta.client) return
  clearMarkers()
  visibleLocations.value.forEach((location) => {
    const Marker = markerConstructor.value
    if (!Marker) return
    const marker = new Marker({ element: markerClass(location), anchor: 'center' })
      .setLngLat([location.coordinates.lng, location.coordinates.lat])
      .addTo(map.value!)
    markers.push(marker)
  })
}

function selectLocation(location: MakkahLocation) {
  selectedId.value = location.id
  map.value?.easeTo({ center: [location.coordinates.lng, location.coordinates.lat], zoom: 14, duration: 600 })
}

function selectCategory(category: 'Semua' | MakkahCategory) {
  activeCategory.value = category
  const first = visibleLocations.value[0]
  if (first) selectedId.value = first.id
  renderMarkers()
}

function focusCategory(category: MakkahCategory) {
  selectCategory(category)
  nextTick(() => document.getElementById('makkah-explorer')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

defineExpose({ focusCategory })

onMounted(async () => {
  try {
    const maplibre = await import('maplibre-gl')
    markerConstructor.value = maplibre.Marker
    map.value = new maplibre.Map({
      container: mapElement.value!,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: props.center,
      zoom: 12.2,
      attributionControl: false,
    })
    map.value.addControl(new maplibre.NavigationControl({ showCompass: false }), 'top-right')
    map.value.addControl(new maplibre.AttributionControl({ compact: true }), 'bottom-right')
    map.value.once('load', renderMarkers)
    map.value.on('error', () => { mapError.value = true })
  } catch {
    mapError.value = true
  }
})

onBeforeUnmount(() => {
  clearMarkers()
  map.value?.remove()
  map.value = null
  markerConstructor.value = null
})
</script>

<template>
  <section id="makkah-explorer" class="bg-sht-off-white py-16 sm:py-24" aria-labelledby="explorer-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-2xl"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">PETA KOTA</p><h2 id="explorer-heading" class="mt-3 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Jelajahi Makkah</h2><p class="mt-4 text-base leading-relaxed text-sht-charcoal/70">Temukan tempat penting, fasilitas, transportasi, dan titik yang berguna selama berada di Makkah.</p></div>
      <div class="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter kategori peta"><button v-for="category in categories" :key="category" type="button" class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" :class="activeCategory === category ? 'border-sht-olive bg-sht-olive text-sht-off-white' : 'border-sht-stone bg-white text-sht-olive hover:border-sht-gold'" :aria-pressed="activeCategory === category" @click="selectCategory(category)">{{ category }}</button></div>
      <div class="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(20rem,0.85fr)]">
        <ClientOnly fallback-tag="div" fallback="Memuat peta Makkah…"><div ref="mapElement" class="h-[380px] overflow-hidden rounded-3xl border border-sht-stone bg-sht-stone/40 sm:h-[420px]" :class="{ 'map-failed': mapError }"><div v-if="mapError" class="flex h-full items-center justify-center bg-sht-stone/40 p-6 text-center text-sm text-sht-charcoal/70">Peta sedang tidak dapat dimuat.</div></div><template #fallback><div class="flex h-[380px] items-center justify-center rounded-3xl border border-sht-stone bg-sht-stone/40 text-sm text-sht-charcoal/60 sm:h-[420px]">Memuat peta Makkah…</div></template></ClientOnly>
        <aside class="min-w-0"><div class="hidden border-b border-sht-stone pb-3 lg:block"><p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">TEMPAT PILIHAN</p><p class="mt-1 text-xs text-sht-charcoal/55">{{ visibleLocations.length }} titik dalam tampilan</p></div><div class="mt-4 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-0 lg:block lg:max-h-[365px] lg:space-y-2 lg:overflow-y-auto"><button v-for="location in visibleLocations" :key="location.id" type="button" class="min-w-[82%] snap-start rounded-2xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold lg:min-w-0 lg:w-full" :class="selectedLocation?.id === location.id ? 'border-sht-gold bg-white' : 'border-sht-stone bg-white/60 hover:border-sht-gold/60'" :aria-pressed="selectedLocation?.id === location.id" @click="selectLocation(location)"><span class="text-[11px] font-semibold uppercase tracking-[0.16em] text-sht-sage">{{ location.category }}</span><span class="mt-1 block font-hero text-lg font-bold not-italic text-sht-olive-dark">{{ location.name }}</span><span class="mt-1 block text-xs text-sht-charcoal/55">{{ location.area }}</span></button></div></aside>
      </div>
      <article v-if="selectedLocation" class="mt-5 rounded-2xl border border-sht-stone bg-white p-5 sm:p-6"><div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p class="text-xs font-semibold uppercase tracking-[0.16em] text-sht-sage">{{ selectedLocation.category }} · {{ selectedLocation.area }}</p><h3 class="mt-2 font-hero text-2xl font-bold not-italic text-sht-olive-dark">{{ selectedLocation.name }}</h3><p class="mt-2 max-w-2xl text-sm leading-relaxed text-sht-charcoal/70">{{ selectedLocation.shortDescription }}</p></div><a :href="selectedLocation.externalMapsUrl" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-sht-olive px-5 py-3 text-sm font-semibold text-sht-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Buka Arah ↗</a></div></article>
    </div>
  </section>
</template>

<style scoped>
:deep(.makkah-marker) { width: 18px; height: 18px; padding: 0; border: 2px solid #F6F4ED; border-radius: 999px; background: #3A4428; box-shadow: 0 2px 7px rgb(45 53 31 / 35%); cursor: pointer; }
:deep(.makkah-marker.is-selected) { width: 24px; height: 24px; background: #D3C168; border-color: #2D351F; }
</style>
