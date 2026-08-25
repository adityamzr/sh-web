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
    <section class="relative overflow-hidden bg-sht-olive-dark text-sht-off-white"><div class="mx-auto grid max-w-container items-center gap-10 px-5 py-16 sm:px-6 sm:py-24 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8"><div><p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-gold"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />MAKKAH</p><h1 class="mt-5 max-w-2xl font-hero text-4xl font-bold italic leading-[1.02] sm:text-6xl">Melihat Makkah lebih dekat,<br class="hidden sm:block" /> bukan hanya dari sekitar Masjidil Haram.</h1><p class="mt-6 max-w-xl text-base leading-relaxed text-sht-off-white/80 sm:text-lg">Panduan, rute, kultur, dan catatan praktis untuk memahami kota Makkah dari sudut yang lebih dekat.</p><div class="mt-7 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-sht-off-white/60"><span>PANDUAN KOTA</span><span>·</span><span>SUDUT LOKAL</span><span>·</span><span>INFORMASI PRAKTIS</span></div></div><div class="relative min-h-[300px] overflow-hidden rounded-3xl border border-sht-gold/20"><img src="/images/makkah-editorial.jpg" alt="Lingkungan kota Makkah dari kejauhan" class="absolute inset-0 h-full w-full object-cover" /><div class="absolute inset-0 bg-gradient-to-r from-sht-olive-dark/70 via-sht-olive-dark/15 to-transparent" /><div class="absolute bottom-6 left-6 text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold">KOTA · MAKKAH</div></div></div></section>

    <section class="py-14 sm:py-20"><div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8"><div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">KEBUTUHAN PRAKTIS</p><h2 class="mt-3 font-hero text-3xl font-bold italic text-sht-olive-dark sm:text-4xl">Sedang di Makkah?</h2><p class="mt-3 text-base text-sht-charcoal/70">Temukan informasi berdasarkan apa yang sedang Anda butuhkan.</p></div></div><div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3"><button v-for="action in quickActions" :key="action.label" type="button" class="group flex min-h-[112px] flex-col justify-between rounded-2xl border border-sht-stone bg-white p-4 text-left transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" @click="focusMap(action.category)"><component :is="action.icon" class="h-6 w-6 text-sht-olive" :stroke-width="1.7" aria-hidden="true" /><span class="text-sm font-semibold leading-snug text-sht-olive-dark">{{ action.label }} <span class="ml-1 text-sht-gold transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span></button></div></div></section>

    <CityMapExplorer ref="mapExplorer" :locations="makkahLocations" :center="[39.8248709, 21.4245589]" />
  </div>
</template>
