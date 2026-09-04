<script setup lang="ts">
const { basePath } = useLocale()
useLocaleSeo()
</script>
<template>
  <div class="min-h-screen overflow-x-hidden bg-sht-off-white text-sht-charcoal [overflow-wrap:anywhere]">
    <NuxtLoadingIndicator color="#D3C168" :height="3" :throttle="0" />
    <LiveTimeBar />
    <MediaNavbar />
    <main :class="basePath === '/' ? '' : 'public-page-main'"><MediaTranslationNotice /><NuxtPage :page-key="route => route.path" /></main>
    <MediaFooter />
  </div>
</template>
