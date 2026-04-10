const fs = require('fs')
const path = require('path')

const ROOT_REF_DIR = path.join('docs', 'ref', '리뉴얼참고')

const CATEGORY_BATCH_FILE = {
  spouse: 'thread-e-100-new-cases-batch-01-spouse.md',
  family: 'thread-e-100-new-cases-batch-02-family.md',
  friend: 'thread-e-100-new-cases-batch-03-friend.md',
  neighbor: 'thread-e-100-new-cases-batch-04-neighbor.md',
  partnership: 'thread-e-100-new-cases-batch-05-partnership.md',
  tenant: 'thread-e-100-new-cases-batch-06-tenant.md',
  workplace: 'thread-e-100-new-cases-batch-07-workplace.md',
  online: 'thread-e-100-new-cases-batch-08-online.md',
  professional: 'thread-e-100-new-cases-batch-09-professional.md',
  civic: 'thread-e-100-new-cases-batch-10-civic.md',
}

const RELATIONSHIP_TYPE_MAP = {
  spouse: 'spouse',
  family: 'siblings_family',
  friend: 'friends',
  neighbor: 'neighbors',
  partnership: 'business_partners',
  tenant: 'landlord_tenant',
  workplace: 'boss_employee',
  online: 'creator_editor',
  professional: 'professional_client',
  civic: 'reviewer_applicant',
}

const CONTEXT_TYPE_MAP = {
  spouse: 'domestic_document_conflict',
  family: 'family_archive_conflict',
  friend: 'friendship_brand_conflict',
  neighbor: 'neighborhood_collective_conflict',
  partnership: 'data_room_conflict',
  tenant: 'lease_occupancy_conflict',
  workplace: 'employment_rights_conflict',
  online: 'platform_reputation_conflict',
  professional: 'professional_record_conflict',
  civic: 'public_screening_conflict',
}

const CATEGORY_TAGS = {
  spouse: ['domestic_conflict', 'consent', 'relationship_breach'],
  family: ['family_conflict', 'legacy_record', 'reputation'],
  friend: ['friend_conflict', 'creator_brand', 'injury_or_competition'],
  neighbor: ['neighbor_conflict', 'collective_process', 'privacy_or_property'],
  partnership: ['data_governance', 'business_conflict', 'breach_of_trust'],
  tenant: ['housing_rights', 'lease_conflict', 'living_conditions'],
  workplace: ['labor_rights', 'career_risk', 'information_asymmetry'],
  online: ['platform_risk', 'reputation_attack', 'digital_manipulation'],
  professional: ['professional_ethics', 'duty_of_care', 'record_integrity'],
  civic: ['public_integrity', 'screening_process', 'institutional_trust'],
}

const WITNESS_NAME_POOL = [
  '정다윤', '최민석', '한서준', '문서영', '김태윤',
  '오지안', '배수현', '윤도현', '박연서', '임채린',
]

const STRATEGY_STYLE_MAP = {
  cold_logic: '감정을 줄이고 절차와 사정을 먼저 내세우며 책임 범위를 축소하는 식으로 말한다.',
  avoidant: '핵심을 바로 인정하지 않고 주변 사정과 오해 가능성부터 꺼내며 답을 늦춘다.',
  victim_cosplay: '자신도 피해를 입었다는 프레임을 먼저 세운 뒤 불리한 사실은 뒤로 미룬다.',
  premature_summary: '결론부터 먼저 내리고 맥락은 나중에 붙이며 책임 비율을 서둘러 정리하려 든다.',
  confrontational: '상대방의 선행 위반을 강하게 들이밀며 자신의 문제는 상대화하려 한다.',
  affect_flattening: '감정을 누르고 사건을 단순 관리 이슈처럼 축소해서 말한다.',
}

