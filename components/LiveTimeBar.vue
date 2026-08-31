<script setup lang="ts">
const makkahTime = ref('--:--')
const wibTime = ref('--:--')
let timer: ReturnType<typeof setInterval> | null = null

function formatTime(timeZone: string) {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(new Date())
  } catch {
    return '--:--'
  }
}

function updateTime() {
  try {
    makkahTime.value = formatTime('Asia/Riyadh')
    wibTime.value = formatTime('Asia/Jakarta')
  } catch {
    // graceful fallback if Intl fails
  }
}

const accessibleLabel = computed(() => `Waktu Makkah ${makkahTime.value}, Waktu Indonesia Barat ${wibTime.value}`)

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
    <span>Makkah {{ makkahTime }}</span><span class="mx-2" aria-hidden="true">·</span><span>WIB {{ wibTime }}</span>
  </div>
</template>
