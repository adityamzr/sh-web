<script setup lang="ts">
import { Menu, Search, X } from 'lucide-vue-next'
import { guideGroups, guideTopics, type GuideTopic } from '~/data/panduan'

useSeoMeta({
  title: 'Panduan — Sudut Haramain',
  description: 'Panduan praktis untuk memahami kehidupan, perjalanan, dan kebutuhan sehari-hari di Makkah dan Madinah.',
})

const route = useRoute()
const router = useRouter()
const searchQuery = ref('')
const isDrawerOpen = ref(false)
const activeSlug = ref('tentang-panduan')
const topicTrigger = ref<HTMLButtonElement | null>(null)
const drawerCloseButton = ref<HTMLButtonElement | null>(null)
const contentPane = ref<HTMLElement | null>(null)

const filteredGroups = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()
  if (!query) return guideGroups
  return guideGroups
    .map((group) => ({
      ...group,
      topics: group.topics.filter((topic) => [topic.title, ...(topic.keywords ?? [])].join(' ').toLocaleLowerCase().includes(query)),
    }))
    .filter((group) => group.topics.length > 0)
})

const activeTopic = computed(() => guideTopics.find((topic) => topic.slug === activeSlug.value) ?? guideTopics[0])
const activeGroup = computed(() => guideGroups.find((group) => group.topics.some((topic) => topic.slug === activeTopic.value.slug)))
const isIntroduction = computed(() => activeTopic.value.slug === 'tentang-panduan')

