<script setup lang="ts">
import { BusFront, CircleParking, Landmark, MapPinned, PlaneLanding, Utensils } from 'lucide-vue-next'
import { makkahLocations, type MakkahCategory } from '~/data/makkah'

useSeoMeta({
  title: 'Makkah — Sudut Haramain',
  description: 'Panduan kota, rute, kultur, dan catatan praktis untuk memahami Makkah dari sudut yang lebih dekat.',
})

const mapExplorer = ref<{ focusCategory: (category: MakkahCategory) => void } | null>(null)
const quickActions = [
  { label: 'Mau ke Masjidil Haram', icon: Landmark, category: 'Haram' as MakkahCategory },
  { label: 'Cari Transportasi', icon: BusFront, category: 'Transportasi' as MakkahCategory },
  { label: 'Cari Makan', icon: Utensils, category: 'Kuliner' as MakkahCategory },
  { label: 'Baru Sampai', icon: PlaneLanding, category: 'Transportasi' as MakkahCategory },
  { label: 'Cari Fasilitas', icon: CircleParking, category: 'Fasilitas' as MakkahCategory },
  { label: 'Mau Ziarah / Keliling', icon: MapPinned, category: 'Ziarah' as MakkahCategory },
]
function focusMap(category: MakkahCategory) { mapExplorer.value?.focusCategory(category) }
</script>

<template>
  <div class="bg-sht-off-white">
    <section class="pt-28 pb-0 sm:pt-32" aria-labelledby="makkah-opening-heading">
      <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />MAKKAH</p>
        <h1 id="makkah-opening-heading" class="mt-4 max-w-3xl font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Jelajahi Makkah dari satu tempat.</h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70 sm:text-lg">Temukan lokasi penting, transportasi, fasilitas, panduan, dan sudut lokal kota.</p>

        <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <button v-for="action in quickActions" :key="action.label" type="button" class="group flex min-h-[76px] flex-col justify-between rounded-full border border-sht-stone bg-white p-3 text-left transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" @click="focusMap(action.category)">
            <component :is="action.icon" class="h-5 w-5 text-sht-olive" :stroke-width="1.7" aria-hidden="true" />
            <span class="text-xs font-semibold leading-snug text-sht-olive-dark sm:text-sm">{{ action.label }} <span class="ml-0.5 text-sht-gold transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>
          </button>
        </div>
      </div>
    </section>

    <CityMapExplorer ref="mapExplorer" :locations="makkahLocations" :center="[39.8248709, 21.4245589]" />
    <MakkahCloseSection />
    <MakkahGallery />
    <MakkahContributionSection />
    <MakkahLatestSection />
  </div>
</template>
