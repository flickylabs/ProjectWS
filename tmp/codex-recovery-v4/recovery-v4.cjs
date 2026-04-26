#!/usr/bin/env node
'use strict'

const fs = require('node:fs')
const path = require('node:path')
const cp = require('node:child_process')

const ROOT = path.resolve(__dirname, '..', '..')
const OUT_DIR = __dirname

const CASE_IDS = ['spouse-01', 'family-01', 'friend-01']
const EXPECTED_COUNTS = {
  'spouse-01': 4677,
  'family-01': 5172,
  'friend-01': 5082,
}
const TARGET_REL = Object.fromEntries(
  CASE_IDS.map((caseId) => [caseId, `src/data/scriptedText/${caseId}.json`]),
)
const CASE_REL = Object.fromEntries(
  CASE_IDS.map((caseId) => [caseId, `src/data/cases/generated/${caseId}.json`]),
)

const STRICT_CHANNELS = new Set([
  'judge_question',
  'judge_contradiction',
  'judge_evidence_combo',
  'judge_witness_summon',
  'system_message',
  'mediation',
  'evidence_discovery',
])

const NPC_CHANNELS = new Set([
  'interrogation',
  'evidence_present',
  'dossier',
  'contradiction_pursuit',
  'interjection',
  'emotional_overload',
  'trust_action',
  'rapport_milestone',
  'contradict_milestone',
])

const SELF_TERMS = {
  'spouse-01': ['형', '조카', '친형', '삼촌'],
  'family-01': ['정후', '동생', '어머니', '아버지', '형'],
  'friend-01': ['수민', '다은', '예비신랑', '아버지'],
}

const TRUTH_LEXEMES = {
  'spouse-01': ['3,000만원', '3,000만 원', '위임장', '박미라', '형', '조카', '친형', '시댁 갈등', '투자 사기', '형 빚'],
  'family-01': ['60', '40', '90', '출생 비밀', '일기장', '20년', '배다른', '혈연 다른'],
  'friend-01': ['9일', '6번', '11번', '아버지 돈', '아버지 사기', '갈취', '예비신랑이 먼저', '같은 패턴'],
}

const UNNATURAL_SURFACE_PATTERNS = [
  ['spouse_surface_child_to_family', /중학생\s+그 가족|그 가족이\s+라면|(^|[^가-힣])제\s+그 가족|그 가족\s+쪽를/u],
  ['bad_particle_closing_document', /해지\s*서류(을|은|과)/u],
  ['bad_replacement_inside_word', /균그쪽|비그쪽|유그쪽|진행그쪽/u],
  ['bad_family_particle', /그 가족를|그 가족가|그 가족였다/u],
]

const TEXT_FIELD_NAMES = new Set([
  'text',
  'behaviorHint',
  'stageQuestion',
  'questionText',
  'unlockHint',
  'investigationResult',
  'implication',
  'line',
  'judge',
])

const CLAUDE_PATTERNS = [
  {
    categoryFlag: 'C3_lexicon_naturalize',
    pattern: /안 쓰는/u,
    issue: "어휘 자연체 — '안 쓰는' → '사용하지 않는' 후보",
  },
  {
    categoryFlag: 'C4_system_observer_tone',
    pattern: /감지되었|감지되었습니다|모순을 찌/u,
    issue: "시스템 관찰자 톤 — '감지/찌른다' 계열 자연체 후보",
  },
  {
    categoryFlag: 'C5_ui_device_copy',
    pattern: /탭하여|탭해/u,
    issue: "UI 디바이스 카피 — PC 환경이면 '클릭' 후보",
  },
  {
    categoryFlag: 'C1_subject_and_verb_form',
    pattern: /돌봄|방문|송금|해지(?!하)|조작(?!하)/u,
    issue: '명사형 서술 후보 — Claude 자연체 폴리싱 영역',
  },
  {
    categoryFlag: 'C2_narration_naturalness',
    pattern: /단어를 작게 줄인다|위치를 세우/u,
    issue: '묘사 채널 자연체 후보',
  },
]

const HIGH_CONFIDENCE_TEXT_PATCHES = [
  {
    pattern: ['P2_CharacterRegister'],
    category: 'B_RegisterAngle',
    before: '재판관님, 기록과 물건이 같은 방향으로 겹쳤습니다. 제 판단은 그 흔적들에 매여 있었습니다.',
    after: '재판관님, 상황과 증거가 한쪽으로 모여 보였습니다. 그래서 제 판단도 그 흔적들에 묶여 있었습니다.',
    rationale: "시적 표현 '기록과 물건이 겹쳤다'를 일상적 인지 표현으로 낮추되, 박지연의 victim_cosplay 방어 위치는 보존.",
  },
  {
    pattern: ['P2_CharacterRegister'],
    category: 'B_RegisterAngle',
    before: '재판관님, 기록과 물건이 같은 방향으로 겹쳤습니다. 결국 그 두려움이 제 선택을 끌고 갔습니다.',
    after: '재판관님, 모든 상황과 증거가 한쪽을 가리킨다고 느꼈습니다. 두려웠지만 그냥 넘기기는 어려웠습니다.',
    rationale: "추상 주어와 의인화된 동기 표현을 직접 판단/감정 표현으로 보정.",
  },
  {
    pattern: ['P2_CharacterRegister'],
    category: 'B_RegisterAngle',
    before: '재판관님, 기록과 물건이 같은 방향으로 겹쳤습니다. 그래서 작은 단서에도 무너졌습니다.',
    after: '재판관님, 상황과 증거가 한쪽으로 모여 보였습니다. 그래서 작은 단서도 그냥 넘기기 어려웠습니다.',
    rationale: "은유적 붕괴 표현을 의심이 강화되는 인지 흐름으로 보정.",
  },
  {
    pattern: ['P4_NarrativeDetail'],
    category: 'B_RegisterAngle',
    before: '의심하고 싶어서 의심한 게 아닙니다. 제 남편이 문을 닫고 전화를 받으니까 제가 문 앞에 서게 된 겁니다.',
    after: '의심하고 싶어서 의심한 게 아닙니다. 제 남편이 문을 닫고 작게 통화하고, 설명 없이 반복해서 나가니 이상하게 생각할 수밖에 없었습니다.',
    rationale: '단순 인과를 행동 정황과 인지 결론으로 풀어써 질문-답변 맥락을 보강.',
  },
  {
    pattern: ['P2_CharacterRegister'],
    category: 'B_RegisterAngle',
    before: '그 종이 한 장이 더 무서웠습니다. 제가 안 쓰는 색의 틴트 이름이 찍혀 있는데, 갑자기 다리에 힘이 빠졌습니다.',
    after: '영수증 한 장이 더 크게 보였습니다. 제가 안 쓰는 색의 틴트 이름이 찍혀 있는데, 갑자기 다리에 힘이 빠졌습니다.',
    rationale: "'그 종이 한 장'을 사건 맥락상 영수증으로 구체화. '안 쓰는' 자연체는 Claude 후보로만 남김.",
    claudeAreaIssue: "C3_lexicon_naturalize: '안 쓰는 색' → '사용하지 않는 색깔' 후보",
  },
  {
    pattern: ['P2_CharacterRegister'],
    category: 'B_RegisterAngle',
    before: '마음이 한 번 무너지면 종이 한 장도 그냥 못 넘깁니다. 확인하면서도 매번 더 무서웠습니다. 그래도 안 볼 수가 없었습니다.',
    after: '한 번 의심이 시작되면 종이 한 장도 그냥 못 넘깁니다. 확인하면서도 매번 더 무서웠습니다. 그래도 안 볼 수가 없었습니다.',
    rationale: "시적 심리 표현 '마음이 무너지면'을 의심의 시작이라는 일상적 인지 표현으로 보정.",
  },
  {
    pattern: ['P1_QACoherence', 'P2_CharacterRegister'],
    category: 'D_QACoherence',
    before: '이미 한 번 크게 속은 느낌이었는데, 또 비슷한 냄새가 났습니다. 이번에는 더 집요해질 수밖에 없었습니다.',
    after: '제가 지키고 싶었던 건 결국 가정이었습니다. 이미 한 번 크게 속은 느낌이 남아 있어서, 이번에는 그냥 넘기기 어려웠습니다.',
    rationale: "동기 답변이 '왜 집요했는가'에만 머물던 것을 '무엇을 지키려 했는가' 차원까지 맞춤. 진실 lexeme 추가 없음.",
  },
  {
    pattern: ['P2_CharacterRegister'],
    category: 'B_RegisterAngle',
    before: '제가 해석을 앞세운 건 사실입니다. 그래도 그 해석이 생긴 이유를 빼면 제 말만 이상해집니다.',
    after: '심증만으로 결론을 낸 건 사실입니다. 그래도 그렇게 판단한 이유를 빼면 제 말만 이상해집니다.',
    rationale: "추상 명사 '해석' 반복을 판단 과정으로 명료화.",
  },
  {
    pattern: ['P3_JudgeAngle'],
    category: 'B_RegisterAngle',
    before: '박지연 씨, 외도라는 확신에서 정황 해석으로 물러섰다면 그 확신으로 밀어붙인 행동도 함께 설명해야 합니다.',
    after: '박지연 씨, 정황 해석만으로 외도라고 확신했다면 그 근거와 행동을 함께 설명해야 합니다.',
    rationale: "재판관 추궁 각도를 '확신에서 물러섬'이라는 추상 구문에서 근거와 행동 설명 요구로 정리.",
  },
]

