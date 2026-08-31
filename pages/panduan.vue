<script setup lang="ts">
import { useImageError } from '~/composables/useImageError'
const { onImageError, onImageFallback } = useImageError()

import { Menu, Search, X } from 'lucide-vue-next'
import { useMediaGuides, type MediaGuide } from '~/composables/useMediaGuides'
useSeoMeta({title:'Panduan — Sudut Haramain',description:'Panduan praktis untuk memahami kehidupan, perjalanan, dan kebutuhan sehari-hari di Makkah dan Madinah.'})

const route=useRoute(),router=useRouter()
const {guides,pending,error}=await useMediaGuides()
const searchQuery=ref('')
const isDrawerOpen=ref(false)
const topicTrigger=ref<HTMLButtonElement|null>(null)
const drawerCloseButton=ref<HTMLButtonElement|null>(null)
const contentPane=ref<HTMLElement|null>(null)

const grouped=computed(()=>{
  try {
    const q=searchQuery.value.trim().toLocaleLowerCase()
    return guides.value.reduce((groups,g)=>{
      if(q && !`${g.title} ${g.summary||''}`.toLocaleLowerCase().includes(q)) return groups
      const existing=groups.find(x=>x.title===g.group)
      if(existing) existing.topics.push(g)
      else groups.push({title:g.group,topics:[g]})
      return groups
    },[] as Array<{title:string;topics:MediaGuide[]}>)
  } catch { return [] }
})

const all= computed(()=>guides.value)
const activeSlug=ref('')

const activeTopic=computed(()=>all.value.find(g=>g.slug===activeSlug.value)||all.value[0]||null)
const activeGroup=computed(()=>activeTopic.value?.group||'')

