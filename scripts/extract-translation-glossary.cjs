#!/usr/bin/env node

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'docs/localization/non-dialogue-extract')
const INVENTORY_PATH = path.join(OUT_DIR, 'translation_priority_inventory.csv')
const OUT_PATH = path.join(OUT_DIR, 'glossary_candidates.csv')
const ACTIVE_CASES = ['spouse-01', 'family-01', 'friend-01']
const LOCALES = ['en', 'ja', 'zh-CN']

const CATEGORY_ORDER = [
  'PERSON_NAME',
  'WITNESS',
  'EVIDENCE',
  'DISPUTE',
  'SYSTEM_TERM',
  'DOMAIN_TERM',
  'PROPER_NOUN',
]

const CATEGORY_PREFIX = {
  PERSON_NAME: 'PERSON',
  WITNESS: 'WITNESS',
  EVIDENCE: 'EVIDENCE',
  DISPUTE: 'DISPUTE',
  SYSTEM_TERM: 'SYSTEM',
  DOMAIN_TERM: 'DOMAIN',
  PROPER_NOUN: 'PROPER',
}

const STOP_TERMS = new Set([
  '그리고',
  '그러나',
  '하지만',
  '그래서',
  '때문',
  '대한',
  '관련',
  '경우',
  '내용',
  '사실',
  '정도',
  '이후',
  '이전',
  '서로',
  '각자',
  '자신',
  '상대',
  '본인',
  '다시',
  '먼저',
  '정말',
  '너무',
  '있는',
  '없는',
  '한다',
  '했다',
  '되는',
  '보인다',
  '드러난다',
  '말한다',
  '있다',
  '없다',
  '에서',
  '으로',
  '에게',
  '까지',
  '부터',
  '처럼',
  '입니다',
  '합니다',
])

const SYSTEM_TERMS = [
  ['재판관', 'Judge', '裁判官', '裁判官', '중립 adjudicator/player role 톤'],
  ['재판', 'Trial', '裁判', '审判', '게임 절차/판정 맥락'],
  ['법정', 'Courtroom', '法廷', '法庭', '주요 플레이 공간'],
  ['심문', 'Interrogation', '尋問', '询问', '질문/압박 단계'],
  ['질문', 'Question', '質問', '问题', '플레이어 질문'],
  ['추궁', 'Press', '追及', '追问', '강한 압박/모순 추적'],
  ['증언', 'Testimony', '証言', '证言', '증인 발화/증언 축'],
  ['증인', 'Witness', '証人', '证人', '제3자 증언자'],
  ['증거', 'Evidence', '証拠', '证据', '게임 증거 오브젝트'],
  ['단서', 'Clue', '手がかり', '线索', '탐색 힌트'],
  ['모순', 'Contradiction', '矛盾', '矛盾', '추리 핵심 충돌'],
  ['쟁점', 'Dispute', '争点', '争议点', '판단 대상 이슈'],
  ['판결', 'Verdict', '判決', '裁决', '최종 판단'],
  ['조정', 'Mediation', '調停', '调解', 'Phase 6 합의/조정'],
  ['책임', 'Responsibility', '責任', '责任', '책임 비율 판단'],
  ['사건', 'Case', '事件', '案件', '플레이 가능한 사건'],
  ['브리핑', 'Briefing', 'ブリーフィング', '简报', '사건 도입'],
  ['단계', 'Phase', 'フェーズ', '阶段', '게임 진행 단계'],
  ['선택지', 'Choice', '選択肢', '选项', 'UI 선택'],
  ['감정', 'Emotion', '感情', '情绪', '감정/심리 리소스'],
  ['신뢰', 'Trust', '信頼', '信任', '관계/상태 수치'],
  ['피로도', 'Fatigue', '疲労度', '疲劳度', '질문 피로도'],
  ['공개', 'Disclosure', '開示', '公开', '정보 공개'],
  ['확인', 'Confirm', '確認', '确认', 'UI/검증 공통'],
  ['검증', 'Verification', '検証', '验证', '증거 검증'],
  ['진술', 'Statement', '陳述', '陈述', '당사자/증인 발화'],
  ['당사자', 'Party', '当事者', '当事人', '분쟁 양측'],
  ['당사자 A', 'Party A', '当事者A', 'A 方', '중립 party label'],
  ['당사자 B', 'Party B', '当事者B', 'B 方', '중립 party label'],
  ['주장', 'Claim', '主張', '主张', '논리/사실 주장'],
  ['반박', 'Rebuttal', '反論', '反驳', '상대 주장 반박'],
  ['근거', 'Grounds', '根拠', '依据', '판단 근거'],
  ['정황', 'Circumstance', '状況証拠', '情况', '사건 맥락 단서'],
  ['핵심', 'Key Point', '核心', '核心', '요약 핵심'],
  ['기록', 'Record', '記録', '记录', '로그/문서성 자료'],
  ['로그', 'Log', 'ログ', '日志', '디지털 기록'],
  ['요약', 'Summary', '要約', '摘要', '짧은 정리'],
  ['상태', 'Status', '状態', '状态', 'UI 상태'],
  ['해금', 'Unlock', '解放', '解锁', '콘텐츠 개방'],
  ['제출', 'Submit', '提出', '提交', '증거 제출'],
  ['인증', 'Authenticate', '認証', '认证', '증거 진위 확인'],
  ['오독', 'Misread', '誤読', '误读', '증거 해석 오류'],
  ['왜곡', 'Distortion', '歪曲', '扭曲', '기억/해석 왜곡'],
  ['은폐', 'Concealment', '隠蔽', '隐瞒', '숨긴 행위'],
  ['선제행동', 'Preemptive Action', '先制行動', '先发行动', '먼저 취한 행동'],
]

