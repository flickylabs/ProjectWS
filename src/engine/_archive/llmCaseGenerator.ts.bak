// @ts-nocheck — 점진적 타입 정리 예정
/**
 * LLM 기반 동적 사건 생성기.
 * 로컬 LLM으로 DuoSeed + ContextSeed + CaseSeed를 자동 생성한다.
 */
import { chatCompletion } from './llmClient'
import type { CaseData } from '../types'
import { minjunSeoyeonCase } from '../data/cases/minjun-seoyeon'

const GENERATION_PROMPT = `당신은 "솔로몬"이라는 법정 심문 추리 게임의 사건 생성기입니다.
두 당사자가 서로를 비난하는 생활 밀착형 분쟁 사건을 만들어야 합니다.

다음 JSON 형식으로 사건을 생성하세요. 반드시 유효한 JSON만 출력하세요.

{
  "partyA": {
    "name": "이름",
    "age": 나이,
    "occupation": "직업",
    "archetype": "avoidant|confrontational|victim_cosplay|cold_logic",
    "speechStyle": "말투 설명",
    "pride": 1~10,
    "fear": "가장 두려운 것",
    "verbalTells": ["거짓말 버릇1", "거짓말 버릇2"]
  },
  "partyB": {
    "name": "이름",
    "age": 나이,
    "occupation": "직업",
    "archetype": "avoidant|confrontational|victim_cosplay|cold_logic",
    "speechStyle": "말투 설명",
    "pride": 1~10,
    "fear": "가장 두려운 것",
    "verbalTells": ["거짓말 버릇1", "거짓말 버릇2"]
  },
  "relationshipType": "spouse|neighbor|boss_employee|partnership|family",
  "context": "배경 상황 설명 (명절, 인사평가, 전세갱신 등 구체적 맥락)",
  "disputes": [
    {
      "name": "쟁점 이름",
      "truth": true/false,
      "truthDescription": "실제 진실 설명",
      "quadrant": "a_only|b_only|both_know|neither_knows|shared_misconception",
      "correctResponsibility": {"a": 0~100, "b": 0~100},
      "ambiguity": "none|low|high",
      "weight": "high|medium|low"
    }
  ],
  "evidence": [
    {
      "name": "증거 이름",
      "description": "증거 설명",
      "type": "bank|chat|cctv|contract|testimony|log|device|sns",
      "reliability": "hard|soft",
      "completeness": "original|edited|partial|context_missing",
      "legitimacy": "lawful|privacy_concern|unlawful",
      "proves": ["쟁점 이름"],
      "isTrap": true/false,
      "requires": ["선행 증거 이름 또는 빈 배열"]
    }
  ],
  "lieConfigA": [
    {
      "disputeName": "쟁점 이름",
      "lieType": "LT-1~LT-7",
      "lieIntensity": "L1~L4",
      "lieMotive": "self_protection|face_saving|shame_avoidance|relationship_maintenance|revenge|third_party_protection",
      "collapseViaTrust": true/false
    }
  ],
  "lieConfigB": [ 동일 구조 ],
  "solutions": {
    "카테고리명": ["해결책1", "해결책2", "해결책3"]
  }
}

규칙:
- 쟁점은 4~5개 만들어라.
- 증거는 5~6개 만들어라. 함정 증거(isTrap) 1개 이상.
- 반드시 "둘 다 모르는 사실"(neither_knows) 1개를 포함해라.
- 공유 오해(shared_misconception)도 가능하면 1개 넣어라.
- 한쪽만 100% 잘못인 사건이 아니라, 양쪽 다 잘못이 있어야 한다.
- 현실적이고 공감 가능한 생활 분쟁이어야 한다.
- 한국 문화와 맥락에 맞아야 한다.
- JSON만 출력하라. 다른 텍스트 없이.
`

