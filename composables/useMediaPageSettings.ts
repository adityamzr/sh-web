export async function useMediaPageSettings(page:string){
  const {data,pending,error}=await useAsyncData(`media-page-settings-${page}`,async()=>{
    try{
      const r=await $fetch<{data:any}>(`/api/media/page-settings/${encodeURIComponent(page)}`);
      return r.data
    }catch{
      return null
    }
  });
  return {settings:data,pending,error}
}
