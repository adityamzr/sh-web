<script setup lang="ts">
const isOpen = ref(false)
const links = [
  { label: 'Hari Ini', to: '#hari-ini' },
  { label: 'Makkah', to: '#makkah' },
  { label: 'Madinah', to: '#madinah' },
  { label: 'Panduan', to: '#fokus-informasi' },
  { label: 'Kultur', to: '#lokal' },
  { label: 'Cari', to: '#lebih' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-sht-stone/80 bg-sht-off-white/95 backdrop-blur-md">
    <div class="mx-auto flex max-w-container items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
      <NuxtLink to="#beranda" class="font-heading text-lg font-semibold tracking-wide text-sht-olive-dark" aria-label="Sudut Haramain — Beranda">SUDUT HARAMAIN</NuxtLink>
      <nav class="hidden items-center gap-6 text-sm font-medium text-sht-charcoal/75 lg:flex" aria-label="Navigasi Media">
        <a v-for="link in links" :key="link.label" :href="link.to" class="transition-colors hover:text-sht-olive-dark">{{ link.label }}</a>
      </nav>
      <button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full text-sht-olive-dark hover:bg-sht-stone/60 lg:hidden" :aria-expanded="isOpen" aria-controls="media-mobile-menu" aria-label="Buka menu" @click="isOpen = !isOpen">
        <svg v-if="!isOpen" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
    </div>
    <div v-show="isOpen" id="media-mobile-menu" class="border-t border-sht-stone/70 lg:hidden">
      <nav class="mx-auto flex max-w-container flex-col gap-1 px-5 py-4 text-sm font-medium" aria-label="Navigasi Media Seluler">
        <a v-for="link in links" :key="link.label" :href="link.to" class="rounded-xl px-3 py-3 hover:bg-sht-stone/60" @click="isOpen = false">{{ link.label }}</a>
      </nav>
    </div>
  </header>
</template>
