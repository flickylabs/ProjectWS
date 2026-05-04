import { useEffect, useMemo, useState } from 'react'
import { Phase } from '../../types'
import { useGameStore, useStore } from '../../store/useGameStore'
import { resolveLLMDialogue } from '../../engine/llmDialogueResolver'
import { isLLMMode } from '../../hooks/useActionDispatch'
import { getScriptedMediation } from '../../engine/scriptedTextLoader'
import { normalizeCaseKey } from '../../utils/caseHelpers'
import { buildBridgeFromStore } from '../../engine/phase6ResultPromptV2'
import { hasStructureV2 } from '../../engine/v2DataLoader'
import { loadMediationScript, type MediationScriptBundle } from '../../data/dialogues/mediationScriptLoader'
import PCSvgIcon from '../pc/icons/PCSvgIcon'
import type { PlayerAction } from '../../types'

type MediationPath = 'immediate' | 'conditional' | 'postpone' | 'fact_first'
type MediationPathInfo = { label: string; iconId: string; desc: string; impact: string; judge: string }

type MediationScriptState = {
  caseKey: string
  bundle: MediationScriptBundle | null
}

const PATH_LABELS: Record<MediationPath, MediationPathInfo> = {
  immediate: {
    label: '바로 판결 선고',
    iconId: 'i-scale',
    desc: '현재 확인된 기록을 기준으로 최종 판결문 작성 단계로 들어갑니다.',
    impact: '빠른 결론을 중시합니다. 미확정 쟁점은 판결 안정성 리스크로 남습니다.',
    judge: '쟁점은 충분히 드러났습니다. 더 지체하지 않고 지금 판결의 기준을 세우겠습니다.',
  },
  conditional: {
    label: '조건 붙여 조정',
    iconId: 'i-heart',
    desc: '책임 판단과 함께 사과, 상환, 접촉 제한 같은 실행 조건을 묶습니다.',
    impact: '관계 회복과 실행 가능성을 중시합니다. 일방 처분보다 상호 조건을 평가합니다.',
    judge: '지금은 누가 얼마나 책임을 지는지만 정하면 끝나지 않습니다. 서로 받아들일 조건까지 묶어 합의 가능한 선을 확인하겠습니다.',
  },
  postpone: {
    label: '미확정 쟁점 보류',
    iconId: 'i-doc',
    desc: '확실히 인정 가능한 부분만 판단하고, 부족한 쟁점은 보류로 남깁니다.',
    impact: '무리한 단정을 피합니다. 대신 판결의 완결성은 낮아질 수 있습니다.',
    judge: '성급한 결론을 서두르면 남은 상처가 더 커질 수 있습니다. 오늘 확정할 사실과 아직 다룰 쟁점을 나누어 판단하겠습니다.',
  },
  fact_first: {
    label: '사실관계 먼저 확정',
    iconId: 'i-search',
    desc: '책임 비율이나 해결책보다, 기록으로 인정 가능한 사실 범위를 먼저 고정합니다.',
    impact: '정확도와 기록성을 중시합니다. 감정 봉합이나 처분은 보수적으로 평가됩니다.',
    judge: '감정과 해법을 먼저 앞세우면 판단이 흐려집니다. 사실관계부터 분명히 고정한 뒤 책임과 해결책을 보겠습니다.',
  },
}