const DOMAIN_TERMS = [
  ['블랙박스', 'dashcam', 'ドライブレコーダー', '行车记录仪', '한국 차량용 영상기록장치'],
  ['오피스텔', 'officetel', 'オフィステル', '韩式商住公寓', '한국식 주거/업무 겸용 공간'],
  ['위임장', 'power of attorney', '委任状', '授权委托书', '법률/금융 위임 문서'],
  ['공증', 'notarization', '公証', '公证', '문서 공증'],
  ['공증인', 'notary public', '公証人', '公证人', '공증 담당자'],
  ['공증사무소', 'notary office', '公証役場', '公证处', '기관/장소명'],
  ['적금', 'installment savings account', '積立預金', '定期储蓄', '한국 금융상품'],
  ['공동 적금', 'joint installment savings account', '共同積立預金', '共同定期储蓄', '부부 공동 금융상품'],
  ['이체', 'transfer', '振込', '转账', '계좌 이동'],
  ['송금', 'wire transfer', '送金', '汇款', '돈 송금'],
  ['현금 전달', 'cash handoff', '現金手渡し', '现金交付', '직접 현금 전달'],
  ['비자금', 'slush fund', '裏金', '私房钱', '숨겨둔 돈'],
  ['투자방', 'investment chat room', '投資チャット', '投资群', '사기성 투자방 맥락'],
  ['투자 사기', 'investment scam', '投資詐欺', '投资诈骗', '사기 피해'],
  ['딴살림', 'secret second household', '別宅生活', '另立门户', '외도 의심 맥락'],
  ['외도', 'affair', '不倫', '出轨', '관계 의혹'],
  ['새벽 전화', 'early-morning call', '深夜の電話', '凌晨来电', '통화 기록 단서'],
  ['통화기록', 'call log', '通話記録', '通话记录', '휴대폰 기록'],
  ['카드 내역', 'card statement', 'カード利用明細', '银行卡明细', '결제 기록'],
  ['영수증', 'receipt', 'レシート', '收据', '구매 증거'],
  ['여성용품', 'women’s items', '女性用品', '女性用品', '오해를 부르는 구매품'],
  ['머리끈', 'hair tie', 'ヘアゴム', '发圈', '영수증 품목'],
  ['틴트', 'lip tint', 'リップティント', '唇釉', '화장품 품목'],
  ['조카', 'niece/nephew', '甥・姪', '侄子/侄女', '가족관계'],
  ['친형', 'older brother', '実兄', '亲哥哥', '가족관계'],
  ['아내', 'wife', '妻', '妻子', '배우자'],
  ['남편', 'husband', '夫', '丈夫', '배우자'],
  ['유서', 'will', '遺言書', '遗嘱', '상속 사건 핵심 문서'],
  ['유언장', 'will', '遺言書', '遗嘱', '상속 문서'],
  ['상속', 'inheritance', '相続', '继承', '가족 사건 도메인'],
  ['유산', 'inheritance', '遺産', '遗产', '재산 상속'],
  ['자필 연습본', 'handwritten draft', '自筆練習稿', '亲笔草稿', '유서 작성 정황'],
  ['요양원', 'care facility', '介護施設', '疗养院', '가족 사건 장소'],
  ['요양보호사', 'caregiver', '介護職員', '护工', '가족 사건 증인'],
  ['치매', 'dementia', '認知症', '痴呆', '판단능력 쟁점'],
  ['판단 능력', 'capacity to judge', '判断能力', '判断能力', '유서 유효성 쟁점'],
  ['방문기록', 'visit record', '訪問記録', '探访记录', '요양원/장소 기록'],
  ['계좌 흐름', 'account flow', '口座の流れ', '账户流水', '금융 증거'],
  ['공장 자금', 'factory funds', '工場資金', '工厂资金', '가족 사건 자금'],
  ['일기장', 'diary', '日記帳', '日记', '가족 사건 증거'],
  ['연하장', 'New Year’s card', '年賀状', '贺年卡', '증거/관계 단서'],
  ['단톡방', 'group chat', 'グループチャット', '群聊', '친구 사건 핵심 공간'],
  ['예비신랑', 'fiance', '婚約者', '未婚夫', '친구 사건 관계자'],
  ['손절', 'cutting ties', '絶縁', '断交', '관계 단절'],
  ['낙인', 'stigma', '烙印', '污名', '사회적 평가'],
  ['집착', 'obsession', '執着', '纠缠', '친구 사건 오해 프레임'],
  ['경고', 'warning', '警告', '警告', '연락 의도'],
  ['돈 접근', 'money approach', '金銭目的の接近', '借钱接近', '금전 목적 접근'],
  ['공통 친구', 'mutual friend', '共通の友人', '共同朋友', '친구 관계망'],
  ['회사 후배', 'junior coworker', '会社の後輩', '公司后辈', '직장 관계'],
  ['분식집', 'snack bar', '軽食店', '小吃店', '친구 사건 장소'],
]

