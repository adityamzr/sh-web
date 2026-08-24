<script setup lang="ts">
const situations = [
  { number: '01', title: 'Baru Sampai', description: 'Bandara, SIM, internet, transportasi awal, dan kebutuhan pertama setelah tiba.', tone: 'light' },
  { number: '02', title: 'Mau ke Masjidil Haram', description: 'Akses, pintu masuk, rute, waktu, dan fasilitas sekitar Haram.', tone: 'image', image: '/images/makkah-editorial.jpg' },
  { number: '03', title: 'Cari Transportasi', description: 'Bus, kereta, taksi, rute umum, dan pilihan mobilitas.', tone: 'dark' },
  { number: '04', title: 'Lagi Cari Makan', description: 'Kuliner lokal, tempat makan, harga, dan rekomendasi sekitar.', tone: 'gold' },
  { number: '05', title: 'Persiapan Umrah', description: 'Miqat, ihram, perlengkapan, manasik, dan hal yang perlu disiapkan.', tone: 'sage' },
  { number: '06', title: 'Sedang di Madinah', description: 'Nabawi, transportasi, ziarah, kuliner, dan kehidupan sekitar Madinah.', tone: 'image', image: '/images/madinah-editorial.jpg' },
]
</script>

<template>
  <section class="bg-[#EFEDE4] py-16 sm:py-24" aria-labelledby="situational-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <p class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-sht-olive-dark sm:text-xs"><span class="h-px w-8 bg-sht-olive-dark" aria-hidden="true" />TEMUKAN BERDASARKAN KEBUTUHAN</p>
        <h2 id="situational-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Lagi Butuh Apa?</h2>
        <p class="mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">Pilih situasi yang paling dekat dengan kebutuhan Anda sekarang.</p>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
        <article
          v-for="(item, index) in situations"
          :key="item.number"
          class="group relative min-h-[230px] overflow-hidden rounded-3xl border p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_-20px_rgba(45,53,31,0.6)] lg:p-8"
          :class="[
            index === 0 ? 'lg:col-span-5' : index === 1 ? 'lg:col-span-7' : index === 2 || index === 3 || index === 4 ? 'lg:col-span-4' : 'lg:col-span-8',
            item.tone === 'dark' ? 'border-sht-olive bg-sht-olive text-sht-off-white' : item.tone === 'gold' ? 'border-sht-gold/40 bg-sht-gold/25 text-sht-olive-dark' : item.tone === 'sage' ? 'border-sht-sage/35 bg-sht-sage/20 text-sht-olive-dark' : item.tone === 'image' ? 'border-sht-olive-dark bg-sht-olive-dark text-white' : 'border-sht-stone bg-sht-off-white text-sht-olive-dark',
          ]"
          :style="item.image ? { backgroundImage: `linear-gradient(110deg, rgba(45,53,31,.88), rgba(45,53,31,.25)), url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined"
        >
          <span class="pointer-events-none absolute -right-2 -top-7 select-none font-sans text-[9rem] font-bold leading-none tracking-[-0.08em] opacity-[0.1]" :class="item.tone === 'dark' || item.tone === 'image' ? 'text-white' : 'text-sht-olive-dark'" aria-hidden="true">{{ item.number }}</span>
          <div class="relative flex h-full min-h-[180px] flex-col justify-between">
            <span class="text-sm font-semibold tracking-[0.16em] opacity-60">{{ item.number }}</span>
            <div>
              <h3 class="max-w-lg font-hero text-2xl font-bold not-italic leading-tight">{{ item.title }}</h3>
              <p class="mt-3 max-w-md text-sm leading-relaxed opacity-75">{{ item.description }}</p>
              <span class="mt-5 block text-sm font-semibold opacity-75 transition-transform duration-300 group-hover:translate-x-1">Jelajahi <span aria-hidden="true">→</span></span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
