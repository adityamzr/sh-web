<script setup lang="ts">
import { useImageError } from '~/composables/useImageError'
const { onImageError, onImageFallback } = useImageError()

import { ThumbsDown, ThumbsUp } from 'lucide-vue-next'
import { useMediaArticle, useMediaArticles, formatMediaArticleDate } from '~/composables/useMediaArticles'
import { submitMediaFeedback, type MediaFeedbackValue } from '~/composables/useMediaFeedback'

const route=useRoute()
const slug=String(route.params.slug)

const {article,pending,error}=await useMediaArticle(slug)

if(error.value){
  // If 404 from API, throw proper 404
  const status = (error.value as any)?.statusCode || (error.value as any)?.data?.statusCode
  if (status === 404 || error.value.message?.includes('404') || String(error.value).includes('404')) {
    throw createError({statusCode:404,statusMessage:'Artikel tidak ditemukan'})
  }
}

if(!pending.value && !article.value){
  throw createError({statusCode:404,statusMessage:'Artikel tidak ditemukan'})
}

const {articles:allArticles, pending: relatedPending} = await useMediaArticles({limit:100})
const current=computed(() => article.value)

watch(current, (val) => {
  if (val) {
    useSeoMeta({
      title:`${val.seoTitle||val.title||'Artikel'} — Sudut Haramain`,
      description: val.seoDescription||val.excerpt||'',
      ogTitle: val.seoTitle||val.title||'Artikel',
      ogDescription: val.seoDescription||val.excerpt||'',
      ogImage: val.ogImage||val.image||''
    })
  }
}, { immediate: true })

const feedback=ref<'helpful'|'not-helpful'|null>(null)
const feedbackSubmitting=ref(false)
const feedbackError=ref('')
const feedbackKey=`sudut-haramain-feedback:${slug}`

const relatedArticles=computed(()=>{
  const cur = current.value
  if(!cur) return []
  try {
    return allArticles.value
      .filter(x=>x.slug!==cur.slug && x.slug)
      .map(item=>({item,score:(item.city===cur.city?3:0)+(item.category===cur.category?2:0)+item.tags.filter(t=>cur.tags.includes(t)).length}))
      .sort((a,b)=>b.score-a.score||b.item.priority-a.item.priority)
      .slice(0,3)
      .map(x=>x.item)
  } catch { return [] }
})

onMounted(()=>{
  try {
    const saved=localStorage.getItem(feedbackKey)
    if(saved==='HELPFUL') feedback.value='helpful'
    if(saved==='NOT_HELPFUL') feedback.value='not-helpful'
  } catch {}
})

async function selectFeedback(value:'helpful'|'not-helpful'){
  if(feedback.value||feedbackSubmitting.value) return
  feedbackError.value=''
  feedbackSubmitting.value=true
  const apiValue:MediaFeedbackValue=value==='helpful'?'HELPFUL':'NOT_HELPFUL'
  try{
    await submitMediaFeedback(slug,apiValue)
    feedback.value=value
    try { localStorage.setItem(feedbackKey,apiValue) } catch {}
  }catch(e:any){
    feedbackError.value=e?.data?.statusMessage||e?.statusMessage||'Feedback belum berhasil dikirim. Silakan coba lagi.'
  }finally{
    feedbackSubmitting.value=false
  }
}
</script>

