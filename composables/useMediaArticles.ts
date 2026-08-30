export type MediaArticleBlock = { type: string; level?: 2 | 3; text?: string; ordered?: boolean; items?: string[]; src?: string; alt?: string; caption?: string }
export type MediaArticle = { id: number; slug: string; title: string; excerpt: string; body: MediaArticleBlock[]; content: MediaArticleBlock[]; references?: string[]; type: 'article'|'update'|'practical'; city: 'makkah'|'madinah'|'general'; category: string; tags: string[]; contentType: 'article'|'update'|'practical'; priority: number; publishedAt: string | null; updatedAt: string | null; image: string; imageAlt: string; readingTime: string; seoTitle?: string|null; seoDescription?: string|null; ogImage?: string|null }

function normalize(row:any): MediaArticle {
  const body=Array.isArray(row.body)?row.body:[];
  const text=body.map((b:any)=>b?.text||b?.items?.join(' ')||'').join(' ');
  const minutes=Math.max(1,Math.ceil((text.length||row.excerpt?.length||0)/900));
  return {
    id:row.id,
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
    readingTime:`${minutes} menit baca`,
    seoTitle:row.seoTitle,
    seoDescription:row.seoDescription,
    ogImage:row.ogImage
  }
}

// Uses internal Nuxt server proxy -> private NUXT_API_BASE_URL
export async function fetchMediaArticles(query:Record<string,unknown>={}) {
  const response=await $fetch<{data:any[]}>('/api/media/articles',{query});
  return (response.data||[]).map(normalize)
}

export async function fetchMediaArticle(slug:string) {
  const response=await $fetch<{data:any}>(`/api/media/articles/${encodeURIComponent(slug)}`);
  return normalize(response.data)
}

export async function useMediaArticles(query:Record<string,unknown>={}) {
  const key=`media-articles-${JSON.stringify(query)}`;
  const {data,pending,error}=await useAsyncData(key,()=>fetchMediaArticles(query),{default:()=>[]});
  return {articles:data,pending,error}
}

export async function useMediaArticle(slug:string) {
  const {data,pending,error}=await useAsyncData(`media-article-${slug}`,()=>fetchMediaArticle(slug));
  return {article:data,pending,error}
}

export function formatMediaArticleDate(value:string|null) {
  return value?new Date(value).toLocaleDateString('id-ID',{day:'2-digit',month:'short',year:'numeric'}):'—'
}
