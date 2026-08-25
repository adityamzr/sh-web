<script setup lang="ts">
const explorationLinks = [
  { label: 'Hari Ini', to: '#hari-ini' },
  { label: 'Makkah', to: '#makkah' },
  { label: 'Madinah', to: '#madinah' },
  { label: 'Kultur', to: '#lokal' },
]
const guideLinks = [
  { label: 'Ibadah', to: '#fokus-informasi' },
  { label: 'Transportasi', to: '#fokus-informasi' },
  { label: 'Persiapan Umrah', to: '#fokus-informasi' },
  { label: 'Rute & Navigasi', to: '#fokus-informasi' },
]
const accordionOpen = ref<string | null>(null)
function toggleGroup(group: string) { accordionOpen.value = accordionOpen.value === group ? null : group }
</script>

<template>
  <footer class="bg-sht-olive-dark text-sht-off-white">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="hidden border-b border-sht-off-white/15 py-20 sm:block sm:py-24"><h2 class="max-w-2xl font-hero text-4xl font-bold italic leading-tight sm:text-6xl">Melihat Haramain<br class="hidden sm:block" /> dari lebih dekat.</h2></div>

      <div class="grid gap-12 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.8fr] lg:gap-10">
        <div><img src="/assets/images/sht_horizontal_white_logo.png" alt="Sudut Haramain" class="h-16 w-auto" /><p class="mt-4 max-w-sm text-sm leading-relaxed text-sht-off-white/70">Media Digital &amp; Informasi Praktis Makkah–Madinah</p><p class="mt-3 max-w-sm text-sm leading-relaxed text-sht-off-white/55">Melihat Haramain lebih dekat melalui panduan praktis, kultur lokal, dan informasi langsung dari Makkah–Madinah.</p></div>

        <nav class="hidden lg:block" aria-label="Eksplorasi footer"><h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold">EKSPLORASI</h3><ul class="mt-5 space-y-3 text-sm text-sht-off-white/70"><li v-for="link in explorationLinks" :key="link.label"><a :href="link.to" class="transition-colors hover:text-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">{{ link.label }}</a></li></ul></nav>
        <nav class="hidden lg:block" aria-label="Panduan footer"><h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold">PANDUAN</h3><ul class="mt-5 space-y-3 text-sm text-sht-off-white/70"><li v-for="link in guideLinks" :key="link.label"><a :href="link.to" class="transition-colors hover:text-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">{{ link.label }}</a></li><li><a href="#fokus-informasi" class="font-medium transition-colors hover:text-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Lihat semua panduan →</a></li></ul></nav>
        <div class="hidden lg:block"><h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold">LAYANAN</h3><ul class="mt-5 space-y-3 text-sm text-sht-off-white/70"><li><span>Sudut Haramain Tour</span><span class="mt-1 block text-xs text-sht-off-white/45">Segera Hadir</span></li><li><span>Sudut Haramain Jastip</span><span class="mt-1 block text-xs text-sht-off-white/45">Segera Hadir</span></li></ul><div class="mt-8"><h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold">IKUTI SUDUT HARAMAIN</h3><div class="mt-4 flex items-center gap-3 text-sht-off-white/75"><span role="img" aria-label="Instagram" class="transition-colors hover:text-sht-gold"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/></svg></span><span role="img" aria-label="TikTok" class="transition-colors hover:text-sht-gold"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14 4v10.2a3.8 3.8 0 1 1-3-3.7M14 4c.7 2.2 2.1 3.5 4.5 3.8"/></svg></span><span role="img" aria-label="YouTube" class="transition-colors hover:text-sht-gold"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M20.2 7.4a2.2 2.2 0 0 0-1.5-1.5C17.4 5.5 12 5.5 12 5.5s-5.4 0-6.7.4a2.2 2.2 0 0 0-1.5 1.5C3.4 8.7 3.4 12 3.4 12s0 3.3.4 4.6a2.2 2.2 0 0 0 1.5 1.5c1.3.4 6.7.4 6.7.4s5.4 0 6.7-.4a2.2 2.2 0 0 0 1.5-1.5c.4-1.3.4-4.6.4-4.6s0-3.3-.4-4.6Z"/><path stroke-linecap="round" stroke-linejoin="round" d="m10 9 5 3-5 3V9Z"/></svg></span></div></div></div>
      </div>

      <div class="lg:hidden">
        <div v-for="(group, key) in { Eksplorasi: explorationLinks, Panduan: guideLinks }" :key="key" class="border-t border-sht-off-white/15"><button type="button" class="flex min-h-[56px] w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold" :aria-expanded="accordionOpen === key" @click="toggleGroup(key)">{{ key }}<span class="text-lg font-normal">{{ accordionOpen === key ? '−' : '+' }}</span></button><div v-show="accordionOpen === key" class="overflow-hidden pb-4"><a v-for="link in group" :key="link.label" :href="link.to" class="block py-2 text-sm text-sht-off-white/70 hover:text-sht-gold">{{ link.label }}</a><a v-if="key === 'Panduan'" href="#fokus-informasi" class="block py-2 text-sm font-medium text-sht-off-white/70 hover:text-sht-gold">Lihat semua panduan →</a></div></div>
        <div class="border-t border-sht-off-white/15"><button type="button" class="flex min-h-[56px] w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold" :aria-expanded="accordionOpen === 'Layanan'" @click="toggleGroup('Layanan')">LAYANAN<span class="text-lg font-normal">{{ accordionOpen === 'Layanan' ? '−' : '+' }}</span></button><div v-show="accordionOpen === 'Layanan'" class="overflow-hidden pb-4 text-sm text-sht-off-white/70"><p class="py-2">Sudut Haramain Tour <span class="ml-2 text-xs text-sht-off-white/45">Segera Hadir</span></p><p class="py-2">Sudut Haramain Jastip <span class="ml-2 text-xs text-sht-off-white/45">Segera Hadir</span></p></div></div>
        <div class="border-t border-sht-off-white/15 py-6">
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold">IKUTI SUDUT HARAMAIN</h3>
          <div class="mt-4 flex items-center gap-3 text-sht-off-white/75">
            <span role="img" aria-label="Instagram"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/></svg></span>
            <span role="img" aria-label="TikTok"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M14 4v10.2a3.8 3.8 0 1 1-3-3.7M14 4c.7 2.2 2.1 3.5 4.5 3.8"/></svg>
            </span><span role="img" aria-label="YouTube"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M20.2 7.4a2.2 2.2 0 0 0-1.5-1.5C17.4 5.5 12 5.5 12 5.5s-5.4 0-6.7.4a2.2 2.2 0 0 0-1.5 1.5C3.4 8.7 3.4 12 3.4 12s0 3.3.4 4.6a2.2 2.2 0 0 0 1.5 1.5c1.3.4 6.7.4 6.7.4s5.4 0 6.7-.4a2.2 2.2 0 0 0 1.5-1.5c.4-1.3.4-4.6.4-4.6s0-3.3-.4-4.6Z"/><path fill="currentColor" stroke="none" d="m10 9 5 3-5 3V9Z"/></svg>
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 border-t border-sht-off-white/15 py-7 text-xs text-sht-off-white/50 sm:flex-row sm:items-center sm:justify-between"><div class="flex flex-wrap gap-x-4 gap-y-2"><span>© 2026 Sudut Haramain</span><a href="#tentang" class="hover:text-sht-gold">Tentang</a><span>Kebijakan Privasi</span><span>Syarat &amp; Ketentuan</span></div><p class="text-sht-off-white/60">Dari Makkah, untuk jamaah Indonesia.</p></div>
    </div>
  </footer>
</template>
