<script setup lang="ts">
const { t, localePath, locale, basePath } = useLocale()

import { useMediaArticles } from '~/composables/useMediaArticles'
import { useMediaPageSettings } from '~/composables/useMediaPageSettings'
const { articles } = await useMediaArticles({ limit: 100, city: 'MADINAH' }); const { settings } = await useMediaPageSettings('madinah')
const variants=['primary','image','text','wide','daily']; const stories=computed(()=>{const ids=settings.value?.editorialArticleIds||[];const manual=ids.map((id:number)=>articles.value.find((a:any)=>a.id===id)).filter((a:any):a is NonNullable<typeof a>=>Boolean(a));const used=new Set(manual.map((a:any)=>a.id));const fallback=articles.value.filter((a:any)=>!used.has(a.id));const selected=[...manual,...fallback].slice(0,5);return selected.map((a:any,i)=>({key:a.id,slug:a.slug,category:`${a.city.toUpperCase()} · ${t(a.category.toUpperCase())}`,title:a.title,summary:a.excerpt,image:a.image,alt:a.imageAlt,variant:variants[i]}))})
</script>

<template>
  <section class="bg-sht-off-white py-14 sm:py-28" aria-labelledby="madinah-close-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-3xl"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">{{ t('CERITA & SUDUT LOKAL') }}</p><h2 id="madinah-close-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">{{ t('Madinah dari Dekat') }}</h2><p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">{{ t('Cerita, kebiasaan, dan hal-hal praktis yang sering baru terlihat ketika Madinah dilihat lebih lama.') }}</p></div>

      <div class="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-[260px_260px_190px]">
        <NuxtLink v-for="story in stories" :to="localePath(`/artikel/${story.slug}`)" :key="story.key" class="group relative min-h-[260px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold min-w-0 snap-start overflow-hidden rounded-3xl border border-sht-stone p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-24px_rgba(45,53,31,0.55)] sm:p-8" :class="[{ 'bg-sht-olive text-sht-off-white lg:col-span-7 lg:row-span-2': story.variant === 'primary', 'text-white lg:col-span-5 lg:col-start-8 lg:row-start-1': story.variant === 'image', 'bg-sht-gold/20 text-sht-olive-dark lg:col-span-5 lg:col-start-8 lg:row-start-2': story.variant === 'text', 'bg-sht-sage/20 text-sht-olive-dark lg:col-span-5 lg:col-start-8 lg:row-start-3': story.variant === 'daily', 'text-white lg:col-span-7 lg:row-start-3': story.variant === 'wide' }, story.variant !== 'primary' ? 'hidden lg:block' : '']">
          <template v-if="story.image"><img :src="story.image" :alt="story.alt" class="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.02]" /><div class="absolute inset-0 bg-gradient-to-t from-sht-olive-dark/90 via-sht-olive/35 to-transparent" aria-hidden="true" /></template>
          <div class="relative flex h-full min-h-[210px] flex-col justify-between"><p class="text-xs font-semibold uppercase tracking-[0.18em]" :class="story.image ? 'text-sht-gold' : 'text-sht-sage'">{{ t(story.category) }}</p><div><h3 class="max-w-2xl font-hero text-2xl font-bold not-italic leading-tight sm:text-3xl" :class="story.variant === 'primary' ? 'lg:text-4xl' : ''">{{ story.title }}</h3><p v-if="story.summary" class="mt-3 max-w-xl text-sm leading-relaxed" :class="story.image ? 'text-sht-off-white/75' : 'text-sht-charcoal/70'">{{ story.summary }}</p><span class="mt-5 inline-flex text-sm opacity-70" :class="story.image ? 'text-sht-gold' : 'text-sht-olive'">{{ t('Baca catatan') }}</span></div></div>
        </NuxtLink>
      </div>

      <div class="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-0 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden" :aria-label="t('Cerita Madinah lainnya')"><template v-for="story in stories.slice(1)" :key="story.key"><NuxtLink :to="localePath(`/artikel/${story.slug}`)" class="min-w-[82%] snap-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold rounded-3xl border border-sht-stone bg-white p-5"><p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">{{ t(story.category) }}</p><h3 class="mt-3 font-hero text-xl font-bold not-italic leading-tight text-sht-olive-dark">{{ story.title }}</h3><p v-if="story.summary" class="mt-3 text-sm leading-relaxed text-sht-charcoal/70">{{ story.summary }}</p><span class="mt-5 inline-flex text-sm opacity-70 text-sht-olive">{{ t('Baca catatan') }}</span></NuxtLink></template></div>
    </div>
  </section>
</template>
