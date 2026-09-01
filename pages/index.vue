<script setup lang="ts">
const { t, localePath, locale, basePath } = useLocale()

useSeoMeta({
  title: () => t('Sudut Haramain — Media Digital & Informasi Praktis Makkah–Madinah'),
  description: () => t('Informasi praktis Makkah dan Madinah, panduan perjalanan, kultur lokal, literasi ibadah, navigasi, dan pembaruan kondisi langsung dari Sudut Haramain.'),
})
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- 1. Hero / Haramain opening -->
    <MediaHero />

    <!-- 2. Sorotan Haramain -->
    <MediaTodaySection />

    <!-- 3. Lagi Butuh Apa? -->
    <MediaSituationalSection />

    <!-- 4. Jelajahi Sudut Haramain -->
    <MediaExploreSection />

    <!-- 5. Ada yang Bisa Kami Bantu? -->
    <MediaAssistanceSection />

    <!-- 6. Terbaru dari Sudut Haramain -->
    <MediaLatestSection />
  </div>
</template>
