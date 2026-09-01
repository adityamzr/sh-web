<script setup lang="ts">
const { locale, href, target, unavailable, t } = useLanguageSwitch()
</script>
<template>
  <NuxtLink :to="href" :lang="target" :hreflang="target" class="inline-flex min-h-11 shrink-0 items-center rounded-full border border-current/30 px-3 text-xs font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold" :aria-label="t('Ganti bahasa ke {language}', { language: target === 'en' ? 'English' : 'Indonesia' })" :title="unavailable ? t('Terjemahan belum tersedia; buka daftar konten.') : undefined" data-testid="language-switch">
    {{ locale === 'id' ? 'EN' : 'ID' }}
  </NuxtLink>
</template>
