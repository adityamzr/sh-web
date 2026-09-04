<script setup lang="ts">
const { t, localePath, locale, basePath } = useLocale();
const { trackEvent } = useMediaAnalytics();

import type { Map, Marker } from "maplibre-gl";
import workerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";

type CityLocation = {
  id: string;
  name: string;
  category: string;
  coordinates: { lng: number; lat: number };
  shortDescription: string;
  area: string;
  externalMapsUrl: string;
};

const props = withDefaults(
  defineProps<{
    locations: CityLocation[];
    center: [number, number];
    cityName?: string;
    explorerId?: string;
    mapDescription?: string;
    categories?: string[];
    initialCategory?: string;
  }>(),
  {
    cityName: "Makkah",
    explorerId: "makkah-explorer",
    mapDescription:
      "Tempat penting, fasilitas, transportasi, dan titik yang berguna selama berada di Makkah.",
    categories: () => [
      "Semua",
      "Haram",
      "Transportasi",
      "Miqat",
      "Kuliner",
      "Fasilitas",
      "Ziarah",
    ],
    initialCategory: "Semua",
  },
);

const mapElement = ref<HTMLElement | null>(null);
const map = shallowRef<Map | null>(null);
const markerConstructor = shallowRef<
  typeof import("maplibre-gl").Marker | null
>(null);
const markers: Marker[] = [];
const activeCategory = ref(props.initialCategory);
const selectedId = ref(props.locations[0]?.id ?? "");
const mapError = ref(false);
const MAP_STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";
let styleLoaded = false;
let resizeObserver: ResizeObserver | null = null;
let styleLoadTimeout: ReturnType<typeof setTimeout> | null = null;

const visibleLocations = computed(() =>
  activeCategory.value === "Semua"
    ? props.locations
    : props.locations.filter(
        (location) => location.category === activeCategory.value,
      ),
);

watch(
  () => props.locations,
  (locations) => {
    selectedId.value = locations[0]?.id ?? "";
    nextTick(() => renderMarkers());
  },
  { deep: true },
);
const selectedLocation = computed(
  () =>
    visibleLocations.value.find(
      (location) => location.id === selectedId.value,
    ) ??
    visibleLocations.value[0] ??
    null,
);

function markerClass(location: CityLocation) {
  const selected = selectedId.value === location.id;
  const el = document.createElement("button");
  el.type = "button";
  el.className = `city-marker ${selected ? "is-selected" : ""}`;
  el.setAttribute("aria-label", t("Pilih {name}", { name: location.name }));
  el.innerHTML = '<span aria-hidden="true"></span>';
  el.addEventListener("click", () => selectLocation(location));
  return el;
}

function clearMarkers() {
  markers.forEach((marker) => marker.remove());
  markers.length = 0;
}

function renderMarkers() {
  if (!map.value || !import.meta.client) return;
  clearMarkers();
  visibleLocations.value.forEach((location) => {
    const Marker = markerConstructor.value;
    if (!Marker) return;
    const marker = new Marker({
      element: markerClass(location),
      anchor: "center",
    })
      .setLngLat([location.coordinates.lng, location.coordinates.lat])
      .addTo(map.value!);
    markers.push(marker);
  });
}

function selectLocation(location: CityLocation) {
  selectedId.value = location.id;
  trackEvent({
    eventType: "map_location_view",
    entityType: "map_location",
    entityId: Number(location.id),
    city: location.area.toUpperCase() as "MAKKAH" | "MADINAH",
    category: location.category,
  });
  map.value?.easeTo({
    center: [location.coordinates.lng, location.coordinates.lat],
    zoom: 14,
    duration: 600,
  });
}

function trackDirection(location: CityLocation) {
  trackEvent({
    eventType: "map_direction_click",
    entityType: "map_location",
    entityId: Number(location.id),
    city: location.area.toUpperCase() as "MAKKAH" | "MADINAH",
    category: location.category,
  });
}

function selectCategory(category: string) {
  activeCategory.value = category;
  const first = visibleLocations.value[0];
  if (first) selectedId.value = first.id;
  renderMarkers();
}

