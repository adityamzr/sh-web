<script setup lang="ts">
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()
const input = ref<HTMLInputElement | null>(null)
const query = ref('')
const suggestions = ['Transportasi Publik', 'Rekomendasi Kuliner', 'Panduan Umrah', 'Rute & Navigasi', 'Kultur Lokal', 'Fasilitas Umum']
const filteredSuggestions = computed(() => query.value.trim() ? suggestions.filter((item) => item.toLowerCase().includes(query.value.toLowerCase())) : suggestions)

function close() { emit('update:modelValue', false) }
watch(() => props.modelValue, async (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) { await nextTick(); input.value?.focus() }
})
onBeforeUnmount(() => { document.body.style.overflow = '' })
function onKeydown(event: KeyboardEvent) { if (event.key === 'Escape') close() }
</script>

<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-[100] overflow-y-auto bg-sht-off-white text-sht-olive-dark" role="dialog" aria-modal="true" aria-labelledby="search-modal-title" @keydown="onKeydown">
      <div class="mx-auto flex min-h-screen max-w-5xl flex-col px-5 py-6 sm:px-8 sm:py-10">
        <div class="flex items-center justify-between"><p id="search-modal-title" class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage">SUDUT HARAMAIN / PENCARIAN</p><button type="button" class="inline-flex h-11 w-11 items-center justify-center rounded-full text-sht-olive-dark hover:bg-sht-stone/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" aria-label="Tutup pencarian" @click="close"><svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18" /></svg></button></div>
        <div class="flex flex-1 flex-col justify-center py-16 sm:py-24"><label for="media-search-input" class="sr-only">Cari informasi</label><div class="flex items-center border-b-2 border-sht-olive/30 py-4 focus-within:border-sht-gold"><svg class="mr-4 h-7 w-7 shrink-0 text-sht-sage sm:h-9 sm:w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path stroke-linecap="round" d="m16 16 5 5"/></svg><input id="media-search-input" ref="input" v-model="query" type="search" placeholder="Cari informasi Makkah, Madinah, transportasi..." class="min-w-0 flex-1 bg-transparent text-lg outline-none placeholder:text-sht-charcoal/35 sm:text-3xl" /></div><div class="mt-12"><p class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-sage">TOPIK YANG SERING DICARI</p><div class="mt-5 flex flex-wrap gap-2.5"><button v-for="item in filteredSuggestions" :key="item" type="button" class="rounded-full border border-sht-sage/35 px-4 py-2.5 text-sm text-sht-olive transition-colors hover:border-sht-gold hover:bg-sht-gold/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" @click="query = item">{{ item }}</button><p v-if="!filteredSuggestions.length" class="text-sm text-sht-charcoal/60">Topik belum tersedia dalam demo pencarian ini.</p></div></div></div>
        <p class="text-xs text-sht-charcoal/50">Pencarian artikel dan konten akan tersedia setelah sistem editorial Sudut Haramain terhubung.</p>
      </div>
    </div>
  </Teleport>
</template>