main()

function main() {
  if (!fs.existsSync(INVENTORY_PATH)) {
    throw new Error(`Missing input CSV: ${path.relative(ROOT, INVENTORY_PATH)}`)
  }

  const rows = readCsvFile(INVENTORY_PATH)
  const existingGlossary = readExistingGlossary()
  const termMap = new Map()
  const corpus = rows.map((row) => row.ko ?? '').join('\n')
  const rowIndex = buildRowIndex(rows)

  collectCaseMetadataTerms(termMap, rowIndex, existingGlossary, corpus)
  collectDictionaryTerms(termMap, rowIndex, existingGlossary, corpus, SYSTEM_TERMS, 'SYSTEM_TERM')
  collectDictionaryTerms(termMap, rowIndex, existingGlossary, corpus, DOMAIN_TERMS, 'DOMAIN_TERM')
  collectNgramTerms(termMap, rows, rowIndex, existingGlossary, corpus)

  const selected = selectTerms([...termMap.values()])
  assignTermIds(selected)

  const headers = [
    'term_id',
    'category',
    'ko',
    'frequency',
    'case_scope',
    'sample_context_1',
    'sample_context_2',
    'sample_context_3',
    'current_en',
    'current_ja',
    'current_zh',
    'notes',
  ]
  fs.mkdirSync(OUT_DIR, { recursive: true })
  fs.writeFileSync(OUT_PATH, toCsv(headers, selected), 'utf8')

  const summary = selected.reduce((acc, row) => {
    acc[row.category] = (acc[row.category] ?? 0) + 1
    return acc
  }, {})
  console.log(`glossary extraction ok: ${selected.length} terms`)
  for (const category of CATEGORY_ORDER) {
    console.log(`${category}: ${summary[category] ?? 0}`)
  }
  console.log(`output=${rel(OUT_PATH)}`)
}

