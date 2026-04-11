import { useEffect, useMemo } from 'react'
import { GamePhase } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { beginCasePrefetch } from '../../phase/Phase0_CaseIntro'
import { stopBgm } from '../../../engine/soundEngine'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId, getPcEvidenceSymbolId } from '../icons/pcIconUtils'

const ARCHETYPE_LABELS: Record<string, string> = {
  avoidant: '회피형', confrontational: '정면돌파형',
  victim_cosplay: '피해자형', cold_logic: '냉정논리형',
  affect_flattening: '감정억제형', premature_summary: '조기결론형',
}

const RELATION_LABELS: Record<string, string> = {
  spouse: '부부', neighbor: '이웃', boss_employee: '직장', partnership: '동업',
  family: '가족', tenant_landlord: '세입자-집주인', friend: '친구', headline: '헤드라인',
}

export default function PCCaseBrief() {
  const caseData = useStore((s) => s.caseData)
  const advancePhase = useStore((s) => s.advancePhase)

  useEffect(() => { stopBgm() }, [])
  useEffect(() => { beginCasePrefetch(caseData) }, [caseData])

  const handleStart = () => advancePhase(GamePhase.Phase1_InitialStatement)
  const handleExit = () => {
    useGameStore.getState().clearSavedGame?.()
    useGameStore.setState({ caseData: null })
    useGameStore.getState().setPhase(GamePhase.Phase0_CaseIntro)
    useGameStore.getState().clearDialogue()
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') { handleStart() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const baseEvidence = useMemo(() => {
    if (!caseData) return []
    const baseIds = caseData.baseEvidenceIds ?? []
    return baseIds
      .map((id) => caseData.evidence.find((e) => e.id === id))
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .slice(0, 3)
  }, [caseData])

  if (!caseData) return null

  const { duo, meta } = caseData
  const faceA = getPcFaceSymbolId('a', duo.partyA, 'defensive')
  const faceB = getPcFaceSymbolId('b', duo.partyB, 'defensive')
  const title = meta?.title ?? caseData.caseId
  const bait = meta?.emotionalBait ?? ''
  const versionTag = caseData.caseId.replace(/^case-/, '').replace(/^(spouse|family|friend|neighbor|tenant|partnership|workplace|headline)-/, '')

  const initialDisputes = caseData.disputes
    .filter((d) => d.weight === 'high' && d.quadrant !== 'neither_knows' && d.quadrant !== 'shared_misconception')
    .slice(0, 3)
  const hiddenCount = caseData.disputes.length - initialDisputes.length

  return (
    <div className="pc-brief">
      <header className="pc-brief__header">
        <button className="pc-brief__back" onClick={handleExit} type="button">
          <span>←</span>
          <span>사건 목록</span>
        </button>
        <div className="pc-brief__case-id">
          <PCSvgIcon id="i-scale" size={16} />
          <span className="pc-brief__relation">{RELATION_LABELS[duo.relationshipType] ?? duo.relationshipType}</span>
        </div>
      </header>

      <div className="pc-brief__scroll">
        <div className="pc-brief__card">

          {/* 사건 제목 */}
          <div className="pc-brief__title-area">
            <h1 className="pc-brief__title">{title}</h1>
            {bait ? <p className="pc-brief__bait">{bait}</p> : null}
          </div>

          {/* 캐릭터 VS — 가로 컴팩트 */}
          <section className="pc-brief__versus-compact">
            <div className="pc-brief__party-row pc-brief__party-row--a">
              <div className="pc-brief__party-text is-right">
                <span className="pc-brief__party-name is-a">{duo.partyA.name}</span>
                <span className="pc-brief__party-meta">{duo.partyA.age}세 · {duo.partyA.occupation}</span>
                <span className="pc-brief__party-trait">{ARCHETYPE_LABELS[duo.partyA.archetype] ?? ''}</span>
              </div>
              <div className="pc-brief__party-face is-a">
                <PCSvgIcon id={faceA} size={52} />
              </div>
            </div>

            <div className="pc-brief__vs-badge">
              <span>VS</span>
            </div>

            <div className="pc-brief__party-row pc-brief__party-row--b">
              <div className="pc-brief__party-face is-b">
                <PCSvgIcon id={faceB} size={52} />
              </div>
              <div className="pc-brief__party-text is-left">
                <span className="pc-brief__party-name is-b">{duo.partyB.name}</span>
                <span className="pc-brief__party-meta">{duo.partyB.age}세 · {duo.partyB.occupation}</span>
                <span className="pc-brief__party-trait">{ARCHETYPE_LABELS[duo.partyB.archetype] ?? ''}</span>
              </div>
            </div>
          </section>

          {/* 하단 2열: 쟁점 + 초기 증거 */}
          <div className="pc-brief__two-col">
            <section className="pc-brief__section">
              <h2 className="pc-brief__section-title">
                <PCSvgIcon id="i-gavel" size={14} />
                <span>주요 쟁점</span>
              </h2>
              <div className="pc-brief__dispute-list">
                {initialDisputes.map((d, i) => (
                  <div className="pc-brief__dispute-card" key={d.id}>
                    <span className="pc-brief__dispute-num">{i + 1}</span>
                    <span className="pc-brief__dispute-name">{d.name}</span>
                  </div>
                ))}
              </div>
              {hiddenCount > 0 ? (
                <p className="pc-brief__dispute-hint">
                  <PCSvgIcon id="i-lock" size={10} />
                  <span>심문 과정에서 추가 쟁점이 드러날 수 있습니다</span>
                </p>
              ) : null}
            </section>

            <section className="pc-brief__section">
              <h2 className="pc-brief__section-title">
                <PCSvgIcon id="i-doc" size={14} />
                <span>초기 증거</span>
              </h2>
              <div className="pc-brief__evidence-list">
                {baseEvidence.length > 0 ? baseEvidence.map((ev) => (
                  <div className="pc-brief__evidence-card" key={ev.id}>
                    <span className="pc-brief__evidence-icon">
                      <PCSvgIcon id={getPcEvidenceSymbolId(ev.type)} size={16} />
                    </span>
                    <span className="pc-brief__evidence-name">{ev.surfaceName ?? ev.name}</span>
                  </div>
                )) : (
                  <p className="pc-brief__evidence-empty">초기 증거가 아직 지정되지 않았습니다</p>
                )}
              </div>
            </section>
          </div>
        </div>

        <footer className="pc-brief__footer">
          <button className="pc-brief__start" onClick={handleStart} type="button">
            <PCSvgIcon id="i-gavel" size={22} />
            <span>초기 진술 듣기</span>
            <kbd>Enter</kbd>
          </button>
        </footer>
      </div>
    </div>
  )
}
