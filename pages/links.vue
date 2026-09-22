<script setup lang="ts">
import type { LinkHubItem } from "~/components/MediaLinkHubItem.vue";

definePageMeta({
  linkHub: true,
});

useSeoMeta({
  title: "Sudut Haramain — Tautan",
  description:
    "Tautan resmi Sudut Haramain untuk informasi, komunitas, dan kanal digital.",
  robots: "noindex, follow",
});

const siteUrl = "https://sudutharamain.id";
useHead({
  link: [{ rel: "canonical", href: `${siteUrl}/links` }],
  meta: [
    { property: "og:title", content: "Sudut Haramain — Tautan" },
    {
      property: "og:description",
      content:
        "Tautan resmi Sudut Haramain untuk informasi, komunitas, dan kanal digital.",
    },
    { property: "og:url", content: `${siteUrl}/links` },
    { property: "og:type", content: "website" },
  ],
});

const { settings, pending, error } = useMediaPageSettings("link-bio");

type LinkBioSettings = {
  title?: string;
  description?: string | null;
  links?: LinkHubItem[];
};

const data = computed<LinkBioSettings>(() => {
  const s = settings.value as any;
  if (!s)
    return {
      title: "Sudut Haramain",
      description: "Media Seputar Makkah & Madinah.",
      links: [],
    };
  return {
    title: s.title ?? "Sudut Haramain",
    description: s.description ?? "Media Seputar Makkah & Madinah.",
    links: Array.isArray(s.links) ? s.links : [],
  };
});

