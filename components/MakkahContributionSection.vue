<script setup lang="ts">
type ContributionType = 'correction' | 'place_recommendation' | 'tip_experience'

const contributionTypes = [
  { type: 'correction' as const, number: '01', label: 'Koreksi Informasi', description: 'Menemukan lokasi, akses, fasilitas, transportasi, atau informasi yang sudah berubah?' },
  { type: 'place_recommendation' as const, number: '02', label: 'Rekomendasikan Tempat', description: 'Punya tempat makan, fasilitas, lokasi praktis, atau tempat lain yang bermanfaat?' },
  { type: 'tip_experience' as const, number: '03', label: 'Bagikan Tips & Pengalaman', description: 'Punya pengalaman singkat yang mungkin membantu jamaah lain?' },
]
const selectedType = ref<ContributionType | null>(null)
const submittedAttempt = ref(false)
const formError = ref('')
const form = reactive({ subject: '', change: '', content: '', placeName: '', area: '', locationUrl: '', title: '', context: '', name: '', contact: '' })
const selected = computed(() => contributionTypes.find((item) => item.type === selectedType.value) ?? null)

function choose(type: ContributionType) { selectedType.value = type; submittedAttempt.value = false; formError.value = '' }
function backToChoices() { selectedType.value = null; submittedAttempt.value = false; formError.value = '' }
function required(value: string) { return value.trim().length >= 3 }
function validUrl(value: string) { return !value.trim() || /^https?:\/\//i.test(value.trim()) }
function submit() {
  formError.value = ''
  if (selectedType.value === 'correction' && (!required(form.subject) || !required(form.change) || !required(form.content))) formError.value = 'Mohon lengkapi nama informasi, perubahan, dan detail koreksi.'
  if (selectedType.value === 'place_recommendation' && (!required(form.placeName) || !required(form.area) || !required(form.content))) formError.value = 'Mohon lengkapi nama tempat, area, dan alasan rekomendasi.'
  if (selectedType.value === 'tip_experience' && (!required(form.title) || !required(form.content))) formError.value = 'Mohon lengkapi judul dan tips atau pengalaman Anda.'
  if (!validUrl(form.locationUrl)) formError.value = 'Link lokasi harus diawali http:// atau https://.'
  if (!formError.value) submittedAttempt.value = true
}
</script>

<template>
  <section class="bg-sht-off-white py-14 sm:py-28" aria-labelledby="contribution-heading">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div><p class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">BANTU KAMI MELENGKAPI</p><h2 id="contribution-heading" class="mt-4 font-hero text-4xl font-bold italic leading-tight text-sht-olive-dark sm:text-5xl">Ikut Lengkapi Sudut Haramain</h2><p class="mt-5 max-w-xl text-base leading-relaxed text-sht-charcoal/70">Menemukan informasi yang berubah, punya rekomendasi tempat, atau pengalaman yang mungkin bermanfaat untuk jamaah lain? Sampaikan kepada kami.</p><p class="mt-8 border-l-2 border-sht-gold pl-4 text-sm leading-relaxed text-sht-charcoal/65">Setiap masukan akan kami tinjau terlebih dahulu sebelum digunakan atau diterbitkan.</p></div>
        <div class="min-w-0 rounded-3xl border border-sht-stone bg-white p-5 sm:p-8">
          <div v-if="!selected" class="divide-y divide-sht-stone/80"><button v-for="item in contributionTypes" :key="item.type" type="button" class="group flex w-full items-start gap-4 py-5 text-left first:pt-1 last:pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold" @click="choose(item.type)"><span class="font-heading text-2xl text-sht-sage">{{ item.number }}</span><span class="min-w-0 flex-1"><span class="block font-hero text-xl font-bold not-italic text-sht-olive-dark">{{ item.label }}</span><span class="mt-1 block max-w-lg text-sm leading-relaxed text-sht-charcoal/65">{{ item.description }}</span><span class="mt-3 block text-sm font-semibold text-sht-olive transition-transform group-hover:translate-x-1">Pilih <span aria-hidden="true">→</span></span></span></button></div>
          <div v-else>
            <button type="button" class="inline-flex items-center gap-2 text-sm font-semibold text-sht-olive focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold" @click="backToChoices"><span aria-hidden="true">←</span> Kembali</button>
            <h3 class="mt-6 font-hero text-2xl font-bold not-italic text-sht-olive-dark sm:text-3xl">{{ selected.label }}</h3><p class="mt-2 text-sm leading-relaxed text-sht-charcoal/65">{{ selected.description }}</p>
            <div v-if="submittedAttempt" class="mt-6 rounded-2xl border border-sht-gold/50 bg-sht-gold/10 p-5" role="status"><p class="font-hero text-xl font-bold not-italic text-sht-olive-dark">Masukan siap ditinjau.</p><p class="mt-2 text-sm leading-relaxed text-sht-charcoal/70">Form ini belum terhubung ke penyimpanan publik. Masukan belum dikirim dan tidak akan diterbitkan otomatis.</p><button type="button" class="mt-4 text-sm font-semibold text-sht-olive underline underline-offset-4" @click="submittedAttempt = false">Periksa kembali</button></div>
            <form v-else class="mt-6 space-y-4" @submit.prevent="submit">
              <template v-if="selectedType === 'correction'"><label class="block text-sm font-semibold text-sht-charcoal">Nama tempat / informasi *<input v-model="form.subject" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label><label class="block text-sm font-semibold text-sht-charcoal">Apa yang berubah? *<input v-model="form.change" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label></template>
              <template v-if="selectedType === 'place_recommendation'"><label class="block text-sm font-semibold text-sht-charcoal">Nama tempat *<input v-model="form.placeName" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label><label class="block text-sm font-semibold text-sht-charcoal">Area / lokasi *<input v-model="form.area" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label></template>
              <template v-if="selectedType === 'tip_experience'"><label class="block text-sm font-semibold text-sht-charcoal">Judul singkat *<input v-model="form.title" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label><label class="block text-sm font-semibold text-sht-charcoal">Lokasi / konteks <input v-model="form.context" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label></template>
              <label class="block text-sm font-semibold text-sht-charcoal">{{ selectedType === 'correction' ? 'Detail koreksi' : selectedType === 'place_recommendation' ? 'Kenapa tempat ini layak direkomendasikan?' : 'Tips / pengalaman' }} *<textarea v-model="form.content" rows="4" class="mt-1.5 w-full resize-y rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label>
              <label v-if="selectedType !== 'tip_experience'" class="block text-sm font-semibold text-sht-charcoal">{{ selectedType === 'correction' ? 'Sumber / link pendukung' : 'Google Maps / location link' }} <input v-model="form.locationUrl" type="url" placeholder="https://" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label>
              <div class="grid gap-4 sm:grid-cols-2"><label class="block text-sm font-semibold text-sht-charcoal">Nama <span class="font-normal text-sht-charcoal/50">(opsional)</span><input v-model="form.name" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label><label class="block text-sm font-semibold text-sht-charcoal">Kontak <span class="font-normal text-sht-charcoal/50">(opsional)</span><input v-model="form.contact" type="text" class="mt-1.5 min-h-[44px] w-full rounded-xl border border-sht-stone px-4 py-2.5 text-base font-normal focus:border-sht-olive focus:outline-none focus:ring-2 focus:ring-sht-olive/20" /></label></div>
              <p class="text-xs leading-relaxed text-sht-charcoal/55">Kontak hanya digunakan jika kami perlu menghubungi Anda terkait masukan ini.</p><p v-if="formError" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">{{ formError }}</p><button type="submit" class="inline-flex min-h-[46px] items-center justify-center rounded-full bg-sht-olive px-6 py-3 text-sm font-semibold text-sht-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold">Kirim Masukan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
