export type MakkahCategory = 'Haram' | 'Transportasi' | 'Miqat' | 'Kuliner' | 'Fasilitas' | 'Ziarah'

export interface MakkahLocation {
  id: string
  name: string
  category: MakkahCategory
  coordinates: { lng: number; lat: number }
  shortDescription: string
  area: string
  externalMapsUrl: string
}

const maps = (lng: number, lat: number) => `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

/** Curated public locations; coordinates checked against public map/search references for V1. */
export const makkahLocations: MakkahLocation[] = [
  { id: 'masjidil-haram', name: 'Masjidil Haram', category: 'Haram', coordinates: { lng: 39.8248709, lat: 21.4245589 }, shortDescription: 'Titik utama ibadah dan orientasi kawasan pusat Makkah.', area: 'Pusat Makkah', externalMapsUrl: maps(39.8248709, 21.4245589) },
  { id: 'masjid-al-jinn', name: 'Masjid Al-Jinn', category: 'Ziarah', coordinates: { lng: 39.8289656, lat: 21.4334542 }, shortDescription: 'Masjid bersejarah di sekitar kawasan Haram.', area: 'Sulaimaniyah', externalMapsUrl: maps(39.8289656, 21.4334542) },
  { id: 'masjid-aisyah', name: 'Masjid Aisyah / Tan’im', category: 'Miqat', coordinates: { lng: 39.8013681, lat: 21.4677052 }, shortDescription: 'Salah satu titik miqat bagi jamaah yang hendak memulai Umrah.', area: 'At-Tan’im', externalMapsUrl: maps(39.8013681, 21.4677052) },
  { id: 'makkah-station', name: 'Stasiun Kereta Cepat Makkah', category: 'Transportasi', coordinates: { lng: 39.7893122, lat: 21.417613 }, shortDescription: 'Hub Haramain High Speed Railway di kawasan Ar Rusayfah.', area: 'Ar Rusayfah', externalMapsUrl: maps(39.7893122, 21.417613) },
  { id: 'al-shabeka', name: 'Al-Shabeka', category: 'Transportasi', coordinates: { lng: 39.82124, lat: 21.422009 }, shortDescription: 'Titik transit bus yang berguna untuk memahami perjalanan sekitar pusat kota.', area: 'Sekitar Haram', externalMapsUrl: maps(39.82124, 21.422009) },
  { id: 'hira-cultural-district', name: 'Hira Cultural District', category: 'Fasilitas', coordinates: { lng: 39.8684542, lat: 21.4568541 }, shortDescription: 'Kawasan budaya di sekitar Jabal An-Nour.', area: 'Jabal An-Nour', externalMapsUrl: maps(39.8684542, 21.4568541) },
  { id: 'jabal-an-nour', name: 'Jabal An-Nour', category: 'Ziarah', coordinates: { lng: 39.8597322, lat: 21.4577836 }, shortDescription: 'Kawasan bersejarah di sisi timur laut Makkah.', area: 'Jabal An-Nour', externalMapsUrl: maps(39.8597322, 21.4577836) },
  { id: 'jabal-thawr', name: 'Jabal Thawr', category: 'Ziarah', coordinates: { lng: 39.8498682, lat: 21.3770009 }, shortDescription: 'Salah satu lokasi bersejarah di bagian selatan Makkah.', area: 'Jabal Thawr', externalMapsUrl: maps(39.8498682, 21.3770009) },
  { id: 'makkah-mall', name: 'Makkah Mall', category: 'Kuliner', coordinates: { lng: 39.8845719, lat: 21.3909367 }, shortDescription: 'Pusat belanja dengan pilihan makan dan kebutuhan harian.', area: 'Al Jamiah', externalMapsUrl: maps(39.8845719, 21.3909367) },
  { id: 'mina', name: 'Mina', category: 'Fasilitas', coordinates: { lng: 39.8925058, lat: 21.4153556 }, shortDescription: 'Kawasan tenda yang menjadi bagian penting dari lanskap ibadah Makkah.', area: 'Mina', externalMapsUrl: maps(39.8925058, 21.4153556) },
]