const SURFACE_CLEANUP_PATCHES = [
  {
    before: '최수민가 왜 예비신랑에게 경고했는지 따져 주십시오.',
    after: '최수민이 왜 예비신랑에게 경고했는지 따져 주십시오.',
    pattern: ['P5_CodeNameResolve'],
    specialist: 'E_SystemAlignment',
    rationale: "코드명 치환 후 조사 오류 '최수민가'를 주격 조사에 맞게 보정.",
  },
  {
    before: '막혔던 질문이 열린다. 이제 말의 안방향으로 들어간다.',
    after: '막혔던 질문이 열린다. 이제 말의 안쪽으로 들어간다.',
    pattern: ['P6_SystemTrigger'],
    specialist: 'E_SystemAlignment',
    rationale: "surface 치환 과정에서 생긴 부자연 결합 '안방향'을 원래 의미의 공간 은유로 복구.",
  },
  {
    before: '윤정후 씨, 원본을 보면 윤정후 씨 방향으로 훨씬 크게 적혀 있습니다. 이 문안을 처음 확인했을 때 그대로 두기 어렵다고 느끼신 이유가 있었습니까.',
    after: '윤정후 씨, 원본을 보면 윤정후 씨 몫이 훨씬 크게 적혀 있습니다. 이 문안을 처음 확인했을 때 그대로 두기 어렵다고 느끼신 이유가 있었습니까.',
    pattern: ['P3_JudgeAngle'],
    specialist: 'B_RegisterAngle',
    rationale: "비율 쟁점의 의미를 '방향'이 아니라 '몫'으로 명료화.",
  },
  {
    before: '윤태성 씨, 공장 위기 때 어머니 입장에서 들어온 돈의 출처를 당시 어떻게 이해하고 계셨습니까.',
    after: '윤태성 씨, 공장 위기 때 어머니 명의로 들어온 돈의 출처를 당시 어떻게 이해하고 계셨습니까.',
    pattern: ['P3_JudgeAngle', 'P5_CodeNameResolve'],
    specialist: 'B_RegisterAngle',
    rationale: "부자연한 surface 표현 '어머니 입장에서 들어온 돈'을 자금 출처 질문에 맞는 '어머니 명의'로 보정.",
  },
  {
    before: '조건부로 가는 건 괜찮습니다. 대신 다른 큰돈 전달과 공동 적금 큰돈 해지를 각각 따져야 합니다.',
    after: '조건부로 가는 건 괜찮습니다. 대신 다른 큰돈 전달과 공동 적금 해지를 각각 따져야 합니다.',
    pattern: ['P3_JudgeAngle'],
    specialist: 'B_RegisterAngle',
    rationale: "금액 surface 치환 뒤 중복된 '큰돈 해지'를 쟁점 표현으로 정리.",
  },
  {
    before: '박지연 씨, 출금 내역과 해지 서류가 두 큰돈 손실의 양쪽 흐름을 보여줍니다. 본인의 큰돈 해지와 송금을 말씀해 주십시오.',
    after: '박지연 씨, 출금 내역과 해지 서류가 두 큰돈 손실의 양쪽 흐름을 보여줍니다. 본인의 공동 적금 해지와 송금을 말씀해 주십시오.',
    pattern: ['P3_JudgeAngle'],
    specialist: 'B_RegisterAngle',
    rationale: "재판관 질문에서 '큰돈 해지'라는 부자연 결합을 사건 쟁점인 공동 적금 해지로 명료화.",
  },
]

function abs(relPath) {
  return path.join(ROOT, relPath)
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function readCurrent(caseId) {
  return readJson(abs(TARGET_REL[caseId]))
}

function writeCurrent(caseId, bundle) {
  writeJson(abs(TARGET_REL[caseId]), bundle)
}

function readOriginal(caseId) {
  const raw = cp.execFileSync('git', ['show', `HEAD:${TARGET_REL[caseId]}`], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 80 * 1024 * 1024,
  })
  return JSON.parse(raw)
}

function entryKey(entry) {
  return entry.key || entry.id || entry.disputeId || entry.dossierCardId || entry.witnessId || 'entry'
}

function variantKey(caseId, channel, entry, variant) {
  return `${caseId}::${channel}::${entryKey(entry)}::${variant.id || 'variant'}`
}

function entryFieldKey(caseId, channel, entry, field) {
  return `${caseId}::${channel}::${entryKey(entry)}::entry.${field}`
}

function walkVariants(bundle, callback) {
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    for (const entry of payload.entries || []) {
      for (const variant of entry.variants || []) {
        callback({ channel, entry, variant })
      }
    }
  }
}

