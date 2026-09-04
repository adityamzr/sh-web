<script setup lang="ts">
const { t, localePath, locale, basePath } = useLocale();
const { trackEvent } = useMediaAnalytics();

import footerLogo from "~/assets/images/sht_horizontal_white_logo.png";
import { ChevronDown, MessageCircle } from "lucide-vue-next";

const explorationLinks = [
  { label: "Sorotan", to: "/hari-ini" },
  { label: "Makkah", to: "/makkah" },
  { label: "Madinah", to: "/madinah" },
  { label: "Visual Haramain", to: "/visual" },
];
const guideLinks = [
  { label: "Ibadah", to: "/panduan#ihram" },
  { label: "Transportasi", to: "/panduan#kereta-haramain" },
  { label: "Persiapan Umrah", to: "/panduan#persiapan-dasar" },
  { label: "Rute & Navigasi", to: "/panduan#dari-bandara" },
];
// Ubah URL di sini ketika akun sosial resmi diperbarui.
const socialLinks = [
  {
    label: "Instagram",
    platform: "instagram",
    href: "https://www.instagram.com/sudutharamain/",
  },
  {
    label: "TikTok",
    platform: "tiktok",
    href: "https://www.tiktok.com/@sudutharamain",
  },
  {
    label: "YouTube",
    platform: "youtube",
    href: "https://www.youtube.com/@sudutharamain",
  },
] as const;
const accordionOpen = ref<string | null>(null);
const whatsappHref="https://wa.me/62871361823123";
function trackSocial(eventType:'instagram_click'|'whatsapp_click'){trackEvent({eventType})}
function toggleGroup(group: string) {
  accordionOpen.value = accordionOpen.value === group ? null : group;
}
</script>

