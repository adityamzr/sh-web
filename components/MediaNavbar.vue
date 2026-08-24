<script setup lang="ts">
const isOpen = ref(false)
const close = () => { isOpen.value = false }
</script>

<template>
  <header class="border-b border-sht-stone/80 bg-sht-off-white/95">
    <div class="mx-auto flex max-w-container items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
      <NuxtLink to="/#beranda" class="font-heading text-lg font-semibold tracking-wide text-sht-olive-dark" aria-label="Sudut Haramain — Beranda">SUDUT HARAMAIN</NuxtLink>
      <nav class="hidden items-center gap-7 text-sm font-medium text-sht-charcoal/75 md:flex" aria-label="Navigasi utama">
        <NuxtLink to="/#beranda" class="transition-colors hover:text-sht-olive-dark">Beranda</NuxtLink>
        <NuxtLink to="/#fokus-informasi" class="transition-colors hover:text-sht-olive-dark">Fokus Informasi</NuxtLink>
        <NuxtLink to="/#tentang" class="transition-colors hover:text-sht-olive-dark">Tentang</NuxtLink>
        <a href="https://tour.sudutharamain.id" class="rounded-full border border-sht-olive/30 px-4 py-2 text-sht-olive transition-colors hover:bg-sht-olive hover:text-sht-off-white" target="_blank" rel="noopener noreferrer">Sudut Haramain Tour ↗</a>
      </nav>
      <button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full text-sht-olive-dark hover:bg-sht-stone/60 md:hidden" :aria-expanded="isOpen" aria-controls="media-mobile-menu" aria-label="Buka menu" @click="isOpen = !isOpen">
        <svg v-if="!isOpen" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg v-else class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg>
      </button>
    </div>
    <div v-show="isOpen" id="media-mobile-menu" class="border-t border-sht-stone/70 md:hidden">
      <nav class="mx-auto flex max-w-container flex-col gap-1 px-5 py-4 text-sm font-medium" aria-label="Navigasi seluler">
        <NuxtLink to="/#beranda" class="rounded-xl px-3 py-3 hover:bg-sht-stone/60" @click="close">Beranda</NuxtLink>
        <NuxtLink to="/#fokus-informasi" class="rounded-xl px-3 py-3 hover:bg-sht-stone/60" @click="close">Fokus Informasi</NuxtLink>
        <NuxtLink to="/#tentang" class="rounded-xl px-3 py-3 hover:bg-sht-stone/60" @click="close">Tentang</NuxtLink>
        <a href="https://tour.sudutharamain.id" class="mt-2 rounded-full bg-sht-olive px-4 py-3 text-center text-sht-off-white" target="_blank" rel="noopener noreferrer">Sudut Haramain Tour ↗</a>
      </nav>
    </div>
  </header>
</template>
