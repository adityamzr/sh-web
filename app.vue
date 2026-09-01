<script setup lang="ts">
const { basePath } = useLocale()
useLocaleSeo()
</script>
<template>
  <div class="min-h-screen overflow-x-hidden bg-sht-off-white text-sht-charcoal [overflow-wrap:anywhere]">
    <LiveTimeBar />
    <MediaNavbar />
    <main :class="basePath === '/' ? '' : 'public-page-main'"><MediaTranslationNotice /><NuxtPage :page-key="route => route.path" /></main>
    <MediaFooter />
  </div>
</template>
