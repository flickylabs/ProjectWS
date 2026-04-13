import { useEffect, useMemo, useState } from 'react'
import { loadGeneratedCases } from '../../../data/cases/caseLoader'
import { evaluateTitles, saveUnlockedTitles, loadUnlockedTitles, type Title } from '../../../data/titles'
import { loadDriftState, loadJudgePerks } from '../../../data/leaderboard'
import { deriveJudgeProfile, TITLE_LABELS, AXIS_LABELS, TIER_LABELS, LEVEL_LABELS } from '../../../engine/judgeProfileEngine'
import type { AxisLevelState } from '../../../engine/judgeProfileEngine'
import type { PerkId } from '../../../engine/judgePerks'
import { GamePhase } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'
import { saveCaseProgress } from '../../phase/CaseMap'
import { resetAftermathCache } from '../../result/Aftermath'
import PCSvgIcon from '../icons/PCSvgIcon'

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

const RARITY_CLASS: Record<string, string> = {
  common: 'is-common',
  rare: 'is-rare',
  epic: 'is-epic',
  legendary: 'is-legendary',
}

const RARITY_LABEL: Record<string, string> = {
  common: '일반',
  rare: '희귀',
  epic: '영웅',
  legendary: '전설',
}

function getProfileDescription(titleId: string): string {
  const descriptions: Record<string, string> = {
    cold_judge: '증거와 논리를 중시하며, 엄격한 기준으로 공정한 판결을 내리는 타입입니다.',
    practical_analyst: '논리적 분석을 바탕으로 현실적인 해결책을 찾아내는 타입입니다.',
    balanced_sage: '논리적이면서도 관대한 시선으로 원칙을 지키는 타입입니다.',
    careful_mediator: '신중한 분석과 관용적 태도로 양측의 화해를 이끄는 타입입니다.',
    instinct_judge: '직관적 판단과 엄격한 원칙으로 정의를 추구하는 타입입니다.',
    passion_arbiter: '열정적인 공감과 단호한 판단으로 해결을 이끄는 타입입니다.',
    gentle_guardian: '따뜻한 공감과 관대한 시선으로 원칙을 수호하는 타입입니다.',
    warm_mediator: '공감과 이해를 바탕으로 양측 모두가 만족하는 화해를 추구하는 타입입니다.',
    neutral_observer: '편향 없이 균형 잡힌 시선으로 사건을 바라보는 타입입니다.',
  }
  return descriptions[titleId] ?? descriptions.neutral_observer
}

