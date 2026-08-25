<script setup lang="ts">
import { BookOpen, BriefcaseBusiness, ChevronDown, MapPin, MapPinned, Menu, Newspaper, Search, Sparkles, X } from 'lucide-vue-next'
import blackLogo from '~/assets/images/sht_horizontal_black_logo.png'
import whiteLogo from '~/assets/images/sht_horizontal_white_logo.png'

const isOpen = ref(false)
const isScrolled = ref(false)
const isServicesOpen = ref(false)
const isSearchOpen = ref(false)
const searchTrigger = ref<HTMLButtonElement | null>(null)
const links = [
  { label: 'Hari Ini', to: '#hari-ini', icon: Newspaper },
  { label: 'Makkah', to: '#makkah', icon: MapPinned },
  { label: 'Madinah', to: '#madinah', icon: MapPin },
  { label: 'Panduan', to: '#fokus-informasi', icon: BookOpen },
  { label: 'Kultur', to: '#lokal', icon: Sparkles },
]
const serviceUnits = [
  { name: 'Sudut Haramain Tour', subtitle: 'Umroh Mandiri & Land Arrangement' },
  { name: 'Sudut Haramain Jastip', subtitle: 'Titip beli dari Makkah–Madinah' },
]
function updateScroll() { isScrolled.value = window.scrollY > 24 }
function closeSearch() {
  isSearchOpen.value = false
  nextTick(() => searchTrigger.value?.focus())
}
onMounted(() => { updateScroll(); window.addEventListener('scroll', updateScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', updateScroll))
</script>

<template>
  <header class="fixed inset-x-0 py-2 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300" :class="isScrolled ? 'border-sht-stone/80 shadow-sm bg-sht-off-white/95 text-sht-olive-dark backdrop-blur-md' : 'border-white/20 bg-transparent text-white backdrop-blur-sm'">
    <div class="mx-auto flex h-[72px] max-w-[84rem] items-center justify-between gap-8 px-5 sm:px-6 lg:px-8">
      <NuxtLink to="#beranda" class="shrink-0 font-heading text-xl font-semibold tracking-wide sm:text-2xl" aria-label="Sudut Haramain — Beranda">
        <img :src="isScrolled ? blackLogo : whiteLogo" alt="" class="h-12 w-auto" />
      </NuxtLink>
      <nav class="hidden flex-1 items-center justify-center gap-6 text-[15px] font-medium lg:flex xl:gap-8" aria-label="Navigasi Media"><a v-for="link in links" :key="link.label" :href="link.to" class="opacity-80 transition-opacity hover:opacity-100">{{ link.label }}</a>
      <div class="relative hidden lg:block">
        <button type="button" class="inline-flex items-center gap-1.5 text-[15px] font-medium opacity-80 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" :aria-expanded="isServicesOpen" aria-controls="media-services-menu" @click="isServicesOpen = !isServicesOpen">Layanan Kami <ChevronDown class="h-4 w-4 transition-transform duration-200" :class="isServicesOpen ? 'rotate-180' : ''" aria-hidden="true" /></button>
        <div v-if="isServicesOpen" id="media-services-menu" class="absolute right-0 top-full mt-4 w-72 rounded-2xl border border-sht-stone bg-sht-off-white p-3 text-sht-olive-dark shadow-xl" role="menu" aria-label="Layanan Kami">
          <div v-for="unit in serviceUnits" :key="unit.name" class="rounded-xl p-3" role="menuitem"><p class="font-semibold">{{ unit.name }}</p><p class="mt-1 text-xs text-sht-charcoal/60">{{ unit.subtitle }}</p><span class="mt-2 inline-flex rounded-full border border-sht-gold/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sht-olive">Segera Hadir</span></div>
        </div>
      </div>

      </nav>
      <div class="hidden items-center lg:flex">
        <button ref="searchTrigger" type="button" :class="isScrolled ? 'border-sht-olive' : 'border-current/35'" class="inline-flex h-11 w-fit items-center gap-2 rounded-xl border px-5 text-left text-sm opacity-85 transition-colors hover:bg-white/10 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" aria-label="Cari informasi" @click="isSearchOpen = true"><Search class="h-4 w-4 shrink-0" aria-hidden="true" /><span>Cari informasi</span></button></div>
      <div class="flex items-center gap-2 lg:hidden"><button ref="searchTrigger" type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" aria-label="Cari informasi" @click="isSearchOpen = true"><Search class="h-5 w-5" aria-hidden="true" /></button><button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10" :aria-expanded="isOpen" aria-controls="media-mobile-menu" aria-label="Buka menu" @click="isOpen = !isOpen"><Menu v-if="!isOpen" class="h-6 w-6" aria-hidden="true" /><X v-else class="h-6 w-6" aria-hidden="true" /></button></div>
    </div>
    <div v-show="isOpen" id="media-mobile-menu" class="min-h-screen bg-sht-off-white text-sht-olive-dark lg:hidden">
      <nav class="mx-auto flex max-w-container flex-col px-5 py-8 sm:px-6" aria-label="Navigasi Media Seluler">
        <a v-for="link in links" :key="link.label" :href="link.to" class="flex min-h-[64px] items-center gap-4 border-b border-sht-stone px-1 py-4 font-sans text-base font-semibold leading-tight" @click="isOpen = false">
          <component :is="link.icon" class="h-5 w-5 shrink-0 text-sht-olive" :stroke-width="1.8" aria-hidden="true" />
          <span>{{ link.label }}</span>
        </a>
        <div class="border-b border-sht-stone">
          <button type="button" class="flex min-h-[64px] w-full items-center gap-4 px-1 py-4 text-left font-sans text-base font-semibold leading-tight" :aria-expanded="isServicesOpen" aria-controls="media-mobile-services" @click="isServicesOpen = !isServicesOpen">
            <BriefcaseBusiness class="h-5 w-5 shrink-0 text-sht-olive" :stroke-width="1.8" aria-hidden="true" />
            <span class="flex-1">Layanan Kami</span>
            <ChevronDown class="h-5 w-5 transition-transform duration-200" :class="isServicesOpen ? 'rotate-180' : ''" aria-hidden="true" />
          </button>
          <div v-show="isServicesOpen" id="media-mobile-services" class="ml-9 border-t border-sht-stone/70 py-2">
            <div v-for="unit in serviceUnits" :key="unit.name" class="py-3">
              <p class="font-sans text-base text-sht-olive-dark">{{ unit.name }}</p>
              <p class="mt-1 text-xs text-sht-charcoal/60">{{ unit.subtitle }} · Segera Hadir</p>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <MediaSearchModal v-model="isSearchOpen" @update:model-value="(open) => { if (!open) closeSearch() }" />
</template>
