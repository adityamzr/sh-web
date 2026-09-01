<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'card' | 'list' | 'hero' | 'text'
  count?: number
}>(), {
  variant: 'card',
  count: 3,
})
</script>

<template>
  <div v-if="variant === 'hero'" class="animate-pulse">
    <div class="h-8 w-32 rounded-full bg-sht-stone/60"></div>
    <div class="mt-6 h-12 w-3/4 rounded-xl bg-sht-stone/60"></div>
    <div class="mt-4 h-6 w-2/3 rounded-lg bg-sht-stone/40"></div>
    <div class="mt-8 h-[400px] w-full rounded-2xl bg-sht-stone/40"></div>
  </div>

  <div v-else-if="variant === 'card'" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <div v-for="i in count" :key="i" class="animate-pulse">
      <div class="aspect-[4/3] w-full rounded-2xl bg-sht-stone/50"></div>
      <div class="mt-4 h-4 w-1/3 rounded bg-sht-stone/40"></div>
      <div class="mt-2 h-6 w-full rounded bg-sht-stone/60"></div>
      <div class="mt-2 h-4 w-5/6 rounded bg-sht-stone/30"></div>
    </div>
  </div>

  <div v-else-if="variant === 'list'" class="space-y-4">
    <div v-for="i in count" :key="i" class="flex animate-pulse gap-4">
      <div class="h-20 w-28 rounded-xl bg-sht-stone/50"></div>
      <div class="flex-1">
        <div class="h-3 w-20 rounded bg-sht-stone/40"></div>
        <div class="mt-2 h-5 w-full rounded bg-sht-stone/60"></div>
      </div>
    </div>
  </div>

  <div v-else class="animate-pulse space-y-3">
    <div class="h-4 w-full rounded bg-sht-stone/50"></div>
    <div class="h-4 w-5/6 rounded bg-sht-stone/30"></div>
    <div class="h-4 w-4/6 rounded bg-sht-stone/30"></div>
  </div>
</template>