export default function PCResultScreen() {
  const verdictScore = useStore((s) => s.verdictScore)
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const verdictSummary = useStore((s) => s.verdictSummary)
  const initializeCase = useStore((s) => s.initializeCase)
  const agentA = useStore((s) => s.agentA)
  const disputeVisibility = useStore((s) => s.discovery.disputeVisibility)
  const agentB = useStore((s) => s.agentB)
  const turnCount = useStore((s) => s.turnCount)
  const evidenceStates = useStore((s) => s.evidenceStates)
  const skillUseCounts = useStore((s) => s.skillUseCounts)
  const processMetrics = useStore((s) => s.processMetrics)

  const [tab, setTab] = useState<ResultTab>('score')
  const [titles, setTitles] = useState<Title[]>([])
  const [newTitles, setNewTitles] = useState<Set<string>>(new Set())
  const [copied, setCopied] = useState(false)
  const [summaryCopied, setSummaryCopied] = useState(false)

  useEffect(() => {
    if (verdictScore && caseData) {
      saveCaseProgress(caseData.caseId, verdictScore.total)
    }
  }, [caseData, verdictScore])

  // Title evaluation
  useEffect(() => {
    if (!verdictScore || !caseData) return

    const collapsedA = Object.values(agentA.lieStateMap).filter((e) => e.currentState === 'S5').length
    const collapsedB = Object.values(agentB.lieStateMap).filter((e) => e.currentState === 'S5').length
    const totalLies = Object.keys(agentA.lieStateMap).length + Object.keys(agentB.lieStateMap).length

    const meta = {
      turnsUsed: turnCount,
      evidencePresented: Object.values(evidenceStates).filter((e) => e.presented).length,
      trustActionsUsed: processMetrics.trustActionsUsed,
      skillsUsed: Object.values(skillUseCounts).reduce((a, b) => a + b, 0),
      collapsedDisputes: collapsedA + collapsedB,
      totalDisputes: totalLies,
    }

    const earned = evaluateTitles(verdictScore, verdictInput, meta)
    setTitles(earned)

    const existing = loadUnlockedTitles()
    const newIds = earned.filter((t) => !existing.includes(t.id)).map((t) => t.id)
    setNewTitles(new Set(newIds))

    if (earned.length > 0) {
      saveUnlockedTitles(earned.map((t) => t.id))
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleCopyShare = async () => {
    const text = `${headline} - ${verdictScore.total}점 (${getRating(verdictScore.total)})`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleCopySummary = async () => {
    if (!verdictSummary) return
    try {
      await navigator.clipboard.writeText(verdictSummary.fullText)
      setSummaryCopied(true)
      setTimeout(() => setSummaryCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = verdictSummary.fullText
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setSummaryCopied(true)
      setTimeout(() => setSummaryCopied(false), 2000)
    }
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
              <strong>{caseData.disputes.filter((d) => { const v = disputeVisibility[d.id]; return !v || v.visibility !== 'hidden' }).length}개</strong>
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
            {/* score tab */}
            {tab === 'score' ? (
              <div className="pc-result-breakdown">
                <div className="pc-result-donuts">
                  {[
                    { label: '통찰', value: verdictScore.insight, color: 'var(--pc-blue)' },
                    { label: '권위', value: verdictScore.authority, color: 'var(--pc-gold)' },
                    { label: '지혜', value: verdictScore.wisdom, color: 'var(--pc-green)' },
                  ].map((axis) => {
                    const pct = Math.min(axis.value, 100)
                    const dash = (pct / 100) * 251
                    return (
                      <div className="pc-result-donut-single" key={axis.label}>
                        <svg viewBox="0 0 100 100" width="120" height="120">
                          <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                          <circle cx="50" cy="50" r="40" fill="none" stroke={axis.color} strokeWidth="8"
                            strokeDasharray={`${dash} 251`} strokeDashoffset="0"
                            transform="rotate(-90 50 50)" strokeLinecap="round"
                            className="pc-result-donut-ring"
                          />
                          <text x="50" y="46" textAnchor="middle" fill="#f2efe8" fontSize="22" fontWeight="900">{axis.value}</text>
                          <text x="50" y="62" textAnchor="middle" fill="#8c8fa0" fontSize="9">/100</text>
                        </svg>
                        <span className="pc-result-donut-label" style={{ color: axis.color }}>{axis.label}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {/* truth tab */}
            {tab === 'truth' ? (
              <div className="pc-result-truth">
                {caseData.disputes.filter((d) => { const v = disputeVisibility[d.id]; return !v || v.visibility !== 'hidden' }).map((d) => {
                  const finding = verdictInput.factFindings[d.id]
                  const correct = finding === 'pending'
                    ? null
                    : (finding === 'true') === d.truth
                  return (
                    <div className={`pc-result-truth__card ${correct === true ? 'is-correct' : correct === false ? 'is-wrong' : ''}`} key={d.id}>
                      <strong>{d.name}</strong>
                      <span className="pc-result-truth__verdict">
                        {finding === 'true' ? '사실' : finding === 'false' ? '거짓' : '보류'}
                        {correct === true ? ' — 정확' : correct === false ? ' — 오답' : ''}
                      </span>
                      <span className="pc-result-truth__answer">{d.truth ? '실제: 사실' : '실제: 거짓'}</span>
                      <p>{d.truthDescription}</p>
                    </div>
                  )
                })}
              </div>
            ) : null}

            {/* titles tab */}
            {tab === 'titles' ? (
              <div className="pc-result-text">
                <h2>획득한 칭호</h2>
                {titles.length === 0 ? (
                  <p>획득한 칭호가 없습니다.</p>
                ) : (
                  <div className="pc-result-titles">
                    {titles.map((t) => (
                      <div className={`pc-result-titles__card ${RARITY_CLASS[t.rarity] ?? ''} ${newTitles.has(t.id) ? 'is-new' : ''}`} key={t.id}>
                        <span className="pc-result-titles__icon">{t.icon}</span>
                        <div className="pc-result-titles__info">
                          <span className="pc-result-titles__name">
                            {t.name}
                            {newTitles.has(t.id) ? <em className="pc-result-titles__new">NEW</em> : null}
                          </span>
                          <span className="pc-result-titles__rarity">{RARITY_LABEL[t.rarity]}</span>
                          <span className="pc-result-titles__desc">{t.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            {/* aftermath tab */}
            {tab === 'aftermath' ? (
              <div className="pc-result-text">
                <h2>판결 이후</h2>
                <AftermathInline />
              </div>
            ) : null}

            {/* verdict_summary tab */}
            {tab === 'verdict_summary' ? (
              <div className="pc-result-text">
                {verdictSummary ? (
                  <>
                    <h2>{verdictSummary.title}</h2>
                    <p>{verdictSummary.caseSummary}</p>

                    <div className="pc-result-summary__section">
                      <h3>책임 배분</h3>
                      <div className="pc-result-summary__resp">
                        <span>{verdictSummary.responsibility.partyA}</span>
                        <div className="pc-result-gauge__bar">
                          <div className="pc-result-gauge__fill" style={{ width: `${verdictSummary.responsibility.percentA}%`, background: 'var(--pc-gold)' }} />
                        </div>
                        <strong>{verdictSummary.responsibility.percentA}%</strong>
                      </div>
                      <div className="pc-result-summary__resp">
                        <span>{verdictSummary.responsibility.partyB}</span>
                        <div className="pc-result-gauge__bar">
                          <div className="pc-result-gauge__fill" style={{ width: `${verdictSummary.responsibility.percentB}%`, background: 'var(--pc-blue)' }} />
                        </div>
                        <strong>{verdictSummary.responsibility.percentB}%</strong>
                      </div>
                      <p className="pc-result-summary__reason">{verdictSummary.responsibilityReason}</p>
                    </div>

                    {verdictSummary.keyEvidence.length > 0 && (
                      <div className="pc-result-summary__section">
                        <h3>결정적 증거</h3>
                        <div className="pc-result-summary__tags">
                          {verdictSummary.keyEvidence.map((e, i) => (
                            <span className="pc-result-summary__tag" key={i}>{e}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pc-result-summary__section">
                      <h3>결정적 순간</h3>
                      <p>{verdictSummary.keyMoment}</p>
                    </div>

                    <div className="pc-result-summary__section">
                      <h3>해결 방향</h3>
                      <p>{verdictSummary.resolution}</p>
                    </div>

                    <p className="pc-result-summary__style">{verdictSummary.judgeStyle}</p>

                    <button className="pc-result-text__copy-btn" onClick={handleCopySummary} type="button">
                      {summaryCopied ? '복사 완료!' : '판결문 복사하기'}
                    </button>
                  </>
                ) : (
                  <p>판결문이 생성되지 않았습니다.</p>
                )}
              </div>
            ) : null}

            {/* profile tab */}
            {tab === 'profile' ? <ProfileInline /> : null}

            {/* share tab */}
            {tab === 'share' ? (
              <div className="pc-result-text">
                <h2>결과 공유</h2>
                <p>{headline} - {verdictScore.total}점 ({getRating(verdictScore.total)})</p>
                <button className="pc-result-text__copy-btn" onClick={handleCopyShare} type="button">
                  {copied ? '복사 완료!' : '클립보드에 복사'}
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  )
}

/* ─── Aftermath inline (uses same LLM/scripted logic) ─── */

function AftermathInline() {
  const caseData = useStore((s) => s.caseData)
  const verdictInput = useStore((s) => s.verdictInput)
  const verdictScore = useStore((s) => s.verdictScore)
  const processMetrics = useStore((s) => s.processMetrics)
  const discovery = useStore((s) => s.discovery)
  const [aftermath, setAftermath] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!caseData || !verdictScore) return

    void (async () => {
      const { resolveScriptedAftermath } = await import('../../../engine/aftermathResolver')
      const { isLLMMode } = await import('../../../hooks/useActionDispatch')
      const { chatCompletion } = await import('../../../engine/llmClient')
      const { buildAftermathPrompt, postProcessAftermath } = await import('../../../engine/aftermathLLMGenerator')
      const { evaluateTitles } = await import('../../../data/titles')

      // 1. ScriptedText 우선
      const scripted = resolveScriptedAftermath(caseData, verdictInput)
      if (scripted) {
        setAftermath(scripted.text)
        return
      }

      // 2. LLM 생성 (buildAftermathPrompt 사용)
      if (isLLMMode()) {
        setLoading(true)
        try {
          // 핵심 발견 수집
          const keyDiscoveries: string[] = []
          if (processMetrics.liesCollapsed > 0) keyDiscoveries.push(`거짓말 ${processMetrics.liesCollapsed}건 자백 유도`)
          if (processMetrics.deepTruthsUnlocked > 0) keyDiscoveries.push(`숨겨진 진실 ${processMetrics.deepTruthsUnlocked}건 발견`)
          const emergedCount = Object.values(discovery.disputeVisibility).filter(v => v.visibility === 'emerged').length
          if (emergedCount > 0) keyDiscoveries.push(`숨겨진 쟁점 ${emergedCount}건 발현`)

          // 칭호 계산
          const titles = evaluateTitles(verdictScore, verdictInput, {
            turnsUsed: processMetrics.questionsAsked + processMetrics.evidenceEffective,
            evidencePresented: processMetrics.evidenceEffective,
            trustActionsUsed: processMetrics.trustActionsUsed,
            skillsUsed: 0,
            collapsedDisputes: processMetrics.liesCollapsed,
            totalDisputes: caseData.disputes.length,
          })
          const titleName = titles[0]?.name ?? '견습 재판관'

          // 쟁점별 판단 조립
          const disputeJudgments: Record<string, string> = {}
          for (const d of caseData.disputes) {
            const fact = verdictInput.factFindings[d.id]
            disputeJudgments[d.id] = fact === 'true' ? '사실로 판단' : fact === 'false' ? '거짓으로 판단' : '보류'
          }

          const prompt = buildAftermathPrompt({
            caseData,
            verdictInput,
            verdictDetails: {
              disputeJudgments,
              issueWeights: Object.fromEntries(
                Object.entries(verdictInput.responsibility).map(([id, r]) => [id, r.b]),
              ),
              selectedResolution: verdictInput.selectedSolutions.join(', ') || '없음',
            },
            scores: { insight: verdictScore.insight, authority: verdictScore.authority, wisdom: verdictScore.wisdom },
            title: titleName,
            keyDiscoveries,
          })

          const response = await chatCompletion(
            [{ role: 'user', content: prompt }],
            { temperature: 0.9, maxTokens: 900 },
          )
          setAftermath(postProcessAftermath(response) || buildFallback(caseData, verdictScore.total))
        } catch {
          setAftermath(buildFallback(caseData, verdictScore.total))
        } finally {
          setLoading(false)
        }
      } else {
        setAftermath(buildFallback(caseData, verdictScore.total))
      }
    })()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <p>후일담을 정리하고 있습니다...</p>
  }
  if (!aftermath) {
    return <p>후일담 데이터가 없습니다.</p>
  }

  return (
    <>
      {aftermath.split('\n\n').map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </>
  )
}

function buildFallback(caseData: { duo: { partyA: { name: string }; partyB: { name: string } } }, total: number): string {
  const nameA = caseData.duo.partyA.name
  const nameB = caseData.duo.partyB.name
  if (total >= 75) {
    return `${nameA}와 ${nameB}는 적어도 무엇이 문제였는지 같은 문장으로 말할 수 있게 되었다.\n\n서로를 향한 비난은 줄었고, 앞으로 지켜야 할 선을 다시 확인하는 대화가 시작됐다.\n\n완전한 화해는 아니어도, 같은 실수를 반복하지 않겠다는 말만은 남았다.`
  }
  if (total >= 50) {
    return `${nameA}와 ${nameB}는 판결을 받아들였지만, 완전히 만족한 얼굴은 아니었다.\n\n한 달이 지나도 불만은 남았지만, 같은 싸움이 반복되는 지점은 서로 알고 있었다.\n\n정리가 곧 화해는 아니지만, 더 크게 무너지는 일은 막아 낸 결말이었다.`
  }
  return `${nameA}와 ${nameB}는 판결 뒤에도 쉽게 자리를 뜨지 못했다.\n\n감정이 정리된 것은 아니었고, 남은 말들은 다음 갈등의 씨앗처럼 남아 있었다.\n\n이번 결말은 봉합보다 경고에 가까웠다.`
}

/* ─── Profile inline ─── */

function ProfileInline() {
  const { profile, driftState, totalGames, savedPerks } = useMemo(() => {
    const drift = loadDriftState()
    const perks = loadJudgePerks()
    const prof = deriveJudgeProfile(drift, undefined, {
      major: perks.major as PerkId | null,
      minor: perks.minor as PerkId | null,
    })
    return { profile: prof, driftState: drift, totalGames: drift.casesProcessed, savedPerks: perks }
  }, [])

  const titleInfo = TITLE_LABELS[profile.titleId] ?? TITLE_LABELS.neutral_observer
  const tierInfo = TIER_LABELS[profile.tier]

  return (
    <div className="pc-result-text">
      <h2>{titleInfo.name}</h2>
      <p>{titleInfo.subtitle}</p>

      {profile.subtags.length > 0 && (
        <div className="pc-result-profile__tags">
          {profile.subtags.map((tag) => (
            <span className="pc-result-summary__tag" key={tag}>{tag}</span>
          ))}
        </div>
      )}

      <div className="pc-result-profile__tier">
        <PCSvgIcon id="i-scale" size={16} style={{verticalAlign:'middle',marginRight:4}} /> {tierInfo.name} ({profile.casesCompleted}건)
        {profile.isStabilized && <span className="pc-result-profile__stable"> 안정</span>}
      </div>

      <p className="pc-result-summary__style">{getProfileDescription(profile.titleId)}</p>

      {totalGames === 0 ? (
        <div className="pc-result-profile__intro">
          <p>첫 번째 재판을 마쳤습니다. 사건을 거듭할수록 당신만의 재판 성향이 드러납니다.</p>
          <p>더 많은 사건을 심리하면 3개 축(탐구/판단/해결)의 균형이 변화하고, 고유한 재판관 칭호가 부여됩니다.</p>
        </div>
      ) : (
        <div className="pc-result-profile__axes">
          <h3>누적 성향 ({totalGames}건)</h3>
          <ProfileAxis label={AXIS_LABELS.inquiry.label} axisState={driftState.inquiry} negLabel={AXIS_LABELS.inquiry.negative} posLabel={AXIS_LABELS.inquiry.positive} />
          <ProfileAxis label={AXIS_LABELS.judgment.label} axisState={driftState.judgment} negLabel={AXIS_LABELS.judgment.negative} posLabel={AXIS_LABELS.judgment.positive} />
          <ProfileAxis label={AXIS_LABELS.resolution.label} axisState={driftState.resolution} negLabel={AXIS_LABELS.resolution.negative} posLabel={AXIS_LABELS.resolution.positive} />
        </div>
      )}
    </div>
  )
}

function ProfileAxis({ label, axisState, negLabel, posLabel }: {
  label: string
  axisState: AxisLevelState
  negLabel: string
  posLabel: string
}) {
  const { level } = axisState
  const levelPct = ((level + 3) / 6) * 100
  const dirLabel = level !== 0 ? (level < 0 ? negLabel : posLabel) : '균형'
  const levelText = LEVEL_LABELS[level] ?? '균형'
  const displayText = level === 0 ? '균형' : `${dirLabel} ${levelText}`

  return (
    <div className="pc-result-profile__axis">
      <div className="pc-result-profile__axis-header">
        <span>{label}</span>
        <span>Lv{level > 0 ? '+' : ''}{level} ({displayText})</span>
      </div>
      <div className="pc-result-gauge__bar">
        {level < 0 && (
          <div className="pc-result-gauge__fill" style={{ left: `${levelPct}%`, width: `${50 - levelPct}%`, background: 'var(--pc-blue)' }} />
        )}
        {level > 0 && (
          <div className="pc-result-gauge__fill" style={{ left: '50%', width: `${levelPct - 50}%`, background: 'var(--pc-gold)' }} />
        )}
        <div className="pc-result-profile__marker" style={{ left: `${levelPct}%` }} />
      </div>
      <div className="pc-result-profile__axis-labels">
        <span>-3 {negLabel}</span>
        <span>{posLabel} +3</span>
      </div>
    </div>
  )
}
