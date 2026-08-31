<script setup lang="ts">
import { useImageError } from '~/composables/useImageError'
const { onImageError, onImageFallback } = useImageError()

import { useMediaArticles, formatMediaArticleDate } from '~/composables/useMediaArticles'
const { articles, pending, error } = await useMediaArticles({ limit: 8 })
const latestEntries = computed(() => articles.value.map(a => ({
  category: a.category.toUpperCase(),
  title: a.title,
  time: formatMediaArticleDate(a.publishedAt).toUpperCase(),
  image: a.image || '/images/makkah-editorial.jpg',
  alt: a.imageAlt,
  slug: a.slug
})))
</script>

<template>
  <section class="bg-sht-off-white py-14 sm:py-24 lg:py-28" aria-labelledby="latest-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-sage sm:text-xs"><span class="h-px w-8 bg-sht-sage" aria-hidden="true" />TERBARU</p>
          <h2 id="latest-heading" class="mt-3 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Terbaru dari Sudut Haramain</h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">Artikel, panduan, dan catatan terbaru dari Makkah–Madinah.</p>
        </div>
        <NuxtLink to="/hari-ini" class="text-sm font-semibold text-sht-olive hover:text-sht-olive-dark sm:pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">Lihat Semua Artikel <span aria-hidden="true">→</span></NuxtLink>
      </div>

      <div v-if="pending" class="-mx-5 mt-10 overflow-x-auto px-5 pb-3 lg:mx-0 lg:px-0">
        <CommonLoadingSkeleton variant="card" :count="4" />
      </div>

      <div v-else-if="error && !latestEntries.length" class="mt-10">
        <CommonErrorState title="Artikel terbaru belum dapat dimuat" description="Silakan coba lagi nanti." :show-retry="false" />
      </div>

      <div v-else-if="!latestEntries.length" class="mt-10">
        <CommonEmptyState title="Belum ada artikel terbaru" description="Artikel akan muncul di sini setelah dipublikasikan." />
      </div>

      <div v-else class="-mx-5 mt-10 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible">
        <div class="flex w-max gap-5 px-5 lg:grid lg:w-auto lg:grid-cols-4 lg:gap-x-6 lg:px-0">
          <NuxtLink v-for="entry in latestEntries" :key="entry.slug" :to="`/artikel/${entry.slug}`" class="group w-[calc(100vw-4.5rem)] flex-none snap-start sm:w-[calc(100vw-6rem)] lg:w-auto lg:min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">
            <div class="aspect-[4/3] overflow-hidden rounded-2xl bg-sht-stone"><img :src="entry.image" :alt="entry.alt" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" loading="lazy" @error="onImageFallback" /></div>
            <div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sht-sage"><span class="line-clamp-1">{{ entry.category }}</span><span aria-hidden="true">·</span><span class="text-sht-charcoal/45">{{ entry.time }}</span></div>
            <h3 class="mt-2 text-xl font-hero font-bold not-italic leading-snug text-sht-olive-dark sm:text-2xl lg:text-xl line-clamp-3 break-words">{{ entry.title }}</h3>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
