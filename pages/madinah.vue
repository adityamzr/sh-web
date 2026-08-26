<script setup lang="ts">
import { Accessibility, BusFront, Flower2, Landmark, MapPinned, Utensils } from 'lucide-vue-next'
import { madinahLocations, type MadinahCategory } from '~/data/madinah'

useSeoMeta({
  title: 'Madinah — Sudut Haramain',
  description: 'Panduan interaktif Masjid Nabawi, ziarah, transportasi, fasilitas, kuliner, dan sudut kota Madinah.',
})

const mapExplorer = ref<{ focusCategory: (category: string) => void } | null>(null)
const quickActions = [
  { label: 'Mau ke Masjid Nabawi', icon: Landmark, category: 'Nabawi' as MadinahCategory },
  { label: 'Rawdhah', icon: Flower2, category: 'Rawdhah' as MadinahCategory },
  { label: 'Cari Transportasi', icon: BusFront, category: 'Transportasi' as MadinahCategory },
  { label: 'Cari Makan', icon: Utensils, category: 'Kuliner' as MadinahCategory },
  { label: 'Ziarah Madinah', icon: MapPinned, category: 'Ziarah' as MadinahCategory },
  { label: 'Cari Fasilitas', icon: Accessibility, category: 'Fasilitas' as MadinahCategory },
]

function focusMap(category: MadinahCategory) {
  mapExplorer.value?.focusCategory(category)
}
</script>

<template>
  <div class="bg-sht-off-white">
    <section class="pb-0 pt-28 sm:pt-32" aria-labelledby="madinah-opening-heading">
      <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />MADINAH</p>
        <h1 id="madinah-opening-heading" class="mt-4 max-w-3xl font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Jelajahi Madinah dari satu tempat.</h1>
        <p class="mt-4 max-w-3xl text-base leading-relaxed text-sht-charcoal/70 sm:text-lg">Temukan Masjid Nabawi, lokasi ziarah, transportasi, fasilitas, kuliner, dan sudut kota yang berguna selama berada di Madinah.</p>

        <div class="mt-10 max-w-3xl">
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">SEDANG DI MADINAH?</p>
          <h2 class="mt-3 font-hero text-2xl font-bold not-italic text-sht-olive-dark sm:text-3xl">Sedang di Madinah?</h2>
          <p class="mt-2 text-sm leading-relaxed text-sht-charcoal/65">Pilih kebutuhan Anda untuk menemukan lokasi yang relevan.</p>
          <div class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <button v-for="action in quickActions" :key="action.label" type="button" class="group flex min-h-[72px] flex-col justify-between rounded-2xl border border-sht-stone bg-white p-3 text-left transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" @click="focusMap(action.category)">
              <component :is="action.icon" class="h-5 w-5 text-sht-olive" :stroke-width="1.7" aria-hidden="true" />
              <span class="text-xs font-semibold leading-snug text-sht-olive-dark sm:text-sm">{{ action.label }} <span class="ml-0.5 text-sht-gold transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <CityMapExplorer
      ref="mapExplorer"
      :locations="madinahLocations"
      :center="[39.611121, 24.46721]"
      city-name="Madinah"
      explorer-id="madinah-explorer"
      map-description="Tempat ibadah, ziarah, transportasi, kuliner, dan fasilitas yang berguna selama berada di Madinah."
      :categories="['Semua', 'Nabawi', 'Rawdhah', 'Ziarah', 'Transportasi', 'Kuliner', 'Fasilitas']"
    />
  </div>
</template>
