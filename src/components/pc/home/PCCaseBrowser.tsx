import { useMemo, useState } from 'react'
import type { CaseData } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getDifficultyLabel, sortCasesForBrowser } from './pcHomeShared'

const CLEAR_SCORE_THRESHOLD = 40

interface Props {
  accentIconId?: string
  eyebrow?: string
  title: string
  description: string
  progressLabel?: string
  cases: CaseData[]
  onBack: () => void
  onSelectCase: (caseData: CaseData) => void
  showCompletedFilter?: boolean
  emptyTitle?: string
  emptyDescription?: string
}

export default function PCCaseBrowser({
  eyebrow,
  title,
  description,
  progressLabel,
  cases,
  onBack,
  onSelectCase,
  showCompletedFilter = false,
  emptyTitle = '현재 조건에 맞는 사건이 없습니다.',
  emptyDescription = '다른 세션을 고르거나 필터를 조정한 뒤 다시 확인해 주세요.',
}: Props) {
  const [showCompletedOnly, setShowCompletedOnly] = useState(false)
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null)

  const progressMap = useMemo(() => {
    try {
      const raw = localStorage.getItem('solomon-case-progress')
      return raw ? JSON.parse(raw) : {}
    } catch { return {} }
  }, [])

  const filteredCases = useMemo(() => {
    const sorted = sortCasesForBrowser(cases)
    if (!showCompletedFilter || !showCompletedOnly) return sorted
    return sorted.filter(c => (progressMap[c.caseId]?.bestScore ?? 0) >= CLEAR_SCORE_THRESHOLD)
  }, [cases, progressMap, showCompletedFilter, showCompletedOnly])

  const stages = useMemo(() => {
    let prevCleared = true
    return filteredCases.map((caseData, i) => {
      const score = progressMap[caseData.caseId]?.bestScore ?? 0
      const cleared = score >= CLEAR_SCORE_THRESHOLD
      const unlocked = i === 0 || prevCleared
      prevCleared = cleared
      return { caseData, num: String(i + 1).padStart(2, '0'), score, cleared, unlocked }
    })
  }, [filteredCases, progressMap])

  // 기본 선택: 최근 해금된 스테이지
  const defaultId = useMemo(() => {
    if (stages.length === 0) return null
    let latest = stages[0].caseData.caseId
    for (const s of stages) { if (!s.unlocked) break; latest = s.caseData.caseId }
    return latest
  }, [stages])

  const activeId = selectedCaseId ?? defaultId
  const activeStage = stages.find(s => s.caseData.caseId === activeId)
  const activeCase = activeStage?.caseData ?? null

  return (
    <div className="cb">
      {/* ── 헤더 ── */}
      <header className="cb__header">
        <button className="pc-depth-back" onClick={onBack} type="button"><span aria-hidden="true">‹</span> 뒤로</button>
        <div className="cb__header-info">
          <span className="cb__eyebrow">{eyebrow ?? 'CASE BROWSER'}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="cb__header-tools">
          {showCompletedFilter && (
            <button className={`pc-filter-pill-v2${showCompletedOnly ? ' is-active' : ''}`} onClick={() => setShowCompletedOnly(v => !v)} type="button">
              완료 기록만
            </button>
          )}
          <span className="cb__count">{progressLabel ?? `${filteredCases.length}건`}</span>
        </div>
      </header>

      {stages.length === 0 ? (
        <div className="cb__empty">
          <PCSvgIcon id="i-doc" size={28} />
          <strong>{emptyTitle}</strong>
          <p>{emptyDescription}</p>
        </div>
      ) : (
        <div className="cb__split">
          {/* 좌: 스테이지 맵 */}
          <div className="cb__stages">
            {stages.map(s => {
              const active = activeId === s.caseData.caseId
              return (
                <button
                  key={s.caseData.caseId}
                  className={`cb__stage${active ? ' is-active' : ''}${s.cleared ? ' is-cleared' : ''}${!s.unlocked ? ' is-locked' : ''}`}
                  disabled={!s.unlocked}
                  onClick={() => setSelectedCaseId(s.caseData.caseId)}
                  type="button"
                >
                  <span className="cb__stage-num">{s.num}</span>
                  <div className="cb__stage-body">
                    <span className="cb__stage-eyebrow">STAGE {s.num}</span>
                    <strong>{buildStageTitle(s.caseData)}</strong>
                  </div>
                  <span className="cb__stage-score">
                    {s.score > 0 ? `${s.score}점` : s.unlocked ? '미완료' : <PCSvgIcon id="i-lock" size={14} />}
                  </span>
                </button>
              )
            })}
          </div>

          {/* 우: 선택된 사건 상세 */}
          <div className="cb__detail">
            {activeCase && activeStage ? (
              <>
                <div className="cb__detail-banner">
                  <span className="cb__eyebrow">STAGE {activeStage.num}</span>
                  <h3>{buildStageTitle(activeCase)}</h3>
                </div>
                <div className="cb__detail-info">
                  <div className="cb__detail-parties">
                    <span><PCSvgIcon id="i-person" size={14} /> {activeCase.duo.partyA.name}</span>
                    <span className="cb__detail-vs">vs</span>
                    <span><PCSvgIcon id="i-person" size={14} /> {activeCase.duo.partyB.name}</span>
                  </div>
                  <div className="cb__detail-meta">
                    <span>난이도 <b>{getDifficultyLabel(activeCase.meta?.difficulty ?? 'medium')}</b></span>
                    <span>쟁점 <b>{activeCase.disputes.length}개</b></span>
                    <span>증거 <b>{activeCase.evidence.length}종</b></span>
                  </div>
                  <p className="cb__detail-desc">{buildCaseSummary(activeCase)}</p>
                  {activeStage.score > 0 && (
                    <div className="cb__detail-record">
                      최고 기록 <strong>{activeStage.score}점</strong>
                    </div>
                  )}
                </div>
                <button className="cb__detail-action" onClick={() => onSelectCase(activeCase)} type="button">
                  상세 보기 &gt;
                </button>
              </>
            ) : (
              <div className="cb__detail-empty">
                <p>좌측에서 사건을 선택하세요.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function buildStageTitle(c: CaseData) {
  const t = c.meta?.title
  if (t) return truncate(compact(t), 48)
  const d = compact(c.disputes[0]?.name ?? '')
  if (d) return truncate(d, 48)
  return truncate(compact(c.meta?.emotionalBait ?? c.context.description), 48)
}

function buildCaseSummary(c: CaseData) {
  const t = compact(c.meta?.emotionalBait ?? '')
  if (t) return truncate(t, 160)
  return truncate(compact(c.context.description), 160)
}

function compact(s: string) { return s.replace(/\s+/g, ' ').trim() }
function truncate(s: string, n: number) { return s.length > n ? `${s.slice(0, n - 1).trim()}…` : s }
