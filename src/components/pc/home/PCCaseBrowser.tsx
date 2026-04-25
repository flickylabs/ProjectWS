import { useMemo, useState } from 'react'
import type { CaseData } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId, getPcEvidenceSymbolId } from '../icons/pcIconUtils'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { getDifficultyLabel, sortCasesForBrowser } from './pcHomeShared'

const CLEAR_SCORE_THRESHOLD = 40
const TOTAL_SLOTS = 12

type StageEntry =
  | { caseData: CaseData; num: string; score: number; cleared: boolean; unlocked: boolean; placeholder: false }
  | { caseData: null; num: string; score: 0; cleared: false; unlocked: false; placeholder: true }

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
  progressLabel: _progressLabel,
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

  const stages = useMemo<StageEntry[]>(() => {
    let prevCleared = true
    const result: StageEntry[] = []
    for (let i = 0; i < TOTAL_SLOTS; i++) {
      const caseData = filteredCases[i]
      const num = String(i + 1).padStart(2, '0')
      if (!caseData) {
        result.push({ caseData: null, num, score: 0, cleared: false, unlocked: false, placeholder: true })
        continue
      }
      const score = progressMap[caseData.caseId]?.bestScore ?? 0
      const cleared = score >= CLEAR_SCORE_THRESHOLD
      const unlocked = i === 0 || prevCleared
      prevCleared = cleared
      result.push({ caseData, num, score, cleared, unlocked, placeholder: false })
    }
    return result
  }, [filteredCases, progressMap])

  const realStages = stages.filter((s): s is Extract<StageEntry, { placeholder: false }> => !s.placeholder)

  const defaultId = useMemo(() => {
    if (realStages.length === 0) return null
    let latest = realStages[0].caseData.caseId
    for (const s of realStages) { if (!s.unlocked) break; latest = s.caseData.caseId }
    return latest
  }, [realStages])

  const activeId = selectedCaseId ?? defaultId
  const activeStage = realStages.find(s => s.caseData.caseId === activeId)
  const activeCase = activeStage?.caseData ?? null

  return (
    <div className="cb">
      {/* ── 헤더 (DepthHeader와 동일한 위치 패턴, description 폐기로 깔끔하게) ── */}
      <header className="cb__header pc-depth-header">
        <button className="pc-depth-back" onClick={onBack} type="button"><span aria-hidden="true">‹</span>뒤로</button>
        <div className="cb__header-info pc-depth-header__copy">
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
          <span className="cb__count">{filteredCases.length}건</span>
        </div>
      </header>

      {realStages.length === 0 ? (
        <div className="cb__empty">
          <PCSvgIcon id="i-doc" size={28} />
          <strong>{emptyTitle}</strong>
          <p>{emptyDescription}</p>
        </div>
      ) : (
        <div className="cb__split">
          {/* ── 좌: 지그재그 스테이지맵 (12 슬롯, 미정은 ???) ── */}
          <div className="cb__stages">
            <div className="cb__zigzag">
              <div className="cb__zigzag-line" />
              {stages.map((s, i) => {
                const active = !s.placeholder && activeId === s.caseData.caseId
                const side = i % 2 === 0 ? 'left' : 'right'
                const key = s.placeholder ? `placeholder-${i}` : s.caseData.caseId
                if (s.placeholder) {
                  return (
                    <div className={`cb__zigzag-row cb__zigzag-row--${side}`} key={key}>
                      <button
                        className="cb__stage is-locked is-placeholder"
                        disabled
                        type="button"
                        aria-label={`${s.num} 미정`}
                      >
                        <span className="cb__stage-num">{s.num}</span>
                        <span className="cb__stage-score">???</span>
                      </button>
                    </div>
                  )
                }
                return (
                  <div className={`cb__zigzag-row cb__zigzag-row--${side}`} key={key}>
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
      {/* HERO: 양측 인물 portraits + 가운데 사건 제목 */}
      <div className="cb__brief-hero">
        <div className="cb__brief-character is-a">
          <div className="cb__brief-portrait is-a">
            <PCCharacterPortrait
              alt={duo?.partyA?.name}
              caseId={caseData.caseId}
              emotion="defensive"
              fallbackSymbolId={faceA}
              party="a"
              size={72}
            />
          </div>
          <span className="cb__brief-name is-a">{duo?.partyA?.name ?? 'A'}</span>
          <span className="cb__brief-meta">{duo?.partyA?.age ?? '?'}세 · {duo?.partyA?.occupation ?? ''}</span>
        </div>

        <div className="cb__brief-center">
          <h3 className="cb__brief-headline">{caseTitle}</h3>
          {bait && <p className="cb__brief-bait">{bait}</p>}
        </div>

        <div className="cb__brief-character is-b">
          <div className="cb__brief-portrait is-b">
            <PCCharacterPortrait
              alt={duo?.partyB?.name}
              caseId={caseData.caseId}
              emotion="defensive"
              fallbackSymbolId={faceB}
              party="b"
              size={72}
            />
          </div>
          <span className="cb__brief-name is-b">{duo?.partyB?.name ?? 'B'}</span>
          <span className="cb__brief-meta">{duo?.partyB?.age ?? '?'}세 · {duo?.partyB?.occupation ?? ''}</span>
        </div>
      </div>

      {/* 상세 영역 — 별도 panel로 분리 (쟁점 + 증거) */}
      <div className="cb__brief-detail">
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
      </div>

      {/* 푸터: 기록 + CTA */}
      <div className="cb__brief-footer">
        {score > 0 && (
          <div className="cb__brief-record">
            <span>최고 기록</span>
            <strong>{score}점</strong>
          </div>
        )}
        <button className="cb__brief-start" onClick={onStart} type="button">
          <PCSvgIcon id="i-gavel" size={18} />
          <span>사건 입장하기</span>
          <kbd>Enter</kbd>
        </button>
      </div>
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
