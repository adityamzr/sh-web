// Central visibility control for public ecosystem units.
// Temporarily hide Tour & Jastip from public media site.
// Re-enable later by setting to true.

export const PUBLIC_ECOSYSTEM = {
  tour: false,
  jastip: false,
} as const

// Derived flags for sections that depend on Tour/Jastip
export const SHOW_ASSISTANCE_SECTION = PUBLIC_ECOSYSTEM.tour || PUBLIC_ECOSYSTEM.jastip
export const SHOW_FOOTER_LAYANAN = PUBLIC_ECOSYSTEM.tour || PUBLIC_ECOSYSTEM.jastip

// Keep original definitions for future re-enable (do not delete)
export const ECOSYSTEM_UNITS = {
  media: {
    id: 1,
    name: 'Apa itu Sudut Haramain?',
    subtitle: 'Mengenal media digital Sudut Haramain.',
    href: '/tentang-kami',
  },
  tour: {
    id: 2,
    name: 'Sudut Haramain Tour',
    subtitle: 'Umroh Mandiri & Land Arrangement',
    href: 'https://tour.sudutharamain.id',
  },
  jastip: {
    id: 3,
    name: 'Sudut Haramain Jastip',
    subtitle: 'Titip beli dari Makkah–Madinah',
    href: 'https://jastip.sudutharamain.id',
  },
} as const
