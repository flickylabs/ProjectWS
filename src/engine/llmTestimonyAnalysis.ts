/**
 * 진술 분석 엔진.
 * 지금까지의 모든 대화를 LLM에 보내 구조화된 요약을 생성한다.
 * Phase 5 전용 기능.
 *
 * 프롬프트는 웹 어드민(promptManager)에서 관리한다.
 */
import { chatCompletion } from './llmClient'
import { getPrompt, getPromptConfig } from '../api/promptManager'
import { buildAgentPrompt, getAgentConfig, isAgentLoaded } from '../api/agentManager'
import type { CaseData } from '../types'

export interface TestimonyAnalysis {
  claimsA: string[]       // A의 핵심 주장
  claimsB: string[]       // B의 핵심 주장
  contradictions: string[] // 발견된 모순
  unknowns: string[]      // 미해명 사항
}

export async function analyzeTestimony(
  dialogueLog: { speaker: string; text: string }[],
  caseData: CaseData,
): Promise<TestimonyAnalysis> {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  const disputes = caseData.disputes.map(d => `${d.id}: ${d.name}`).join(', ')

  // 대화 히스토리 정리 (최근 30개, 시스템 제외)
  const speakerNames: Record<string, string> = {
    a: nameA, b: nameB, judge: '재판관', system: '시스템',
  }
  const history = dialogueLog
    .filter(d => d.speaker !== 'system')
    .slice(-30)
    .map(d => `${speakerNames[d.speaker] ?? d.speaker}: ${d.text}`)
    .join('\n')

  const taVars = { disputes, nameA, nameB, history }

  const prompt = isAgentLoaded()
    ? buildAgentPrompt('testimony_analysis', taVars)
    : getPrompt('testimony_analysis', taVars)

  const config = isAgentLoaded() ? getAgentConfig('testimony_analysis') : getPromptConfig('testimony_analysis')

  try {
    const response = await chatCompletion(
      [{ role: 'user', content: prompt }],
      { temperature: config.temperature, maxTokens: config.maxTokens },
    )

    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON')
    const parsed = JSON.parse(jsonMatch[0])

    return {
      claimsA: parsed.claimsA ?? [],
      claimsB: parsed.claimsB ?? [],
      contradictions: parsed.contradictions ?? [],
      unknowns: parsed.unknowns ?? [],
    }
  } catch {
    return {
      claimsA: ['분석 실패'],
      claimsB: ['분석 실패'],
      contradictions: [],
      unknowns: [],
    }
  }
}
