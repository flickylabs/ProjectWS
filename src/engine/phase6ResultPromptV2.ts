/**
 * Phase 6 / Result 프롬프트 빌더 (V2)
 * ─────────────────────────────────
 * Phase3StructuredLog 기반으로 Phase 6(중재)과 Result(후일담) 프롬프트를 생성.
 * GPT-A 설계 문서(phase6-result-prompt-v2-design.md) 기반 구현.
 */

import type { Phase3PromptBridgeV2 } from './phase3LogCollector'
import { getStructureV2 } from './v2DataLoader'
import { buildPhase3PromptBridge, deriveToneProfile, getPhase3StructuredLog } from './phase3LogCollector'
import type { ResolvedRevealedFact } from './phase3LogCollector'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 브릿지 빌드 헬퍼 — store/caseData에서 자동 수집
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface CaseMeta {
  caseId: string
  nameA: string
  nameB: string
  relLabel: string
  contextDesc: string
}

/**
 * store에서 bridge 빌드에 필요한 인덱스를 자동 구성.
 * V2 structure가 없으면 null 반환 — 호출부에서 fallback 처리.
 */
export function buildBridgeFromStore(
  caseId: string,
  agentA: { emotion: number },
  agentB: { emotion: number },
  dialogueLog: Array<{ speaker: string; text: string }>,
  disputes: Array<{ id: string; name: string; description?: string }>,
): Phase3PromptBridgeV2 | null {
  const structure = getStructureV2(caseId)
  if (!structure) return null

  // atomIndex: structure의 dispute에서 revealAtomIds 기반으로 구축
  const atomIndex: Record<string, { factText: string; disputeId?: string; source: ResolvedRevealedFact['source'] }> = {}
  for (const dispute of structure.disputes) {
    if (dispute.depthLayers) {
      for (const layer of dispute.depthLayers) {
        if (layer.revealAtomIds) {
          for (const atomId of layer.revealAtomIds) {
            atomIndex[atomId] = {
              factText: `${dispute.name ?? dispute.id} — ${layer.label} 층 사실`,
              disputeId: dispute.id,
              source: 'v2_atom',
            }
          }
        }
      }
    }
  }

  // disputeIndex
  const disputeIndex: Record<string, { label: string; summaries: string[]; clarifyOutcomeLabel?: string }> = {}
  for (const d of structure.disputes) {
    const baseDispute = disputes.find(bd => bd.id === d.id)
    disputeIndex[d.id] = {
      label: baseDispute?.name ?? d.id,
      summaries: d.depthLayers?.map(l => l.summary) ?? [baseDispute?.description ?? ''],
      clarifyOutcomeLabel: d.misconception?.clarifyOutcomeLabel,
    }
  }

  // linkIndex
  const linkIndex: Record<string, { summary: string }> = {}
  for (const d of structure.disputes) {
    if (d.linkEdges) {
      for (const link of d.linkEdges) {
        linkIndex[link.id] = { summary: link.uiLabel ?? `${link.fromDisputeId} → ${link.toDisputeId} (${link.type})` }
      }
    }
  }

  // finalEmotions
  const meterPhase = (val: number) =>
    val < 25 ? '안정' : val < 50 ? '흔들림' : val < 80 ? '위험' : '폭발직전'

  const finalEmotions = {
    a: { phase: meterPhase(agentA.emotion), value: agentA.emotion },
    b: { phase: meterPhase(agentB.emotion), value: agentB.emotion },
  }

  // lastLinesByParty
  const lastA = [...dialogueLog].reverse().find(d => d.speaker === 'a')
  const lastB = [...dialogueLog].reverse().find(d => d.speaker === 'b')
  const lastLinesByParty = {
    a: lastA?.text,
    b: lastB?.text,
  }

  return buildPhase3PromptBridge(
    caseId,
    atomIndex,
    finalEmotions,
    lastLinesByParty,
    disputeIndex,
    linkIndex,
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Phase 6 프롬프트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function buildPhase6SystemPrompt(): string {
  return `당신은 Solomon의 조정 단계 AI다.
당신의 역할은 양측이 Phase 3 심문에서 실제로 드러낸 사실과 아직 다투는 지점을 분리하고,
지나친 상상 없이 조정안을 작성하는 것이다.

중요 규칙:
1. 입력에 없는 사실을 만들지 마라.
2. disprovedFakeIssues에 포함된 쟁점은 더 이상 '현재 분쟁 사실'로 서술하지 마라.
3. relationCoreRevealed가 false이면 과도한 심리 분석을 하지 마라.
4. playerStyleTags는 조정안의 말투/구성에만 반영하고, 사실 판단 근거로 사용하지 마라.
5. 양측 중 누구의 주장도 절대적으로 단정하지 말고, 입력에 따라 '합의된 사실'과 '남은 쟁점'을 분리하라.
6. 말투는 차분하고 단정하게 유지하되, 플레이어 스타일에 따라 직설도와 공감 비율을 조절하라.`
}

export function buildPhase6UserPrompt(bridge: Phase3PromptBridgeV2, caseMeta: CaseMeta): string {
  return `[CASE]
${JSON.stringify(caseMeta)}

[PHASE3_STRUCTURED_LOG]
${JSON.stringify(bridge.structuredLog)}

[REVEALED_FACTS]
${JSON.stringify(bridge.resolvedRevealedFacts)}

[CONTESTED_ISSUES]
${JSON.stringify(bridge.contestedIssues)}

[DISPROVED_FAKE_ISSUES]
${JSON.stringify(bridge.disprovedFakeIssueDetails)}

[RESOLVED_LINKS]
${JSON.stringify(bridge.resolvedLinkDetails)}

[FINAL_EMOTIONS]
${JSON.stringify(bridge.finalEmotions)}

[LAST_LINES]
${JSON.stringify(bridge.lastLinesByParty)}

[KEY_MOMENTS]
${JSON.stringify(bridge.keyMoments)}

다음 형식의 JSON으로 답하라.

{
  "agreedFacts": ["..."],
  "stillContested": ["..."],
  "fakeIssuesCleared": ["..."],
  "mediationSummary": "...",
  "proposalToA": "...",
  "proposalToB": "...",
  "jointNextStep": "...",
  "toneProfile": "${bridge.toneProfile}"
}

추가 지시:
- relationCoreRevealed가 ${bridge.structuredLog.relationCoreRevealed}이므로 ${bridge.structuredLog.relationCoreRevealed ? 'mediationSummary와 jointNextStep에 관계 핵심을 1회 반영하라' : '사실 정리 + 절차적 제안 위주로 써라'}.
- disprovedFakeIssues는 fakeIssuesCleared에만 넣고 stillContested에는 넣지 마라.
- finalEmotions가 높게 남아 있으면 proposalToA / proposalToB에 먼저 진정 문장을 한 번 넣어라.`
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Result 프롬프트
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export function buildResultSystemPrompt(): string {
  return `당신은 Solomon의 결과/후일담 서술자다.
판결 결과와 Phase 3에서 실제로 드러난 구조화 로그를 바탕으로,
즉시 반응과 짧은 후일담을 일관된 톤으로 작성한다.

규칙:
1. 드러나지 않은 사실을 새로 만들지 마라.
2. disprovedFakeIssues는 오해가 풀린 사건으로만 다뤄라.
3. relationCoreRevealed가 false이면 깊은 화해/완전한 단절을 과장하지 마라.
4. finalEmotions와 lastLinesByParty를 참고해 즉시 반응의 말투를 이어가라.
5. keyMoments 중 가장 강한 장면 1~2개를 암시적으로 반영하되, 긴 인용은 하지 마라.`
}

export interface VerdictData {
  factFindings: Record<string, string>
  responsibility: Record<string, { a: number; b: number }>
  selectedSolutions: string[]
  total: number
  endingTone: string
}

export function buildResultUserPrompt(
  bridge: Phase3PromptBridgeV2,
  caseMeta: CaseMeta,
  verdict: VerdictData,
): string {
  return `[CASE]
${JSON.stringify(caseMeta)}

[VERDICT]
${JSON.stringify(verdict)}

[PHASE3_STRUCTURED_LOG]
${JSON.stringify(bridge.structuredLog)}

[REVEALED_FACTS]
${JSON.stringify(bridge.resolvedRevealedFacts)}

[DISPROVED_FAKE_ISSUES]
${JSON.stringify(bridge.disprovedFakeIssueDetails)}

[RESOLVED_LINKS]
${JSON.stringify(bridge.resolvedLinkDetails)}

[FINAL_EMOTIONS]
${JSON.stringify(bridge.finalEmotions)}

[LAST_LINES]
${JSON.stringify(bridge.lastLinesByParty)}

[KEY_MOMENTS]
${JSON.stringify(bridge.keyMoments)}

다음 형식의 JSON으로 답하라.

{
  "verdictSummary": "...",
  "immediateAftermath": "...",
  "aReaction": "...",
  "bReaction": "...",
  "shortEpilogue": "...",
  "relationshipOutlook": "fragile | unresolved | cautiously_repairing | stabilized"
}

추가 지시:
- relationCoreRevealed가 ${bridge.structuredLog.relationCoreRevealed ? 'true이고 fake issue가 해소되었다면, shortEpilogue에 "오해는 풀렸지만 방식의 상처가 남는다" 또는 그 반대의 구조를 반영하라' : 'false이므로 relationshipOutlook을 지나치게 낙관/비관하지 말고 fragile 또는 unresolved 쪽으로 보수적으로 선택하라'}.
- finalEmotions 값이 70 이상인 당사자는 immediateAftermath에서 짧고 딱딱한 반응을 우선한다.`
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 후일담 텍스트 변환 (JSON → 서술형)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface ResultV2Response {
  verdictSummary: string
  immediateAftermath: string
  aReaction: string
  bReaction: string
  shortEpilogue: string
  relationshipOutlook: string
}

export function formatResultAsNarrative(res: ResultV2Response): string {
  const parts: string[] = []
  if (res.immediateAftermath) parts.push(res.immediateAftermath)
  if (res.shortEpilogue) parts.push(res.shortEpilogue)
  return parts.join('\n\n')
}
