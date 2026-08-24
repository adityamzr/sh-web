<script setup lang="ts">
const topics = [
  'Rekomendasi Kuliner', 'Tren Sosial', 'Transportasi Publik', 'Literasi Ibadah',
  'Kondisi Harian', 'Kultur Lokal', 'Tips Jamaah', 'Panduan Umrah',
  'Fasilitas Umum', 'Sudut Madinah', 'Rute & Navigasi', 'Etika Masjid',
  'Biaya Harian', 'Tempat Favorit', 'Info Musiman', 'Keseharian Saudi',
]
const trackIndex = ref(topics.length + 4)
const paused = ref(false)
const reducedMotion = ref(false)
const seamlessReset = ref(false)
let rotationTimer: ReturnType<typeof setInterval> | null = null

const activeTopic = computed(() => trackIndex.value % topics.length)
const activeLabel = computed(() => topics[activeTopic.value])
const topicItems = computed(() => Array.from({ length: topics.length * 3 }, (_, absoluteIndex) => ({
  label: topics[absoluteIndex % topics.length],
  absoluteIndex,
  distance: Math.abs(absoluteIndex - trackIndex.value),
})))
const trackStyle = computed<Record<string, string | number>>(() => ({
  '--topic-track-index': trackIndex.value,
  transition: seamlessReset.value ? 'none' : 'transform 650ms cubic-bezier(0.22, 0.61, 0.36, 1)',
}))

function advanceTopic() {
  if (paused.value) return
  trackIndex.value += 1
  if (trackIndex.value >= topics.length * 2) {
    window.setTimeout(() => {
      seamlessReset.value = true
      trackIndex.value = topics.length
      requestAnimationFrame(() => { seamlessReset.value = false })
    }, 700)
  }
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reducedMotion.value) rotationTimer = setInterval(advanceTopic, 3200)
})

onBeforeUnmount(() => {
  if (rotationTimer) clearInterval(rotationTimer)
})
</script>

<template>
  <section class="relative isolate overflow-hidden bg-sht-olive-dark text-sht-off-white">
    <img src="/images/makkah-editorial.jpg" alt="Suasana Makkah dari kejauhan" class="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
    <div class="absolute inset-0 -z-10 bg-sht-olive-dark/55" aria-hidden="true" />
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_42%,rgba(127,137,104,0.42),transparent_38%),linear-gradient(90deg,rgba(45,53,31,0.93)_0%,rgba(45,53,31,0.68)_42%,rgba(58,68,40,0.35)_100%)]" aria-hidden="true" />
    <div class="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-sht-olive-dark/40 to-transparent" aria-hidden="true" />

    <div class="mx-auto grid min-h-[100svh] max-w-container items-center gap-8 px-5 pb-24 pt-32 sm:px-6 sm:pb-28 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pb-32 lg:pt-36">
      <div>
        <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-gold sm:text-xs"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />DARI MAKKAH &amp; MADINAH</p>
        <h1 class="mt-6 max-w-3xl font-hero text-5xl font-bold italic leading-[0.98] tracking-[-0.03em] text-white [font-optical-sizing:auto] sm:text-[4.5rem]">Apa yang sedang terjadi di Haramain?</h1>
        <p class="mt-7 max-w-2xl text-lg leading-relaxed text-sht-off-white/90 sm:text-xl">Panduan, suasana, kultur, dan informasi praktis langsung dari Makkah–Madinah.</p>
        <p class="mt-4 text-sm text-sht-off-white/70">Dilihat dari dekat oleh tim Indonesia yang tinggal di Makkah.</p>
        <a href="#hari-ini" class="mt-9 inline-flex min-h-[48px] items-center gap-2 rounded-xl bg-sht-gold px-6 py-3.5 text-sm font-semibold text-sht-olive-dark transition-colors hover:bg-[#c7b55e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Lihat Hari Ini <span aria-hidden="true">↓</span></a>
      </div>

      <div class="ml-0 lg:ml-8 min-w-0 lg:pb-2" @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false">
        <div class="topic-viewport relative overflow-hidden" aria-label="Topik editorial Sudut Haramain" aria-live="polite">
          <span class="topic-pointer absolute left-0 z-10 -translate-y-10 md:-translate-y-[42px] text-3xl leading-none text-sht-gold" aria-hidden="true">▶</span>
          <ol class="topic-track absolute inset-x-0 top-0 ml-1" :style="trackStyle">
            <li v-for="item in topicItems" :key="item.absoluteIndex" class="flex h-[var(--topic-row-height)] items-center gap-4 pl-8 font-heading text-[1.7rem] leading-none transition-[opacity,color,font-weight] duration-500 font-bold" :class="item.absoluteIndex === trackIndex -1 ? 'text-white opacity-100' : 'text-white/25'">
              <span>{{ item.label }}</span>
            </li>
          </ol>
          <span class="sr-only">Topik aktif: {{ activeLabel }}</span>
        </div>
      </div>
    </div>

    <div class="hidden md:block absolute inset-x-0 bottom-2" aria-label="Prinsip Sudut Haramain">
      <div class="mx-auto flex max-w-container gap-8 overflow-hidden py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sht-off-white/75">
        <span class="shrink-0 text-sht-gold">Observasi Langsung</span>
        <span class="shrink-0">Faktual &amp; Proporsional</span>
        <span class="shrink-0">Dari Makkah &amp; Madinah</span>
        <span class="shrink-0">Tim Indonesia di Makkah</span>
        <span class="shrink-0">Panduan Praktis</span>
        <span class="shrink-0">Sudut Lokal</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.topic-viewport {
  --topic-row-height: 52px;
  --topic-active-center: calc(var(--topic-row-height) * 3.5);
  height: calc(var(--topic-row-height) * 7);
  mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%);
}
.topic-track {
  transform: translate3d(0, calc(var(--topic-active-center) - (var(--topic-track-index) * var(--topic-row-height))), 0);
  will-change: transform;
}
.topic-pointer { top: var(--topic-active-center); }
@media (max-width: 767px) {
  .topic-viewport {
    --topic-row-height: 43px;
    --topic-active-center: calc(var(--topic-row-height) * 4.5);
    height: calc(var(--topic-row-height) * 9);
  }
}
@media (prefers-reduced-motion: reduce) {
  .topic-track { transition: none !important; }
}
</style>
