export type MediaHomeSettings={
  heroImageUrl:string|null;
  heroHeadline:string|null;
  heroSubheadline:string|null;
  heroTopicOverride:Array<{id:string;label:string;isActive:boolean;sortOrder:number}>|null;
  featuredArticleId:number|null;
  supportingArticleIds:number[];
  editorialArticleIds:number[]
}

export async function fetchMediaHomeSettings(): Promise<MediaHomeSettings | null>{
  try{
    const r=await $fetch<{data:MediaHomeSettings}>('/api/media/page-settings/home');
    return r.data
  }catch(e){
    console.warn('[useMediaHomeSettings] fetch failed', e)
    return null
  }
}

export async function useMediaHomeSettings(){
  const {data,pending,error}=await useAsyncData('media-home-settings',fetchMediaHomeSettings,{default:()=>null as MediaHomeSettings | null});
  return {settings:data,pending,error}
}
