<script setup lang="ts">
const { t, localePath, locale, basePath } = useLocale()

import {
  BookOpen,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  MapPin,
  MapPinned,
  Menu,
  Newspaper,
  Search,
  Sparkles,
  X,
} from "lucide-vue-next";

const route = useRoute();
import whiteLogo from "~/assets/images/sht_horizontal_white_logo.png";

const isOpen = ref(false);
const isScrolled = ref(false);
const isServicesOpen = ref(false);
const isSearchOpen = ref(false);
const contentLinks = useContentLocaleLinks();
const clientHash = ref('');
const mobileLanguages = [
  { code: 'id' as const, label: 'Indonesia' },
  { code: 'en' as const, label: 'English' },
] as const;
function getMobileLangHref(target: 'id' | 'en') {
  const cur = contentLinks.value?.key === route.path ? contentLinks.value : null
  if (cur) {
    return (cur.paths[target] as string) ?? (cur.fallback?.[target] as string) ?? localePath('/hari-ini?translation=unavailable', target)
  }
  const base = route.fullPath.split('#')[0]
  return localePath(base, target) + clientHash.value
}
const isHome = computed(() => basePath.value === "/");
const searchTrigger = ref<HTMLButtonElement | null>(null);
const menuTrigger = ref<HTMLButtonElement | null>(null);
const links = [
  { key: "hari-ini", label: "Sorotan", to: "/hari-ini", icon: Newspaper },
  { key: "makkah", label: "Makkah", to: "/makkah", icon: MapPinned },
  { key: "madinah", label: "Madinah", to: "/madinah", icon: MapPin },
  { key: "visual", label: "Visual Haramain", to: "/visual", icon: Sparkles },
  { key: "panduan", label: "Panduan", to: "/panduan", icon: BookOpen },
];
const serviceUnits = [
  {
    id: 1,
    name: "Apa itu Sudut Haramain?",
    subtitle: "Mengenal media digital Sudut Haramain.",
    href: "/tentang-kami",
  },
  {
    id: 2,
    name: "Sudut Haramain Tour",
    subtitle: "Umroh Mandiri & Land Arrangement",
    href: "https://tour.sudutharamain.id",
  },
  {
    id: 3,
    name: "Sudut Haramain Jastip",
    subtitle: "Titip beli dari Makkah–Madinah",
    href: "https://jastip.sudutharamain.id",
  },
];
let servicesCloseTimer: ReturnType<typeof setTimeout> | null = null;
function openServicesMenu() {
  if (servicesCloseTimer) clearTimeout(servicesCloseTimer);
  isServicesOpen.value = true;
}
function scheduleServicesClose() {
  if (servicesCloseTimer) clearTimeout(servicesCloseTimer);
  servicesCloseTimer = setTimeout(() => {
    isServicesOpen.value = false;
  }, 100);
}
function isNavItemActive(key: string) {
  return (
    basePath.value === `/${key}` ||
    basePath.value.startsWith(`/${key}/`) ||
    (basePath.value === "/" && route.hash === `#${key}`)
  );
}
function updateScroll() {
  isScrolled.value = window.scrollY > 24;
}
function closeSearch() {
  isSearchOpen.value = false;
  nextTick(() => searchTrigger.value?.focus());
}
function closeMobileMenu(restoreFocus = false) {
  isOpen.value = false;
  isServicesOpen.value = false;
  if (restoreFocus) nextTick(() => menuTrigger.value?.focus());
}
function handleEscape(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;
  if (isSearchOpen.value) closeSearch();
  else if (isOpen.value) closeMobileMenu(true);
  else isServicesOpen.value = false;
}
function closeLanguageDropdown() {
  window.dispatchEvent(new CustomEvent('close-language-dropdown'))
}
watch(() => route.path, () => {
  isOpen.value = false
  isServicesOpen.value = false
  isSearchOpen.value = false
  closeLanguageDropdown()
})
watch(isOpen, (open) => {
  if (open) {
    closeLanguageDropdown()
    isServicesOpen.value = false
  }
})
watch(isServicesOpen, (open) => {
  if (open) closeLanguageDropdown()
})
onMounted(() => {
  updateScroll();
  clientHash.value = route.hash
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener("keydown", handleEscape);
  window.addEventListener('close-services-menu', (() => { isServicesOpen.value = false }) as EventListener)
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScroll);
  window.removeEventListener("keydown", handleEscape);
  window.removeEventListener('close-services-menu', (() => { isServicesOpen.value = false }) as EventListener)
  if (servicesCloseTimer) clearTimeout(servicesCloseTimer);
});
watch(() => route.hash, h => { clientHash.value = h })
</script>

