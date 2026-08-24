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

    <!-- 5. Two worlds -->
    <section class="bg-sht-olive-dark py-16 text-sht-off-white sm:py-24"><div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-gold">MAKKAH / MADINAH</p><h2 class="mt-4 max-w-2xl font-heading text-3xl font-semibold sm:text-4xl">Dua kota, dua ritme, banyak cara untuk memahami.</h2><div class="mt-10 grid gap-4 lg:grid-cols-2"><div id="makkah" class="relative min-h-[300px] overflow-hidden rounded-3xl p-6 sm:p-8"><img src="/images/makkah-editorial.jpg" alt="Makkah" class="absolute inset-0 h-full w-full object-cover opacity-60" /><div class="absolute inset-0 bg-sht-olive-dark/65" /><div class="relative flex h-full flex-col justify-between"><span class="text-xs uppercase tracking-[0.2em] text-sht-gold">01 / MAKKAH</span><div><h3 class="font-heading text-4xl">Gerak yang besar.</h3><p class="mt-3 max-w-md text-sm text-sht-off-white/70">Orientasi, ritme ibadah, dan cara bergerak di kota yang selalu hidup.</p></div></div></div><div id="madinah" class="relative min-h-[300px] overflow-hidden rounded-3xl bg-sht-sage/35 p-6 sm:p-8"><img src="/images/madinah-editorial.jpg" alt="Madinah" class="absolute inset-0 h-full w-full object-cover opacity-55" /><div class="absolute inset-0 bg-sht-olive/55" /><div class="relative flex h-full flex-col justify-between"><span class="text-xs uppercase tracking-[0.2em] text-sht-gold">02 / MADINAH</span><div><h3 class="font-heading text-4xl">Ruang yang lebih teduh.</h3><p class="mt-3 max-w-md text-sm text-sht-off-white/70">Jejak, adab, dan detail kecil untuk menikmati hari dengan lebih sadar.</p></div></div></div></div></div></section>

    <!-- 6. Local angle -->
    <section id="lokal" class="py-16 sm:py-24"><div class="mx-auto grid max-w-container gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8"><div class="relative min-h-[320px] overflow-hidden rounded-3xl"><img src="/images/saudi-local-detail.jpg" alt="Detail jalan lokal di Makkah" class="absolute inset-0 h-full w-full object-cover" /><div class="absolute inset-0 bg-gradient-to-t from-sht-olive-dark/80 to-transparent" /><p class="absolute bottom-6 left-6 text-xs uppercase tracking-[0.2em] text-sht-gold">SUDUT LOKAL / 01</p></div><div><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">SUDUT LOKAL</p><h2 class="mt-4 font-heading text-3xl font-semibold leading-tight text-sht-olive-dark sm:text-4xl">Yang Anda lihat dari dekat, kami bantu pahami.</h2><p class="mt-5 max-w-xl text-base leading-relaxed text-sht-charcoal/70">Sudut pandang tim Indonesia yang hidup di Makkah—tentang kebiasaan, tempat, bahasa, dan hal-hal yang sering luput dari pandangan singkat.</p><div class="mt-8 space-y-4"> <div v-for="(note, index) in localNotes" :key="note" class="flex gap-4 border-t border-sht-stone pt-4"><span class="font-heading text-xl text-sht-gold">0{{ index + 1 }}</span><p class="text-sm leading-relaxed text-sht-charcoal/70">{{ note }}</p></div></div></div></div></section>

    <!-- 7. Toolkit -->
    <section id="toolkit" class="bg-sht-stone/25 py-16 sm:py-20"><div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8"><div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-olive-dark">PRACTICAL TOOLKIT</p><h2 class="mt-4 font-heading text-3xl font-semibold text-sht-olive-dark">Bukan cuma dibaca. Nanti bisa dipakai.</h2></div><p class="max-w-xs text-sm leading-relaxed text-sht-charcoal/60">Beberapa alat praktis sedang disiapkan untuk membantu perjalanan harian.</p></div><div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><div v-for="tool in ['Estimasi harian', 'Konversi SAR', 'Transport helper', 'Checklist Umrah']" :key="tool" class="rounded-2xl border border-sht-stone bg-sht-off-white p-5"><span class="text-xs uppercase tracking-[0.15em] text-sht-sage">SEGERA HADIR</span><h3 class="mt-10 font-heading text-xl text-sht-olive-dark">{{ tool }}</h3></div></div></div></section>

    <!-- 8. Ada yang Bisa Kami Bantu? -->
    <MediaAssistanceSection />

    <!-- 9. More to explore -->
    <section id="lebih" class="border-t border-sht-stone py-14 sm:py-20"><div class="mx-auto flex max-w-container flex-col gap-6 px-5 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8"><div><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">MORE TO EXPLORE</p><h2 class="mt-3 font-heading text-2xl font-semibold text-sht-olive-dark sm:text-3xl">Datang untuk satu jawaban, pulang dengan konteks.</h2></div><div class="grid gap-x-10 gap-y-3 text-sm text-sht-olive sm:grid-cols-2"><a href="#hari-ini" class="hover:text-sht-olive-dark">Catatan Hari Ini →</a><a href="#fokus-informasi" class="hover:text-sht-olive-dark">Panduan Praktis →</a><a href="#lokal" class="hover:text-sht-olive-dark">Cerita Lokal →</a><a href="#toolkit" class="hover:text-sht-olive-dark">Toolkit →</a></div></div></section>
  </div>
</template>
