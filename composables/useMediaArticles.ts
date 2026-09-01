import { mediaCacheKey, formatMediaDate, translate, type SupportedLocale } from '~/shared/localization'
import type { MaybeRefOrGetter } from 'vue'
import { takeMediaPreload } from '~/composables/useMediaPreload'
export type MediaArticleBlock = { type: string; level?: 2 | 3; text?: string; ordered?: boolean; items?: string[]; src?: string; alt?: string; caption?: string; displaySize?: 'small'|'medium'|'wide'|'full'; aspectRatio?: 'auto'|'16:9'|'4:5'|'1:1' }
export type MediaArticle = { availableLocales?: SupportedLocale[]; localizedSlugs?: Partial<Record<SupportedLocale, string>>; id: number; slug: string; title: string; excerpt: string; body: MediaArticleBlock[]; content: MediaArticleBlock[]; references?: string[]; type: 'article'|'update'|'practical'; city: 'makkah'|'madinah'|'general'; category: string; tags: string[]; contentType: 'article'|'update'|'practical'; priority: number; publishedAt: string | null; updatedAt: string | null; image: string; imageAlt: string; readingTime: string; seoTitle?: string|null; seoDescription?: string|null; ogImage?: string|null }

export function normalizeArticle(row:any, locale: SupportedLocale): MediaArticle | null {
  if (!row || typeof row !== 'object' || !Number.isFinite(Number(row.id)) || typeof row.slug !== 'string' || typeof row.title !== 'string') return null
  const body=Array.isArray(row.body)?row.body:[];
  const text=body.map((b:any)=>b?.text||b?.items?.join(' ')||'').join(' ');
  const minutes=Math.max(1,Math.ceil((text.length||row.excerpt?.length||0)/900));
  return {
    id:row.id, availableLocales: row.availableLocales, localizedSlugs: row.localizedSlugs,
    slug:row.slug,
    title:row.title,
    excerpt:row.excerpt||'',
    body,
    content:body,
    references:row.references,
    type:row.contentType||'article',
    city:String(row.city||'general').toLowerCase() as MediaArticle['city'],
    category:row.category||'Artikel',
    tags:Array.isArray(row.tags)?row.tags:[],
    contentType:row.contentType||'article',
    priority:Number(row.priority||0),
    publishedAt:row.publishedAt,
    updatedAt:row.updatedAt,
    image:row.heroImage||'',
    imageAlt:row.heroImageAlt||row.title,
    readingTime:translate(locale, '{minutes} menit baca', { minutes }),
    seoTitle:row.seoTitle,
    seoDescription:row.seoDescription,
    ogImage:row.ogImage
  }
}

// Uses internal Nuxt server proxy -> private NUXT_API_BASE_URL
export async function fetchMediaArticles(query:Record<string,unknown>={}, locale: SupportedLocale = 'id') {
  const response=await $fetch<{data:any[]}>('/api/media/articles',{query:{...query,locale}});
  return (response.data||[]).map(row => normalizeArticle(row, locale)).filter((row): row is MediaArticle => Boolean(row))
}

export async function fetchMediaArticle(slug:string, locale: SupportedLocale = 'id') {
  const response=await $fetch<{data:any}>(`/api/media/articles/${encodeURIComponent(slug)}`, { query: { locale } });
  const article = normalizeArticle(response.data, locale)
  if (!article) throw createError({ statusCode: 502, statusMessage: 'Invalid Media article response' })
  return article
}

export async function useMediaArticles(query: MaybeRefOrGetter<Record<string, unknown>> = {}) {
  const { locale } = useLocale()
  const key = computed(() => mediaCacheKey('articles', locale.value, toValue(query)))
  const { data, pending, error } = await useAsyncData(key, () => fetchMediaArticles(toValue(query), locale.value), { default: () => [] })
  return { articles: data, pending, error }
}

export async function useMediaArticle(slug: string) {
  const { locale } = useLocale()
  const key = computed(() => mediaCacheKey('article', locale.value, { slug }))
  const { data, pending, error } = await useAsyncData<MediaArticle>(key, async () => {
    const preload = takeMediaPreload<MediaArticle>(key.value)
    if (preload.used) {
      if (!preload.data) throw createError({ statusCode: 500, statusMessage: 'Media API request failed' })
      return preload.data
    }
    return fetchMediaArticle(slug, locale.value)
  })
  return { article: data, pending, error }
}

export function formatMediaArticleDate(value: string | null, locale: SupportedLocale = 'id') {
  return formatMediaDate(value, locale)
}
