import { useEffect, useMemo, useRef, useState } from 'react'
import { useGameStore, useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import type {
  JudgeObservation,
  JudgeObservationCategory,
} from '../../../store/slices/judgeObservationSlice'
import { translate, useI18n } from '../../../i18n'
import { localizeRuntimeText } from '../../../i18n/runtimeText'

const CATEGORY_ICON: Record<JudgeObservationCategory, string> = {
  archetype: 'i-eye',
  state: 'i-person',
  contradiction: 'i-bolt',
  slip: 'i-heart',
  evidence: 'i-doc',
  event: 'i-gavel',
}

/** 미니 타임라인에 표시할 최근 관찰 개수 (메인 포함) */
const TIMELINE_COUNT = 7

/** 메인 슬롯이 "신선"하게 유지되는 시간(ms). 경과 후 dim */
const FRESH_MS = 4000
const LOW_VALUE_OBSERVATION_TITLES = new Set(['단서 접근', '모순 단서', '방어 완화'])
const IMPORTANT_EVENT_OBSERVATION_TITLES = new Set([
  '새 증인 추가',
  '쟁점 추가',
  '결정적 질문 해금',
  '질문 경로 추가',
  '판결 힌트 추가',
  '단서 기록 추가',
  '진술 기록 추가',
])

function isImportantEventObservation(obs: JudgeObservation | null): boolean {
  return !!obs && obs.category === 'event' && IMPORTANT_EVENT_OBSERVATION_TITLES.has(obs.title)
}

export default function JudgeObservationSection() {
  const { locale, t } = useI18n()
  const rawObservations = useStore((s) => s.judgeObservations ?? [])
  const observations = useMemo(
    () => rawObservations.filter((obs) => !LOW_VALUE_OBSERVATION_TITLES.has(obs.title)),
    [rawObservations],
  )
  const turnCount = useStore((s) => s.turnCount)
  const setHistoryOpen = useStore((s) => s.setObservationHistoryOpen)
  const historyOpen = useStore((s) => s.observationHistoryOpen)
  const confirmedSlipCount = useStore((s) => s.discovery.emotionalSlips.length)

  // 가장 최근 관찰 (내부 latest)
  const latest = useMemo<JudgeObservation | null>(() => {
    if (observations.length === 0) return null
    return observations[observations.length - 1]
  }, [observations])

  // 실제 화면에 보여지는 main id — 컷씬 수렴 타이밍(2.3s)에 맞춰 전환
  const [displayedMainId, setDisplayedMainId] = useState<string | null>(null)
  const main = useMemo<JudgeObservation | null>(() => {
    if (!displayedMainId) return null
    return observations.find((o) => o.id === displayedMainId) ?? null
  }, [observations, displayedMainId])

  // 미니 타임라인 (오래된 → 최근, 마지막이 메인)
  const timeline = useMemo(() => {
    return observations.slice(-TIMELINE_COUNT)
  }, [observations])

  const unreadCount = useMemo(
    () => observations.filter((obs) => !obs.read).length,
    [observations],
  )

  // 새 관찰 추가 시 배지 flash (컷씬 수렴 대체)
  const [badgeFlash, setBadgeFlash] = useState<boolean>(false)
  const flashTimerRef = useRef<number | null>(null)
  useEffect(() => {
    if (observations.length === 0) return
    if (latest?.category === 'slip') return
    if (latest?.category === 'event' && !isImportantEventObservation(latest)) return
    setBadgeFlash(true)
    if (flashTimerRef.current !== null) {
      window.clearTimeout(flashTimerRef.current)
    }
    flashTimerRef.current = window.setTimeout(() => {
      setBadgeFlash(false)
    }, 2200)
    return () => {
      if (flashTimerRef.current !== null) {
        window.clearTimeout(flashTimerRef.current)
        flashTimerRef.current = null
      }
    }
  }, [observations.length, latest?.category])

  // 카드 상태
  const [isFresh, setIsFresh] = useState<boolean>(false)
  const [isHeroFlash, setIsHeroFlash] = useState<boolean>(false)

  const processedIdRef = useRef<string | null>(null)
  const pulsedRef = useRef<Set<string>>(new Set())
  const confirmedSlipCountRef = useRef<number>(confirmedSlipCount)
  const confirmedSlipPulseRef = useRef<Set<string>>(new Set())
  const confirmedSlipFlashActiveRef = useRef<boolean>(false)
  const confirmedSlipTimersRef = useRef<number[]>([])

  useEffect(() => {
    if (!latest) return
    if (processedIdRef.current === latest.id) return  // 이미 처리된 id (중복 방지)
    processedIdRef.current = latest.id

    // 컷씬 활성 여부에 따라 지연 — 컷씬 뜨면 수렴 타이밍(2.3s) 대기, 아니면 말풍선 완성 대기(1200ms)
    const active = useGameStore.getState().activeFeedback
    const cutsceneKinds = ['observation', 'evidence_result', 'transition_choice']
    const hasCutscene = !!(active && cutsceneKinds.includes(active.kind))
    // archetype 카테고리는 observation 컷씬과 묶여 발동되므로, 컷씬 수렴이 완전히 끝난 후 뱃지 pulse 시작
    // (컷씬 2.3s 중 수렴 꼬리 ~0.7s 추가 고려)
    const archetypeExtraDelay = latest.category === 'archetype' && hasCutscene ? 900 : 0
    const arriveDelay = (hasCutscene ? 2300 : 1200) + archetypeExtraDelay
    // flash duration — 관찰 카드, 말풍선, 핫바 슬롯이 모두 3회 이상 점멸하는 리듬 공유
    const flashMs = 3150
    // 이벤트 관찰도 micro 강조로 제한한다. 실제 번개 연결은 쟁점 unlock 같은 보상 순간에서만 발동.
    const useMicroLink = false

    // Modal(actions 있는 Tier 3)이 떠 있으면 닫힐 때까지 대기 → 순차 진행
    const runArrive = () => {
      setDisplayedMainId(latest.id)   // 카드 교체 (즉시 등장 애니메이션)
      const importantEvent = isImportantEventObservation(latest)
      setIsFresh(latest.category !== 'event' || importantEvent)
      const flashMainImmediately = latest.category === 'contradiction' || latest.category === 'evidence' || importantEvent
      if (flashMainImmediately || !confirmedSlipFlashActiveRef.current) {
        setIsHeroFlash(flashMainImmediately)
      }

      // 연결된 채팅 발언 pulse + (이벤트 카테고리일 때만 번개 연결 + 전기 테두리)
      const store = useGameStore.getState()

      const dialogueId = latest.linkedDialogueId
      if (dialogueId && typeof document !== 'undefined') {
        // 같은 말풍선에 연달아 2번 발동 방지 (관찰+이벤트 동시 시)
        if (pulsedRef.current.has(dialogueId)) {
          return
        }
        pulsedRef.current.add(dialogueId)
        window.setTimeout(() => pulsedRef.current.delete(dialogueId), flashMs + 300)

        const safeId = CSS && typeof CSS.escape === 'function' ? CSS.escape(dialogueId) : dialogueId
        const rowSelector = `[data-dialogue-id="${safeId}"]`
        const row = document.querySelector<HTMLElement>(rowSelector)
        const bubble =
          row?.querySelector<HTMLElement>('.pc-log-bubble') ??
          row?.querySelector<HTMLElement>('.pc-log-system-card') ??
          row?.querySelector<HTMLElement>('.pc-log-system-explainer') ??
          row
        if (bubble && bubble !== row) {
          bubble.setAttribute('data-dialogue-bubble-id', dialogueId)
        }
        const bubbleSelector = bubble && bubble !== row
          ? `[data-dialogue-bubble-id="${safeId}"]`
          : rowSelector

        // 말풍선 3번 깜빡 (모든 카테고리 공통)
        if (bubble) {
          bubble.classList.add('pc-dialogue-jump-pulse')
          window.setTimeout(() => bubble.classList.remove('pc-dialogue-jump-pulse'), flashMs + 200)
        }

        if (useMicroLink) {
          // 이벤트 — 관찰 카드 aura + 말풍선 aura
          store.enqueueAura({ targetSelector: '[data-resonance-target="jobs-main"]' })
          store.enqueueAura({ targetSelector: bubbleSelector })
        }

        // archetype 카테고리는 캐릭터 뱃지도 함께 천천히 1회 깜빡 (번개/공명 없음)
        if (latest.category === 'archetype' && latest.party && latest.archetype) {
          const tagKey = `${latest.party}:${latest.archetype}`
          const tag = document.querySelector<HTMLElement>(`[data-archetype-tag="${tagKey}"]`)
          if (tag) {
            tag.classList.add('pc-archetype-badge-slow-pulse')
            window.setTimeout(() => tag.classList.remove('pc-archetype-badge-slow-pulse'), 3800)
          }
        }

        // slip (감정) 카테고리는 하단 캐릭터 카드 + 포트레이트 + 감정 뱃지 함께 깜빡
        if (latest.category === 'slip' && latest.party) {
          const card = document.querySelector<HTMLElement>(`[data-character-card="${latest.party}"]`)
          if (card) {
            const face = card.querySelector<HTMLElement>('.char-face')
            const emo = card.querySelector<HTMLElement>('.char-emo')
            card.classList.add('pc-dialogue-jump-pulse')
            face?.classList.add('pc-dialogue-jump-pulse')
            emo?.classList.add('pc-dialogue-jump-pulse')
            window.setTimeout(() => {
              card.classList.remove('pc-dialogue-jump-pulse')
              face?.classList.remove('pc-dialogue-jump-pulse')
              emo?.classList.remove('pc-dialogue-jump-pulse')
            }, flashMs + 200)
          }
        }
      }

      // hero flash 종료 타이머 (arrive 실행 시점 기준)
      if (flashMainImmediately) {
        window.setTimeout(() => setIsHeroFlash(false), flashMs)
      }
      window.setTimeout(() => {
        if (!confirmedSlipFlashActiveRef.current) {
          setIsFresh(false)
        }
      }, FRESH_MS)
    }

    // Modal 닫힐 때까지 polling (250ms 간격)
    const waitForModalClose = () => {
      const act = useGameStore.getState().activeFeedback
      const hasOpenModal = !!(act && Array.isArray(act.actions) && act.actions.length > 0)
      if (hasOpenModal) {
        window.setTimeout(waitForModalClose, 250)
        return
      }
      runArrive()
    }

    const arriveTimer = window.setTimeout(waitForModalClose, arriveDelay)

    const heroEndTimer = window.setTimeout(() => {
      // 백업 safeguard — arrive가 영원히 Modal 대기 상태라도 최종적으로는 정리
    }, arriveDelay + flashMs + 8000)

    return () => {
      window.clearTimeout(arriveTimer)
      window.clearTimeout(heroEndTimer)
    }
  }, [latest?.id])

  useEffect(() => {
    if (confirmedSlipCount <= confirmedSlipCountRef.current) {
      confirmedSlipCountRef.current = confirmedSlipCount
      return
    }
    confirmedSlipCountRef.current = confirmedSlipCount

    const slip = [...observations].reverse().find((obs) => obs.category === 'slip')
    if (!slip || confirmedSlipPulseRef.current.has(slip.id)) return
    confirmedSlipPulseRef.current.add(slip.id)

    const flashMs = 3150
    setDisplayedMainId(slip.id)
    setIsFresh(true)
    confirmedSlipFlashActiveRef.current = true
    setIsHeroFlash(true)
    setBadgeFlash(true)

    if (flashTimerRef.current !== null) {
      window.clearTimeout(flashTimerRef.current)
    }
    flashTimerRef.current = window.setTimeout(() => {
      setBadgeFlash(false)
    }, 2200)

    if (typeof document !== 'undefined') {
      let attempts = 0
      const pulseDrawerRow = () => {
        const safeSlipId =
          typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
            ? CSS.escape(slip.id)
            : slip.id
        const row = document.querySelector<HTMLElement>(
          `.pc-jobs-drawer.is-open .pc-jobs-drawer__item.is-slip[data-observation-id="${safeSlipId}"]`,
        )
        if (!row) {
          attempts += 1
          if (attempts <= 6) {
            confirmedSlipTimersRef.current.push(window.setTimeout(pulseDrawerRow, 80))
          }
          return
        }
        row.classList.add('is-active', 'is-highlight')
        confirmedSlipTimersRef.current.push(window.setTimeout(() => {
          row.classList.remove('is-active', 'is-highlight')
        }, flashMs))
      }
      window.requestAnimationFrame(pulseDrawerRow)
    }

    confirmedSlipTimersRef.current.push(window.setTimeout(() => {
      confirmedSlipFlashActiveRef.current = false
      setIsHeroFlash(false)
    }, flashMs))
    confirmedSlipTimersRef.current.push(window.setTimeout(() => setIsFresh(false), FRESH_MS))
  }, [confirmedSlipCount, historyOpen, observations])

  useEffect(() => {
    return () => {
      for (const timer of confirmedSlipTimersRef.current) {
        window.clearTimeout(timer)
      }
      confirmedSlipFlashActiveRef.current = false
      confirmedSlipTimersRef.current = []
    }
  }, [])

  const handleMainClick = () => {
    if (!main) return
    useGameStore.getState().markObservationRead(main.id)
    jumpToDialogue(main.linkedDialogueId)
  }

  const handleTimelineClick = () => {
    setHistoryOpen(true)
  }

  return (
    <section className="sec pc-judge-observation-section" aria-label={t('pc.observation.title')}>
      <div className="sec-h">
        <PCSvgIcon id="i-eye" size={14} />
        <span>{t('pc.observation.title')}</span>
        {unreadCount > 0 ? (
          <span className={`pc-jobs-badge${badgeFlash ? ' is-flash' : ''}`}>{unreadCount}</span>
        ) : null}
        <button
          type="button"
          className={`pc-jobs-history-btn${historyOpen ? ' is-open' : ''}`}
          onClick={() => {
            const next = !historyOpen
            if (next) {
              window.dispatchEvent(new CustomEvent('pc-drawer-open', { detail: 'observation-history' }))
            }
            setHistoryOpen(next)
          }}
          title={historyOpen ? t('pc.observation.historyClose') : t('pc.observation.historyOpen')}
          aria-label={t('pc.observation.historyOpen')}
          aria-pressed={historyOpen}
        >
          <PCSvgIcon id="i-doc" size={12} />
        </button>
      </div>

      {/* 미니 타임라인 아이콘 줄 */}
      <div className="pc-jobs-mini-timeline" role="list" aria-label={t('pc.observation.recentFlow')}>
        {timeline.length === 0 ? (
          <span className="pc-jobs-mini-timeline__empty" aria-hidden="true">···</span>
        ) : (
          timeline.map((obs, idx) => {
            const isActive = idx === timeline.length - 1
            return (
              <button
                key={obs.id}
                type="button"
                role="listitem"
                className={`pc-jobs-mini-dot is-${obs.category}${isActive ? ' is-active' : ''}`}
                onClick={handleTimelineClick}
                title={localizeRuntimeText(obs.title, locale)}
              >
                <PCSvgIcon id={obs.iconId ?? CATEGORY_ICON[obs.category]} size={10} />
              </button>
            )
          })
        )}
      </div>

      {/* 메인 슬롯 — 현재 발동된 관찰 */}
      {main ? (
        <button
          type="button"
          key={main.id}
          className={`pc-jobs-main is-${main.category}${isFresh ? ' is-fresh' : ' is-dim'}${isHeroFlash ? ' is-hero-flash' : ''}`}
          data-resonance-target="jobs-main"
          onClick={handleMainClick}
        >
          <span className="pc-jobs-main__bar" aria-hidden="true" />
          <span className="pc-jobs-main__icon">
            <PCSvgIcon id={main.iconId ?? CATEGORY_ICON[main.category]} size={20} />
          </span>
          <span className="pc-jobs-main__body">
            <span className="pc-jobs-main__title">{localizeRuntimeText(main.title, locale)}</span>
            {main.summary ? (
              <span className="pc-jobs-main__summary">{localizeRuntimeText(main.summary, locale)}</span>
            ) : null}
          </span>
          <span className="pc-jobs-main__time">{formatTurnGap(turnCount, main.turnCount)}</span>
        </button>
      ) : (
        <div className="pc-jobs-main is-empty" aria-hidden="true">
          <span className="pc-jobs-main__empty-text">{t('pc.observation.empty')}</span>
        </div>
      )}
    </section>
  )
}

function formatTurnGap(now: number, then: number): string {
  const gap = now - then
  if (gap <= 0) return translate('pc.common.justNow')
  return translate('pc.common.turnAgo', { count: gap })
}

/** 관찰 엔트리 / 타임라인 클릭 시 채팅의 해당 발언으로 스크롤 + 느린 pulse.
 *  공명 효과(jump-pulse, 1.4s)와 분리된 네비게이션 전용 클래스(nav-pulse, 3s). */
export function jumpToDialogue(dialogueId: string | undefined): void {
  if (!dialogueId) return
  if (typeof document === 'undefined') return
  const safeId = CSS && typeof CSS.escape === 'function' ? CSS.escape(dialogueId) : dialogueId
  const row = document.querySelector<HTMLElement>(`[data-dialogue-id="${safeId}"]`)
  if (!row) return
  const bubble =
    row.querySelector<HTMLElement>('.pc-log-bubble') ??
    row.querySelector<HTMLElement>('.pc-log-system-card') ??
    row.querySelector<HTMLElement>('.pc-log-system-explainer') ??
    row
  row.scrollIntoView({ behavior: 'smooth', block: 'center' })
  bubble.classList.add('pc-dialogue-nav-pulse')
  window.setTimeout(() => {
    bubble.classList.remove('pc-dialogue-nav-pulse')
  }, 3800)
}
