<script setup lang="ts">
const { basePath } = useLocale()
useLocaleSeo()
</script>
<template>
  <div class="min-h-screen bg-sht-off-white text-sht-charcoal">
    <LiveTimeBar />
    <MediaNavbar />
    <main :class="basePath === '/' ? '' : 'public-page-main'"><MediaTranslationNotice /><NuxtPage :page-key="route => route.path" /></main>
    <MediaFooter />
  </div>
</template>
