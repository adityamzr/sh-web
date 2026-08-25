<script setup lang="ts">
const featuredUpdate = {
  category: 'MAKKAH · KONDISI HARIAN',
  title: 'Akses menuju area Haram mulai lebih padat menjelang waktu Isya.',
  description: 'Catatan singkat mengenai jalur masuk, kepadatan, dan waktu yang lebih nyaman bagi jamaah.',
  time: '20 menit lalu',
}

const supportingUpdates = [
  { category: 'TRANSPORTASI', title: 'Titik naik bus di sekitar Haram mengalami penyesuaian.', time: '32 menit lalu', image: '/images/saudi-local-detail.jpg', alt: 'Detail lingkungan kota Makkah' },
  { category: 'MADINAH', title: 'Area sekitar Masjid Nabawi lebih ramai selepas Maghrib.', time: '1 jam lalu', image: '/images/madinah-editorial.jpg', alt: 'Suasana Masjid Nabawi dari kejauhan' },
  { category: 'FASILITAS', title: 'Beberapa titik layanan jamaah kembali aktif menjelang malam.', time: 'Hari ini', image: '/images/makkah-editorial.jpg', alt: 'Suasana Makkah dari kejauhan' },
]
</script>

<template>
  <section id="hari-ini" class="bg-sht-off-white py-20 sm:py-24 lg:py-28" aria-labelledby="today-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-sage sm:text-xs"><span class="h-px w-8 bg-sht-sage" aria-hidden="true" />HARI INI</p>
          <h2 id="today-heading" class="mt-3 font-hero text-4xl font-bold italic leading-[0.98] text-sht-olive-dark sm:text-5xl">Hari Ini di Haramain</h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">Catatan terbaru, kondisi lapangan, dan informasi yang relevan dari Makkah dan Madinah.</p>
        </div>
        <div class="text-xs uppercase tracking-[0.16em] text-sht-olive sm:pb-1"><span class="font-semibold">Lihat Semua Update →</span></div>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(20rem,0.9fr)] lg:gap-10">
        <article class="group relative min-h-[440px] overflow-hidden rounded-[1.6rem] bg-sht-olive-dark text-sht-off-white sm:min-h-[500px]">
          <img src="/images/makkah-editorial.jpg" :alt="featuredUpdate.title" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <div class="absolute inset-0 bg-gradient-to-t from-sht-olive-dark/95 via-sht-olive-dark/20 to-transparent" aria-hidden="true" />
          <div class="relative flex min-h-[440px] flex-col justify-end p-6 sm:min-h-[500px] sm:p-10">
            <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-sht-gold"><span>{{ featuredUpdate.category }}</span><span class="h-px w-6 bg-sht-gold/60" aria-hidden="true" /><span class="text-sht-off-white/65">{{ featuredUpdate.time }}</span></div>
            <h3 class="mt-4 max-w-2xl font-hero text-3xl font-bold not-italic leading-tight text-white sm:text-4xl lg:text-[2.65rem]">{{ featuredUpdate.title }}</h3>
            <p class="mt-4 max-w-xl text-sm leading-relaxed text-sht-off-white/75 sm:text-base">{{ featuredUpdate.description }}</p>

          </div>
        </article>

        <div class="supporting-rail -mx-5 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:mx-0 lg:overflow-visible lg:pb-0" aria-label="Tiga update pendukung">
          <div class="flex w-max gap-4 px-5 lg:block lg:w-auto lg:px-0">
          <article v-for="update in supportingUpdates" :key="update.title" class="group flex w-[calc(100vw-4rem)] flex-none snap-start gap-4 border-b border-sht-stone pb-5 sm:w-[calc(100vw-6rem)] lg:w-auto lg:min-w-0 lg:gap-5 lg:py-5 lg:first:pt-0 lg:last:border-b-0 lg:last:pb-0">
            <img :src="update.image" :alt="update.alt" class="h-24 w-24 shrink-0 rounded-xl object-cover grayscale-[20%] transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.02] sm:h-28 sm:w-28 lg:h-24 lg:w-24" />
            <div class="min-w-0 flex-1"><div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-sht-sage"><span>{{ update.category }}</span><span aria-hidden="true">·</span><span class="text-sht-charcoal/45">{{ update.time }}</span></div><h3 class="mt-2 text-lg font-bold not-italic leading-snug text-sht-olive-dark font-hero sm:text-xl lg:text-lg">{{ update.title }}</h3><span class="mt-3 block text-xs font-semibold text-sht-olive">Baca Artikel <span aria-hidden="true">→</span></span></div>
          </article>
          </div>
        </div>
      </div>
      <p class="mt-4 text-center text-xs text-sht-charcoal/45 lg:hidden">Geser untuk melihat update lainnya →</p>
    </div>
  </section>
</template>
