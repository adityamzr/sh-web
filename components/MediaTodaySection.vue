<script setup lang="ts">
import { useImageError } from '~/composables/useImageError'
const { onImageError, onImageFallback } = useImageError()

import { useMediaArticles, formatMediaArticleDate } from '~/composables/useMediaArticles'
const { settings: homeSettings, pending: settingsPending } = await useMediaHomeSettings()
const { articles, pending: articlesPending, error: articlesError } = await useMediaArticles({ limit: 20 })

const curated = computed(() => {
  try {
    const ids = homeSettings.value?.supportingArticleIds || []
    const featuredId = homeSettings.value?.featuredArticleId
    const featured = featuredId ? articles.value.find(a => a.id === featuredId) : undefined
    const support = ids.map(id => articles.value.find(a => a.id === id)).filter((a): a is NonNullable<typeof a> => Boolean(a))
    const used = new Set<number>([...(featured ? [featured.id] : []), ...support.map(a => a.id)])
    const fallback = articles.value.filter(a => !used.has(a.id))
    const autoFeatured = featured || fallback[0] || articles.value[0]
    return {
      featured: autoFeatured,
      supporting: [...support, ...fallback.filter(a => a.id !== autoFeatured?.id)].slice(0, 3)
    }
  } catch {
    return { featured: articles.value[0] || null, supporting: articles.value.slice(1, 4) }
  }
})

const featuredUpdate = computed(() => {
  const a = curated.value.featured
  if (!a) {
    return {
      category: 'SOROTAN',
      title: 'Belum ada sorotan terbaru.',
      description: 'Belum ada artikel terbit. Silakan cek kembali nanti.',
      time: '—',
      image: '/images/makkah-editorial.jpg',
      alt: 'Sudut Haramain',
      slug: '',
      hasContent: false
    }
  }
  return {
    category: `${a.city.toUpperCase()} · ${a.category.toUpperCase()}`,
    title: a.title,
    description: a.excerpt,
    time: formatMediaArticleDate(a.publishedAt),
    image: a.image || '/images/makkah-editorial.jpg',
    alt: a.imageAlt || 'Sudut Haramain',
    slug: a.slug,
    hasContent: true
  }
})

const supportingUpdates = computed(() => curated.value.supporting.map(a => ({
  category: a.category.toUpperCase(),
  title: a.title,
  time: formatMediaArticleDate(a.publishedAt),
  image: a.image || '/images/makkah-editorial.jpg',
  alt: a.imageAlt,
  slug: a.slug
})))

const isLoading = computed(() => articlesPending.value || settingsPending.value)
const hasError = computed(() => !!articlesError.value)
const hasNoContent = computed(() => !articles.value.length && !isLoading.value)
</script>

