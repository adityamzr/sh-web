import { MEDIA_ANALYTICS_EVENTS } from '~/shared/media-analytics'
const allowed=new Set<string>(MEDIA_ANALYTICS_EVENTS),entityTypes=new Set(['article','guide','gallery','map_location']),locales=new Set(['id','en']),cities=new Set(['MAKKAH','MADINAH','GENERAL']),buckets=new Map<string,{start:number,count:number}>()
const clean=(v:unknown,max:number)=>typeof v==='string'?v.trim().slice(0,max):undefined
const uuid=(v:unknown)=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v)?v:crypto.randomUUID()
export default defineEventHandler(async event=>{
  if(Number(getHeader(event,'content-length')||0)>4096)throw createError({statusCode:413,statusMessage:'Payload terlalu besar.'})
  const ua=getHeader(event,'user-agent')||'';if(/bot|crawler|spider|slurp|headless/i.test(ua))return {ok:true,ignored:true}
  const key=(getHeader(event,'x-vercel-forwarded-for')||getHeader(event,'x-forwarded-for')||'anonymous').split(',')[0];const now=Date.now(),bucket=buckets.get(key);if(!bucket||now-bucket.start>60_000)buckets.set(key,{start:now,count:1});else if(++bucket.count>60)throw createError({statusCode:429,statusMessage:'Terlalu banyak event.'})
  const body=await readBody(event);if(!body||!allowed.has(body.eventType))throw createError({statusCode:400,statusMessage:'Event tidak valid.'})
  const path=clean(body.path,300);if(!path?.startsWith('/')||path.includes('?')||path.includes('#'))throw createError({statusCode:400,statusMessage:'Path tidak valid.'})
  const visitorId=uuid(getCookie(event,'sht_visitor')),sessionId=uuid(getCookie(event,'sht_session')),secure=process.env.NODE_ENV==='production'
  setCookie(event,'sht_visitor',visitorId,{httpOnly:true,sameSite:'lax',secure,path:'/',maxAge:15552000});setCookie(event,'sht_session',sessionId,{httpOnly:true,sameSite:'lax',secure,path:'/',maxAge:1800})
  let host='direct';const ref=clean(body.referrer,500);if(ref)try{const parsed=new URL(ref);if(parsed.host!==getHeader(event,'host'))host=parsed.hostname.replace(/^www\./,'').slice(0,120)}catch{}
  const deviceType=/ipad|tablet/i.test(ua)?'tablet':/mobile|android|iphone/i.test(ua)?'mobile':ua?'desktop':'other',locale=locales.has(body.locale)?body.locale:'id',entityType=entityTypes.has(body.entityType)?body.entityType:null,city=cities.has(body.city)?body.city:null,entityId=Number.isInteger(body.entityId)&&body.entityId>0?body.entityId:null
  const query=body.eventType==='search'?clean(body.metadata?.query,100):undefined,country=(clean(getHeader(event,'x-vercel-ip-country'),2)||'').toUpperCase(),config=useRuntimeConfig()
  if(!config.analyticsIngestSecret)return {ok:true,ignored:true}
  await $fetch(`${String(config.apiBaseUrl).replace(/\/$/,'')}/api/v1/media/analytics/events`,{method:'POST',headers:{'x-analytics-ingest-key':config.analyticsIngestSecret},body:{eventId:uuid(body.eventId),eventType:body.eventType,visitorId,sessionId,path,locale,entityType,entityId,city,category:clean(body.category,80)||null,referrerHost:host,deviceType,countryCode:/^[A-Z]{2}$/.test(country)?country:null,metadata:query?{query}:null,occurredAt:new Date().toISOString()}})
  return {ok:true}
})
