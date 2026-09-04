import type { MediaAnalyticsPayload } from '~/shared/media-analytics'
export function useMediaAnalytics(){
  const route=useRoute(),{locale}=useLocale();const sentPage=useState<string>('media-analytics:last-page',()=> '')
  function trackEvent(input:MediaAnalyticsPayload){
    if(!import.meta.client||(navigator as Navigator&{globalPrivacyControl?:boolean}).globalPrivacyControl===true||navigator.doNotTrack==='1'||(window as Window&{doNotTrack?:string}).doNotTrack==='1')return false
    const payload={...input,eventId:crypto.randomUUID(),path:(input.path??route.path).split(/[?#]/)[0].slice(0,300),locale:input.locale??locale.value}
    try{const body=JSON.stringify(payload);if(navigator.sendBeacon)return navigator.sendBeacon('/api/analytics/event',new Blob([body],{type:'application/json'}));void fetch('/api/analytics/event',{method:'POST',headers:{'content-type':'application/json'},body,keepalive:true}).catch(()=>{})}catch{}return true
  }
  function trackPageView(){const path=route.path.split(/[?#]/)[0];if(sentPage.value===path)return;const initial=!sentPage.value;sentPage.value=path;trackEvent({eventType:'page_view',path,referrer:initial?document.referrer:undefined})}
  return {trackEvent,trackPageView}
}