<template>
  <div class="bg-sht-off-white pb-16 pt-28 sm:pb-28 sm:pt-32">
    <!-- Loading -->
    <div v-if="pending" class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-[820px] animate-pulse">
        <div class="h-4 w-32 rounded bg-sht-stone/50"></div>
        <div class="mt-5 h-12 w-full rounded bg-sht-stone/60"></div>
        <div class="mt-4 h-6 w-3/4 rounded bg-sht-stone/40"></div>
        <div class="mt-10 h-[400px] w-full rounded-2xl bg-sht-stone/40"></div>
      </div>
    </div>

    <article v-else-if="article" class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <header class="max-w-[820px]">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage break-words">{{ article.city }} · {{ article.category }} <span class="text-sht-stone">·</span> <span class="text-sht-charcoal/50">{{ formatMediaArticleDate(article.publishedAt) }} · {{ article.readingTime }}</span></p>
        <h1 class="mt-5 font-hero text-4xl font-bold not-italic leading-tight text-sht-olive-dark sm:text-5xl lg:text-6xl break-words">{{ article.title }}</h1>
        <p class="mt-5 max-w-3xl text-lg leading-relaxed text-sht-charcoal/70 sm:text-xl break-words">{{ article.excerpt }}</p>
      </header>

      <div class="mt-10 max-w-5xl overflow-hidden rounded-2xl bg-sht-stone">
        <img :src="article.image || '/images/makkah-editorial.jpg'" :alt="article.imageAlt" class="max-h-[620px] w-full object-cover aspect-[16/9]" loading="eager" @error="onImageFallback" />
      </div>

      <div class="mt-12 max-w-[760px]">
        <template v-for="(block, index) in article.body" :key="`${article.id}-${index}`">
          <p v-if="block.type === 'paragraph'" class="mb-6 text-base leading-[1.85] text-sht-charcoal/80 break-words">{{ block.text }}</p>
          <h2 v-else-if="block.type === 'heading' && block.level === 2" class="mb-4 mt-12 font-hero text-3xl font-bold text-sht-olive-dark break-words">{{ block.text }}</h2>
          <h3 v-else-if="block.type === 'heading'" class="mb-3 mt-8 font-hero text-2xl font-bold text-sht-olive-dark break-words">{{ block.text }}</h3>
          <ul v-else-if="block.type === 'list' && !block.ordered" class="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-sht-charcoal/80 break-words"><li v-for="item in block.items" :key="item" class="break-words">{{ item }}</li></ul>
          <ol v-else-if="block.type === 'list'" class="mb-6 list-decimal space-y-2 pl-6 text-base leading-relaxed text-sht-charcoal/80 break-words"><li v-for="item in block.items" :key="item" class="break-words">{{ item }}</li></ol>
          <blockquote v-else-if="block.type === 'blockquote'" class="mb-8 border-l-2 border-sht-gold pl-5 font-hero text-2xl leading-relaxed text-sht-olive-dark break-words">{{ block.text }}</blockquote>
          <figure v-else-if="block.type === 'image'" class="mb-8">
            <img :src="block.src" :alt="block.alt || article.title" class="w-full rounded-xl object-cover" loading="lazy" @error="onImageError" />
            <figcaption v-if="block.caption" class="mt-2 text-xs text-sht-charcoal/50 break-words">{{ block.caption }}</figcaption>
          </figure>
          <aside v-else-if="block.type === 'callout'" class="mb-8 border-l-2 border-sht-gold bg-sht-gold/10 px-5 py-4 text-sm leading-relaxed text-sht-charcoal/70 break-words">{{ block.text }}</aside>
        </template>
      </div>

      <section v-if="article.references?.length" class="mt-12 max-w-[760px] border-t border-sht-stone pt-7" aria-labelledby="references-heading">
        <h2 id="references-heading" class="font-hero text-2xl font-bold text-sht-olive-dark">Referensi</h2>
        <ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-sht-charcoal/70 break-words"><li v-for="reference in article.references" :key="reference" class="break-words">{{ reference }}</li></ul>
      </section>

      <section class="mt-14 max-w-[760px] border-t border-sht-stone pt-8" aria-labelledby="feedback-heading">
        <h2 id="feedback-heading" class="font-hero text-2xl font-bold text-sht-olive-dark">Apakah informasi ini membantu?</h2>
        <div class="mt-5 flex flex-wrap gap-3">
          <button type="button" :disabled="feedbackSubmitting || !!feedback" :aria-busy="feedbackSubmitting" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" :class="feedback === 'helpful' ? 'border-sht-gold bg-sht-gold/20 text-sht-olive-dark' : 'border-sht-olive/25 text-sht-olive hover:border-sht-gold/50'" @click="selectFeedback('helpful')">
            <ThumbsUp class="h-4 w-4" aria-hidden="true" />
            <span v-if="feedbackSubmitting && !feedback" class="mr-1 inline-block h-3 w-3 animate-spin rounded-full border-2 border-sht-olive/30 border-t-sht-olive" aria-hidden="true"></span>
            Membantu
          </button>
          <button type="button" :disabled="feedbackSubmitting || !!feedback" :aria-busy="feedbackSubmitting" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" :class="feedback === 'not-helpful' ? 'border-sht-gold bg-sht-gold/20 text-sht-olive-dark' : 'border-sht-olive/25 text-sht-olive hover:border-sht-gold/50'" @click="selectFeedback('not-helpful')">
            <ThumbsDown class="h-4 w-4" aria-hidden="true" />
            Kurang membantu
          </button>
        </div>
        <p v-if="feedbackSubmitting" class="mt-3 text-xs text-sht-charcoal/50" role="status" aria-live="polite">Mengirim feedback...</p>
        <div v-if="feedback" class="mt-4 border-l-2 border-sht-gold pl-4 text-sm leading-relaxed text-sht-charcoal/70" role="status" aria-live="polite">Terima kasih atas feedback Anda.</div>
        <p v-if="feedbackError" class="mt-3 text-sm text-red-700" role="alert" aria-live="assertive">{{ feedbackError }}</p>
      </section>

      <section v-if="relatedArticles.length" class="mt-16 border-t border-sht-stone pt-8" aria-labelledby="related-heading">
        <h2 id="related-heading" class="font-hero text-3xl font-bold text-sht-olive-dark">Baca Selanjutnya</h2>
        <div class="mt-7 grid gap-8 md:grid-cols-3">
          <article v-for="related in relatedArticles" :key="related.slug" class="group">
            <NuxtLink :to="`/artikel/${related.slug}`" class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold">
              <div class="overflow-hidden rounded-xl bg-sht-stone aspect-[3/2]"><img :src="related.image || '/images/makkah-editorial.jpg'" :alt="related.imageAlt" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" @error="onImageFallback" /></div>
              <p class="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-sht-sage line-clamp-1">{{ related.city }} · {{ related.category }}</p>
              <h3 class="mt-2 font-hero text-xl font-bold not-italic leading-snug text-sht-olive-dark group-hover:text-sht-olive line-clamp-3 break-words">{{ related.title }}</h3>
            </NuxtLink>
          </article>
        </div>
      </section>
    </article>

    <div v-else class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <CommonErrorState title="Artikel tidak ditemukan" description="Artikel yang Anda cari tidak tersedia." :show-retry="false">
        <div class="mt-6 flex justify-center gap-3">
          <NuxtLink to="/hari-ini" class="inline-flex min-h-[44px] items-center rounded-full bg-sht-olive px-5 py-2 text-sm font-semibold text-white">Lihat Sorotan</NuxtLink>
          <NuxtLink to="/" class="inline-flex min-h-[44px] items-center rounded-full border border-sht-olive/20 px-5 py-2 text-sm font-semibold text-sht-olive">Beranda</NuxtLink>
        </div>
      </CommonErrorState>
    </div>
  </div>
</template>
