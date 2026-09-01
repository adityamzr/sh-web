<script setup lang="ts">
const { t, localePath, locale, basePath } = useLocale()

import { ThumbsDown, ThumbsUp } from 'lucide-vue-next'
import { useMediaArticle, useMediaArticles, formatMediaArticleDate } from '~/composables/useMediaArticles'
import { setResponseStatus } from 'h3'
import { submitMediaFeedback, type MediaFeedbackValue } from '~/composables/useMediaFeedback'
const route=useRoute()
const slug=String(route.params.slug)
const {article,pending,error}=await useMediaArticle(slug)
const {articles:allArticles}=await useMediaArticles({limit:100})
const current=article.value
const contentLinks=useContentLocaleLinks()
const fallbackIdPath = contentLinks.value?.key === route.path ? contentLinks.value.paths.id || '/hari-ini' : '/hari-ini'
if (!article.value && import.meta.server) {
  const event = useRequestEvent()
  if (event) setResponseStatus(event, error.value?.statusCode === 404 ? 404 : 503)
}
useSeoMeta({ robots: () => article.value ? 'index,follow' : 'noindex,follow' })
useSeoMeta({title:()=>`${current?.seoTitle||current?.title||t('Artikel')} — Sudut Haramain`,description:()=>current?.seoDescription||current?.excerpt||'',ogTitle:()=>current?.seoTitle||current?.title||t('Artikel'),ogDescription:()=>current?.seoDescription||current?.excerpt||'',ogImage:()=>current?.ogImage||current?.image||''})
const feedback=ref<'helpful'|'not-helpful'|null>(null),feedbackSubmitting=ref(false),feedbackError=ref('');const feedbackKey=`sudut-haramain-feedback:article:${current?.id ?? slug}`;const relatedArticles=computed(()=>{if(!current)return[];return allArticles.value.filter(x=>x.slug!==current.slug).map(item=>({item,score:(item.city===current.city?3:0)+(item.category===current.category?2:0)+item.tags.filter(t=>current.tags.includes(t)).length})).sort((a,b)=>b.score-a.score||b.item.priority-a.item.priority).slice(0,3).map(x=>x.item)})
onMounted(()=>{const saved=localStorage.getItem(feedbackKey);if(saved==='HELPFUL')feedback.value='helpful';if(saved==='NOT_HELPFUL')feedback.value='not-helpful'})
async function selectFeedback(value:'helpful'|'not-helpful'){if(feedback.value||feedbackSubmitting.value)return;feedbackError.value='';feedbackSubmitting.value=true;const apiValue:MediaFeedbackValue=value==='helpful'?'HELPFUL':'NOT_HELPFUL';try{await submitMediaFeedback(slug,apiValue);feedback.value=value;localStorage.setItem(feedbackKey,apiValue)}catch(e:any){feedbackError.value=t('Feedback belum berhasil dikirim. Silakan coba lagi.')}finally{feedbackSubmitting.value=false}}
</script>