<template>
  <footer class="bg-sht-olive-dark text-sht-off-white">
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div
        class="hidden border-b border-sht-off-white/15 py-20 sm:block sm:py-24"
      >
        <h2
          class="max-w-2xl font-hero text-4xl font-bold italic leading-tight sm:text-6xl"
        >
          {{ t("Melihat Haramain") }}<br class="hidden sm:block" />
          {{ t("dari lebih dekat.") }}
        </h2>
      </div>

      <div
        class="grid gap-12 py-14 sm:py-16 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_0.8fr] lg:gap-10"
      >
        <div>
          <img
            :src="footerLogo"
            :alt="t('Sudut Haramain')"
            class="h-16 w-auto"
          />
          <p
            class="mt-4 max-w-sm text-sm leading-relaxed text-sht-off-white/70"
          >
            {{ t("Media Digital & Informasi Praktis Makkah–Madinah") }}
          </p>
          <p
            class="mt-3 max-w-sm text-sm leading-relaxed text-sht-off-white/55"
          >
            {{
              t(
                "Melihat Haramain lebih dekat melalui kultur lokal, informasi langsung dari Makkah–Madinah, dan panduan praktis.",
              )
            }}
          </p>
        </div>

        <nav class="hidden lg:block" :aria-label="t('Eksplorasi footer')">
          <h3
            class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold"
          >
            {{ t("EKSPLORASI") }}
          </h3>
          <ul class="mt-5 space-y-3 text-sm text-sht-off-white/70">
            <li v-for="link in explorationLinks" :key="link.label">
              <NuxtLink
                :to="localePath(link.to)"
                class="transition-colors hover:text-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
                >{{ t(link.label) }}</NuxtLink
              >
            </li>
          </ul>
        </nav>
        <nav class="hidden lg:block" :aria-label="t('Panduan footer')">
          <h3
            class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold"
          >
            {{ t("PANDUAN") }}
          </h3>
          <ul class="mt-5 space-y-3 text-sm text-sht-off-white/70">
            <li v-for="link in guideLinks" :key="link.label">
              <NuxtLink
                :to="localePath(link.to)"
                class="transition-colors hover:text-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
                >{{ t(link.label) }}</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                :to="localePath('/panduan')"
                class="font-medium transition-colors hover:text-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
                >{{ t("Lihat semua panduan →") }}</NuxtLink
              >
            </li>
          </ul>
        </nav>
        <div class="hidden lg:block">
          <h3
            class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold"
          >
            {{ t("LAYANAN") }}
          </h3>
          <ul class="mt-5 space-y-3 text-sm text-sht-off-white/70">
            <li>
              <span>{{ t("Sudut Haramain Tour") }}</span
              ><span class="mt-1 block text-xs text-sht-off-white/45">{{
                t("Segera Hadir, Insyaa Allaah")
              }}</span>
            </li>
            <li>
              <span>{{ t("Sudut Haramain Jastip") }}</span
              ><span class="mt-1 block text-xs text-sht-off-white/45">{{
                t("Segera Hadir, Insyaa Allaah")
              }}</span>
            </li>
          </ul>
          <div class="mt-8">
            <h3
              class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold"
            >
              {{ t("IKUTI SUDUT HARAMAIN") }}
            </h3>
            <div class="mt-4 flex items-center gap-3 text-sht-off-white/75">
              <a
                v-for="social in socialLinks"
                :key="social.platform"
                :href="social.href"
                target="_blank"
                rel="noopener noreferrer"
                :aria-label="t(social.label)"
                @click="social.platform === 'instagram' && trackSocial('instagram_click')"
                class="rounded-sm transition-colors hover:text-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold"
                ><svg
                  v-if="social.platform === 'instagram'"
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r=".75"
                    fill="currentColor"
                    stroke="none"
                  /></svg
                ><svg
                  v-else-if="social.platform === 'tiktok'"
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14 4v10.2a3.8 3.8 0 1 1-3-3.7M14 4c.7 2.2 2.1 3.5 4.5 3.8"
                  /></svg
                ><svg
                  v-else
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.6"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M20.2 7.4a2.2 2.2 0 0 0-1.5-1.5C17.4 5.5 12 5.5 12 5.5s-5.4 0-6.7.4a2.2 2.2 0 0 0-1.5 1.5C3.4 8.7 3.4 12 3.4 12s0 3.3.4 4.6a2.2 2.2 0 0 0 1.5 1.5c1.3.4 6.7.4 6.7.4s5.4 0 6.7-.4a2.2 2.2 0 0 0 1.5-1.5c.4-1.3.4-4.6.4-4.6s0-3.3-.4-4.6Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m10 9 5 3-5 3V9Z"
                  /></svg
              ></a><a :href="whatsappHref" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="rounded-sm transition-colors hover:text-sht-gold" @click="trackSocial('whatsapp_click')"><MessageCircle class="h-6 w-6" /></a>
            </div>
          </div>
        </div>
      </div>

      <div class="lg:hidden">
        <div
          v-for="(group, key) in {
            Eksplorasi: explorationLinks,
            Panduan: guideLinks,
          }"
          :key="key"
          class="border-t border-sht-off-white/15"
        >
          <button
            type="button"
            class="flex min-h-[56px] w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold"
            :aria-expanded="accordionOpen === key"
            @click="toggleGroup(key)"
          >
            {{ t(key)
            }}<ChevronDown
              class="h-5 w-5 transition-transform duration-200"
              :class="accordionOpen === key ? 'rotate-180' : ''"
              aria-hidden="true"
            />
          </button>
          <div v-show="accordionOpen === key" class="overflow-hidden pb-4">
            <NuxtLink
              v-for="link in group"
              :key="link.label"
              :to="localePath(link.to)"
              class="block py-2 text-sm text-sht-off-white/70 hover:text-sht-gold"
              >{{ t(link.label) }}</NuxtLink
            ><NuxtLink
              v-if="key === 'Panduan'"
              :to="localePath('/panduan')"
              class="block py-2 text-sm font-medium text-sht-off-white/70 hover:text-sht-gold"
              >{{ t("Lihat semua panduan →") }}</NuxtLink
            >
          </div>
        </div>
        <div class="border-t border-sht-off-white/15">
          <button
            type="button"
            class="flex min-h-[56px] w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold"
            :aria-expanded="accordionOpen === 'Layanan'"
            @click="toggleGroup('Layanan')"
          >
            {{ t("LAYANAN")
            }}<ChevronDown
              class="h-5 w-5 transition-transform duration-200"
              :class="accordionOpen === 'Layanan' ? 'rotate-180' : ''"
              aria-hidden="true"
            />
          </button>
          <div
            v-show="accordionOpen === 'Layanan'"
            class="overflow-hidden pb-4 text-sm text-sht-off-white/70"
          >
            <p class="py-2">
              {{ t("Sudut Haramain Tour") }}
              <span class="ml-2 text-xs text-sht-off-white/45">{{
                t("Segera Hadir, Insyaa Allaah")
              }}</span>
            </p>
            <p class="py-2">
              {{ t("Sudut Haramain Jastip") }}
              <span class="ml-2 text-xs text-sht-off-white/45">{{
                t("Segera Hadir, Insyaa Allaah")
              }}</span>
            </p>
          </div>
        </div>
        <div class="border-t border-sht-off-white/15 py-6">
          <h3
            class="text-xs font-semibold uppercase tracking-[0.2em] text-sht-gold"
          >
            {{ t("IKUTI SUDUT HARAMAIN") }}
          </h3>
          <div class="mt-4 flex items-center gap-3 text-sht-off-white/75">
            <a
              v-for="social in socialLinks"
              :key="social.platform"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="t(social.label)"
              @click="social.platform === 'instagram' && trackSocial('instagram_click')"
              class="rounded-sm transition-colors hover:text-sht-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold"
              ><svg
                v-if="social.platform === 'instagram'"
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r=".75"
                  fill="currentColor"
                  stroke="none"
                /></svg
              ><svg
                v-else-if="social.platform === 'tiktok'"
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14 4v10.2a3.8 3.8 0 1 1-3-3.7M14 4c.7 2.2 2.1 3.5 4.5 3.8"
                /></svg
              ><svg
                v-else
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.6"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.2 7.4a2.2 2.2 0 0 0-1.5-1.5C17.4 5.5 12 5.5 12 5.5s-5.4 0-6.7.4a2.2 2.2 0 0 0-1.5 1.5C3.4 8.7 3.4 12 3.4 12s0 3.3.4 4.6a2.2 2.2 0 0 0 1.5 1.5c1.3.4 6.7.4 6.7.4s5.4 0 6.7-.4a2.2 2.2 0 0 0 1.5-1.5c.4-1.3.4-4.6.4-4.6s0-3.3-.4-4.6Z"
                />
                <path
                  fill="currentColor"
                  stroke="none"
                  d="m10 9 5 3-5 3V9Z"
                /></svg
            ></a><a :href="whatsappHref" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="rounded-sm transition-colors hover:text-sht-gold" @click="trackSocial('whatsapp_click')"><MessageCircle class="h-6 w-6" /></a>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col gap-4 border-t border-sht-off-white/15 py-7 text-xs text-sht-off-white/50 sm:flex-row sm:items-center sm:justify-between"
      >
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <span>{{ t("© 2026 Sudut Haramain") }}</span
          ><NuxtLink
            :to="localePath('/tentang-kami')"
            class="hover:text-sht-off-white"
            >{{ t("Tentang Kami") }}</NuxtLink
          ><NuxtLink
            :to="localePath('/kebijakan-privasi')"
            class="hover:text-sht-off-white"
            >{{ t("Kebijakan Privasi") }}</NuxtLink
          ><NuxtLink
            :to="localePath('/syarat-ketentuan')"
            class="hover:text-sht-off-white"
            >{{ t("Syarat & Ketentuan") }}</NuxtLink
          >
        </div>
        <p class="text-sht-off-white/60">
          {{ t("Dari Makkah, untuk jamaah Indonesia.") }}
        </p>
      </div>
    </div>
  </footer>
</template>
