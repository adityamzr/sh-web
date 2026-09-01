import { mediaCacheKey } from '~/shared/localization'
export async function useMediaPageSettings(page:string){
  const {locale}=useLocale()
  const {data,pending,error}=await useAsyncData(computed(()=>mediaCacheKey('page-settings',locale.value,{page})),async()=>{
    try{
      const r=await $fetch<{data:any}>(`/api/media/page-settings/${encodeURIComponent(page)}`,{query:{locale:locale.value}});
      return r.data
    }catch(e){
      console.warn(`[useMediaPageSettings] ${page} fetch failed`, e)
      return null
    }
  }, { default: () => null });
  return {settings:data,pending,error}
}