function collectCaseMetadataTerms(termMap, rowIndex, existingGlossary, corpus) {
  for (const caseId of ACTIVE_CASES) {
    const localized = readLocalizedCase(caseId)
    const ko = localized.ko
    if (!ko) continue

    addDirectCaseTerm(termMap, rowIndex, existingGlossary, corpus, {
      category: 'PERSON_NAME',
      ko: ko.duo?.partyA?.name,
      caseId,
      current: localeValues(localized, (data) => data.duo?.partyA?.name),
      notes: 'P0 explicit party profile name from generated case metadata.',
      origin: 'metadata',
    })
    addDirectCaseTerm(termMap, rowIndex, existingGlossary, corpus, {
      category: 'PERSON_NAME',
      ko: ko.duo?.partyB?.name,
      caseId,
      current: localeValues(localized, (data) => data.duo?.partyB?.name),
      notes: 'P0 explicit party profile name from generated case metadata.',
      origin: 'metadata',
    })

    for (const [index, witness] of (ko.duo?.socialGraph ?? []).entries()) {
      addDirectCaseTerm(termMap, rowIndex, existingGlossary, corpus, {
        category: 'WITNESS',
        ko: witness.name,
        caseId,
        current: localeValues(localized, (data) => data.duo?.socialGraph?.[index]?.name),
        notes: `P0 explicit witness name (${witness.id ?? `w-${index + 1}`}) from generated case metadata.`,
        origin: 'metadata',
      })
    }

    for (const [index, dispute] of (ko.disputes ?? []).entries()) {
      addDirectCaseTerm(termMap, rowIndex, existingGlossary, corpus, {
        category: 'DISPUTE',
        ko: dispute.name,
        caseId,
        current: localeValues(localized, (data) => data.disputes?.[index]?.name),
        notes: `P0 explicit dispute label (${dispute.id ?? `d-${index + 1}`}) from generated case metadata.`,
        origin: 'metadata',
      })
    }

    for (const [index, evidence] of (ko.evidence ?? []).entries()) {
      addDirectCaseTerm(termMap, rowIndex, existingGlossary, corpus, {
        category: 'EVIDENCE',
        ko: evidence.name,
        caseId,
        current: localeValues(localized, (data) => data.evidence?.[index]?.name),
        notes: `P0 explicit evidence label (${evidence.id ?? `e-${index + 1}`}) from generated case metadata.`,
        origin: 'metadata',
      })
    }

    walkObjects(ko, (object, pathParts) => {
      const id = typeof object.id === 'string' ? object.id : ''
      if (!/^(e-\d+|d-\d+|dc-\d+|h-d\d+|h-d-\d+|w-\d+)$/.test(id)) return
      const rawTerm = firstHumanText(object.label, object.name)
      if (!rawTerm) return
      const term = stripIdPrefix(rawTerm)
      const category = categoryFromEntityId(id)
      const current = localeValues(localized, (data) => getByPath(data, pathParts))
      addDirectCaseTerm(termMap, rowIndex, existingGlossary, corpus, {
        category,
        ko: term,
        caseId,
        current: {
          en: stripIdPrefix(firstHumanText(current.en?.label, current.en?.name) ?? ''),
          ja: stripIdPrefix(firstHumanText(current.ja?.label, current.ja?.name) ?? ''),
          'zh-CN': stripIdPrefix(firstHumanText(current['zh-CN']?.label, current['zh-CN']?.name) ?? ''),
        },
        notes: `P0 explicit ${id} label from generated case metadata.`,
        origin: 'metadata',
      })
    })
  }
}

