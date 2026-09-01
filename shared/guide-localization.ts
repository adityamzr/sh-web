type GuideIdentity = { id: number; slug: string }

// A guide's ID is shared across locales; slugs are editorial content.
export function resolveGuideTopic<T extends GuideIdentity>(guides: T[], alternates: GuideIdentity[], hash: string) {
  let slug = hash.replace(/^#/, '')
  try { slug = decodeURIComponent(slug) } catch { /* Invalid escapes are an unknown topic. */ }
  const direct = guides.find(guide => guide.slug === slug)
  const alternate = alternates.find(guide => guide.slug === slug)
  const translated = alternate && guides.find(guide => guide.id === alternate.id)
  return { topic: direct || translated || guides[0] || null, unavailable: Boolean(slug && !direct && !translated) }
}
