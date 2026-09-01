import { mediaCacheKey, type SupportedLocale } from '~/shared/localization'
export type MediaLocation={
  id:string;
  name:string;
  category:string;
  coordinates:{lng:number;lat:number};
  shortDescription:string;
  area:string;
  externalMapsUrl:string;
  sortOrder:number
}

const categoryLabels:Record<string,string>={
  HARAM:'Haram',
  TRANSPORTASI:'Transportasi',
  MIQAT:'Miqat',
  KULINER:'Kuliner',
  FASILITAS:'Fasilitas',
  ZIARAH:'Ziarah',
  NABAWI:'Nabawi',
  RAWDHAH:'Rawdhah'
}

export function normalizeLocation(r:any):MediaLocation | null{
  if (!r || typeof r !== 'object') return null
  const lng=Number(r.longitude),lat=Number(r.latitude)
  if (!Number.isFinite(lng)||!Number.isFinite(lat)||lng < -180||lng > 180||lat < -90||lat > 90) return null
  return {
    id:String(r.id),
    name:r.name||'Lokasi',
    category:categoryLabels[r.category]||r.category,
    coordinates:{lng,lat},
    shortDescription:r.shortDescription||'',
    area:r.city==='MAKKAH'?'Makkah':'Madinah',
    externalMapsUrl:r.googleMapsUrl||`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
    sortOrder:Number(r.sortOrder||0)
  }
}

export async function fetchMediaLocations(city:string, locale: SupportedLocale = 'id'){
  const r=await $fetch<{data:any[]}>('/api/media/locations',{query:{city,limit:100,locale}});
  return (r.data||[]).map(normalizeLocation).filter((location): location is MediaLocation => Boolean(location)).sort((a,b)=>a.sortOrder-b.sortOrder)
}

export async function useMediaLocations(city:string){
  const {locale}=useLocale()
  const {data,pending,error}=await useAsyncData(computed(()=>mediaCacheKey('locations',locale.value,{city})),()=>fetchMediaLocations(city,locale.value),{default:()=>[]});
  return {locations:data,pending,error}
}
