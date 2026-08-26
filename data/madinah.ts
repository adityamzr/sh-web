export type MadinahCategory = 'Nabawi' | 'Rawdhah' | 'Ziarah' | 'Transportasi' | 'Kuliner' | 'Fasilitas'

export interface MadinahLocation {
  id: string
  name: string
  category: MadinahCategory
  coordinates: { lng: number; lat: number }
  shortDescription: string
  area: string
  externalMapsUrl: string
}

const maps = (lng: number, lat: number) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

/** Curated public locations; coordinates cross-checked against public map references for V1. */
export const madinahLocations: MadinahLocation[] = [
  { id: 'masjid-nabawi', name: 'Masjid Nabawi', category: 'Nabawi', coordinates: { lng: 39.611121, lat: 24.46721 }, shortDescription: 'Titik utama orientasi kawasan pusat Madinah dan tujuan ibadah jamaah.', area: 'Pusat Madinah', externalMapsUrl: maps(39.611121, 24.46721) },
  { id: 'rawdhah', name: 'Rawdhah', category: 'Rawdhah', coordinates: { lng: 39.610935, lat: 24.467106 }, shortDescription: 'Bagian dari area Masjid Nabawi yang menjadi tujuan penting bagi jamaah.', area: 'Masjid Nabawi', externalMapsUrl: maps(39.610935, 24.467106) },
  { id: 'baqi-cemetery', name: 'Pemakaman Al-Baqi', category: 'Ziarah', coordinates: { lng: 39.615604, lat: 24.466568 }, shortDescription: 'Pemakaman bersejarah yang berada di sisi timur Masjid Nabawi.', area: 'Sebelah timur Nabawi', externalMapsUrl: maps(39.615604, 24.466568) },
  { id: 'masjid-quba', name: 'Masjid Quba', category: 'Ziarah', coordinates: { lng: 39.617289, lat: 24.439446 }, shortDescription: 'Masjid bersejarah di selatan Madinah dan salah satu tujuan ziarah yang dikenal luas.', area: 'Quba', externalMapsUrl: maps(39.617289, 24.439446) },
  { id: 'masjid-qiblatain', name: 'Masjid Qiblatain', category: 'Ziarah', coordinates: { lng: 39.569232, lat: 24.485742 }, shortDescription: 'Masjid bersejarah di kawasan barat laut Madinah.', area: 'Al Qiblatayn', externalMapsUrl: maps(39.569232, 24.485742) },
  { id: 'mount-uhud', name: 'Jabal Uhud', category: 'Ziarah', coordinates: { lng: 39.61389, lat: 24.51028 }, shortDescription: 'Kawasan bersejarah di utara Madinah dengan konteks penting dalam sirah.', area: 'Utara Madinah', externalMapsUrl: maps(39.61389, 24.51028) },
  { id: 'madinah-station', name: 'Stasiun Kereta Cepat Madinah', category: 'Transportasi', coordinates: { lng: 39.6994, lat: 24.4702 }, shortDescription: 'Hub Haramain High Speed Railway untuk perjalanan menuju dan dari Madinah.', area: 'Al Hadra', externalMapsUrl: maps(39.719883, 24.553422) },
  { id: 'madinah-bus-station', name: 'Madinah Bus Station', category: 'Transportasi', coordinates: { lng: 39.603831, lat: 24.476512 }, shortDescription: 'Titik transportasi publik di sekitar kawasan pusat Madinah.', area: 'Anbariya', externalMapsUrl: maps(39.603831, 24.476512) },
  { id: 'taiba-commercial-center', name: 'Taiba Commercial Center', category: 'Kuliner', coordinates: { lng: 39.609504, lat: 24.473201 }, shortDescription: 'Pusat komersial dekat kawasan Nabawi dengan pilihan makan dan kebutuhan harian.', area: 'Sekitar Nabawi', externalMapsUrl: maps(39.609504, 24.473201) },
  { id: 'qiblatain-health-center', name: 'Al Ansar Hospital', category: 'Fasilitas', coordinates: { lng: 39.606777, lat: 24.472989 }, shortDescription: 'Fasilitas kesehatan publik di sekitar kawasan pusat Madinah.', area: 'Sekitar Nabawi', externalMapsUrl: maps(39.606777, 24.472989) },
]