<template>
  <section v-if="!article" class="mx-auto max-w-container px-5 pb-24 pt-36">
    <h1 class="font-hero text-3xl text-sht-olive-dark">{{ t(error?.statusCode === 404 ? (locale === 'en' ? 'Terjemahan English belum tersedia.' : 'Artikel tidak ditemukan') : 'Konten belum dapat dimuat. Silakan coba lagi.') }}</h1>
    <p v-if="locale === 'en'" class="mt-5"><NuxtLink :to="fallbackIdPath" class="font-semibold text-sht-olive underline">{{ t('Lihat versi Indonesia') }}</NuxtLink></p>
    <NuxtLink :to="localePath('/hari-ini')" class="mt-4 inline-block text-sht-olive underline">{{ t('Kembali ke Sorotan') }}</NuxtLink>
  </section>
  <div v-if="article" class="bg-sht-off-white pb-16 pt-28 sm:pb-28 sm:pt-32">
    <article class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <header class="max-w-[820px]">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">{{ t(article.city) }} · {{ t(article.category) }} <span class="text-sht-stone">·</span> <span class="text-sht-charcoal/50">{{ t(formatMediaArticleDate(article.publishedAt, locale)) }} · {{ t(article.readingTime) }}</span></p>
        <h1 class="mt-5 font-hero text-4xl font-bold not-italic leading-tight text-sht-olive-dark sm:text-5xl lg:text-6xl">{{ article.title }}</h1>
        <p class="mt-5 max-w-3xl text-lg leading-relaxed text-sht-charcoal/70 sm:text-xl">{{ article.excerpt }}</p>
      </header>

      <div class="mt-10 max-w-5xl overflow-hidden rounded-2xl bg-sht-stone"><img :src="article.image" :alt="article.imageAlt" class="max-h-[620px] w-full object-cover" /></div>

      <div class="mt-12 max-w-[760px]">
        <template v-for="(block, index) in article.body" :key="`${article.id}-${index}`">
          <p v-if="block.type === 'paragraph'" class="mb-6 text-base leading-[1.85] text-sht-charcoal/80">{{ block.text }}</p>
          <h2 v-else-if="block.type === 'heading' && block.level === 2" class="mb-4 mt-12 font-hero text-3xl font-bold text-sht-olive-dark">{{ block.text }}</h2>
          <h3 v-else-if="block.type === 'heading'" class="mb-3 mt-8 font-hero text-2xl font-bold text-sht-olive-dark">{{ block.text }}</h3>
          <ul v-else-if="block.type === 'list' && !block.ordered" class="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-sht-charcoal/80"><li v-for="item in block.items" :key="item">{{ item }}</li></ul>
          <ol v-else-if="block.type === 'list'" class="mb-6 list-decimal space-y-2 pl-6 text-base leading-relaxed text-sht-charcoal/80"><li v-for="item in block.items" :key="item">{{ item }}</li></ol>
          <blockquote v-else-if="block.type === 'blockquote'" class="mb-8 border-l-2 border-sht-gold pl-5 font-hero text-2xl leading-relaxed text-sht-olive-dark">{{ block.text }}</blockquote>
          <figure v-else-if="block.type === 'image'" class="mb-8"><img :src="block.src" :alt="block.alt" class="w-full rounded-xl object-cover" /><figcaption v-if="block.caption" class="mt-2 text-xs text-sht-charcoal/50">{{ block.caption }}</figcaption></figure>
          <aside v-else-if="block.type === 'callout'" class="mb-8 border-l-2 border-sht-gold bg-sht-gold/10 px-5 py-4 text-sm leading-relaxed text-sht-charcoal/70">{{ block.text }}</aside>
        </template>
      </div>

      <section v-if="article.references?.length" class="mt-12 max-w-[760px] border-t border-sht-stone pt-7" aria-labelledby="references-heading"><h2 id="references-heading" class="font-hero text-2xl font-bold text-sht-olive-dark">{{ t('Referensi') }}</h2><ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-sht-charcoal/70"><li v-for="reference in article.references" :key="reference">{{ reference }}</li></ul></section>

      <section class="mt-14 max-w-[760px] border-t border-sht-stone pt-8" aria-labelledby="feedback-heading"><h2 id="feedback-heading" class="font-hero text-2xl font-bold text-sht-olive-dark">{{ t('Apakah informasi ini membantu?') }}</h2><div class="mt-5 flex flex-wrap gap-3"><button type="button" :disabled="feedbackSubmitting || !!feedback" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-default disabled:opacity-70" :class="feedback === 'helpful' ? 'border-sht-gold bg-sht-gold/20 text-sht-olive-dark' : 'border-sht-olive/25 text-sht-olive'" @click="selectFeedback('helpful')"><ThumbsUp class="h-4 w-4" aria-hidden="true" />{{ t('Membantu') }}</button><button type="button" :disabled="feedbackSubmitting || !!feedback" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 py-2 text-sm font-semibold transition-colors disabled:cursor-default disabled:opacity-70" :class="feedback === 'not-helpful' ? 'border-sht-gold bg-sht-gold/20 text-sht-olive-dark' : 'border-sht-olive/25 text-sht-olive'" @click="selectFeedback('not-helpful')"><ThumbsDown class="h-4 w-4" aria-hidden="true" />{{ t('Kurang membantu') }}</button></div><p v-if="feedbackSubmitting" class="mt-3 text-xs text-sht-charcoal/50" role="status">{{ t('Mengirim feedback...') }}</p><div v-if="feedback" class="mt-4 border-l-2 border-sht-gold pl-4 text-sm leading-relaxed text-sht-charcoal/70" role="status">{{ t('Terima kasih atas feedback Anda.') }}</div><p v-if="feedbackError" class="mt-3 text-sm text-red-700" role="alert">{{ t(feedbackError) }}</p></section>

      <section v-if="relatedArticles.length" class="mt-16 border-t border-sht-stone pt-8" aria-labelledby="related-heading"><h2 id="related-heading" class="font-hero text-3xl font-bold text-sht-olive-dark">{{ t('Baca Selanjutnya') }}</h2><div class="mt-7 grid gap-8 md:grid-cols-3"><article v-for="related in relatedArticles" :key="related.slug" class="group"><NuxtLink :to="localePath(`/artikel/${related.slug}`)" class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold"><div class="overflow-hidden rounded-xl bg-sht-stone"><img :src="related.image" :alt="related.imageAlt" class="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" /></div><p class="mt-4 text-[0.68rem] font-semibold uppercase tracking-[0.15em] text-sht-sage">{{ t(related.city) }} · {{ t(related.category) }}</p><h3 class="mt-2 font-hero text-xl font-bold not-italic leading-snug text-sht-olive-dark group-hover:text-sht-olive">{{ related.title }}</h3></NuxtLink></article></div></section>
    </article>
  </div>
</template>
