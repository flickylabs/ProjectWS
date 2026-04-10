import { useEffect, useState } from 'react'
import { loadGeneratedCases } from '../../../data/cases/caseLoader'
import { GamePhase } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { saveCaseProgress } from '../../phase/CaseMap'
import Aftermath, { resetAftermathCache } from '../../result/Aftermath'
import JudgeProfileReport from '../../result/JudgeProfileReport'
import ScoreBreakdown from '../../result/ScoreBreakdown'
import ShareResult from '../../result/ShareResult'
import TitleReveal from '../../result/TitleReveal'
import TruthReveal from '../../result/TruthReveal'
import VerdictSummaryTab from '../../result/VerdictSummaryTab'

type ResultTab = 'score' | 'truth' | 'titles' | 'aftermath' | 'verdict_summary' | 'profile' | 'share'

const TABS: { id: ResultTab; label: string }[] = [
  { id: 'score', label: '점수 분석' },
  { id: 'truth', label: '진실 해설' },
  { id: 'titles', label: '획득 칭호' },
  { id: 'aftermath', label: '후일담' },
  { id: 'verdict_summary', label: '판결문' },
  { id: 'profile', label: '재판관 성향' },
  { id: 'share', label: '공유' },
]

function getRating(total: number): string {
  if (total >= 90) return '전설적인 재판관'
  if (total >= 75) return '훌륭한 재판관'
  if (total >= 60) return '능숙한 재판관'
  if (total >= 40) return '보통의 재판관'
  if (total >= 20) return '미숙한 재판관'
  return '판단 실패'
}

function getRelationLabel(relationshipType: string): string {
  const labels: Record<string, string> = {
    spouse: '부부',
    family: '가족',
    friend: '친구',
    neighbor: '이웃',
    partnership: '동업',
    workplace: '직장',
    boss_employee: '직장',
    tenant: '세입자',
    tenant_landlord: '세입자',
    headline: '헤드라인',
    online: '온라인',
    professional: '의료·교육',
    medical_education: '의료·교육',
    civic: '공공·제도',
    public_system: '공공·제도',
  }

  return labels[relationshipType] ?? relationshipType
}

export default function PCResultScreen() {
  const verdictScore = useStore((s) => s.verdictScore)
  const caseData = useStore((s) => s.caseData)
  const initializeCase = useStore((s) => s.initializeCase)
  const [tab, setTab] = useState<ResultTab>('score')

  useEffect(() => {
    if (verdictScore && caseData) {
      saveCaseProgress(caseData.caseId, verdictScore.total)
    }
  }, [caseData, verdictScore])

  if (!verdictScore || !caseData) {
    return null
  }

  const stars = verdictScore.total >= 75 ? 3 : verdictScore.total >= 55 ? 2 : verdictScore.total >= 35 ? 1 : 0
  const relationLabel = getRelationLabel(caseData.meta?.relationshipType ?? caseData.duo.relationshipType)
  const headline = caseData.disputes[0]?.name ?? caseData.context.description
  const diffOrder: Record<string, number> = { easy: 0, medium: 1, hard: 2 }
  const allCases = loadGeneratedCases()
  const sessionCases = allCases
    .filter((item) => item.duo.relationshipType === caseData.duo.relationshipType)
    .sort((a, b) => (diffOrder[a.meta?.difficulty ?? 'medium'] ?? 1) - (diffOrder[b.meta?.difficulty ?? 'medium'] ?? 1))
  const currentIdx = sessionCases.findIndex((item) => item.caseId === caseData.caseId)
  const nextCase = currentIdx >= 0 ? sessionCases[currentIdx + 1] : null

  const handleExit = () => {
    resetAftermathCache()
    const state = useGameStore.getState()
    state.clearSavedGame?.()
    state.clearDialogue()
    useGameStore.setState({ caseData: null })
    state.setPhase(GamePhase.Phase0_CaseIntro)
  }

  const handleNextCase = () => {
    if (!nextCase) {
      handleExit()
      return
    }

    resetAftermathCache()
    initializeCase(nextCase)
  }

  const handleRetry = () => {
    useGameStore.getState().resetVerdict()
    useGameStore.getState().setPhase(GamePhase.Phase7_Verdict)
  }

  return (
    <div className="pc-result-screen">
      <div className="pc-result-shell">
        <aside className="pc-result-hero">
          <div className="pc-result-hero__eyebrow">RESULT DOSSIER</div>
          <h1>{headline}</h1>
          <p className="pc-result-hero__summary">{caseData.context.description}</p>

          <div className="pc-result-score">
            <span className="pc-result-score__value">{verdictScore.total}</span>
            <span className="pc-result-score__unit">점</span>
          </div>

          <div className="pc-result-hero__rating">{getRating(verdictScore.total)}</div>
          <div className="pc-result-hero__stars" aria-label={`별 ${stars}개`}>
            {Array.from({ length: 3 }, (_, index) => (
              <span className={index < stars ? 'is-filled' : ''} key={index}>★</span>
            ))}
          </div>

          <div className="pc-result-hero__meta">
            <div className="pc-result-hero__meta-card">
              <span>관계</span>
              <strong>{relationLabel}</strong>
            </div>
            <div className="pc-result-hero__meta-card">
              <span>쟁점</span>
              <strong>{caseData.disputes.length}개</strong>
            </div>
            <div className="pc-result-hero__meta-card">
              <span>증거</span>
              <strong>{caseData.evidence.length}종</strong>
            </div>
          </div>

          <div className="pc-result-hero__actions">
            <button className="pc-result-hero__button" onClick={handleExit} type="button">
              사건 선택으로
            </button>
            {nextCase ? (
              <button className="pc-result-hero__button is-primary" onClick={handleNextCase} type="button">
                다음 사건
              </button>
            ) : null}
            <button className="pc-result-hero__button is-ghost" onClick={handleRetry} type="button">
              판결 다시 하기
            </button>
          </div>
        </aside>

        <section className="pc-result-main">
          <div className="pc-result-tabs" role="tablist">
            {TABS.map((item) => (
              <button
                aria-selected={tab === item.id}
                className={`pc-result-tab${tab === item.id ? ' is-active' : ''}`}
                key={item.id}
                onClick={() => setTab(item.id)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pc-result-panel">
            {tab === 'score' ? <ScoreBreakdown score={verdictScore} /> : null}
            {tab === 'truth' ? <TruthReveal /> : null}
            {tab === 'titles' ? <TitleReveal /> : null}
            {tab === 'aftermath' ? <Aftermath /> : null}
            {tab === 'verdict_summary' ? <VerdictSummaryTab /> : null}
            {tab === 'profile' ? <JudgeProfileReport /> : null}
            {tab === 'share' ? <ShareResult /> : null}
          </div>
        </section>
      </div>
    </div>
  )
}