function collectDictionaryTerms(termMap, rowIndex, existingGlossary, corpus, items, category) {
  for (const [ko, en, ja, zhCN, note] of items) {
    if (!ko) continue
    const frequency = countOccurrences(corpus, ko)
    if (frequency === 0) continue
    const effectiveCategory = category === 'DOMAIN_TERM' && looksLikeProperNoun(ko) ? 'PROPER_NOUN' : category
    addTerm(termMap, {
      category: effectiveCategory,
      ko,
      frequency,
      caseScope: rowIndex.casesForTerm(ko),
      samples: rowIndex.samplesForTerm(ko),
      current: mergeCurrent({ en, ja, 'zh-CN': zhCN }, existingGlossary.get(ko)),
      notes: `${dictionaryPriorityLabel(effectiveCategory)}; ${note}`,
      origin: 'dictionary',
    })
  }
}

function collectNgramTerms(termMap, rows, rowIndex, existingGlossary, corpus) {
  const stats = new Map()
  for (const row of rows) {
    const termsInRow = new Set(extractTermsFromText(row.ko ?? ''))
    for (const term of termsInRow) {
      if (hasTermAnyCategory(termMap, term)) continue
      if (isBadCandidate(term)) continue
      const stat = stats.get(term) ?? {
        term,
        rows: 0,
        cases: new Set(),
      }
      stat.rows += 1
      stat.cases.add(row.case_id || '(global)')
      stats.set(term, stat)
    }
  }

  const candidates = [...stats.values()]
    .filter((stat) => stat.rows >= 6)
    .map((stat) => {
      const category = looksLikeProperNoun(stat.term) ? 'PROPER_NOUN' : 'DOMAIN_TERM'
      return {
        ...stat,
        category,
        score: stat.rows * 2 + Math.min(stripSpaces(stat.term).length, 12),
      }
    })
    .sort((a, b) => b.score - a.score || a.term.localeCompare(b.term, 'ko'))
    .slice(0, 420)

  for (const candidate of candidates) {
    const frequency = countOccurrences(corpus, candidate.term)
    if (frequency < 5) continue
    addTerm(termMap, {
      category: candidate.category,
      ko: candidate.term,
      frequency,
      caseScope: rowIndex.casesForTerm(candidate.term),
      samples: rowIndex.samplesForTerm(candidate.term),
      current: existingGlossary.get(candidate.term) ?? findCurrentTranslations(rowIndex, candidate.term),
      notes: candidate.category === 'PROPER_NOUN'
        ? 'P2 n-gram candidate with institution/place-name suffix.'
        : 'P1 high-frequency n-gram candidate from Korean corpus.',
      origin: 'ngram',
    })
  }
}

function hasTermAnyCategory(termMap, term) {
  return CATEGORY_ORDER.some((category) => termMap.has(`${category}|${term}`))
}

function addDirectCaseTerm(termMap, rowIndex, existingGlossary, corpus, item) {
  const ko = stripIdPrefix(item.ko)
  if (!ko || !hasHangul(ko)) return
  addTerm(termMap, {
    category: item.category,
    ko,
    frequency: Math.max(countOccurrences(corpus, ko), 1),
    caseScope: new Set([item.caseId]),
    samples: rowIndex.samplesForTerm(ko),
    current: mergeCurrent(item.current, existingGlossary.get(ko), findCurrentTranslations(rowIndex, ko)),
    notes: item.notes,
    origin: item.origin,
  })
}

function dictionaryPriorityLabel(category) {
  if (category === 'SYSTEM_TERM') return 'P0 system keyword dictionary'
  if (category === 'PROPER_NOUN') return 'P2 proper noun/place/institution dictionary'
  return 'P1 domain keyword dictionary'
}

