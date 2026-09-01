<script setup lang="ts">
const { t } = useLocale()
withDefaults(defineProps<{
  title?: string
  description?: string
  retryLabel?: string
  showRetry?: boolean
}>(), {
  title: 'Konten belum dapat dimuat.',
  description: 'Silakan coba lagi dalam beberapa saat.',
  retryLabel: 'Coba lagi',
  showRetry: true,
})
defineEmits(['retry'])
</script>

<template>
  <div class="rounded-2xl border border-sht-stone bg-white px-6 py-10 text-center sm:px-8 sm:py-12">
    <div class="mx-auto max-w-md">
      <p class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage">{{ t('Gangguan sementara') }}</p>
      <h3 class="mt-3 font-hero text-xl font-bold text-sht-olive-dark">{{ t(title) }}</h3>
      <p class="mt-2 text-sm leading-relaxed text-sht-charcoal/60">{{ t(description) }}</p>
      <button
        v-if="showRetry"
        type="button"
        class="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-sht-olive px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sht-olive-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
        @click="$emit('retry')"
      >
        {{ t(retryLabel) }}
      </button>
      <slot />
    </div>
  </div>
</template>
