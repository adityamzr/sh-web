<script setup lang="ts">
const entries = [
  { key: 'featured', label: 'KULTUR · MAKKAH', title: 'Melihat Makkah dari ritme keseharian orang yang tinggal di dalamnya.', supporting: 'Kota ini tidak hanya bergerak mengikuti musim jamaah.', image: '/images/makkah-editorial.jpg', alt: 'Suasana Makkah dari kejauhan', cue: 'Baca pilihan' },
  { key: 'makkah', label: 'MAKKAH', title: 'Jelajahi Makkah', supporting: 'Transportasi, kuliner, Masjidil Haram, fasilitas, dan kehidupan kota.', image: '/images/makkah-editorial.jpg', alt: 'Makkah dari kejauhan', cue: 'Jelajahi Makkah' },
  { key: 'madinah', label: 'MADINAH', title: 'Jelajahi Madinah', supporting: 'Masjid Nabawi, transportasi, ziarah, kuliner, dan kehidupan sekitar kota.', image: '/images/madinah-editorial.jpg', alt: 'Madinah dari kejauhan', cue: 'Jelajahi Madinah' },
  { key: 'local', label: 'SUDUT LOKAL', title: 'Hal-hal kecil yang biasanya baru terlihat setelah tinggal di sini.', supporting: 'Kebiasaan, ritme kota, dan detail yang sering terlewat jamaah.', cue: 'Baca sudut lokal' },
  { key: 'guide', label: 'PANDUAN', title: 'Panduan praktis untuk perjalanan dan keseharian di Haramain.', supporting: 'Rute, fasilitas, transportasi, ibadah, dan kebutuhan harian.', cue: 'Lihat panduan' },
]
</script>

<template>
  <section class="bg-sht-off-white py-20 sm:py-24 lg:py-28" aria-labelledby="explore-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">JELAJAHI</p>
        <h2 id="explore-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Jelajahi Sudut Haramain</h2>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">Cerita, panduan, dan sudut pandang pilihan untuk melihat Makkah–Madinah lebih dekat.</p>
      </div>

      <div class="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-[260px_260px_220px]">
        <article v-for="entry in entries" :key="entry.key" class="group relative min-h-[260px] overflow-hidden rounded-3xl border border-sht-stone p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-24px_rgba(45,53,31,0.55)] sm:p-8" :class="entry.key === 'featured' ? 'bg-sht-olive text-sht-off-white lg:col-span-7 lg:row-span-2 lg:row-start-1' : entry.key === 'local' ? 'bg-sht-stone/45 text-sht-olive-dark lg:col-span-5 lg:col-start-8 lg:row-start-1' : entry.key === 'guide' ? 'bg-sht-sage/20 text-sht-olive-dark lg:col-span-5 lg:col-start-8 lg:row-start-2' : entry.key === 'makkah' ? 'text-white lg:col-span-6 lg:col-start-1 lg:row-start-3' : 'text-white lg:col-span-6 lg:col-start-7 lg:row-start-3'">
          <template v-if="entry.image">
            <img :src="entry.image" :alt="entry.alt" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" :class="entry.key === 'featured' ? 'opacity-55' : 'opacity-65'" />
            <div class="absolute inset-0 bg-gradient-to-t from-sht-olive-dark/90 via-sht-olive/35 to-transparent" aria-hidden="true" />
          </template>
          <div class="relative flex h-full min-h-[210px] flex-col justify-between">
            <p class="text-xs font-semibold uppercase tracking-[0.18em]" :class="entry.image ? 'text-sht-gold' : 'text-sht-sage'">{{ entry.label }}</p>
            <div><h3 class="max-w-2xl font-hero text-2xl font-bold not-italic leading-tight sm:text-3xl">{{ entry.title }}</h3><p class="mt-3 max-w-xl text-sm leading-relaxed" :class="entry.image ? 'text-sht-off-white/75' : 'text-sht-charcoal/70'">{{ entry.supporting }}</p><span class="mt-5 inline-flex text-sm font-semibold" :class="entry.image ? 'text-sht-gold' : 'text-sht-olive'">{{ entry.cue }} <span class="ml-1 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span></span></div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
