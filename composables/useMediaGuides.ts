import type { MediaArticleBlock } from './useMediaArticles'

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

function normalize(r:any):MediaGuide{
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

export async function fetchMediaGuides(){
  const r=await $fetch<{data:any[]}>('/api/media/guides',{query:{limit:100}});
  return (r.data||[]).map(normalize).sort((a,b)=>groupOrder.indexOf(a.group)-groupOrder.indexOf(b.group)||a.sortOrder-b.sortOrder)
}

export async function useMediaGuides(){
  const {data,pending,error}=await useAsyncData('media-guides',fetchMediaGuides,{default:()=>[]});
  return {guides:data,pending,error,groupOrder}
}
