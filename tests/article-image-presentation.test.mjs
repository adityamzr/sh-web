import test from 'node:test'
import assert from 'node:assert/strict'
import { loadTs } from './helpers/load-ts.mjs'

const presentation = await loadTs('shared/article-block-presentation.ts')

test('old article images retain safe full-width auto rendering', () => {
  assert.equal(presentation.articleImageFigureClass({}), 'max-w-none')
  assert.equal(presentation.articleImageRatioClass({}), '')
  assert.equal(presentation.articleImageObjectClass({}), 'h-auto')
})
test('new display sizes and aspect ratios map without distortion', () => {
  assert.equal(presentation.articleImageFigureClass({ displaySize: 'small' }), 'max-w-[480px]')
  assert.equal(presentation.articleImageFigureClass({ displaySize: 'wide' }), 'max-w-[900px]')
  assert.equal(presentation.articleImageRatioClass({ aspectRatio: '4:5' }), 'aspect-[4/5]')
  assert.equal(presentation.articleImageObjectClass({ aspectRatio: '4:5' }), 'h-full object-cover')
})
