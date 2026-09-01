import { mediaCacheKey, type SupportedLocale } from '~/shared/localization'
export type MediaHomeSettings={
  translationAvailable?:boolean;
  availableLocales?:SupportedLocale[];
  heroImageUrl:string|null;
  heroHeadline:string|null;
  heroSubheadline:string|null;
  heroTopicOverride:Array<{id:string;label:string;isActive:boolean;sortOrder:number}>|null;
  featuredArticleId:number|null;
  supportingArticleIds:number[];
  editorialArticleIds:number[]
}

export async function fetchMediaHomeSettings(locale: SupportedLocale = 'id'){
  try{
    const r=await $fetch<{data:MediaHomeSettings}>('/api/media/page-settings/home',{query:{locale}});
    return r.data
  }catch{
    return null
  }
}

export async function useMediaHomeSettings(){
  const {locale}=useLocale()
  const {data,pending,error}=await useAsyncData(computed(()=>mediaCacheKey('home-settings',locale.value)),()=>fetchMediaHomeSettings(locale.value),{default:()=>null});
  return {settings:data,pending,error}
}
