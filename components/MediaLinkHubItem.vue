<script setup lang="ts">
import {
  ArrowUpRight,
  ExternalLink,
  Globe,
  MessageCircle,
  Instagram,
  Youtube,
  Music2,
  Send,
  FileText,
  BookOpen,
  Users,
  Link2,
} from "lucide-vue-next";

export type LinkHubType =
  | "website"
  | "whatsapp"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "telegram"
  | "form"
  | "article"
  | "guide"
  | "community"
  | "external"
  | "custom";

export type LinkHubItem = {
  id: string;
  label: string;
  description?: string | null;
  url: string;
  type: LinkHubType;
  featured?: boolean;
  isActive?: boolean;
  sortOrder?: number;
  group?: string | null;
};

const props = defineProps<{ item: LinkHubItem }>();

function isInternalUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("/")) return true;
  try {
    const u = new URL(url);
    // Consider sudutharamain.id as internal
    return (
      u.hostname === "sudutharamain.id" ||
      u.hostname.endsWith(".sudutharamain.id")
    );
  } catch {
    return false;
  }
}

const internal = computed(() => isInternalUrl(props.item.url));
const isExternal = computed(() => !internal.value);

function iconForType(type: LinkHubType) {
  switch (type) {
    case "website":
      return Globe;
    case "whatsapp":
      return MessageCircle;
    case "instagram":
      return Instagram;
    case "youtube":
      return Youtube;
    case "tiktok":
      return Music2;
    case "telegram":
      return Send;
    case "form":
      return FileText;
    case "article":
      return FileText;
    case "guide":
      return BookOpen;
    case "community":
      return Users;
    default:
      return Link2;
  }
}

const IconComp = computed(() => iconForType(props.item.type));
</script>

<template>
  <component
    :is="internal ? 'NuxtLink' : 'a'"
    :to="internal ? item.url : undefined"
    :href="!internal ? item.url : undefined"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="group flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
    :class="
      item.featured
        ? 'bg-[#2D351F] border-[#2D351F] text-[#F6F4ED] shadow-sm hover:bg-[#3A4428] hover:border-[#3A4428] hover:shadow-md'
        : 'bg-white border-sht-stone/70 text-sht-olive-dark hover:border-sht-gold/60 hover:shadow-sm hover:-translate-y-[1px]'
    "
  >
    <div
      class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
      :class="
        item.featured
          ? 'bg-white/10 text-sht-gold'
          : 'bg-sht-stone/50 text-sht-olive'
      "
    >
      <component :is="IconComp" class="h-5 w-5" aria-hidden="true" />
    </div>
    <div class="min-w-0 flex-1">
      <p
        class="truncate text-[15px] font-semibold leading-tight"
        :class="item.featured ? 'text-[#F6F4ED]' : 'text-sht-olive-dark'"
      >
        {{ item.label }}
      </p>
      <p
        v-if="item.description"
        class="mt-1 line-clamp-2 text-xs leading-relaxed"
        :class="item.featured ? 'text-[#F6F4ED]/70' : 'text-sht-charcoal/60'"
      >
        {{ item.description }}
      </p>
    </div>
    <ArrowUpRight
      class="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      :class="
        item.featured
          ? 'text-sht-gold'
          : 'text-sht-charcoal/40 group-hover:text-sht-olive'
      "
      aria-hidden="true"
    />
  </component>
</template>
