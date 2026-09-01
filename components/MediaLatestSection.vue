<script setup lang="ts">
const { t, localePath, locale, basePath } = useLocale()

import { useMediaArticles, formatMediaArticleDate } from '~/composables/useMediaArticles'
const { articles } = await useMediaArticles({ limit: 4 })
const latestEntries = computed(() => articles.value.map(a => ({ category: a.category.toUpperCase(), title: a.title, time: formatMediaArticleDate(a.publishedAt, locale.value).toUpperCase(), image: a.image, alt: a.imageAlt, slug: a.slug })))
</script>

<template>
  <section class="bg-sht-off-white py-14 sm:py-24 lg:py-28" aria-labelledby="latest-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-sage sm:text-xs"><span class="h-px w-8 bg-sht-sage" aria-hidden="true" />{{ t('TERBARU') }}</p>
          <h2 id="latest-heading" class="mt-3 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">{{ t('Terbaru dari Sudut Haramain') }}</h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">{{ t('Artikel, panduan, dan catatan terbaru dari Makkah–Madinah.') }}</p>
        </div>
        <NuxtLink :to="localePath('/hari-ini')" class="text-sm font-semibold text-sht-olive hover:text-sht-olive-dark sm:pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">{{ t('Lihat Semua Artikel') }} <span aria-hidden="true">→</span></NuxtLink>
      </div>

      <div class="-mx-5 mt-10 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible">
        <div class="flex w-max gap-5 px-5 lg:grid lg:w-auto lg:grid-cols-4 lg:gap-x-6 lg:px-0">
        <NuxtLink v-for="entry in latestEntries" :key="entry.title" :to="localePath(`/artikel/${entry.slug}`)" class="group w-[calc(100vw-4.5rem)] flex-none snap-start sm:w-[calc(100vw-6rem)] lg:w-auto lg:min-w-0">
          <div class="aspect-[4/3] overflow-hidden rounded-2xl bg-sht-stone"><img :src="entry.image" :alt="entry.alt" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /></div>
          <div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-sht-sage"><span>{{ t(entry.category) }}</span><span aria-hidden="true">·</span><span class="text-sht-charcoal/45">{{ t(entry.time) }}</span></div>
          <h3 class="mt-2 text-xl font-hero font-bold not-italic leading-snug text-sht-olive-dark sm:text-2xl lg:text-xl">{{ entry.title }}</h3>

        </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
