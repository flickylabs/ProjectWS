/**
 * Blueprint 생성 엔진
 * ─────────────────────────────────
 * 룰 엔진이 매 턴 ResponseBlueprint를 생성한다.
 * LLM은 이 blueprint를 받아 연기만 수행.
 *
 * 매트릭스 설계: GPT Pro 5.4 (solomon_5_design_opinions.md 의견 2)
 * 구현: Claude Code
 */

import type {
  Stance,
  DefenseMode,
  ResponseBlueprint,
  BlueprintInput,
  AttackVector,
  EmotionTier,
  QuestionType,
  ClaimPolicy,
  ExecutableVerbalTell,
} from '../types'
import type { LieState } from '../types'
import { shouldActivateTell, recordTellUsed } from './tellValidator'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공개 API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * 매 턴 호출: 현재 상태에서 NPC의 발화 지시서를 생성한다.
 */
export function generateBlueprint(
  input: BlueprintInput,
  claimPolicy: ClaimPolicy | null,
  focusDisputeId: string,
  tells: ExecutableVerbalTell[],
  alreadyAdmitted?: string[],
  currentTurn: number = 0,
): ResponseBlueprint {
  // 1. stance + defenseMode 결정
  let { stance, defenseMode } = resolveStanceAndDefense(input)

  // 1b. Phase 1 인정 사실 기반 최소 stance 강제 (admission floor)
  if (alreadyAdmitted && alreadyAdmitted.length > 0) {
    const minStance = deriveMinStance(alreadyAdmitted)
    if (STANCE_RANK_MAP[stance] < STANCE_RANK_MAP[minStance]) {
      stance = minStance
    }
  }

  // 1c. stance-defenseMode 호환성 강제
  defenseMode = coerceDefenseMode(stance, defenseMode)

  // 2. claim atoms 결정
  const allowedClaimAtoms = claimPolicy?.publicClaim ?? []
  const forbiddenClaimAtoms = claimPolicy?.suppressions ?? []

  // 3. tell 선택 (cadence 추적 포함)
  const mustUseTell = selectTell(stance, input, tells, claimPolicy, currentTurn)

  // 4. banned lexemes: suppressions에서 핵심 키워드 추출
  const bannedLexemes = extractBannedLexemes(forbiddenClaimAtoms)

  // 5. sentenceCount + shouldCounterQuestion
  let sentenceCount = resolveSentenceCount(stance)
  let shouldCounterQuestion = resolveCounterQuestion(stance, input)

  // 6. 모순 방지 가드
  const tellRequiresSecond = mustUseTell
    ? tells.find(t => t.id === mustUseTell)?.requiresSecondSentence ?? false
    : false
  if ((shouldCounterQuestion || tellRequiresSecond) && sentenceCount === 1) {
    sentenceCount = 2
  }

  // 7. 감정 힌트
  const emotionHint = resolveEmotionHint(input.emotionTier, stance)

  return {
    focusDisputeId,
    stance,
    defenseMode,
    allowedClaimAtoms,
    forbiddenClaimAtoms,
    mustUseTell,
    bannedLexemes,
    sentenceCount,
    shouldCounterQuestion,
    emotionHint,
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — stance + defenseMode 결정 파이프라인
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function resolveStanceAndDefense(input: BlueprintInput): {
  stance: Stance
  defenseMode: DefenseMode
} {
  const { lieState, emotionTier, evidenceBlockedVectors, questionType, trustTowardJudge, availableAttackVectors } = input
  const stateRank = STATE_RANK[lieState]

  // ── 2-C: 특수 예외 먼저 처리 ──

  if (lieState === 'S5') {
    return { stance: 'confess', defenseMode: 'concession' }
  }

  if (emotionTier === 'shutdown') {
    if (evidenceBlockedVectors >= 3 || trustTowardJudge >= 70) {
      const s = stateRank >= 4 ? 'confess' : 'emotional' as Stance
      return { stance: s, defenseMode: s === 'confess' ? 'concession' : (evidenceBlockedVectors === 4 ? 'concession' : 'silence') }
    }
    return { stance: 'emotional', defenseMode: 'silence' }
  }

  if (questionType === 'evidence_present' && evidenceBlockedVectors === 4) {
    return {
      stance: stateRank >= 4 || trustTowardJudge >= 45 || emotionTier !== 'calm'
        ? 'confess'
        : 'partial',
      defenseMode: 'concession',
    }
  }

  // ── 2-B: 기본 stance 설정 ──
  let stance = baseStance(lieState, trustTowardJudge)

  // ── 2-D: stance 보정 ──

  // 1) 질문 유형 보정
  switch (questionType) {
    case 'fact_pursuit':
      break
    case 'motive_search':
      stance = soften(stance)
      break
    case 'empathy_approach':
      if (trustTowardJudge >= 50) stance = soften(stance)
      else if (trustTowardJudge < 35 && emotionTier !== 'calm') stance = harden(stance)
      break
    case 'evidence_present':
      if (evidenceBlockedVectors <= 1 && trustTowardJudge < 50) {
        stance = harden(stance)
      } else if (evidenceBlockedVectors >= 2) {
        stance = soften(stance)
      }
      break
  }

  // 2) 감정 상태 보정
  if (emotionTier === 'agitated') {
    if (stance === 'deny') stance = 'hedge'
    else if (stance === 'hedge') stance = 'partial'
    else if (stance === 'partial') {
      stance = trustTowardJudge < 40 ? 'blame' : 'emotional'
    }
  }

  if (emotionTier === 'explosive') {
    if (evidenceBlockedVectors >= 3) {
      stance = trustTowardJudge >= 50 ? 'emotional' : 'blame'
    } else {
      stance = trustTowardJudge < 60 ? 'blame' : 'emotional'
    }
  }

  // 3) 공격적 전가 강제 규칙
  if (
    (emotionTier === 'explosive' || trustTowardJudge <= 25) &&
    (lieState === 'S2' || lieState === 'S3') &&
    questionType !== 'empathy_approach' &&
    evidenceBlockedVectors <= 2
  ) {
    stance = 'blame'
  }

  // ── 2-E: defenseMode 결정 ──
  const defenseMode = resolveDefenseMode(
    stance, questionType, emotionTier,
    evidenceBlockedVectors, availableAttackVectors, trustTowardJudge,
  )

  return { stance, defenseMode }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — defenseMode 결정
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function resolveDefenseMode(
  stance: Stance,
  questionType: QuestionType,
  emotionTier: EmotionTier,
  evidenceBlockedVectors: number,
  availableAttackVectors: AttackVector[],
  trustTowardJudge: number,
): DefenseMode {
  if (stance === 'confess') {
    return 'concession'
  }

  if (stance === 'emotional') {
    return (evidenceBlockedVectors >= 3 || trustTowardJudge >= 60)
      ? 'concession'
      : 'silence'
  }

  if (stance === 'blame') {
    const vectorMode =
      questionType === 'evidence_present' && evidenceBlockedVectors <= 1
        ? pickVectorDefense(availableAttackVectors, questionType, trustTowardJudge)
        : null
    return vectorMode ?? 'counterattack'
  }

  if (stance === 'partial') {
    const vectorMode =
      questionType === 'evidence_present' && evidenceBlockedVectors <= 2
        ? pickVectorDefense(availableAttackVectors, questionType, trustTowardJudge)
        : null
    return vectorMode ?? 'concession'
  }

  if (stance === 'hedge') {
    if (emotionTier === 'shutdown') return 'silence'
    const vectorMode =
      questionType === 'evidence_present' && evidenceBlockedVectors <= 2
        ? pickVectorDefense(availableAttackVectors, questionType, trustTowardJudge)
        : null
    return vectorMode ?? 'silence'  // hedge의 기본은 silence (flat_denial 금지)
  }

  // deny
  if (questionType === 'empathy_approach' && trustTowardJudge < 35) {
    return 'silence'
  }
  const vectorMode =
    questionType === 'evidence_present' && evidenceBlockedVectors <= 1
      ? pickVectorDefense(availableAttackVectors, questionType, trustTowardJudge)
      : null
  return vectorMode ?? 'flat_denial'
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 벡터 방어 모드 선택기
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function pickVectorDefense(
  available: AttackVector[],
  questionType: QuestionType,
  trustTowardJudge: number,
): DefenseMode | null {
  if (available.length === 0) return null

  // 신뢰도와 질문 유형에 따라 벡터 우선순위 결정
  const order: AttackVector[] =
    trustTowardJudge <= 35
      ? ['legality', 'authenticity', 'context', 'identity']
      : questionType === 'fact_pursuit'
        ? ['context', 'authenticity', 'identity', 'legality']
        : questionType === 'evidence_present'
          ? ['authenticity', 'context', 'identity', 'legality']
          : questionType === 'motive_search'
            ? ['identity', 'context', 'authenticity', 'legality']
            : ['context', 'identity', 'authenticity', 'legality']

  const picked = order.find(v => available.includes(v))
  if (!picked) return null

  // identity는 authenticity_attack에 흡수
  if (picked === 'context') return 'context_attack'
  if (picked === 'legality') return 'legality_attack'
  return 'authenticity_attack' // authenticity, identity 모두
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 내부 — 유틸리티
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STATE_RANK: Record<LieState, number> = {
  S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5,
}

function baseStance(lieState: LieState, trust: number): Stance {
  switch (lieState) {
    case 'S0': return 'deny'
    case 'S1': return 'hedge'
    case 'S2': return 'partial'
    case 'S3': return trust < 40 ? 'blame' : 'partial'
    case 'S4': return trust >= 60 ? 'confess' : 'emotional'
    case 'S5': return 'confess'
  }
}

function soften(s: Stance): Stance {
  if (s === 'deny') return 'hedge'
  if (s === 'hedge') return 'partial'
  if (s === 'blame') return 'partial'
  if (s === 'partial') return 'emotional'
  if (s === 'emotional') return 'confess'
  return s
}

function harden(s: Stance): Stance {
  if (s === 'confess') return 'emotional'
  if (s === 'emotional') return 'partial'
  if (s === 'partial') return 'hedge'
  if (s === 'hedge') return 'deny'
  return s
}

function resolveSentenceCount(stance: Stance): 1 | 2 | 3 {
  if (stance === 'confess') return 3
  if (stance === 'emotional' || stance === 'partial' || stance === 'blame' || stance === 'hedge') return 2
  return 1 // deny만 1문장
}

function resolveCounterQuestion(stance: Stance, input: BlueprintInput): boolean {
  // blame에서만 되묻기 허용. hedge에서 재판관에게 되묻는 것은 부자연스러움.
  return stance === 'blame'
}

function selectTell(
  stance: Stance,
  input: BlueprintInput,
  tells: ExecutableVerbalTell[],
  claimPolicy: ClaimPolicy | null,
  currentTurn: number = 0,
): string | undefined {
  if (tells.length === 0) return undefined

  const pool = claimPolicy?.tellPool
  const candidates = pool && pool.length > 0
    ? tells.filter(t => pool.includes(t.id))
    : tells

  if (candidates.length === 0) return undefined

  const currentTrigger = stanceToTrigger(stance)

  // trigger 매칭 + cadence 필터
  const matching = candidates.filter(t =>
    t.appliesWhen.includes(currentTrigger) && shouldActivateTell(t, currentTurn),
  )

  if (matching.length === 0) return undefined

  // 선택된 tell을 사용 기록
  const selected = matching[0].id
  recordTellUsed(selected, currentTurn)
  return selected
}

function stanceToTrigger(stance: Stance): 'lying' | 'cornered' | 'emotional' | 'avoiding' | 'shame' | 'hurt' | 'defensive' {
  switch (stance) {
    case 'deny': return 'lying'
    case 'hedge': return 'avoiding'
    case 'partial': return 'cornered'
    case 'blame': return 'defensive'
    case 'emotional': return 'emotional'
    case 'confess': return 'shame'
  }
}

function extractBannedLexemes(suppressions: string[]): string[] {
  // suppressions에서 3글자 이상 단어를 추출하여 banned lexemes로
  const lexemes: string[] = []
  for (const s of suppressions) {
    const words = s.split(/[\s,·.]+/).filter(w => w.length >= 3)
    lexemes.push(...words)
  }
  // 중복 제거
  return [...new Set(lexemes)]
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// stance-defenseMode 호환성 강제
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const ALLOWED_MODES_BY_STANCE: Record<Stance, DefenseMode[]> = {
  deny: ['flat_denial', 'context_attack', 'legality_attack', 'authenticity_attack', 'silence'],
  hedge: ['silence', 'context_attack', 'legality_attack', 'authenticity_attack'],
  partial: ['concession', 'context_attack', 'legality_attack', 'authenticity_attack', 'counterattack'],
  blame: ['counterattack', 'context_attack', 'legality_attack', 'authenticity_attack'],
  emotional: ['silence', 'concession', 'counterattack'],
  confess: ['concession'],
}

function coerceDefenseMode(stance: Stance, requested: DefenseMode): DefenseMode {
  if (ALLOWED_MODES_BY_STANCE[stance].includes(requested)) return requested

  // 호환 불가 → stance별 안전한 기본값으로 대체
  switch (stance) {
    case 'hedge': return 'silence'
    case 'partial': return 'concession'
    case 'blame': return 'counterattack'
    case 'emotional': return 'silence'
    case 'confess': return 'concession'
    default: return 'flat_denial'
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Phase 1 인정 사실 기반 최소 stance (admission floor)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const STANCE_RANK_MAP: Record<Stance, number> = {
  deny: 0, hedge: 1, partial: 2, blame: 3, emotional: 4, confess: 5,
}

/**
 * Phase 1에서 인정한 사실에 기반하여 최소 stance를 결정.
 * 행위를 인정했으면 최소 hedge, 행위+규칙 위반을 인정했으면 최소 partial.
 */
function deriveMinStance(admittedFacts: string[]): Stance {
  if (admittedFacts.length === 0) return 'deny'
  // 2개 이상 인정 → partial (행위 + 맥락)
  if (admittedFacts.length >= 2) return 'partial'
  // 1개 인정 → hedge (행위만 인정, 의도는 흐림)
  return 'hedge'
}

function resolveEmotionHint(emotionTier: EmotionTier, stance: Stance): string {
  if (emotionTier === 'shutdown') return '입을 다물고 시선을 피한다.'
  if (emotionTier === 'explosive') {
    if (stance === 'blame') return '목소리가 높아지며 손가락질을 한다.'
    return '목소리가 떨리며 감정을 참지 못한다.'
  }
  if (emotionTier === 'agitated') {
    if (stance === 'deny' || stance === 'hedge') return '불안한 듯 손을 만지작거린다.'
    return '표정이 굳어지며 입술을 깨문다.'
  }
  // calm
  if (stance === 'confess') return '길게 숨을 내쉬며 고개를 숙인다.'
  if (stance === 'deny') return '차분하지만 눈을 마주치지 않는다.'
  return ''
}