<template>
  <header
    class="fixed inset-x-0 top-8 z-50 py-2 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300"
    :class="
      isHome && !isScrolled
        ? 'bg-transparent text-white'
        : 'bg-sht-olive-dark text-sht-off-white shadow-sm'
    "
  >
    <div
      class="mx-auto flex h-[72px] max-w-[84rem] items-center justify-between gap-2 px-5 sm:gap-4 lg:gap-6 sm:px-6 lg:px-8"
    >
      <NuxtLink
        :to="localePath('/')"
        class="shrink-0 font-heading text-xl font-semibold tracking-wide sm:text-2xl"
        :aria-label="t('Sudut Haramain — Beranda')"
      >
        <img :src="whiteLogo" alt="" class="h-9 w-auto sm:h-12" />
      </NuxtLink>
      <nav
        class="hidden flex-1 items-center justify-center gap-4 text-[15px] font-medium lg:flex xl:gap-6"
        :aria-label="t('Navigasi Media')"
      >
        <template v-for="link in links" :key="link.label"
          ><NuxtLink
            v-if="link.to.startsWith('/')"
            :to="localePath(link.to)"
            class="relative py-2 transition-opacity hover:opacity-100"
            :class="
              isNavItemActive(link.key)
                ? 'font-semibold opacity-100'
                : 'opacity-80'
            "
            :aria-current="isNavItemActive(link.key) ? 'page' : undefined"
            >{{ t(link.label)
            }}<span
              v-if="isNavItemActive(link.key)"
              class="absolute inset-x-1 -bottom-0.5 h-px bg-sht-gold"
              aria-hidden="true" /></NuxtLink
          ><a
            v-else
            :href="localePath(link.to)"
            class="relative py-2 transition-opacity hover:opacity-100"
            :class="
              isNavItemActive(link.key)
                ? 'font-semibold opacity-100'
                : 'opacity-80'
            "
            :aria-current="isNavItemActive(link.key) ? 'page' : undefined"
            >{{ t(link.label)
            }}<span
              v-if="isNavItemActive(link.key)"
              class="absolute inset-x-1 -bottom-0.5 h-px bg-sht-gold"
              aria-hidden="true" /></a
        ></template>
        <div
          class="relative hidden lg:block"
          @mouseenter="openServicesMenu"
          @mouseleave="scheduleServicesClose"
          @focusin="openServicesMenu"
          @focusout="scheduleServicesClose"
        >
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-[15px] font-medium opacity-80 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
            :aria-expanded="isServicesOpen"
            aria-controls="media-services-menu"
            :class="isServicesOpen ? 'opacity-100' : 'opacity-80'"
            @click="isServicesOpen = !isServicesOpen"
            @keydown.esc="isServicesOpen = false"
          >
            {{ t('Tentang Kami') }}
            <ChevronDown
              class="h-4 w-4 transition-transform duration-200"
              :class="isServicesOpen ? 'rotate-180' : ''"
              aria-hidden="true"
            />
          </button>
          <div
            v-if="isServicesOpen"
            id="media-services-menu"
            class="absolute right-0 top-full mt-4 w-72 rounded-2xl border border-sht-stone bg-sht-off-white p-3 text-sht-olive-dark shadow-xl before:absolute before:-top-4 before:left-0 before:right-0 before:h-4"
            role="menu"
            :aria-label="t('Tentang Kami')"
          >
            <div>
              <a
                v-for="unit in serviceUnits"
                :key="unit.id"
                :href="unit.id === 1 ? localePath(unit.href) : undefined"
                :target="
                  unit.id === 1 && unit.href.startsWith('http')
                    ? '_blank'
                    : undefined
                "
                :rel="
                  unit.id === 1 && unit.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                "
                :aria-disabled="unit.id !== 1"
                :tabindex="unit.id !== 1 ? -1 : undefined"
                :class="[
                  'block rounded-xl p-3 transition-colors',
                  unit.id === 1
                    ? 'hover:bg-sht-stone/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold'
                    : 'cursor-not-allowed opacity-60',
                ]"
                role="menuitem"
                @click="unit.id !== 1 && $event.preventDefault()"
              >
                <p class="font-semibold">{{ t(unit.name) }}</p>
                <p class="mt-1 text-xs text-sht-charcoal/60">
                  {{ t(unit.subtitle) }}
                </p>
                <span
                  v-if="unit.id !== 1"
                  class="mt-2 inline-flex rounded-full border border-sht-gold/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sht-olive"
                  >{{ t('Segera Hadir') }}</span
                >
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div class="hidden items-center gap-2 lg:flex"><MediaLanguageSwitcher />
        <button
          ref="searchTrigger"
          type="button"
          :class="
            isHome && !isScrolled
              ? 'border-current/35'
              : 'border-sht-off-white/30'
          "
          class="inline-flex h-11 w-fit items-center gap-2 rounded-full border px-5 text-left text-sm opacity-85 transition-colors hover:bg-white/10 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
          :aria-label="t('Cari informasi')"
          @click="isSearchOpen = true"
        >
          <Search class="h-4 w-4 shrink-0" aria-hidden="true" /><span class="hidden xl:inline"
            >{{ t('Cari informasi') }}</span
          >
        </button>
      </div>
      <div class="flex items-center gap-2 lg:hidden">
        <button
          ref="searchTrigger"
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
          :aria-label="t('Cari informasi')"
          @click="isSearchOpen = true"
        >
          <Search class="h-5 w-5" aria-hidden="true" /></button
        ><button
          ref="menuTrigger"
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
          :aria-expanded="isOpen"
          aria-controls="media-mobile-menu"
          :aria-label="t('Buka menu')"
          @click="isOpen = !isOpen"
        >
          <Menu v-if="!isOpen" class="h-6 w-6" aria-hidden="true" /><X
            v-else
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
    <div
      v-show="isOpen"
      id="media-mobile-menu"
      class="min-h-screen bg-sht-off-white text-sht-olive-dark lg:hidden"
    >
      <nav
        class="mx-auto flex max-w-container flex-col px-5 py-8 sm:px-6"
        :aria-label="t('Navigasi Media Seluler')"
      >
        <template v-for="link in links" :key="link.label"
          ><NuxtLink
            v-if="link.to.startsWith('/')"
            :to="localePath(link.to)"
            class="flex min-h-[64px] items-center gap-4 border-b border-sht-stone px-1 py-4 font-sans text-base font-semibold leading-tight"
            :aria-current="isNavItemActive(link.key) ? 'page' : undefined"
            @click="isOpen = false"
            ><component
              :is="link.icon"
              class="h-5 w-5 shrink-0 text-sht-olive"
              :stroke-width="1.8"
              aria-hidden="true"
            /><span>{{ t(link.label) }}</span></NuxtLink
          ><a
            v-else
            :href="localePath(link.to)"
            class="flex min-h-[64px] items-center gap-4 border-b border-sht-stone px-1 py-4 font-sans text-base font-semibold leading-tight"
            :aria-current="isNavItemActive(link.key) ? 'page' : undefined"
            @click="isOpen = false"
            ><component
              :is="link.icon"
              class="h-5 w-5 shrink-0 text-sht-olive"
              :stroke-width="1.8"
              aria-hidden="true"
            /><span>{{ t(link.label) }}</span></a
          ></template
        >
        <div class="border-b border-sht-stone">
          <button
            type="button"
            class="flex min-h-[64px] w-full items-center gap-4 px-1 py-4 text-left font-sans text-base font-semibold leading-tight"
            :aria-expanded="isServicesOpen"
            aria-controls="media-mobile-services"
            @click="isServicesOpen = !isServicesOpen"
          >
            <BriefcaseBusiness
              class="h-5 w-5 shrink-0 text-sht-olive"
              :stroke-width="1.8"
              aria-hidden="true"
            />
            <span class="flex-1">{{ t('Tentang Kami') }}</span>
            <ChevronDown
              class="h-5 w-5 transition-transform duration-200"
              :class="isServicesOpen ? 'rotate-180' : ''"
              aria-hidden="true"
            />
          </button>
          <div
            v-show="isServicesOpen"
            id="media-mobile-services"
            class="ml-9 border-t border-sht-stone/70 py-2"
          >
            <a
              v-for="unit in serviceUnits"
              :key="unit.name"
              :href="unit.id === 1 ? localePath(unit.href) : undefined"
              :target="unit.id === 1 && unit.href.startsWith('http') ? '_blank' : undefined"
              :rel="
                unit.id === 1 && unit.href.startsWith('http') ? 'noopener noreferrer' : undefined
              "
              :aria-disabled="unit.id !== 1"
              :tabindex="unit.id !== 1 ? -1 : undefined"
              class="block border-b border-sht-stone/60 py-3 last:border-0"
              :class="unit.id !== 1 ? 'cursor-not-allowed opacity-60' : ''"
              @click="unit.id !== 1 ? $event.preventDefault() : closeMobileMenu()"
              ><p class="font-sans text-base text-sht-olive-dark">
                {{ t(unit.name) }}
              </p>
              <p class="mt-1 text-xs text-sht-charcoal/60">
                {{ t(unit.subtitle) }}
              </p><span v-if="unit.id !== 1" class="mt-2 inline-flex rounded-full border border-sht-gold/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sht-olive">{{ t('Segera Hadir') }}</span></a
            >
          </div>
        </div>
        <!-- Mobile Language Section -->
        <div class="border-b border-sht-stone py-5">
          <p class="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-sht-charcoal/50">{{ t('Bahasa') }}</p>
          <div class="flex flex-col gap-1">
            <NuxtLink
              v-for="lang in mobileLanguages"
              :key="lang.code"
              :to="getMobileLangHref(lang.code)"
              :lang="lang.code"
              :hreflang="lang.code"
              :aria-current="locale === lang.code ? 'true' : undefined"
              :aria-label="t('Ganti bahasa ke {language}', { language: lang.label })"
              class="flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold"
              :class="locale === lang.code ? 'bg-sht-stone/60 text-sht-olive-dark' : 'text-sht-charcoal/80 hover:bg-sht-stone/40'"
              @click="closeMobileMenu()"
            >
              <span class="flex items-center gap-2.5">
                <CommonLocaleFlag :code="lang.code" size="md" />
                <span>{{ lang.label }}</span>
              </span>
              <Check v-if="locale === lang.code" class="h-5 w-5 shrink-0 text-sht-olive" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <MediaSearchModal
    v-model="isSearchOpen"
    @update:model-value="
      (open) => {
        if (!open) closeSearch();
      }
    "
  />
</template>
