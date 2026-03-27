import type { DialogueEntry } from '../../types'
import type { CaseData } from '../../types'
import type { Archetype, LedgerEntry, ThirdParty } from '../../types/character'
import { eulreul } from '../../utils/korean'

// ── 헬퍼 ──

/** archetype → 초기 진술 톤 */
function openingTone(arch: Archetype): { hint: string; style: 'deflect' | 'attack' | 'plea' | 'logic' } {
  switch (arch) {
    case 'avoidant': return { hint: '시선을 아래로 향하고 신중하게 말한다.', style: 'deflect' }
    case 'confrontational': return { hint: '곧바로 상대를 지목한다.', style: 'attack' }
    case 'victim_cosplay': return { hint: '눈시울이 붉어진 채 말을 시작한다.', style: 'plea' }
    case 'cold_logic': return { hint: '메모를 꺼내들며 차분하게 시작한다.', style: 'logic' }
  }
}

/** archetype → 반박 스타일 */
function rebuttalTone(arch: Archetype): { hint: string } {
  switch (arch) {
    case 'avoidant': return { hint: '말끝을 흐리며 다른 쟁점으로 넘어가려 한다.' }
    case 'confrontational': return { hint: '공격적으로 되받아친다.' }
    case 'victim_cosplay': return { hint: '억울하다는 듯 호소한다.' }
    case 'cold_logic': return { hint: '논리적 허점을 짚으며 반박한다.' }
  }
}

/** archetype별 A의 첫 진술 텍스트 */
function buildAOpening(nameB: string, mainDispute: string, arch: Archetype, fear: string): string {
  switch (arch) {
    case 'avoidant':
      return `재판관님, 저는 억울합니다. ${nameB} 씨가 상황을 왜곡하고 있어요. ${mainDispute}에 대해 먼저 설명하겠습니다.`
    case 'confrontational':
      return `재판관님, ${nameB} 씨가 먼저 문제를 만들어 놓고 저를 탓하고 있습니다. ${mainDispute}부터 정리하죠.`
    case 'victim_cosplay':
      return `재판관님... 저는 정말 최선을 다했습니다. 그런데 ${nameB} 씨는 저를 나쁜 사람으로 몰아가고 있어요. ${mainDispute} 건부터 말씀드릴게요.`
    case 'cold_logic':
      return `재판관님, ${mainDispute}에 대한 사실관계를 정리하겠습니다. 감정이 아니라 사실이 중요합니다.`
  }
}

/** 관계형별 시스템 도입부 */
function systemIntro(relType: string, nameA: string, nameB: string): string {
  switch (relType) {
    case 'spouse': return `양측의 초기 진술을 듣겠습니다. 부부간의 갈등이므로 서로를 존중하며 말씀해 주십시오.`
    case 'neighbor': return `양측의 초기 진술을 듣겠습니다. 이웃 간 분쟁이므로 사실 중심으로 말씀해 주십시오.`
    case 'boss_employee': return `양측의 초기 진술을 듣겠습니다. 직장 내 관계이므로 직위와 관계없이 동등하게 발언하십시오.`
    case 'partnership': return `양측의 초기 진술을 듣겠습니다. 동업 분쟁이므로 계약과 사실 중심으로 말씀해 주십시오.`
    case 'family': return `양측의 초기 진술을 듣겠습니다. 가족 관계이므로 서로의 입장을 경청해 주십시오.`
    case 'tenant_landlord': return `양측의 초기 진술을 듣겠습니다. 임대 분쟁이므로 계약 내용과 사실에 기반해 말씀해 주십시오.`
    default: return `양측의 초기 진술을 듣겠습니다. 먼저 ${nameA} 씨부터 말씀해 주십시오.`
  }
}

/** 과거 레저 항목을 대사에 녹이기 */
function pastReference(ledger: LedgerEntry, nameA: string): string {
  if (ledger.category === 'silenced') return `${nameA} 씨, 그때도 제대로 말 한마디 없었잖아요. ${ledger.description}도 그렇고!`
  if (ledger.category === 'distorted') return `${nameA} 씨는 ${ledger.description}도 자기 좋을 대로 기억하잖아요!`
  return `${ledger.description} — 그때도 이랬어요!`
}

