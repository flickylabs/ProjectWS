import type {
  BeatType,
  CaseData,
  ContradictionEvent,
  EmotionalOutburstEvent,
  GameEventTexts,
  InterjectionEvent,
  LieState,
  PartyId,
  StateUnlockAtom,
  TransitionBeat,
  V3GameLoopData,
} from '../../types'

type PartialV3GameLoopData = Partial<V3GameLoopData> & {
  caseId?: string
  dossierCards?: V3GameLoopData['dossierCards']
  stateUnlockAtoms?: V3GameLoopData['stateUnlockAtoms']
}

const STATE_ORDER: LieState[] = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']

function normalizeCaseId(caseData: CaseData, rawData: PartialV3GameLoopData): string {
  return String(rawData.caseId || caseData.caseId || '').replace(/^case-/, '')
}

function getPartyName(caseData: CaseData, party: PartyId): string {
  return party === 'a'
    ? String(caseData?.duo?.partyA?.name || 'A')
    : String(caseData?.duo?.partyB?.name || 'B')
}

function quoteDispute(name: string): string {
  return `‘${String(name || '').trim()}’`
}

function hasMeaningfulEvents(events: Partial<GameEventTexts> | undefined): boolean {
  if (!events) return false
  return (
    Array.isArray(events.contradictions) && events.contradictions.length > 0
  ) || (
    Array.isArray(events.interjections) && events.interjections.length > 0
  ) || (
    Array.isArray(events.emotionalOutbursts) && events.emotionalOutbursts.length > 0
  )
}

function normalizeEvents(events: Partial<GameEventTexts> | undefined): GameEventTexts {
  return {
    contradictions: Array.isArray(events?.contradictions) ? events.contradictions : [],
    interjections: Array.isArray(events?.interjections) ? events.interjections : [],
    emotionalOutbursts: Array.isArray(events?.emotionalOutbursts) ? events.emotionalOutbursts : [],
  }
}

function buildFallbackEvents(caseData: CaseData, caseId: string): GameEventTexts {
  const disputes = caseData.disputes ?? []
  const first = disputes[0]
  const second = disputes[1] ?? first
  const third = disputes[2] ?? second ?? first
  const partyA = getPartyName(caseData, 'a')
  const partyB = getPartyName(caseData, 'b')

  const contradictions: ContradictionEvent[] = first ? [
    {
      id: `${caseId}-fallback-contradiction-1`,
      statementA: `${partyA}은 ${quoteDispute(first.name)} 문제를 자기 쪽 피해로 먼저 고정하려 한다.`,
      statementB: `${partyB}은 ${quoteDispute(first.name)} 문제는 결과보다 경위를 같이 봐야 한다고 맞선다.`,
      options: {
        point_out: {
          label: '충돌을 짚는다',
          effect: '같은 장면을 두고 서로 다른 해석이 정면으로 부딪힌다.',
        },
        let_go: {
          label: '다음 실마리를 기다린다',
          effect: '핵심 충돌을 잠시 보류하고 추가 자료를 더 모은다.',
        },
      },
      npcReaction: `${quoteDispute(first.name)} 문제를 두고 결과 해석과 경위 해석이 갈라진다.`,
    },
    ...(second ? [{
      id: `${caseId}-fallback-contradiction-2`,
      statementA: `${partyA}은 ${quoteDispute(second.name)} 문제까지 보면 상대 설명이 더 수상해진다고 말한다.`,
      statementB: `${partyB}은 ${quoteDispute(second.name)} 문제를 떼어 내면 판단이 기울어진다고 반박한다.`,
      options: {
        point_out: {
          label: '연결고리를 짚는다',
          effect: '앞선 다툼과 이번 다툼이 같은 축에서 이어진다는 점이 드러난다.',
        },
        let_go: {
          label: '지금은 넘긴다',
          effect: '쟁점 연결은 잠시 미뤄 두고 다음 증거로 넘어간다.',
        },
      },
      npcReaction: `${quoteDispute(second.name)} 문제가 앞선 갈등과 이어지면서 한쪽 주장만으로 정리하기 어려워진다.`,
    }] : []),
  ] : []

  const interjections: InterjectionEvent[] = [
    {
      id: `${caseId}-fallback-interjection-a`,
      interruptor: 'a',
      interjectionLine: `${partyA}은 ${quoteDispute((first ?? second ?? third)?.name || '핵심 쟁점')} 문제에서 자기 억울함이 빠졌다고 끼어든다.`,
      options: {
        allow: {
          label: '더 듣는다',
          effect: 'A의 감정선과 자기 해석이 조금 더 길게 드러난다.',
        },
        block: {
          label: '질문으로 돌린다',
          effect: '감정 호소를 끊고 사실 확인 질문으로 복귀한다.',
        },
      },
    },
    {
      id: `${caseId}-fallback-interjection-b`,
      interruptor: 'b',
      interjectionLine: `${partyB}은 ${quoteDispute((second ?? first ?? third)?.name || '핵심 쟁점')} 문제까지 같이 봐야 한다고 말을 자른다.`,
      options: {
        allow: {
          label: '이유를 듣는다',
          effect: 'B가 왜 그 연결을 붙들고 있는지 더 구체적으로 드러난다.',
        },
        block: {
          label: '범위를 좁힌다',
          effect: '확인된 사실만 남기고 해석 확장을 잠시 멈춘다.',
        },
      },
    },
  ]

  const emotionalOutbursts: EmotionalOutburstEvent[] = [
    {
      id: `${caseId}-fallback-outburst-a`,
      party: 'a',
      outburstLine: `${partyA}은 ${quoteDispute((third ?? first ?? second)?.name || '핵심 쟁점')} 문제까지 전부 악의로만 읽히는 순간 감정이 크게 흔들린다.`,
      options: {
        press: {
          label: '계속 묻는다',
          effect: 'A가 감정 속에서도 자기 책임과 상대 책임의 선을 더 분명히 말하게 된다.',
        },
        calm: {
          label: '숨을 돌리게 한다',
          effect: 'A가 격앙 대신 경위 설명으로 다시 돌아올 시간을 번다.',
        },
      },
    },
    {
      id: `${caseId}-fallback-outburst-b`,
      party: 'b',
      outburstLine: `${partyB}은 ${quoteDispute((second ?? third ?? first)?.name || '핵심 쟁점')} 문제의 숨긴 이유까지 단정당하자 말끝이 크게 흔들린다.`,
      options: {
        press: {
          label: '핵심을 더 겨눈다',
          effect: 'B가 감춰 온 동기나 맥락을 더 빨리 꺼내게 된다.',
        },
        calm: {
          label: '맥락부터 듣는다',
          effect: 'B가 방어를 조금 내려놓고 숨긴 이유를 더 길게 설명한다.',
        },
      },
    },
  ]

  return { contradictions, interjections, emotionalOutbursts }
}

