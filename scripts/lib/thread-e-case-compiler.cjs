const fs = require('fs')
const path = require('path')
const { parseThreadECase } = require('./thread-e-case-parser.cjs')
const { pickJudgeReference } = require('./judge-reference-utils.cjs')

const RENEWAL_REF_DIR = '리뉴얼참고'

function normalizeSpaces(value) {
  return String(value || '')
    .replace(/\r/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .trim()
}

const CATEGORY_DEFAULTS = {
  spouse: { relationshipType: 'spouse', contextType: 'family_decision' },
  family: { relationshipType: 'family', contextType: 'family_archive' },
  friend: { relationshipType: 'friend', contextType: 'friendship_breach' },
  neighbor: { relationshipType: 'neighbor', contextType: 'resident_conflict' },
  partnership: { relationshipType: 'partnership', contextType: 'business_conflict' },
  tenant: { relationshipType: 'tenant_landlord', contextType: 'lease_conflict' },
  workplace: { relationshipType: 'boss_employee', contextType: 'workplace_dispute' },
  online: { relationshipType: 'headline', contextType: 'platform_conflict' },
  professional: { relationshipType: 'headline', contextType: 'professional_dispute' },
  civic: { relationshipType: 'headline', contextType: 'civic_review' },
}

const CATEGORY_WITNESSES = {
  spouse: [
    ['tp-1', 'family_1', '가족 상담 동행인', 'both'],
    ['tp-2', 'acquaintance_1', '병원 접수 담당자', 'both'],
    ['tp-3', 'institutional', '문서 검토 기관 담당자', 'both'],
  ],
  family: [
    ['tp-1', 'family_1', '가족 보관자료 열람자', 'both'],
    ['tp-2', 'family_2', '가까운 친척', 'both'],
    ['tp-3', 'institutional', '기록 보관기관 담당자', 'both'],
  ],
  friend: [
    ['tp-1', 'acquaintance_1', '현장 동행인', 'both'],
    ['tp-2', 'acquaintance_2', '브랜드 담당자', 'both'],
    ['tp-3', 'institutional', '공적 기록 검토자', 'both'],
  ],
  neighbor: [
    ['tp-1', 'acquaintance_1', '관리사무소 직원', 'both'],
    ['tp-2', 'acquaintance_2', '입주민 대표', 'both'],
    ['tp-3', 'institutional', '구청 실무자', 'both'],
  ],
  partnership: [
    ['tp-1', 'acquaintance_1', '내부 실무 리드', 'both'],
    ['tp-2', 'acquaintance_2', '외부 협상 상대', 'both'],
    ['tp-3', 'institutional', '감사 또는 기관 담당자', 'both'],
  ],
  tenant: [
    ['tp-1', 'acquaintance_1', '관리실 직원', 'both'],
    ['tp-2', 'acquaintance_2', '중개 관련 실무자', 'both'],
    ['tp-3', 'institutional', '공공 민원 담당자', 'both'],
  ],
  workplace: [
    ['tp-1', 'acquaintance_1', '동료 직원', 'both'],
    ['tp-2', 'acquaintance_2', 'HR 또는 법무 담당자', 'both'],
    ['tp-3', 'institutional', '외부 검토 담당자', 'both'],
  ],
  online: [
    ['tp-1', 'acquaintance_1', '플랫폼 운영자', 'both'],
    ['tp-2', 'acquaintance_2', '브랜드 또는 파트너 담당자', 'both'],
    ['tp-3', 'institutional', '외부 검토자', 'both'],
  ],
  professional: [
    ['tp-1', 'acquaintance_1', '현장 보조 인력', 'both'],
    ['tp-2', 'acquaintance_2', '동료 전문가', 'both'],
    ['tp-3', 'institutional', '기관 담당자', 'both'],
  ],
  civic: [
    ['tp-1', 'acquaintance_1', '심사 또는 행정 보조자', 'both'],
    ['tp-2', 'acquaintance_2', '외부 검토 참여자', 'both'],
    ['tp-3', 'institutional', '행정 담당자', 'both'],
  ],
}

function getThreadESpecPath(root, caseId) {
  const candidates = [
    path.join(root, 'scripts', 'specs', 'thread-e-replacements', `${caseId}.cjs`),
    path.join(root, 'scripts', 'specs', 'thread-e', `${caseId}.cjs`),
  ]
  return candidates.find((candidate) => fs.existsSync(candidate)) || null
}

function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function writeJson(filePath, value) {
  ensureParentDir(filePath)
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function clean(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function clip(value, max = 96) {
  const text = clean(value)
  if (text.length <= max) return text
  return `${text.slice(0, max - 1).trim()}…`
}

function pascal(value) {
  return String(value)
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function unique(values) {
  return [...new Set((values || []).filter(Boolean))]
}

function hasBatchim(value) {
  const text = String(value || '').trim()
  if (!text) return false

  const lastChar = text[text.length - 1]
  const code = lastChar.charCodeAt(0)
  if (code >= 0xac00 && code <= 0xd7a3) {
    return (code - 0xac00) % 28 !== 0
  }

  if (/\d/.test(lastChar)) {
    return ['0', '1', '3', '6', '7', '8'].includes(lastChar)
  }

  return false
}

function selectParticle(value, kind) {
  if (kind === 'topic') return hasBatchim(value) ? '은' : '는'
  if (kind === 'subject') return hasBatchim(value) ? '이' : '가'
  if (kind === 'object') return hasBatchim(value) ? '을' : '를'
  if (kind === 'with') return hasBatchim(value) ? '과' : '와'
  return ''
}

function withParticle(value, kind) {
  return `${value}${selectParticle(value, kind)}`
}

function joinWith(first, second) {
  return `${first}${selectParticle(first, 'with')} ${second}`
}

function inferSensitivityTags(parsed) {
  const haystack = [parsed.title, parsed.hook, parsed.midTwist, parsed.dilemma].join(' ')
  const tags = []
  const rules = [
    [/병원|진료|의료|응급|배아|불임|정신건강/u, ['medical_privacy']],
    [/냉동배아|생식|임신|출산/u, ['reproductive_decision']],
    [/가족폭력|트라우마|폭력 기록/u, ['trauma_record']],
    [/딥보이스|딥페이크|음성모델|가짜 사과/u, ['deepfake', 'platform_reputation']],
    [/개인정보|실명|비식별|CSV|데이터룸/u, ['personal_data']],
    [/보증금|임대|공실|난방|전세|누수/u, ['housing_rights']],
    [/옵션|인수사|잔류보너스|이사회/u, ['stock_option', 'labor_rights']],
    [/심사표|행정|심사|청탁/u, ['institutional_trust']],
  ]

  for (const [re, found] of rules) {
    if (re.test(haystack)) tags.push(...found)
  }
  return unique(tags).slice(0, 5)
}

function inferEvidenceType(name) {
  const text = clean(name)
  if (/문자|채팅|DM|메신저|슬랙|메일|대화/u.test(text)) return 'chat'
  if (/CCTV|영상|사진|캡처|스냅샷|파형/u.test(text)) return 'cctv'
  if (/계약|동의서|제안서|메모|평가표|문안|보고서|문서/u.test(text)) return 'contract'
  if (/앱|포털|로그|시각표|이력|대시보드|리포트|비교표|시계열|GPX/u.test(text)) return 'log'
  if (/기기|파일|ZIP|원본|CSV|음성|녹취|해시/u.test(text)) return 'device'
  if (/릴스|업로드|SNS|게시/u.test(text)) return 'sns'
  return 'log'
}

function inferProvenance(name) {
  const text = clean(name)
  if (/병원|기관|구청|관리실|행정|이사회|심사|공공|플랫폼/u.test(text)) return 'institutional'
  if (/메신저|캡처|사진|릴스|음성|메일/u.test(text)) return 'third_party'
  return 'self_possessed'
}

function inferLegitimacy(name) {
  const text = clean(name)
  if (/무단|유출|사적|실명|개인정보|원본/u.test(text)) return 'privacy_concern'
  return 'lawful'
}

function inferInvestigationResults(name, hook, dilemma) {
  return {
    request_original: `${name}의 원본과 생성 경위를 확인하면 누가 먼저 사실을 비틀었는지 보입니다.`,
    check_metadata: `${name}의 시각, 작성 주체, 전달 경로를 비교하면 말이 바뀐 지점을 좁힐 수 있습니다.`,
    restore_context: `${name} 전후 맥락을 복원하면 같은 자료가 누구에게 유리하게 잘렸는지 드러납니다.`,
    verify_source: `${name}의 출처를 분리하면 기관 기록인지, 개인이 만든 해석인지 선이 잡힙니다.`,
    check_edits: `${name}에서 생략되거나 편집된 조각을 다시 붙이면 숨긴 의도가 보입니다.`,
    question_acquisition: `${name}를 어떤 경로로 손에 넣었는지까지 봐야 책임과 적법성을 함께 나눌 수 있습니다.`,
    note_a: clip(hook, 84),
    note_b: clip(dilemma, 84),
  }
}

function digitalHabitFor(category) {
  if (category === 'online') return 'sns_active'
  if (category === 'civic') return 'minimal'
  if (category === 'partnership') return 'banking_app_heavy'
  return 'messenger_main'
}

function faceTypeFor(roleText) {
  return /대표|리드|실장|관리인|소유주|운영자|담당자|심사역|매니저|CFO|PD/u.test(roleText) ? 'man' : 'woman'
}

function speechStyleFor(strategy) {
  const map = {
    cold_logic: '질문이 들어오면 감정 대신 기록과 순서를 먼저 꺼내며 책임을 계산 문제처럼 분리해 말한다.',
    avoidant: '불리한 부분은 범위를 줄여 말하고, 질문이 날카로워질수록 기억이 흐릿했다는 식으로 뒤로 빠진다.',
    confrontational: '상대의 책임을 먼저 세게 지적하고, 자기 설명은 그 반격 속에 끼워 넣는다.',
    victim_cosplay: '자신도 상황에 휩쓸린 피해자였다고 먼저 깔고, 책임 질문은 구조와 압박 이야기로 넓힌다.',
    premature_summary: '결론을 먼저 말하고 세부는 나중에 붙이며, 전체 틀을 선점해 불리한 사실의 무게를 줄이려 한다.',
    affect_flattening: '중요한 장면도 건조하게 말해 무게를 낮추고, 감정이 드러나는 순간 다시 톤을 눌러 책임을 희석한다.',
  }
  return map[strategy] || '불리한 질문이 오면 표현을 바꿔 사실의 무게를 줄이려 한다.'
}

function verbalTellsFor(strategy) {
  const presets = {
    cold_logic: [
      ['scope_blur', '질문이 좁혀오면 범주를 넓혀 계산 문제처럼 다시 정의한다.'],
      ['burden_shift', '개인 책임을 조직 사정이나 구조 문제로 재배치한다.'],
      ['tone_flat', '결정적인 장면도 평평한 톤으로 말해 무게를 낮춘다.'],
    ],
    avoidant: [
      ['narrow_recall', '불리한 시점이 나오면 기억 범위를 갑자기 좁힌다.'],
      ['soften', '강한 표현을 완곡한 말로 바꿔 자신이 한 선택의 온도를 낮춘다.'],
      ['skip_context', '직전 맥락을 건너뛰고 현재 장면만 따로 떼어 말한다.'],
    ],
    confrontational: [
      ['blame_forward', '자신의 설명보다 상대 비난을 먼저 꺼낸다.'],
      ['counter_hit', '질문을 받으면 다른 잘못을 역으로 들이민다.'],
      ['overstate', '상대의 행위를 실제보다 더 의도적이었던 것처럼 키운다.'],
    ],
    victim_cosplay: [
      ['victim_frame', '스스로도 휩쓸린 피해자였다는 프레임을 먼저 건다.'],
      ['helplessness', '선택권이 거의 없었다는 식으로 책임의 출발점을 흐린다.'],
      ['soft_confession', '작은 인정으로 큰 책임을 비껴 가려 한다.'],
    ],
    premature_summary: [
      ['summary_first', '결론을 먼저 박아 두고 세부 질문을 그 결론 안으로 끌어들인다.'],
      ['rights_shield', '개인 계산을 원칙이나 집단 권리 뒤에 숨긴다.'],
      ['collapse_details', '복잡한 경위를 두세 문장으로 압축해 결의 단서를 없앤다.'],
    ],
    affect_flattening: [
      ['minimize_heat', '중요한 장면도 별일 아니라는 톤으로 말한다.'],
      ['equalize', '서로 다른 무게의 잘못을 비슷한 것처럼 맞춰 놓는다.'],
      ['detach', '자기 판단과 그 결과 사이를 인위적으로 멀리 둔다.'],
    ],
  }
  return (presets[strategy] || [['generic_shift', '표현을 바꿔 사실의 무게를 줄이려 한다.']])
    .map(([type, pattern]) => ({ type, trigger: 'cornered', pattern }))
}

function callTermsFor(parsed, partyKey) {
  const self = partyKey === 'a' ? parsed.partyA : parsed.partyB
  const other = partyKey === 'a' ? parsed.partyB : parsed.partyA
  const lastName = other.name ? `${other.name.slice(0, 1)}${other.name.slice(1)} 씨` : '상대방'
  const otherRole = normalizeSpaces(other.role)
  const category = parsed.category
  const neutralJudge = pickJudgeReference('', {
    otherRole,
    relationshipType: CATEGORY_DEFAULTS[category]?.relationshipType || 'headline',
    party: partyKey,
  })
  return {
    toPartner: self.category === 'spouse' ? other.name : lastName,
    toJudge: neutralJudge,
    angry: lastName,
  }
}

function knowledgeQuadrant(index) {
  return ['both_know', 'a_only', 'b_only', 'shared_misconception', 'neither_knows'][index % 5]
}

function responsibilitySplit(index) {
  const presets = [
    { a: 75, b: 25 },
    { a: 35, b: 65 },
    { a: 55, b: 45 },
    { a: 60, b: 40 },
    { a: 50, b: 50 },
  ]
  return presets[index % presets.length]
}

function buildDisputes(parsed) {
  return parsed.disputes.map((item, index) => ({
    id: item.id,
    name: item.name,
    truth: true,
    truthDescription: `${withParticle(item.name, 'topic')} 표면 주장보다 실제 경위와 의도 분리가 더 중요하게 드러난다.`,
    quadrant: knowledgeQuadrant(index),
    requiredEvidence: [`e-${Math.min(index + 1, 3)}`],
    correctResponsibility: responsibilitySplit(index),
    ambiguity: index === 0 ? 'low' : 'high',
    weight: index < 3 ? 'high' : 'medium',
    mediationLink: clip(item.name, 28),
    legitimacyIssue: /동의|개인정보|위법|공개|유출|접근/u.test(parsed.dilemma),
    judgmentStatement: `${withParticle(item.name, 'topic')} 단순 비난보다 경위 확인이 먼저 필요한 쟁점이다.`,
  }))
}

function buildEvidence(parsed, disputes) {
  const sequence = [
    ...parsed.evidenceChain.initial.map((item) => ({
      ...item,
      requires: [],
      requiredLieState: undefined,
      stage: 1,
    })),
    parsed.evidenceChain.unlock1 ? { ...parsed.evidenceChain.unlock1, stage: 2 } : null,
    parsed.evidenceChain.unlock2 ? { ...parsed.evidenceChain.unlock2, stage: 2 } : null,
    parsed.evidenceChain.unlock3 ? { ...parsed.evidenceChain.unlock3, stage: 3 } : null,
    parsed.evidenceChain.final ? { ...parsed.evidenceChain.final, stage: 3 } : null,
  ].filter(Boolean)

  return sequence.map((item, index) => {
    const proved = [disputes[Math.min(index, disputes.length - 1)]?.id].filter(Boolean)
    if (disputes[index + 1]) proved.push(disputes[index + 1].id)
    return {
      id: item.id,
      name: item.name,
      surfaceName: item.name,
      description: `${item.name}. ${clip(parsed.hook, 96)}`,
      surfaceDescription: clip(item.name, 64),
      type: inferEvidenceType(item.name),
      reliability: 'hard',
      completeness: item.stage >= 3 ? 'original' : 'partial',
      provenance: inferProvenance(item.name),
      legitimacy: inferLegitimacy(item.name),
      proves: proved,
      isTrap: /편집|허위|실명|유출|왜곡/u.test(item.name),
      requires: item.requires || [],
      ...(item.minState ? { requiredLieState: item.minState } : {}),
      subjectParty: index % 2 === 0 ? 'a' : 'b',
      investigationResults: inferInvestigationResults(item.name, parsed.hook, parsed.dilemma),
    }
  })
}

function buildTruthTable(parsed, disputes) {
  const facts = [
    `${withParticle(parsed.partyA.name, 'topic')} ${parsed.partyA.hiddenTruth}`,
    `${withParticle(parsed.partyB.name, 'topic')} ${parsed.partyB.hiddenTruth}`,
    clip(parsed.midTwist, 140),
    `${parsed.title}의 핵심 충돌은 ${disputes[0]?.name || '첫 쟁점'}에서 선명해진다.`,
    clip(parsed.dilemma, 140),
  ]
  return facts.map((fact, index) => ({
    id: `t-${index + 1}`,
    fact,
    isTrue: true,
    weight: index < 2 ? 10 : 8,
    quadrant: knowledgeQuadrant(index),
  }))
}

function motiveFor(strategy) {
  return {
    cold_logic: 'career_preservation',
    avoidant: 'self_protection',
    confrontational: 'revenge',
    victim_cosplay: 'face_saving',
    premature_summary: 'self_protection',
    affect_flattening: 'career_preservation',
  }[strategy] || 'self_protection'
}

function lieTypeFor(strategy) {
  return {
    cold_logic: 'LT-4',
    avoidant: 'LT-2',
    confrontational: 'LT-3',
    victim_cosplay: 'LT-6',
    premature_summary: 'LT-1',
    affect_flattening: 'LT-7',
  }[strategy] || 'LT-2'
}

function buildLieConfigFor(partyKey, party, disputes) {
  return disputes.map((dispute) => ({
    disputeId: dispute.id,
    lieType: lieTypeFor(party.lieStrategy),
    lieIntensity: dispute.weight === 'high' ? 'L3' : 'L2',
    lieMotive: motiveFor(party.lieStrategy),
    initialState: 'S0',
    collapseViaTrust: /avoidant|victim_cosplay/.test(party.lieStrategy),
    transitions: [
      { from: 'S0', to: 'S1', trigger: `${dispute.id}_${partyKey}_timeline_question` },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: 'S3', trigger: `${dispute.id}_${partyKey}_responsibility_question` },
      { from: 'S3', to: 'S5', trigger: `${dispute.id}_${partyKey}_final_pressure` },
    ],
  }))
}

function buildSolutions(parsed, disputes) {
  return {
    공개시정: [
      `${parsed.title} 관련 핵심 경위를 공개 시정문과 함께 정리한다.`,
      `${disputes[0]?.name || '핵심 쟁점'}은 공개 설명 대상으로 둔다.`,
    ],
    조건부정리: [
      `${joinWith(parsed.partyA.name, parsed.partyB.name)}의 책임 비율을 나눠 조건부 정리한다.`,
      `${disputes[1]?.name || disputes[0]?.name || '보조 쟁점'}은 후속 확인을 붙인다.`,
    ],
    보호우선: [
      `민감 정보와 제3자 피해가 큰 부분은 비공개로 보호한다.`,
      `${clip(parsed.dilemmaAxes.join(' / '), 60)} 가운데 보호가 필요한 축을 먼저 잠근다.`,
    ],
  }
}

function witnessProfile(name, relationToA, relationToB, role, bias) {
  const baseSentiment = bias === 'pro_a' ? [35, -5] : bias === 'pro_b' ? [-5, 35] : [10, 10]
  return {
    age: 41,
    occupation: role,
    relationToA,
    relationToB,
    sentimentToA: baseSentiment[0],
    sentimentToB: baseSentiment[1],
    speechStyle: `${withParticle(name, 'topic')} 자신이 직접 본 범위는 단정적으로 말하지만, 의도 추정은 조심스럽게 분리한다.`,
    addressJudge: '재판장님',
    addressA: 'A측',
    addressB: 'B측',
  }
}

function buildWitnesses(parsed, disputes) {
  const templates = CATEGORY_WITNESSES[parsed.category] || CATEGORY_WITNESSES.workplace
  return templates.map(([id, slot, role, relationTo], index) => ({
    id,
    slot,
    name: role,
    relationTo,
    knowledgeScope: `${parsed.title} 관련 ${disputes[index]?.name || disputes[0]?.name || '핵심 쟁점'}의 전후 맥락을 확인할 수 있다.`,
    witnessedDirectly: true,
    bias: index === 0 ? 'pro_a' : index === 1 ? 'pro_b' : 'neutral',
    distortionRisk: index === 2 ? 'accurate' : 'strategic',
    relatedDisputeIds: unique([
      disputes[index]?.id,
      disputes[index + 1]?.id,
      disputes[0]?.id,
    ]),
    witnessProfile: witnessProfile(
      role,
      `${withParticle(parsed.partyA.name, 'with')} 업무 또는 생활 맥락으로 연결된다.`,
      `${withParticle(parsed.partyB.name, 'with')} 같은 사건 흐름에서 접점이 있다.`,
      role,
      index === 0 ? 'pro_a' : index === 1 ? 'pro_b' : 'neutral',
    ),
  }))
}

function buildRelationshipLedger(parsed) {
  return [
    {
      id: 'ledger-1',
      category: 'confirmed',
      description: `${joinWith(parsed.partyA.name, parsed.partyB.name)}${selectParticle(parsed.partyB.name, 'topic')} 이전부터 ${withParticle(clip(parsed.title, 40), 'with')} 비슷한 긴장을 안고 있었다.`,
      isReal: true,
      whoRemembersAccurately: 'both',
      whoDistorts: 'none',
      distortionDirection: '',
      currentlyResolved: 'surface_only',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-2',
      category: 'distorted',
      description: `${clip(parsed.midTwist, 88)}`,
      isReal: true,
      whoRemembersAccurately: 'both',
      whoDistorts: 'both',
      distortionDirection: 'A와 B가 각자 유리한 순서대로 기억을 정리하고 있다.',
      currentlyResolved: 'unresolved',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
    {
      id: 'ledger-3',
      category: 'silenced',
      description: `${withParticle(parsed.partyA.name, 'topic')} ${clip(parsed.partyA.hiddenTruth, 64)}. ${withParticle(parsed.partyB.name, 'topic')} ${clip(parsed.partyB.hiddenTruth, 64)}.`,
      isReal: true,
      whoRemembersAccurately: 'both',
      whoDistorts: 'none',
      distortionDirection: '',
      currentlyResolved: 'surface_only',
      emotionalResidue: 'strong',
      connectionToCurrent: 'direct',
    },
  ]
}

function buildRuntimeCase(parsed) {
  const defaults = CATEGORY_DEFAULTS[parsed.category] || CATEGORY_DEFAULTS.workplace
  const disputes = buildDisputes(parsed)
  const evidence = buildEvidence(parsed, disputes)
  return {
    caseId: `case-${parsed.caseId}`,
    sensitivityTags: inferSensitivityTags(parsed),
    meta: {
      relationshipType: defaults.relationshipType,
      conflictSeed: `TE-${pascal(parsed.caseId)}`,
      variableModules: [`VM-${parsed.category}-a`, `VM-${parsed.category}-b`],
      twistModule: `TW-${parsed.category}-1`,
      difficulty: parsed.difficulty || 'medium',
      anchorTruth: `${withParticle(parsed.partyA.name, 'topic')} ${parsed.partyA.hiddenTruth}. ${withParticle(parsed.partyB.name, 'topic')} ${parsed.partyB.hiddenTruth}.`,
      emotionalBait: clip(parsed.hook, 180),
      resolutionDilemma: clip(parsed.dilemma, 180),
    },
    duo: {
      duoId: `duo-${parsed.caseId}`,
      relationshipType: defaults.relationshipType,
      partyA: {
        id: 'a',
        name: parsed.partyA.name,
        age: parsed.partyA.age,
        occupation: parsed.partyA.role,
        incomeBracket: 'mid',
        archetype: parsed.partyA.lieStrategy,
        speechStyle: speechStyleFor(parsed.partyA.lieStrategy),
        pride: 7,
        fear: `${parsed.title}에서 자신의 선택이 중심 책임으로 고정되는 것을 두려워한다.`,
        riskAppetite: 6,
        digitalHabit: digitalHabitFor(parsed.category),
        dailyRoutine: `${withParticle(parsed.title, 'with')} 연결된 자료와 일정, 연락 흔적을 수시로 확인하며 자신의 설명 순서를 정리한다.`,
        sensitivePoints: disputes.slice(0, 3).map((item) => item.name),
        verbalTells: verbalTellsFor(parsed.partyA.lieStrategy),
        callTerms: callTermsFor(parsed, 'a'),
        pcFaceType: faceTypeFor(parsed.partyA.role),
      },
      partyB: {
        id: 'b',
        name: parsed.partyB.name,
        age: parsed.partyB.age,
        occupation: parsed.partyB.role,
        incomeBracket: 'mid',
        archetype: parsed.partyB.lieStrategy,
        speechStyle: speechStyleFor(parsed.partyB.lieStrategy),
        pride: 7,
        fear: `${parsed.title}에서 자신의 계산과 숨김이 먼저 들통날까 두려워한다.`,
        riskAppetite: 6,
        digitalHabit: digitalHabitFor(parsed.category),
        dailyRoutine: `${withParticle(parsed.title, 'with')} 관련된 기록, 메신저, 일정표를 다시 보며 자기 설명에 필요한 근거를 먼저 확보하려 한다.`,
        sensitivePoints: disputes.slice(1, 4).map((item) => item.name),
        verbalTells: verbalTellsFor(parsed.partyB.lieStrategy),
        callTerms: callTermsFor(parsed, 'b'),
        pcFaceType: faceTypeFor(parsed.partyB.role),
      },
      relationshipLedger: buildRelationshipLedger(parsed),
      socialGraph: buildWitnesses(parsed, disputes),
    },
    context: {
      contextType: defaults.contextType,
      description: clip(parsed.hook, 180),
      emotionalPressure: parsed.difficulty === 'hard' ? 9 : parsed.difficulty === 'easy' ? 6 : 8,
      affects: 'both',
      triggerAmplifier: clip(parsed.midTwist || parsed.dilemma, 180),
      caseNumber: `TE-${pascal(parsed.caseId)}`,
      caseName: parsed.title,
    },
    disputes,
    evidence,
    evidenceCombinations: parsed.evidenceChain.combinations
      .filter((item) => item.requires.length >= 2)
      .slice(0, 3)
      .map((item, index) => ({
        requires: item.requires,
        upgradesTo: 'hard',
        proves: unique([
          disputes[index]?.id,
          disputes[index + 1]?.id,
        ]),
        description: item.description,
      })),
    truthTable: buildTruthTable(parsed, disputes),
    lieConfigA: buildLieConfigFor('a', parsed.partyA, disputes.slice(0, Math.min(3, disputes.length))),
    lieConfigB: buildLieConfigFor('b', parsed.partyB, disputes.slice(Math.max(0, disputes.length - Math.min(3, disputes.length)))),
    solutions: buildSolutions(parsed, disputes),
    activeLedgerEntries: ['ledger-1', 'ledger-3'],
    activeThirdParties: ['tp-1', 'tp-2', 'tp-3'],
    baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
    monetaryDisputeIds: /금|보상|손해|비용|정산|보증금|행사/u.test(`${parsed.hook} ${parsed.dilemma}`)
      ? disputes.slice(0, Math.min(2, disputes.length)).map((item) => item.id)
      : [],
  }
}

function buildV3(parsed, runtimeCase) {
  const disputes = runtimeCase.disputes || []
  const evidence = runtimeCase.evidence || []
  const dossierCards = Array.from({ length: Math.min(4, disputes.length) }, (_, index) => {
    const primary = disputes[index] || disputes[0]
    const secondary = disputes[index + 1] || primary
    const evidenceIds = unique([
      evidence[index]?.id,
      evidence[Math.min(index + 3, evidence.length - 1)]?.id,
    ])
    return {
      id: `dossier-${index + 1}`,
      name: clip(primary.name, 24),
      description: `${joinWith(clip(primary.name, 44), clip(secondary.name, 44))}${selectParticle(clip(secondary.name, 44), 'object')} 함께 검토하는 카드입니다.`,
      evidenceIds,
      relatedDisputes: unique([primary.id, secondary.id]),
      subjectParty: 'both',
      challenges: ['a', 'b'].map((party) => ({
        targetParty: party,
        questions: [
          {
            id: `dossier-${index + 1}.${party}.q1`,
            text: `${withParticle(primary.name, 'with')} 관련해 지금 가장 먼저 정리해야 할 누락 사실은 무엇입니까?`,
            attackVector: 'context',
            onSuccess: {
              blockVector: 'context',
              revealAtom: `${parsed.caseId}:${party}:${primary.id}:S2:0`,
              lieAdvance: true,
            },
          },
          {
            id: `dossier-${index + 1}.${party}.q2`,
            text: `${withParticle(secondary.name, 'object')} 따로 떼어 설명하려는 이유는 무엇입니까?`,
            attackVector: 'responsibility',
            onSuccess: {
              blockVector: 'responsibility',
              revealAtom: `${parsed.caseId}:${party}:${secondary.id}:S3:0`,
              lieAdvance: true,
            },
          },
        ],
      })),
    }
  })

  const stateUnlockAtoms = { a: {}, b: {} }
  for (const party of ['a', 'b']) {
    for (const dispute of disputes) stateUnlockAtoms[party][dispute.id] = {}
  }

  for (const card of dossierCards) {
    for (const challenge of card.challenges) {
      for (const question of challenge.questions) {
        const [, party, disputeId, lieState] = String(question.onSuccess.revealAtom).split(':')
        if (!stateUnlockAtoms[party][disputeId][lieState]) stateUnlockAtoms[party][disputeId][lieState] = []
        stateUnlockAtoms[party][disputeId][lieState].push({
          id: question.onSuccess.revealAtom,
          factText: `${card.name} 카드에서 ${party === 'a' ? 'A측' : 'B측'}이 숨기던 설명 조각이 더 드러난다.`,
          tags: ['thread-e', parsed.caseId, disputeId, card.id],
          unlockedAtState: lieState,
          slots: {
            summary: {
              default: `${card.name} 카드에서 추가로 열린 사실입니다.`,
            },
          },
          stanceHints: ['partial', 'blame', 'confess'],
        })
      }
    }
  }

  return {
    caseId: parsed.caseId,
    dossierCards,
    stateUnlockAtoms,
    events: {
      contradictions: [
        {
          id: `${parsed.caseId}-contradiction-1`,
          statementA: `${withParticle(parsed.partyA.name, 'topic')} ${disputes[0]?.name || parsed.title}에서 자신이 더 조심스러웠다고 말한다.`,
          statementB: `${withParticle(parsed.partyB.name, 'topic')} 같은 장면을 상대가 먼저 밀어붙인 결과라고 설명한다.`,
          options: {
            point_out: { label: '정면으로 짚는다', effect: '두 사람의 경위 설명이 더 선명하게 갈린다.' },
            let_go: { label: '다른 축으로 넘긴다', effect: '당장 충돌은 줄지만 구조 책임이 남는다.' },
          },
          npcReaction: '양측 모두 자신에게 유리한 순서로 사건을 다시 정렬하려 한다.',
        },
        {
          id: `${parsed.caseId}-contradiction-2`,
          statementA: parsed.partyA.hiddenTruth,
          statementB: parsed.partyB.hiddenTruth,
          options: {
            point_out: { label: '숨김을 직접 겨눈다', effect: '숨긴 사실과 방어 논리가 동시에 흔들린다.' },
            let_go: { label: '판단을 유보한다', effect: '감정 폭발은 줄지만 해석 충돌이 남는다.' },
          },
          npcReaction: '양측 모두 자기 숨김보다 상대의 선행 잘못을 먼저 강조한다.',
        },
      ],
      interjections: [
        {
          id: `${parsed.caseId}-interjection-a`,
          interruptor: 'a',
          interjectionLine: `${parsed.partyA.name}은 지금 질문이 사건 구조를 너무 단순하게 자른다고 항의한다.`,
          options: {
            allow: { label: '계속 말하게 둔다', effect: 'A측 감정선과 자기정당화가 더 드러난다.' },
            block: { label: '다시 질문으로 돌린다', effect: '핵심 경위를 빠르게 고정한다.' },
          },
        },
        {
          id: `${parsed.caseId}-interjection-b`,
          interruptor: 'b',
          interjectionLine: `${parsed.partyB.name}은 상대가 더 큰 계산을 숨긴 채 자신만 몰고 간다고 반발한다.`,
          options: {
            allow: { label: '계속 반박하게 둔다', effect: 'B측 방어 논리와 공격 포인트가 드러난다.' },
            block: { label: '증거로 다시 묶는다', effect: '감정선을 줄이고 자료 중심으로 되돌린다.' },
          },
        },
      ],
      emotionalOutbursts: [
        {
          id: `${parsed.caseId}-outburst-a`,
          party: 'a',
          outburstLine: `${parsed.partyA.name}은 자신만 계산적으로 몰리는 순간 강하게 반발한다.`,
          options: {
            press: { label: '더 압박한다', effect: 'A측이 숨기던 정당화가 빨리 무너진다.' },
            calm: { label: '정리할 시간을 준다', effect: 'A측이 조금 더 차분하게 경위를 설명한다.' },
          },
        },
        {
          id: `${parsed.caseId}-outburst-b`,
          party: 'b',
          outburstLine: `${parsed.partyB.name}은 상대가 먼저 판을 설계했는데 자신만 더 무겁게 보인다고 폭발한다.`,
          options: {
            press: { label: '구체 책임을 묻는다', effect: 'B측의 반격 논리와 자기 숨김이 함께 흔들린다.' },
            calm: { label: '감정을 눌러 정리한다', effect: 'B측이 구조 책임을 설명할 공간이 생긴다.' },
          },
        },
      ],
    },
    transitionBeats: [
      {
        id: `${parsed.caseId}-beat-a`,
        caseId: parsed.caseId,
        party: 'a',
        disputeId: disputes[0]?.id || 'd-1',
        fromState: 'S1',
        toState: 'S2',
        primaryBeatType: 'evidence_hit',
        line: `${parsed.partyA.name}의 설명에서 빠졌던 연결 고리가 증거와 함께 붙는다.`,
        behaviorHint: '답변 길이가 짧아지고 누락된 부분이 방어 대신 인정 쪽으로 기울기 시작한다.',
      },
      {
        id: `${parsed.caseId}-beat-b`,
        caseId: parsed.caseId,
        party: 'b',
        disputeId: disputes[Math.min(1, disputes.length - 1)]?.id || 'd-1',
        fromState: 'S2',
        toState: 'S3',
        primaryBeatType: 'counter_shift',
        line: `${parsed.partyB.name}은 자기 책임 일부를 인정하면서도 상대의 선행 선택을 다시 끌어온다.`,
        behaviorHint: '상대 비난 문장이 늘고 자기 설명은 더 짧고 단단해진다.',
      },
    ],
  }
}

function supportsThreadENewCase(root, caseId) {
  try {
    loadThreadEParsedCase(root, caseId)
    return true
  } catch {
    return false
  }
}

function loadThreadEParsedCase(root, caseId) {
  const specPath = getThreadESpecPath(root, caseId)
  if (specPath) {
    const exported = require(specPath)
    return typeof exported === 'function' ? exported() : exported
  }
  return parseThreadECase(root, caseId)
}

function compileThreadENewCase(root, caseId) {
  const parsed = loadThreadEParsedCase(root, caseId)
  const runtimeCase = buildRuntimeCase(parsed)
  const v3 = buildV3(parsed, runtimeCase)

  const runtimeOutPath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const v3JsonOutPath = path.join(root, 'docs', 'ref', RENEWAL_REF_DIR, `${caseId}-v3-game-loop-data.json`)
  const v3TsOutPath = path.join(root, 'docs', 'ref', RENEWAL_REF_DIR, `${caseId}-v3-game-loop-data.ts`)

  writeJson(runtimeOutPath, runtimeCase)
  writeJson(v3JsonOutPath, v3)
  ensureParentDir(v3TsOutPath)
  fs.writeFileSync(
    v3TsOutPath,
    `export const ${pascal(caseId)}V3GameLoopData = ${JSON.stringify(v3, null, 2)} as const\n`,
    'utf8',
  )

  return {
    caseId,
    outPath: runtimeOutPath,
    runtimeCase,
    v3,
    parsed,
  }
}

module.exports = {
  supportsThreadENewCase,
  compileThreadENewCase,
  hasThreadECase: supportsThreadENewCase,
  compileThreadECase: compileThreadENewCase,
}
