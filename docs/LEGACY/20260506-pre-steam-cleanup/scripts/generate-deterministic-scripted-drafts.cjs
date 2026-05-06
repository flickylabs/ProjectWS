#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CASE_DIR = path.join(ROOT, 'src', 'data', 'cases', 'generated')
const OUT_DIR = path.join(ROOT, 'docs', 'ref', 'scripted-text', 'deterministic-drafts')

const RESULT_CLASSES = [
  'a_primary_fault',
  'b_primary_fault',
  'shared_fault',
  'trust_rebuild',
  'procedural_caution',
]

const SYSTEM_KEYS = [
  { context: 'interrogation', eventType: 'repeat_warning' },
  { context: 'evidence', eventType: 'new_unlock' },
  { context: 'evidence', eventType: 'trap_notice' },
  { context: 'dossier', eventType: 'challenge_cleared' },
  { context: 'witness', eventType: 'credibility_shift' },
  { context: 'verdict', eventType: 'profile_update' },
]

function loadJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function cleanSentence(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function firstSolutionLabel(caseData) {
  const labels = Object.keys(caseData.solutions || {})
  return labels[0] || '재발 방지 합의'
}

function secondSolutionLabel(caseData) {
  const labels = Object.keys(caseData.solutions || {})
  return labels[1] || labels[0] || '관계 회복 장치'
}

function buildWitnessEntries(caseData) {
  const people = caseData.duo?.socialGraph || []
  return people.flatMap((person) => {
    const baseName = cleanSentence(person.name)
    const relation = cleanSentence(person.relationTo)
    const directness = person.witnessedDirectly ? '?? ? ??? ??? ?? ??? ?? ? ?? ????.' : '?? ? ???? ?? ?? ??? ? ?? ????.'
    const bias = person.bias === 'neutral' ? '?? ?? ?? ?? ??? ??? ????.' : `${cleanSentence(person.bias)} ??? ?? ? ??? ?? ?? ?????.`

    return [
      {
        key: `${person.id}|vague`,
        witnessId: person.id,
        depth: 'vague',
        stanceHint: 'answer',
        truthLevel: 'hint',
        variants: [
          {
            id: `${person.id}|vague#1`,
            text: `${baseName}? ?? ?? ??? ??? ?? ??? ?????. ${directness}` ,
            behaviorHint: '???? ??? ????? ????.',
          },
          {
            id: `${person.id}|vague#2`,
            text: `${baseName}? ??? ??? ??? ????? ?? ????. ${bias}`,
            behaviorHint: '??? ??? ??? ???? ???.',
          },
          {
            id: `${person.id}|vague#3`,
            text: `${baseName}? ?? ???? ?? ??? ? ???? ?????. ??? ?? ??? ???? ????.`,
            behaviorHint: '??? ??? ??? ????.',
          },
        ],
      },
      {
        key: `${person.id}|partial`,
        witnessId: person.id,
        depth: 'partial',
        stanceHint: 'answer',
        truthLevel: 'partial',
        variants: [
          {
            id: `${person.id}|partial#1`,
            text: `${baseName}? ??? ??? ??? ??? ????? ?? ????. ?? ??? ?? ?? ? ?? ???? ??? ??? ?????? ????.`,
            behaviorHint: '? ??? ?? ?? ??? ?? ?????.',
          },
          {
            id: `${person.id}|partial#2`,
            text: `${baseName}? ??? ????? ? ??? ???? ???? ????. ??? ???? ?? ??? ?? ????? ?????.`,
            behaviorHint: '?? ??? ?? ??? ??? ?? ???.',
          },
          {
            id: `${person.id}|partial#3`,
            text: `${baseName}? ??? ?????? ?????? ????. ?? ?? ?? ??? ???? ???? ??? ?????.`,
            behaviorHint: '?? ??? ??? ??? ?????.',
          },
        ],
      },
      {
        key: `${person.id}|full`,
        witnessId: person.id,
        depth: 'full',
        stanceHint: 'answer',
        truthLevel: 'full',
        variants: [
          {
            id: `${person.id}|full#1`,
            text: `${baseName}? ${relation} ???? ??? ??? ?3????. ?? ??? ??? ??? ??? ????? ??? ?????.`,
            behaviorHint: '?? ?? ??? ??? ?? ??? ?????.',
          },
          {
            id: `${person.id}|full#2`,
            text: `${baseName}? ??? ?? ??? ??? ????. ?? ??? ???? ?? ??? ??? ?? ?? ?????.`,
            behaviorHint: '??? ??? ???? ? ??? ?????.',
          },
          {
            id: `${person.id}|full#3`,
            text: `${baseName}? ?? ???? ?? ??? ??? ???? ????? ???. ?? ?? ???? ??? ??? ??? ???? ????? ???.`,
            behaviorHint: '??? ??? ?? ???? ?????.',
          },
        ],
      },
    ]
  })
}
function buildAftermathEntries(caseData) {
  const aName = cleanSentence(caseData.duo?.partyA?.name || 'A')
  const bName = cleanSentence(caseData.duo?.partyB?.name || 'B')
  const solutionA = firstSolutionLabel(caseData)
  const solutionB = secondSolutionLabel(caseData)

  return [
    {
      key: 'a_primary_fault',
      resultClass: 'a_primary_fault',
      variants: [
        {
          id: 'a_primary_fault#1',
          text: `${aName} 쪽 책임이 더 크게 남습니다. 다만 이번 판단은 비난에서 끝내지 않고 ${solutionA} 합의로 이어져야 합니다.`,
          behaviorHint: '없음',
        },
        {
          id: 'a_primary_fault#2',
          text: `재판관은 ${aName} 쪽의 주된 책임을 확인합니다. 이후에는 ${solutionA} 장치를 우선 합의하는 것이 수습의 출발점이 됩니다.`,
          behaviorHint: '없음',
        },
      ],
    },
    {
      key: 'b_primary_fault',
      resultClass: 'b_primary_fault',
      variants: [
        {
          id: 'b_primary_fault#1',
          text: `${bName} 쪽 책임이 더 크게 남습니다. 다만 이 결론 뒤에는 ${solutionA} 같은 재발 방지 장치가 바로 따라와야 합니다.`,
          behaviorHint: '없음',
        },
        {
          id: 'b_primary_fault#2',
          text: `이번 분쟁은 ${bName} 쪽의 책임 비중이 더 큽니다. 이후 정리는 ${solutionA}와 ${solutionB} 축으로 묶는 편이 안전합니다.`,
          behaviorHint: '없음',
        },
      ],
    },
    {
      key: 'shared_fault',
      resultClass: 'shared_fault',
      variants: [
        {
          id: 'shared_fault#1',
          text: `양측 모두에게 책임이 남습니다. 그래서 결론도 일방 처벌보다 ${solutionA}와 ${solutionB}를 함께 세우는 방향이어야 합니다.`,
          behaviorHint: '없음',
        },
        {
          id: 'shared_fault#2',
          text: `이번 사안은 상호 누적 책임으로 보는 편이 타당합니다. 합의는 감정 정리보다 ${solutionA} 같은 운영 규칙을 먼저 세우는 데서 시작됩니다.`,
          behaviorHint: '없음',
        },
      ],
    },
    {
      key: 'trust_rebuild',
      resultClass: 'trust_rebuild',
      variants: [
        {
          id: 'trust_rebuild#1',
          text: `사실관계 정리만으로는 부족합니다. 두 사람은 ${solutionA}를 기반으로 신뢰를 다시 쌓는 절차를 함께 확인해야 합니다.`,
          behaviorHint: '없음',
        },
        {
          id: 'trust_rebuild#2',
          text: `이번 판단의 핵심은 관계 복구까지 이어지는지에 있습니다. 신뢰 회복은 ${solutionA}와 ${solutionB}를 문장으로 남기는 순간부터 시작됩니다.`,
          behaviorHint: '없음',
        },
      ],
    },
    {
      key: 'procedural_caution',
      resultClass: 'procedural_caution',
      variants: [
        {
          id: 'procedural_caution#1',
          text: `이번 사안은 감정보다 절차를 다시 세우는 쪽이 중요합니다. 다음 단계에서는 ${solutionA} 같은 운영 규칙을 먼저 확정해야 합니다.`,
          behaviorHint: '없음',
        },
        {
          id: 'procedural_caution#2',
          text: `재판관은 재발 방지를 위한 절차 정비를 우선 권고합니다. 합의는 ${solutionA}와 ${solutionB}를 누가 언제 지킬지 명확히 적는 방식이 적절합니다.`,
          behaviorHint: '없음',
        },
      ],
    },
  ]
}

function buildSystemEntries() {
  const catalog = {
    'interrogation|repeat_warning': [
      '같은 축의 질문이 반복되고 있습니다. 새로운 사실이나 다른 각도에 집중해 주십시오.',
      '반복 질문 경고가 누적되고 있습니다. 다음 질문은 맥락을 바꾸는 편이 유리합니다.',
    ],
    'evidence|new_unlock': [
      '새로운 조사 결과가 열렸습니다. 지금부터는 열린 정보 범위 안에서 판단이 달라질 수 있습니다.',
      '증거 단서가 추가되었습니다. 방금 열린 정보는 다음 응답과 책임 판단에 반영됩니다.',
    ],
    'evidence|trap_notice': [
      '이 증거는 해석을 서두르면 오판을 부를 수 있습니다. 원본 맥락과 취득 경위를 함께 확인하십시오.',
      '함정성 증거가 감지되었습니다. 표면 장면보다 누락 구간과 출처를 먼저 점검해야 합니다.',
    ],
    'dossier|challenge_cleared': [
      '도전 과제가 정리되었습니다. 관련 질문의 잠금이 일부 해제될 수 있습니다.',
      '도감 조사 단계가 갱신되었습니다. 방금 확보한 정보는 이후 심문 축을 넓혀 줍니다.',
    ],
    'witness|credibility_shift': [
      '증인 신빙성 평가가 갱신되었습니다. 이후 진술 해석은 현재 등급을 기준으로 조정됩니다.',
      '증언 신뢰도가 변했습니다. 같은 말이라도 지금은 무게가 다르게 계산됩니다.',
    ],
    'verdict|profile_update': [
      '판정 결과가 프로필 기록에 반영됩니다. 누적된 판단은 이후 관계 평가에도 남습니다.',
      '이번 결론이 사건 프로필을 갱신합니다. 후속 단계에서는 방금 반영된 평가를 기준으로 진행됩니다.',
    ],
  }

  return SYSTEM_KEYS.map((keyMeta) => {
    const key = `${keyMeta.context}|${keyMeta.eventType}`
    return {
      key,
      context: keyMeta.context,
      eventType: keyMeta.eventType,
      variants: catalog[key].map((text, index) => ({
        id: `${key}#${index + 1}`,
        text,
        behaviorHint: '없음',
      })),
    }
  })
}

function buildDraft(caseId) {
  const caseData = loadJson(path.join(CASE_DIR, `${caseId}.json`))
  return {
    draftSchemaVersion: 1,
    caseId,
    generatedAt: new Date().toISOString(),
    notes: [
      'Deterministic draft only.',
      'These channels are safe to pre-script before high-sensitivity LLM/manual writing.',
      'Pending channels: interrogation, evidence_present, dossier.',
    ],
    sources: {
      caseJson: `src/data/cases/generated/${caseId}.json`,
    },
    pendingChannels: ['interrogation', 'evidence_present', 'dossier'],
    channels: {
      witness: {
        entries: buildWitnessEntries(caseData),
      },
      aftermath: {
        entries: buildAftermathEntries(caseData),
      },
      system_message: {
        entries: buildSystemEntries(),
      },
    },
  }
}

function main() {
  ensureDir(OUT_DIR)
  const caseIds = fs.readdirSync(CASE_DIR)
    .filter((name) => name.endsWith('.json'))
    .map((name) => name.replace(/\.json$/u, ''))
    .sort()

  for (const caseId of caseIds) {
    const draft = buildDraft(caseId)
    fs.writeFileSync(path.join(OUT_DIR, `${caseId}.json`), `${JSON.stringify(draft, null, 2)}\n`, 'utf8')
  }

  console.log(`[generate-deterministic-scripted-drafts] cases=${caseIds.length}`)
  console.log(`[generate-deterministic-scripted-drafts] outDir=${path.relative(ROOT, OUT_DIR)}`)
}

main()
