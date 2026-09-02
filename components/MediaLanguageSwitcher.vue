<script setup lang="ts">
import { Check, ChevronDown } from "lucide-vue-next";

const route = useRoute();
const { locale, t, localePath } = useLocale();
const content = useContentLocaleLinks();

const isOpen = ref(false);
const triggerRef = ref<HTMLButtonElement | null>(null);
const dropdownRef = ref<HTMLDivElement | null>(null);
const dropdownId = "media-language-menu";
const clientHash = ref("");

const languages = [
  { code: "id" as const, flag: "🇮🇩", short: "ID", label: "Indonesia" },
  { code: "en" as const, flag: "🇬🇧", short: "EN", label: "English" },
] as const;

const currentLang = computed(
  () => languages.find((l) => l.code === locale.value) || languages[0],
);

function getHref(target: "id" | "en") {
  const cur = content.value?.key === route.path ? content.value : null;
  if (cur) {
    // Preserve existing localized slug resolution logic
    return (
      (cur.paths[target] as string) ??
      (cur.fallback?.[target] as string) ??
      localePath("/hari-ini?translation=unavailable", target)
    );
  }
  const base = route.fullPath.split("#")[0];
  return localePath(base, target) + clientHash.value;
}

function toggle() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    // Close other navbar dropdowns when language opens
    window.dispatchEvent(new CustomEvent("close-services-menu"));
  }
}
function close() {
  isOpen.value = false;
}
function onSelect() {
  close();
}

function onClickOutside(e: MouseEvent) {
  if (!isOpen.value) return;
  const target = e.target as Node;
  if (triggerRef.value?.contains(target) || dropdownRef.value?.contains(target))
    return;
  close();
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && isOpen.value) {
    e.stopPropagation();
    close();
    triggerRef.value?.focus();
  }
}

onMounted(() => {
  clientHash.value = route.hash;
  window.addEventListener("click", onClickOutside);
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("close-language-dropdown", close as EventListener);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", onClickOutside);
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("close-language-dropdown", close as EventListener);
});

watch(
  () => route.hash,
  (h) => {
    clientHash.value = h;
  },
);
watch(
  () => route.path,
  () => {
    isOpen.value = false;
  },
);

defineExpose({ close });
</script>

<template>
  <div class="relative">
    <button
      ref="triggerRef"
      type="button"
      class="inline-flex h-11 items-center gap-2 rounded-full px-3.5 text-sm font-medium text-white backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
      :aria-expanded="isOpen"
      aria-haspopup="menu"
      :aria-controls="dropdownId"
      :aria-label="t('Ganti bahasa')"
      data-testid="language-switch"
      @click="toggle"
    >
      <span aria-hidden="true" class="text-[15px] leading-none">{{
        currentLang.flag
      }}</span>
      <span class="tracking-wide">{{ currentLang.short }}</span>
      <ChevronDown
        class="h-4 w-4 shrink-0 transition-transform duration-200"
        :class="isOpen ? 'rotate-180' : ''"
        aria-hidden="true"
      />
    </button>

    <div
      v-if="isOpen"
      :id="dropdownId"
      ref="dropdownRef"
      role="menu"
      :aria-label="t('Pilih bahasa')"
      class="absolute right-0 top-full z-50 mt-2 w-[200px] rounded-2xl border border-sht-stone bg-white p-1.5 shadow-xl shadow-black/10"
    >
      <NuxtLink
        v-for="lang in languages"
        :key="lang.code"
        :to="getHref(lang.code)"
        role="menuitem"
        :aria-current="locale === lang.code ? 'true' : undefined"
        :lang="lang.code"
        :hreflang="lang.code"
        :aria-label="t('Ganti bahasa ke {language}', { language: lang.label })"
        class="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-sht-olive-dark transition-colors hover:bg-sht-stone/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold"
        :class="locale === lang.code ? 'bg-sht-stone/40' : ''"
        @click="onSelect"
      >
        <span class="flex items-center gap-2.5">
          <span aria-hidden="true" class="text-base leading-none">{{
            lang.flag
          }}</span>
          <span>{{ lang.label }}</span>
        </span>
        <Check
          v-if="locale === lang.code"
          class="h-4 w-4 shrink-0 text-sht-olive"
          aria-hidden="true"
        />
      </NuxtLink>
    </div>
  </div>
</template>
