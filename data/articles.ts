export type ArticleCity = 'makkah' | 'madinah' | 'general'
export type ArticleCategory = 'Makkah' | 'Madinah' | 'Transportasi' | 'Masjid' | 'Kehidupan' | 'Panduan'
export type ArticleType = 'article' | 'update' | 'practical'
export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'blockquote'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'callout'; text: string }

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: ArticleBlock[]
  city: ArticleCity
  category: ArticleCategory
  tags: string[]
  publishedAt: string
  updatedAt?: string
  image: string
  imageAlt: string
  readingTime: string
  featured?: boolean
  priority: number
  type: ArticleType
  references?: string[]
  relatedSlugs?: string[]
}

const article = (data: Omit<Article, 'content'> & { content?: ArticleBlock[] }): Article => ({
  ...data,
  content: data.content ?? [
    { type: 'paragraph', text: data.excerpt },
    { type: 'callout', text: 'Konten editorial ini merupakan bagian dari fondasi awal Sudut Haramain dan akan dilengkapi melalui proses editorial berikutnya.' },
  ],
})

export const articles: Article[] = [
  article({ id: 'makkah-daily-rhythm', slug: 'ritme-kawasan-pusat-makkah', title: 'Mengenal ritme kawasan pusat Makkah di luar jam-jam utama jamaah.', excerpt: 'Catatan editorial tentang cara membaca suasana kota melalui waktu, jarak, dan kebiasaan sehari-hari.', city: 'makkah', category: 'Kehidupan', tags: ['makkah', 'kehidupan', 'kawasan', 'jalan'], publishedAt: 'Hari ini', image: '/images/saudi-local-detail.jpg', imageAlt: 'Detail lingkungan kota Makkah', readingTime: '3 menit baca', featured: true, priority: 100, type: 'article' }),
  article({ id: 'madinah-nabawi-atmosphere', slug: 'suasana-sekitar-masjid-nabawi', title: 'Suasana kawasan sekitar Masjid Nabawi setelah waktu salat.', excerpt: 'Melihat ruang pedestrian dan ritme pergerakan jamaah dengan lebih tenang.', city: 'madinah', category: 'Masjid', tags: ['madinah', 'masjid', 'nabawi', 'suasana'], publishedAt: 'Hari ini', image: '/images/madinah-editorial.jpg', imageAlt: 'Suasana Masjid Nabawi dari kejauhan', readingTime: '2 menit baca', featured: true, priority: 99, type: 'update' }),
  article({ id: 'hotel-to-city-movement', slug: 'bergerak-antara-hotel-dan-pusat-kota', title: 'Pilihan bergerak antara kawasan hotel dan pusat kota.', excerpt: 'Gambaran umum untuk memahami pilihan mobilitas tanpa membuat perjalanan terasa terburu-buru.', city: 'makkah', category: 'Transportasi', tags: ['transportasi', 'makkah', 'hotel', 'jalan'], publishedAt: 'Kemarin', image: '/images/gallery-transport.jpg', imageAlt: 'Transportasi kota Makkah', readingTime: '3 menit baca', featured: true, priority: 98, type: 'practical' }),
  article({ id: 'first-arrival-practical', slug: 'hal-praktis-ketika-baru-tiba', title: 'Hal praktis yang sering dibutuhkan ketika baru tiba di Haramain.', excerpt: 'Catatan awal tentang orientasi kawasan, kebutuhan harian, dan cara mulai mengenali lingkungan sekitar.', city: 'madinah', category: 'Panduan', tags: ['panduan', 'madinah', 'perjalanan', 'baru tiba'], publishedAt: 'Kemarin', image: '/images/madinah-street.jpg', imageAlt: 'Jalan pedestrian di Madinah', readingTime: '3 menit baca', featured: true, priority: 97, type: 'practical' }),
  article({ id: 'makkah-morning-street', slug: 'pagi-di-jalan-ajyad', title: 'Pagi yang pelan di jalan-jalan sekitar Ajyad.', excerpt: 'Detail kecil dari kawasan yang membentuk wajah Makkah di luar arus utama.', city: 'makkah', category: 'Makkah', tags: ['makkah', 'jalan', 'pagi', 'arsitektur'], publishedAt: '26 Agu 2026', image: '/images/gallery-ajyad.jpg', imageAlt: 'Pagi di kawasan Ajyad', readingTime: '2 menit baca', priority: 96, type: 'article' }),
  article({ id: 'madinah-quba-context', slug: 'membaca-kawasan-quba', title: 'Membaca kawasan Quba sebelum melanjutkan perjalanan.', excerpt: 'Konteks visual dan suasana kawasan yang kerap menjadi bagian dari perjalanan di Madinah.', city: 'madinah', category: 'Madinah', tags: ['madinah', 'quba', 'ziarah', 'kawasan'], publishedAt: '26 Agu 2026', image: '/images/madinah-quba.jpg', imageAlt: 'Masjid Quba di Madinah', readingTime: '3 menit baca', priority: 95, type: 'article' }),
  article({ id: 'masjid-as-city-orientation', slug: 'masjid-sebagai-titik-orientasi', title: 'Masjid sebagai titik orientasi ketika membaca sebuah kota.', excerpt: 'Mengapa ruang ibadah sering menjadi penanda penting untuk memahami lingkungan Haramain.', city: 'makkah', category: 'Masjid', tags: ['masjid', 'makkah', 'madinah', 'orientasi'], publishedAt: '25 Agu 2026', image: '/images/makkah-editorial.jpg', imageAlt: 'Suasana Makkah dari kejauhan', readingTime: '3 menit baca', priority: 94, type: 'article' }),
  article({ id: 'quiet-mobility-madinah', slug: 'perjalanan-singkat-di-madinah', title: 'Perjalanan singkat yang terasa berbeda di Madinah.', excerpt: 'Catatan tentang jarak, jeda, dan cara bergerak di antara kawasan yang saling terhubung.', city: 'madinah', category: 'Transportasi', tags: ['transportasi', 'madinah', 'jalan', 'hotel'], publishedAt: '25 Agu 2026', image: '/images/madinah-street.jpg', imageAlt: 'Jalan pedestrian di Madinah', readingTime: '2 menit baca', priority: 93, type: 'practical' }),
  article({ id: 'everyday-market-detail', slug: 'detail-pasar-yang-memberi-warna', title: 'Detail pasar yang memberi warna pada keseharian Haramain.', excerpt: 'Potongan suasana dari toko, jalan, dan kebutuhan sehari-hari yang sering dilewati.', city: 'makkah', category: 'Kehidupan', tags: ['kehidupan', 'kuliner', 'makkah', 'pasar'], publishedAt: '24 Agu 2026', image: '/images/gallery-market.jpg', imageAlt: 'Detail pasar lokal Makkah', readingTime: '2 menit baca', priority: 92, type: 'article' }),
  article({ id: 'understanding-nabawi-space', slug: 'mengenali-ruang-sekitar-nabawi', title: 'Mengenali ruang sekitar Nabawi dengan lebih sederhana.', excerpt: 'Panduan editorial untuk melihat hubungan antara pelataran, jalan, dan kawasan sekitar.', city: 'madinah', category: 'Panduan', tags: ['panduan', 'madinah', 'nabawi', 'masjid'], publishedAt: '24 Agu 2026', image: '/images/madinah-editorial.jpg', imageAlt: 'Pelataran Masjid Nabawi', readingTime: '3 menit baca', priority: 91, type: 'practical' }),
  article({ id: 'uhud-landscape-note', slug: 'lanskap-uhud-dan-konteksnya', title: 'Lanskap Uhud dan cara sebuah tempat menyimpan konteks.', excerpt: 'Catatan visual dari kawasan Madinah yang mengajak pembaca memperhatikan ruang lebih lama.', city: 'madinah', category: 'Madinah', tags: ['madinah', 'landscape', 'uhud', 'ziarah'], publishedAt: '23 Agu 2026', image: '/images/madinah-uhud.jpg', imageAlt: 'Kawasan Uhud saat sore', readingTime: '3 menit baca', priority: 90, type: 'article' }),
  article({ id: 'makkah-architecture-layers', slug: 'lapisan-arsitektur-makkah', title: 'Lapisan arsitektur yang membentuk sisi lain Makkah.', excerpt: 'Melihat bangunan dan detail jalan sebagai bagian dari keseharian kota.', city: 'makkah', category: 'Makkah', tags: ['makkah', 'arsitektur', 'gedung', 'lokal'], publishedAt: '23 Agu 2026', image: '/images/gallery-misfalah.jpg', imageAlt: 'Jalan di kawasan Misfalah', readingTime: '2 menit baca', priority: 89, type: 'article' }),
  article({ id: 'shared-haramain-routines', slug: 'kebiasaan-kecil-di-haramain', title: 'Kebiasaan kecil yang membantu membaca ritme Haramain.', excerpt: 'Pengantar ringan tentang perhatian, jeda, dan kebutuhan praktis saat berada di dua kota.', city: 'makkah', category: 'Kehidupan', tags: ['kehidupan', 'panduan', 'makkah', 'madinah'], publishedAt: '22 Agu 2026', image: '/images/saudi-local-detail.jpg', imageAlt: 'Detail keseharian di Haramain', readingTime: '2 menit baca', priority: 88, type: 'article' }),
  article({ id: 'transport-haramain-overview', slug: 'membaca-pilihan-transportasi', title: 'Membaca pilihan transportasi sebagai bagian dari perjalanan.', excerpt: 'Gambaran umum tentang cara memilih mobilitas sesuai kebutuhan dan konteks perjalanan.', city: 'madinah', category: 'Transportasi', tags: ['transportasi', 'panduan', 'haramain', 'perjalanan'], publishedAt: '22 Agu 2026', image: '/images/madinah-market.jpg', imageAlt: 'Suasana jalan di Madinah', readingTime: '3 menit baca', priority: 87, type: 'practical' }),
  article({ id: 'masjid-quba-architecture', slug: 'detail-arsitektur-masjid-quba', title: 'Detail arsitektur yang membuat ruang ibadah terasa dekat.', excerpt: 'Potongan visual dari Quba dan cara melihat detail bangunan tanpa terburu-buru.', city: 'madinah', category: 'Masjid', tags: ['masjid', 'madinah', 'quba', 'arsitektur'], publishedAt: '21 Agu 2026', image: '/images/madinah-quba.jpg', imageAlt: 'Arsitektur Masjid Quba', readingTime: '2 menit baca', priority: 86, type: 'article' }),
]

export const articleBySlug = (slug: string) => articles.find((item) => item.slug === slug)