<template>
  <section id="hari-ini" class="bg-sht-off-white py-14 sm:py-24 lg:py-28" aria-labelledby="today-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-sage sm:text-xs"><span class="h-px w-8 bg-sht-sage" aria-hidden="true" />SOROTAN</p>
          <h2 id="today-heading" class="mt-3 font-hero text-4xl font-bold italic leading-[0.98] text-sht-olive-dark sm:text-5xl">Sorotan Haramain</h2>
          <p class="mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">Catatan terbaru, kondisi lapangan, dan informasi yang relevan dari Makkah dan Madinah.</p>
        </div>
        <NuxtLink to="/hari-ini" class="text-xs font-semibold uppercase tracking-[0.16em] text-sht-olive hover:text-sht-olive-dark sm:pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">Lihat Semua Update →</NuxtLink>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(20rem,0.9fr)] lg:gap-10">
        <div class="min-h-[440px] animate-pulse rounded-[1.6rem] bg-sht-stone/40 sm:min-h-[500px]"></div>
        <div class="space-y-5">
          <div v-for="i in 3" :key="i" class="flex animate-pulse gap-4">
            <div class="h-24 w-24 rounded-xl bg-sht-stone/50"></div>
            <div class="flex-1"><div class="h-3 w-20 rounded bg-sht-stone/40"></div><div class="mt-2 h-5 w-full rounded bg-sht-stone/60"></div></div>
          </div>
        </div>
      </div>

      <!-- Error - graceful degradation, still show other sections if possible -->
      <div v-else-if="hasError && hasNoContent" class="mt-12">
        <CommonErrorState title="Sorotan belum dapat dimuat" description="Silakan coba lagi nanti atau lihat semua update." :show-retry="false">
          <NuxtLink to="/hari-ini" class="mt-4 inline-flex text-sm font-semibold text-sht-olive underline underline-offset-4">Lihat Sorotan →</NuxtLink>
        </CommonErrorState>
      </div>

      <!-- Empty -->
      <div v-else-if="hasNoContent" class="mt-12">
        <CommonEmptyState title="Belum ada sorotan terbaru" description="Artikel terbaru akan muncul di sini setelah dipublikasikan." />
      </div>

      <div v-else class="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.65fr)_minmax(20rem,0.9fr)] lg:gap-10">
        <article class="group relative min-h-[440px] overflow-hidden rounded-[1.6rem] bg-sht-olive-dark text-sht-off-white sm:min-h-[500px]">
          <template v-if="featuredUpdate.hasContent && featuredUpdate.slug">
            <NuxtLink :to="`/artikel/${featuredUpdate.slug}`" class="contents">
              <img :src="featuredUpdate.image" :alt="featuredUpdate.alt" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" loading="lazy" @error="onImageFallback" />
              <div class="absolute inset-0 bg-gradient-to-t from-sht-olive-dark/95 via-sht-olive-dark/20 to-transparent" aria-hidden="true" />
              <div class="relative flex min-h-[440px] flex-col justify-end p-6 sm:min-h-[500px] sm:p-10">
                <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-sht-gold"><span class="line-clamp-1">{{ featuredUpdate.category }}</span><span class="h-px w-6 bg-sht-gold/60" aria-hidden="true" /><span class="text-sht-off-white/65">{{ featuredUpdate.time }}</span></div>
                <h3 class="mt-4 max-w-2xl font-hero text-3xl font-bold not-italic leading-tight text-white sm:text-4xl lg:text-[2.65rem] line-clamp-3 break-words">{{ featuredUpdate.title }}</h3>
                <p class="mt-4 max-w-xl text-sm leading-relaxed text-sht-off-white/75 sm:text-base line-clamp-3 break-words">{{ featuredUpdate.description }}</p>
              </div>
            </NuxtLink>
          </template>
          <template v-else>
            <div class="absolute inset-0 bg-sht-olive-dark" />
            <div class="relative flex min-h-[440px] flex-col justify-end p-6 sm:min-h-[500px] sm:p-10">
              <div class="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-sht-gold"><span>{{ featuredUpdate.category }}</span><span class="h-px w-6 bg-sht-gold/60" aria-hidden="true" /><span class="text-sht-off-white/65">{{ featuredUpdate.time }}</span></div>
              <h3 class="mt-4 max-w-2xl font-hero text-3xl font-bold not-italic leading-tight text-white sm:text-4xl lg:text-[2.65rem] break-words">{{ featuredUpdate.title }}</h3>
              <p class="mt-4 max-w-xl text-sm leading-relaxed text-sht-off-white/75 sm:text-base break-words">{{ featuredUpdate.description }}</p>
            </div>
          </template>
        </article>

        <div class="supporting-rail -mx-5 overflow-x-auto snap-x snap-mandatory scroll-px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 lg:mx-0 lg:overflow-visible lg:pb-0" aria-label="Tiga update pendukung">
          <div class="flex w-max gap-4 px-5 lg:block lg:w-auto lg:px-0">
            <NuxtLink v-for="update in supportingUpdates" :key="update.slug" :to="`/artikel/${update.slug}`" class="group flex w-[calc(100vw-4rem)] flex-none snap-start gap-4 border-sht-stone pb-5 sm:w-[calc(100vw-6rem)] lg:w-auto lg:min-w-0 lg:gap-5 lg:py-5 lg:first:pt-0 lg:last:border-b-0 lg:last:pb-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">
              <img :src="update.image" :alt="update.alt" class="h-24 w-24 shrink-0 rounded-xl object-cover grayscale-[20%] transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-[1.02] sm:h-28 sm:w-28 lg:h-24 lg:w-24" loading="lazy" @error="onImageFallback" />
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-sht-sage"><span class="line-clamp-1">{{ update.category }}</span><span aria-hidden="true">·</span><span class="text-sht-charcoal/45">{{ update.time }}</span></div>
                <h3 class="mt-2 text-lg font-bold not-italic leading-snug text-sht-olive-dark font-hero sm:text-xl lg:text-lg line-clamp-3 break-words">{{ update.title }}</h3>
              </div>
            </NuxtLink>
            <p v-if="!supportingUpdates.length" class="w-[calc(100vw-4rem)] py-8 text-sm text-sht-charcoal/50 lg:w-auto">Belum ada artikel pendukung.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
