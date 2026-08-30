export type MediaFeedbackValue='HELPFUL'|'NOT_HELPFUL'
export async function submitMediaFeedback(slug:string,value:MediaFeedbackValue){const config=useRuntimeConfig();const base=String(config.public.mediaApiBaseUrl||'').replace(/\/$/,'');return await $fetch(`${base}/api/v1/media/articles/${encodeURIComponent(slug)}/feedback`,{method:'POST',body:{value}})}
