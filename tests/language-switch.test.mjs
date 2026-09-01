import test from 'node:test'
import assert from 'node:assert/strict'
import { computed, reactive, ref, watch, nextTick, effectScope } from 'vue'
import { loadTs } from './helpers/load-ts.mjs'
const { useLanguageSwitch } = await loadTs('composables/useLocale.ts')

function setup(t, path, content = null, hash = '') {
  const route = reactive({ path, fullPath: path + hash, hash }), state = ref(content), mounted = [], scope = effectScope()
  Object.assign(globalThis, { computed, ref, watch, useRoute: () => route, useState: () => state, onMounted: handler => mounted.push(handler) })
  t.after(() => { scope.stop(); for (const key of ['computed', 'ref', 'watch', 'useRoute', 'useState', 'onMounted']) delete globalThis[key] })
  return { route, state, mounted, links: scope.run(() => useLanguageSwitch()) }
}
test('switcher uses localized article slug on both locales', t => {
  const { route, state, links } = setup(t, '/artikel/kereta', { key: '/artikel/kereta', paths: { id: '/artikel/kereta', en: '/en/artikel/train' } })
  assert.equal(links.href.value, '/en/artikel/train')
  route.path = '/en/artikel/train'; state.value.key = route.path
  assert.equal(links.href.value, '/artikel/kereta')
  assert.equal(links.target.value, 'id')
})
test('switcher unavailable translation goes to explicit fallback, never a guessed article slug', t => {
  const { links } = setup(t, '/artikel/hanya-id', { key: '/artikel/hanya-id', paths: { id: '/artikel/hanya-id' }, fallback: { en: '/en/hari-ini?translation=unavailable' } })
  assert.equal(links.unavailable.value, true)
  assert.equal(links.href.value, '/en/hari-ini?translation=unavailable')
})
test('switcher ignores stale content metadata after client navigation and retains query', t => {
  const { route, links } = setup(t, '/en/visual', { key: '/en/artikel/train', paths: { id: '/artikel/kereta' } })
  route.fullPath = '/en/visual?city=makkah'
  assert.equal(links.href.value, '/visual?city=makkah')
  assert.equal(links.unavailable.value, false)
})
test('hash is applied only after hydration and follows later navigation', async t => {
  const { route, mounted, links } = setup(t, '/makkah', null, '#makkah-explorer')
  assert.equal(links.href.value, '/en/makkah')
  mounted.forEach(handler => handler())
  assert.equal(links.href.value, '/en/makkah#makkah-explorer')
  route.hash = '#another'; await nextTick()
  assert.equal(links.href.value, '/en/makkah#another')
})
