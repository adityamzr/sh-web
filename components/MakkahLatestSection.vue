<script setup lang="ts">
const { onImageFallback } = useImageError()
import { formatMediaDate } from "~/shared/localization"
const { t, localePath, locale, basePath } = useLocale()

import { useMediaArticles } from '~/composables/useMediaArticles'
const { articles: latestArticles } = await useMediaArticles({ city: 'MAKKAH', limit: 4 })
</script>

<template>
  <section class="bg-sht-off-white py-16 sm:py-28" aria-labelledby="makkah-latest-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="flex items-end justify-between gap-6">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">{{ t('TERBARU') }}</p>
          <h2 id="makkah-latest-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">{{ t('Terbaru dari Makkah') }}</h2>
          <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">{{ t('Catatan, panduan, dan informasi terbaru yang berkaitan dengan kota Makkah.') }}</p>
        </div>
        <NuxtLink :to="localePath('/hari-ini?city=makkah')" class="hidden shrink-0 pb-1 text-sm font-semibold text-sht-olive-dark hover:text-sht-olive lg:inline-flex lg:items-center lg:gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">{{ t('Lihat Semua Makkah') }} <span class="text-sht-gold" aria-hidden="true">→</span></NuxtLink>
      </div>

      <div class="mt-10 hidden gap-x-5 gap-y-12 md:grid md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
        <article v-for="article in latestArticles" :key="article.id" class="group min-w-0 snap-start md:flex md:flex-col"><NuxtLink :to="localePath(`/artikel/${article.slug}`)" class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">
          <div class="overflow-hidden rounded-2xl bg-sht-stone">
            <img :src="article.image" :alt="article.imageAlt" loading="lazy" class="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" @error="onImageFallback" />
          </div>
          <p class="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sht-sage">{{ t(article.category) }} <span class="text-sht-stone">·</span> <span class="text-sht-charcoal/50">{{ formatMediaDate(article.publishedAt, locale) }}</span></p>
          <h3 class="mt-2 font-hero text-xl font-bold not-italic leading-snug text-sht-olive-dark transition-colors duration-200 group-hover:text-sht-olive sm:text-2xl">{{ article.title }}</h3>
          <span class="mt-4 inline-flex text-sm font-semibold text-sht-olive transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
        </NuxtLink></article>
      </div>

      <div class="-mx-5 mt-10 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:hidden" :aria-label="t('Artikel terbaru dari Makkah')">
        <div class="flex w-max snap-x snap-mandatory gap-4">
          <article v-for="article in latestArticles" :key="`mobile-${article.id}`" class="group w-[82vw] max-w-[21rem] flex-none snap-start"><NuxtLink :to="localePath(`/artikel/${article.slug}`)" class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">
            <div class="overflow-hidden rounded-2xl bg-sht-stone">
              <img :src="article.image" :alt="article.imageAlt" loading="lazy" class="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]" @error="onImageFallback" />
            </div>
            <p class="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sht-sage">{{ t(article.category) }} <span class="text-sht-stone">·</span> <span class="text-sht-charcoal/50">{{ formatMediaDate(article.publishedAt, locale) }}</span></p>
            <h3 class="mt-2 font-hero text-xl font-bold not-italic leading-snug text-sht-olive-dark">{{ article.title }}</h3>
            <span class="mt-4 inline-flex text-sm font-semibold text-sht-olive" aria-hidden="true">→</span>
          </NuxtLink></article>
        </div>
      </div>

      <div class="mt-8 lg:hidden">
        <NuxtLink :to="localePath('/hari-ini?city=makkah')" class="inline-flex items-center gap-1 text-sm font-semibold text-sht-olive-dark hover:text-sht-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">{{ t('Lihat Semua Makkah') }} <span class="text-sht-gold" aria-hidden="true">→</span></NuxtLink>
      </div>
    </div>
  </section>
</template>
