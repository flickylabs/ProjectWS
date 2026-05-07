import { useMemo, useState } from 'react'
import type { CaseData } from '../../../types'
import PCSvgIcon from '../icons/PCSvgIcon'
import { getPcFaceSymbolId, getPcEvidenceSymbolId } from '../icons/pcIconUtils'
import PCCharacterPortrait from '../icons/PCCharacterPortrait'
import { sortCasesForBrowser } from './pcHomeShared'
import { useI18n } from '../../../i18n'

const CLEAR_SCORE_THRESHOLD = 40
const TOTAL_SLOTS = 10

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
  emptyTitle,
  emptyDescription,
}: Props) {
  const { t } = useI18n()
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
  const resolvedEmptyTitle = emptyTitle ?? t('pc.home.caseBrowser.emptyTitle')
  const resolvedEmptyDescription = emptyDescription ?? t('pc.home.caseBrowser.emptyDescription')

  return (
    <div className="cb">
      {/* ── 헤더 (검정 띠 안: 뒤로 + 제목만) ── */}
      <header className="cb__header pc-depth-header">
        <button className="pc-depth-back" onClick={onBack} type="button"><span aria-hidden="true">‹</span>{t('pc.home.back')}</button>
        <div className="cb__header-info pc-depth-header__copy">
          <span className="cb__eyebrow">{eyebrow ?? t('pc.home.caseBrowser.eyebrow')}</span>
          <h2>{title}</h2>
        </div>
      </header>

      {/* ── 헤더 띠 아래: tools (완료 기록만 + 1건) ── */}
      <div className="cb__header-tools">
        {showCompletedFilter && (
          <label className="cb__toggle">
            <span className="cb__toggle-label">{t('pc.home.caseBrowser.completedOnly')}</span>
            <button
              aria-pressed={showCompletedOnly}
              className={`pc-toggle${showCompletedOnly ? ' active' : ''}`}
              onClick={() => setShowCompletedOnly(v => !v)}
              type="button"
            ><i /></button>
          </label>
        )}
        <span className="cb__count">{t('pc.home.caseBrowser.count', { count: filteredCases.length })}</span>
      </div>

      {realStages.length === 0 ? (
        <div className="cb__empty">
          <PCSvgIcon id="i-doc" size={28} />
          <strong>{resolvedEmptyTitle}</strong>
          <p>{resolvedEmptyDescription}</p>
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
                        aria-label={`${s.num} ${t('pc.home.caseBrowser.undecided')}`}
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
                        {s.score > 0 ? t('pc.home.caseBrowser.score', { score: s.score }) : s.unlocked ? '—' : <PCSvgIcon id="i-lock" size={14} />}
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
              <div className="cb__detail-empty"><p>{t('pc.home.caseBrowser.selectPrompt')}</p></div>
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
  const { t } = useI18n()
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
      {/* HERO: 양측 인물 portraits + 가운데 사건 제목 (제목만, bait는 아래로 분리) */}
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
          <span className="cb__brief-meta">{t('pc.home.caseBrowser.ageOccupation', { age: duo?.partyA?.age ?? '?', occupation: duo?.partyA?.occupation ?? '' })}</span>
        </div>

        <div className="cb__brief-center">
          <h3 className="cb__brief-headline">{caseTitle}</h3>
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
          <span className="cb__brief-meta">{t('pc.home.caseBrowser.ageOccupation', { age: duo?.partyB?.age ?? '?', occupation: duo?.partyB?.occupation ?? '' })}</span>
        </div>
      </div>

      {/* SUMMARY: HERO와 상세 사이의 별도 영역 (사건 요약/bait) */}
      {bait && (
        <div className="cb__brief-summary">
          <p>{bait}</p>
        </div>
      )}

      {/* 쟁점 + 증거 — 바깥 wrap 없이 직접 grid */}
      <div className="cb__brief-grid">
        <div className="cb__brief-section">
          <h4><PCSvgIcon id="i-gavel" size={13} /> {t('pc.home.caseBrowser.mainDisputes')}</h4>
          {initialDisputes.map((d, i) => (
            <div className="cb__brief-item" key={d.id}>
              <span className="cb__brief-item-num">{i + 1}</span>
              <span>{d.name}</span>
            </div>
          ))}
          {hiddenCount > 0 && (
            <p className="cb__brief-hint"><PCSvgIcon id="i-lock" size={10} /> {t('pc.home.caseBrowser.hiddenDisputesHint')}</p>
          )}
        </div>
        <div className="cb__brief-section">
          <h4><PCSvgIcon id="i-doc" size={13} /> {t('pc.home.caseBrowser.initialEvidence')}</h4>
          {baseEvidence.length > 0 ? baseEvidence.map(ev => (
            <div className="cb__brief-item" key={ev.id}>
              <span className="cb__brief-item-icon"><PCSvgIcon id={getPcEvidenceSymbolId(ev.type)} size={14} /></span>
              <span>{ev.surfaceName ?? ev.name}</span>
            </div>
          )) : <p className="cb__brief-hint">{t('pc.home.caseBrowser.initialEvidenceShortEmpty')}</p>}
        </div>
      </div>

      {/* 푸터: 기록 영역 (가로선으로 분리) + CTA */}
      <div className="cb__brief-footer">
        {score > 0 && (
          <div className="cb__brief-record">
            <span>{t('pc.home.caseBrowser.bestRecord')}</span>
            <strong>
              {t('pc.home.caseBrowser.score', { score })}
              <small>/ 100</small>
            </strong>
          </div>
        )}
        <button className="cb__brief-start" onClick={onStart} type="button">
          <PCSvgIcon id="i-gavel" size={18} />
          <span>{t('pc.home.caseBrowser.enterCase')}</span>
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
