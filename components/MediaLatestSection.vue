<script setup lang="ts">
const latestEntries = [
  { category: 'KULTUR', title: 'Kebiasaan kecil di Makkah yang sering baru disadari setelah tinggal lebih lama.', time: '2 HARI LALU', image: '/images/saudi-local-detail.jpg', alt: 'Detail lingkungan kota Makkah' },
  { category: 'PANDUAN', title: 'Hal yang perlu diperhatikan sebelum menggunakan transportasi umum di Makkah.', time: '3 HARI LALU', image: '/images/makkah-editorial.jpg', alt: 'Suasana Makkah dari kejauhan' },
  { category: 'MAKKAH', title: 'Mengenal area sekitar Haram dari sudut yang lebih praktis.', time: '4 HARI LALU', image: '/images/makkah-editorial.jpg', alt: 'Arsitektur dan suasana Makkah' },
  { category: 'MADINAH', title: 'Cara memahami ritme kawasan sekitar Masjid Nabawi sepanjang hari.', time: '5 HARI LALU', image: '/images/madinah-editorial.jpg', alt: 'Suasana Madinah dari kejauhan' },
]
</script>

<template>
  <section class="bg-sht-off-white py-20 sm:py-24 lg:py-28" aria-labelledby="latest-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-sage sm:text-xs"><span class="h-px w-8 bg-sht-sage" aria-hidden="true" />TERBARU</p>
          <h2 id="latest-heading" class="mt-3 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Terbaru dari Sudut Haramain</h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">Artikel, panduan, dan catatan terbaru dari Makkah–Madinah.</p>
        </div>
        <span class="text-sm font-semibold text-sht-olive sm:pb-1">Lihat Semua Artikel <span aria-hidden="true">→</span></span>
      </div>

      <div class="-mx-5 mt-10 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible">
        <div class="flex w-max gap-5 px-5 lg:grid lg:w-auto lg:grid-cols-4 lg:gap-x-6 lg:px-0">
        <article v-for="entry in latestEntries" :key="entry.title" class="group w-[calc(100vw-4.5rem)] flex-none snap-start sm:w-[calc(100vw-6rem)] lg:w-auto lg:min-w-0">
          <div class="aspect-[4/3] overflow-hidden rounded-2xl bg-sht-stone"><img :src="entry.image" :alt="entry.alt" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div>
          <div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sht-sage"><span>{{ entry.category }}</span><span aria-hidden="true">·</span><span class="text-sht-charcoal/45">{{ entry.time }}</span></div>
          <h3 class="mt-2 text-xl font-hero font-bold not-italic leading-snug text-sht-olive-dark sm:text-2xl lg:text-xl">{{ entry.title }}</h3>
          <span class="mt-4 inline-flex text-sm font-semibold text-sht-olive transition-transform duration-300 group-hover:translate-x-1">Baca Artikel <span class="ml-1" aria-hidden="true">→</span></span>
        </article>
        </div>
      </div>
    </div>
  </section>
</template>
