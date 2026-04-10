import { useEffect } from 'react'
import { GamePhase } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { beginCasePrefetch } from '../../phase/Phase0_CaseIntro'
import { stopBgm } from '../../../engine/soundEngine'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId } from '../icons/pcIconUtils'

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

  if (!caseData) return null

  const { duo, context } = caseData
  const faceA = getPcFaceSymbolId('a', duo.partyA, 'defensive')
  const faceB = getPcFaceSymbolId('b', duo.partyB, 'defensive')
  const initialDisputes = caseData.disputes
    .filter((d) => d.weight === 'high' && d.quadrant !== 'neither_knows' && d.quadrant !== 'shared_misconception')
    .slice(0, 3)
  const hiddenCount = caseData.disputes.length - initialDisputes.length
  const ledgerEntries = duo.relationshipLedger
    .filter((l) => caseData.activeLedgerEntries.includes(l.id) || l.connectionToCurrent === 'direct')
    .slice(0, 3)

  return (
    <div className="pc-brief">
      {/* Header */}
      <header className="pc-brief__header">
        <button className="pc-brief__back" onClick={handleExit} type="button">
          <span>←</span>
          <span>사건 목록</span>
        </button>
        <div className="pc-brief__case-id">
          <PCSvgIcon id="i-scale" size={18} />
          <span>{caseData.caseId}</span>
          <span className="pc-brief__relation">{RELATION_LABELS[duo.relationshipType] ?? duo.relationshipType}</span>
        </div>
      </header>

      {/* Scrollable body */}
      <div className="pc-brief__scroll">
        <div className="pc-brief__card">

          {/* Section 1: 당사자 VS 대칭 */}
          <section className="pc-brief__versus">
            <div className="pc-brief__party pc-brief__party--a">
              <div className="pc-brief__party-face">
                <PCSvgIcon id={faceA} size={64} />
              </div>
              <span className="pc-brief__party-badge">A</span>
              <span className="pc-brief__party-name is-a">{duo.partyA.name}</span>
              <span className="pc-brief__party-meta">{duo.partyA.age}세 · {duo.partyA.occupation}</span>
              <span className="pc-brief__party-trait">{ARCHETYPE_LABELS[duo.partyA.archetype] ?? duo.partyA.archetype}</span>
            </div>

            <div className="pc-brief__vs-center">
              <PCSvgIcon id="i-conflict" size={28} />
              <span className="pc-brief__vs-label">VS</span>
              <span className="pc-brief__vs-relation">{RELATION_LABELS[duo.relationshipType] ?? ''}</span>
            </div>

            <div className="pc-brief__party pc-brief__party--b">
              <div className="pc-brief__party-face">
                <PCSvgIcon id={faceB} size={64} />
              </div>
              <span className="pc-brief__party-badge">B</span>
              <span className="pc-brief__party-name is-b">{duo.partyB.name}</span>
              <span className="pc-brief__party-meta">{duo.partyB.age}세 · {duo.partyB.occupation}</span>
              <span className="pc-brief__party-trait">{ARCHETYPE_LABELS[duo.partyB.archetype] ?? duo.partyB.archetype}</span>
            </div>
          </section>

          {/* Section 2: 사건 배경 */}
          <section className="pc-brief__section">
            <h2 className="pc-brief__section-title">
              <PCSvgIcon id="i-search" size={15} />
              <span>사건 배경</span>
            </h2>
            <p className="pc-brief__context-text">{context.description}</p>
            {context.triggerAmplifier ? (
              <div className="pc-brief__trigger">
                <PCSvgIcon id="i-bolt" size={14} />
                <span>{context.triggerAmplifier}</span>
              </div>
            ) : null}
          </section>

          {/* Section 3: 주요 쟁점 + 관련 인물 (2열) */}
          <div className="pc-brief__two-col">
            <section className="pc-brief__section">
              <h2 className="pc-brief__section-title">
                <PCSvgIcon id="i-gavel" size={15} />
                <span>주요 쟁점</span>
              </h2>
              <div className="pc-brief__dispute-list">
                {initialDisputes.map((d, i) => (
                  <div className="pc-brief__dispute-card" key={d.id}>
                    <span className="pc-brief__dispute-num">{i + 1}</span>
                    <div className="pc-brief__dispute-body">
                      <span className="pc-brief__dispute-name">{d.name}</span>
                      <span className="pc-brief__dispute-desc">{d.truthDescription}</span>
                    </div>
                    <span className="pc-brief__dispute-weight">핵심</span>
                  </div>
                ))}
              </div>
              {hiddenCount > 0 ? (
                <p className="pc-brief__dispute-hint">
                  <PCSvgIcon id="i-lock" size={11} />
                  <span>심문 과정에서 추가 쟁점이 드러날 수 있습니다</span>
                </p>
              ) : null}
            </section>

            <section className="pc-brief__section">
              {ledgerEntries.length > 0 ? (
                <>
                  <h2 className="pc-brief__section-title">
                    <PCSvgIcon id="i-clock" size={15} />
                    <span>과거 이력</span>
                  </h2>
                  <div className="pc-brief__history-list">
                    {ledgerEntries.map((l) => (
                      <div className="pc-brief__history-card" key={l.id}>
                        <span className={`pc-brief__history-mark ${l.category === 'confirmed' ? 'is-match' : l.category === 'distorted' ? 'is-conflict' : 'is-hidden'}`}>
                          <PCSvgIcon id={l.category === 'confirmed' ? 'i-shield' : l.category === 'distorted' ? 'i-conflict' : 'i-eye'} size={12} />
                        </span>
                        <div className="pc-brief__history-body">
                          <span className="pc-brief__history-text">{l.description}</span>
                          <span className="pc-brief__history-label">
                            {l.category === 'confirmed' ? '양쪽 일치' : l.category === 'distorted' ? '기억이 다름' : '묻어둔 일'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              {duo.socialGraph.length > 0 ? (
                <>
                  <h2 className="pc-brief__section-title pc-brief__section-title--mt">
                    <PCSvgIcon id="i-person" size={15} />
                    <span>관련 인물</span>
                  </h2>
                  <div className="pc-brief__social-list">
                    {duo.socialGraph
                      .filter((tp) => tp.slot === 'family_1' || tp.slot === 'family_2' || tp.slot === 'acquaintance_1' || tp.slot === 'institutional')
                      .slice(0, 4)
                      .map((tp) => (
                        <span className={`pc-brief__social-chip ${tp.bias === 'pro_a' ? 'is-a' : tp.bias === 'pro_b' ? 'is-b' : ''}`} key={tp.id}>
                          <span className={`pc-brief__social-dot ${tp.bias === 'pro_a' ? 'is-a' : tp.bias === 'pro_b' ? 'is-b' : ''}`} />
                          {tp.name.replace(/\s*[（(][^)）]+[)）]\s*$/, '')}
                        </span>
                      ))}
                  </div>
                </>
              ) : null}
            </section>
          </div>
        </div>

        {/* Start button — outside card, centered */}
        <footer className="pc-brief__footer">
          <button className="pc-brief__start" onClick={handleStart} type="button">
            <PCSvgIcon id="i-gavel" size={24} />
            <span>초기 진술 듣기</span>
            <kbd>Enter</kbd>
          </button>
          <p className="pc-brief__footer-hint">양측의 초기 진술과 반박을 순서대로 청취합니다</p>
        </footer>
      </div>
    </div>
  )
}
