import test from 'node:test'
import assert from 'node:assert/strict'
import { loadTs } from './helpers/load-ts.mjs'

const presentation = await loadTs('shared/article-block-presentation.ts')

test('old article images retain safe full-width auto rendering', () => {
  assert.deepEqual(presentation.articleImageFigureStyle({}), { maxWidth: '100%' })
  assert.equal(presentation.articleImageRatioStyle({}), undefined)
  assert.deepEqual(presentation.articleImageObjectStyle({}), { height: 'auto' })
})
test('new display sizes and aspect ratios map without distortion', () => {
  assert.deepEqual(presentation.articleImageFigureStyle({ displaySize: 'small' }), { maxWidth: '480px' })
  assert.deepEqual(presentation.articleImageFigureStyle({ displaySize: 'wide' }), { maxWidth: '900px' })
  assert.deepEqual(presentation.articleImageRatioStyle({ aspectRatio: '4:5' }), { aspectRatio: '4 / 5' })
  assert.deepEqual(presentation.articleImageObjectStyle({ aspectRatio: '4:5' }), { height: '100%', objectFit: 'cover' })
})
