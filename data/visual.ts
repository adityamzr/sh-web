import { makkahLocations } from '~/data/makkah'
import { madinahLocations } from '~/data/madinah'

export type VisualCity = 'makkah' | 'madinah'
export type VisualCategory = 'Masjid' | 'Landscape' | 'Arsitektur' | 'Jalan' | 'Transportasi' | 'Kuliner'

export interface VisualGalleryItem {
  id: string
  src: string
  alt: string
  title: string
  city: VisualCity
  locationName: string
  category: VisualCategory
  tags: string[]
  date: string
  description: string
  orientation: 'portrait' | 'landscape'
  mapUrl?: string
}

const locationMap = new Map(
  [...makkahLocations, ...madinahLocations].map((location) => [location.id, location.externalMapsUrl]),
)

const mapUrl = (locationId: string) => locationMap.get(locationId)

export const visualGalleryData: VisualGalleryItem[] = [
  { id: 'makkah-ajyad-morning', src: '/images/gallery-ajyad.jpg', alt: 'Pagi di kawasan Ajyad, Makkah', title: 'Pagi di Ajyad', city: 'makkah', locationName: 'Ajyad', category: 'Jalan', tags: ['makkah', 'jalan', 'pagi', 'gedung'], date: '12 Mei 2026', description: 'Lapisan bangunan dan jalan yang membentuk sisi lain Makkah.', orientation: 'portrait', mapUrl: mapUrl('masjidil-haram') },
  { id: 'makkah-misfalah-street', src: '/images/gallery-misfalah.jpg', alt: 'Jalan di kawasan Misfalah, Makkah', title: 'Jalan Misfalah', city: 'makkah', locationName: 'Misfalah', category: 'Jalan', tags: ['makkah', 'jalan', 'kawasan'], date: '10 Mei 2026', description: 'Ritme jalan lokal di luar arus utama jamaah.', orientation: 'landscape', mapUrl: mapUrl('makkah-station') },
  { id: 'makkah-taneem-mosque', src: '/images/gallery-taneem.jpg', alt: 'Arsitektur Masjid Aisyah di Tan’im', title: 'Masjid Aisyah di Tan’im', city: 'makkah', locationName: 'Tan’im', category: 'Masjid', tags: ['makkah', 'masjid', 'arsitektur', 'tan im'], date: '8 Mei 2026', description: 'Ruang tenang dan arsitektur Masjid Aisyah di Tan’im.', orientation: 'portrait', mapUrl: mapUrl('masjid-aisyah') },
  { id: 'makkah-market-detail', src: '/images/gallery-market.jpg', alt: 'Detail pasar lokal Makkah', title: 'Detail Pasar Makkah', city: 'makkah', locationName: 'Pusat Makkah', category: 'Kuliner', tags: ['makkah', 'kuliner', 'pasar', 'jalan'], date: '5 Mei 2026', description: 'Tekstur toko dan sudut kecil yang memberi warna pada keseharian kota.', orientation: 'landscape' },
  { id: 'makkah-transport-evening', src: '/images/gallery-transport.jpg', alt: 'Transportasi kota Makkah saat senja', title: 'Pergerakan Saat Senja', city: 'makkah', locationName: 'Sekitar Haram', category: 'Transportasi', tags: ['makkah', 'transportasi', 'jalan', 'malam'], date: '2 Mei 2026', description: 'Pergerakan kota saat sore berganti malam.', orientation: 'landscape', mapUrl: mapUrl('al-shabeka') },
  { id: 'makkah-haram-distant', src: '/images/makkah-editorial.jpg', alt: 'Masjidil Haram dari kejauhan', title: 'Haram dari Kejauhan', city: 'makkah', locationName: 'Makkah', category: 'Masjid', tags: ['makkah', 'masjid', 'landscape', 'haram'], date: '29 April 2026', description: 'Skala kota yang mengelilingi pusat ibadah.', orientation: 'portrait', mapUrl: mapUrl('masjidil-haram') },
  { id: 'makkah-local-detail', src: '/images/saudi-local-detail.jpg', alt: 'Detail lingkungan lokal Makkah', title: 'Detail Lingkungan Lokal', city: 'makkah', locationName: 'Kawasan Lokal', category: 'Arsitektur', tags: ['makkah', 'arsitektur', 'gedung', 'lokal'], date: '22 April 2026', description: 'Detail sederhana yang sering terlewat ketika melihat terlalu cepat.', orientation: 'portrait', mapUrl: mapUrl('hira-cultural-district') },
  { id: 'madinah-nabawi-morning', src: '/images/madinah-editorial.jpg', alt: 'Pagi di kawasan Masjid Nabawi', title: 'Pagi di Nabawi', city: 'madinah', locationName: 'Masjid Nabawi', category: 'Masjid', tags: ['madinah', 'masjid', 'nabawi', 'landscape', 'pagi'], date: '12 Mei 2026', description: 'Ruang luas dan ritme pagi yang membentuk pengalaman berada di pusat Madinah.', orientation: 'landscape', mapUrl: mapUrl('masjid-nabawi') },
  { id: 'madinah-street', src: '/images/madinah-street.jpg', alt: 'Jalan pedestrian di Madinah', title: 'Jalur Sekitar Nabawi', city: 'madinah', locationName: 'Sekitar Nabawi', category: 'Jalan', tags: ['madinah', 'jalan', 'pedestrian', 'nabawi'], date: '10 Mei 2026', description: 'Jalur pedestrian dan detail arsitektur yang menghubungkan kawasan hotel dengan Nabawi.', orientation: 'landscape', mapUrl: mapUrl('masjid-nabawi') },
  { id: 'madinah-quba-morning', src: '/images/madinah-quba.jpg', alt: 'Masjid Quba di pagi hari', title: 'Pagi di Quba', city: 'madinah', locationName: 'Quba', category: 'Masjid', tags: ['madinah', 'masjid', 'quba', 'arsitektur'], date: '8 Mei 2026', description: 'Suasana tenang dan arsitektur Masjid Quba di selatan Madinah.', orientation: 'portrait', mapUrl: mapUrl('masjid-quba') },
  { id: 'madinah-market', src: '/images/madinah-market.jpg', alt: 'Detail pasar lokal Madinah', title: 'Detail Pasar Madinah', city: 'madinah', locationName: 'Pusat Madinah', category: 'Kuliner', tags: ['madinah', 'kuliner', 'pasar', 'jalan'], date: '5 Mei 2026', description: 'Tekstur toko dan sudut kecil yang memberi warna pada keseharian kota.', orientation: 'landscape', mapUrl: mapUrl('taiba-commercial-center') },
  { id: 'madinah-uhud-evening', src: '/images/madinah-uhud.jpg', alt: 'Kawasan Uhud saat sore', title: 'Bentang Uhud', city: 'madinah', locationName: 'Uhud', category: 'Landscape', tags: ['madinah', 'landscape', 'uhud', 'sore'], date: '2 Mei 2026', description: 'Bentang batu dan ruang terbuka di kawasan bersejarah utara Madinah.', orientation: 'landscape', mapUrl: mapUrl('mount-uhud') },
  { id: 'madinah-nabawi-detail', src: '/images/madinah-editorial.jpg', alt: 'Detail pelataran Masjid Nabawi', title: 'Detail Pelataran Nabawi', city: 'madinah', locationName: 'Masjid Nabawi', category: 'Arsitektur', tags: ['madinah', 'nabawi', 'arsitektur', 'masjid'], date: '29 April 2026', description: 'Skala, bayang-bayang, dan detail ruang yang mengelilingi pusat kota.', orientation: 'portrait', mapUrl: mapUrl('masjid-nabawi') },
  { id: 'madinah-quba-walk', src: '/images/madinah-quba.jpg', alt: 'Suasana sekitar Quba', title: 'Sekitar Quba', city: 'madinah', locationName: 'Quba', category: 'Jalan', tags: ['madinah', 'quba', 'jalan', 'ziarah'], date: '26 April 2026', description: 'Catatan visual dari kawasan yang sering menjadi tujuan ziarah jamaah.', orientation: 'landscape', mapUrl: mapUrl('masjid-quba') },
  { id: 'madinah-neighborhood', src: '/images/madinah-market.jpg', alt: 'Detail lingkungan lokal Madinah', title: 'Kawasan Lokal Madinah', city: 'madinah', locationName: 'Kawasan Lokal', category: 'Arsitektur', tags: ['madinah', 'arsitektur', 'gedung', 'lokal'], date: '22 April 2026', description: 'Detail sederhana yang sering terlewat ketika Madinah dilihat terlalu cepat.', orientation: 'portrait', mapUrl: mapUrl('madinah-bus-station') },
]
