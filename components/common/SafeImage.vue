<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string | null
  alt?: string
  fallbackSrc?: string
  imgClass?: string
  wrapperClass?: string
  aspect?: string // e.g. 'aspect-[4/3]' or 'aspect-video'
}>(), {
  src: '',
  alt: '',
  fallbackSrc: '',
  imgClass: '',
  wrapperClass: '',
  aspect: '',
})

const failed = ref(false)
const loaded = ref(false)
const currentSrc = ref(props.src || props.fallbackSrc || '')

function onError() {
  if (props.fallbackSrc && currentSrc.value !== props.fallbackSrc) currentSrc.value = props.fallbackSrc
  else failed.value = true
}

function onLoad() {
  loaded.value = true
}

// Reset error when src changes
watch(() => props.src, () => {
  failed.value = false
  loaded.value = false
  currentSrc.value = props.src || props.fallbackSrc || ''
})
</script>

<template>
  <div
    :class="['relative overflow-hidden bg-sht-stone', aspect, wrapperClass]"
  >
    <img
      v-if="currentSrc && !failed"
      :src="currentSrc"
      :alt="alt"
      :class="['h-full w-full object-cover', imgClass]"
      loading="lazy"
      @error="onError"
      @load="onLoad"
    />
    <!-- Branded fallback when both src and fallback fail or no src -->
    <div
      v-else
      :class="['flex h-full w-full items-center justify-center bg-sht-stone/60', imgClass]"
      aria-hidden="true"
    >
      <div class="flex flex-col items-center gap-2 p-4 text-center">
        <div class="h-10 w-10 rounded-full bg-sht-olive/10 flex items-center justify-center">
          <span class="text-xs font-semibold tracking-widest text-sht-olive">SH</span>
        </div>
        <span class="text-[10px] uppercase tracking-widest text-sht-charcoal/40">Visual Haramain</span>
      </div>
    </div>
  </div>
</template>