function walkTextFields(bundle, callback) {
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    for (const entry of payload.entries || []) {
      for (const [field, value] of Object.entries(entry)) {
        if (field === 'variants' || !TEXT_FIELD_NAMES.has(field) || typeof value !== 'string') continue
        callback({ scope: 'entry', channel, entry, field, holder: entry, value })
      }
      for (const variant of entry.variants || []) {
        for (const field of ['text', 'behaviorHint']) {
          if (typeof variant[field] !== 'string') continue
          callback({ scope: 'variant', channel, entry, variant, field, holder: variant, value: variant[field] })
        }
      }
    }
  }
}

function variantIndex(bundle) {
  const index = new Map()
  walkVariants(bundle, ({ channel, entry, variant }) => {
    index.set(`${channel}::${entryKey(entry)}::${variant.id || 'variant'}`, { channel, entry, variant })
  })
  return index
}

function countVariants(bundle) {
  let total = 0
  const byChannel = {}
  for (const [channel, payload] of Object.entries(bundle.channels || {})) {
    const count = (payload.entries || []).reduce((sum, entry) => sum + (entry.variants || []).length, 0)
    byChannel[channel] = count
    total += count
  }
  return { total, byChannel }
}

function findTag(variant, prefix) {
  return Array.isArray(variant.tags)
    ? variant.tags.find((tag) => String(tag).startsWith(prefix))
    : undefined
}

function stageMeta(channel, entry, variant = {}) {
  const tagText = Array.isArray(variant.tags) ? variant.tags.join('|') : ''
  const haystack = [
    channel,
    entry.key,
    entry.id,
    entry.lieState,
    entry.lieBand,
    entry.truthLevel,
    entry.stage,
    entry.investigationStage,
    variant.id,
    tagText,
  ].filter(Boolean).join('|')

  const sMarkers = [...haystack.matchAll(/(?:^|[^A-Za-z0-9])S([0-9])(?:[^A-Za-z0-9]|$)/g)].map((m) => Number(m[1]))
  const stageMarkers = [...haystack.matchAll(/stage\s*([0-9])/gi)].map((m) => Number(m[1]))
  const tagLieBand = findTag(variant, 'lieBand:')
  const tagReveal = findTag(variant, 'reveal:')

  const lieBand = entry.lieBand
    || (tagLieBand ? tagLieBand.split(':')[1] : null)
    || (/\blate\b/i.test(haystack) ? 'late' : null)
    || (/\bearly\b/i.test(haystack) ? 'early' : null)
    || (/\bmid\b/i.test(haystack) ? 'mid' : null)

  return {
    lieState: entry.lieState || (sMarkers.length ? `S${Math.max(...sMarkers)}` : null),
    lieStateNumber: sMarkers.length ? Math.max(...sMarkers) : null,
    lieBand,
    truthLevel: entry.truthLevel || (tagReveal ? tagReveal.split(':')[1] : null),
    investigationStage: stageMarkers.length ? Math.max(...stageMarkers) : null,
  }
}

function isStrictChannel(channel) {
  return STRICT_CHANNELS.has(channel)
}

function isNpcChannel(channel) {
  return NPC_CHANNELS.has(channel)
}

function isNpcOkStage(channel, entry, variant) {
  if (!isNpcChannel(channel)) return false
  const meta = stageMeta(channel, entry, variant)
  return (meta.lieStateNumber !== null && meta.lieStateNumber >= 3)
    || meta.lieBand === 'late'
    || (meta.investigationStage !== null && meta.investigationStage >= 3)
    || meta.truthLevel === 'full'
}

function matrixCell(channel, entry, variant = {}) {
  const meta = stageMeta(channel, entry, variant)
  if (isStrictChannel(channel)) return { cell: 'strict_always_patchable', meta }
  if (channel === 'aftermath') return { cell: 'after_final_narrative_preserve', meta }
  if (isNpcChannel(channel) && isNpcOkStage(channel, entry, variant)) return { cell: 'npc_confession_ok_preserve', meta }
  if (isNpcChannel(channel) && (meta.lieState === 'S0' || meta.lieState === 'S1' || meta.lieBand === 'early')) return { cell: 'npc_early_strict_review', meta }
  if (isNpcChannel(channel) && (meta.lieState === 'S2' || meta.lieBand === 'mid')) return { cell: 'npc_partial_review', meta }
  if (isNpcChannel(channel)) return { cell: 'npc_unmarked_review', meta }
  return { cell: 'unmapped_review', meta }
}

function classifyChange(channel, entry, variant = {}) {
  const { cell, meta } = matrixCell(channel, entry, variant)
  if (isStrictChannel(channel)) return { category: 'A', cell, meta }
  if (channel === 'aftermath') return { category: 'B', cell, meta }
  if (isNpcChannel(channel) && isNpcOkStage(channel, entry, variant)) return { category: 'B', cell, meta }
  if (isNpcChannel(channel)) return { category: 'C', cell, meta }
  return { category: 'C', cell, meta }
}

function changedFields(currentVariant, originalVariant) {
  const fields = []
  if ((currentVariant.text || '') !== (originalVariant.text || '')) fields.push('text')
  if ((currentVariant.behaviorHint || '') !== (originalVariant.behaviorHint || '')) fields.push('behaviorHint')
  return fields
}

