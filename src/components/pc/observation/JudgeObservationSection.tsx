import { useEffect, useMemo, useRef, useState } from 'react'
import { useGameStore, useStore } from '../../../store/useGameStore'
import PCSvgIcon from '../icons/PCSvgIcon'
import type {
  JudgeObservation,
  JudgeObservationCategory,
} from '../../../store/slices/judgeObservationSlice'

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

export default function JudgeObservationSection() {
  const observations = useStore((s) => s.judgeObservations ?? [])
  const turnCount = useStore((s) => s.turnCount)
  const setHistoryOpen = useStore((s) => s.setObservationHistoryOpen)
  const historyOpen = useStore((s) => s.observationHistoryOpen)

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
    setBadgeFlash(true)
    if (flashTimerRef.current !== null) {
      window.clearTimeout(flashTimerRef.current)
    }
    flashTimerRef.current = window.setTimeout(() => {
      setBadgeFlash(false)
    }, 700)
    return () => {
      if (flashTimerRef.current !== null) {
        window.clearTimeout(flashTimerRef.current)
        flashTimerRef.current = null
      }
    }
  }, [observations.length])

  // 카드 상태
  const [isFresh, setIsFresh] = useState<boolean>(false)
  const [isHeroFlash, setIsHeroFlash] = useState<boolean>(false)

  const processedIdRef = useRef<string | null>(null)
  const pulsedRef = useRef<Set<string>>(new Set())

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
    // flash duration — 관찰 카드 is-hero-flash와 말풍선 pc-dialogue-jump-pulse 모두 2.4s 리듬 공유
    // (핫바 슬롯 pulse와 속도 통일, 유저 체감 속도 완화)
    const flashMs = 2400
    // 이벤트만 번개 연결, 나머지는 깜빡 공명
    const useLightning = latest.category === 'event'

    // Modal(actions 있는 Tier 3)이 떠 있으면 닫힐 때까지 대기 → 순차 진행
    const runArrive = () => {
      setDisplayedMainId(latest.id)   // 카드 교체 (즉시 등장 애니메이션)
      setIsFresh(true)
      setIsHeroFlash(true)

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

        // 말풍선 2번 깜빡 (모든 카테고리 공통)
        if (bubble) {
          bubble.classList.add('pc-dialogue-jump-pulse')
          window.setTimeout(() => bubble.classList.remove('pc-dialogue-jump-pulse'), flashMs + 200)
        }

        if (useLightning) {
          // 이벤트 — 관찰 카드 aura + 말풍선 aura + 번개 연결 (확실한 인지)
          store.enqueueAura({ targetSelector: '[data-resonance-target="jobs-main"]' })
          store.enqueueAura({ targetSelector: bubbleSelector })
          store.enqueueResonance({
            fromSelector: '[data-resonance-target="jobs-main"]',
            toSelector: bubbleSelector,
          })
          window.setTimeout(() => {
            useGameStore.getState().enqueueResonance({
              fromSelector: '[data-resonance-target="jobs-main"]',
              toSelector: bubbleSelector,
            })
          }, 60)
          window.setTimeout(() => {
            useGameStore.getState().enqueueResonance({
              fromSelector: '[data-resonance-target="jobs-main"]',
              toSelector: bubbleSelector,
            })
          }, 140)
        }

        // archetype 카테고리는 캐릭터 뱃지도 함께 깜빡
        if (latest.category === 'archetype' && latest.party && latest.archetype) {
          const tagKey = `${latest.party}:${latest.archetype}`
          const tag = document.querySelector<HTMLElement>(`[data-archetype-tag="${tagKey}"]`)
          if (tag) {
            tag.classList.add('pc-dialogue-jump-pulse')
            window.setTimeout(() => tag.classList.remove('pc-dialogue-jump-pulse'), flashMs + 200)
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
      window.setTimeout(() => setIsHeroFlash(false), flashMs)
      window.setTimeout(() => setIsFresh(false), FRESH_MS)
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

  const handleMainClick = () => {
    if (!main) return
    useGameStore.getState().markObservationRead(main.id)
    jumpToDialogue(main.linkedDialogueId)
  }

  const handleTimelineClick = () => {
    setHistoryOpen(true)
  }

  return (
    <section className="sec pc-judge-observation-section" aria-label="재판관의 관찰">
      <div className="sec-h">
        <PCSvgIcon id="i-eye" size={14} />
        <span>재판관의 관찰</span>
        {unreadCount > 0 ? (
          <span className={`pc-jobs-badge${badgeFlash ? ' is-flash' : ''}`}>{unreadCount}</span>
        ) : null}
        <button
          type="button"
          className={`pc-jobs-history-btn${historyOpen ? ' is-open' : ''}`}
          onClick={() => setHistoryOpen(!historyOpen)}
          title={historyOpen ? '전체 히스토리 닫기' : '전체 히스토리 열기'}
          aria-label="관찰 히스토리 토글"
          aria-pressed={historyOpen}
        >
          <PCSvgIcon id="i-doc" size={12} />
        </button>
      </div>

      {/* 미니 타임라인 아이콘 줄 */}
      <div className="pc-jobs-mini-timeline" role="list" aria-label="최근 관찰 흐름">
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
                title={obs.title}
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
            <span className="pc-jobs-main__title">{main.title}</span>
            {main.summary ? (
              <span className="pc-jobs-main__summary">{main.summary}</span>
            ) : null}
          </span>
          <span className="pc-jobs-main__time">{formatTurnGap(turnCount, main.turnCount)}</span>
        </button>
      ) : (
        <div className="pc-jobs-main is-empty" aria-hidden="true">
          <span className="pc-jobs-main__empty-text">현재 특이사항 없음</span>
        </div>
      )}
    </section>
  )
}

function formatTurnGap(now: number, then: number): string {
  const gap = now - then
  if (gap <= 0) return '방금'
  if (gap === 1) return '1턴 전'
  return `${gap}턴 전`
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
  }, 3000)
}