function topicFromHash(hash: string) {
  const slug = hash.replace(/^#/, '')
  return guideTopics.some((topic) => topic.slug === slug) ? slug : 'tentang-panduan'
}

watch(() => route.hash, (hash) => { activeSlug.value = topicFromHash(hash) }, { immediate: true })

function selectTopic(topic: GuideTopic) {
  activeSlug.value = topic.slug
  isDrawerOpen.value = false
  router.push({ path: '/panduan', hash: `#${topic.slug}` })
  nextTick(() => contentPane.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
}

function openDrawer() {
  isDrawerOpen.value = true
  nextTick(() => drawerCloseButton.value?.focus())
}

function closeDrawer(restoreFocus = true) {
  isDrawerOpen.value = false
  if (restoreFocus) nextTick(() => topicTrigger.value?.focus())
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isDrawerOpen.value) closeDrawer()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="bg-sht-off-white pt-24 text-sht-charcoal sm:pt-28">
    <div class="mx-auto max-w-[84rem] px-5 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between border-b border-sht-stone pb-5 lg:hidden">
        <div><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">PANDUAN</p><p class="mt-1 text-sm text-sht-charcoal/60">Pusat informasi praktis</p></div>
        <button ref="topicTrigger" type="button" class="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-sht-olive/25 px-4 text-sm font-semibold text-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" aria-haspopup="dialog" :aria-expanded="isDrawerOpen" @click="openDrawer"><Menu class="h-4 w-4" aria-hidden="true" />Daftar Topik</button>
      </div>

      <div class="grid lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-16">
        <aside class="hidden lg:block">
          <div class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8 pr-4">
            <div class="border-b border-sht-stone pb-5"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">PANDUAN</p><p class="mt-2 text-sm leading-relaxed text-sht-charcoal/60">Pusat informasi praktis Sudut Haramain.</p><label class="relative mt-5 block"><span class="sr-only">Cari topik panduan</span><Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sht-sage" aria-hidden="true" /><input v-model="searchQuery" type="search" placeholder="Cari topik panduan..." aria-label="Cari topik panduan" class="min-h-[44px] w-full rounded-xl border border-sht-stone bg-white pl-10 pr-3 text-sm text-sht-charcoal outline-none transition-colors placeholder:text-sht-charcoal/40 focus:border-sht-olive focus:ring-2 focus:ring-sht-olive/15" /></label></div>
            <nav class="pt-5" aria-label="Topik Panduan">
              <div v-for="group in filteredGroups" :key="group.id" class="mb-6"><h2 class="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sht-charcoal/55">{{ group.title }}</h2><div class="mt-2 ml-3.5"><button v-for="topic in group.topics" :key="topic.slug" type="button" class="relative flex min-h-[35px] w-full items-center rounded-lg px-3 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-sht-gold" :class="activeTopic.slug === topic.slug ? 'bg-sht-olive/8 font-semibold text-sht-olive-dark before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:bg-sht-gold' : 'text-sht-charcoal/75 hover:text-sht-olive-dark'" :aria-current="activeTopic.slug === topic.slug ? 'page' : undefined" @click="selectTopic(topic)">{{ topic.title }}</button></div></div>
              <p v-if="filteredGroups.length === 0" class="px-3 py-4 text-sm text-sht-charcoal/60">Topik belum ditemukan.</p>
            </nav>
          </div>
        </aside>

        <main ref="contentPane" class="min-w-0 pt-10 pb-20 lg:pt-12 lg:pb-32" aria-live="polite">
          <div class="max-w-[820px]">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">{{ isIntroduction ? 'PANDUAN SUDUT HARAMAIN' : activeGroup?.title }}</p>
            <h1 class="mt-4 font-hero text-4xl font-bold leading-tight text-sht-olive-dark sm:text-5xl">{{ isIntroduction ? 'Panduan untuk memahami Haramain lebih dekat.' : activeTopic.title }}</h1>
            <p v-if="isIntroduction" class="mt-5 max-w-3xl text-base leading-relaxed text-sht-charcoal/70 sm:text-lg">Temukan informasi praktis tentang kehidupan sehari-hari, transportasi, hotel, Makkah, Madinah, perjalanan, hingga ibadah.</p>

            <template v-if="isIntroduction">
              <div class="mt-10 space-y-5 text-base leading-relaxed text-sht-charcoal/75"><p>Sudut Haramain menyusun panduan ini sebagai referensi praktis untuk membantu Anda memahami kehidupan, perjalanan, dan kebutuhan sehari-hari selama berada di Makkah dan Madinah.</p><p>Panduan akan terus dilengkapi berdasarkan kebutuhan lapangan dan informasi yang relevan bagi jamaah serta pengunjung Haramain.</p></div>
              <section class="mt-12 border-t border-sht-stone pt-7" aria-labelledby="how-to-heading"><h2 id="how-to-heading" class="font-hero text-2xl font-bold text-sht-olive-dark">Cara menggunakan Panduan</h2><ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-sht-charcoal/70"><li>Cari topik melalui kolom pencarian</li><li>Pilih topik dari sidebar</li><li>Baca informasi langsung tanpa berpindah halaman</li></ul></section>
              <section class="mt-10 border-t border-sht-stone pt-7" aria-labelledby="scope-heading"><h2 id="scope-heading" class="font-hero text-2xl font-bold text-sht-olive-dark">Topik yang dibahas</h2><ul class="mt-4 grid gap-2 text-sm text-sht-charcoal/70 sm:grid-cols-2"><li v-for="group in guideGroups.slice(1)" :key="group.id" class="border-l-2 border-sht-gold/60 pl-3">{{ group.title.replace('KEHIDUPAN DI HARAMAIN', 'Kehidupan di Haramain').replace('TRANSPORTASI', 'Transportasi').replace('HOTEL', 'Hotel').replace('MAKKAH', 'Makkah').replace('MADINAH', 'Madinah').replace('PERJALANAN', 'Perjalanan').replace('IBADAH', 'Ibadah') }}</li></ul></section>
              <aside class="mt-10 border-l-2 border-sht-gold pl-4 text-sm leading-relaxed text-sht-charcoal/65">Untuk pembahasan fikih yang membutuhkan penjelasan lebih rinci, pengguna tetap dianjurkan merujuk kepada ustadz atau ulama yang terpercaya.</aside>
            </template>
            <template v-else>
              <div class="mt-8 border-t border-sht-stone pt-7"><p class="max-w-2xl text-base leading-relaxed text-sht-charcoal/70">{{ activeTopic.intro }}</p><p class="mt-6 inline-flex border border-sht-gold/50 bg-sht-gold/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-sht-olive-dark">{{ activeTopic.status }}</p></div>
            </template>
          </div>
        </main>
      </div>
    </div>

    <Teleport to="body"><div v-if="isDrawerOpen" class="fixed inset-0 z-[70] bg-sht-olive-dark/45 lg:hidden" role="presentation" @click.self="closeDrawer()"><aside class="flex h-full w-[90vw] max-w-[360px] flex-col bg-sht-off-white shadow-2xl" role="dialog" aria-modal="true" aria-label="Daftar topik Panduan"><div class="flex items-center justify-between border-b border-sht-stone px-5 py-4"><div><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">PANDUAN</p><p class="mt-1 text-sm text-sht-charcoal/60">Daftar topik</p></div><button ref="drawerCloseButton" type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full text-sht-olive-dark hover:bg-sht-stone/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" aria-label="Tutup daftar topik" @click="closeDrawer()"><X class="h-5 w-5" aria-hidden="true" /></button></div><div class="border-b border-sht-stone px-5 py-4"><label class="relative block"><span class="sr-only">Cari topik panduan</span><Search class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sht-sage" aria-hidden="true" /><input v-model="searchQuery" type="search" placeholder="Cari topik panduan..." aria-label="Cari topik panduan" class="min-h-[44px] w-full rounded-xl border border-sht-stone bg-white pl-10 pr-3 text-sm outline-none focus:border-sht-olive focus:ring-2 focus:ring-sht-olive/15" /></label></div><nav class="min-h-0 flex-1 overflow-y-auto px-5 py-5" aria-label="Topik Panduan Seluler"><div v-for="group in filteredGroups" :key="group.id" class="mb-6"><h2 class="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sht-charcoal/55">{{ group.title }}</h2><div class="mt-2"><button v-for="topic in group.topics" :key="topic.slug" type="button" class="relative flex min-h-[42px] w-full items-center rounded-lg px-3 text-left text-sm" :class="activeTopic.slug === topic.slug ? 'bg-sht-olive/8 font-semibold text-sht-olive-dark before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:bg-sht-gold' : 'text-sht-charcoal/75'" :aria-current="activeTopic.slug === topic.slug ? 'page' : undefined" @click="selectTopic(topic)">{{ topic.title }}</button></div></div><p v-if="filteredGroups.length === 0" class="px-3 py-4 text-sm text-sht-charcoal/60">Topik belum ditemukan.</p></nav></aside></div></Teleport>
  </div>
</template>
