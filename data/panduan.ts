export interface GuideTopic {
  id: string
  slug: string
  title: string
  intro: string
  status: string
  keywords?: string[]
}

export interface GuideGroup {
  id: string
  title: string
  topics: GuideTopic[]
}

const topic = (slug: string, title: string, intro = 'Panduan ini akan membahas hal-hal praktis yang relevan bagi jamaah dan pengunjung Haramain.', keywords: string[] = []): GuideTopic => ({
  id: slug,
  slug,
  title,
  intro,
  status: 'Konten sedang disusun.',
  keywords,
})

export const guideGroups: GuideGroup[] = [
  {
    id: 'mulai-di-sini',
    title: 'MULAI DI SINI',
    topics: [
      topic('tentang-panduan', 'Tentang Panduan'),
      topic('informasi-penting', 'Informasi Penting'),
      topic('persiapan-dasar', 'Persiapan Dasar'),
    ],
  },
  {
    id: 'kehidupan-di-haramain',
    title: 'KEHIDUPAN DI HARAMAIN',
    topics: [
      topic('kultur-lokal', 'Kultur Lokal', undefined, ['budaya', 'etika']),
      topic('bahasa-sehari-hari', 'Bahasa Sehari-hari', undefined, ['bahasa', 'komunikasi']),
      topic('cuaca', 'Cuaca'),
      topic('belanja', 'Belanja'),
      topic('kuliner', 'Kuliner', undefined, ['makan', 'makanan']),
    ],
  },
  {
    id: 'transportasi',
    title: 'TRANSPORTASI',
    topics: [
      topic('dari-bandara', 'Dari Bandara', undefined, ['airport', 'bandara']),
      topic('taksi', 'Taksi'),
      topic('bus', 'Bus'),
      topic('kereta-haramain', 'Kereta Haramain', undefined, ['kereta', 'train']),
    ],
  },
  {
    id: 'hotel',
    title: 'HOTEL',
    topics: [
      topic('memilih-area-hotel', 'Memilih Area Hotel'),
      topic('check-in', 'Check-in'),
      topic('fasilitas-hotel', 'Fasilitas Hotel'),
    ],
  },
  {
    id: 'makkah',
    title: 'MAKKAH',
    topics: [
      topic('sekitar-masjidil-haram', 'Sekitar Masjidil Haram'),
      topic('area-hotel-makkah', 'Area Hotel'),
      topic('transportasi-lokal-makkah', 'Transportasi Lokal'),
      topic('tempat-makan-makkah', 'Tempat Makan'),
    ],
  },
  {
    id: 'madinah',
    title: 'MADINAH',
    topics: [
      topic('sekitar-masjid-nabawi', 'Sekitar Masjid Nabawi'),
      topic('rawdhah', 'Rawdhah'),
      topic('transportasi-lokal-madinah', 'Transportasi Lokal'),
      topic('tempat-makan-madinah', 'Tempat Makan'),
    ],
  },
  {
    id: 'perjalanan',
    title: 'PERJALANAN',
    topics: [
      topic('paspor', 'Paspor'),
      topic('visa', 'Visa'),
      topic('nusuk', 'Nusuk'),
      topic('internet', 'Internet'),
      topic('pembayaran', 'Pembayaran'),
    ],
  },
  {
    id: 'ibadah',
    title: 'IBADAH',
    topics: [
      topic('gambaran-umrah', 'Gambaran Umrah'),
      topic('ihram', 'Ihram'),
      topic('miqat', 'Miqat'),
      topic('tawaf', 'Tawaf'),
      topic('sai', 'Sa’i'),
      topic('tahallul', 'Tahallul'),
    ],
  },
]

export const guideTopics = guideGroups.flatMap((group) => group.topics.map((guideTopic) => ({ ...guideTopic, groupId: group.id, groupTitle: group.title })))
