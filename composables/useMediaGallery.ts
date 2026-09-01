import { mediaCacheKey, formatMediaDate, translate, type SupportedLocale } from '~/shared/localization'
export type MediaGalleryItem={
  id:number;
  src:string;
  alt:string;
  title:string;
  city:'makkah'|'madinah';
  locationName:string;
  category:string;
  tags:string[];
  date:string;
  description:string;
  mapUrl?:string;
  priority:number;
  publishedAt:string|null;
  orientation:'portrait'|'landscape'
}

export function normalizeGallery(r:any, locale: SupportedLocale):MediaGalleryItem{
  return {
    id:r.id,
    src:r.imageUrl||'',
    alt:r.altText||r.title||r.locationName||translate(locale, 'Visual Haramain'),
    title:r.title||r.locationName||translate(locale, 'Visual Haramain'),
    city:String(r.city||'makkah').toLowerCase() as 'makkah'|'madinah',
    locationName:r.locationName||r.title||'',
    category:String(r.category||'').toLowerCase().replace(/^./,x=>x.toUpperCase()),
    tags:Array.isArray(r.tags)?r.tags:[],
    date:formatMediaDate(r.publishedAt, locale),
    description:r.description||'',
    mapUrl:r.googleMapsUrl || (r.coordinates ? `https://www.google.com/maps/search/?api=1&query=${r.coordinates.latitude},${r.coordinates.longitude}` : undefined),
    priority:Number(r.priority||0),
    publishedAt:r.publishedAt,
    orientation:'landscape'
  }
}

export async function fetchMediaGallery(query:Record<string,unknown>={}, locale: SupportedLocale = 'id'){
  const r=await $fetch<{data:any[]}>('/api/media/gallery',{query:{limit:100,...query,locale}});
  return (r.data||[]).map(row => normalizeGallery(row, locale))
}

export async function useMediaGallery(query:Record<string,unknown>={}){
  const {locale}=useLocale()
  const {data,pending,error}=await useAsyncData(computed(()=>mediaCacheKey('gallery',locale.value,query)),()=>fetchMediaGallery(query,locale.value),{default:()=>[]});
  return {items:data,pending,error}
}
