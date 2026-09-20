<script setup lang="ts">
const route = useRoute()
const { basePath } = useLocale()
useLocaleSeo()
const isLinkHub = computed(() => (route.meta as any).linkHub === true)
</script>
<template>
  <div v-if="isLinkHub" class="min-h-[100dvh] bg-[#F6F4ED] text-sht-charcoal [overflow-wrap:anywhere]">
    <NuxtLoadingIndicator color="#D3C168" :height="3" :throttle="0" />
    <NuxtPage />
  </div>
  <div v-else class="min-h-screen bg-sht-off-white text-sht-charcoal [overflow-wrap:anywhere]">
    <NuxtLoadingIndicator color="#D3C168" :height="3" :throttle="0" />
    <LiveTimeBar />
    <MediaNavbar />
    <main :class="basePath === '/' ? '' : 'public-page-main'"><MediaTranslationNotice /><NuxtPage :page-key="route => route.path" /></main>
    <MediaFooter />
  </div>
</template>
