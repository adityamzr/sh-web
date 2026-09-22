import type { MediaArticleBlock } from '~/composables/useMediaArticles'

export type RichTextMark =
  | { type: 'bold' }
  | { type: 'italic' }
  | { type: 'link'; attrs: { href: string } }

export type RichTextNode = {
  type: 'doc' | 'paragraph' | 'text' | 'heading' | 'bulletList' | 'orderedList' | 'listItem' | 'blockquote' | 'hardBreak'
  text?: string
  attrs?: { level?: 2 | 3 }
  marks?: RichTextMark[]
  content?: RichTextNode[]
}

export type RichTextDocument = RichTextNode & { type: 'doc'; content: RichTextNode[] }

const ALLOWED_NODES = new Set(['doc', 'paragraph', 'text', 'heading', 'bulletList', 'orderedList', 'listItem', 'blockquote', 'hardBreak'])
const MAX_DEPTH = 8

export function sanitizeRichTextLink(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const href = value.trim()
  if (!href || /[\u0000-\u001F\u007F]/.test(href)) return null
  if (href.startsWith('/') && !href.startsWith('//')) return href
  if (href.startsWith('#')) return href
  try {
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(new URL(href).protocol) ? href : null
  } catch {
    return null
  }
}

function normalizeMarks(value: unknown): RichTextMark[] | undefined {
  if (!Array.isArray(value)) return undefined
  const marks: RichTextMark[] = []
  for (const mark of value) {
    if (!mark || typeof mark !== 'object') continue
    const type = (mark as any).type
    if ((type === 'bold' || type === 'italic') && !marks.some(item => item.type === type)) marks.push({ type })
    if (type === 'link') {
      const href = sanitizeRichTextLink((mark as any).attrs?.href)
      if (href && !marks.some(item => item.type === 'link')) marks.push({ type: 'link', attrs: { href } })
    }
  }
  return marks.length ? marks : undefined
}

function normalizeNode(value: unknown, depth = 0): RichTextNode | null {
  if (!value || typeof value !== 'object' || depth > MAX_DEPTH) return null
  const source = value as Record<string, unknown>
  const type = typeof source.type === 'string' ? source.type : ''
  if (!ALLOWED_NODES.has(type)) return null
  if (type === 'text') return { type, text: typeof source.text === 'string' ? source.text : '', marks: normalizeMarks(source.marks) }
  if (type === 'hardBreak') return { type }
  const content = Array.isArray(source.content)
    ? source.content.map(child => normalizeNode(child, depth + 1)).filter((child): child is RichTextNode => Boolean(child))
    : []
  if (type === 'heading') return { type, attrs: { level: (source.attrs as any)?.level === 3 ? 3 : 2 }, content }
  return { type: type as RichTextNode['type'], content }
}

export function normalizeRichTextDocument(value: unknown): RichTextDocument {
  const node = normalizeNode(value)
  return node?.type === 'doc'
    ? { type: 'doc', content: node.content ?? [] }
    : { type: 'doc', content: [] }
}

export function extractRichTextDocumentText(value: unknown): string {
  const output: string[] = []
  const visit = (node: RichTextNode) => {
    if (node.type === 'text') output.push(node.text ?? '')
    else if (node.type === 'hardBreak') output.push('\n')
    else {
      node.content?.forEach(visit)
      if (['paragraph', 'heading', 'listItem', 'blockquote'].includes(node.type)) output.push('\n')
    }
  }
  normalizeRichTextDocument(value).content.forEach(visit)
  return output.join('').replace(/\n{2,}/g, '\n').trim()
}

export function extractMediaBodyText(blocks: MediaArticleBlock[]): string {
  return (blocks ?? []).flatMap(block => {
    if (block.type === 'richText') return extractRichTextDocumentText(block.content)
    if (block.type === 'list') return block.items ?? []
    if (block.type === 'table') return [block.caption ?? '', ...(block.headers ?? []), ...(block.rows ?? []).flat()]
    return [block.text ?? '', block.caption ?? '', block.alt ?? '']
  }).filter(Boolean).join('\n').trim()
}