const activeLinks = computed(() => {
  const links = data.value.links ?? [];
  return links
    .filter((l) => l.isActive !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
});

const grouped = computed(() => {
  const links = activeLinks.value;
  const hasGroups = links.some((l) => l.group && l.group.trim());
  if (!hasGroups) return [{ group: null as string | null, items: links }];
  const map = new Map<string | null, LinkHubItem[]>();
  for (const link of links) {
    const g = link.group?.trim() || null;
    if (!map.has(g)) map.set(g, []);
    map.get(g)!.push(link);
  }
  // Ensure null group first if exists
  const result: Array<{ group: string | null; items: LinkHubItem[] }> = [];
  if (map.has(null)) result.push({ group: null, items: map.get(null)! });
  for (const [g, items] of map.entries()) {
    if (g === null) continue;
    result.push({ group: g, items });
  }
  return result;
});

const hasLinks = computed(() => activeLinks.value.length > 0);

// Fallback primary website link if API fails
const fallbackLink: LinkHubItem = {
  id: "fallback-website",
  label: "Sudut Haramain",
  description: "Kunjungi website utama",
  url: "https://sudutharamain.id/",
  type: "website",
  featured: false,
  isActive: true,
  sortOrder: 0,
};

// Verified social links from existing footer config (safe to reuse)
const verifiedSocials = [
  {
    platform: "instagram",
    href: "https://www.instagram.com/sudutharamain.id/",
    label: "Instagram",
  },
  {
    platform: "whatsapp",
    href: "https://wa.me/628212122424",
    label: "WhatsApp",
  },
] as const;

function trackSocial(platform: string) {
  // No new analytics event to avoid backend whitelist issues – use existing safe event if needed
  // For now, no analytics to keep V1 safe
}
</script>

<template>
  <div class="min-h-[100dvh] bg-[#F6F4ED] text-sht-charcoal">
    <!-- Subtle background decoration -->
    <div
      class="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        class="absolute -top-32 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#3A4428]/[0.04] blur-[60px]"
      />
      <div
        class="absolute top-[40%] right-[-100px] h-[400px] w-[400px] rounded-full bg-[#D3C168]/[0.06] blur-[50px]"
      />
      <div
        class="absolute bottom-[-80px] left-[-80px] h-[500px] w-[500px] rounded-full bg-[#3A4428]/[0.03] blur-[60px]"
      />
    </div>

    <div
      class="relative mx-auto flex min-h-[100dvh] max-w-[600px] flex-col px-5 py-10 sm:px-6 sm:py-14"
    >
      <!-- Header / Profile Area -->
      <header class="text-center">
        <NuxtLink
          to="/"
          class="inline-flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sht-gold"
        >
          <img
            src="../assets/images/logo_sh.png"
            alt="Sudut Haramain"
            class="h-24 w-auto rounded-xl"
          />
        </NuxtLink>
        <h1
          class="mt-6 font-hero text-2xl font-bold leading-tight text-sht-olive-dark"
        >
          {{ data.title }}
        </h1>
        <p
          v-if="data.description"
          class="mx-auto mt-3 max-w-[36ch] text-sm leading-relaxed text-sht-charcoal/70"
        >
          {{ data.description }}
        </p>
        <p
          class="mx-auto mt-5 text-xs font-medium uppercase tracking-[0.14em] text-sht-sage"
        >
          Pilih tautan yang ingin Anda kunjungi.
        </p>
      </header>

      <!-- Loading -->
      <div v-if="pending" class="mt-10 space-y-3">
        <div
          v-for="i in 3"
          :key="i"
          class="h-[64px] animate-pulse rounded-2xl bg-white/60"
        />
      </div>

      <!-- Error / Fallback -->
      <div v-else-if="error" class="mt-10">
        <div
          class="rounded-2xl border border-sht-stone/50 bg-white p-6 text-center"
        >
          <p class="text-sm text-sht-charcoal/70">
            Tautan belum dapat dimuat saat ini.
          </p>
          <p class="mt-2 text-xs text-sht-charcoal/50">
            Silakan coba lagi atau kunjungi website utama.
          </p>
          <NuxtLink
            to="/"
            class="mt-5 inline-flex rounded-full bg-sht-olive-dark px-5 py-2.5 text-sm font-semibold text-white"
            >Kembali ke Sudut Haramain</NuxtLink
          >
        </div>
        <div class="mt-6">
          <MediaLinkHubItem :item="fallbackLink" />
        </div>
      </div>

      <!-- Links -->
      <div v-else class="mt-10">
        <div
          v-if="!hasLinks"
          class="rounded-2xl border border-sht-stone/50 bg-white p-8 text-center"
        >
          <p class="text-sm font-medium text-sht-charcoal/70">
            Belum ada tautan yang tersedia.
          </p>
          <NuxtLink
            to="/"
            class="mt-5 inline-flex rounded-full bg-sht-olive-dark px-5 py-2.5 text-sm font-semibold text-white"
            >Kembali ke Sudut Haramain</NuxtLink
          >
        </div>

        <div v-else class="space-y-8">
          <div
            v-for="section in grouped"
            :key="section.group ?? 'ungrouped'"
            class="space-y-3"
          >
            <h2
              v-if="section.group"
              class="px-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-sht-charcoal/50"
            >
              {{ section.group }}
            </h2>
            <div class="space-y-3">
              <MediaLinkHubItem
                v-for="item in section.items"
                :key="item.id"
                :item="item"
              />
            </div>
          </div>
        </div>

        <!-- Social icon row - optional, only if not already duplicated as main cards -->
        <div class="mt-12 flex justify-center gap-4">
          <!-- <a v-for="social in verifiedSocials" :key="social.platform" :href="social.href" target="_blank" rel="noopener noreferrer" :aria-label="social.label" class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sht-stone/60 bg-white text-sht-olive-dark transition-colors hover:border-sht-gold/60 hover:bg-sht-stone/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold" @click="trackSocial(social.platform)">
            <svg v-if="social.platform==='instagram'" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none"/></svg>
            <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2-5.5A8.5 8.5 0 0 1 21 11.5Z"/></svg>
          </a> -->
        </div>
      </div>

      <!-- Footnote -->
      <footer class="mt-auto pt-16 text-center">
        <p class="text-[11px] font-medium tracking-wide text-sht-charcoal/40">
          © Sudut Haramain
        </p>
        <p class="mt-1 text-[11px] text-sht-charcoal/30">sudutharamain.id</p>
      </footer>
    </div>
  </div>
</template>
