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

function isValidCoordinate(lng: any, lat: any): boolean {
  const lngNum = Number(lng)
  const latNum = Number(lat)
  if (!Number.isFinite(lngNum) || !Number.isFinite(latNum)) return false
  if (lngNum < -180 || lngNum > 180) return false
  if (latNum < -90 || latNum > 90) return false
  // Basic sanity for Makkah/Madinah region: roughly 39-40E, 21-24N, but allow broader
  return true
}

function normalize(r:any):MediaLocation | null{
  try {
    if (!r) return null
    const lng = Number(r.longitude)
    const lat = Number(r.latitude)
    if (!isValidCoordinate(lng, lat)) {
      console.warn('[useMediaLocations] invalid coordinates skipped', r.id, lng, lat)
      return null
    }
    return {
      id:String(r.id),
      name:r.name || 'Lokasi',
      category:categoryLabels[r.category]||r.category || 'Fasilitas',
      coordinates:{lng,lat},
      shortDescription:r.shortDescription||'',
      area:r.city==='MAKKAH'?'Makkah':'Madinah',
      externalMapsUrl:r.googleMapsUrl||`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`,
      sortOrder:Number(r.sortOrder||0)
    }
  } catch (e) {
    console.warn('[useMediaLocations] normalize failed', e)
    return null
  }
}

export async function fetchMediaLocations(city:string): Promise<MediaLocation[]>{
  try {
    const r=await $fetch<{data:any[]}>('/api/media/locations',{query:{city,limit:100}});
    return (r.data||[]).map(normalize).filter(Boolean).sort((a,b)=>a!.sortOrder-b!.sortOrder) as MediaLocation[]
  } catch (e) {
    console.warn('[useMediaLocations] fetch failed', e)
    return []
  }
}

export async function useMediaLocations(city:string){
  const {data,pending,error}=await useAsyncData(`media-locations-${city}`,()=>fetchMediaLocations(city),{default:()=>[] as MediaLocation[]});
  return {locations:data,pending,error}
}
