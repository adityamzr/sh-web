<script setup lang="ts">
const { t, locale } = useLocale()

const makkahTime = ref('--:--')
const jakartaTime = ref('--:--')
const hijriDate = ref('')
let timer: ReturnType<typeof setInterval> | null = null

const ID_HIJRI_MONTHS = [
  'Muharram',
  'Safar',
  'Rabiul Awal',
  'Rabiul Akhir',
  'Jumadil Awal',
  'Jumadil Akhir',
  'Rajab',
  'Syaban',
  'Ramadan',
  'Syawal',
  'Zulkaidah',
  'Zulhijah',
] as const

const EN_HIJRI_MONTHS_FALLBACK = [
  'Muharram',
  'Safar',
  "Rabi' I",
  "Rabi' II",
  'Jumada I',
  'Jumada II',
  'Rajab',
  "Sha'ban",
  'Ramadan',
  'Shawwal',
  "Dhu'l-Qi'dah",
  "Dhu'l-Hijjah",
] as const

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

function getHijriDateString(now: Date, localeCode: 'id' | 'en') {
  try {
    // Use Makkah timezone as reference for Hijri date
    const timeZone = 'Asia/Riyadh'
    const calendar = 'islamic-umalqura'

    // Get numeric day/month/year to map month safely
    const numericFmt = new Intl.DateTimeFormat(
      `${localeCode === 'id' ? 'id-ID' : 'en-GB'}-u-ca-${calendar}`,
      {
        timeZone,
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      },
    )
    const numericParts = numericFmt.formatToParts(now)
    const day = numericParts.find(p => p.type === 'day')?.value || ''
    const monthNum = Number(numericParts.find(p => p.type === 'month')?.value || '1')
    const year = numericParts.find(p => p.type === 'year')?.value || ''
    const eraPart = numericParts.find(p => p.type === 'era')?.value

    let monthName = ''
    if (localeCode === 'id') {
      monthName = ID_HIJRI_MONTHS[monthNum - 1] || ''
    } else {
      // Prefer Intl English long month, fallback to ASCII list
      try {
        const longFmt = new Intl.DateTimeFormat(`en-GB-u-ca-${calendar}`, {
          timeZone,
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
        const longParts = longFmt.formatToParts(now)
        monthName = longParts.find(p => p.type === 'month')?.value || EN_HIJRI_MONTHS_FALLBACK[monthNum - 1] || ''
      } catch {
        monthName = EN_HIJRI_MONTHS_FALLBACK[monthNum - 1] || ''
      }
    }

    const era = eraPart || (localeCode === 'id' ? 'H' : 'AH')
    // Normalize era to H for id, keep AH for en if returned
    const normalizedEra = localeCode === 'id' ? 'H' : era

    if (!day || !monthName || !year) return ''
    return `${day} ${monthName} ${year} ${normalizedEra}`.trim()
  } catch {
    return ''
  }
}

function updateTime() {
  try {
    const now = new Date()
    makkahTime.value = formatTime('Asia/Riyadh')
    jakartaTime.value = formatTime('Asia/Jakarta')
    hijriDate.value = getHijriDateString(now, locale.value === 'en' ? 'en' : 'id')
  } catch {
    // graceful fallback if Intl fails
  }
}

const accessibleLabel = computed(() => {
  const hijri = hijriDate.value || ''
  const makkah = makkahTime.value
  const jakarta = jakartaTime.value
  if (locale.value === 'en') {
    return `Hijri date ${hijri}. Makkah time ${makkah}. Jakarta time ${jakarta}.`
  }
  return `Tanggal Hijriah ${hijri}. Waktu Makkah ${makkah}. Waktu Jakarta ${jakarta}.`
})

watch(() => locale.value, () => {
  updateTime()
})

onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 60_000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="fixed inset-x-0 top-0 z-[60] flex h-8 items-center justify-center overflow-hidden bg-sht-sage px-3 text-[10px] font-bold tracking-[0.04em] text-sht-off-white sm:px-4 sm:text-[11px] md:text-xs"
    :aria-label="accessibleLabel"
    role="status"
  >
    <div class="flex max-w-full items-center justify-center gap-1 whitespace-nowrap sm:gap-1.5">
      <span v-if="hijriDate" class="font-semibold tracking-[0.02em]">{{ hijriDate }}</span>
      <span v-if="hijriDate" class="opacity-60" aria-hidden="true">•</span>
      <span>{{ t('Makkah') }} {{ makkahTime }}</span>
      <span class="opacity-60" aria-hidden="true">•</span>
      <span>{{ t('Jakarta') }} {{ jakartaTime }}</span>
    </div>
  </div>
</template>
