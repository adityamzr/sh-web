export type MediaFeedbackValue='HELPFUL'|'NOT_HELPFUL'

export async function submitMediaFeedback(slug:string,value:MediaFeedbackValue){
  const result=await $fetch(`/api/media/articles/${encodeURIComponent(slug)}/feedback`,{
    method:'POST',
    body:{value}
  })
  return result
}
