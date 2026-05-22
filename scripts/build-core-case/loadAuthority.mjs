/**
 * loadAuthority — Authority 모듈을 tsx loader로 import + parseCoreCaseAuthority 호출.
 *
 * Authority 모듈은 src/data/coreCases/{caseId}.case.ts에 위치하고 export 이름은
 * `{caseId}CaseAuthority` (camelCase) 또는 `caseAuthority`로 가정.
 *
 * 본 스크립트는 `npx tsx`로 실행되어야 함 (.ts import 지원).
 */

import path from 'node:path'
import url from 'node:url'

/**
 * @param {string} caseId  e.g. 'spouse-01'
 * @param {string} rootDir  repo root
 * @returns {Promise<{ authority: any, validation: { errors: any[], warns: any[] } }>}
 */
export async function loadAuthority(caseId, rootDir) {
  const authorityPath = path.join(rootDir, 'src/data/coreCases', `${caseId}.case.ts`)
  const fileUrl = url.pathToFileURL(authorityPath).href

  // dynamic import via tsx loader
  const mod = await import(fileUrl)

  // export 이름 후보: spouse01CaseAuthority, family01CaseAuthority, friend01CaseAuthority
  // camelCase 변환: 'spouse-01' → 'spouse01'
  const camelCaseId = caseId.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/-/g, '')
  const candidates = [`${camelCaseId}CaseAuthority`, 'caseAuthority', 'default']

  let authority = null
  for (const name of candidates) {
    if (mod[name]) {
      authority = mod[name]
      break
    }
  }
  if (!authority) {
    const exported = Object.keys(mod).join(', ')
    throw new Error(
      `Authority export not found in ${authorityPath}. Tried: ${candidates.join(', ')}. Available exports: ${exported}`,
    )
  }

  // parseCoreCaseAuthority + validateCoreCaseReferences load
  const schemaUrl = url.pathToFileURL(path.join(rootDir, 'src/types/coreCase.ts')).href
  const schemaMod = await import(schemaUrl)
  const { parseCoreCaseAuthority, validateCoreCaseReferences } = schemaMod

  const parsed = parseCoreCaseAuthority(authority)
  const issues = validateCoreCaseReferences(parsed)
  const errors = issues.filter((i) => i.severity === 'error')
  const warns = issues.filter((i) => i.severity === 'warn')
  if (errors.length) {
    const summary = errors.map((e) => `  [${e.area}] ${e.message}`).join('\n')
    throw new Error(`Authority cross-ref errors (${errors.length}):\n${summary}`)
  }
  return { authority: parsed, validation: { errors, warns } }
}
