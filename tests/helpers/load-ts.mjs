import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import ts from 'typescript'

const cache = new Map()
const root = resolve(import.meta.dirname, '../..')
async function moduleUrl(file) {
  if (cache.has(file)) return cache.get(file)
  let code = ts.transpileModule(await readFile(file, 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText
  for (const match of [...code.matchAll(/from\s+["']([.~][^"']+)["']/g)]) {
    const path = match[1].startsWith('~/') ? resolve(root, match[1].slice(2)) : resolve(dirname(file), match[1])
    code = code.replace(match[0], `from ${JSON.stringify(await moduleUrl(path + '.ts'))}`)
  }
  const url = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64')
  cache.set(file, url)
  return url
}
export async function loadTs(path) { return import(await moduleUrl(resolve(root, path))) }