function addTerm(termMap, item) {
  const ko = normalizeTerm(item.ko)
  if (!ko) return
  const key = `${item.category}|${ko}`
  const current = normalizeCurrent(item.current)
  const existing = termMap.get(key)
  if (!existing) {
    termMap.set(key, {
      term_id: '',
      category: item.category,
      ko,
      frequency: item.frequency ?? 0,
      caseScope: new Set(item.caseScope ?? []),
      samples: [...(item.samples ?? [])].filter(Boolean).slice(0, 3),
      current,
      notes: new Set([item.notes].filter(Boolean)),
      origin: new Set([item.origin ?? 'unknown']),
    })
    return
  }

  existing.frequency = Math.max(existing.frequency, item.frequency ?? 0)
  for (const scope of item.caseScope ?? []) existing.caseScope.add(scope)
  for (const sample of item.samples ?? []) {
    if (sample && !existing.samples.includes(sample) && existing.samples.length < 3) {
      existing.samples.push(sample)
    }
  }
  existing.current = mergeCurrent(existing.current, current)
  if (item.notes) existing.notes.add(item.notes)
  existing.origin.add(item.origin ?? 'unknown')
}

function selectTerms(terms) {
  const mandatory = []
  const generated = []
  for (const term of terms) {
    if (term.frequency < 5 && !term.origin.has('metadata')) continue
    if (term.origin.has('ngram') && !term.origin.has('metadata') && !term.origin.has('dictionary')) {
      generated.push(term)
    } else {
      mandatory.push(term)
    }
  }

  generated.sort((a, b) => b.frequency - a.frequency || stripSpaces(b.ko).length - stripSpaces(a.ko).length)
  const targetMax = 560
  const selected = [...mandatory, ...generated.slice(0, Math.max(0, targetMax - mandatory.length))]

  return selected
    .map((term) => ({
      term_id: '',
      category: term.category,
      ko: term.ko,
      frequency: term.frequency,
      case_scope: formatCaseScope(term.caseScope),
      sample_context_1: term.samples[0] ?? '',
      sample_context_2: term.samples[1] ?? '',
      sample_context_3: term.samples[2] ?? '',
      current_en: term.current.en ?? '',
      current_ja: term.current.ja ?? '',
      current_zh: term.current['zh-CN'] ?? '',
      notes: [...term.notes].join(' / '),
    }))
    .sort((a, b) => {
      const categoryDelta = CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category)
      if (categoryDelta !== 0) return categoryDelta
      if (b.frequency !== a.frequency) return b.frequency - a.frequency
      return a.ko.localeCompare(b.ko, 'ko')
    })
}

function assignTermIds(rows) {
  const counters = {}
  for (const row of rows) {
    counters[row.category] = (counters[row.category] ?? 0) + 1
    row.term_id = `${CATEGORY_PREFIX[row.category]}-${String(counters[row.category]).padStart(3, '0')}`
  }
}

function buildRowIndex(rows) {
  return {
    rows,
    casesForTerm(term) {
      const cases = new Set()
      for (const row of rows) {
        if (containsTerm(row.ko, term)) cases.add(row.case_id || '(global)')
      }
      return cases
    },
    samplesForTerm(term) {
      const samples = []
      for (const row of rows) {
        if (!containsTerm(row.ko, term)) continue
        const prefix = row.case_id ? `${row.case_id} ${row.category}` : `(global) ${row.category}`
        const sample = `${prefix}: ${compact(row.ko, 160)}`
        if (!samples.includes(sample)) samples.push(sample)
        if (samples.length >= 3) break
      }
      return samples
    },
    exactRows(term) {
      return rows.filter((row) => stripIdPrefix(row.ko) === term || normalizeTerm(row.ko) === term)
    },
  }
}

