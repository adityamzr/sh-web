<script setup lang="ts">
const props = withDefaults(defineProps<{
  code: 'id' | 'en'
  size?: 'sm' | 'md'
}>(), {
  size: 'sm'
})

const sizeClasses = computed(() => props.size === 'md' ? 'h-4 w-[22px]' : 'h-3.5 w-5')
</script>

<template>
  <!-- Indonesia Flag: red-white horizontal -->
  <svg
    v-if="code === 'id'"
    viewBox="0 0 20 14"
    :class="['rounded-[2px] shadow-sm ring-1 ring-black/10', sizeClasses]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="7" fill="#FF0000" />
    <rect y="7" width="20" height="7" fill="#FFFFFF" />
  </svg>

  <!-- UK Flag (Union Jack) for English -->
  <svg
    v-else
    viewBox="0 0 60 30"
    :class="['rounded-[2px] shadow-sm ring-1 ring-black/10', sizeClasses]"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath id="flag-gb-a">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="flag-gb-b">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
    </defs>
    <g clip-path="url(#flag-gb-a)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" stroke-width="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#flag-gb-b)" stroke="#C8102E" stroke-width="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" stroke-width="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
    </g>
  </svg>
</template>