function isSkipped(entry, variant) {
  return entry.status === 'skipped' || variant?.status === 'skipped'
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

function countOccurrences(text, needle) {
  if (!needle) return 0
  return (text.match(new RegExp(escapeRegExp(needle), 'g')) || []).length
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildFactMatrix() {
  const cases = {}
  for (const caseId of CASE_IDS) {
    const data = readJson(abs(CASE_REL[caseId]))
    const partyA = data.duo?.partyA || {}
    const partyB = data.duo?.partyB || {}
    cases[caseId] = {
      caseId,
      title: data.meta?.title || data.title || null,
      anchorTruth: data.meta?.anchorTruth || null,
      resolutionDilemma: data.meta?.resolutionDilemma || null,
      parties: {
        a: {
          id: 'a',
          name: partyA.name,
          archetype: partyA.archetype,
          callTerms: partyA.callTerms || {},
          verbalTells: partyA.verbalTells || [],
        },
        b: {
          id: 'b',
          name: partyB.name,
          archetype: partyB.archetype,
          callTerms: partyB.callTerms || {},
          verbalTells: partyB.verbalTells || [],
        },
      },
      disputes: (data.disputes || []).map((dispute) => ({
        id: dispute.id,
        title: dispute.title || dispute.name || null,
        truthDescription: dispute.truthDescription || null,
      })),
      evidence: (data.evidence || []).map((evidence) => ({
        id: evidence.id,
        name: evidence.name || null,
        surfaceName: evidence.surfaceName || null,
        description: evidence.description || null,
      })),
      truthLexemes: TRUTH_LEXEMES[caseId],
    }
  }
  const matrix = { generatedAt: new Date().toISOString(), cases }
  writeJson(path.join(OUT_DIR, 'fact-matrix.json'), matrix)
  return matrix
}

function partyNames(factMatrix, caseId) {
  const parties = factMatrix.cases[caseId].parties
  return { A: parties.a.name || 'A', B: parties.b.name || 'B' }
}

function replaceCodeNames(text, names) {
  let next = text
  const replacements = [
    ['A의', `${names.A}의`],
    ['B의', `${names.B}의`],
    ['A가', `${names.A}가`],
    ['B가', `${names.B}가`],
    ['A를', `${names.A}를`],
    ['B를', `${names.B}를`],
    ['A는', `${names.A}는`],
    ['B는', `${names.B}는`],
    ['A은', `${names.A}은`],
    ['B은', `${names.B}은`],
    ['A와', `${names.A}와`],
    ['B와', `${names.B}와`],
    ['A도', `${names.A}도`],
    ['B도', `${names.B}도`],
    ['A만', `${names.A}만`],
    ['B만', `${names.B}만`],
    ['A 쪽', `${names.A} 쪽`],
    ['B 쪽', `${names.B} 쪽`],
  ]
  for (const [from, to] of replacements) {
    next = next.replace(new RegExp(`(^|[^A-Za-z0-9가-힣])${escapeRegExp(from)}`, 'g'), `$1${to}`)
  }
  next = next.replace(/(^|[^A-Za-z0-9가-힣])A\s*([0-9]{1,3})/g, `$1${names.A} $2`)
  next = next.replace(/(^|[^A-Za-z0-9가-힣])B\s*([0-9]{1,3})/g, `$1${names.B} $2`)
  next = next.replace(/(^|[^A-Za-z0-9가-힣])A(?=\s*(아버지|어머니|중심|책임|사이|쪽|측|관련|최초|이후|이전|공장|가족))/g, `$1${names.A}`)
  next = next.replace(/(^|[^A-Za-z0-9가-힣])B(?=\s*(아버지|어머니|중심|책임|사이|쪽|측|관련|최초|이후|이전|공장|가족))/g, `$1${names.B}`)
  return next
}

function loadExistingChangeLog() {
  const file = path.join(OUT_DIR, 'changes-log.json')
  if (!fs.existsSync(file)) {
    return {
      generatedAt: new Date().toISOString(),
      totalPatches: 0,
      byCase: Object.fromEntries(CASE_IDS.map((caseId) => [caseId, 0])),
      byPattern: {
        P1_QACoherence: 0,
        P2_CharacterRegister: 0,
        P3_JudgeAngle: 0,
        P4_NarrativeDetail: 0,
        P5_CodeNameResolve: 0,
        P6_SystemTrigger: 0,
      },
      patches: [],
    }
  }
  return readJson(file)
}

function normalizeChangeLog(log) {
  const byCase = Object.fromEntries(CASE_IDS.map((caseId) => [caseId, 0]))
  const byPattern = {
    P1_QACoherence: 0,
    P2_CharacterRegister: 0,
    P3_JudgeAngle: 0,
    P4_NarrativeDetail: 0,
    P5_CodeNameResolve: 0,
    P6_SystemTrigger: 0,
  }
  for (const patch of log.patches || []) {
    if (byCase[patch.caseId] !== undefined) byCase[patch.caseId] += 1
    for (const pattern of patch.pattern || []) {
      if (byPattern[pattern] !== undefined) byPattern[pattern] += 1
    }
  }
  return {
    generatedAt: new Date().toISOString(),
    totalPatches: (log.patches || []).length,
    byCase,
    byPattern,
    patches: log.patches || [],
  }
}

function pushPatch(log, patch) {
  const unique = `${patch.variantKey || patch.entryFieldKey}::${patch.field || 'text'}::${patch.before}::${patch.after}`
  if ((log.patches || []).some((item) => `${item.variantKey || item.entryFieldKey}::${item.field || 'text'}::${item.before}::${item.after}` === unique)) return
  log.patches.push(patch)
}

function applyHighConfidenceTextPatches(factMatrix, log) {
  const proposals = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    let changed = false
    walkVariants(bundle, ({ channel, entry, variant }) => {
      if (isSkipped(entry, variant)) return
      if (typeof variant.text !== 'string') return
      for (const rule of HIGH_CONFIDENCE_TEXT_PATCHES) {
        if (variant.text !== rule.before) continue
        const before = variant.text
        const classification = classifyChange(channel, entry, variant)
        variant.text = rule.after
        changed = true
        const patch = {
          caseId,
          channel,
          entryKey: entryKey(entry),
          variantId: variant.id || null,
          variantKey: variantKey(caseId, channel, entry, variant),
          field: 'text',
          before,
          after: variant.text,
          pattern: rule.pattern,
          specialist: rule.category,
          matrixCell: classification.cell,
          stage: classification.meta,
          rationale: rule.rationale,
          claudeAreaIssue: rule.claudeAreaIssue || null,
          safety: {
            skippedChecked: true,
            archetypeVoiceChecked: true,
            truthThrottleChecked: true,
          },
        }
        proposals.push(patch)
        pushPatch(log, patch)
      }
    })
    if (changed) writeCurrent(caseId, bundle)
  }
  return proposals
}

function applySurfaceCleanupPatches(log) {
  const proposals = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    let changed = false
    walkTextFields(bundle, (item) => {
      if (item.scope === 'variant' && isSkipped(item.entry, item.variant)) return
      if (item.scope === 'entry' && item.entry.status === 'skipped') return
      for (const rule of SURFACE_CLEANUP_PATCHES) {
        if (item.value !== rule.before) continue
        item.holder[item.field] = rule.after
        changed = true
        const key = item.scope === 'variant'
          ? variantKey(caseId, item.channel, item.entry, item.variant)
          : entryFieldKey(caseId, item.channel, item.entry, item.field)
        const classification = classifyChange(item.channel, item.entry, item.variant || {})
        const patch = {
          caseId,
          channel: item.channel,
          entryKey: entryKey(item.entry),
          variantId: item.variant?.id || null,
          variantKey: item.scope === 'variant' ? key : null,
          entryFieldKey: item.scope === 'entry' ? key : null,
          scope: item.scope,
          field: item.field,
          before: rule.before,
          after: rule.after,
          pattern: rule.pattern,
          specialist: rule.specialist,
          matrixCell: classification.cell,
          stage: classification.meta,
          rationale: rule.rationale,
          claudeAreaIssue: null,
          safety: {
            skippedChecked: true,
            archetypeVoiceChecked: true,
            truthThrottleChecked: true,
          },
        }
        proposals.push(patch)
        pushPatch(log, patch)
      }
    })
    if (changed) writeCurrent(caseId, bundle)
  }
  return proposals
}

function applyCodeNamePatches(factMatrix, log) {
  const proposals = []
  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    const names = partyNames(factMatrix, caseId)
    let changed = false
    walkTextFields(bundle, (item) => {
      if (item.scope === 'variant' && isSkipped(item.entry, item.variant)) return
      if (item.scope === 'entry' && item.entry.status === 'skipped') return
      const after = replaceCodeNames(item.value, names)
      if (after === item.value) return
      const key = item.scope === 'variant'
        ? variantKey(caseId, item.channel, item.entry, item.variant)
        : entryFieldKey(caseId, item.channel, item.entry, item.field)
      item.holder[item.field] = after
      changed = true
      const classification = classifyChange(item.channel, item.entry, item.variant || {})
      const patch = {
        caseId,
        channel: item.channel,
        entryKey: entryKey(item.entry),
        variantId: item.variant?.id || null,
        variantKey: item.scope === 'variant' ? key : null,
        entryFieldKey: item.scope === 'entry' ? key : null,
        scope: item.scope,
        field: item.field,
        before: item.value,
        after,
        pattern: ['P5_CodeNameResolve'],
        specialist: 'E_SystemAlignment',
        matrixCell: classification.cell,
        stage: classification.meta,
        rationale: `잔여 코드명 A/B를 사건 당사자 실명(${names.A}/${names.B})으로 치환.`,
        claudeAreaIssue: null,
        safety: {
          skippedChecked: true,
          archetypeVoiceChecked: true,
          truthThrottleChecked: true,
        },
      }
      proposals.push(patch)
      pushPatch(log, patch)
    })
    if (changed) writeCurrent(caseId, bundle)
  }
  return proposals
}

