<script setup lang="ts">
useSeoMeta({
  title: 'Sudut Haramain — Media Digital & Informasi Praktis Makkah–Madinah',
  description: 'Informasi praktis Makkah dan Madinah, panduan perjalanan, kultur lokal, literasi ibadah, navigasi, dan pembaruan kondisi langsung dari Sudut Haramain.',
})

const focusAreas = [
  { title: 'Literasi Ibadah & Persiapan Umrah', description: 'Panduan ibadah, persiapan perjalanan, etika, aturan kawasan masjid, dan informasi praktis bagi jamaah.' },
  { title: 'Navigasi & Transportasi', description: 'Rute perjalanan, transportasi publik, fasilitas umum, titik logistik, dan estimasi kebutuhan perjalanan di Makkah–Madinah.' },
  { title: 'Kultur & Keseharian Saudi', description: 'Kebiasaan lokal, kuliner, dinamika sosial, dan kehidupan sehari-hari di Arab Saudi.' },
  { title: 'Kondisi & Suasana Terkini', description: 'Laporan visual dan pembaruan situasi Makkah–Madinah berdasarkan pengamatan langsung tim di lokasi.' },
]
</script>

<template>
  <div>
    <section id="beranda" class="border-b border-sht-stone/70">
      <div class="mx-auto grid max-w-container items-center gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8 lg:py-36">
        <div>
          <p class="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-sht-olive-dark"><span class="h-px w-8 bg-sht-gold" aria-hidden="true" />MEDIA DIGITAL MAKKAH–MADINAH</p>
          <h1 class="mt-5 max-w-2xl font-heading text-5xl font-semibold leading-[1.05] text-sht-olive-dark sm:text-6xl">Sudut Haramain</h1>
          <p class="mt-5 text-xl font-medium leading-relaxed text-sht-olive sm:text-2xl">Media Digital &amp; Informasi Praktis Makkah–Madinah</p>
          <p class="mt-6 max-w-2xl text-base leading-relaxed text-sht-charcoal/75 sm:text-lg">Sudut Haramain menyajikan informasi praktis, panduan perjalanan, kultur lokal, dan literasi ibadah dari Makkah dan Madinah melalui perspektif tim Indonesia yang bermukim langsung di Makkah.</p>
          <div class="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#fokus-informasi" class="inline-flex min-h-[48px] items-center justify-center rounded-full bg-sht-olive px-6 py-3.5 text-base font-semibold text-sht-off-white shadow-sm transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Jelajahi Fokus Informasi</a><a href="https://tour.sudutharamain.id" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-[48px] items-center justify-center rounded-full border border-sht-olive/30 px-6 py-3.5 text-base font-semibold text-sht-olive transition-colors hover:bg-sht-olive/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Lihat Sudut Haramain Tour ↗</a></div>
        </div>
        <div class="relative flex min-h-[280px] items-center justify-center rounded-[2rem] border border-sht-stone bg-white/50 p-8"><div class="absolute inset-8 rounded-full border border-sht-gold/50" /><div class="absolute inset-16 rounded-full border border-sht-sage/35" /><div class="relative text-center"><p class="font-heading text-4xl text-sht-olive-dark">Makkah</p><span class="my-3 block text-sm uppercase tracking-[0.25em] text-sht-gold">·</span><p class="font-heading text-4xl text-sht-olive-dark">Madinah</p><p class="mt-5 text-xs uppercase tracking-[0.18em] text-sht-sage">Dari dekat, untuk yang membutuhkan</p></div></div>
      </div>
    </section>

    <section id="fokus-informasi" class="py-16 sm:py-24"><div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8"><div class="max-w-2xl"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-olive-dark">FOKUS INFORMASI</p><h2 class="mt-4 font-heading text-3xl font-semibold leading-tight text-sht-olive-dark sm:text-4xl">Informasi yang membantu Anda memahami Haramain.</h2><p class="mt-4 text-base leading-relaxed text-sht-charcoal/70">Kami mengumpulkan hal-hal praktis yang sering dibutuhkan sebelum dan selama berada di Makkah dan Madinah.</p></div><div class="mt-10 grid gap-5 sm:grid-cols-2"><article v-for="(area, index) in focusAreas" :key="area.title" class="border-t-2 border-sht-gold/70 pt-5"><span class="font-heading text-3xl text-sht-sage">0{{ index + 1 }}</span><h3 class="mt-3 font-heading text-xl font-semibold text-sht-olive-dark">{{ area.title }}</h3><p class="mt-2 max-w-md text-sm leading-relaxed text-sht-charcoal/70">{{ area.description }}</p></article></div></div></section>

    <section id="tentang" class="bg-sht-stone/35 py-16 sm:py-20"><div class="mx-auto grid max-w-container gap-8 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-olive-dark">TENTANG SUDUT HARAMAIN</p><div><h2 class="font-heading text-2xl font-semibold text-sht-olive-dark sm:text-3xl">Perspektif lokal, informasi yang proporsional.</h2><p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">Sudut Haramain adalah platform media digital yang menyajikan informasi praktis, panduan perjalanan, kultur lokal, hingga literasi ibadah di Makkah dan Madinah. Platform ini dikelola langsung oleh tim Indonesia yang tinggal di Makkah.</p><div class="mt-6 flex flex-wrap gap-2"><span class="rounded-full border border-sht-sage/40 px-3 py-1.5 text-xs font-medium text-sht-olive-dark">Observasi Langsung</span><span class="rounded-full border border-sht-sage/40 px-3 py-1.5 text-xs font-medium text-sht-olive-dark">Faktual &amp; Proporsional</span><span class="rounded-full border border-sht-sage/40 px-3 py-1.5 text-xs font-medium text-sht-olive-dark">Solutif &amp; Terintegrasi</span></div></div></div></section>

    <section class="py-16 sm:py-20"><div class="mx-auto max-w-3xl px-5 text-center sm:px-6 lg:px-8"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">EKOSISTEM SUDUT HARAMAIN</p><h2 class="mt-4 font-heading text-3xl font-semibold text-sht-olive-dark">Butuh Bantuan Perjalanan Umroh?</h2><p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">Untuk kebutuhan Umroh Mandiri, Land Arrangement, hotel, transportasi, visa, dan pendampingan perjalanan, layanan tersedia melalui Sudut Haramain Tour.</p><a href="https://tour.sudutharamain.id" target="_blank" rel="noopener noreferrer" class="mt-7 inline-flex min-h-[48px] items-center justify-center rounded-full bg-sht-gold px-7 py-3.5 font-semibold text-sht-olive-dark shadow-sm transition-colors hover:bg-[#c7b55e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Kunjungi Sudut Haramain Tour ↗</a></div></section>
  </div>
</template>
