<script setup lang="ts">
const { t } = useLocale()
withDefaults(defineProps<{
  title?: string
  description?: string
  actionLabel?: string
}>(), {
  title: 'Belum ada konten.',
  description: '',
  actionLabel: '',
})
defineEmits(['action'])
</script>

<template>
  <div class="rounded-2xl border border-dashed border-sht-stone bg-white/50 px-6 py-12 text-center sm:px-8 sm:py-16">
    <div class="mx-auto max-w-md">
      <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sht-stone/60">
        <span class="text-sm font-semibold text-sht-sage">—</span>
      </div>
      <h3 class="font-hero text-xl font-bold text-sht-olive-dark">{{ t(title) }}</h3>
      <p v-if="description" class="mt-2 text-sm leading-relaxed text-sht-charcoal/60">{{ t(description) }}</p>
      <button
        v-if="actionLabel"
        type="button"
        class="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full border border-sht-olive/20 px-5 py-2.5 text-sm font-semibold text-sht-olive transition-colors hover:bg-sht-olive/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
        @click="$emit('action')"
      >
        {{ t(actionLabel) }}
      </button>
      <slot />
    </div>
  </div>
</template>
