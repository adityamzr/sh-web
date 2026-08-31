<script setup lang="ts">
import { useImageError } from '~/composables/useImageError'
const { onImageError, onImageFallback } = useImageError()

import { useMediaArticles, type MediaArticle, formatMediaArticleDate } from '~/composables/useMediaArticles'
useSeoMeta({ title: 'Sorotan Haramain — Sudut Haramain', description: 'Update, informasi praktis, dan artikel terbaru dari Makkah dan Madinah.' })

const { articles, pending, error } = await useMediaArticles({ limit: 100 })
type Tab = 'Semua' | string
const tabs: Tab[] = ['Semua', 'Makkah', 'Madinah', 'Transportasi', 'Masjid', 'Kehidupan', 'Panduan']
const route = useRoute()
const activeTab = ref<Tab>('Semua')
const latestVisibleLimit = ref(9)

const filteredArticles = computed(() => {
  try {
    return [...articles.value]
      .filter(a => a && a.slug)
      .sort((a,b)=>b.priority-a.priority || new Date(b.publishedAt||0).getTime()-new Date(a.publishedAt||0).getTime())
      .filter((article) => activeTab.value === 'Semua' || (activeTab.value === 'Makkah' || activeTab.value === 'Madinah' ? article.city === activeTab.value.toLowerCase() : article.category === activeTab.value || article.tags.includes(activeTab.value.toLowerCase())))
  } catch { return [] }
})

const headline = computed(() => filteredArticles.value[0] ?? null)
const supportingStories = computed(() => filteredArticles.value.slice(1,4))
const latestCandidates = computed(() => filteredArticles.value.slice(4))
const visibleLatest = computed(() => latestCandidates.value.slice(0,latestVisibleLimit.value))

function queryCityTab(value:unknown):Tab { return value==='makkah'?'Makkah':value==='madinah'?'Madinah':'Semua' }
function queryCategoryTab(value:unknown):Tab { return typeof value==='string'&&tabs.includes(value as string)?value as Tab:'Semua' }
function selectTab(tab:Tab){activeTab.value=tab;latestVisibleLimit.value=9}
function showMore(){latestVisibleLimit.value+=6}
function typeLabel(type:MediaArticle['contentType']){return type==='update'?'UPDATE LAPANGAN':type==='practical'?'PANDUAN':'ARTIKEL'}
function displayDate(value:string|null){return formatMediaArticleDate(value)}
watch(()=>[route.query.city,route.query.category],([city,category])=>{activeTab.value=typeof category==='string'?queryCategoryTab(category):queryCityTab(city)},{immediate:true})
</script>

