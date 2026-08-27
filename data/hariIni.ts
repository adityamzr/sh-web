export type HariIniCity = 'makkah' | 'madinah'
export type HariIniCategory = 'Makkah' | 'Madinah' | 'Transportasi' | 'Masjid' | 'Kehidupan' | 'Panduan'
export type HariIniContentType = 'article' | 'update' | 'practical'

export interface HariIniArticle {
  id: string
  title: string
  summary: string
  city: HariIniCity
  category: HariIniCategory
  tags: string[]
  publishedAt: string
  image: string
  alt: string
  priority: number
  type: HariIniContentType
}

export const hariIniArticles: HariIniArticle[] = [
  { id: 'makkah-daily-rhythm', title: 'Mengenal ritme kawasan pusat Makkah di luar jam-jam utama jamaah.', summary: 'Catatan editorial tentang cara membaca suasana kota melalui waktu, jarak, dan kebiasaan sehari-hari.', city: 'makkah', category: 'Kehidupan', tags: ['makkah', 'kehidupan', 'kawasan', 'jalan'], publishedAt: 'Hari ini', image: '/images/saudi-local-detail.jpg', alt: 'Detail lingkungan kota Makkah', priority: 100, type: 'article' },
  { id: 'madinah-nabawi-atmosphere', title: 'Suasana kawasan sekitar Masjid Nabawi setelah waktu salat.', summary: 'Melihat ruang pedestrian dan ritme pergerakan jamaah dengan lebih tenang.', city: 'madinah', category: 'Masjid', tags: ['madinah', 'masjid', 'nabawi', 'suasana'], publishedAt: 'Hari ini', image: '/images/madinah-editorial.jpg', alt: 'Suasana Masjid Nabawi dari kejauhan', priority: 99, type: 'update' },
  { id: 'hotel-to-city-movement', title: 'Pilihan bergerak antara kawasan hotel dan pusat kota.', summary: 'Gambaran umum untuk memahami pilihan mobilitas tanpa membuat perjalanan terasa terburu-buru.', city: 'makkah', category: 'Transportasi', tags: ['transportasi', 'makkah', 'hotel', 'jalan'], publishedAt: 'Kemarin', image: '/images/gallery-transport.jpg', alt: 'Transportasi kota Makkah', priority: 98, type: 'practical' },
  { id: 'first-arrival-practical', title: 'Hal praktis yang sering dibutuhkan ketika baru tiba di Haramain.', summary: 'Catatan awal tentang orientasi kawasan, kebutuhan harian, dan cara mulai mengenali lingkungan sekitar.', city: 'madinah', category: 'Panduan', tags: ['panduan', 'madinah', 'perjalanan', 'baru tiba'], publishedAt: 'Kemarin', image: '/images/madinah-street.jpg', alt: 'Jalan pedestrian di Madinah', priority: 97, type: 'practical' },
  { id: 'makkah-morning-street', title: 'Pagi yang pelan di jalan-jalan sekitar Ajyad.', summary: 'Detail kecil dari kawasan yang membentuk wajah Makkah di luar arus utama.', city: 'makkah', category: 'Makkah', tags: ['makkah', 'jalan', 'pagi', 'arsitektur'], publishedAt: '26 Agu 2026', image: '/images/gallery-ajyad.jpg', alt: 'Pagi di kawasan Ajyad', priority: 96, type: 'article' },
  { id: 'madinah-quba-context', title: 'Membaca kawasan Quba sebelum melanjutkan perjalanan.', summary: 'Konteks visual dan suasana kawasan yang kerap menjadi bagian dari perjalanan di Madinah.', city: 'madinah', category: 'Madinah', tags: ['madinah', 'quba', 'ziarah', 'kawasan'], publishedAt: '26 Agu 2026', image: '/images/madinah-quba.jpg', alt: 'Masjid Quba di Madinah', priority: 95, type: 'article' },
  { id: 'masjid-as-city-orientation', title: 'Masjid sebagai titik orientasi ketika membaca sebuah kota.', summary: 'Mengapa ruang ibadah sering menjadi penanda penting untuk memahami lingkungan Haramain.', city: 'makkah', category: 'Masjid', tags: ['masjid', 'makkah', 'madinah', 'orientasi'], publishedAt: '25 Agu 2026', image: '/images/makkah-editorial.jpg', alt: 'Suasana Makkah dari kejauhan', priority: 94, type: 'article' },
  { id: 'quiet-mobility-madinah', title: 'Perjalanan singkat yang terasa berbeda di Madinah.', summary: 'Catatan tentang jarak, jeda, dan cara bergerak di antara kawasan yang saling terhubung.', city: 'madinah', category: 'Transportasi', tags: ['transportasi', 'madinah', 'jalan', 'hotel'], publishedAt: '25 Agu 2026', image: '/images/madinah-street.jpg', alt: 'Jalan pedestrian di Madinah', priority: 93, type: 'practical' },
  { id: 'everyday-market-detail', title: 'Detail pasar yang memberi warna pada keseharian Haramain.', summary: 'Potongan suasana dari toko, jalan, dan kebutuhan sehari-hari yang sering dilewati.', city: 'makkah', category: 'Kehidupan', tags: ['kehidupan', 'kuliner', 'makkah', 'pasar'], publishedAt: '24 Agu 2026', image: '/images/gallery-market.jpg', alt: 'Detail pasar lokal Makkah', priority: 92, type: 'article' },
  { id: 'understanding-nabawi-space', title: 'Mengenali ruang sekitar Nabawi dengan lebih sederhana.', summary: 'Panduan editorial untuk melihat hubungan antara pelataran, jalan, dan kawasan sekitar.', city: 'madinah', category: 'Panduan', tags: ['panduan', 'madinah', 'nabawi', 'masjid'], publishedAt: '24 Agu 2026', image: '/images/madinah-editorial.jpg', alt: 'Pelataran Masjid Nabawi', priority: 91, type: 'practical' },
  { id: 'uhud-landscape-note', title: 'Lanskap Uhud dan cara sebuah tempat menyimpan konteks.', summary: 'Catatan visual dari kawasan Madinah yang mengajak pembaca memperhatikan ruang lebih lama.', city: 'madinah', category: 'Madinah', tags: ['madinah', 'landscape', 'uhud', 'ziarah'], publishedAt: '23 Agu 2026', image: '/images/madinah-uhud.jpg', alt: 'Kawasan Uhud saat sore', priority: 90, type: 'article' },
  { id: 'makkah-architecture-layers', title: 'Lapisan arsitektur yang membentuk sisi lain Makkah.', summary: 'Melihat bangunan dan detail jalan sebagai bagian dari keseharian kota.', city: 'makkah', category: 'Makkah', tags: ['makkah', 'arsitektur', 'gedung', 'lokal'], publishedAt: '23 Agu 2026', image: '/images/gallery-misfalah.jpg', alt: 'Jalan di kawasan Misfalah', priority: 89, type: 'article' },
  { id: 'shared-haramain-routines', title: 'Kebiasaan kecil yang membantu membaca ritme Haramain.', summary: 'Pengantar ringan tentang perhatian, jeda, dan kebutuhan praktis saat berada di dua kota.', city: 'makkah', category: 'Kehidupan', tags: ['kehidupan', 'panduan', 'makkah', 'madinah'], publishedAt: '22 Agu 2026', image: '/images/saudi-local-detail.jpg', alt: 'Detail keseharian di Haramain', priority: 88, type: 'article' },
  { id: 'transport-haramain-overview', title: 'Membaca pilihan transportasi sebagai bagian dari perjalanan.', summary: 'Gambaran umum tentang cara memilih mobilitas sesuai kebutuhan dan konteks perjalanan.', city: 'madinah', category: 'Transportasi', tags: ['transportasi', 'panduan', 'haramain', 'perjalanan'], publishedAt: '22 Agu 2026', image: '/images/madinah-market.jpg', alt: 'Suasana jalan di Madinah', priority: 87, type: 'practical' },
  { id: 'masjid-quba-architecture', title: 'Detail arsitektur yang membuat ruang ibadah terasa dekat.', summary: 'Potongan visual dari Quba dan cara melihat detail bangunan tanpa terburu-buru.', city: 'madinah', category: 'Masjid', tags: ['masjid', 'madinah', 'quba', 'arsitektur'], publishedAt: '21 Agu 2026', image: '/images/madinah-quba.jpg', alt: 'Arsitektur Masjid Quba', priority: 86, type: 'article' },
]
