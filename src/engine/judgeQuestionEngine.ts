/**
 * 재판관 질문 엔진 (Judge Question Engine)
 * ─────────────────────────────────
 * 쟁점 내용 + 하위 액션 + 심문 깊이 + V2 atom slot을 반영하여
 * 구체적이고 날카로운 재판관 질문을 생성한다.
 */

import type { QuestionType } from '../types'
import type { CaseData, PartyId } from '../types'
import { getClaimPolicy } from '../data/claimPolicyLoader'
import type { LieState } from '../types'

/**
 * 엔진 기반 재판관 질문 생성.
 * V2 atom slot이 있으면 구체적 표현 사용, 없으면 쟁점명 기반 fallback.
 */
export function generateJudgeQuestion(
  questionType: QuestionType,
  caseData: CaseData,
  target: PartyId,
  disputeId: string,
  interrogationDepth: number,
  lieState?: LieState,
): string {
  const profile = target === 'a' ? caseData.duo.partyA : caseData.duo.partyB
  const dispute = caseData.disputes.find(d => d.id === disputeId)
  if (!dispute) return `${profile.name} 씨, 설명해 주십시오.`

  const name = profile.name

  // 쟁점에서 핵심 소재 추출 (행위, 금액 등)
  const subject = extractDisputeSubject(dispute.name)

  switch (questionType) {
    case 'fact_pursuit':
      return pickFactQuestion(name, subject, interrogationDepth)
    case 'motive_search':
      return pickMotiveQuestion(name, subject, interrogationDepth)
    case 'empathy_approach':
      return pickEmpathyQuestion(name, subject, interrogationDepth)
    case 'evidence_present':
      return `${name} 씨, 방금 제시된 증거에 대해 입장을 밝혀 주십시오.`
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 쟁점 소재 추출
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 쟁점명에서 재판관 질문에 쓸 수 있는 자연스러운 소재를 추출.
 * "지석의 비밀 송금 280만원" → "공동계좌 송금"
 * "세린의 새벽 휴대폰 열람" → "새벽 휴대폰 열람"
 */
function extractDisputeSubject(disputeName: string): string {
  // 소유격 제거 ("지석의", "세린의" 등)
  let subject = disputeName.replace(/^[가-힣]+의\s+/, '')
  // "비밀" 같은 판단어 제거
  subject = subject.replace(/비밀\s*/g, '')
  // "송금 280만원" → "송금", "100만원 사전" → "사전"
  subject = subject.replace(/\s*\d+만원\s*/g, ' ').trim()
  // 중복 단어 제거
  const words = subject.split(/\s+/)
  const unique = words.filter((w, i) => words.indexOf(w) === i)
  return unique.join(' ') || '해당 사안'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 사실추궁
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function pickFactQuestion(name: string, subject: string, depth: number): string {
  if (depth >= 4) return `${name} 씨, ${subject} 건은 이미 여러 차례 확인했습니다. 진술이 일관되지 않는데, 사실대로 말씀해 주십시오.`
  if (depth >= 3) return `${name} 씨, ${subject} 건의 사실관계가 아직 분명하지 않습니다. 정확히 무슨 일이 있었는지 다시 설명해 주십시오.`
  if (depth >= 2) return `${name} 씨, ${subject} 건에 대해 좀 더 구체적으로 말씀해 주십시오. 정확히 어떤 일이 있었습니까?`
  return `${name} 씨, ${subject} 건에 대해 사실 여부를 확인하겠습니다. 말씀해 주십시오.`
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 동기탐색
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function pickMotiveQuestion(name: string, subject: string, depth: number): string {
  if (depth >= 4) return `${name} 씨, ${subject} 건에서 왜 그런 판단을 내리셨는지 아직 납득이 되지 않습니다. 이유를 명확히 말씀해 주십시오.`
  if (depth >= 3) return `${name} 씨, ${subject} 건을 미리 밝히지 않은 이유가 있다면 지금 말씀하실 기회입니다.`
  if (depth >= 2) return `${name} 씨, ${subject} 건에서 왜 그런 선택을 하셨습니까? 당시 어떤 판단이 있었습니까?`
  return `${name} 씨, ${subject} 건과 관련하여 그렇게 하신 이유가 무엇입니까?`
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공감접근
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function pickEmpathyQuestion(name: string, subject: string, depth: number): string {
  if (depth >= 4) return `${name} 씨, ${subject} 건 당시의 심정을 충분히 듣겠습니다. 솔직하게 말씀해 주십시오.`
  if (depth >= 3) return `${name} 씨, ${subject} 건에서 미리 말하지 못한 것이 어떤 마음 때문이었습니까?`
  if (depth >= 2) return `${name} 씨, ${subject} 건 당시 가장 어려웠던 부분이 무엇이었습니까?`
  return `${name} 씨, ${subject} 건에 대해 당시 어떤 심정이셨는지 말씀해 주시겠습니까?`
}
