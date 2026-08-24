<script setup lang="ts">
const topics = [
  'Rekomendasi Kuliner',
  'Tren Sosial',
  'Transportasi Publik',
  'Literasi Ibadah',
  'Kondisi Harian',
  'Kultur Lokal',
  'Tips Jamaah',
  'Panduan Umrah',
  'Fasilitas Umum',
  'Sudut Madinah',
  'Rute & Navigasi',
  'Etika Masjid',
  'Biaya Harian',
  'Keseharian Saudi',
]
const activeTopic = 4
</script>

<template>
  <section class="relative isolate overflow-hidden bg-sht-olive-dark text-sht-off-white">
    <img src="/images/makkah-editorial.jpg" alt="Suasana Makkah dari kejauhan" class="absolute inset-0 -z-20 h-full w-full object-cover" />
    <div class="absolute inset-0 -z-10 bg-sht-olive-dark/80" aria-hidden="true" />
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-sht-olive-dark/95 via-sht-olive-dark/75 to-sht-olive/45" aria-hidden="true" />

    <div class="mx-auto grid min-h-[720px] max-w-container items-end gap-12 px-5 pb-24 pt-36 sm:px-6 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-8 lg:pt-48">
      <div>
        <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-gold"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />DARI MAKKAH &amp; MADINAH</p>
        <h1 class="mt-6 max-w-3xl font-heading text-5xl font-semibold leading-[0.98] tracking-tight text-white sm:text-7xl">Apa yang sedang terjadi di Haramain?</h1>
        <p class="mt-7 max-w-xl text-lg leading-relaxed text-sht-off-white/85 sm:text-xl">Panduan, suasana, kultur, dan informasi praktis langsung dari Makkah–Madinah.</p>
        <p class="mt-4 text-sm text-sht-off-white/65">Dilihat dari dekat oleh tim Indonesia yang tinggal di Makkah.</p>
        <a href="#hari-ini" class="mt-9 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-sht-gold px-6 py-3.5 text-sm font-semibold text-sht-olive-dark transition-colors hover:bg-[#c7b55e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Lihat Hari Ini <span aria-hidden="true">↓</span></a>
      </div>

      <div class="lg:pb-3">
        <div class="mb-4 flex items-center justify-between border-b border-white/20 pb-3"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold">TOPIK SUDUT HARAMAIN</p><span class="text-xs text-white/45">01 — 14</span></div>
        <ol class="space-y-1 border-l border-white/20 pl-5" aria-label="Topik editorial Sudut Haramain">
          <li v-for="(topic, index) in topics" :key="topic" class="relative flex min-h-[34px] items-center text-sm transition-colors sm:text-base" :class="index === activeTopic ? 'font-semibold text-white' : 'text-white/45'">
            <span v-if="index === activeTopic" class="absolute -left-[25px] text-sht-gold" aria-hidden="true">▶</span>
            <span class="mr-3 w-7 text-xs tabular-nums text-white/30">{{ String(index + 1).padStart(2, '0') }}</span>{{ topic }}
          </li>
        </ol>
      </div>
    </div>

    <div class="absolute inset-x-0 bottom-0 border-t border-white/15 bg-sht-olive-dark/45 backdrop-blur-sm" aria-label="Prinsip Sudut Haramain"><div class="mx-auto flex max-w-container gap-8 overflow-hidden px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-sht-off-white/65 sm:px-6 lg:px-8"><span class="shrink-0 text-sht-gold">Observasi Langsung</span><span class="shrink-0">Faktual &amp; Proporsional</span><span class="shrink-0">Dari Makkah &amp; Madinah</span><span class="shrink-0">Tim Indonesia di Makkah</span><span class="shrink-0">Panduan Praktis</span><span class="shrink-0">Sudut Lokal</span></div></div>
  </section>
</template>