function focusCategory(category: string) {
  selectCategory(category);
  nextTick(() =>
    document
      .getElementById(props.explorerId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" }),
  );
}

defineExpose({ focusCategory });

onMounted(async () => {
  try {
    await nextTick();
    const maplibre = await import("maplibre-gl");
    maplibre.setWorkerUrl(workerUrl);
    if (!mapElement.value) throw new Error("Map container is not ready");
    markerConstructor.value = maplibre.Marker;
    map.value = new maplibre.Map({
      container: mapElement.value,
      style: MAP_STYLE_URL,
      center: props.center,
      zoom: 12.2,
      attributionControl: false,
    });
    map.value.addControl(
      new maplibre.NavigationControl({ showCompass: false }),
      "top-right",
    );
    map.value.addControl(
      new maplibre.AttributionControl({ compact: true }),
      "bottom-right",
    );
    map.value.once("load", () => {
      styleLoaded = true;
      mapError.value = false;
      if (styleLoadTimeout) clearTimeout(styleLoadTimeout);
      styleLoadTimeout = null;
      map.value?.resize();
      renderMarkers();
    });
    // Tile, glyph, or sprite failures can be non-fatal. Do not cover a usable map
    // with the fallback merely because one resource emitted an error.
    styleLoadTimeout = setTimeout(() => {
      if (!styleLoaded) mapError.value = true;
    }, 12_000);
    requestAnimationFrame(() => map.value?.resize());
    resizeObserver = new ResizeObserver(() => map.value?.resize());
    resizeObserver.observe(mapElement.value);
  } catch {
    mapError.value = true;
  }
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (styleLoadTimeout) clearTimeout(styleLoadTimeout);
  styleLoadTimeout = null;
  clearMarkers();
  map.value?.remove();
  map.value = null;
  markerConstructor.value = null;
});
</script>

<template>
  <section
    :id="props.explorerId"
    class="bg-sht-off-white py-12 sm:py-16"
    :aria-labelledby="`${props.explorerId}-heading`"
  >
    <div class="mx-auto max-w-container px-5 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <p
          :id="`${props.explorerId}-heading`"
          class="text-xs font-semibold uppercase tracking-[0.22em] text-sht-sage"
        >
          {{ t("PETA KOTA") }}
        </p>
        <p class="mt-3 text-sm leading-relaxed text-sht-charcoal/65">
          {{ t(props.mapDescription) }}
        </p>
      </div>
      <div
        class="mt-8 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="group"
        :aria-label="t('Filter kategori peta')"
      >
        <button
          v-for="category in props.categories"
          :key="category"
          type="button"
          class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
          :class="
            activeCategory === category
              ? 'border-sht-olive bg-sht-olive text-sht-off-white'
              : 'border-sht-stone bg-white text-sht-olive hover:border-sht-gold'
          "
          :aria-pressed="activeCategory === category"
          @click="selectCategory(category)"
        >
          {{ t(category) }}
        </button>
      </div>
      <div
        class="mt-4 grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(20rem,0.85fr)]"
      >
        <ClientOnly
          fallback-tag="div"
          :fallback="t('Memuat peta') + ' ' + props.cityName + '…'"
          ><div
            ref="mapElement"
            class="h-[380px] overflow-hidden rounded-3xl border border-sht-stone bg-sht-stone/40 sm:h-[420px]"
            :class="{ 'map-failed': mapError }"
          >
            <div
              v-if="mapError"
              class="flex h-full items-center justify-center bg-sht-stone/40 p-6 text-center text-sm text-sht-charcoal/70"
            >
              {{ t("Peta") }} {{ t(props.cityName) }}
              {{ t("sedang tidak dapat dimuat.") }}
            </div>
          </div>
          <template #fallback
            ><div
              class="flex h-[380px] items-center justify-center rounded-3xl border border-sht-stone bg-sht-stone/40 text-sm text-sht-charcoal/60 sm:h-[420px]"
            >
              {{ t("Memuat peta") }} {{ t(props.cityName) }}…
            </div></template
          ></ClientOnly
        >
        <aside class="min-w-0">
          <div class="hidden border-b border-sht-stone pb-3 lg:block">
            <p
              class="text-xs font-semibold uppercase tracking-[0.18em] text-sht-sage"
            >
              {{ t("TEMPAT PILIHAN") }}
            </p>
            <p class="mt-1 text-xs text-sht-charcoal/55">
              {{ t(visibleLocations.length) }} {{ t("titik dalam tampilan") }}
            </p>
          </div>
          <div
            class="mt-4 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mt-0 lg:block lg:max-h-[365px] lg:space-y-2 lg:overflow-y-auto"
          >
            <button
              v-for="location in visibleLocations"
              :key="location.id"
              type="button"
              class="min-w-[82%] snap-start rounded-2xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold lg:min-w-0 lg:w-full"
              :class="
                selectedLocation?.id === location.id
                  ? 'border-sht-gold bg-white'
                  : 'border-sht-stone bg-white/60 hover:border-sht-gold/60'
              "
              :aria-pressed="selectedLocation?.id === location.id"
              @click="selectLocation(location)"
            >
              <span
                class="text-[11px] font-semibold uppercase tracking-[0.16em] text-sht-sage"
                >{{ t(location.category) }}</span
              ><span
                class="mt-1 block font-hero text-lg font-bold not-italic text-sht-olive-dark"
                >{{ location.name }}</span
              ><span class="mt-1 block text-xs text-sht-charcoal/55">{{
                t(location.area)
              }}</span>
            </button>
          </div>
        </aside>
      </div>
      <article
        v-if="selectedLocation"
        class="mt-5 rounded-2xl border border-sht-stone bg-white p-5 sm:p-6"
      >
        <div
          class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
        >
          <div>
            <p
              class="text-xs font-semibold uppercase tracking-[0.16em] text-sht-sage"
            >
              {{ t(selectedLocation.category) }} ·
              {{ t(selectedLocation.area) }}
            </p>
            <h3
              class="mt-2 font-hero text-2xl font-bold not-italic text-sht-olive-dark"
            >
              {{ selectedLocation.name }}
            </h3>
            <p
              class="mt-2 max-w-2xl text-sm leading-relaxed text-sht-charcoal/70"
            >
              {{ selectedLocation.shortDescription }}
            </p>
          </div>
          <a
            :href="selectedLocation.externalMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="trackDirection(selectedLocation)"
            class="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-sht-olive px-5 py-3 text-sm font-semibold text-sht-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sht-gold"
            >{{ t("Buka Arah ↗") }}</a
          >
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
:deep(.city-marker) {
  width: 18px;
  height: 18px;
  padding: 0;
  border: 2px solid #f6f4ed;
  border-radius: 999px;
  background: #3a4428;
  box-shadow: 0 2px 7px rgb(45 53 31 / 35%);
  cursor: pointer;
}
:deep(.city-marker.is-selected) {
  width: 24px;
  height: 24px;
  background: #d3c168;
  border-color: #2d351f;
}
</style>
