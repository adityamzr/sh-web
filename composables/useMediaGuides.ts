import { mediaCacheKey, type SupportedLocale } from '~/shared/localization'
import type { MediaArticleBlock } from './useMediaArticles'
import { takeMediaPreload } from '~/composables/useMediaPreload'

export type MediaGuide={
  id:number;
  title:string;
  slug:string;
  group:string;
  summary:string|null;
  body:MediaArticleBlock[];
  sortOrder:number;
  publishedAt:string|null;
  updatedAt:string|null
}

const groupOrder=['MULAI DI SINI','KEHIDUPAN DI HARAMAIN','TRANSPORTASI','HOTEL','MAKKAH','MADINAH','PERJALANAN','IBADAH']

function normalize(r:any):MediaGuide | null{
  if (!r || typeof r !== 'object' || !Number.isFinite(Number(r.id)) || typeof r.slug !== 'string' || typeof r.title !== 'string') return null
  return {
    id:r.id,
    title:r.title,
    slug:r.slug,
    group:r.group,
    summary:r.summary||null,
    body:Array.isArray(r.body)?r.body:[],
    sortOrder:Number(r.sortOrder||0),
    publishedAt:r.publishedAt,
    updatedAt:r.updatedAt
  }
}

export async function fetchMediaGuides(locale: SupportedLocale = 'id'){
  const r=await $fetch<{data:any[]}>('/api/media/guides',{query:{limit:100,locale}});
  return (r.data||[]).map(normalize).filter((guide): guide is MediaGuide => Boolean(guide)).sort((a,b)=>groupOrder.indexOf(a.group)-groupOrder.indexOf(b.group)||a.sortOrder-b.sortOrder)
}

export function useMediaGuides(){
  const {locale}=useLocale()
  const key=computed(()=>mediaCacheKey('guides',locale.value));
  const {data,pending,error}=useAsyncData<MediaGuide[]>(key,async()=>{const preload=takeMediaPreload<MediaGuide[]>(key.value);return preload.used?preload.data||[]:fetchMediaGuides(locale.value)},{default:()=>[],lazy:true});
  return {guides:data,pending,error,groupOrder}
}
