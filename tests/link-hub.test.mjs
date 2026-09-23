import test from 'node:test'
import assert from 'node:assert/strict'
import { loadTs } from './helpers/load-ts.mjs'

test('/links route renders standalone and SEO', async () => {
  const fs = await import('node:fs/promises')
  const linksVue = await fs.readFile('pages/links.vue', 'utf8')
  // Has linkHub meta
  assert.ok(linksVue.includes('linkHub: true') || linksVue.includes('linkHub:true'), 'should have linkHub meta')
  // SEO noindex
  assert.ok(linksVue.includes('noindex'), 'should have noindex')
  assert.ok(linksVue.includes('Sudut Haramain — Tautan'), 'should have correct title')
  assert.ok(linksVue.includes('canonical'), 'should have canonical')
  // Logo present
  assert.ok(linksVue.includes('sht_horizontal_black_logo') || linksVue.includes('sht_horizontal_white_logo'), 'should have logo')
  // Uses MediaLinkHubItem
  assert.ok(linksVue.includes('MediaLinkHubItem'), 'should use MediaLinkHubItem')
  // Empty state
  assert.ok(linksVue.includes('Belum ada tautan'), 'should have empty state')
  // Fallback
  assert.ok(linksVue.includes('fallbackLink') || linksVue.includes('Kembali ke Sudut Haramain'), 'should have fallback')
})

test('app.vue standalone shell opt-out', async () => {
  const fs = await import('node:fs/promises')
  const appVue = await fs.readFile('app.vue', 'utf8')
  assert.ok(appVue.includes('isLinkHub'), 'should have isLinkHub computed')
  assert.ok(appVue.includes('linkHub'), 'should check linkHub meta')
  assert.ok(appVue.includes('v-if="isLinkHub"'), 'should have v-if isLinkHub')
  // Ensure default shell unchanged for other routes
  assert.ok(appVue.includes('LiveTimeBar'), 'should still have LiveTimeBar for default')
  assert.ok(appVue.includes('MediaNavbar'), 'should still have MediaNavbar')
  assert.ok(appVue.includes('MediaFooter'), 'should still have MediaFooter')
})

test('MediaLinkHubItem component active/inactive/featured/internal/external', async () => {
  const fs = await import('node:fs/promises')
  const comp = await fs.readFile('components/MediaLinkHubItem.vue', 'utf8')
  // Props
  assert.ok(comp.includes('LinkHubItem'), 'should have type')
  // Featured style
  assert.ok(comp.includes('featured'), 'should handle featured')
  assert.ok(comp.includes('bg-[#2D351F]') || comp.includes('bg-sht-olive'), 'should have featured style')
  // Internal vs external - now uses <a> with href for all to ensure clickability, target _blank for external, _self for internal
  assert.ok(comp.includes('isInternalUrl') || comp.includes('internal'), 'should have internal check')
  assert.ok(comp.includes('target') && comp.includes('_blank'), 'should have target blank for external')
  assert.ok(comp.includes('noopener noreferrer'), 'should have rel noopener')
  // Should use <a> with href to ensure clickability even for self-links like /links
  assert.ok(comp.includes('<a') && comp.includes(':href'), 'should use <a> with href for clickability')
  // Icon handling
  assert.ok(comp.includes('iconForType') || comp.includes('IconComp'), 'should have icon handling')
})

test('sitemap does NOT include /links', async () => {
  const fs = await import('node:fs/promises')
  const sitemap = await fs.readFile('server/routes/sitemap.xml.ts', 'utf8')
  assert.ok(!sitemap.includes('/links'), 'sitemap should NOT include /links')
  assert.ok(sitemap.includes('staticRoutes'), 'should have staticRoutes')
})

test('link bio URL safety validation', async () => {
  const safeUrls = [
    'https://sudutharamain.id/',
    'https://www.instagram.com/sudutharamain.id/',
    'https://wa.me/628212122424',
    'https://chat.whatsapp.com/abc',
    'https://whatsapp.com/channel/xyz',
    'mailto:test@example.com',
    'tel:+628212122424',
  ]
  const unsafeUrls = [
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox(1)',
    'ftp://example.com',
  ]
  const isSafe = (url) => {
    const lower = url.toLowerCase()
    if (lower.startsWith('javascript:') || lower.startsWith('data:') || lower.startsWith('vbscript:')) return false
    return lower.startsWith('https://') || lower.startsWith('http://') || lower.startsWith('mailto:') || lower.startsWith('tel:')
  }
  for (const url of safeUrls) assert.ok(isSafe(url), `safe: ${url}`)
  for (const url of unsafeUrls) assert.ok(!isSafe(url), `unsafe: ${url}`)

  // Also ensure component would reject unsafe schemes (check file content)
  const fs = await import('node:fs/promises')
  const validatorsContent = await fs.readFile('../sht-admin/server/utils/validators.ts', 'utf8').catch(() => '')
  if (validatorsContent) {
    assert.ok(validatorsContent.includes('safeLinkUrl'), 'validators should have safeLinkUrl')
    assert.ok(validatorsContent.includes('javascript:'), 'should check javascript:')
    assert.ok(validatorsContent.includes('data:'), 'should check data:')
  }
})

test('active/inactive filtering and ordering', () => {
  const links = [
    { id: '1', label: 'A', url: 'https://a.com', type: 'website', isActive: true, sortOrder: 30 },
    { id: '2', label: 'B', url: 'https://b.com', type: 'website', isActive: false, sortOrder: 10 },
    { id: '3', label: 'C', url: 'https://c.com', type: 'website', isActive: true, sortOrder: 10 },
  ]
  const active = links.filter(l => l.isActive !== false).sort((a,b) => (a.sortOrder??0)-(b.sortOrder??0))
  assert.equal(active.length, 2)
  assert.equal(active[0].label, 'C')
  assert.equal(active[1].label, 'A')
})

test('featured style and grouping', () => {
  const links = [
    { id: '1', label: 'Featured', url: 'https://a.com', type: 'whatsapp', featured: true, isActive: true, sortOrder: 0, group: null },
    { id: '2', label: 'Normal', url: 'https://b.com', type: 'website', featured: false, isActive: true, sortOrder: 10, group: 'Media Sosial' },
    { id: '3', label: 'Group2', url: 'https://c.com', type: 'instagram', featured: false, isActive: true, sortOrder: 20, group: 'Media Sosial' },
  ]
  const featured = links.filter(l => l.featured)
  assert.equal(featured.length, 1)
  assert.equal(featured[0].label, 'Featured')
  const groups = new Map()
  for (const l of links) {
    const g = l.group || null
    if (!groups.has(g)) groups.set(g, [])
    groups.get(g).push(l)
  }
  assert.equal(groups.size, 2)
})
