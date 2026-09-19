<script setup lang="ts">
import type { MediaArticleBlock } from '~/composables/useMediaArticles'

const props = defineProps<{ block: MediaArticleBlock }>()

const headers = computed(() => Array.isArray(props.block.headers) ? props.block.headers : [])
const rows = computed(() => Array.isArray(props.block.rows) ? props.block.rows : [])
const alignments = computed(() => Array.isArray(props.block.alignments) ? props.block.alignments : [])
const caption = computed(() => typeof props.block.caption === 'string' ? props.block.caption : '')

function alignment(idx: number): 'left' | 'center' | 'right' {
  const a = alignments.value[idx]
  if (a === 'center' || a === 'right') return a
  return 'left'
}
</script>

<template>
  <div class="media-content-table-wrapper mb-8 overflow-x-auto rounded-xl border border-sht-stone bg-white">
    <table class="min-w-[480px] w-full border-collapse text-sm sm:text-[15px]">
      <caption v-if="caption" class="caption-top px-4 py-2.5 text-left text-xs font-medium leading-relaxed text-sht-charcoal/60 sm:text-sm">
        {{ caption }}
      </caption>
      <thead>
        <tr class="bg-sht-stone/60">
          <th
            v-for="(header, idx) in headers"
            :key="idx"
            scope="col"
            class="border-b border-sht-stone px-4 py-3 text-left font-semibold text-sht-olive-dark"
            :style="{ textAlign: alignment(idx) }"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rIdx) in rows"
          :key="rIdx"
          class="border-b border-sht-stone/70 last:border-0 hover:bg-sht-stone/20"
        >
          <td
            v-for="(cell, cIdx) in row"
            :key="cIdx"
            class="px-4 py-3 align-top leading-relaxed text-sht-charcoal/80"
            :style="{ textAlign: alignment(cIdx) }"
          >
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.media-content-table-wrapper {
  /* Local horizontal scroll only, does NOT affect sticky sidebar ancestors */
  -webkit-overflow-scrolling: touch;
}
.media-content-table-wrapper table {
  /* Prevent page horizontal overflow, table scrolls inside wrapper */
  min-width: 480px;
}
.media-content-table-wrapper td {
  /* Safe wrapping for long text/URLs */
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>