function findCurrentTranslations(rowIndex, term) {
  const exact = rowIndex.exactRows(term).find((row) => row.en || row.ja || row['zh-CN'])
  if (exact) return { en: exact.en, ja: exact.ja, 'zh-CN': exact['zh-CN'] }

  const containing = rowIndex.rows.find((row) => {
    return containsTerm(row.ko, term) && stripIdPrefix(row.ko).length <= term.length + 24 && (row.en || row.ja || row['zh-CN'])
  })
  if (!containing) return {}
  return {
    en: compact(containing.en, 100),
    ja: compact(containing.ja, 100),
    'zh-CN': compact(containing['zh-CN'], 100),
  }
}

function extractTermsFromText(text) {
  const cleaned = String(text ?? '')
    .replace(/\{[^}]+\}/g, ' ')
    .replace(/\b(?:d|dc|e|w|h-d)-?\d+\b/gi, ' ')
    .replace(/[“”"'\[\]{}()<>]/g, ' ')
  const rawTokens = cleaned.match(/[가-힣A-Za-z0-9%·+#.-]+/g) ?? []
  const tokens = rawTokens
    .map(cleanToken)
    .filter((token) => token && !STOP_TERMS.has(token) && !/^\d+$/.test(token))

  const terms = new Set()
  for (const token of tokens) {
    if (hasHangul(token) && stripSpaces(token).length >= 2 && stripSpaces(token).length <= 14) {
      terms.add(token)
    }
  }
  for (let size = 2; size <= 4; size += 1) {
    for (let index = 0; index <= tokens.length - size; index += 1) {
      const slice = tokens.slice(index, index + size)
      if (!slice.some(hasHangul)) continue
      if (slice.some((token) => STOP_TERMS.has(token))) continue
      const term = slice.join(' ')
      const compacted = stripSpaces(term)
      if (compacted.length < 4 || compacted.length > 24) continue
      if (/[니다다요]$/.test(term)) continue
      terms.add(term)
    }
  }
  return terms
}

function cleanToken(token) {
  let value = String(token ?? '').trim()
  value = value.replace(/^[^가-힣A-Za-z0-9]+|[^가-힣A-Za-z0-9%]+$/g, '')
  value = value.replace(/(은|는|이|가|을|를|의|에|로|으로|와|과|도|만|부터|까지|처럼|에게|께|에서)$/u, '')
  return value
}

function isBadCandidate(term) {
  if (!term || STOP_TERMS.has(term)) return true
  if (!hasHangul(term)) return true
  const compacted = stripSpaces(term)
  if (compacted.length < 2 || compacted.length > 24) return true
  if (/^[가-힣]$/.test(compacted)) return true
  if (/^\d/.test(compacted) && !/[가-힣]/.test(compacted)) return true
  if (/(한다|했다|된다|였다|이다|있다|없다|같다|싶다|나요|세요|입니다|합니다)$/.test(term)) return true
  if (/^(그|이|저|내|네|왜|뭐|누가|어떻게|하지만|그리고)\s/.test(term)) return true
  return false
}

function looksLikeProperNoun(term) {
  return /(요양원|공증사무소|사무소|은행|학원|오피스텔|분식집|카페|매장|공장|학교|회사)$/.test(term)
}

function categoryFromEntityId(id) {
  if (/^e-\d+$/.test(id)) return 'EVIDENCE'
  if (/^w-\d+$/.test(id)) return 'WITNESS'
  return 'DISPUTE'
}

function readLocalizedCase(caseId) {
  const result = {}
  const koPath = path.join(ROOT, `src/data/cases/generated/${caseId}.json`)
  if (fs.existsSync(koPath)) result.ko = readJson(koPath)
  for (const locale of LOCALES) {
    const file = path.join(ROOT, `src/data/cases/generated/${caseId}.${locale}.json`)
    if (fs.existsSync(file)) result[locale] = readJson(file)
  }
  return result
}

function readExistingGlossary() {
  const candidates = [
    path.join(OUT_DIR, 'glossary_locked.csv'),
    path.join(ROOT, 'docs/localization/glossary.csv'),
  ]
  const result = new Map()
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue
    for (const row of readCsvFile(file)) {
      const ko = normalizeTerm(row.ko)
      if (!ko) continue
      result.set(ko, mergeCurrent(result.get(ko), {
        en: row.en,
        ja: row.ja,
        'zh-CN': row['zh-CN'],
      }))
    }
  }
  return result
}

function localeValues(localized, getter) {
  return {
    en: getter(localized.en ?? {}) ?? '',
    ja: getter(localized.ja ?? {}) ?? '',
    'zh-CN': getter(localized['zh-CN'] ?? {}) ?? '',
  }
}

function normalizeCurrent(current) {
  return {
    en: normalizeCell(current?.en),
    ja: normalizeCell(current?.ja),
    'zh-CN': normalizeCell(current?.['zh-CN']),
  }
}

function mergeCurrent(...items) {
  const result = { en: '', ja: '', 'zh-CN': '' }
  for (const item of items) {
    if (!item) continue
    for (const locale of LOCALES) {
      if (!result[locale] && normalizeCell(item[locale])) result[locale] = normalizeCell(item[locale])
    }
  }
  return result
}

function firstHumanText(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim() && hasHangul(value)) return value.trim()
  }
  return ''
}