interface GeneratedCase {
  partyA: { name: string; age: number; occupation: string; archetype: string; speechStyle: string; pride: number; fear: string; verbalTells: string[] }
  partyB: { name: string; age: number; occupation: string; archetype: string; speechStyle: string; pride: number; fear: string; verbalTells: string[] }
  relationshipType: string
  context: string
  disputes: { name: string; truth: boolean; truthDescription: string; quadrant: string; correctResponsibility: { a: number; b: number }; ambiguity: string; weight: string }[]
  evidence: { name: string; description: string; type: string; reliability: string; completeness: string; legitimacy: string; proves: string[]; isTrap: boolean; requires: string[] }[]
  lieConfigA: { disputeName: string; lieType: string; lieIntensity: string; lieMotive: string; collapseViaTrust: boolean }[]
  lieConfigB: { disputeName: string; lieType: string; lieIntensity: string; lieMotive: string; collapseViaTrust: boolean }[]
  solutions: Record<string, string[]>
}

/** LLM으로 새 사건을 생성한다. 실패 시 하드코딩 사건 반환. */
export async function generateCase(hint?: string): Promise<CaseData> {
  try {
    const userPrompt = hint
      ? `다음 조건으로 사건을 생성하세요: ${hint}\n\nJSON으로 출력:`
      : `새롭고 흥미로운 생활 분쟁 사건을 하나 만들어주세요. 관계 유형은 랜덤으로.\n\nJSON으로 출력:`

    const response = await chatCompletion(
      [
        { role: 'system', content: GENERATION_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      { temperature: 0.9, maxTokens: 2000 },
    )

    // JSON 파싱
    const jsonStr = extractJSON(response)
    const generated: GeneratedCase = JSON.parse(jsonStr)

    return convertToCaseData(generated)
  } catch (error) {
    console.error('사건 생성 실패, 기본 사건 사용:', error)
    return minjunSeoyeonCase
  }
}

function extractJSON(text: string): string {
  // ```json ... ``` 블록 추출
  const codeBlock = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (codeBlock) return codeBlock[1].trim()

  // 첫 { 부터 마지막 } 까지
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}')
  if (start !== -1 && end !== -1) return text.slice(start, end + 1)

  return text
}

function convertToCaseData(gen: GeneratedCase): CaseData {
  const caseId = `case-${Date.now()}`

  // dispute ID 매핑
  const disputeIdMap = new Map<string, string>()
  const disputes = gen.disputes.map((d, i) => {
    const id = `d-${i + 1}`
    disputeIdMap.set(d.name, id)
    return {
      id,
      name: d.name,
      truth: d.truth,
      truthDescription: d.truthDescription,
      quadrant: d.quadrant as CaseData['disputes'][number]['quadrant'],
      requiredEvidence: [] as string[],
      correctResponsibility: d.correctResponsibility,
      ambiguity: d.ambiguity as 'none' | 'low' | 'high',
      weight: d.weight as 'high' | 'medium' | 'low',
      mediationLink: d.name,
      legitimacyIssue: false,
    }
  })

  // evidence ID 매핑
  const evidenceIdMap = new Map<string, string>()
  const evidence = gen.evidence.map((e, i) => {
    const id = `e-${i + 1}`
    evidenceIdMap.set(e.name, id)
    return {
      id,
      name: e.name,
      description: e.description,
      type: e.type as CaseData['evidence'][number]['type'],
      reliability: e.reliability as 'hard' | 'soft',
      completeness: e.completeness as CaseData['evidence'][number]['completeness'],
      provenance: 'institutional' as const,
      legitimacy: e.legitimacy as CaseData['evidence'][number]['legitimacy'],
      proves: e.proves.map((p) => disputeIdMap.get(p) ?? p),
      isTrap: e.isTrap,
      requires: e.requires.map((r) => evidenceIdMap.get(r) ?? r).filter((r) => r !== ''),
      investigationResults: {
        request_original: '원본 자료입니다.',
        check_metadata: '메타데이터를 확인했습니다.',
        verify_source: '출처를 확인했습니다.',
      } as Record<string, string>,
    }
  })

  // dispute의 requiredEvidence 연결
  for (const ev of evidence) {
    for (const dId of ev.proves) {
      const dispute = disputes.find((d) => d.id === dId)
      if (dispute) dispute.requiredEvidence.push(ev.id)
    }
  }

  const makeLieConfigs = (configs: GeneratedCase['lieConfigA'], party: 'a' | 'b') =>
    configs.map((c) => {
      const dId = disputeIdMap.get(c.disputeName) ?? 'd-1'
      return {
        disputeId: dId,
        lieType: c.lieType as CaseData['lieConfigA'][number]['lieType'],
        lieIntensity: c.lieIntensity as CaseData['lieConfigA'][number]['lieIntensity'],
        lieMotive: c.lieMotive as CaseData['lieConfigA'][number]['lieMotive'],
        initialState: 'S0' as const,
        collapseViaTrust: c.collapseViaTrust,
        transitions: [
          { from: 'S0', to: 'S1', trigger: 'soft_evidence_or_timeline_question' },
          { from: 'S1', to: 'S2', trigger: 'hard_evidence_or_direct_question' },
          { from: 'S2', to: 'S3', trigger: 'responsibility_question' },
          { from: 'S3', to: 'S4', trigger: 'direct_confrontation_or_evidence' },
          { from: 'S4', to: 'S5', trigger: 'trust_threshold_or_hard_pressure' },
        ],
      }
    })

  const truthTable = disputes.map((d, i) => ({
    id: `t-${i + 1}`,
    fact: d.truthDescription,
    isTrue: d.truth,
    weight: d.weight === 'high' ? 10 : d.weight === 'medium' ? 7 : 4,
    quadrant: d.quadrant,
  }))

  return {
    caseId,
    duo: {
      duoId: `duo-${caseId}`,
      relationshipType: gen.relationshipType as CaseData['duo']['relationshipType'],
      partyA: {
        id: 'a',
        name: gen.partyA.name,
        age: gen.partyA.age,
        occupation: gen.partyA.occupation,
        incomeBracket: 'mid',
        archetype: gen.partyA.archetype as CaseData['duo']['partyA']['archetype'],
        speechStyle: gen.partyA.speechStyle,
        pride: gen.partyA.pride,
        fear: gen.partyA.fear,
        riskAppetite: 5,
        digitalHabit: 'messenger_main',
        dailyRoutine: '',
        sensitivePoints: [],
        verbalTells: gen.partyA.verbalTells.map((t, i) => ({
          type: `tell-${i}`,
          trigger: 'lying' as const,
          pattern: t,
        })),
      },
      partyB: {
        id: 'b',
        name: gen.partyB.name,
        age: gen.partyB.age,
        occupation: gen.partyB.occupation,
        incomeBracket: 'mid',
        archetype: gen.partyB.archetype as CaseData['duo']['partyB']['archetype'],
        speechStyle: gen.partyB.speechStyle,
        pride: gen.partyB.pride,
        fear: gen.partyB.fear,
        riskAppetite: 5,
        digitalHabit: 'sns_active',
        dailyRoutine: '',
        sensitivePoints: [],
        verbalTells: gen.partyB.verbalTells.map((t, i) => ({
          type: `tell-${i}`,
          trigger: 'lying' as const,
          pattern: t,
        })),
      },
      relationshipLedger: [],
      socialGraph: [],
    },
    context: {
      contextType: 'generated',
      description: gen.context,
      emotionalPressure: 7,
      affects: 'both',
      triggerAmplifier: '',
    },
    disputes,
    evidence,
    evidenceCombinations: [],
    truthTable,
    lieConfigA: makeLieConfigs(gen.lieConfigA, 'a'),
    lieConfigB: makeLieConfigs(gen.lieConfigB, 'b'),
    solutions: gen.solutions,
    activeLedgerEntries: [],
    activeThirdParties: [],
  }
}
