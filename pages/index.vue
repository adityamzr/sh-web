<script setup lang="ts">
useSeoMeta({
  title: 'Sudut Haramain — Media Digital & Informasi Praktis Makkah–Madinah',
  description: 'Informasi praktis Makkah dan Madinah, panduan perjalanan, kultur lokal, literasi ibadah, navigasi, dan pembaruan kondisi langsung dari Sudut Haramain.',
})

const localNotes = ['Apa yang biasanya luput dari jamaah pertama kali?', 'Membaca ritme kota dari sudut pandang orang yang tinggal di sini.', 'Catatan kecil tentang bahasa, kebiasaan, dan cara bergerak.']
</script>

<template>
  <div>
    <!-- 1. Hero / Haramain opening -->
    <MediaHero />

    <!-- 2. Hari Ini di Haramain -->
    <MediaTodaySection />

    <!-- 3. Lagi Butuh Apa? -->
    <MediaSituationalSection />

    <!-- 4. Jelajahi Sudut Haramain -->
    <MediaExploreSection />

    <!-- 5. Ada yang Bisa Kami Bantu? -->
    <MediaAssistanceSection />

    <!-- 6. More to explore -->
    <section id="lebih" class="border-t border-sht-stone py-14 sm:py-20"><div class="mx-auto flex max-w-container flex-col gap-6 px-5 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8"><div><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">MORE TO EXPLORE</p><h2 class="mt-3 font-heading text-2xl font-semibold text-sht-olive-dark sm:text-3xl">Datang untuk satu jawaban, pulang dengan konteks.</h2></div><div class="grid gap-x-10 gap-y-3 text-sm text-sht-olive sm:grid-cols-2"><a href="#hari-ini" class="hover:text-sht-olive-dark">Catatan Hari Ini →</a><a href="#fokus-informasi" class="hover:text-sht-olive-dark">Panduan Praktis →</a><a href="#lokal" class="hover:text-sht-olive-dark">Cerita Lokal →</a><a href="#toolkit" class="hover:text-sht-olive-dark">Toolkit →</a></div></div></section>
  </div>
</template>
