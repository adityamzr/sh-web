<script setup lang="ts">
import { useMediaArticles, formatMediaArticleDate } from '~/composables/useMediaArticles'
const { articles } = await useMediaArticles({ limit: 4 })
const featuredUpdate = computed(() => { const a=articles.value[0]; return { category:a?`${a.city.toUpperCase()} · ${a.category.toUpperCase()}`:'HARI INI', title:a?.title||'Belum ada update hari ini.', description:a?.excerpt||'Belum ada artikel terbit.', time:a?formatMediaArticleDate(a.publishedAt):'—', image:a?.image||'/images/makkah-editorial.jpg', alt:a?.imageAlt||'Sudut Haramain' ,slug:a?.slug||''} })
const supportingUpdates = computed(() => articles.value.slice(1,4).map(a=>({category:a.category.toUpperCase(),title:a.title,time:formatMediaArticleDate(a.publishedAt),image:a.image,alt:a.imageAlt,slug:a.slug})))
</script>

<template>
  <section id="hari-ini" class="bg-sht-off-white py-14 sm:py-24 lg:py-28" aria-labelledby="today-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-sage sm:text-xs"><span class="h-px w-8 bg-sht-sage" aria-hidden="true" />HARI INI</p>
          <h2 id="today-heading" class="mt-3 font-hero text-4xl font-bold italic leading-[0.98] text-sht-olive-dark sm:text-5xl">Hari Ini di Haramain</h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">Catatan terbaru, kondisi lapangan, dan informasi yang relevan dari Makkah dan Madinah.</p>
        </div>
        <NuxtLink to="/hari-ini" class="text-xs font-semibold uppercase tracking-[0.16em] text-sht-olive hover:text-sht-olive-dark sm:pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">Lihat Semua Update →</NuxtLink>
      </div>

      <div class="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(20rem,0.9fr)] lg:gap-10">
        <article class="group relative min-h-[440px] overflow-hidden rounded-[1.6rem] bg-sht-olive-dark text-sht-off-white sm:min-h-[500px]">
          <NuxtLink v-if="featuredUpdate.slug" :to="`/artikel/${featuredUpdate.slug}`" class="contents"><img :src="featuredUpdate.image" :alt="featuredUpdate.alt" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <div class="absolute inset-0 bg-gradient-to-t from-sht-olive-dark/95 via-sht-olive-dark/20 to-transparent" aria-hidden="true" />
          <div class="relative flex min-h-[440px] flex-col justify-end p-6 sm:min-h-[500px] sm:p-10">
            <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-sht-gold"><span>{{ featuredUpdate.category }}</span><span class="h-px w-6 bg-sht-gold/60" aria-hidden="true" /><span class="text-sht-off-white/65">{{ featuredUpdate.time }}</span></div>
            <h3 class="mt-4 max-w-2xl font-hero text-3xl font-bold not-italic leading-tight text-white sm:text-4xl lg:text-[2.65rem]">{{ featuredUpdate.title }}</h3>
            <p class="mt-4 max-w-xl text-sm leading-relaxed text-sht-off-white/75 sm:text-base">{{ featuredUpdate.description }}</p>

          </div>
        </NuxtLink></article>

        <div class="supporting-rail -mx-5 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:mx-0 lg:overflow-visible lg:pb-0" aria-label="Tiga update pendukung">
          <div class="flex w-max gap-4 px-5 lg:block lg:w-auto lg:px-0">
          <NuxtLink v-for="update in supportingUpdates" :key="update.title" :to="`/artikel/${update.slug}`" class="group flex w-[calc(100vw-4rem)] flex-none snap-start gap-4 border-sht-stone pb-5 sm:w-[calc(100vw-6rem)] lg:w-auto lg:min-w-0 lg:gap-5 lg:py-5 lg:first:pt-0 lg:last:border-b-0 lg:last:pb-0">
            <img :src="update.image" :alt="update.alt" class="h-24 w-24 shrink-0 rounded-xl object-cover grayscale-[20%] transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.02] sm:h-28 sm:w-28 lg:h-24 lg:w-24" />
            <div class="min-w-0 flex-1"><div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-sht-sage"><span>{{ update.category }}</span><span aria-hidden="true">·</span><span class="text-sht-charcoal/45">{{ update.time }}</span></div><h3 class="mt-2 text-lg font-bold not-italic leading-snug text-sht-olive-dark font-hero sm:text-xl lg:text-lg">{{ update.title }}</h3></div>
          </NuxtLink>
          </div>
        </div>
      </div>
      <!-- <p class="mt-4 text-center text-xs text-sht-charcoal/45 lg:hidden">Geser untuk melihat update lainnya →</p> -->
    </div>
  </section>
</template>