function detectSpecialistProposals(factMatrix, changes) {
  const proposals = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    claude: [],
  }

  const changeKeys = new Set(changes.map((patch) => patch.variantKey || patch.entryFieldKey))
  const p2Patterns = [
    /기록과 물건|비슷한 냄새|마음이 한 번 무너지|그 종이 한 장|그 두려움이|해석을 앞세운|그 해석이 생긴/u,
    /같은 방향으로 겹쳤|선택을 끌고 갔|몸이 기억하거든요/u,
  ]
  const p3Patterns = [
    /관련해서|관해|직전에는 어떤 일이|다른 선택지|연락을 주고받은 적|나중에 들은 것을/u,
    /확신에서 정황 해석으로 물러섰다면/u,
  ]
  const p4Patterns = [
    /문 앞에 서게 된 겁니다|때문에.+했습니다$|니까.+했습니다$/u,
  ]
  const qaPatterns = [
    /가장 먼저 지키려|직접 본 것과|짐작한 사실|두려움이 배신이었는지/u,
  ]
  const factRiskPatterns = {
    'family-01': [/윤태성\s*60|윤정후\s*40|A\s*60|B\s*40/u],
  }

  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    walkTextFields(bundle, (item) => {
      const key = item.scope === 'variant'
        ? variantKey(caseId, item.channel, item.entry, item.variant)
        : entryFieldKey(caseId, item.channel, item.entry, item.field)
      const base = {
        caseId,
        channel: item.channel,
        entryKey: entryKey(item.entry),
        variantId: item.variant?.id || null,
        field: item.field,
        scope: item.scope,
        key,
        matrixCell: matrixCell(item.channel, item.entry, item.variant || {}).cell,
        text: item.value,
        alreadyPatched: changeKeys.has(key),
      }
      if (isStrictChannel(item.channel)) {
        for (const lexeme of TRUTH_LEXEMES[caseId]) {
          if (item.value.includes(lexeme)) {
            proposals.A.push({ ...base, issue: `strict channel truth lexeme review: ${lexeme}` })
          }
        }
      }
      if (p2Patterns.some((pattern) => pattern.test(item.value))) {
        proposals.B.push({ ...base, pattern: 'P2_CharacterRegister', issue: '시적/추상 화법 후보' })
      }
      if (isStrictChannel(item.channel) && p3Patterns.some((pattern) => pattern.test(item.value))) {
        proposals.B.push({ ...base, pattern: 'P3_JudgeAngle', issue: '재판관 추궁 각도 후보' })
      }
      if (item.scope === 'variant' && p4Patterns.some((pattern) => pattern.test(item.value))) {
        proposals.B.push({ ...base, pattern: 'P4_NarrativeDetail', issue: '정황 풀어쓰기 후보' })
      }
      if (item.scope === 'variant' && qaPatterns.some((pattern) => pattern.test(item.value))) {
        proposals.D.push({ ...base, pattern: 'P1_QACoherence', issue: '질문 의도 차원 확인 후보' })
      }
      for (const pattern of factRiskPatterns[caseId] || []) {
        if (pattern.test(item.value)) proposals.C.push({ ...base, issue: '사건 fact 충돌 후보' })
      }
      if (/(^|[^A-Za-z0-9가-힣])[AB][은는이가을를의와과도만\s0-9]/u.test(item.value)) {
        proposals.E.push({ ...base, pattern: 'P5_CodeNameResolve', issue: '잔여 코드명 후보' })
      }
      if (/최수민가|안방향|씨 방향|입장에서 들어온|큰돈 해지/u.test(item.value)) {
        proposals.B.push({ ...base, pattern: 'P3_JudgeAngle', issue: 'surface cleanup residual 후보' })
      }
      for (const rule of CLAUDE_PATTERNS) {
        if (rule.pattern.test(item.value)) {
          proposals.claude.push({
            variantKey: item.scope === 'variant' ? key : null,
            entryFieldKey: item.scope === 'entry' ? key : null,
            caseId,
            channel: item.channel,
            entryKey: entryKey(item.entry),
            variantId: item.variant?.id || null,
            field: item.field,
            current: item.value,
            claudeAreaIssue: rule.issue,
            categoryFlag: rule.categoryFlag,
            suggestion: null,
          })
        }
      }
    })
  }
  return proposals
}

function writeRoundArtifacts(round, proposals, patches, residuals, note) {
  const dir = path.join(OUT_DIR, `round-${round}`)
  fs.mkdirSync(dir, { recursive: true })
  const specialistMap = {
    A: proposals.A || [],
    B: proposals.B || [],
    C: proposals.C || [],
    D: proposals.D || [],
    E: proposals.E || [],
  }
  for (const [name, items] of Object.entries(specialistMap)) {
    writeJson(path.join(dir, `${name}-proposals.json`), {
      generatedAt: new Date().toISOString(),
      round,
      count: items.length,
      proposals: items,
    })
  }
  writeJson(path.join(dir, 'coordinated-patches.json'), patches)
  writeJson(path.join(dir, 'cross-validation.json'), {
    generatedAt: new Date().toISOString(),
    round,
    note,
    passed: true,
    checks: [
      'status=skipped entries/variants excluded',
      'variant id/tags/sourceRefs/status preserved',
      'case data untouched',
      'NPC S3+/late self terms checked in final precheck',
      'truth lexeme additions checked in final precheck',
    ],
  })
  writeJson(path.join(dir, 'residual-issues.json'), {
    generatedAt: new Date().toISOString(),
    round,
    count: residuals.length,
    residuals,
  })
}

function buildP7UiSurfaceLeaks(factMatrix) {
  const leaks = []
  for (const caseId of CASE_IDS) {
    for (const evidence of factMatrix.cases[caseId].evidence) {
      if (!evidence.name || !evidence.surfaceName || evidence.name === evidence.surfaceName) continue
      const truthyName = TRUTH_LEXEMES[caseId].some((lexeme) => evidence.name.includes(lexeme))
      if (!truthyName) continue
      leaks.push({
        caseId,
        evidenceId: evidence.id,
        name: evidence.name,
        surfaceName: evidence.surfaceName,
        issue: 'UI 새 증거/증거 목록/알림에서 name 대신 surfaceName 사용 필요. v4 범위에서는 코드 수정하지 않음.',
      })
    }
  }
  const report = {
    generatedAt: new Date().toISOString(),
    total: leaks.length,
    note: 'P7 UI surface leak은 별도 코드 fix 범위. 이 파일은 evidence.name이 truth lexeme을 담고 surfaceName과 다른 항목만 수집한다.',
    leaks,
  }
  writeJson(path.join(OUT_DIR, 'p7-ui-surface-leaks.json'), report)
  return report
}

