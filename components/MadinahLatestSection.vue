<script setup lang="ts">
type LatestMadinahArticle = {
  id: string
  category: string
  title: string
  publishedAt: string
  image: string
  alt: string
  city: 'madinah'
}

const latestArticles: LatestMadinahArticle[] = [
  { id: 'madinah-area-movement', category: 'PANDUAN', title: 'Hal yang perlu diperhatikan ketika berpindah kawasan di sekitar Masjid Nabawi.', publishedAt: 'Hari ini', image: '/images/madinah-street.jpg', alt: 'Jalan di sekitar Masjid Nabawi', city: 'madinah' },
  { id: 'madinah-transport-options', category: 'TRANSPORTASI', title: 'Mengenal pilihan transportasi untuk bergerak di sekitar Madinah.', publishedAt: '1 hari lalu', image: '/images/madinah-editorial.jpg', alt: 'Suasana kawasan Madinah', city: 'madinah' },
  { id: 'madinah-ziarah-practical', category: 'ZIARAH', title: 'Hal praktis yang perlu diperhatikan ketika mengunjungi lokasi ziarah di Madinah.', publishedAt: '2 hari lalu', image: '/images/madinah-quba.jpg', alt: 'Masjid Quba di Madinah', city: 'madinah' },
  { id: 'madinah-daily-rhythm', category: 'KESEHARIAN', title: 'Bagaimana ritme kawasan sekitar Nabawi berubah dari pagi hingga malam.', publishedAt: '3 hari lalu', image: '/images/madinah-market.jpg', alt: 'Detail keseharian di Madinah', city: 'madinah' },
]
</script>

<template>
  <section class="bg-sht-off-white py-24 sm:py-28" aria-labelledby="madinah-latest-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="flex items-end justify-between gap-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">TERBARU</p>
          <h2 id="madinah-latest-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Terbaru dari Madinah</h2>
          <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">Catatan, panduan, dan informasi terbaru yang berkaitan dengan kota Madinah.</p>
        </div>
        <span class="hidden shrink-0 pb-1 text-sm font-semibold text-sht-olive-dark lg:inline-flex lg:items-center lg:gap-1">Lihat Semua Madinah <span class="text-sht-gold" aria-hidden="true">→</span></span>
      </div>

      <div class="mt-10 hidden gap-x-5 gap-y-12 md:grid md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
        <article v-for="article in latestArticles" :key="article.id" class="group min-w-0 snap-start md:flex md:flex-col">
          <div class="overflow-hidden rounded-2xl bg-sht-stone"><img :src="article.image" :alt="article.alt" loading="lazy" class="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" /></div>
          <p class="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sht-sage">{{ article.category }} <span class="text-sht-stone">·</span> <span class="text-sht-charcoal/50">{{ article.publishedAt }}</span></p>
          <h3 class="mt-2 font-hero text-xl font-bold not-italic leading-snug text-sht-olive-dark transition-colors duration-200 group-hover:text-sht-olive sm:text-2xl">{{ article.title }}</h3>
          <span class="mt-4 inline-flex text-sm font-semibold text-sht-olive transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
        </article>
      </div>

      <div class="-mx-5 mt-10 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden" aria-label="Artikel terbaru dari Madinah">
        <div class="flex w-max snap-x snap-mandatory gap-4">
          <article v-for="article in latestArticles" :key="`mobile-${article.id}`" class="group w-[82vw] max-w-[21rem] flex-none snap-start">
            <div class="overflow-hidden rounded-2xl bg-sht-stone"><img :src="article.image" :alt="article.alt" loading="lazy" class="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" /></div>
            <p class="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sht-sage">{{ article.category }} <span class="text-sht-stone">·</span> <span class="text-sht-charcoal/50">{{ article.publishedAt }}</span></p>
            <h3 class="mt-2 font-hero text-xl font-bold not-italic leading-snug text-sht-olive-dark">{{ article.title }}</h3>
            <span class="mt-4 inline-flex text-sm font-semibold text-sht-olive" aria-hidden="true">→</span>
          </article>
        </div>
      </div>

      <div class="mt-8 lg:hidden"><span class="inline-flex items-center gap-1 text-sm font-semibold text-sht-olive-dark">Lihat Semua Madinah <span class="text-sht-gold" aria-hidden="true">→</span></span></div>
    </div>
  </section>
</template>
