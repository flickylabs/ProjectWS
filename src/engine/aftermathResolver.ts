import type { CaseData, VerdictInput } from '../types'
import { getScriptedAftermath } from './scriptedTextLoader'
import { normalizeCaseKey } from '../utils/caseHelpers'

function extractSolutionCategories(selectedSolutions: string[]): string[] {
  return selectedSolutions.map((entry) => entry.split('::')[0]).filter(Boolean)
}

function hasKeyword(values: string[], keywords: string[]): boolean {
  return values.some((value) => keywords.some((keyword) => value.includes(keyword)))
}

function averageResponsibility(caseData: CaseData, verdictInput: VerdictInput): { a: number; b: number } | null {
  let totalA = 0
  let totalB = 0
  let count = 0

  for (const dispute of caseData.disputes) {
    const result = verdictInput.responsibility[dispute.id]
    if (!result) continue
    totalA += result.a
    totalB += result.b
    count += 1
  }

  if (count === 0) return null
  return { a: totalA / count, b: totalB / count }
}

function buildAftermathCandidates(caseData: CaseData, verdictInput: VerdictInput): string[] {
  const categories = extractSolutionCategories(verdictInput.selectedSolutions)
  const average = averageResponsibility(caseData, verdictInput)
  const candidates: string[] = []

  const protective = hasKeyword(categories, ['보호', '비공개', '개인정보', '공개범위', '접근금지'])
  const rebuild = hasKeyword(categories, ['복구', '합의', '공개정정', '영업개선', '권한분리', '관계', '평판'])
  const procedural = hasKeyword(categories, ['절차', '정정', '책임', '공개범위', '권한분리', '보험']) ||
    Object.values(verdictInput.evidenceLegality || {}).some((allowed) => allowed === false)

  if (protective) candidates.push('protective_resolution')

  if (average) {
    const gap = Math.abs(average.a - average.b)
    if (gap <= 15) {
      if (rebuild) candidates.push('trust_rebuild')
      candidates.push('shared_fault')
    } else if (average.a > average.b) {
      candidates.push('a_primary_fault')
    } else {
      candidates.push('b_primary_fault')
    }
  }

  if (rebuild) candidates.push('trust_rebuild')
  if (procedural) candidates.push('procedural_caution')

  candidates.push('shared_fault', 'a_primary_fault', 'b_primary_fault', 'procedural_caution')
  return [...new Set(candidates)]
}

export function resolveScriptedAftermath(caseData: CaseData, verdictInput: VerdictInput): { resultClass: string; text: string } | null {
  const caseKey = normalizeCaseKey(caseData)
  const candidates = buildAftermathCandidates(caseData, verdictInput)

  for (const resultClass of candidates) {
    const scripted = getScriptedAftermath(caseKey, resultClass)
    if (scripted) {
      return { resultClass, text: scripted.text }
    }
  }

  return null
}
