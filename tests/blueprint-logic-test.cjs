/**
 * Blueprint 로직 검증 — LLM 호출 없이 순수 엔진 로직만 테스트
 * stance/defenseMode/claims/tell 선택이 TC 기대값과 일치하는지 검증
 */

// ESM → CJS 호환을 위해 tsx로 실행
const path = require('path')

// 직접 모듈 로드 (Vite 환경이 아니므로 수동 해석)
async function run() {
  // ts-node/tsx 없이 순수 JS로 로직 재현
  // blueprintEngine의 핵심 로직을 인라인으로 검증

  const STATE_RANK = { S0: 0, S1: 1, S2: 2, S3: 3, S4: 4, S5: 5 }
  const STANCE_RANK_MAP = { deny: 0, hedge: 1, partial: 2, blame: 3, emotional: 4, confess: 5 }

  const ALLOWED_MODES = {
    deny: ['flat_denial', 'context_attack', 'legality_attack', 'authenticity_attack', 'silence'],
    hedge: ['silence', 'context_attack', 'legality_attack', 'authenticity_attack'],
    partial: ['concession', 'context_attack', 'legality_attack', 'authenticity_attack', 'counterattack'],
    blame: ['counterattack', 'context_attack', 'legality_attack', 'authenticity_attack'],
    emotional: ['silence', 'concession', 'counterattack'],
    confess: ['concession'],
  }

  function baseStance(lieState, trust) {
    switch (lieState) {
      case 'S0': return 'deny'
      case 'S1': return 'hedge'
      case 'S2': return 'partial'
      case 'S3': return trust < 40 ? 'blame' : 'partial'
      case 'S4': return trust >= 60 ? 'confess' : 'emotional'
      case 'S5': return 'confess'
    }
  }

  function soften(s) {
    if (s === 'deny') return 'hedge'
    if (s === 'hedge') return 'partial'
    if (s === 'blame') return 'partial'
    if (s === 'partial') return 'emotional'
    if (s === 'emotional') return 'confess'
    return s
  }

  function harden(s) {
    if (s === 'confess') return 'emotional'
    if (s === 'emotional') return 'partial'
    if (s === 'partial') return 'hedge'
    if (s === 'hedge') return 'deny'
    return s
  }

  function coerceDefenseMode(stance, requested) {
    if (ALLOWED_MODES[stance].includes(requested)) return requested
    switch (stance) {
      case 'hedge': return 'silence'
      case 'partial': return 'concession'
      case 'blame': return 'counterattack'
      case 'emotional': return 'silence'
      case 'confess': return 'concession'
      default: return 'flat_denial'
    }
  }

  function deriveMinStance(admittedFacts) {
    if (!admittedFacts || admittedFacts.length === 0) return 'deny'
    if (admittedFacts.length >= 2) return 'partial'
    return 'hedge'
  }

  function resolveBlueprint(lieState, emotionTier, evidenceBlocked, availableVectors, questionType, trust, admitted) {
    const stateRank = STATE_RANK[lieState]

    // 특수 예외
    if (lieState === 'S5') return { stance: 'confess', defenseMode: 'concession' }
    if (emotionTier === 'shutdown') {
      if (evidenceBlocked >= 3 || trust >= 70) {
        const s = stateRank >= 4 ? 'confess' : 'emotional'
        return { stance: s, defenseMode: s === 'confess' ? 'concession' : (evidenceBlocked === 4 ? 'concession' : 'silence') }
      }
      return { stance: 'emotional', defenseMode: 'silence' }
    }
    if (questionType === 'evidence_present' && evidenceBlocked === 4) {
      return { stance: stateRank >= 4 || trust >= 45 || emotionTier !== 'calm' ? 'confess' : 'partial', defenseMode: 'concession' }
    }

    let stance = baseStance(lieState, trust)

    // 질문 유형 보정
    if (questionType === 'motive_search') stance = soften(stance)
    else if (questionType === 'empathy_approach') {
      if (trust >= 50) stance = soften(stance)
      else if (trust < 35 && emotionTier !== 'calm') stance = harden(stance)
    } else if (questionType === 'evidence_present') {
      if (evidenceBlocked <= 1 && trust < 50) stance = harden(stance)
      else if (evidenceBlocked >= 2) stance = soften(stance)
    }

    // 감정 보정
    if (emotionTier === 'agitated') {
      if (stance === 'deny') stance = 'hedge'
      else if (stance === 'hedge') stance = 'partial'
      else if (stance === 'partial') stance = trust < 40 ? 'blame' : 'emotional'
    }
    if (emotionTier === 'explosive') {
      if (evidenceBlocked >= 3) stance = trust >= 50 ? 'emotional' : 'blame'
      else stance = trust < 60 ? 'blame' : 'emotional'
    }

    // 공격전가 강제
    if ((emotionTier === 'explosive' || trust <= 25) && ['S2', 'S3'].includes(lieState) && questionType !== 'empathy_approach' && evidenceBlocked <= 2) {
      stance = 'blame'
    }

    // admission floor
    if (admitted && admitted.length > 0) {
      const minStance = deriveMinStance(admitted)
      if (STANCE_RANK_MAP[stance] < STANCE_RANK_MAP[minStance]) stance = minStance
    }

    // defenseMode 결정 (간소화 — vector defense 생략)
    let defenseMode
    if (stance === 'confess') defenseMode = 'concession'
    else if (stance === 'emotional') defenseMode = evidenceBlocked >= 3 || trust >= 60 ? 'concession' : 'silence'
    else if (stance === 'blame') defenseMode = 'counterattack'
    else if (stance === 'partial') defenseMode = 'concession'
    else if (stance === 'hedge') defenseMode = 'silence'
    else defenseMode = 'flat_denial'

    // 호환성 강제
    defenseMode = coerceDefenseMode(stance, defenseMode)

    // sentenceCount
    const sentenceCount = stance === 'confess' ? 3 : ['emotional', 'partial', 'blame', 'hedge'].includes(stance) ? 2 : 1

    return { stance, defenseMode, sentenceCount }
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 테스트 케이스
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  let pass = 0, fail = 0, total = 0

  function test(name, input, expected) {
    total++
    const result = resolveBlueprint(
      input.lieState, input.emotionTier || 'calm',
      input.evidenceBlocked || 0, input.availableVectors || [],
      input.questionType || 'fact_pursuit', input.trust || 30,
      input.admitted || [],
    )
    const ok =
      result.stance === expected.stance &&
      result.defenseMode === expected.defenseMode &&
      (!expected.sentenceCount || result.sentenceCount === expected.sentenceCount)

    if (ok) {
      pass++
      console.log(`  ✅ ${name}`)
    } else {
      fail++
      console.log(`  ❌ ${name}`)
      console.log(`     기대: ${expected.stance}/${expected.defenseMode}${expected.sentenceCount ? '/'+expected.sentenceCount+'문장' : ''}`)
      console.log(`     실제: ${result.stance}/${result.defenseMode}/${result.sentenceCount}문장`)
    }
  }

  // ── TC-1 관련: 하위 액션별 stance 차이 ──
  console.log('\n═══ TC-1: 하위 액션별 stance 차이 (한지석 d-1 S1, trust=30) ═══')
  test('S1 + fact_pursuit → hedge', { lieState: 'S1', questionType: 'fact_pursuit', trust: 30, admitted: ['송금 사실 인정'] }, { stance: 'hedge', defenseMode: 'silence' })
  test('S1 + motive_search → partial (soften)', { lieState: 'S1', questionType: 'motive_search', trust: 30, admitted: ['송금 사실 인정'] }, { stance: 'partial', defenseMode: 'concession' })
  test('S1 + empathy_approach → hedge (trust<50)', { lieState: 'S1', questionType: 'empathy_approach', trust: 30, admitted: ['송금 사실 인정'] }, { stance: 'hedge', defenseMode: 'silence' })
  test('S1 + empathy + trust=60 → partial', { lieState: 'S1', questionType: 'empathy_approach', trust: 60, admitted: ['송금 사실 인정'] }, { stance: 'partial', defenseMode: 'concession' })

  // ── TC-2 관련: 캐릭터 차이 (같은 입력이면 stance는 같음 — 차이는 프롬프트/archetype에서) ──
  console.log('\n═══ TC-2: 동일 입력 → 동일 stance (캐릭터 차이는 프롬프트 레벨) ═══')
  test('한지석 d-5 S0 fact → deny', { lieState: 'S0', questionType: 'fact_pursuit', trust: 30 }, { stance: 'deny', defenseMode: 'flat_denial', sentenceCount: 1 })
  test('오세린 d-5 S1 fact → hedge', { lieState: 'S1', questionType: 'fact_pursuit', trust: 30 }, { stance: 'hedge', defenseMode: 'silence', sentenceCount: 2 })

  // ── stance-defenseMode 호환성 ──
  console.log('\n═══ 호환성 검증: hedge + flat_denial 금지 ═══')
  test('hedge → flat_denial 차단됨', { lieState: 'S1', questionType: 'fact_pursuit', trust: 30 }, { stance: 'hedge', defenseMode: 'silence' })
  test('deny → flat_denial 허용', { lieState: 'S0', questionType: 'fact_pursuit', trust: 30 }, { stance: 'deny', defenseMode: 'flat_denial' })
  test('partial → concession 기본', { lieState: 'S2', questionType: 'fact_pursuit', trust: 30 }, { stance: 'partial', defenseMode: 'concession' })
  test('blame → counterattack', { lieState: 'S3', questionType: 'fact_pursuit', trust: 30 }, { stance: 'blame', defenseMode: 'counterattack' })
  test('confess → concession', { lieState: 'S5' }, { stance: 'confess', defenseMode: 'concession' })

  // ── admission floor ──
  console.log('\n═══ Admission Floor: Phase 1 인정 사실 → 최소 stance 강제 ═══')
  test('S0 + admitted 1개 → hedge로 상향', { lieState: 'S0', admitted: ['송금 사실 인정'] }, { stance: 'hedge', defenseMode: 'silence' })
  test('S0 + admitted 2개 → partial로 상향', { lieState: 'S0', admitted: ['송금 인정', '약속 위반 인정'] }, { stance: 'partial', defenseMode: 'concession' })
  test('S0 + admitted 없음 → deny 유지', { lieState: 'S0', admitted: [] }, { stance: 'deny', defenseMode: 'flat_denial' })
  test('S2 + admitted 1개 → partial 유지 (이미 높음)', { lieState: 'S2', admitted: ['송금 사실 인정'] }, { stance: 'partial', defenseMode: 'concession' })

  // ── 감정 보정 ──
  console.log('\n═══ 감정 보정 ═══')
  test('S1 + agitated → partial', { lieState: 'S1', emotionTier: 'agitated', trust: 30 }, { stance: 'partial', defenseMode: 'concession' })
  test('S2 + explosive + trust<60 → blame', { lieState: 'S2', emotionTier: 'explosive', trust: 30 }, { stance: 'blame', defenseMode: 'counterattack' })
  test('S0 + shutdown → emotional/silence', { lieState: 'S0', emotionTier: 'shutdown', trust: 30 }, { stance: 'emotional', defenseMode: 'silence' })
  test('S4 + shutdown + trust≥70 → confess', { lieState: 'S4', emotionTier: 'shutdown', trust: 70 }, { stance: 'confess', defenseMode: 'concession' })

  // ── 증거 봉쇄 ──
  console.log('\n═══ 증거 봉쇄 ═══')
  test('evidence_present + 4 blocked → confess', { lieState: 'S2', questionType: 'evidence_present', evidenceBlocked: 4, trust: 50 }, { stance: 'confess', defenseMode: 'concession' })
  test('evidence_present + 2 blocked → soften', { lieState: 'S1', questionType: 'evidence_present', evidenceBlocked: 2, trust: 30, admitted: ['인정'] }, { stance: 'partial', defenseMode: 'concession' })

  // ── sentenceCount ──
  console.log('\n═══ 문장 수 ═══')
  test('deny → 1문장', { lieState: 'S0' }, { stance: 'deny', sentenceCount: 1 })
  test('hedge → 2문장', { lieState: 'S1', admitted: ['인정'] }, { stance: 'hedge', sentenceCount: 2 })
  test('confess → 3문장', { lieState: 'S5' }, { stance: 'confess', sentenceCount: 3 })

  // ── 다양한 조합 스트레스 테스트 ──
  console.log('\n═══ 스트레스 테스트: 다양한 조합 ═══')
  const states = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
  const emotions = ['calm', 'agitated', 'explosive', 'shutdown']
  const questions = ['fact_pursuit', 'motive_search', 'empathy_approach', 'evidence_present']
  const trusts = [10, 30, 50, 70, 90]
  const blockeds = [0, 1, 2, 3, 4]

  let stressPass = 0, stressFail = 0
  for (const s of states) {
    for (const e of emotions) {
      for (const q of questions) {
        for (const t of trusts) {
          for (const b of blockeds) {
            const result = resolveBlueprint(s, e, b, [], q, t, [])
            // 호환성 검증
            if (!ALLOWED_MODES[result.stance].includes(result.defenseMode)) {
              stressFail++
              if (stressFail <= 5) console.log(`  ❌ 호환성 위반: ${s}/${e}/${q}/trust=${t}/blocked=${b} → ${result.stance}/${result.defenseMode}`)
            } else {
              stressPass++
            }
            // stance 일관성: confess는 항상 concession
            if (result.stance === 'confess' && result.defenseMode !== 'concession') {
              stressFail++
              console.log(`  ❌ confess≠concession: ${s}/${e}/${q}/trust=${t}/blocked=${b}`)
            }
          }
        }
      }
    }
  }
  console.log(`  스트레스 테스트: ${stressPass + stressFail}개 조합 중 ${stressPass} PASS, ${stressFail} FAIL`)

  // ── 결과 ──
  console.log(`\n═══════════════════════════════════════`)
  console.log(`  단위 테스트: ${pass}/${total} PASS (${fail} FAIL)`)
  console.log(`  스트레스: ${stressPass}/${stressPass + stressFail} PASS`)
  console.log(`═══════════════════════════════════════\n`)
}

run().catch(console.error)
