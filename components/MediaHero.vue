<script setup lang="ts">
const topics = [
  'Rekomendasi Kuliner', 'Tren Sosial', 'Transportasi Publik', 'Literasi Ibadah',
  'Kondisi Harian', 'Kultur Lokal', 'Tips Jamaah', 'Panduan Umrah',
  'Fasilitas Umum', 'Sudut Madinah', 'Rute & Navigasi', 'Etika Masjid',
  'Biaya Harian', 'Tempat Favorit', 'Info Musiman', 'Keseharian Saudi',
]
const activeTopic = ref(4)
const paused = ref(false)
const reducedMotion = ref(false)
let rotationTimer: ReturnType<typeof setInterval> | null = null

const streamTopics = computed(() => Array.from({ length: 9 }, (_, position) => {
  const index = (activeTopic.value - 4 + position + topics.length) % topics.length
  return { label: topics[index], position, index }
}))

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reducedMotion.value) {
    rotationTimer = setInterval(() => {
      if (!paused.value) activeTopic.value = (activeTopic.value + 1) % topics.length
    }, 3200)
  }
})

onBeforeUnmount(() => {
  if (rotationTimer) clearInterval(rotationTimer)
})
</script>

<template>
  <section class="relative isolate overflow-hidden bg-sht-olive-dark text-sht-off-white">
    <img src="/images/makkah-editorial.jpg" alt="Suasana Makkah dari kejauhan" class="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
    <div class="absolute inset-0 -z-10 bg-sht-olive-dark/65" aria-hidden="true" />
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_42%,rgba(127,137,104,0.38),transparent_38%),linear-gradient(90deg,rgba(45,53,31,0.96)_0%,rgba(45,53,31,0.78)_42%,rgba(58,68,40,0.52)_100%)]" aria-hidden="true" />
    <div class="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-sht-olive-dark/45 to-transparent" aria-hidden="true" />

    <div class="mx-auto grid min-h-[100svh] max-w-container items-center gap-12 px-5 pb-24 pt-32 sm:px-6 sm:pb-28 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8 lg:pb-32 lg:pt-36">
      <div>
        <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-gold sm:text-xs"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />DARI MAKKAH &amp; MADINAH</p>
        <h1 class="mt-6 max-w-3xl font-heading text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-[4.5rem]">Apa yang sedang terjadi di Haramain?</h1>
        <p class="mt-7 max-w-xl text-lg leading-relaxed text-sht-off-white/90 sm:text-xl">Panduan, suasana, kultur, dan informasi praktis langsung dari Makkah–Madinah.</p>
        <p class="mt-4 text-sm text-sht-off-white/70">Dilihat dari dekat oleh tim Indonesia yang tinggal di Makkah.</p>
        <a href="#hari-ini" class="mt-9 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-sht-gold px-6 py-3.5 text-sm font-semibold text-sht-olive-dark transition-colors hover:bg-[#c7b55e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Lihat Hari Ini <span aria-hidden="true">↓</span></a>
      </div>

      <div class="min-w-0 lg:pb-2" @mouseenter="paused = true" @mouseleave="paused = false">
        <div class="mb-5 flex items-center justify-between"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-gold">EDITORIAL THEMES</p><span class="text-xs text-white/45">DARI DEKAT</span></div>
        <div class="relative h-[420px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_14%,black_86%,transparent_100%)]">
          <TransitionGroup name="topic" tag="ol" class="space-y-1 pt-[166px]" aria-label="Topik editorial Sudut Haramain">
            <li v-for="item in streamTopics" :key="item.index" class="flex min-h-[43px] items-center gap-4 transition-[opacity,transform,color] duration-500" :class="item.position === 4 ? 'translate-x-0 text-2xl font-semibold text-white sm:text-[1.75rem]' : item.position === 3 || item.position === 5 ? 'translate-x-1 text-xl text-white/65 sm:text-2xl' : item.position === 2 || item.position === 6 ? 'translate-x-2 text-lg text-white/45 sm:text-xl' : 'translate-x-3 text-base text-white/25 sm:text-lg'">
              <span v-if="item.position === 4" class="text-sht-gold" aria-hidden="true">▶</span><span v-else class="w-4" aria-hidden="true" />
              <span>{{ item.label }}</span>
            </li>
          </TransitionGroup>
        </div>
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 border-t border-white/15 bg-sht-olive-dark/50 backdrop-blur-sm" aria-label="Prinsip Sudut Haramain"><div class="mx-auto flex max-w-container gap-8 overflow-hidden px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sht-off-white/75 sm:px-6 lg:px-8"><span class="shrink-0 text-sht-gold">Observasi Langsung</span><span class="shrink-0">Faktual &amp; Proporsional</span><span class="shrink-0">Dari Makkah &amp; Madinah</span><span class="shrink-0">Tim Indonesia di Makkah</span><span class="shrink-0">Panduan Praktis</span><span class="shrink-0">Sudut Lokal</span></div></div>
  </section>
</template>

<style scoped>
.topic-move,
.topic-enter-active,
.topic-leave-active {
  transition: opacity 500ms ease, transform 500ms ease;
}
.topic-enter-from,
.topic-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
@media (prefers-reduced-motion: reduce) {
  .topic-move,
  .topic-enter-active,
  .topic-leave-active { transition: none; }
}
</style>
