<script setup lang="ts">
import {
  BookOpen,
  BriefcaseBusiness,
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
const isHome = computed(() => route.path === "/");
const searchTrigger = ref<HTMLButtonElement | null>(null);
const mobileMenuCloseBtn = ref<HTMLButtonElement | null>(null);

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
  }, 150);
}
function isNavItemActive(key: string) {
  return (
    route.path === `/${key}` ||
    route.path.startsWith(`/${key}/`) ||
    (route.path === "/" && route.hash === `#${key}`)
  );
}
function updateScroll() {
  isScrolled.value = window.scrollY > 24;
}
function closeSearch() {
  isSearchOpen.value = false;
  nextTick(() => searchTrigger.value?.focus());
}
function toggleMobile() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    nextTick(() => mobileMenuCloseBtn.value?.focus());
  }
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    if (isOpen.value) {
      isOpen.value = false;
    }
    if (isServicesOpen.value) {
      isServicesOpen.value = false;
    }
  }
}
onMounted(() => {
  updateScroll();
  window.addEventListener("scroll", updateScroll, { passive: true });
  window.addEventListener('keydown', onKeydown);
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScroll);
  window.removeEventListener('keydown', onKeydown);
  if (servicesCloseTimer) clearTimeout(servicesCloseTimer);
});

