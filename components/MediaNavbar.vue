<script setup lang="ts">
const isOpen = ref(false)
const isScrolled = ref(false)
const links = [
  { label: 'Hari Ini', to: '#hari-ini' },
  { label: 'Makkah', to: '#makkah' },
  { label: 'Madinah', to: '#madinah' },
  { label: 'Panduan', to: '#fokus-informasi' },
  { label: 'Kultur', to: '#lokal' },
  { label: 'Cari', to: '#lebih' },
]
function updateScroll() { isScrolled.value = window.scrollY > 24 }
onMounted(() => { updateScroll(); window.addEventListener('scroll', updateScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', updateScroll))
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300" :class="isScrolled ? 'border-sht-stone/80 bg-sht-off-white/95 text-sht-olive-dark backdrop-blur-md' : 'border-white/15 bg-sht-olive-dark/15 text-white backdrop-blur-sm'">
    <div class="mx-auto flex max-w-container items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
      <NuxtLink to="#beranda" class="font-heading text-lg font-semibold tracking-wide" aria-label="Sudut Haramain — Beranda">SUDUT HARAMAIN</NuxtLink>
      <nav class="hidden items-center gap-6 text-sm font-medium lg:flex" aria-label="Navigasi Media"><a v-for="link in links" :key="link.label" :href="link.to" class="opacity-80 transition-opacity hover:opacity-100">{{ link.label }}</a></nav>
      <button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 lg:hidden" :aria-expanded="isOpen" aria-controls="media-mobile-menu" aria-label="Buka menu" @click="isOpen = !isOpen"><svg v-if="!isOpen" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg><svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg></button>
    </div>
    <div v-show="isOpen" id="media-mobile-menu" class="min-h-screen bg-sht-off-white text-sht-olive-dark lg:hidden"><nav class="mx-auto flex max-w-container flex-col px-5 py-10 sm:px-6" aria-label="Navigasi Media Seluler"><a v-for="(link, index) in links" :key="link.label" :href="link.to" class="flex items-baseline gap-4 border-b border-sht-stone py-5 font-heading text-3xl" @click="isOpen = false"><span class="font-sans text-xs tracking-[0.2em] text-sht-sage">0{{ index + 1 }}</span>{{ link.label }}</a></nav></div>
  </header>
</template>
