<script setup lang="ts">
import { useImageError } from '~/composables/useImageError'
const { onImageError, onImageFallback } = useImageError()

import { useMediaArticles } from '~/composables/useMediaArticles'
import { useMediaHomeSettings } from '~/composables/useMediaHomeSettings'
const { articles, pending: articlesPending } = await useMediaArticles({ limit: 100 })
const { settings, pending: settingsPending } = await useMediaHomeSettings()

const baseEntries=[
  {key:'featured',label:'KULTUR · MAKKAH',title:'Melihat Makkah dari ritme keseharian orang yang tinggal di dalamnya.',supporting:'Kota ini tidak hanya bergerak mengikuti musim jamaah.',image:'/images/makkah-editorial.jpg',alt:'Suasana Makkah dari kejauhan',cue:'Baca pilihan', href: '/hari-ini'},
  {key:'makkah',label:'MAKKAH',title:'Jelajahi Makkah',supporting:'Transportasi, kuliner, Masjidil Haram, fasilitas, dan kehidupan kota.',image:'/images/makkah-editorial.jpg',alt:'Makkah dari kejauhan',cue:'Jelajahi Makkah',href:'/makkah'},
  {key:'madinah',label:'MADINAH',title:'Jelajahi Madinah',supporting:'Masjid Nabawi, transportasi, ziarah, kuliner, dan kehidupan sekitar kota.',image:'/images/madinah-editorial.jpg',alt:'Madinah dari kejauhan',cue:'Jelajahi Madinah',href:'/madinah'},
  {key:'local',label:'SUDUT LOKAL',title:'Hal-hal kecil yang biasanya baru terlihat setelah tinggal di sini.',supporting:'Kebiasaan, ritme kota, dan detail yang sering terlewat jamaah.',cue:'Baca sudut lokal', href: '/hari-ini'},
  {key:'guide',label:'PANDUAN',title:'Panduan praktis untuk perjalanan dan keseharian di Haramain.',supporting:'Rute, fasilitas, transportasi, ibadah, dan kebutuhan harian.',cue:'Lihat panduan',href:'/panduan'}
]

const entries=computed(()=>{
  try {
    const ids=settings.value?.editorialArticleIds||[]
    const selected=ids.map(id=>articles.value.find(a=>a.id===id)).filter((a):a is NonNullable<typeof a>=>Boolean(a))
    const fallback=articles.value.filter(a=>!selected.some(x=>x.id===a.id))
    const editorial=[...selected,...fallback]
    const out=baseEntries.map(x=>({...x}))
    const primary=editorial[0],local=editorial[1]
    if(primary){
      out[0].title=primary.title
      out[0].supporting=primary.excerpt
      out[0].image=primary.image || out[0].image
      out[0].alt=primary.imageAlt
      out[0].href=`/artikel/${primary.slug}`
    }
    if(local){
      out[3].title=local.title
      out[3].supporting=local.excerpt
      out[3].image=local.image || out[3].image
      out[3].alt=local.imageAlt
      out[3].href=`/artikel/${local.slug}`
    }
    return out
  } catch {
    return baseEntries
  }
})

const isLoading = computed(() => articlesPending.value || settingsPending.value)
</script>

<template>
  <section class="bg-sht-off-white py-14 sm:py-24 lg:py-28" aria-labelledby="explore-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-sage sm:text-xs"><span class="h-px w-8 bg-sht-sage" aria-hidden="true" />JELAJAHI</p>
        <h2 id="explore-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Jelajahi Sudut Haramain</h2>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">Cerita, panduan, dan sudut pandang pilihan untuk melihat Makkah–Madinah lebih dekat.</p>
      </div>

      <div v-if="isLoading" class="-mx-5 mt-12 overflow-x-auto px-5 pb-3 lg:mx-0 lg:px-0">
        <div class="flex w-max gap-4 lg:grid lg:w-auto lg:grid-cols-12 lg:gap-4">
          <div v-for="i in 5" :key="i" class="h-[260px] w-[calc(100vw-4rem)] animate-pulse rounded-3xl bg-sht-stone/40 sm:w-[calc(100vw-5rem)] lg:w-auto" :class="i===1 ? 'lg:col-span-7 lg:row-span-2' : i<=3 ? 'lg:col-span-5' : 'lg:col-span-6'"></div>
        </div>
      </div>

      <div v-else class="-mx-5 mt-12 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:overflow-visible">
        <div class="flex w-max gap-4 px-5 lg:grid lg:w-auto lg:grid-cols-12 lg:grid-rows-[260px_260px_220px] lg:gap-4 lg:px-0">
          <NuxtLink v-for="entry in entries" :key="entry.key" :to="entry.href || '/hari-ini'" class="group relative min-h-[260px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold w-[calc(100vw-4rem)] flex-none snap-start overflow-hidden sm:w-[calc(100vw-5rem)] lg:w-auto lg:min-w-0 rounded-3xl border border-sht-stone p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-24px_rgba(45,53,31,0.55)] sm:p-8" :class="entry.key === 'featured' ? 'bg-sht-olive text-sht-off-white lg:col-span-7 lg:row-span-2 lg:row-start-1' : entry.key === 'local' ? 'bg-sht-stone/45 text-sht-olive-dark lg:col-span-5 lg:col-start-8 lg:row-start-1' : entry.key === 'guide' ? 'bg-sht-sage/20 text-sht-olive-dark lg:col-span-5 lg:col-start-8 lg:row-start-2' : entry.key === 'makkah' ? 'text-white lg:col-span-6 lg:col-start-1 lg:row-start-3' : 'text-white lg:col-span-6 lg:col-start-7 lg:row-start-3'">
            <template v-if="entry.image">
              <img :src="entry.image" :alt="entry.alt" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" :class="entry.key === 'featured' ? 'opacity-55' : 'opacity-65'" loading="lazy" @error="onImageError" />
              <div class="absolute inset-0 bg-gradient-to-t from-sht-olive-dark/90 via-sht-olive/35 to-transparent" aria-hidden="true" />
            </template>
            <div class="relative flex h-full min-h-[210px] flex-col justify-between">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] line-clamp-1" :class="entry.image ? 'text-sht-gold' : 'text-sht-sage'">{{ entry.label }}</p>
              <div>
                <h3 class="max-w-2xl font-hero text-2xl font-bold not-italic leading-tight sm:text-3xl line-clamp-3 break-words">{{ entry.title }}</h3>
                <p class="mt-3 max-w-xl text-sm leading-relaxed line-clamp-3 break-words" :class="entry.image ? 'text-sht-off-white/75' : 'text-sht-charcoal/70'">{{ entry.supporting }}</p>
                <span v-if="entry.href" class="mt-5 inline-flex text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold" :class="entry.image ? 'text-sht-gold' : 'text-sht-olive'">{{ entry.cue }} <span class="ml-1 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span></span>
                <span v-else class="mt-5 inline-flex text-sm opacity-70" :class="entry.image ? 'text-sht-gold' : 'text-sht-olive'">{{ entry.cue }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <p class="mt-4 text-center text-xs text-sht-charcoal/45 lg:hidden">Geser untuk melihat update lainnya →</p>
  </section>
</template>