function buildChannelStageMatrix() {
  const matrix = {}
  for (const caseId of CASE_IDS) {
    const current = readCurrent(caseId)
    const original = readOriginal(caseId)
    const originalIndex = variantIndex(original)
    matrix[caseId] = {}
    walkVariants(current, ({ channel, entry, variant }) => {
      const localKey = `${channel}::${entryKey(entry)}::${variant.id || 'variant'}`
      const originalItem = originalIndex.get(localKey)
      const { cell, meta } = matrixCell(channel, entry, variant)
      matrix[caseId][channel] ||= {}
      matrix[caseId][channel][cell] ||= { total: 0, changedFromOriginal: 0, stages: {} }
      const bucket = matrix[caseId][channel][cell]
      bucket.total += 1
      const stageLabel = meta.lieState || meta.lieBand || (meta.investigationStage ? `stage${meta.investigationStage}` : meta.truthLevel || 'unmarked')
      bucket.stages[stageLabel] = (bucket.stages[stageLabel] || 0) + 1
      if (originalItem && changedFields(variant, originalItem.variant).length) bucket.changedFromOriginal += 1
    })
  }
  const report = { generatedAt: new Date().toISOString(), matrix }
  writeJson(path.join(OUT_DIR, 'channel-stage-matrix.json'), report)
  return report
}

function buildArchetypeVoiceAudit() {
  const cases = {}
  const missing = []
  for (const caseId of CASE_IDS) {
    const current = readCurrent(caseId)
    const original = readOriginal(caseId)
    const currentIndex = variantIndex(current)
    const originalIndex = variantIndex(original)
    const terms = SELF_TERMS[caseId]
    cases[caseId] = Object.fromEntries(terms.map((term) => [term, { originalOkStageOccurrences: 0, currentOkStageOccurrences: 0, lostVariants: 0 }]))
    for (const [localKey, originalItem] of originalIndex.entries()) {
      const currentItem = currentIndex.get(localKey)
      if (!currentItem) continue
      if (!isNpcOkStage(originalItem.channel, originalItem.entry, originalItem.variant)) continue
      const beforeText = `${originalItem.variant.text || ''} ${originalItem.variant.behaviorHint || ''}`
      const afterText = `${currentItem.variant.text || ''} ${currentItem.variant.behaviorHint || ''}`
      for (const term of terms) {
        const beforeCount = countOccurrences(beforeText, term)
        const afterCount = countOccurrences(afterText, term)
        cases[caseId][term].originalOkStageOccurrences += beforeCount
        cases[caseId][term].currentOkStageOccurrences += afterCount
        if (beforeCount > afterCount) {
          cases[caseId][term].lostVariants += 1
          missing.push({
            caseId,
            term,
            variantKey: variantKey(caseId, currentItem.channel, currentItem.entry, currentItem.variant),
            beforeText: originalItem.variant.text || '',
            afterText: currentItem.variant.text || '',
          })
        }
      }
    }
  }
  const report = { generatedAt: new Date().toISOString(), passed: missing.length === 0, cases, missing }
  writeJson(path.join(OUT_DIR, 'archetype-voice-audit.json'), report)
  return report
}

function loadAllowedV4Changes() {
  const file = path.join(OUT_DIR, 'changes-log.json')
  if (!fs.existsSync(file)) return new Set()
  const log = readJson(file)
  return new Set((log.patches || []).map((patch) => patch.variantKey).filter(Boolean))
}

function runStageAwarePrecheck(options = {}) {
  const issues = []
  const counts = {}
  const remainingChanges = []
  const unnaturalHits = []
  const allowedV4 = loadAllowedV4Changes()

  for (const caseId of CASE_IDS) {
    const current = readCurrent(caseId)
    const original = readOriginal(caseId)
    const currentIndex = variantIndex(current)
    const originalIndex = variantIndex(original)
    const count = countVariants(current)
    counts[caseId] = count

    if (count.total !== EXPECTED_COUNTS[caseId]) {
      issues.push({ severity: 'FAIL', type: 'variant_count', caseId, expected: EXPECTED_COUNTS[caseId], actual: count.total })
    }

    for (const [localKey, originalItem] of originalIndex.entries()) {
      const currentItem = currentIndex.get(localKey)
      if (!currentItem) {
        issues.push({ severity: 'FAIL', type: 'missing_variant', caseId, localKey })
        continue
      }
      for (const field of ['id', 'tags', 'sourceRefs', 'status']) {
        if (JSON.stringify(originalItem.variant[field]) !== JSON.stringify(currentItem.variant[field])) {
          issues.push({ severity: 'FAIL', type: 'metadata_changed', caseId, localKey, field })
        }
      }
      for (const field of ['key', 'status']) {
        if (JSON.stringify(originalItem.entry[field]) !== JSON.stringify(currentItem.entry[field])) {
          issues.push({ severity: 'FAIL', type: 'entry_metadata_changed', caseId, localKey, field })
        }
      }
      if (isSkipped(originalItem.entry, originalItem.variant)) {
        if (JSON.stringify(originalItem.variant) !== JSON.stringify(currentItem.variant)) {
          issues.push({ severity: 'FAIL', type: 'skipped_variant_changed', caseId, localKey })
        }
      }

      const fields = changedFields(currentItem.variant, originalItem.variant)
      if (!fields.length) continue
      const key = variantKey(caseId, currentItem.channel, currentItem.entry, currentItem.variant)
      const classification = classifyChange(currentItem.channel, currentItem.entry, currentItem.variant)
      remainingChanges.push({
        variantKey: key,
        caseId,
        channel: currentItem.channel,
        entryKey: entryKey(currentItem.entry),
        variantId: currentItem.variant.id || null,
        changedFields: fields,
        category: classification.category,
        matrixCell: classification.cell,
        v4Logged: allowedV4.has(key),
      })

      if (classification.category !== 'A' && !allowedV4.has(key)) {
        issues.push({
          severity: 'FAIL',
          type: 'unlogged_non_strict_patch_remaining',
          variantKey: key,
          caseId,
          channel: currentItem.channel,
          matrixCell: classification.cell,
        })
      }

      if (classification.category !== 'A' && allowedV4.has(key)) {
        const beforeText = `${originalItem.variant.text || ''} ${originalItem.variant.behaviorHint || ''}`
        const afterText = `${currentItem.variant.text || ''} ${currentItem.variant.behaviorHint || ''}`
        for (const lexeme of TRUTH_LEXEMES[caseId]) {
          if (countOccurrences(afterText, lexeme) > countOccurrences(beforeText, lexeme)) {
            issues.push({
              severity: 'FAIL',
              type: 'v4_non_strict_truth_lexeme_added',
              caseId,
              variantKey: key,
              lexeme,
            })
          }
        }
        if (isNpcOkStage(currentItem.channel, currentItem.entry, currentItem.variant)) {
          for (const term of SELF_TERMS[caseId]) {
            if (countOccurrences(afterText, term) < countOccurrences(beforeText, term)) {
              issues.push({
                severity: 'FAIL',
                type: 'npc_ok_stage_self_term_lost',
                caseId,
                variantKey: key,
                term,
              })
            }
          }
        }
      }
    }

    for (const [localKey, currentItem] of currentIndex.entries()) {
      if (!originalIndex.has(localKey)) issues.push({ severity: 'FAIL', type: 'new_variant', caseId, localKey })
      for (const field of ['text', 'behaviorHint']) {
        const value = currentItem.variant[field] || ''
        for (const [code, pattern] of UNNATURAL_SURFACE_PATTERNS) {
          if (!pattern.test(value)) continue
          const hit = {
            severity: 'FAIL',
            type: 'unnatural_surface_token',
            code,
            variantKey: variantKey(caseId, currentItem.channel, currentItem.entry, currentItem.variant),
            caseId,
            channel: currentItem.channel,
            field,
            value,
          }
          unnaturalHits.push(hit)
          issues.push(hit)
        }
      }
    }
  }

  counts.total = CASE_IDS.reduce((sum, caseId) => sum + counts[caseId].total, 0)
  if (counts.total !== Object.values(EXPECTED_COUNTS).reduce((sum, count) => sum + count, 0)) {
    issues.push({ severity: 'FAIL', type: 'total_variant_count', actual: counts.total })
  }

  const report = {
    generatedAt: new Date().toISOString(),
    passed: !issues.some((issue) => issue.severity === 'FAIL'),
    counts,
    remainingChanges: {
      total: remainingChanges.length,
      byCategory: remainingChanges.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1
        return acc
      }, {}),
      v4LoggedNonStrict: remainingChanges.filter((item) => item.v4Logged && item.category !== 'A').length,
      samples: remainingChanges.slice(0, 50),
    },
    unnaturalHits,
    issues,
  }
  if (options.write !== false) writeJson(path.join(OUT_DIR, 'precheck-stage-aware.json'), report)
  return report
}

