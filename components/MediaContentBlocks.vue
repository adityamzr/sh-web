<script setup lang="ts">
import type { MediaArticleBlock } from '~/composables/useMediaArticles'
import { articleImageFigureStyle, articleImageObjectStyle, articleImageRatioStyle } from '~/shared/article-block-presentation'

withDefaults(defineProps<{ body: MediaArticleBlock[]; variant?: 'article' | 'guide'; fallbackImageAlt?: string }>(), {
  variant: 'article',
  fallbackImageAlt: '',
})
const { onImageFallback } = useImageError()
</script>

<template>
  <template v-for="(block, index) in body" :key="index">
    <MediaRichTextRenderer v-if="block.type === 'richText' && block.content" :document="block.content" :variant="variant" />
    <p v-else-if="block.type === 'paragraph'" class="mb-6 text-base leading-[1.85] text-sht-charcoal/80" :class="variant === 'article' ? 'max-w-[760px]' : ''">{{ block.text }}</p>
    <h2 v-else-if="block.type === 'heading' && block.level === 2" class="mb-4 mt-12 font-hero text-3xl font-bold text-sht-olive-dark" :class="variant === 'article' ? 'max-w-[760px]' : ''">{{ block.text }}</h2>
    <h3 v-else-if="block.type === 'heading'" class="mb-3 mt-8 font-hero text-2xl font-bold text-sht-olive-dark" :class="variant === 'article' ? 'max-w-[760px]' : ''">{{ block.text }}</h3>
    <ul v-else-if="block.type === 'list' && !block.ordered" class="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed text-sht-charcoal/80" :class="variant === 'article' ? 'max-w-[760px]' : ''"><li v-for="(item, itemIndex) in block.items" :key="itemIndex">{{ item }}</li></ul>
    <ol v-else-if="block.type === 'list'" class="mb-6 list-decimal space-y-2 pl-6 text-base leading-relaxed text-sht-charcoal/80" :class="variant === 'article' ? 'max-w-[760px]' : ''"><li v-for="(item, itemIndex) in block.items" :key="itemIndex">{{ item }}</li></ol>
    <blockquote v-else-if="block.type === 'blockquote'" class="mb-8 border-l-2 border-sht-gold pl-5 font-hero text-2xl leading-relaxed text-sht-olive-dark" :class="variant === 'article' ? 'max-w-[760px]' : ''">{{ block.text }}</blockquote>
    <figure v-else-if="block.type === 'image'" class="mx-auto mb-8 w-full" :style="articleImageFigureStyle(block)"><div class="overflow-hidden rounded-xl" :style="articleImageRatioStyle(block)"><img :src="block.src" :alt="block.alt || fallbackImageAlt" class="w-full" :style="articleImageObjectStyle(block)" @error="onImageFallback" /></div><figcaption v-if="block.caption" class="mt-2 text-xs text-sht-charcoal/50">{{ block.caption }}</figcaption></figure>
    <aside v-else-if="block.type === 'callout'" class="mb-8 border-l-2 border-sht-gold bg-sht-gold/10 px-5 py-4 text-sm leading-relaxed text-sht-charcoal/70" :class="variant === 'article' ? 'max-w-[760px]' : ''">{{ block.text }}</aside>
    <MediaContentTable v-else-if="block.type === 'table'" :block="block" />
  </template>
</template>