watch(() => route.path, () => {
  isOpen.value = false;
  isServicesOpen.value = false;
});
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
      class="mx-auto flex h-[72px] max-w-[84rem] items-center justify-between gap-8 px-5 sm:px-6 lg:px-8"
    >
      <NuxtLink
        to="/"
        class="shrink-0 font-heading text-xl font-semibold tracking-wide sm:text-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold"
        aria-label="Sudut Haramain — Beranda"
      >
        <img :src="whiteLogo" alt="Sudut Haramain" class="h-12 w-auto" />
      </NuxtLink>
      <nav
        class="hidden flex-1 items-center justify-center gap-6 text-[15px] font-medium lg:flex xl:gap-8"
        aria-label="Navigasi Media"
      >
        <template v-for="link in links" :key="link.label"
          ><NuxtLink
            v-if="link.to.startsWith('/')"
            :to="link.to"
            class="relative py-2 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
            :class="
              isNavItemActive(link.key)
                ? 'font-semibold opacity-100'
                : 'opacity-80'
            "
            :aria-current="isNavItemActive(link.key) ? 'page' : undefined"
            >{{ link.label
            }}<span
              v-if="isNavItemActive(link.key)"
              class="absolute inset-x-1 -bottom-0.5 h-px bg-sht-gold"
              aria-hidden="true" /></NuxtLink
          ><a
            v-else
            :href="link.to"
            class="relative py-2 transition-opacity hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold"
            :class="
              isNavItemActive(link.key)
                ? 'font-semibold opacity-100'
                : 'opacity-80'
            "
            :aria-current="isNavItemActive(link.key) ? 'page' : undefined"
            >{{ link.label
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
            @keydown.escape="isServicesOpen = false"
          >
            Tentang Kami
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
            aria-label="Tentang Kami"
          >
            <div>
              <template v-for="unit in serviceUnits" :key="unit.id">
                <NuxtLink
                  v-if="unit.id === 1"
                  :to="unit.href"
                  class="block rounded-xl p-3 transition-colors hover:bg-sht-stone/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold"
                  role="menuitem"
                  @click="isServicesOpen = false"
                >
                  <p class="font-semibold">{{ unit.name }}</p>
                  <p class="mt-1 text-xs text-sht-charcoal/60">
                    {{ unit.subtitle }}
                  </p>
                </NuxtLink>
                <div
                  v-else
                  class="block rounded-xl p-3 opacity-60 cursor-not-allowed"
                  role="menuitem"
                  aria-disabled="true"
                >
                  <p class="font-semibold">{{ unit.name }}</p>
                  <p class="mt-1 text-xs text-sht-charcoal/60">
                    {{ unit.subtitle }}
                  </p>
                  <span
                    class="mt-2 inline-flex rounded-full border border-sht-gold/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-sht-olive"
                    >Segera Hadir</span
                  >
                </div>
              </template>
            </div>
          </div>
        </div>
      </nav>
      <div class="hidden items-center lg:flex">
        <button
          ref="searchTrigger"
          type="button"
          :class="
            isHome && !isScrolled
              ? 'border-current/35'
              : 'border-sht-off-white/30'
          "
          class="inline-flex h-11 w-fit items-center gap-2 rounded-full border px-5 text-left text-sm opacity-85 transition-colors hover:bg-white/10 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
          aria-label="Cari informasi"
          @click="isSearchOpen = true"
        >
          <Search class="h-4 w-4 shrink-0" aria-hidden="true" /><span
            >Cari informasi</span
          >
        </button>
      </div>
      <div class="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
          aria-label="Cari informasi"
          @click="isSearchOpen = true"
        >
          <Search class="h-5 w-5" aria-hidden="true" /></button
        ><button
          ref="mobileMenuCloseBtn"
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
          :aria-expanded="isOpen"
          aria-controls="media-mobile-menu"
          :aria-label="isOpen ? 'Tutup menu' : 'Buka menu'"
          @click="toggleMobile"
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
      class="min-h-screen bg-sht-off-white text-sht-olive-dark lg:hidden overflow-y-auto"
    >
      <nav
        class="mx-auto flex max-w-container flex-col px-5 py-8 sm:px-6"
        aria-label="Navigasi Media Seluler"
      >
        <template v-for="link in links" :key="link.label"
          ><NuxtLink
            :to="link.to"
            class="flex min-h-[64px] items-center gap-4 border-b border-sht-stone px-1 py-4 font-sans text-base font-semibold leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
            :aria-current="isNavItemActive(link.key) ? 'page' : undefined"
            @click="isOpen = false"
            ><component
              :is="link.icon"
              class="h-5 w-5 shrink-0 text-sht-olive"
              :stroke-width="1.8"
              aria-hidden="true"
            /><span>{{ link.label }}</span></NuxtLink
          ></template
        >
        <div class="border-b border-sht-stone">
          <button
            type="button"
            class="flex min-h-[64px] w-full items-center gap-4 px-1 py-4 text-left font-sans text-base font-semibold leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
            :aria-expanded="isServicesOpen"
            aria-controls="media-mobile-services"
            @click="isServicesOpen = !isServicesOpen"
          >
            <BriefcaseBusiness
              class="h-5 w-5 shrink-0 text-sht-olive"
              :stroke-width="1.8"
              aria-hidden="true"
            />
            <span class="flex-1">Tentang Kami</span>
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
            <NuxtLink
              to="/tentang-kami"
              class="block border-b border-sht-stone/60 py-3 last:border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-sht-gold"
              @click="isOpen = false"
              ><p class="font-sans text-base text-sht-olive-dark">
                Apa itu Sudut Haramain?
              </p>
              <p class="mt-1 text-xs text-sht-charcoal/60">
                Mengenal media digital Sudut Haramain.
              </p></NuxtLink
            >
            <div class="block border-b border-sht-stone/60 py-3 opacity-60" aria-disabled="true">
              <p class="font-sans text-base text-sht-olive-dark">Sudut Haramain Tour</p>
              <p class="mt-1 text-xs text-sht-charcoal/60">Umroh Mandiri &amp; Land Arrangement</p>
              <span class="mt-2 inline-flex rounded-full border border-sht-gold/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]">Segera Hadir</span>
            </div>
            <div class="block py-3 opacity-60" aria-disabled="true">
              <p class="font-sans text-base text-sht-olive-dark">Sudut Haramain Jastip</p>
              <p class="mt-1 text-xs text-sht-charcoal/60">Titip beli dari Makkah–Madinah</p>
              <span class="mt-2 inline-flex rounded-full border border-sht-gold/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]">Segera Hadir</span>
            </div>
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