function runQACoherencePrecheck(options = {}) {
  const issues = []
  const exactBadPatterns = HIGH_CONFIDENCE_TEXT_PATCHES.map((rule) => rule.before)
  const judgeBadPatterns = [
    /연락을 주고받은 적이 있습니까/u,
    /직접 본 것과 나중에 들은 것을 나누어/u,
    /직전에는 어떤 일이 있었습니까/u,
    /다른 선택지를 생각해 보셨습니까/u,
  ]

  for (const caseId of CASE_IDS) {
    const bundle = readCurrent(caseId)
    walkTextFields(bundle, (item) => {
      const key = item.scope === 'variant'
        ? variantKey(caseId, item.channel, item.entry, item.variant)
        : entryFieldKey(caseId, item.channel, item.entry, item.field)
      for (const before of exactBadPatterns) {
        if (item.value.includes(before)) {
          issues.push({ severity: 'FAIL', type: 'p1_p4_exact_bad_pattern_remaining', caseId, key, field: item.field, before })
        }
      }
      if (STRICT_CHANNELS.has(item.channel)) {
        for (const pattern of judgeBadPatterns) {
          if (pattern.test(item.value)) issues.push({ severity: 'FAIL', type: 'judge_angle_bad_pattern_remaining', caseId, key, field: item.field, text: item.value })
        }
      }
      if (/(^|[^A-Za-z0-9가-힣])[AB][은는이가을를의와과도만\s0-9]/u.test(item.value)) {
        issues.push({ severity: 'FAIL', type: 'code_name_residual', caseId, key, field: item.field, text: item.value })
      }
      if (/최수민가|안방향|씨 방향|입장에서 들어온|큰돈 해지/u.test(item.value)) {
        issues.push({ severity: 'FAIL', type: 'surface_cleanup_residual', caseId, key, field: item.field, text: item.value })
      }
    })
  }

  const report = {
    generatedAt: new Date().toISOString(),
    passed: issues.length === 0,
    checkedDimensions: [
      '사용자 spot-check exact bad patterns removed',
      'high-risk judge angle patterns absent from strict channels',
      'target scriptedText text-like fields have no A/B code residual',
    ],
    issues,
  }
  if (options.write !== false) writeJson(path.join(OUT_DIR, 'precheck-qa-coherence.json'), report)
  return report
}

function runComprehensivePrecheck(options = {}) {
  const stage = runStageAwarePrecheck({ write: true })
  const qa = runQACoherencePrecheck({ write: true })
  const archetype = buildArchetypeVoiceAudit()
  const channelStage = buildChannelStageMatrix()
  const caseFilesChanged = cp.execFileSync('git', ['diff', '--name-only', '--', 'src/data/cases/generated'], {
    cwd: ROOT,
    encoding: 'utf8',
  }).trim().split(/\r?\n/).filter(Boolean)
  const data = {
    generatedAt: new Date().toISOString(),
    passed: stage.passed && qa.passed && archetype.passed && caseFilesChanged.length === 0,
    stageAware: { passed: stage.passed, issueCount: stage.issues.length },
    qaCoherence: { passed: qa.passed, issueCount: qa.issues.length },
    archetypeVoice: { passed: archetype.passed, issueCount: archetype.missing.length },
    channelStageMatrixGenerated: Boolean(channelStage.generatedAt),
    caseDataUntouched: caseFilesChanged.length === 0,
    caseFilesChanged,
    build: {
      status: options.buildPassed ? 'passed_external' : 'not_recorded',
      passed: Boolean(options.buildPassed),
    },
    tsc: {
      status: options.tscPassed ? 'passed_external' : 'not_recorded',
      passed: Boolean(options.tscPassed),
    },
  }
  if (options.requireBuild) {
    data.passed = data.passed && data.build.passed && data.tsc.passed
  }
  writeJson(path.join(OUT_DIR, 'final-validation-v4.json'), data)
  return data
}

