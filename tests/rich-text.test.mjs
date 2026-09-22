import test from 'node:test'
import assert from 'node:assert/strict'
import { loadTs } from './helpers/load-ts.mjs'

const richText = await loadTs('shared/rich-text.ts')

test('rich-text normalization keeps only the public allowlist', () => {
  const document = richText.normalizeRichTextDocument({ type: 'doc', attrs: { onclick: 'alert(1)' }, content: [
    { type: 'script', content: [{ type: 'text', text: 'hidden' }] },
    { type: 'heading', attrs: { level: 1, style: 'color:red' }, content: [{ type: 'text', text: 'Safe heading', marks: [{ type: 'bold' }, { type: 'underline' }] }] },
  ] })
  assert.deepEqual(document, { type: 'doc', content: [{ type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Safe heading', marks: [{ type: 'bold' }] }] }] })
})

test('rich-text links allow editorial protocols and reject executable URLs', () => {
  for (const href of ['/panduan', '#section', 'https://example.com', 'mailto:editor@example.com', 'tel:+62123']) assert.equal(richText.sanitizeRichTextLink(href), href)
  for (const href of ['javascript:alert(1)', 'data:text/html,test', '//example.com']) assert.equal(richText.sanitizeRichTextLink(href), null)
})

test('reading text includes rich-text content', () => {
  const body = [{ type: 'richText', content: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] }, { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] }] } }]
  assert.equal(richText.extractMediaBodyText(body), 'First paragraph\nSecond paragraph')
})
