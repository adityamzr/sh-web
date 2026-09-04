export type PublicContributionPayload={
  type:'INFORMATION_CORRECTION'|'PLACE_RECOMMENDATION'|'TIP_EXPERIENCE';
  city:'MAKKAH'|'MADINAH';
  subject?:string|null;
  message:string;
  name?:string|null;
  contact?:string|null;
  sourcePage?:string|null;
  sourceUrl?:string|null;
  mapsUrl?:string|null
}

export async function submitMediaContribution(payload:PublicContributionPayload){
  const result=await $fetch('/api/media/contributions',{
    method:'POST',
    body:payload
  })
  return result
}