export default function Phase6_Mediation() {
  const [entryConfirmed, setEntryConfirmed] = useState(false)
  const [selectedPath, setSelectedPath] = useState<MediationPath | null>(null)
  const [loading, setLoading] = useState(false)
  const [showVerdictWarning, setShowVerdictWarning] = useState(false)
  const advancePhase = useStore((s) => s.advancePhase)
  const setPhase = useStore((s) => s.setPhase)
  const caseData = useStore((s) => s.caseData)
  const addDialogue = useStore((s) => s.addDialogue)
  const turnCount = useStore((s) => s.turnCount)
  const agentA = useStore((s) => s.agentA)
  const agentB = useStore((s) => s.agentB)
  const [mediationScriptState, setMediationScriptState] = useState<MediationScriptState | null>(null)
  const caseKey = normalizeCaseKey(caseData?.caseId ?? '')
  const mediationScript = mediationScriptState?.caseKey === caseKey ? mediationScriptState.bundle : null

  useEffect(() => {
    let alive = true

    if (!caseData?.caseId) return () => { alive = false }

    loadMediationScript(caseData.caseId)
      .then((bundle) => {
        if (alive) setMediationScriptState({ caseKey: normalizeCaseKey(caseData.caseId), bundle })
      })
      .catch(() => {
        if (alive) setMediationScriptState({ caseKey: normalizeCaseKey(caseData.caseId), bundle: null })
      })

    return () => { alive = false }
  }, [caseData?.caseId])

  useEffect(() => {
    if (!caseData) return
    const store = useGameStore.getState()
    if (store.phase3PromptBridge) return
    const currentCaseKey = caseData.caseId?.replace(/^case-/, '') ?? ''
    if (!hasStructureV2(currentCaseKey)) return
    const bridge = buildBridgeFromStore(
      currentCaseKey,
      { emotion: store.agentA.emotionalState.internalValue },
      { emotion: store.agentB.emotionalState.internalValue },
      store.dialogueLog,
      caseData.disputes,
    )
    if (bridge) store.setPhase3PromptBridge(bridge)
  }, [caseData])

  const unresolvedDisputes = useMemo(() => {
    return (caseData?.disputes ?? []).filter((dispute) => {
      const aState = agentA.lieStateMap[dispute.id]?.currentState
      const bState = agentB.lieStateMap[dispute.id]?.currentState
      return aState !== 'S5' && bState !== 'S5'
    })
  }, [agentA.lieStateMap, agentB.lieStateMap, caseData?.disputes])

  if (!caseData) return null
  const selectedInfo = selectedPath ? PATH_LABELS[selectedPath] : null
  const unresolvedNames = unresolvedDisputes.map((d) => d.name).slice(0, 3)
  const hasUnresolved = unresolvedDisputes.length > 0

  const handleSelect = async (path: MediationPath, force = false) => {
    if (path === 'immediate' && hasUnresolved && !force) {
      setShowVerdictWarning(true)
      return
    }
    setShowVerdictWarning(false)
    setSelectedPath(path)
    useGameStore.getState().setMediationChoice(path)

    const scriptBundle = mediationScript ?? await loadMediationScript(caseData.caseId)
    if (!mediationScript && scriptBundle) {
      setMediationScriptState({ caseKey: normalizeCaseKey(caseData.caseId), bundle: scriptBundle })
    }

    const scriptedPath = scriptBundle?.paths?.[path]
    const judgeText = scriptedPath?.judge ?? PATH_LABELS[path].judge
    addDialogue({ speaker: 'judge', text: judgeText, relatedDisputes: [], turn: turnCount })

    if (scriptedPath?.dialogues?.length) {
      for (const line of scriptedPath.dialogues) {
        addDialogue({
          speaker: line.speaker,
          text: line.text,
          relatedDisputes: line.relatedDisputes,
          turn: turnCount,
          behaviorHint: line.behaviorHint ?? undefined,
        })
      }
      if (path === 'immediate') advancePhase(Phase.Verdict)
      return
    }

    setLoading(true)
    const store = useGameStore.getState()
    const mediationCaseKey = normalizeCaseKey(caseData.caseId ?? '')
    const resultClass = pathToChoice(path)
    const mediationAction: PlayerAction = { type: 'mediation', choice: resultClass }
    let emittedResponse = false

    const scriptedA = getScriptedMediation(mediationCaseKey, 'a', resultClass)
    if (scriptedA) {
      store.addDialogue({ speaker: 'a', text: scriptedA.text, relatedDisputes: [], turn: store.turnCount, behaviorHint: scriptedA.behaviorHint })
      emittedResponse = true
    } else if (isLLMMode()) {
      try {
        store.setLLMLoading(true, 'a')
        const resultA = await resolveLLMDialogue(mediationAction, store.agentA, store.agentB, store.evidenceStates, caseData)
        store.setLLMLoading(false)
        if (resultA) {
          store.addDialogue({ speaker: 'a', text: resultA.node.text, relatedDisputes: [], turn: store.turnCount, behaviorHint: resultA.node.behaviorHint })
          emittedResponse = true
        }
      } catch {
        store.setLLMLoading(false)
      }
    }

    const freshStore = useGameStore.getState()
    const scriptedB = getScriptedMediation(mediationCaseKey, 'b', resultClass)
    if (scriptedB) {
      freshStore.addDialogue({ speaker: 'b', text: scriptedB.text, relatedDisputes: [], turn: freshStore.turnCount, behaviorHint: scriptedB.behaviorHint })
      emittedResponse = true
    } else if (isLLMMode()) {
      try {
        freshStore.setLLMLoading(true, 'b')
        const resultB = await resolveLLMDialogue(mediationAction, freshStore.agentA, freshStore.agentB, freshStore.evidenceStates, caseData)
        freshStore.setLLMLoading(false)
        if (resultB) {
          freshStore.addDialogue({ speaker: 'b', text: resultB.node.text, relatedDisputes: [], turn: freshStore.turnCount, behaviorHint: resultB.node.behaviorHint })
          emittedResponse = true
        }
      } catch {
        useGameStore.getState().setLLMLoading(false)
      }
    }

    if (path === 'immediate' && !emittedResponse) {
      useGameStore.getState().addDialogue({
        speaker: 'system',
        text: '판결 선고 선택이 기록되었습니다. 추가 반응을 생략하고 판결 검토로 이동합니다.',
        relatedDisputes: [],
        turn: useGameStore.getState().turnCount,
      })
    }

    setLoading(false)
    if (path === 'immediate') advancePhase(Phase.Verdict)
  }

  if (!entryConfirmed) {
    return (
      <div className="pc-mediation pc-mediation--entry">
        <section className="pc-mediation-entry" role="dialog" aria-modal="true" aria-labelledby="pc-mediation-entry-title">
          <div className="pc-mediation-entry__mark" aria-hidden="true">
            <PCSvgIcon id="i-scale" size={30} />
          </div>
          <div className="pc-mediation-entry__eyebrow">PHASE 3 · PRE-VERDICT REVIEW</div>
          <h2 id="pc-mediation-entry-title">판결 전 검토로 들어가시겠습니까?</h2>
          <p>
            지금부터는 심문을 이어갈지, 현재 기록을 닫고 판결 준비에 들어갈지 결정합니다.
            판결 전 검토에 들어가도 부족한 쟁점이 있으면 다시 심리로 돌아갈 수 있습니다.
          </p>
          {hasUnresolved ? (
            <div className="pc-mediation-entry__warning">
              <strong>아직 확정되지 않은 쟁점이 있습니다.</strong>
              <span>
                {unresolvedNames.join(', ')}
                {unresolvedDisputes.length > unresolvedNames.length ? ' 외' : ''}
                {' '}쟁점이 남아 있습니다. 그대로 진행하면 판결 안정성이 낮아질 수 있습니다.
              </span>
            </div>
          ) : (
            <div className="pc-mediation-entry__ready">
              <strong>현재 기록으로 판결 검토에 들어갈 수 있습니다.</strong>
              <span>그래도 추가로 확인하고 싶은 증거나 진술이 있다면 심문을 계속할 수 있습니다.</span>
            </div>
          )}
          <div className="pc-mediation-entry__actions">
            <button type="button" className="pc-mediation-entry__secondary" onClick={() => setPhase(Phase.Interrogation)}>
              추가 심리하기
            </button>
            <button type="button" className="pc-mediation-entry__primary" onClick={() => setEntryConfirmed(true)}>
              판결 전 검토 시작
            </button>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="pc-mediation">
      <section className="pc-mediation__card" role="dialog" aria-modal="true" aria-labelledby="pc-mediation-title">
        <div className="pc-mediation__header">
          <PCSvgIcon id="i-scale" size={18} />
          <span className="pc-mediation__title" id="pc-mediation-title">판결 전 검토</span>
          <span className="pc-mediation__subtitle">판결의 태도를 먼저 정한 뒤 판결문 작성으로 이동합니다.</span>
        </div>
        <div className="pc-mediation__review">
          <strong>{hasUnresolved ? '아직 확인되지 않은 쟁점이 남아 있습니다.' : '모든 쟁점이 판결 가능한 상태입니다.'}</strong>
          <p>
            {hasUnresolved
              ? `${unresolvedNames.join(', ')}${unresolvedDisputes.length > unresolvedNames.length ? ' 외' : ''} 쟁점이 완전히 확정되지 않았습니다.`
              : '현재 기록을 기준으로 판결 절차에 들어갈 수 있습니다.'}
          </p>
          <button className="pc-mediation__continue-btn" onClick={() => setPhase(Phase.Interrogation)} type="button">
            추가 심리하기
          </button>
        </div>

        {!selectedPath ? (
          <div className="pc-mediation__options">
            {showVerdictWarning ? (
              <div className="pc-mediation__warning" role="alert">
                <strong>미확정 쟁점이 남은 상태로 판결을 선고하시겠습니까?</strong>
                <p>판결은 가능하지만, 사실관계와 판결 안정성에서 불완전한 기록으로 평가될 수 있습니다.</p>
                <div className="pc-mediation__warning-actions">
                  <button type="button" onClick={() => setPhase(Phase.Interrogation)}>더 심리하기</button>
                  <button type="button" onClick={() => handleSelect('immediate', true)}>그래도 판결 선고</button>
                </div>
              </div>
            ) : null}
            {(Object.entries(PATH_LABELS) as Array<[MediationPath, typeof PATH_LABELS[MediationPath]]>).map(([id, item]) => (
              <button
                className="pc-mediation__option"
                key={id}
                onClick={() => handleSelect(id)}
                type="button"
              >
                <span className="pc-mediation__option-icon">
                  <PCSvgIcon id={item.iconId} size={20} />
                </span>
                <span className="pc-mediation__option-body">
                  <span className="pc-mediation__option-label">{item.label}</span>
                  <span className="pc-mediation__option-desc">{item.desc}</span>
                  <span className="pc-mediation__option-impact">{item.impact}</span>
                </span>
              </button>
            ))}
          </div>
        ) : null}

        {selectedInfo ? (
          <div className="pc-mediation__selected" role="status">
            <span className="pc-mediation__selected-kicker">선택한 판결 방향</span>
            <span className="pc-mediation__selected-name">
              <PCSvgIcon id={selectedInfo.iconId} size={18} />
              <span>{selectedInfo.label}</span>
            </span>
            <span className="pc-mediation__selected-desc">{selectedInfo.desc}</span>
          </div>
        ) : null}

        {loading ? (
          <div className="pc-mediation__loading">
            <div className="pc-mediation__spinner" />
            <span>양측 반응을 확인하고 있습니다...</span>
          </div>
        ) : null}

        {selectedPath && selectedPath !== 'immediate' && !loading ? (
          <div className="pc-mediation__advance">
            <p className="pc-mediation__advance-copy">판결 방향이 기록되었습니다. 선택한 방식은 판결 점수와 후일담에 반영됩니다.</p>
            <button className="pc-mediation__advance-btn" onClick={() => advancePhase(Phase.Verdict)} type="button">
              <PCSvgIcon id="i-gavel" size={18} />
              <span>판결로 진행</span>
            </button>
          </div>
        ) : null}
      </section>
    </div>
  )
}

function pathToChoice(path: MediationPath): 'immediate_verdict' | 'conditional_mediation' | 'postpone_investigation' | 'fact_first_solution_later' {
  const map: Record<MediationPath, 'immediate_verdict' | 'conditional_mediation' | 'postpone_investigation' | 'fact_first_solution_later'> = {
    immediate: 'immediate_verdict',
    conditional: 'conditional_mediation',
    postpone: 'postpone_investigation',
    fact_first: 'fact_first_solution_later',
  }
  return map[path]
}
