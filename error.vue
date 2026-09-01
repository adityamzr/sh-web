<script setup lang="ts">
import type { NuxtError } from '#app'
import { localeFromPath, localePath, translate } from '~/shared/localization'
const props = defineProps<{ error: NuxtError & { url?: string } }>()
const locale = localeFromPath(props.error.url || useRoute().path)
const t = (text: string) => translate(locale, text)
useHead({ htmlAttrs: { lang: locale }, meta: [{ name: 'robots', content: 'noindex,follow' }] })
useSeoMeta({ title: () => `${props.error.statusCode} — Sudut Haramain` })
</script>
<template>
  <main class="mx-auto min-h-screen max-w-3xl px-6 py-24 text-sht-olive-dark">
    <p class="text-sm">{{ error.statusCode }}</p>
    <h1 class="mt-4 font-hero text-4xl">{{ t(error.statusCode === 404 ? 'Halaman tidak ditemukan.' : 'Konten belum dapat dimuat. Silakan coba lagi.') }}</h1>
    <a :href="localePath('/', locale)" class="mt-8 inline-block underline">{{ t('Kembali ke beranda') }}</a>
  </main>
</template>