/** 제3자 언급 */
function thirdPartyMention(tp: ThirdParty): string {
  if (tp.bias === 'pro_a') return `${tp.name}한테 물어보세요, 그 사람도 알 거예요.`
  if (tp.bias === 'pro_b') return `${tp.name}도 제 편이에요. 다 알고 있다고요.`
  return `${tp.name}한테 확인해 보시면 됩니다.`
}

/** 관계 유형에 따른 상대 호칭/말투 */
function getPeerStyle(relType: string, nameA: string, nameB: string) {
  switch (relType) {
    case 'spouse': return {
      aCallsB: '자기', bCallsA: '여보',
      informal: true, // 서로 반말
    }
    case 'family': return {
      aCallsB: nameB, bCallsA: nameA,
      informal: true,
    }
    case 'friend': return {
      aCallsB: nameB, bCallsA: nameA,
      informal: true,
    }
    default: return {
      aCallsB: `${nameB} 씨`, bCallsA: `${nameA} 씨`,
      informal: false,
    }
  }
}

/**
 * LLM 없이 생성 사건의 Phase 1 대사를 만드는 범용 템플릿.
 * archetype, speechStyle, verbalTells, 과거 이력, 제3자 등을 동적으로 활용.
 */
export function buildGenericPhase1(caseData: CaseData): Omit<DialogueEntry, 'id'>[] {
  const { duo, disputes, context } = caseData
  const nameA = duo.partyA.name
  const nameB = duo.partyB.name
  const peer = getPeerStyle(duo.relationshipType, nameA, nameB)
  const archA = duo.partyA.archetype
  const archB = duo.partyB.archetype
  const toneA = openingTone(archA)

  // 쟁점: weight high 우선 정렬, 최대 3개
  const sorted = [...disputes].sort((a, b) => {
    const w = { high: 3, medium: 2, low: 1 }
    return (w[b.weight] ?? 0) - (w[a.weight] ?? 0)
  })
  const main = sorted[0]
  const sub = sorted[1]
  const third = sorted[2]

  // 과거 이력 (연결성 높은 것 우선)
  const ledger = duo.relationshipLedger.find(l => l.connectionToCurrent === 'direct' && l.emotionalResidue !== 'none')
    ?? duo.relationshipLedger[0]

  // 제3자
  const tp = duo.socialGraph[0]

  // A의 말버릇 (lying trigger)
  const aTellLying = duo.partyA.verbalTells.find(v => v.trigger === 'lying')
  const aTellAvoiding = duo.partyA.verbalTells.find(v => v.trigger === 'avoiding')

  // B의 말버릇 (cornered/emotional trigger)
  const bTellEmotional = duo.partyB.verbalTells.find(v => v.trigger === 'emotional' || v.trigger === 'cornered')

  const entries: Omit<DialogueEntry, 'id'>[] = []

  // 1. 시스템 도입
  entries.push({
    speaker: 'system',
    text: systemIntro(duo.relationshipType, nameA, nameB),
    relatedDisputes: [], turn: 0,
  })

  // 2. A의 첫 진술 — archetype 반영
  entries.push({
    speaker: 'a',
    text: buildAOpening(nameB, main?.name ?? '이 문제', archA, duo.partyA.fear),
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: toneA.hint,
  })

  // 3. B 끼어들기 (관계에 따라 반말/존댓말)
  entries.push({
    speaker: 'b',
    text: peer.informal
      ? (archB === 'confrontational'
        ? `왜곡이라고? ${peer.bCallsA}, 네가 사실을 숨기고 있잖아! ${main?.name ?? '이 문제'}의 핵심을 빼놓고 말하고 있어.`
        : `${peer.bCallsA}, 지금 정말 그렇게 말할 거야? ${main?.name ?? '그 일'}이 그렇게 단순한 문제가 아니잖아!`)
      : (archB === 'confrontational'
        ? `왜곡이요? ${peer.bCallsA}야말로 사실을 숨기고 있잖아요! ${main?.name ?? '이 문제'}의 핵심을 빼놓고 말하고 있어요.`
        : `${peer.bCallsA}, 지금 정말 그렇게 말할 거예요? ${main?.name ?? '그 일'}이 그렇게 단순한 문제가 아니잖아요!`),
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: archB === 'confrontational' ? '참지 못하고 끼어든다. 목소리가 높다.' : '즉시 반박에 나선다.',
  })

  // 4. A의 배경 설명 — context 전체 + triggerAmplifier 활용
  entries.push({
    speaker: 'a',
    text: `지금 제 차례입니다. 재판관님, 배경을 설명드리면... ${context.description.slice(0, 100)} ${context.triggerAmplifier ? `게다가 ${context.triggerAmplifier.slice(0, 60)}` : ''}`,
    relatedDisputes: [], turn: 0,
    behaviorHint: aTellAvoiding ? aTellAvoiding.pattern : '말의 순서를 통제하려 한다.',
  })

  // 5. B가 핵심을 파고듦
  entries.push({
    speaker: 'b',
    text: `배경이요? ${nameA} 씨, ${main?.name ?? '이 일'}을 숨기려고 돌려 말하는 거 아니에요? 구체적으로 말해봐요.`,
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: '의심하는 눈빛으로 쏘아본다.',
  })

  // 6. A의 회피/방어 — lying verbal tell 발현
  entries.push({
    speaker: 'a',
    text: `그건 ${nameB} 씨가 오해하는 겁니다. 저는 나름의 이유가 있었어요.`,
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: aTellLying ? `Verbal Tell: ${aTellLying.pattern}` : '말끝을 흐린다.',
  })

  // 7. B가 두 번째 쟁점 끌어옴
  if (sub) {
    entries.push({
      speaker: 'b',
      text: `이유요? 그럼 ${sub.name}은 어떻게 설명할 건데요? 그것도 이유가 있었나요?`,
      relatedDisputes: [sub.id], turn: 0,
      behaviorHint: '두 번째 쟁점을 끌어오며 압박한다.',
    })

    entries.push({
      speaker: 'a',
      text: archA === 'avoidant'
        ? `그건... 지금 그 얘기가 아니잖아요. 순서대로 하자고요.`
        : archA === 'cold_logic'
          ? `${sub.name}은 별개의 문제입니다. 하나씩 정리하죠.`
          : `왜 자꾸 다른 얘기를 꺼내는 거예요? ${main?.name ?? '핵심'}부터 하자고요.`,
      relatedDisputes: [sub.id], turn: 0,
      behaviorHint: rebuttalTone(archA).hint,
    })
  }

  // 8. B가 과거 이력 소환 (있으면)
  if (ledger) {
    entries.push({
      speaker: 'b',
      text: pastReference(ledger, nameA),
      relatedDisputes: main ? [main.id] : [], turn: 0,
      behaviorHint: '과거를 끌어오며 감정이 고조된다.',
    })

    entries.push({
      speaker: 'a',
      text: ledger.currentlyResolved === 'resolved'
        ? `그건 이미 끝난 일입니다. 왜 자꾸 과거를 —`
        : `그때 일은... 사정이 복잡했어요. 지금이랑은 다릅니다.`,
      relatedDisputes: [], turn: 0,
      behaviorHint: '당황하며 말이 끊긴다.',
    })
  }

  // 9. B의 감정 폭발 — emotionalPressure 반영
  const pressureAdj = context.emotionalPressure >= 7 ? '도대체' : '정말'
  entries.push({
    speaker: 'b',
    text: `재판관님, 이 사람은 맨날 이래요. 숨기고, 돌려 말하고, 들키면 변명하고. ${pressureAdj} 이러면서 어떻게 같이 살아요?`,
    relatedDisputes: [], turn: 0,
    behaviorHint: bTellEmotional ? `감정 폭발: ${bTellEmotional.pattern}` : '감정이 격해진다.',
  })

  // 10. A의 짧은 반격 — B 관련 쟁점이 있으면 (quadrant b_only)
  const bDispute = disputes.find(d => d.quadrant === 'b_only')
  if (bDispute && bDispute.id !== main?.id) {
    entries.push({
      speaker: 'a',
      text: `저만 문제가 있는 것처럼 말하지 마세요. ${nameB} 씨, ${bDispute.name}은 어떻게 설명할 건데요?`,
      relatedDisputes: [bDispute.id], turn: 0,
      behaviorHint: '처음으로 상대를 직접 공격한다.',
    })

    entries.push({
      speaker: 'b',
      text: `그건... 지금 그 얘기를 왜 꺼내요?`,
      relatedDisputes: [bDispute.id], turn: 0,
      behaviorHint: '잠시 당황한다.',
    })
  }

  // 11. 제3자 언급 (있으면)
  if (tp) {
    const mentioner = tp.bias === 'pro_a' ? 'a' : 'b'
    const mentionerName = mentioner === 'a' ? nameA : nameB
    entries.push({
      speaker: mentioner,
      text: thirdPartyMention(tp),
      relatedDisputes: [], turn: 0,
      behaviorHint: `${eulreul(tp.name)} 언급하며 지지를 구한다.`,
    })
  }

  // 12. 시스템 진정
  entries.push({
    speaker: 'system',
    text: `양측 모두 진정해 주십시오. ${nameB} 씨, 정리해서 말씀해 주시겠습니까.`,
    relatedDisputes: [], turn: 0,
  })

  // 13. B의 정리 — 핵심 쟁점 2~3개 요약
  const disputeNames = sorted.slice(0, 3).map(d => d.name).join(', ')
  entries.push({
    speaker: 'b',
    text: `... 정리하면요. ${disputeNames}. 이 모든 게 얽혀 있어요. ${nameA} 씨가 숨기고 있는 게 있고, 저는 진실을 알 권리가 있습니다.`,
    relatedDisputes: sorted.slice(0, 3).map(d => d.id), turn: 0,
    behaviorHint: '감정을 누르며 또렷하게 정리한다.',
  })

  return entries
}