<template>
  <div class="bg-sht-off-white">
    <section class="pb-0 pt-28 sm:pt-32" aria-labelledby="hari-ini-heading">
      <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />SOROTAN HARAMAIN</p>
        <h1 id="hari-ini-heading" class="mt-4 max-w-3xl font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl break-words">Yang sedang relevan dari Haramain.</h1>
        <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70 sm:text-lg">Update, informasi praktis, dan artikel terbaru dari Makkah dan Madinah.</p>
        <div class="-mx-5 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Kategori Sorotan">
          <button v-for="tab in tabs" :key="tab" type="button" role="tab" class="relative shrink-0 pb-3 text-sm font-semibold text-sht-charcoal/55 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-sht-gold after:transition-transform hover:text-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" :class="activeTab === tab ? 'text-sht-olive-dark after:scale-x-100' : ''" :aria-selected="activeTab === tab" @click="selectTab(tab)">{{ tab }}</button>
        </div>
      </div>
    </section>

    <!-- Loading -->
    <section v-if="pending" class="mx-auto max-w-container px-5 pt-10 sm:px-6 lg:px-8">
      <div class="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(20rem,1fr)] lg:gap-10">
        <div class="aspect-[4/3] animate-pulse rounded-2xl bg-sht-stone/40"></div>
        <div class="space-y-5"><div v-for="i in 3" :key="i" class="flex animate-pulse gap-4"><div class="h-20 w-28 rounded-xl bg-sht-stone/50"></div><div class="flex-1"><div class="h-3 w-20 rounded bg-sht-stone/40"></div><div class="mt-2 h-5 w-full rounded bg-sht-stone/60"></div></div></div></div>
      </div>
    </section>

    <section v-else-if="error && !articles.length" class="mx-auto max-w-container px-5 pt-10 sm:px-6 lg:px-8">
      <CommonErrorState title="Sorotan belum dapat dimuat" description="Silakan coba lagi nanti." :show-retry="false" />
    </section>

    <section v-else-if="headline" class="pt-8 sm:pt-10" aria-labelledby="featured-heading">
      <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(20rem,1fr)] lg:gap-10">
          <article class="min-w-0">
            <NuxtLink :to="`/artikel/${headline.slug}`" class="block overflow-hidden rounded-2xl bg-sht-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">
              <img :src="headline.image || '/images/makkah-editorial.jpg'" :alt="headline.imageAlt" class="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.01]" loading="lazy" @error="onImageFallback" />
            </NuxtLink>
            <div class="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sht-sage"><span class="line-clamp-1">{{ headline.city }} · {{ headline.category }}</span><span class="text-sht-stone">·</span><span class="text-sht-charcoal/50">{{ displayDate(headline.publishedAt) }}</span></div>
            <h2 id="featured-heading" class="mt-3 max-w-3xl font-hero text-3xl font-bold not-italic leading-tight text-sht-olive-dark sm:text-4xl line-clamp-4 break-words">{{ headline.title }}</h2>
            <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70 line-clamp-4 break-words">{{ headline.excerpt }}</p>
          </article>

          <div class="lg:border-l lg:border-sht-stone lg:pl-8">
            <article v-for="story in supportingStories" :key="story.id" class="group flex gap-4 border-b border-sht-stone py-5 first:pt-0 last:border-b-0 lg:gap-5">
              <NuxtLink :to="`/artikel/${story.slug}`" class="contents focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">
                <img :src="story.image || '/images/makkah-editorial.jpg'" :alt="story.imageAlt" class="h-20 w-28 shrink-0 rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02] sm:h-24 sm:w-32" loading="lazy" @error="onImageFallback" />
                <div class="min-w-0">
                  <p class="text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-sht-sage line-clamp-1">{{ story.city }} · {{ story.category }} <span class="text-sht-charcoal/40">· {{ displayDate(story.publishedAt) }}</span></p>
                  <h3 class="mt-2 font-hero text-lg font-bold not-italic leading-snug text-sht-olive-dark sm:text-xl line-clamp-3 break-words">{{ story.title }}</h3>
                  <p class="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-sht-charcoal/45">{{ typeLabel(story.type) }}</p>
                </div>
              </NuxtLink>
            </article>
            <p v-if="!supportingStories.length" class="py-8 text-sm text-sht-charcoal/50">Belum ada artikel pendukung.</p>
          </div>
        </div>
      </div>
    </section>

    <section v-else class="mx-auto max-w-container px-5 pt-10 sm:px-6 lg:px-8" aria-live="polite">
      <div class="border-t border-sht-stone py-16 text-center">
        <h2 class="font-hero text-2xl font-bold text-sht-olive-dark">Belum ada artikel dalam kategori ini.</h2>
        <p class="mt-2 text-sm text-sht-charcoal/60">Coba pilih kategori lain.</p>
        <button type="button" class="mt-4 text-sm font-semibold text-sht-olive underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" @click="selectTab('Semua')">Lihat Semua</button>
      </div>
    </section>

    <section v-if="headline" class="pb-16 pt-16 sm:pb-28 sm:pt-28" aria-labelledby="latest-hari-ini-heading">
      <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
        <div class="flex items-end justify-between gap-6">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">TERBARU</p>
            <h2 id="latest-hari-ini-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Artikel terbaru</h2>
            <p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">Artikel dan catatan terbaru dari Sudut Haramain.</p>
          </div>
        </div>

        <div v-if="latestCandidates.length" class="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="article in visibleLatest" :key="article.id" class="group min-w-0">
            <NuxtLink :to="`/artikel/${article.slug}`" class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">
              <div class="overflow-hidden rounded-2xl bg-sht-stone aspect-[3/2]"><img :src="article.image || '/images/makkah-editorial.jpg'" :alt="article.imageAlt" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" @error="onImageFallback" /></div>
              <p class="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-sht-sage line-clamp-1">{{ article.city }} · {{ article.category }} <span class="text-sht-stone">·</span> <span class="text-sht-charcoal/50">{{ displayDate(article.publishedAt) }}</span></p>
              <h3 class="mt-2 font-hero text-xl font-bold not-italic leading-snug text-sht-olive-dark sm:text-2xl line-clamp-3 break-words">{{ article.title }}</h3>
              <p class="mt-3 text-sm leading-relaxed text-sht-charcoal/65 line-clamp-3 break-words">{{ article.excerpt }}</p>
              <p class="mt-4 text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-sht-charcoal/45">{{ typeLabel(article.type) }}</p>
            </NuxtLink>
          </article>
        </div>
        <p v-else class="mt-10 border-t border-sht-stone pt-8 text-sm text-sht-charcoal/60">Belum ada artikel lain dalam kategori ini.</p>
        <div v-if="visibleLatest.length < latestCandidates.length" class="mt-12 text-center">
          <button type="button" class="inline-flex min-h-[46px] items-center justify-center rounded-full bg-sht-olive px-6 py-3 text-sm font-semibold text-sht-off-white transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" @click="showMore">Tampilkan Lebih Banyak <span class="ml-2 text-sht-gold">{{ visibleLatest.length }} dari {{ latestCandidates.length }}</span></button>
        </div>
      </div>
    </section>
  </div>
</template>
