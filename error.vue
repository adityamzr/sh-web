<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const is404 = computed(() => props.error.statusCode === 404)

const title = computed(() => {
  if (is404.value) return 'Halaman tidak ditemukan.'
  return 'Terjadi gangguan sementara.'
})

const description = computed(() => {
  if (is404.value) return 'Artikel atau halaman yang Anda cari tidak tersedia, mungkin telah dipindahkan atau belum dipublikasikan.'
  return props.error.statusMessage || props.error.message || 'Silakan coba lagi dalam beberapa saat.'
})

function handleClearError() {
  clearError({ redirect: '/' })
}

useSeoMeta({
  title: is404.value ? '404 — Sudut Haramain' : 'Gangguan — Sudut Haramain',
})
</script>

<template>
  <div class="min-h-screen bg-sht-off-white text-sht-charcoal">
    <LiveTimeBar />
    <MediaNavbar />
    <main class="mx-auto flex min-h-[70vh] max-w-container flex-col items-center justify-center px-5 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
      <p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">
        {{ is404 ? '404' : `Error ${error.statusCode}` }}
      </p>
      <h1 class="mt-4 max-w-2xl font-hero text-4xl font-bold leading-tight text-sht-olive-dark sm:text-5xl">
        {{ title }}
      </h1>
      <p class="mt-4 max-w-xl text-base leading-relaxed text-sht-charcoal/70">
        {{ description }}
      </p>

      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <NuxtLink
          to="/"
          class="inline-flex min-h-[46px] items-center justify-center rounded-full bg-sht-olive px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
        >
          Kembali ke Beranda
        </NuxtLink>
        <NuxtLink
          to="/hari-ini"
          class="inline-flex min-h-[46px] items-center justify-center rounded-full border border-sht-olive/20 bg-white px-6 py-3 text-sm font-semibold text-sht-olive transition-colors hover:bg-sht-stone/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
        >
          Lihat Sorotan
        </NuxtLink>
      </div>

      <div class="mt-8">
        <button
          type="button"
          class="text-sm font-medium text-sht-charcoal/50 underline underline-offset-4 hover:text-sht-olive"
          @click="handleClearError"
        >
          Muat ulang halaman
        </button>
      </div>
    </main>
    <MediaFooter />
  </div>
</template>