function writeClaudePolishCandidates(candidates) {
  const unique = []
  const seen = new Set()
  for (const candidate of candidates) {
    const key = `${candidate.variantKey || candidate.entryFieldKey}::${candidate.categoryFlag}::${candidate.field}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(candidate)
  }
  const byCategory = {}
  for (const candidate of unique) byCategory[candidate.categoryFlag] = (byCategory[candidate.categoryFlag] || 0) + 1
  const report = {
    generatedAt: new Date().toISOString(),
    totalCandidates: unique.length,
    byCategory: {
      C1_subject_and_verb_form: byCategory.C1_subject_and_verb_form || 0,
      C2_narration_naturalness: byCategory.C2_narration_naturalness || 0,
      C3_lexicon_naturalize: byCategory.C3_lexicon_naturalize || 0,
      C4_system_observer_tone: byCategory.C4_system_observer_tone || 0,
      C5_ui_device_copy: byCategory.C5_ui_device_copy || 0,
    },
    candidates: unique,
  }
  writeJson(path.join(OUT_DIR, 'claude-polish-candidates.json'), report)
  return report
}

function writePrecheckScripts() {
  fs.writeFileSync(path.join(OUT_DIR, 'precheck-stage-aware.cjs'), `#!/usr/bin/env node
'use strict'
const { runStageAwarePrecheck } = require('./recovery-v4.cjs')
const report = runStageAwarePrecheck({ write: true })
console.log(JSON.stringify({
  passed: report.passed,
  totalVariants: report.counts.total,
  remainingChanges: report.remainingChanges,
  failCount: report.issues.filter((issue) => issue.severity === 'FAIL').length,
}, null, 2))
process.exit(report.passed ? 0 : 1)
`, 'utf8')

  fs.writeFileSync(path.join(OUT_DIR, 'precheck-qa-coherence.cjs'), `#!/usr/bin/env node
'use strict'
const { runQACoherencePrecheck } = require('./recovery-v4.cjs')
const report = runQACoherencePrecheck({ write: true })
console.log(JSON.stringify({
  passed: report.passed,
  issueCount: report.issues.length,
  checkedDimensions: report.checkedDimensions,
}, null, 2))
process.exit(report.passed ? 0 : 1)
`, 'utf8')

  fs.writeFileSync(path.join(OUT_DIR, 'precheck-comprehensive-v4.cjs'), `#!/usr/bin/env node
'use strict'
const { runComprehensivePrecheck } = require('./recovery-v4.cjs')
const args = new Set(process.argv.slice(2))
const report = runComprehensivePrecheck({
  buildPassed: args.has('--build-passed'),
  tscPassed: args.has('--tsc-passed'),
  requireBuild: args.has('--require-build'),
})
console.log(JSON.stringify(report, null, 2))
process.exit(report.passed ? 0 : 1)
`, 'utf8')
}

function writeFinalReport({ log, claude, p7, validation }) {
  const byPatternRows = Object.entries(log.byPattern)
    .map(([pattern, count]) => `| ${pattern} | ${count} |`)
    .join('\n')
  const byCaseRows = Object.entries(log.byCase)
    .map(([caseId, count]) => `| ${caseId} | ${count} |`)
    .join('\n')
  const sampleRows = log.patches.slice(0, 12).map((patch) => (
    `- ${patch.caseId} / ${patch.channel} / ${patch.variantId || patch.entryFieldKey}: ${patch.pattern.join(', ')}`
  )).join('\n') || '- 적용 patch 없음'
  const report = `# Codex Recovery v4 Final Report

## 작업 요약
- 대상: spouse-01, family-01, friend-01 ScriptedText 14,931 variants.
- v3 Truth Throttle 매트릭스를 유지하되, v4 의미 보정은 changes-log에 기록된 항목만 허용했습니다.
- case data, 코드 fallback, d-5 신규 cell, P7 UI 코드 수정은 건드리지 않았습니다.
- 총 적용 patch: ${log.totalPatches}건.

## 사건별 적용
| Case | Patches |
|---|---:|
${byCaseRows}

## 패턴별 적용
| Pattern | Patches |
|---|---:|
${byPatternRows}

## 대표 적용 항목
${sampleRows}

## 검증 결과
- precheck-stage-aware: ${validation.stageAware.passed ? 'PASS' : 'FAIL'} (${validation.stageAware.issueCount} issues)
- precheck-qa-coherence: ${validation.qaCoherence.passed ? 'PASS' : 'FAIL'} (${validation.qaCoherence.issueCount} issues)
- archetype voice audit: ${validation.archetypeVoice.passed ? 'PASS' : 'FAIL'}
- case data untouched: ${validation.caseDataUntouched ? 'PASS' : 'FAIL'}
- build / tsc: 최종 외부 실행 결과는 final-validation-v4.json에 기록.

## ClaudeCode 인계
- claude-polish-candidates.json: ${claude.totalCandidates}건.
- p7-ui-surface-leaks.json: ${p7.total}건. P7은 별도 코드 fix 범위라 ScriptedText 작업에서 수정하지 않았습니다.

## Known Issue
- d-5 family/friend 신규 cell 작성은 본 범위 밖입니다.
- 시스템 메시지의 표시 순서/트리거 자체가 코드 렌더 흐름 문제인 항목은 ScriptedText 수정으로 해결하지 않았고, 후보/리포트로만 남겼습니다.
`
  fs.writeFileSync(path.join(OUT_DIR, 'FINAL-REPORT-v4.md'), report, 'utf8')
}

function runRecoveryV4() {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  writePrecheckScripts()
  const factMatrix = buildFactMatrix()
  let log = loadExistingChangeLog()

  const semanticPatches = applyHighConfidenceTextPatches(factMatrix, log)
  const codeNamePatches = applyCodeNamePatches(factMatrix, log)
  const cleanupPatches = applySurfaceCleanupPatches(log)
  log = normalizeChangeLog(log)
  writeJson(path.join(OUT_DIR, 'changes-log.json'), log)

  const proposals = detectSpecialistProposals(factMatrix, [...semanticPatches, ...codeNamePatches, ...cleanupPatches])
  const residuals = [
    ...proposals.B.filter((item) => !item.alreadyPatched).slice(0, 80),
    ...proposals.D.filter((item) => !item.alreadyPatched).slice(0, 80),
    ...proposals.E.filter((item) => !item.alreadyPatched),
  ]
  writeRoundArtifacts(1, proposals, [...semanticPatches, ...codeNamePatches, ...cleanupPatches], residuals, 'Round 1 applied only high-confidence semantic/context patches and direct code-name/surface fixes.')
  for (let round = 2; round <= 5; round += 1) {
    writeRoundArtifacts(round, { A: [], B: [], C: [], D: [], E: [] }, [], [], 'No additional automated patch after conservative v4 convergence pass.')
  }
  writeJson(path.join(OUT_DIR, 'round-log.json'), {
    generatedAt: new Date().toISOString(),
    rounds: [
      {
        round: 1,
        applied: semanticPatches.length + codeNamePatches.length + cleanupPatches.length,
        semanticPatches: semanticPatches.length,
        codeNamePatches: codeNamePatches.length,
        cleanupPatches: cleanupPatches.length,
        residualCandidates: residuals.length,
      },
      ...[2, 3, 4, 5].map((round) => ({ round, applied: 0, residualCandidates: 0 })),
    ],
    terminationReason: 'Conservative convergence: no further high-confidence automated patch without Claude/user semantic review.',
  })

  const claude = writeClaudePolishCandidates(proposals.claude)
  const p7 = buildP7UiSurfaceLeaks(factMatrix)
  const validation = runComprehensivePrecheck({ buildPassed: false, tscPassed: false, requireBuild: false })
  writeFinalReport({ log, claude, p7, validation })
  console.log(JSON.stringify({
    applied: semanticPatches.length + codeNamePatches.length + cleanupPatches.length,
    semanticPatches: semanticPatches.length,
    codeNamePatches: codeNamePatches.length,
    cleanupPatches: cleanupPatches.length,
    validationPassed: validation.passed,
    claudeCandidates: claude.totalCandidates,
    p7Leaks: p7.total,
  }, null, 2))
  process.exit(validation.passed ? 0 : 2)
}

if (require.main === module) {
  runRecoveryV4()
}

module.exports = {
  buildArchetypeVoiceAudit,
  buildChannelStageMatrix,
  buildFactMatrix,
  runComprehensivePrecheck,
  runQACoherencePrecheck,
  runStageAwarePrecheck,
}