function topicFromHash(hash:string){
  const slug=hash.replace(/^#/,'')
  if (!slug) return all.value[0]?.slug||''
  return all.value.some(g=>g.slug===slug)?slug:(all.value[0]?.slug||'')
}

watch([()=>route.hash,all],()=>{
  activeSlug.value=topicFromHash(route.hash as string)
},{immediate:true})

function selectTopic(topic:MediaGuide){
  activeSlug.value=topic.slug
  isDrawerOpen.value=false
  router.push({path:'/panduan',hash:`#${topic.slug}`})
  nextTick(()=>{
    if (contentPane.value) {
      const headerOffset = 100
      const elementPosition = contentPane.value.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  })
}

function openDrawer(){
  isDrawerOpen.value=true
  nextTick(()=>drawerCloseButton.value?.focus())
}
function closeDrawer(restore=true){
  isDrawerOpen.value=false
  if(restore) nextTick(()=>topicTrigger.value?.focus())
}
function onKeydown(e:KeyboardEvent){
  if(e.key==='Escape'&&isDrawerOpen.value) closeDrawer()
}
onMounted(()=>window.addEventListener('keydown',onKeydown))
onBeforeUnmount(()=>window.removeEventListener('keydown',onKeydown))
</script>

<template>
  <div class="bg-sht-off-white pt-24 text-sht-charcoal sm:pt-28">
    <div class="mx-auto max-w-[84rem] px-5 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between border-b border-sht-stone pb-5 lg:hidden">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">PANDUAN</p>
          <p class="mt-1 text-sm text-sht-charcoal/60">Pusat informasi praktis</p>
        </div>
        <button ref="topicTrigger" type="button" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 text-sm font-semibold text-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" @click="openDrawer" aria-label="Buka daftar topik">
          <Menu class="h-4 w-4" aria-hidden="true"/>Daftar Topik
        </button>
      </div>

      <div class="grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
        <aside class="hidden lg:block">
          <div class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8 pr-4">
            <div class="border-b border-sht-stone pb-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">PANDUAN</p>
              <p class="mt-2 text-sm leading-relaxed text-sht-charcoal/60">Pusat informasi praktis Sudut Haramain.</p>
              <label class="relative mt-5 block">
                <span class="sr-only">Cari topik panduan</span>
                <Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sht-sage" aria-hidden="true"/>
                <input v-model="searchQuery" type="search" placeholder="Cari topik panduan..." class="min-h-[44px] w-full rounded-xl border border-sht-stone bg-white pl-10 pr-3 text-sm focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/15" />
              </label>
            </div>
            <nav class="pt-5" aria-label="Daftar panduan">
              <div v-for="group in grouped" :key="group.title" class="mb-6">
                <h2 class="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sht-charcoal/55 break-words">{{group.title}}</h2>
                <div class="mt-2 ml-3.5">
                  <button v-for="topic in group.topics" :key="topic.slug" type="button" class="relative flex min-h-[35px] w-full items-center rounded-lg px-3 text-left text-sm break-words focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" :class="activeTopic?.slug===topic.slug?'bg-sht-olive/8 font-semibold text-sht-olive-dark before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:bg-sht-gold':'text-sht-charcoal/75 hover:bg-sht-stone/40'" @click="selectTopic(topic)">
                    <span class="line-clamp-2">{{topic.title}}</span>
                  </button>
                </div>
              </div>
              <p v-if="!grouped.length&&!pending" class="px-3 py-4 text-sm text-sht-charcoal/60">Topik belum ditemukan.</p>
              <div v-if="pending" class="space-y-3 px-3 py-4">
                <div v-for="i in 5" :key="i" class="h-4 w-full animate-pulse rounded bg-sht-stone/50"></div>
              </div>
            </nav>
          </div>
        </aside>

        <main ref="contentPane" class="min-w-0 scroll-mt-28 pt-10 pb-20 lg:pt-12 lg:pb-32" aria-live="polite">
          <div v-if="pending" class="max-w-[820px] py-16">
            <div class="h-4 w-24 animate-pulse rounded bg-sht-stone/50"></div>
            <div class="mt-4 h-10 w-3/4 animate-pulse rounded bg-sht-stone/60"></div>
            <div class="mt-6 space-y-3">
              <div v-for="i in 6" :key="i" class="h-4 w-full animate-pulse rounded bg-sht-stone/30"></div>
            </div>
          </div>

          <div v-else-if="error" class="max-w-[820px]">
            <CommonErrorState title="Panduan belum dapat dimuat" description="Silakan coba lagi dalam beberapa saat. Jika masih gagal, coba muat ulang halaman." :show-retry="false">
              <button type="button" class="mt-4 text-sm font-semibold text-sht-olive underline underline-offset-4" @click="$router.go(0)">Muat ulang</button>
            </CommonErrorState>
          </div>

          <div v-else-if="!activeTopic" class="max-w-[820px] py-16">
            <CommonEmptyState title="Belum ada panduan" description="Panduan praktis akan muncul di sini setelah tersedia." />
          </div>

          <div v-else class="max-w-[820px]">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage break-words">{{activeGroup}}</p>
            <h1 class="mt-4 font-hero text-4xl font-bold leading-tight text-sht-olive-dark sm:text-5xl break-words line-clamp-6">{{activeTopic.title}}</h1>
            <p v-if="activeTopic.summary" class="mt-5 max-w-3xl text-base leading-relaxed text-sht-charcoal/70 sm:text-lg break-words">{{activeTopic.summary}}</p>

            <div v-if="activeTopic.body.length" class="mt-10">
              <template v-for="(block,i) in activeTopic.body" :key="i">
                <p v-if="block.type==='paragraph'" class="mb-6 text-base leading-[1.85] text-sht-charcoal/80 break-words">{{block.text}}</p>
                <h2 v-else-if="block.type==='heading'&&block.level===2" class="mb-4 mt-12 font-hero text-3xl font-bold text-sht-olive-dark break-words">{{block.text}}</h2>
                <h3 v-else-if="block.type==='heading'" class="mb-3 mt-8 font-hero text-2xl font-bold text-sht-olive-dark break-words">{{block.text}}</h3>
                <ul v-else-if="block.type==='list'&&!block.ordered" class="mb-6 list-disc space-y-2 pl-6 text-base leading-relaxed break-words"><li v-for="item in block.items" :key="item" class="break-words">{{item}}</li></ul>
                <ol v-else-if="block.type==='list'" class="mb-6 list-decimal space-y-2 pl-6 text-base leading-relaxed break-words"><li v-for="item in block.items" :key="item" class="break-words">{{item}}</li></ol>
                <blockquote v-else-if="block.type==='blockquote'" class="mb-8 border-l-2 border-sht-gold pl-5 font-hero text-2xl leading-relaxed text-sht-olive-dark break-words">{{block.text}}</blockquote>
                <figure v-else-if="block.type==='image'" class="mb-8">
                  <img :src="block.src" :alt="block.alt||activeTopic.title" class="w-full rounded-xl object-cover" loading="lazy" @error="onImageError" />
                  <figcaption v-if="block.caption" class="mt-2 text-xs text-sht-charcoal/50 break-words">{{block.caption}}</figcaption>
                </figure>
                <aside v-else-if="block.type==='callout'" class="mb-8 border-l-2 border-sht-gold bg-sht-gold/10 px-5 py-4 text-sm leading-relaxed break-words">{{block.text}}</aside>
              </template>
            </div>
            <div v-else class="mt-10 border-t border-sht-stone pt-7 text-sm text-sht-charcoal/60">Konten panduan belum tersedia.</div>
          </div>
        </main>
      </div>
    </div>

    <Teleport to="body">
      <div v-if="isDrawerOpen" class="fixed inset-0 z-[70] bg-sht-olive-dark/45 lg:hidden" @click.self="closeDrawer()">
        <aside class="flex h-full w-[90vw] max-w-[360px] flex-col bg-sht-off-white" role="dialog" aria-modal="true" aria-label="Daftar topik panduan">
          <div class="flex items-center justify-between border-b border-sht-stone px-5 py-4">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">DAFTAR TOPIK</p>
            <button ref="drawerCloseButton" type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-sht-stone/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" aria-label="Tutup daftar topik" @click="closeDrawer()"><X class="h-5 w-5" aria-hidden="true" /></button>
          </div>
          <div class="border-b border-sht-stone px-5 py-4">
            <label class="block">
              <span class="sr-only">Cari topik</span>
              <input v-model="searchQuery" type="search" placeholder="Cari topik panduan..." class="min-h-[44px] w-full rounded-xl border border-sht-stone bg-white px-3 text-sm focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/15" />
            </label>
          </div>
          <nav class="min-h-0 flex-1 overflow-y-auto px-5 py-5" aria-label="Daftar panduan mobile">
            <div v-for="group in grouped" :key="group.title" class="mb-6">
              <h2 class="px-3 text-[0.68em] font-semibold uppercase tracking-[0.18em] text-sht-charcoal/55 break-words">{{group.title}}</h2>
              <button v-for="topic in group.topics" :key="topic.slug" type="button" class="flex min-h-[42px] w-full items-center rounded-lg px-3 text-left text-sm break-words focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" :class="activeTopic?.slug===topic.slug?'bg-sht-olive/8 font-semibold':'text-sht-charcoal/75'" @click="selectTopic(topic)"><span class="line-clamp-2">{{topic.title}}</span></button>
            </div>
            <p v-if="!grouped.length" class="px-3 py-4 text-sm text-sht-charcoal/60">Topik belum ditemukan.</p>
          </nav>
        </aside>
      </div>
    </Teleport>
  </div>
</template>