function getPreviousState(state: LieState): LieState | null {
  const index = STATE_ORDER.indexOf(state)
  return index > 0 ? STATE_ORDER[index - 1] : null
}

function mapHintToBeatType(atom: StateUnlockAtom, state: LieState): BeatType {
  const hint = Array.isArray(atom.stanceHints) ? atom.stanceHints[0] : null
  if (hint === 'confess') return 'confession'
  if (hint === 'deny' || hint === 'hedge' || hint === 'partial' || hint === 'blame' || hint === 'emotional') {
    return hint
  }
  if (state === 'S5') return 'confession'
  if (state === 'S4') return 'emotional'
  if (state === 'S3') return 'partial'
  return 'hedge'
}

function buildBehaviorHint(disputeName: string, state: LieState): string {
  if (state === 'S5') {
    return `${quoteDispute(disputeName)} 문제를 더는 버티지 못하고 가장 아픈 사실을 직접 시인한다.`
  }
  if (state === 'S4') {
    return `${quoteDispute(disputeName)} 문제에서 버티던 논리가 무너지며 숨긴 동기를 더 직접적으로 털어놓는다.`
  }
  if (state === 'S3') {
    return `${quoteDispute(disputeName)} 문제를 끝까지 피하지 못하고 핵심 사실 일부를 인정하기 시작한다.`
  }
  return `${quoteDispute(disputeName)} 문제에서 말의 결이 한 단계 흔들린다.`
}

function buildFallbackTransitionBeats(caseData: CaseData, rawData: PartialV3GameLoopData, caseId: string): TransitionBeat[] {
  const stateUnlockAtoms = rawData.stateUnlockAtoms
  if (!stateUnlockAtoms) return []

  const disputeNameMap = new Map((caseData.disputes ?? []).map((dispute) => [dispute.id, dispute.name]))
  const beats: TransitionBeat[] = []

  for (const party of ['a', 'b'] as const) {
    const partyMap = (stateUnlockAtoms[party] ?? {}) as Record<string, Partial<Record<LieState, StateUnlockAtom[]>>>
    for (const [disputeId, stateMap] of Object.entries(partyMap)) {
      for (const state of STATE_ORDER) {
        const atoms = stateMap?.[state]
        const fromState = getPreviousState(state)
        if (!fromState || !Array.isArray(atoms) || atoms.length === 0) continue

        atoms.forEach((atom, index) => {
          const primaryBeatType = mapHintToBeatType(atom, state)
          beats.push({
            id: `${caseId}-fallback-beat-${party}-${disputeId}-${fromState}-${state}-${index}`,
            caseId,
            party,
            disputeId,
            fromState,
            toState: state,
            primaryBeatType,
            secondaryBeatType: primaryBeatType === 'confession' ? 'emotional' : 'partial',
            line: atom.factText,
            behaviorHint: buildBehaviorHint(disputeNameMap.get(disputeId) || disputeId, state),
          })
        })
      }
    }
  }

  return beats
}

export function ensureV3RuntimeGameLoopData(caseData: CaseData, rawData: PartialV3GameLoopData): V3GameLoopData {
  const caseId = normalizeCaseId(caseData, rawData)
  const events = hasMeaningfulEvents(rawData.events)
    ? normalizeEvents(rawData.events)
    : buildFallbackEvents(caseData, caseId)
  const transitionBeats = Array.isArray(rawData.transitionBeats) && rawData.transitionBeats.length > 0
    ? rawData.transitionBeats
    : buildFallbackTransitionBeats(caseData, rawData, caseId)

  return {
    caseId,
    dossierCards: Array.isArray(rawData.dossierCards) ? rawData.dossierCards : [],
    stateUnlockAtoms: rawData.stateUnlockAtoms ?? { a: {}, b: {} },
    events,
    transitionBeats,
  }
}
