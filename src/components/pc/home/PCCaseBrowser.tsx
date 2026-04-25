import { useMemo, useState } from 'react'
import type { CaseData } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId, getPcEvidenceSymbolId } from '../icons/pcIconUtils'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { getDifficultyLabel, sortCasesForBrowser } from './pcHomeShared'

const CLEAR_SCORE_THRESHOLD = 40

const ARCHETYPE_LABELS: Record<string, string> = {
  avoidant: '회피형', confrontational: '정면돌파형',
  victim_cosplay: '피해자형', cold_logic: '냉정논리형',
  affect_flattening: '감정억제형', premature_summary: '조기결론형',
}

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
        </div>
        <div className="cb__header-tools">
          {showCompletedFilter && (
            <label className="cb__toggle">
              <span className="cb__toggle-label">완료 기록만</span>
              <button
                aria-pressed={showCompletedOnly}
                className={`pc-toggle${showCompletedOnly ? ' active' : ''}`}
                onClick={() => setShowCompletedOnly(v => !v)}
                type="button"
              ><i /></button>
            </label>
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
          {/* ── 좌: 지그재그 스테이지맵 ── */}
          <div className="cb__stages">
            <div className="cb__zigzag">
              <div className="cb__zigzag-line" />
              {stages.map((s, i) => {
                const active = activeId === s.caseData.caseId
                const side = i % 2 === 0 ? 'left' : 'right'
                return (
                  <div className={`cb__zigzag-row cb__zigzag-row--${side}`} key={s.caseData.caseId}>
                    <button
                      className={`cb__stage${active ? ' is-active' : ''}${s.cleared ? ' is-cleared' : ''}${!s.unlocked ? ' is-locked' : ''}`}
                      disabled={!s.unlocked}
                      onClick={() => setSelectedCaseId(s.caseData.caseId)}
                      type="button"
                    >
                      <span className="cb__stage-num">{s.num}</span>
                      <span className="cb__stage-score">
                        {s.score > 0 ? `${s.score}점` : s.unlocked ? '—' : <PCSvgIcon id="i-lock" size={14} />}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── 우: 브리핑 패널 ── */}
          <div className="cb__detail">
            {activeCase && activeStage ? (
              <CaseBriefPanel caseData={activeCase} stageNum={activeStage.num} score={activeStage.score} onStart={() => onSelectCase(activeCase)} />
            ) : (
              <div className="cb__detail-empty"><p>좌측에서 사건을 선택하세요.</p></div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── 우측 브리핑 패널 (PCCaseBrief 내용 인라인) ──

function CaseBriefPanel({ caseData, stageNum, score, onStart }: {
  caseData: CaseData; stageNum: string; score: number; onStart: () => void
}) {
  const { duo, meta } = caseData
  const faceA = getPcFaceSymbolId('a', duo?.partyA, 'defensive')
  const faceB = getPcFaceSymbolId('b', duo?.partyB, 'defensive')
  const caseTitle = meta?.title ?? caseData.caseId
  const bait = meta?.emotionalBait ?? ''

  const visibleDisputes = caseData.disputes.filter(d => !d.hidden && d.v3Visibility !== 'hidden')
  const initialDisputes = visibleDisputes
    .filter(d => d.weight === 'high' && d.quadrant !== 'neither_knows' && d.quadrant !== 'shared_misconception')
    .slice(0, 3)
  const hiddenCount = caseData.disputes.length - visibleDisputes.length

  const baseEvidence = useMemo(() => {
    const baseIds = caseData.baseEvidenceIds ?? []
    return baseIds
      .map(id => caseData.evidence.find(e => e.id === id))
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .slice(0, 3)
  }, [caseData])

  return (
    <div className="cb__brief">
      {/* 사건 제목 */}
      <div className="cb__brief-title">
        <h3>{caseTitle}</h3>
        {bait && <p>{bait}</p>}
      </div>

      {/* 캐릭터 VS */}
      <div className="cb__brief-vs">
        <div className="cb__brief-party">
          <div className="cb__brief-party-text is-right">
            <span className="cb__brief-name is-a">{duo?.partyA?.name ?? 'A'}</span>
            <span className="cb__brief-meta">{duo?.partyA?.age ?? '?'}세 · {duo?.partyA?.occupation ?? ''}</span>
            <span className="cb__brief-archetype">{ARCHETYPE_LABELS[duo?.partyA?.archetype ?? ''] ?? ''}</span>
          </div>
          <div className="cb__brief-face is-a">
            <PCCharacterPortrait
              alt={duo?.partyA?.name}
              caseId={caseData.caseId}
              emotion="defensive"
              fallbackSymbolId={faceA}
              party="a"
              size={44}
            />
          </div>
        </div>
        <span className="cb__brief-vs-badge">VS</span>
        <div className="cb__brief-party">
          <div className="cb__brief-face is-b">
            <PCCharacterPortrait
              alt={duo?.partyB?.name}
              caseId={caseData.caseId}
              emotion="defensive"
              fallbackSymbolId={faceB}
              party="b"
              size={44}
            />
          </div>
          <div className="cb__brief-party-text is-left">
            <span className="cb__brief-name is-b">{duo?.partyB?.name ?? 'B'}</span>
            <span className="cb__brief-meta">{duo?.partyB?.age ?? '?'}세 · {duo?.partyB?.occupation ?? ''}</span>
            <span className="cb__brief-archetype">{ARCHETYPE_LABELS[duo?.partyB?.archetype ?? ''] ?? ''}</span>
          </div>
        </div>
      </div>

      {/* 쟁점 + 증거 2열 */}
      <div className="cb__brief-grid">
        <div className="cb__brief-section">
          <h4><PCSvgIcon id="i-gavel" size={13} /> 주요 쟁점</h4>
          {initialDisputes.map((d, i) => (
            <div className="cb__brief-item" key={d.id}>
              <span className="cb__brief-item-num">{i + 1}</span>
              <span>{d.name}</span>
            </div>
          ))}
          {hiddenCount > 0 && (
            <p className="cb__brief-hint"><PCSvgIcon id="i-lock" size={10} /> 심문 과정에서 추가 쟁점이 드러날 수 있습니다</p>
          )}
        </div>
        <div className="cb__brief-section">
          <h4><PCSvgIcon id="i-doc" size={13} /> 초기 증거</h4>
          {baseEvidence.length > 0 ? baseEvidence.map(ev => (
            <div className="cb__brief-item" key={ev.id}>
              <span className="cb__brief-item-icon"><PCSvgIcon id={getPcEvidenceSymbolId(ev.type)} size={14} /></span>
              <span>{ev.surfaceName ?? ev.name}</span>
            </div>
          )) : <p className="cb__brief-hint">초기 증거 미지정</p>}
        </div>
      </div>

      {/* 기록 + 입장 */}
      {score > 0 && (
        <div className="cb__brief-record">최고 기록 <strong>{score}점</strong></div>
      )}
      <button className="cb__brief-start" onClick={onStart} type="button">
        <PCSvgIcon id="i-gavel" size={18} />
        <span>사건 입장하기</span>
        <kbd>Enter</kbd>
      </button>
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

function compact(s: string) { return s.replace(/\s+/g, ' ').trim() }
function truncate(s: string, n: number) { return s.length > n ? `${s.slice(0, n - 1).trim()}…` : s }