const STRATEGY_TELLS = {
  cold_logic: [
    { type: 'scope_blur', trigger: 'avoiding', pattern: '"범위를 먼저 구분해야 합니다."라며 핵심 책임을 절차 문제로 넓혀 흐린다.' },
    { type: 'burden_shift', trigger: 'cornered', pattern: '"그 부담을 누가 감당합니까."라며 조직·현실 부담으로 개인 책임을 뒤로 민다.' },
  ],
  avoidant: [
    { type: 'hedge', trigger: 'lying', pattern: '"정확히는", "다만", "그때는" 같은 완충 표현을 반복한다.' },
    { type: 'narrow_recall', trigger: 'cornered', pattern: '직접 묻는 부분보다 주변 사정과 기억 불명확성을 먼저 꺼낸다.' },
  ],
  victim_cosplay: [
    { type: 'victim_frame', trigger: 'lying', pattern: '"저도 피해를 본 쪽입니다."라는 식으로 피해자 프레임을 먼저 세운다.' },
    { type: 'moral_flip', trigger: 'cornered', pattern: '자신을 몰아세우는 것이 더 큰 부당함처럼 방향을 틀려 한다.' },
  ],
  premature_summary: [
    { type: 'summary_first', trigger: 'lying', pattern: '"결론은 이겁니다."라며 맥락보다 결론을 먼저 던진다.' },
    { type: 'rights_shield', trigger: 'cornered', pattern: '개인 계산을 집단 권리나 원칙 뒤에 숨긴다.' },
  ],
  confrontational: [
    { type: 'counterattack', trigger: 'lying', pattern: '질문에 답하기보다 상대방 선행 위반을 먼저 들이받는다.' },
    { type: 'blame_push', trigger: 'cornered', pattern: '책임 비율을 묻는 순간 "먼저 시작한 건 상대"라는 문장으로 압박한다.' },
  ],
  affect_flattening: [
    { type: 'tone_flatten', trigger: 'lying', pattern: '정서적 파장을 단순 행정·관리 문제처럼 눌러 말한다.' },
    { type: 'minimize', trigger: 'cornered', pattern: '실질적 피해를 "혼선"이나 "오해" 수준으로 축소한다.' },
  ],
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

function writeJson(filePath, value) {
  ensureDir(filePath)
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function clean(value) {
  return String(value || '').replace(/\r/g, '').replace(/\s+/g, ' ').trim()
}

function uniq(values) {
  return [...new Set((values || []).filter(Boolean))]
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function sentence(value) {
  const text = clean(value)
  if (!text) return ''
  return /[.!?]$/.test(text) ? text : `${text}.`
}

function normalizeCategory(caseId) {
  return String(caseId).split('-new-')[0]
}

function batchDocPath(root, caseId) {
  const category = normalizeCategory(caseId)
  const filename = CATEGORY_BATCH_FILE[category]
  if (!filename) {
    throw new Error(`unsupported wave category: ${category}`)
  }
  return path.join(root, ROOT_REF_DIR, filename)
}

function sectionBetween(raw, startMarker, endMarker) {
  const start = raw.indexOf(startMarker)
  if (start < 0) return ''
  const tail = raw.slice(start + startMarker.length)
  if (!endMarker) return tail.trim()
  const end = tail.indexOf(endMarker)
  return (end >= 0 ? tail.slice(0, end) : tail).trim()
}

function findCaseSection(root, caseId) {
  const filePath = batchDocPath(root, caseId)
  const raw = fs.readFileSync(filePath, 'utf8')
  const headingRe = new RegExp(`^###\\s+.+?\\(\\`${escapeRegExp(caseId)}\\`\\)`, 'm')
  const match = headingRe.exec(raw)
  if (!match) {
    throw new Error(`case section not found for ${caseId} in ${path.relative(root, filePath).replace(/\\/g, '/')}`)
  }
  const start = match.index
  const rest = raw.slice(start)
  const nextHeadingMatch = /\n###\s+/.exec(rest.slice(1))
  const end = nextHeadingMatch ? start + 1 + nextHeadingMatch.index : raw.length
  return raw.slice(start, end).trim()
}

function parseHeading(section, caseId) {
  const firstLine = section.split('\n')[0]
  const match = firstLine.match(/^###\s+.+?\s—\s(.+?)\s—\s.+\(/)
  if (!match) throw new Error(`failed to parse heading for ${caseId}`)
  return clean(match[1])
}

function parseHook(section, caseId) {
  const match = section.match(/\*\*훅\*\*:\s*([\s\S]*?)\n\n\*\*A\*\*:/)
  if (!match) throw new Error(`failed to parse hook for ${caseId}`)
  return clean(match[1])
}

function parseParticipant(section, label, caseId) {
  const re = new RegExp(`\\*\\*${label}\\*\\*:\\s*([^\\(]+)\\((\\d+),\\s*([^\\)]+)\\)\\s*—\\s*([\\s\\S]*?)\\s*—\\s*거짓말 전략:\\s*\\\`([^\\\`]+)\\\``)
  const match = section.match(re)
  if (!match) throw new Error(`failed to parse participant ${label} for ${caseId}`)
  return {
    name: clean(match[1]),
    age: Number(match[2]),
    role: clean(match[3]),
    hiddenTruth: clean(match[4]),
    lieStrategy: clean(match[5]),
  }
}

function parseDisputes(section) {
  const block = sectionBetween(section, '**쟁점**', '**증거 체인**')
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^-\s*d-\d+:/u.test(line))
    .map((line) => {
      const match = line.match(/^-\s*(d-\d+):\s*(.+)$/u)
      return { id: match[1], text: clean(match[2]) }
    })
}

function parseEvidenceItems(text) {
  const items = []
  const regex = /(e-\d+)\s+([^,]+?)(?=(?:,\s*e-\d+\s)|$)/gu
  let match
  while ((match = regex.exec(text)) !== null) {
    items.push({
      id: clean(match[1]),
      name: clean(match[2]),
    })
  }
  return items
}

function parseUnlockLine(line) {
  const match = line.match(/^-+\s*(초기|1차 해금|2차 해금|3차 해금|최종):\s*(.+?)(?:\s*\(requires\s+(.+?),\s*(S\d)\+\))?$/u)
  if (!match) return null
  return {
    label: clean(match[1]),
    items: parseEvidenceItems(clean(match[2])),
    requires: match[3]
      ? clean(match[3]).split('+').map((item) => clean(item)).filter(Boolean)
      : [],
    requiredLieState: match[4] || null,
  }
}

function parseEvidenceChain(section) {
  const block = sectionBetween(section, '**증거 체인**:', '**중반 뒤집기**:')
  const lines = block.split('\n').map((line) => line.replace(/\r/g, ''))
  const initial = []
  const unlocks = []
  const combinations = []
  let inCombos = false

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    if (!line.trim()) continue
    if (line.includes('핵심 조합')) {
      inCombos = true
      continue
    }
    if (inCombos) {
      const comboMatch = line.match(/^\s*-\s*(e-\d+(?:\+e-\d+)*)\s*→\s*(.+)$/u)
      if (comboMatch) {
        combinations.push({
          requires: comboMatch[1].split('+').map((item) => clean(item)),
          description: clean(comboMatch[2]),
        })
      }
      continue
    }
    const parsed = parseUnlockLine(line.trim())
    if (!parsed) continue
    if (parsed.label === '초기') initial.push(...parsed.items)
    else unlocks.push(parsed)
  }

  return { initial, unlocks, combinations }
}

function parseMidReversal(section) {
  const match = section.match(/\*\*중반 뒤집기\*\*:\s*([\s\S]*?)\n\n\*\*판결 딜레마\*\*:/)
  return clean(match ? match[1] : '')
}

function parseDilemmaAxes(section) {
  const match = section.match(/\*\*판결 딜레마\*\*:\s*([\s\S]*?)\n\n\*\*난이도\*\*:/)
  const raw = clean(match ? match[1] : '')
  const quoted = [...raw.matchAll(/`([^`]+)`/g)].map((item) => clean(item[1]))
  if (quoted.length > 0) return quoted
  return raw.split(',').map((item) => clean(item)).filter(Boolean).slice(0, 3)
}

function parseDifficulty(section) {
  const match = section.match(/\*\*난이도\*\*:\s*(easy|medium|hard)/u)
  return match ? match[1] : 'hard'
}

function parseWaveDocCase(root, caseId) {
  const section = findCaseSection(root, caseId)
  return {
    caseId,
    title: parseHeading(section, caseId),
    category: normalizeCategory(caseId),
    hook: parseHook(section, caseId),
    partyA: parseParticipant(section, 'A', caseId),
    partyB: parseParticipant(section, 'B', caseId),
    disputes: parseDisputes(section),
    evidenceChain: parseEvidenceChain(section),
    midReversal: parseMidReversal(section),
    dilemmaAxes: parseDilemmaAxes(section),
    difficulty: parseDifficulty(section),
  }
}

function relationshipTypeFor(category) {
  return RELATIONSHIP_TYPE_MAP[category] || `${category}_conflict`
}

function contextTypeFor(category) {
  return CONTEXT_TYPE_MAP[category] || `${category}_conflict`
}

function sensitivityTagsFor(parsed) {
  const tags = [...(CATEGORY_TAGS[parsed.category] || [])]
  const joined = `${parsed.hook} ${parsed.midReversal} ${parsed.dilemmaAxes.join(' ')}`
  if (/개인정보|실명|유출|복원|클라우드|데이터/u.test(joined)) tags.push('privacy')
  if (/병원|응급실|의료|배아/u.test(joined)) tags.push('medical')
  if (/직장|고용|퇴직|옵션/u.test(joined)) tags.push('labor')
  if (/AI|딥|음성|클립|릴스|플랫폼/u.test(joined)) tags.push('digital_content')
  if (/재건축|심사|지정|포상금|공익/u.test(joined)) tags.push('public_process')
  return uniq(tags).slice(0, 5)
}

function incomeBracketFor(role) {
  if (/대표|CFO|소유주|심사위원|책임|원장/u.test(role)) return 'high'
  if (/디렉터|간호사|임대인|편집자|교사|엔지니어|운영/u.test(role)) return 'mid'
  return 'mid'
}

function digitalHabitFor(category) {
  if (category === 'tenant') return 'banking_app_heavy'
  if (category === 'online') return 'sns_active'
  return 'messenger_main'
}

function callTermsFor(category, party, counterpartyRole, counterpartyName) {
  if (category === 'spouse') {
    return {
      toPartner: '당신',
      toJudge: '재판장님',
      angry: counterpartyName,
    }
  }
  if (category === 'tenant') {
    return {
      toPartner: party === 'a' ? '임차인 분' : '집주인 분',
      toJudge: '재판장님',
      angry: counterpartyName,
    }
  }
  return {
    toPartner: counterpartyRole.includes('님') ? counterpartyRole : `${counterpartyName} 씨`,
    toJudge: '재판장님',
    angry: `${counterpartyName} 씨`,
  }
}

function speechStyleFor(strategy) {
  return STRATEGY_STYLE_MAP[strategy] || '핵심을 직접 말하지 않고 자신에게 유리한 정리부터 앞세운다.'
}

function verbalTellsFor(strategy) {
  return STRATEGY_TELLS[strategy] || STRATEGY_TELLS.avoidant
}

function roleRoutine(role, hook) {
  return sentence(`${role}로서 ${hook.split('.')[0] || hook}`.replace(/B는|A는/g, '').slice(0, 90))
}

function sensitivePoints(parsed, disputeTexts) {
  return uniq([
    parsed.title,
    ...disputeTexts.slice(0, 2),
    ...parsed.evidenceChain.initial.slice(0, 2).map((item) => item.name),
  ]).slice(0, 3)
}

function pcFaceTypeFromName(name) {
  const femaleHints = ['희', '연', '서', '윤', '혜', '린', '영', '지', '미', '채']
  return femaleHints.some((char) => String(name).includes(char)) ? 'woman' : 'man'
}

function makeParty(parsed, side) {
  const source = side === 'a' ? parsed.partyA : parsed.partyB
  const counter = side === 'a' ? parsed.partyB : parsed.partyA
  const disputeTexts = parsed.disputes.map((item) => item.text)
  return {
    id: side,
    name: source.name,
    age: source.age,
    occupation: source.role,
    incomeBracket: incomeBracketFor(source.role),
    archetype: source.lieStrategy,
    speechStyle: speechStyleFor(source.lieStrategy),
    pride: source.lieStrategy === 'confrontational' ? 8 : source.lieStrategy === 'victim_cosplay' ? 7 : 6,
    fear: sentence(`${source.hiddenTruth} 사실이 정리되면 자신에게 불리한 책임이 굳어질까 두려워한다`),
    riskAppetite: source.lieStrategy === 'confrontational' || source.lieStrategy === 'premature_summary' ? 7 : 5,
    digitalHabit: digitalHabitFor(parsed.category),
    dailyRoutine: roleRoutine(source.role, parsed.hook),
    sensitivePoints: sensitivePoints(parsed, disputeTexts),
    verbalTells: verbalTellsFor(source.lieStrategy),
    callTerms: callTermsFor(parsed.category, side, counter.role, counter.name),
    pcFaceType: pcFaceTypeFromName(source.name),
  }
}

function makeRelationshipLedger(parsed) {
  return [
    {
      id: 'ledger-1',
      category: 'confirmed',
      description: sentence(parsed.hook),
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
      description: sentence(parsed.midReversal || parsed.dilemmaAxes[0] || parsed.hook),
      isReal: true,
      whoRemembersAccurately: 'both',
      whoDistorts: 'both',
      distortionDirection: '양측 모두 자신에게 유리한 부분만 먼저 기억한다.',
      currentlyResolved: 'unresolved',
      emotionalResidue: 'mild',
      connectionToCurrent: 'indirect',
    },
    {
      id: 'ledger-3',
      category: 'silenced',
      description: sentence(`${parsed.partyA.hiddenTruth} / ${parsed.partyB.hiddenTruth}`),
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

function witnessRole(category, slot) {
  const institution = {
    spouse: '병원 앱 상담 담당자',
    family: '출판사 실무자',
    friend: '브랜드 담당자',
    neighbor: '추진위 전산 실무자',
    partnership: '법무·보안 실무자',
    tenant: '건물 관리 실무자',
    workplace: '인수사 HR 실무자',
    online: '플랫폼 운영 담당자',
    professional: '기록 담당 실무자',
    civic: '심사 운영 담당자',
  }[category] || '기관 담당자'
  if (slot === 'institutional') return institution
  if (slot === 'acquaintance_1') return 'A 측 가까운 인물'
  return 'B 측 가까운 인물'
}

function witnessBias(slot) {
  if (slot === 'institutional') return 'neutral'
  return slot === 'acquaintance_1' ? 'pro_a' : 'pro_b'
}

function witnessRelation(slot) {
  if (slot === 'institutional') return 'both'
  return slot === 'acquaintance_1' ? 'a' : 'b'
}

function makeSocialGraph(parsed) {
  const disputeIds = parsed.disputes.map((item) => item.id)
  const slots = ['institutional', 'acquaintance_1', 'acquaintance_2']
  return slots.map((slot, index) => {
    const name = WITNESS_NAME_POOL[(parsed.caseId.length + index * 3) % WITNESS_NAME_POOL.length]
    const knowledgeScope = index === 0
      ? sentence(`${parsed.evidenceChain.initial.map((item) => item.name).slice(0, 2).join(', ')}와 직접 연결된 기관 기록을 알고 있다`)
      : index === 1
        ? sentence(`${parsed.partyA.name} 쪽 숨긴 사실과 ${parsed.disputes[0]?.text || '핵심 쟁점'}의 흐름을 가까이서 봤다`)
        : sentence(`${parsed.partyB.name} 쪽 숨긴 사실과 ${parsed.disputes[1]?.text || '핵심 쟁점'}의 흐름을 가까이서 봤다`)
    return {
      id: `tp-${index + 1}`,
      slot,
      name,
      relationTo: witnessRelation(slot),
      knowledgeScope,
      witnessedDirectly: true,
      bias: witnessBias(slot),
      distortionRisk: slot === 'institutional' ? 'accurate' : slot === 'acquaintance_1' ? 'strategic' : 'unconscious',
      witnessProfile: {
        age: 30 + index * 7,
        occupation: witnessRole(parsed.category, slot),
        relationToA: slot === 'acquaintance_2' ? '간접 접점' : `${parsed.partyA.name} 측과 실무 접점`,
        relationToB: slot === 'acquaintance_1' ? '간접 접점' : `${parsed.partyB.name} 측과 실무 접점`,
        sentimentToA: slot === 'acquaintance_1' ? 35 : slot === 'acquaintance_2' ? -10 : 10,
        sentimentToB: slot === 'acquaintance_2' ? 35 : slot === 'acquaintance_1' ? -10 : 10,
        speechStyle: slot === 'institutional'
          ? '문서와 시각을 우선으로 말하고 단정적 표현은 줄인다.'
          : slot === 'acquaintance_1'
            ? 'A측 사정을 먼저 설명하지만 직접 본 장면과 추정을 섞지 않으려 한다.'
            : 'B측 체감과 현장 분위기를 먼저 말하고 문서 세부는 뒤늦게 붙인다.',
        addressJudge: '재판장님',
        addressA: `${parsed.partyA.name} 씨`,
        addressB: `${parsed.partyB.name} 씨`,
      },
      relatedDisputeIds: index === 0 ? disputeIds.slice(0, 3) : index === 1 ? disputeIds.slice(0, 2) : disputeIds.slice(-2),
    }
  })
}

function evidenceTypeFromName(name) {
  const raw = clean(name)
  if (/채팅|문자|DM|메신저/u.test(raw)) return 'chat'
  if (/계약|동의서|신청서|보고서|문안|부록|문서|초안/u.test(raw)) return 'contract'
  if (/CCTV|영상|클립|릴스|사진/u.test(raw)) return 'cctv'
  if (/캡처|스크린샷/u.test(raw)) return 'device'
  if (/로그|대시보드|기록|시각표|해시|메타데이터|접속|추적/u.test(raw)) return 'log'
  if (/결제|입금|정산|포상금|영수증|보증금|가스 사용량/u.test(raw)) return 'bank'
  if (/SNS|게시물|댓글/u.test(raw)) return 'sns'
  if (/음성|파일|ZIP|앱|기기/u.test(raw)) return 'device'
  return 'log'
}

function evidenceProves(index, disputeIds) {
  if (disputeIds.length === 0) return []
  const patterns = [
    [0],
    [1],
    [2],
    [0, 3],
    [1, 2],
    [3, 4],
    [2, 4],
  ]
  const picked = patterns[index] || [Math.min(index, disputeIds.length - 1)]
  return uniq(picked.map((idx) => disputeIds[Math.min(idx, disputeIds.length - 1)]))
}

function partySubjectFor(index) {
  if (index === 0 || index === 3) return 'a'
  if (index === 1 || index === 4) return 'b'
  return 'both'
}

function makeInvestigationResults(item, extras = []) {
  return {
    request_original: `${item.name} 원본과 취득 경위를 먼저 확인해야 합니다.`,
    check_metadata: `${item.name}의 시각, 작성 주체, 전달 흔적을 맞대면 누가 무엇을 먼저 숨겼는지 드러납니다.`,
    restore_context: `${item.name} 전후 맥락을 복원하면 ${clean(extras[0] || '표면 설명과 다른 의도')}가 드러납니다.`,
    verify_source: `${item.name}의 출처와 전달 경로를 분리해 보면 기관 기록인지 개인 정리본인지 확인됩니다.`,
    check_edits: `${item.name}의 편집 여부와 누락 범위를 다시 보면 ${clean(extras[1] || '빠진 책임')}이 드러납니다.`,
    question_acquisition: `${item.name} 취득 범위와 사용 목적을 따져야 적법성과 책임을 분리할 수 있습니다.`,
  }
}

function makeEvidence(parsed) {
  const disputeIds = parsed.disputes.map((item) => item.id)
  const nodes = []
  const seen = new Set()
  const allItems = [
    ...parsed.evidenceChain.initial.map((item) => ({ ...item, requires: [], requiredLieState: null })),
    ...parsed.evidenceChain.unlocks.flatMap((unlock) => unlock.items.map((item) => ({
      ...item,
      requires: unlock.requires,
      requiredLieState: unlock.requiredLieState,
    }))),
  ]

  for (const item of allItems) {
    if (seen.has(item.id)) continue
    seen.add(item.id)
    const idx = Number(item.id.split('-')[1]) - 1
    const extras = parsed.evidenceChain.combinations
      .filter((combo) => combo.requires.includes(item.id))
      .map((combo) => combo.description)
      .slice(0, 2)
    nodes.push({
      id: item.id,
      name: item.name,
      surfaceName: item.name,
      description: sentence(`${item.name} 자료다`),
      surfaceDescription: sentence(`${item.name} 자료다`),
      type: evidenceTypeFromName(item.name),
      reliability: 'hard',
      completeness: 'original',
      provenance: idx < 3 ? 'institutional' : idx % 2 === 0 ? 'third_party' : 'self_possessed',
      legitimacy: extras.some((text) => /무단|위법|사적|딥|유출/u.test(text)) ? 'privacy_concern' : 'lawful',
      proves: evidenceProves(idx, disputeIds),
      isTrap: /함정|과장|편집/u.test(item.name),
      requires: item.requires || [],
      ...(item.requiredLieState ? { requiredLieState: item.requiredLieState } : {}),
      subjectParty: partySubjectFor(idx),
      investigationResults: makeInvestigationResults(item, extras),
    })
  }
  return nodes
}

function responsibilityFor(index) {
  const presets = [
    { a: 75, b: 25 },
    { a: 35, b: 65 },
    { a: 55, b: 45 },
    { a: 60, b: 40 },
    { a: 45, b: 55 },
  ]
  return presets[index] || { a: 50, b: 50 }
}

function quadrantFor(index) {
  return ['both_know', 'a_only', 'b_only', 'neither_knows', 'shared_misconception'][index % 5]
}

function buildDisputes(parsed, evidenceNodes) {
  return parsed.disputes.map((item, index) => {
    const relatedEvidence = evidenceNodes.filter((node) => node.proves.includes(item.id)).map((node) => node.id).slice(0, 3)
    return {
      id: item.id,
      name: item.text,
      truth: true,
      truthDescription: sentence(`${item.text} 쟁점은 양측이 각각 다른 사실을 숨긴 채 책임 비율을 흔들고 있다`),
      quadrant: quadrantFor(index),
      requiredEvidence: relatedEvidence,
      correctResponsibility: responsibilityFor(index),
      ambiguity: index % 2 === 0 ? 'high' : 'low',
      weight: index < 2 ? 'high' : index === parsed.disputes.length - 1 ? 'medium' : 'high',
      mediationLink: item.text,
      legitimacyIssue: /위법|적법|유출|사적|허위|개인정보|조작|특공|포상금/u.test(item.text),
      judgmentStatement: sentence(item.text),
    }
  })
}

function buildTruthTable(parsed) {
  return parsed.disputes.map((item, index) => ({
    id: `t-${index + 1}`,
    fact: sentence(item.text),
    isTrue: true,
    weight: index < 2 ? 10 : 8,
    quadrant: quadrantFor(index),
  }))
}

function lieTypeFor(index) {
  return ['LT-1', 'LT-2', 'LT-3', 'LT-4', 'LT-5', 'LT-6', 'LT-7'][index % 7]
}

function lieMotiveFor(strategy) {
  if (strategy === 'victim_cosplay') return 'face_saving'
  if (strategy === 'cold_logic') return 'career_preservation'
  if (strategy === 'premature_summary') return 'self_protection'
  if (strategy === 'confrontational') return 'revenge'
  if (strategy === 'affect_flattening') return 'self_protection'
  return 'self_protection'
}

function buildLieConfig(disputeIds, strategy) {
  return disputeIds.map((disputeId, index) => ({
    disputeId,
    lieType: lieTypeFor(index),
    lieIntensity: index % 2 === 0 ? 'L2' : 'L3',
    lieMotive: lieMotiveFor(strategy),
    initialState: 'S0',
    collapseViaTrust: index % 2 === 1,
    transitions: [
      { from: 'S0', to: 'S1', trigger: `clarify_${disputeId}` },
      { from: 'S1', to: 'S2', trigger: 'hard_evidence' },
      { from: 'S2', to: index % 2 === 1 ? 'S4' : 'S3', trigger: `pressure_${disputeId}` },
      { from: index % 2 === 1 ? 'S4' : 'S3', to: 'S5', trigger: `close_${disputeId}` },
    ],
  }))
}

function buildSolutions(parsed) {
  const axes = parsed.dilemmaAxes.length > 0 ? parsed.dilemmaAxes : ['책임 분리', '보호 우선', '절차 보완']
  return {
    [axes[0] || '책임 분리']: [
      `핵심 책임은 ${parsed.disputes[0]?.text || parsed.title} 기준으로 먼저 분리 기록한다.`,
      '양측 숨긴 사실은 같은 문장에 묶지 않고 별도 책임으로 남긴다.',
    ],
    [axes[1] || '보호 우선']: [
      '추가 피해와 2차 확산을 막는 보호 조치를 우선한다.',
      '사실 규명과 별개로 당장 중단해야 할 행위는 즉시 차단한다.',
    ],
    [axes[2] || '절차 보완']: [
      '문서, 로그, 전달 경로의 절차 문제를 재발 방지 기준으로 남긴다.',
      '다음 같은 유형의 사건에서 필요한 고지·보관·검증 절차를 재설계한다.',
    ],
  }
}

function buildEvidenceCombinations(parsed) {
  return (parsed.evidenceChain.combinations || []).slice(0, 3).map((combo, index) => ({
    requires: combo.requires,
    upgradesTo: 'hard',
    proves: evidenceProves(index + 3, parsed.disputes.map((item) => item.id)),
    description: combo.description,
  }))
}

function buildDossierCards(parsed, runtimeCase) {
  const evidenceIds = runtimeCase.evidence.map((node) => node.id)
  const disputeIds = runtimeCase.disputes.map((dispute) => dispute.id)
  const groups = [
    [evidenceIds[0], evidenceIds[3]].filter(Boolean),
    [evidenceIds[1], evidenceIds[4]].filter(Boolean),
    [evidenceIds[2], evidenceIds[5]].filter(Boolean),
    [evidenceIds[3], evidenceIds[4], evidenceIds[6]].filter(Boolean),
  ]

  return groups.map((group, index) => {
    const related = uniq([
      disputeIds[index] || disputeIds[0],
      disputeIds[Math.min(index + 1, disputeIds.length - 1)] || disputeIds[0],
    ])
    return {
      id: `dossier-${index + 1}`,
      name: `${parsed.title} 카드 ${index + 1}`,
      description: `${parsed.title}의 ${related.join(', ')} 쟁점을 엮어 보는 카드입니다.`,
      evidenceIds: group,
      relatedDisputes: related,
      subjectParty: 'both',
      challenges: ['a', 'b'].map((party) => ({
        targetParty: party,
        questions: related.slice(0, 2).map((disputeId, qIndex) => {
          const dispute = runtimeCase.disputes.find((item) => item.id === disputeId)
          const targetState = qIndex === 0 ? 'S2' : 'S3'
          return {
            id: `dossier-${index + 1}.${party}.q${qIndex + 1}`,
            text: `${dispute?.name || parsed.title}와 관련해 ${party === 'a' ? parsed.partyA.name : parsed.partyB.name} 측 설명에서 빠진 부분을 확인하겠습니다.`,
            attackVector: qIndex === 0 ? 'context' : 'responsibility',
            onSuccess: {
              blockVector: qIndex === 0 ? 'context' : 'responsibility',
              revealAtom: `${parsed.caseId}:${party}:${disputeId}:${targetState}:0`,
              lieAdvance: true,
            },
          }
        }),
      })),
    }
  })
}

function buildStateUnlockAtoms(parsed, runtimeCase, dossierCards) {
  const atoms = { a: {}, b: {} }
  for (const party of ['a', 'b']) {
    for (const dispute of runtimeCase.disputes) {
      atoms[party][dispute.id] = {}
    }
  }
  for (const card of dossierCards) {
    for (const challenge of card.challenges || []) {
      for (const question of challenge.questions || []) {
        const parts = String(question.onSuccess?.revealAtom || '').split(':')
        if (parts.length < 5) continue
        const [, party, disputeId, state] = parts
        atoms[party][disputeId][state] = atoms[party][disputeId][state] || []
        atoms[party][disputeId][state].push({
          id: question.onSuccess.revealAtom,
          factText: `${card.name} 카드에서 ${party === 'a' ? 'A측' : 'B측'}이 숨기던 축이 더 드러났습니다.`,
          tags: ['wave-doc', parsed.caseId, card.id, disputeId],
          unlockedAtState: state,
          slots: {
            summary: {
              default: `${card.name} 카드로 숨긴 축이 한 단계 더 열렸습니다.`,
            },
          },
          stanceHints: ['partial', 'blame', 'confess'],
        })
      }
    }
  }
  return atoms
}

function buildEvents(parsed) {
  return {
    contradictions: [
      {
        id: `${parsed.caseId}-contradiction-1`,
        statementA: `${parsed.partyA.name} 측은 ${parsed.disputes[0]?.text || parsed.title}에 대한 책임을 축소합니다.`,
        statementB: `${parsed.partyB.name} 측은 ${parsed.partyA.hiddenTruth}와 연결된 정황을 지적합니다.`,
        options: {
          point_out: { label: '모순을 짚는다', effect: '표면 설명보다 숨긴 경위가 앞에 나옵니다.' },
          let_go: { label: '보류한다', effect: '더 큰 구조 책임을 먼저 볼 수 있습니다.' },
        },
        npcReaction: `${parsed.partyA.name} 측은 해석이 앞선다며 문서·맥락부터 다시 보자고 버팁니다.`,
      },
      {
        id: `${parsed.caseId}-contradiction-2`,
        statementA: `${parsed.partyB.name} 측은 자신이 더 큰 피해자라고 주장합니다.`,
        statementB: `${parsed.partyB.hiddenTruth} 사실이 확인되면 단순 피해자 프레임이 흔들립니다.`,
        options: {
          point_out: { label: '피해자 프레임을 흔든다', effect: 'B측 숨긴 축이 더 선명해집니다.' },
          let_go: { label: '구조 책임을 먼저 본다', effect: '양측 비율 계산을 먼저 밀 수 있습니다.' },
        },
        npcReaction: `${parsed.partyB.name} 측은 상대방 선행 위반을 먼저 보라며 반격하려 합니다.`,
      },
    ],
    interjections: [
      {
        id: `${parsed.caseId}-interjection-1`,
        interruptor: 'a',
        interjectionLine: `${parsed.partyA.name} 측이 먼저 선을 넘었느냐만으로 이 사건을 닫을 수는 없습니다.`,
        options: {
          allow: { label: '계속 말하게 둔다', effect: 'A측 구조 논리가 더 드러납니다.' },
          block: { label: '핵심 쟁점으로 돌린다', effect: 'A측 숨긴 사실로 복귀합니다.' },
        },
      },
      {
        id: `${parsed.caseId}-interjection-2`,
        interruptor: 'b',
        interjectionLine: `${parsed.partyB.name} 측은 상대방이 먼저 판을 깔아 놓고 이제 와서 정리하는 척한다고 반발합니다.`,
        options: {
          allow: { label: '받아친다', effect: 'B측 감정선이 더 노출됩니다.' },
          block: { label: '사실선으로 복귀한다', effect: '감정보다 기록으로 돌아갑니다.' },
        },
      },
    ],
    emotionalOutbursts: [
      {
        id: `${parsed.caseId}-outburst-1`,
        party: 'a',
        outburstLine: `${parsed.partyA.name} 측은 자신이 계산만 한 사람처럼 보이면 사건 구조가 잘린다고 말합니다.`,
        options: {
          press: { label: '책임을 더 묻는다', effect: 'A측 숨긴 축이 빨리 드러날 수 있습니다.' },
          calm: { label: '맥락을 먼저 듣는다', effect: '압박과 경위를 함께 기록합니다.' },
        },
      },
      {
        id: `${parsed.caseId}-outburst-2`,
        party: 'b',
        outburstLine: `${parsed.partyB.name} 측은 자신만 계산했다고 정리하면 상대방 조치가 빠진다고 버팁니다.`,
        options: {
          press: { label: '개인 계산을 짚는다', effect: 'B측 숨긴 사실이 더 빨리 열린다.' },
          calm: { label: '구조 책임을 다시 묻는다', effect: '쌍방 비율 계산으로 돌아간다.' },
        },
      },
    ],
  }
}

function buildRuntimeCase(parsed) {
  const evidenceNodes = makeEvidence(parsed)
  const disputes = buildDisputes(parsed, evidenceNodes)
  const disputeIds = disputes.map((item) => item.id)
  const pivot = Math.ceil(disputeIds.length / 2)
  return {
    caseId: `case-${parsed.caseId}`,
    sensitivityTags: sensitivityTagsFor(parsed),
    meta: {
      relationshipType: relationshipTypeFor(parsed.category),
      conflictSeed: `WAVE-${parsed.caseId.toUpperCase()}`,
      variableModules: [`VM-${parsed.category}-core`, `VM-${parsed.caseId}`],
      twistModule: 'TW-mid-reversal',
      difficulty: parsed.difficulty,
      anchorTruth: `${parsed.partyA.name}의 숨긴 사실은 ${parsed.partyA.hiddenTruth}이라는 점이고, ${parsed.partyB.name}의 숨긴 사실은 ${parsed.partyB.hiddenTruth}이라는 점이다.`,
      emotionalBait: sentence(parsed.midReversal || parsed.hook),
      resolutionDilemma: sentence(parsed.dilemmaAxes.join(', ')),
    },
    duo: {
      duoId: `duo-${parsed.caseId}`,
      relationshipType: relationshipTypeFor(parsed.category),
      partyA: makeParty(parsed, 'a'),
      partyB: makeParty(parsed, 'b'),
      relationshipLedger: makeRelationshipLedger(parsed),
      socialGraph: makeSocialGraph(parsed),
    },
    context: {
      contextType: contextTypeFor(parsed.category),
      description: sentence(parsed.hook),
      emotionalPressure: parsed.difficulty === 'hard' ? 9 : parsed.difficulty === 'medium' ? 7 : 5,
      affects: 'both',
      triggerAmplifier: sentence(parsed.midReversal || parsed.hook),
      caseNumber: parsed.caseId.toUpperCase(),
      caseName: parsed.title,
    },
    disputes,
    evidence: evidenceNodes,
    evidenceCombinations: buildEvidenceCombinations(parsed),
    truthTable: buildTruthTable(parsed),
    lieConfigA: buildLieConfig(disputeIds.slice(0, pivot), parsed.partyA.lieStrategy),
    lieConfigB: buildLieConfig(disputeIds.slice(pivot), parsed.partyB.lieStrategy),
    solutions: buildSolutions(parsed),
    activeLedgerEntries: ['ledger-1', 'ledger-3'],
    activeThirdParties: ['tp-1', 'tp-2', 'tp-3'],
    baseEvidenceIds: ['e-1', 'e-2', 'e-3'],
    monetaryDisputeIds: [],
  }
}

function buildV3(parsed, runtimeCase) {
  const dossierCards = buildDossierCards(parsed, runtimeCase)
  return {
    caseId: parsed.caseId,
    dossierCards,
    stateUnlockAtoms: buildStateUnlockAtoms(parsed, runtimeCase, dossierCards),
    events: buildEvents(parsed),
  }
}

function buildWaveDocCase(root, caseId) {
  const parsed = parseWaveDocCase(root, caseId)
  const runtimeCase = buildRuntimeCase(parsed)
  const v3GameLoopData = buildV3(parsed, runtimeCase)
  const runtimeOutPath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseId}.json`)
  const v3OutPath = path.join(root, ROOT_REF_DIR, `${caseId}-v3-game-loop-data.json`)
  writeJson(runtimeOutPath, runtimeCase)
  writeJson(v3OutPath, v3GameLoopData)
  return {
    caseId,
    parsed,
    runtimeCase,
    v3GameLoopData,
    runtimeOutPath,
    v3OutPath,
  }
}

module.exports = {
  buildWaveDocCase,
  parseWaveDocCase,
}
