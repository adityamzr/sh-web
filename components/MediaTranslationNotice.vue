<script setup lang="ts">
const route = useRoute()
const { t } = useLocale()
</script>
<template>
  <p v-if="route.query.translation === 'unavailable'" role="status" class="mx-auto max-w-container px-5 pt-28 text-sm text-sht-olive-dark sm:px-6 lg:px-8">
    {{ t('Konten dalam bahasa ini belum tersedia.') }} {{ t('Daftar konten yang tersedia ditampilkan di bawah ini.') }}
  </p>
</template>