function stripIdPrefix(value) {
  return normalizeTerm(String(value ?? '').replace(/^(?:d|dc|e|w|h-d)-?\d+\s+/i, ''))
}

function normalizeTerm(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim()
}

function stripSpaces(value) {
  return String(value ?? '').replace(/\s+/g, '')
}

function containsTerm(text, term) {
  return normalizeCell(text).includes(term)
}

function countOccurrences(text, term) {
  if (!term) return 0
  let count = 0
  let index = 0
  while (true) {
    index = text.indexOf(term, index)
    if (index === -1) break
    count += 1
    index += term.length
  }
  return count
}

function formatCaseScope(scopeSet) {
  const scope = [...scopeSet].filter(Boolean)
  if (scope.length === 0) return ''
  const order = ['(global)', ...ACTIVE_CASES]
  return scope.sort((a, b) => order.indexOf(a) - order.indexOf(b)).join(';')
}

function compact(value, maxLength = 160) {
  const text = normalizeCell(value).replace(/\n+/g, ' ')
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1)}…`
}

function hasHangul(value) {
  return /[가-힣]/.test(String(value ?? ''))
}

function getByPath(root, pathParts) {
  let value = root
  for (const part of pathParts) {
    if (value === undefined || value === null) return undefined
    value = value[part]
  }
  return value
}

function walkObjects(value, visitor, pathParts = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkObjects(item, visitor, [...pathParts, index]))
    return
  }
  if (!isPlainObject(value)) return
  visitor(value, pathParts)
  for (const [key, child] of Object.entries(value)) {
    walkObjects(child, visitor, [...pathParts, key])
  }
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function readCsvFile(file) {
  return parseCsv(fs.readFileSync(file, 'utf8'))
}

function parseCsv(text) {
  const matrix = []
  let row = []
  let cell = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const next = text[index + 1]
    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"'
        index += 1
      } else if (char === '"') {
        quoted = false
      } else {
        cell += char
      }
      continue
    }

    if (char === '"') {
      quoted = true
    } else if (char === ',') {
      row.push(cell)
      cell = ''
    } else if (char === '\n') {
      row.push(cell)
      if (row.some((value) => value !== '')) matrix.push(row)
      row = []
      cell = ''
    } else if (char !== '\r') {
      cell += char
    }
  }
  if (cell || row.length) {
    row.push(cell)
    if (row.some((value) => value !== '')) matrix.push(row)
  }

  const headers = matrix.shift() ?? []
  return matrix.map((values) => {
    const object = {}
    headers.forEach((header, index) => {
      object[header] = values[index] ?? ''
    })
    return object
  })
}

function toCsv(headers, rows) {
  return [
    headers.join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n') + '\n'
}

function csvEscape(value) {
  const text = String(value ?? '')
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

function normalizeCell(value) {
  if (value === undefined || value === null) return ''
  return String(value).replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim()
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, '/')
}
