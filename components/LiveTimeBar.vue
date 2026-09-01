<script setup lang="ts">
const { t, localePath, locale, basePath } = useLocale()

const makkahTime = ref('--:--')
const wibTime = ref('--:--')
let timer: ReturnType<typeof setInterval> | null = null

function formatTime(timeZone: string) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date())
}

function updateTime() {
  makkahTime.value = formatTime('Asia/Riyadh')
  wibTime.value = formatTime('Asia/Jakarta')
}

const accessibleLabel = computed(() => t('Waktu Makkah {makkah}, Waktu Indonesia Barat {wib}', { makkah: makkahTime.value, wib: wibTime.value }))

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 60_000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-[60] flex h-8 items-center justify-center bg-sht-sage px-4 text-[11px] font-bold tracking-[0.04em] text-sht-off-white sm:text-xs" :aria-label="accessibleLabel" role="status">
    <span>{{ t('Makkah') }} {{ t(makkahTime) }}</span><span class="mx-2" aria-hidden="true">·</span><span>{{ t('WIB') }} {{ t(wibTime) }}</span>
  </div>
</template>
