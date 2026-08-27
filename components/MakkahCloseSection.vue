<script setup lang="ts">
const stories = [
  { key: 'primary', category: 'KOTA · MAKKAH', title: 'Makkah yang tidak terlihat dari pelataran Masjidil Haram.', summary: 'Di luar arus jamaah, kota ini memiliki ritme, kawasan, dan keseharian yang berjalan dengan caranya sendiri.', image: '/images/saudi-local-detail.jpg', alt: 'Detail lingkungan kota Makkah', variant: 'primary' },
  { key: 'haram', category: 'HARAM · KESEHARIAN', title: 'Kenapa ritme sekitar Haram berubah setelah waktu Isya?', summary: '', image: '/images/makkah-editorial.jpg', alt: 'Suasana Makkah dari kejauhan', variant: 'image' },
  { key: 'movement', category: 'TRANSPORTASI', title: 'Cara warga melihat jarak dan pergerakan di Makkah.', summary: 'Membaca kota dari rute dan kebiasaan sehari-hari.', image: '', alt: '', variant: 'text' },
  { key: 'local', category: 'SUDUT LOKAL', title: 'Area yang sering dilewati jamaah, tetapi jarang benar-benar diperhatikan.', summary: 'Catatan kecil tentang tempat, ritme, dan detail kota.', image: '/images/madinah-editorial.jpg', alt: 'Suasana kawasan kota dari kejauhan', variant: 'wide' },
  { key: 'daily', category: 'KESEHARIAN · MAKKAH', title: 'Kota ini mulai terasa berbeda ketika jamaah mulai meninggalkan pusat keramaian.', summary: 'Ritme Makkah berubah dari satu kawasan ke kawasan lainnya.', image: '', alt: '', variant: 'daily' },
]
</script>

<template>
  <section class="bg-sht-off-white py-14 sm:py-28" aria-labelledby="makkah-close-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-3xl"><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">CERITA &amp; SUDUT LOKAL</p><h2 id="makkah-close-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Makkah dari Dekat</h2><p class="mt-4 max-w-2xl text-base leading-relaxed text-sht-charcoal/70">Cerita, kebiasaan, dan hal-hal praktis yang sering baru terlihat ketika Makkah dilihat lebih lama.</p></div>

      <div class="mt-12 grid gap-4 lg:grid-cols-12 lg:grid-rows-[260px_260px_190px]">
        <article v-for="story in stories" :key="story.key" class="group relative min-h-[260px] min-w-0 snap-start overflow-hidden rounded-3xl border border-sht-stone p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_-24px_rgba(45,53,31,0.55)] sm:p-8" :class="[{ 'bg-sht-olive text-sht-off-white lg:col-span-7 lg:row-span-2': story.variant === 'primary', 'text-white lg:col-span-5 lg:col-start-8 lg:row-start-1': story.variant === 'image', 'bg-sht-gold/20 text-sht-olive-dark lg:col-span-5 lg:col-start-8 lg:row-start-2': story.variant === 'text', 'bg-sht-sage/20 text-sht-olive-dark lg:col-span-5 lg:col-start-8 lg:row-start-3': story.variant === 'daily', 'text-white lg:col-span-7 lg:row-start-3': story.variant === 'wide' }, story.variant !== 'primary' ? 'hidden lg:block' : '']">
          <template v-if="story.image"><img :src="story.image" :alt="story.alt" class="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-[1.02]" /><div class="absolute inset-0 bg-gradient-to-t from-sht-olive-dark/90 via-sht-olive/35 to-transparent" aria-hidden="true" /></template>
          <div class="relative flex h-full min-h-[210px] flex-col justify-between"><p class="text-xs font-semibold uppercase tracking-[0.18em]" :class="story.image ? 'text-sht-gold' : 'text-sht-sage'">{{ story.category }}</p><div><h3 class="max-w-2xl font-hero text-2xl font-bold not-italic leading-tight sm:text-3xl" :class="story.variant === 'primary' ? 'lg:text-4xl' : ''">{{ story.title }}</h3><p v-if="story.summary" class="mt-3 max-w-xl text-sm leading-relaxed" :class="story.image ? 'text-sht-off-white/75' : 'text-sht-charcoal/70'">{{ story.summary }}</p><span class="mt-5 inline-flex text-sm opacity-70" :class="story.image ? 'text-sht-gold' : 'text-sht-olive'">Baca catatan</span></div></div>
        </article>
      </div>

      <div class="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-0 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden" aria-label="Cerita Makkah lainnya"><template v-for="story in stories.slice(1)" :key="story.key"><article class="min-w-[82%] snap-start rounded-3xl border border-sht-stone bg-white p-5"><p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">{{ story.category }}</p><h3 class="mt-3 font-hero text-xl font-bold not-italic leading-tight text-sht-olive-dark">{{ story.title }}</h3><p v-if="story.summary" class="mt-3 text-sm leading-relaxed text-sht-charcoal/70">{{ story.summary }}</p><span class="mt-5 inline-flex text-sm opacity-70 text-sht-olive">Baca catatan</span></article></template></div>
    </div>
  </section>
</template>
