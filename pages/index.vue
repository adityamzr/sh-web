<script setup lang="ts">
const { t, localePath, locale, basePath } = useLocale()
import { SHOW_ASSISTANCE_SECTION } from '~/shared/ecosystem'

useSeoMeta({
  title: () => t('Sudut Haramain — Media Digital & Informasi Praktis Makkah–Madinah'),
  description: () => t('Informasi praktis Makkah dan Madinah, kultur lokal, literasi ibadah, navigasi, pembaruan kondisi langsung, dan panduan perjalanan dari Sudut Haramain.'),
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

    <!-- 5. Ada yang Bisa Kami Bantu? - Hidden via ecosystem config -->
    <MediaAssistanceSection v-if="SHOW_ASSISTANCE_SECTION" />

    <!-- 6. Terbaru dari Sudut Haramain -->
    <MediaLatestSection />
  </div>
</template>