/**
 * LLM 없이 생성 사건의 Phase 2 대사를 만드는 범용 템플릿.
 * sensitivePoints, quadrant, verbalTells를 활용하여 반박의 깊이를 더함.
 */
export function buildGenericPhase2(caseData: CaseData): Omit<DialogueEntry, 'id'>[] {
  const { duo, disputes, context } = caseData
  const nameA = duo.partyA.name
  const nameB = duo.partyB.name
  const archA = duo.partyA.archetype
  const archB = duo.partyB.archetype

  const sorted = [...disputes].sort((a, b) => {
    const w = { high: 3, medium: 2, low: 1 }
    return (w[b.weight] ?? 0) - (w[a.weight] ?? 0)
  })
  const main = sorted[0]
  const sub = sorted[1]

  // A의 sensitive point
  const aSensitive = duo.partyA.sensitivePoints[0]
  // B의 lying verbal tell
  const bTellLying = duo.partyB.verbalTells.find(v => v.trigger === 'lying')
  // A의 cornered verbal tell
  const aTellCornered = duo.partyA.verbalTells.find(v => v.trigger === 'cornered')
  // B의 defensive verbal tell
  const bTellDefensive = duo.partyB.verbalTells.find(v => v.trigger === 'cornered' || v.trigger === 'avoiding')
  // B 관련 쟁점 (A가 반격용으로 쓸 수 있는 것)
  const bDispute = disputes.find(d => d.quadrant === 'b_only')
  // 과거 이력
  const ledger = duo.relationshipLedger.find(l => l.emotionalResidue === 'strong') ?? duo.relationshipLedger[0]

  const entries: Omit<DialogueEntry, 'id'>[] = []

  // 1. 시스템 도입
  entries.push({
    speaker: 'system',
    text: '양측에게 상대 진술에 대한 반박 기회를 드리겠습니다.',
    relatedDisputes: [], turn: 0,
  })

  // 2. A의 반박 시작 — archetype별 전략
  entries.push({
    speaker: 'a',
    text: archA === 'avoidant'
      ? `${nameB} 씨가 과거를 자꾸 끌어오는 건 감정적인 겁니다. ${main?.name ?? '이 사건'}의 사실관계만 봐주십시오.`
      : archA === 'cold_logic'
        ? `재판관님, ${nameB} 씨의 주장을 하나씩 짚어보겠습니다. 사실과 다른 부분이 많습니다.`
        : archA === 'victim_cosplay'
          ? `재판관님, 저도 할 말이 있습니다. ${nameB} 씨 말만 들으면 제가 나쁜 사람인 것 같지만, 사정을 들어보시면 다릅니다.`
          : `${nameB} 씨, 아까 한 말 중에 사실이 아닌 게 있습니다. ${main?.name ?? '이 건'}부터 바로잡죠.`,
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: rebuttalTone(archA).hint,
  })

  // 3. B의 응수 — 패턴 지적
  entries.push({
    speaker: 'b',
    text: ledger
      ? `사실관계요? ${ledger.description} — 그때도 이렇게 말했잖아요. 패턴이에요, 패턴!`
      : `사실관계요? ${nameA} 씨가 말하는 "사실"은 매번 바뀌잖아요!`,
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: '"패턴"을 강조하며 반복한다.',
  })

  // 4. A가 주요 쟁점의 맥락 설명 시도
  entries.push({
    speaker: 'a',
    text: `그리고 ${main?.name ?? '이 건'}은... 맥락이 있습니다. ${nameB} 씨가 일부만 가지고 판단하는 거예요. 전체를 보면 다릅니다.`,
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: aTellCornered ? `Verbal Tell: ${aTellCornered.pattern}` : '"맥락"이라는 단어에서 목소리가 낮아진다.',
  })

  // 5. B가 증거/구체성 요구
  entries.push({
    speaker: 'b',
    text: `그럼 전체를 보여주세요! 구체적으로 말할 수 있잖아요. 못 하는 거 아니에요?`,
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: '도발하듯 몸을 앞으로 기울인다.',
  })

  // 6. A 회피
  entries.push({
    speaker: 'a',
    text: `그건... 심문 때 정리해서 말씀드리겠습니다.`,
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: '시선을 피한다.',
  })

  // 7. B가 잡아당김
  entries.push({
    speaker: 'b',
    text: `봐요, 또 숨기잖아요. 맨날 이래요 이 사람은!`,
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: '분노가 터져 나온다.',
  })

  // 8. A의 반격 — B의 약점 끌어옴
  if (bDispute) {
    entries.push({
      speaker: 'a',
      text: `숨기는 게 아닙니다. ${nameB} 씨, 그럼 ${bDispute.name}은 어떻게 설명할 건데요? ${nameB} 씨도 완전히 깨끗한 건 아니잖아요.`,
      relatedDisputes: [bDispute.id], turn: 0,
      behaviorHint: '반격으로 전환. 처음으로 상대를 직접 공격.',
    })

    entries.push({
      speaker: 'b',
      text: `... 그건, 그때 상황이 —`,
      relatedDisputes: [bDispute.id], turn: 0,
      behaviorHint: bTellDefensive ? `잠시 당황: ${bTellDefensive.pattern}` : '잠시 당황한다. 말이 작아진다.',
    })
  } else {
    entries.push({
      speaker: 'a',
      text: `저도 할 말이 있습니다. ${nameB} 씨도 완전히 깨끗한 건 아니잖아요.`,
      relatedDisputes: [], turn: 0,
      behaviorHint: '반격을 시도한다.',
    })
  }

  // 9. B가 A의 민감한 점 건드림 (있으면)
  if (aSensitive) {
    entries.push({
      speaker: 'b',
      text: `${nameA} 씨, ${aSensitive} 얘기는 왜 안 해요? 그게 이번 일이랑 관계없다고 생각해요?`,
      relatedDisputes: sub ? [sub.id] : [], turn: 0,
      behaviorHint: '의도적으로 민감한 부분을 건드린다.',
    })

    entries.push({
      speaker: 'a',
      text: `${aSensitive} 얘기는 하지 마세요. 그건 별개의 문제입니다.`,
      relatedDisputes: [], turn: 0,
      behaviorHint: '표정이 굳어진다. 방어적으로 변한다.',
    })
  }

  // 10. B의 감정 극대화 — triggerAmplifier 활용
  entries.push({
    speaker: 'b',
    text: context.triggerAmplifier
      ? `${context.triggerAmplifier.slice(0, 50)}... 이런 상황에서 ${nameA} 씨가 그런 짓을 한 거예요. 저도 무서웠다고요!`
      : `이런 상황에서 저한테 감정적이라고요?! 저도 참을 만큼 참은 거예요!`,
    relatedDisputes: main ? [main.id] : [], turn: 0,
    behaviorHint: '감정이 극에 달한다.',
  })

  // 11. 시스템 종료
  entries.push({
    speaker: 'system',
    text: '반박이 종료되었습니다. 양측의 주장이 첨예하게 대립하고 있습니다. 이제 재판관의 심문이 시작됩니다.',
    relatedDisputes: [], turn: 0,
  })

  return entries
}
