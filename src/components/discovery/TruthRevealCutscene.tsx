/**
 * TruthRevealCutscene — 진실 발견 3 경로 컷씬
 *
 * Variants:
 *   trust    — 신뢰 자백 (lieState S5 자연 도달)
 *   slip     — 감정 슬립 (격앙 + verbalTell 누설)
 *   witness  — 증인 경로 (witness breakthrough)
 *
 * Design authority: tmp/cutscene-mockup-v5.html
 * Texts loaded from src/data/cutsceneText/{case}/{disputeId}.json (Codex TR1~TR3).
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CutsceneEvent } from '../../engine/cutsceneTriggerEngine'
import {
  getConfessionTrust,
  getSlipPhase1,
  getSlipPhase2,
  getAdmissionWitness,
  getClosureTruth,
  getSlipLinkedDisputeId,
} from '../../engine/cutsceneTextLoader'
import { getPcPortraitUrl, getWitnessPortraitUrl } from '../pc/icons/pcPortraitUtils'
import { getRuntimeTextLocale, localizeRuntimeText } from '../../i18n/runtimeText'

const tx = (ko: string): string => localizeRuntimeText(ko, getRuntimeTextLocale())

type Variant = 'trust' | 'slip' | 'witness'

interface Props {
  event: CutsceneEvent & {
    type: 'truth_reveal_trust' | 'truth_reveal_slip' | 'truth_reveal_witness'
  }
  onDismiss: () => void
}

function eventToVariant(t: Props['event']['type']): Variant {
  if (t === 'truth_reveal_trust') return 'trust'
  if (t === 'truth_reveal_slip') return 'slip'
  return 'witness'
}

export default function TruthRevealCutscene({ event, onDismiss }: Props) {
  const variant = eventToVariant(event.type)
  const locale = getRuntimeTextLocale()  // used by loader helpers below
  const caseId = (event.data?.caseId ?? '').replace(/^case-/, '')
  const disputeId = event.data?.disputeId ?? ''
  const party = event.data?.partyId ?? 'b'

  // ── Portrait URLs (양쪽 캐릭터 + 증인 — 카메라 시스템에서 둘 다 그림) ──
  const portraitADefensive = getPcPortraitUrl(caseId, 'a', 'defensive', null)
  const portraitBDefensive = getPcPortraitUrl(caseId, 'b', 'defensive', null)
  const portraitTarget = (() => {
    if (variant === 'trust') return getPcPortraitUrl(caseId, party, 'defensive', 'S5')
    if (variant === 'slip') return getPcPortraitUrl(caseId, party, 'shaken', null)
    return getPcPortraitUrl(caseId, party, 'resigned', null) // witness final
  })()
  const witnessPortrait = getWitnessPortraitUrl(caseId, event.data?.witnessId)

  // ── Phase state ──
  const [focusReady, setFocusReady] = useState(false)
  const [exprTarget, setExprTarget] = useState(false)
  const [phase2Visible, setPhase2Visible] = useState(false)
  const [phase1ShakeOn, setPhase1ShakeOn] = useState(false)
  const [closureOpen, setClosureOpen] = useState(false)
  const [oscIndex, setOscIndex] = useState(0) // 0 = target, 1 = alt (witness only)
  // 카메라 phase: 'wide' = 두 캐릭터 좌우 작게, 'focus-a'/'focus-b' = 해당 캐릭터로 줌인,
  // 'focus-witness-a'/'focus-witness-b' = 증인 줌인 (side별 다른 origin)
  const [cameraPhase, setCameraPhase] = useState<'wide' | 'focus-a' | 'focus-b' | 'focus-witness-a' | 'focus-witness-b'>('wide')
  // Slip 3단계: 'idle' → 'explosive' (격앙 외침) → 'dismay' (당황 짧게) → 'confession' (체념 자백 타이핑)
  const [slipStage, setSlipStage] = useState<'idle' | 'explosive' | 'dismay' | 'confession'>('idle')
  // typing 완료 후 [확인 Space] 대기 단계 (사용자가 누를 때까지 closure 안 열림)
  const [awaitingConfirm, setAwaitingConfirm] = useState(false)
  // Witness modal visible — sequence에서 명시적으로 hide (CSS opacity transition만으로는 안정적이지 X)
  const [witnessModalVisible, setWitnessModalVisible] = useState(false)
  const oscIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeouts = useRef<Array<ReturnType<typeof setTimeout>>>([])

  // ── Texts ──
  const route = event.data?.route ?? 'trust'
  const confessionTrust = getConfessionTrust(caseId, disputeId, locale)
  const slipPhase1Text = getSlipPhase1(caseId, disputeId, locale)
  const slipPhase2Raw = getSlipPhase2(caseId, disputeId, locale)
  // slip 3단계 구조:
  //   stage 1 — explosive (phase 1 = 격앙 폭로)
  //   stage 2 — dismay (phase 2 = "그게 아니라..." 짧은 당황, 본인 실수 깨달음)
  //   stage 3 — confession (confession_trust = 체념 본격 자백, 별도 텍스트)
  // phase 2 ≠ confession. 항상 confession_trust 사용해 두 단계 텍스트 분리.
  const slipFullConfession = confessionTrust
  const admissionWitness = getAdmissionWitness(caseId, disputeId, route, locale)
  const closureTruth = getClosureTruth(caseId, disputeId, locale)
  const slipLinked = getSlipLinkedDisputeId(caseId, disputeId)

  const primaryText =
    variant === 'trust' ? confessionTrust :
    variant === 'slip' ? slipPhase1Text :
    admissionWitness

  // Typing state
  const [typed1, setTyped1] = useState('')
  const [typed2, setTyped2] = useState('')

  const clearTimers = useCallback(() => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
    if (oscIntervalRef.current) {
      clearInterval(oscIntervalRef.current)
      oscIntervalRef.current = null
    }
  }, [])

  // ── Sequence orchestration ──
  // 공통: 시작은 wide (두 캐릭터 좌우 작게) → focused 캐릭터로 줌인.
  // witness는 wide → focus-witness (증인 줌 + 진술) → focus-character (해당 캐릭터 줌 + 자백).
  useEffect(() => {
    const tt = timeouts.current
    const focusCamera = party === 'a' ? 'focus-a' : 'focus-b'

    if (variant === 'trust') {
      // 0.0s — wide → 0.7s 카메라 줌인 → 1.1s sharp → 1.6s confessing 표정 → 1.8s typing
      tt.push(setTimeout(() => setCameraPhase(focusCamera), 700))
      tt.push(setTimeout(() => setFocusReady(true), 1100))
      tt.push(setTimeout(() => setExprTarget(true), 1600))
      tt.push(setTimeout(() => typeInto(primaryText, 32, setTyped1, () => {
        // typing 끝 → [확인 Space] 표시 (자동 closure 안 열림, 사용자 입력 대기)
        tt.push(setTimeout(() => setAwaitingConfirm(true), 800))
      }), 1800))
    } else if (variant === 'slip') {
      tt.push(setTimeout(() => setCameraPhase(focusCamera), 700))
      tt.push(setTimeout(() => setFocusReady(true), 1100))
      tt.push(setTimeout(() => {
        setSlipStage('explosive')
        setExprTarget(true)
        setPhase1ShakeOn(true)
        tt.push(setTimeout(() => setPhase1ShakeOn(false), 700))
      }, 1600))
      tt.push(setTimeout(() => {
        setSlipStage('dismay')
      }, 3600))
      tt.push(setTimeout(() => {
        setSlipStage('confession')
        typeInto(slipFullConfession, 38, setTyped2, () => {
          tt.push(setTimeout(() => setAwaitingConfirm(true), 800))
        })
      }, 6000))
    } else {
      // witness — 증인 줌인 → modal 노출 (2.4s) → 2초 대기 → zoom out → 캐릭터 줌인 → typing
      const witnessSide: 'a' | 'b' = party === 'a' ? 'b' : 'a'
      // 0.6s — 증인 줌인 + modal 표시
      tt.push(setTimeout(() => {
        setCameraPhase(`focus-witness-${witnessSide}`)
        setWitnessModalVisible(true)
      }, 600))
      // 5.0s — 2초 대기 후 zoom out + modal 즉시 사라짐 (사용자 요청: 증인 말 끝난 후 말풍선 사라짐)
      tt.push(setTimeout(() => {
        setCameraPhase('wide')
        setWitnessModalVisible(false)
      }, 5000))
      // 5.8s — 해당 캐릭터로 줌인
      tt.push(setTimeout(() => setCameraPhase(focusCamera), 5800))
      // 6.2s — portrait focus
      tt.push(setTimeout(() => setFocusReady(true), 6200))
      // 6.4s — 표정 oscillation (shaken ↔ resigned)
      oscIntervalRef.current = setInterval(() => {
        setOscIndex((i) => (i + 1) % 2)
      }, 1200)
      tt.push(setTimeout(() => setOscIndex(1), 6400))
      // 6.8s — typing (자백)
      tt.push(setTimeout(() => typeInto(primaryText, 36, setTyped1, () => {
        if (oscIntervalRef.current) clearInterval(oscIntervalRef.current)
        oscIntervalRef.current = null
        setOscIndex(0)
        setExprTarget(true)
        tt.push(setTimeout(() => setAwaitingConfirm(true), 800))
      }), 6800))
    }

    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, primaryText, slipPhase1Text, slipPhase2Raw, slipFullConfession, party])

  const handleDismiss = useCallback(() => {
    clearTimers()
    onDismiss()
  }, [clearTimers, onDismiss])

  // [확인 Space] 클릭 — typing 완료 후 closure card 열기 (사용자 요청: 자동 closure 안 됨, 수동 confirm)
  const handleConfirm = useCallback(() => {
    setAwaitingConfirm(false)
    setClosureOpen(true)
  }, [])

  const disputeName = event.data?.disputeName ?? disputeId
  const lieStateBefore = event.data?.lieStateBefore
  const lieStateAfter = event.data?.lieStateAfter

  // Hero title text per variant — hardcoded KO, auto 4-lang via runtimeText
  const heroTitle =
    variant === 'trust' ? tx('방어 붕괴') :
    variant === 'slip' ? tx('방어 완화') :
    tx('진술 균열')
  const heroLabel =
    variant === 'trust' ? tx('진실 발견 · 신뢰 도달') :
    variant === 'slip' ? tx('단서 누설 · 감정 실수') :
    tx('진술 확정 · 증언 결정타')

  // witness 위치 — focused character의 반대편
  const witnessSide: 'a' | 'b' = party === 'a' ? 'b' : 'a'

  return (
    <div
      className={`tr-cutscene tr-cutscene-${variant} tr-cutscene-cam-${cameraPhase} ${closureOpen ? 'is-closure' : ''} ${awaitingConfirm ? 'is-awaiting-confirm' : ''}`}
      onClick={() => {
        // awaitingConfirm 상태: confirm → closure 열기.
        // closure 열린 상태: dismiss (다음 popup으로 진행).
        // 그 외 (typing/sequence 중): 아무것도 안 함 (사용자 의도 — 자동 진행 X)
        if (awaitingConfirm) handleConfirm()
        else if (closureOpen) handleDismiss()
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Escape') { handleDismiss(); return }
        if (e.key === ' ') {
          if (awaitingConfirm) handleConfirm()
          else if (closureOpen) handleDismiss()
        }
      }}
    >
      {/* Letterbox bars — top/bottom black bands for cinematic frame */}
      <div className="tr-letterbox tr-letterbox-top" />
      <div className="tr-letterbox tr-letterbox-bottom" />

      {/* Stage — letterbox 안쪽 panel (모든 컷씬 콘텐츠는 이 안에서 % 좌표로 배치) */}
      <div className="tr-stage">
      {/* Blurred game backdrop */}
      <div className="tr-bg-blur" />

      {/* Variant-specific VFX layers (camera 외부) */}
      {variant === 'trust' && (
        <>
          <div className="tr-pin-spotlight" />
          <div className="tr-pin-motes" />
        </>
      )}
      {variant === 'slip' && <div className="tr-red-flash" />}
      {variant === 'witness' && event.data?.witnessName && witnessModalVisible && (
        <div className="tr-witness-modal">
          <div className="tr-witness-label">{tx('증인 진술')} · {event.data?.witnessId ?? ''}</div>
          <div className="tr-witness-name">{event.data.witnessName}</div>
          <div className="tr-witness-quote">{event.data.witnessQuote}</div>
        </div>
      )}

      {/* Camera — 두 character + (witness) wrap. cameraPhase에 따라 scale + origin 변경 */}
      <div className={`tr-camera tr-camera-${cameraPhase}`}>
        {/* Slot A (왼쪽 캐릭터) — witness mode에서 peer 자리에 증인이 들어오면 hide */}
        {!(variant === 'witness' && witnessSide === 'a') && (
          <CharSlot
            side="a"
            focused={party === 'a'}
            portraitDefensive={portraitADefensive}
            portraitTarget={party === 'a' ? portraitTarget : null}
            variant={variant}
            exprTarget={exprTarget}
            oscIndex={oscIndex}
            focusReady={focusReady && party === 'a'}
          />
        )}
        {/* Slot B (오른쪽 캐릭터) — witness mode에서 peer 자리에 증인이 들어오면 hide */}
        {!(variant === 'witness' && witnessSide === 'b') && (
          <CharSlot
            side="b"
            focused={party === 'b'}
            portraitDefensive={portraitBDefensive}
            portraitTarget={party === 'b' ? portraitTarget : null}
            variant={variant}
            exprTarget={exprTarget}
            oscIndex={oscIndex}
            focusReady={focusReady && party === 'b'}
          />
        )}
        {/* Witness — focused 반대편 slot 위치에 등장. 실제 PNG 우선, 없으면 SVG silhouette */}
        {variant === 'witness' && (
          <div className={`tr-char-slot tr-char-slot-${witnessSide} tr-witness-slot`} aria-hidden="true">
            {witnessPortrait ? (
              <img src={witnessPortrait} alt="" className="tr-witness-portrait active" />
            ) : (
              <div className="tr-witness-silhouette">
                <svg viewBox="0 0 220 360" preserveAspectRatio="xMidYMax meet">
                  <defs>
                    <linearGradient id="tr-wit-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(155, 168, 122, 0.85)" />
                      <stop offset="55%" stopColor="rgba(98, 112, 78, 0.7)" />
                      <stop offset="100%" stopColor="rgba(40, 48, 32, 0.0)" />
                    </linearGradient>
                  </defs>
                  <ellipse cx="110" cy="74" rx="38" ry="44" fill="url(#tr-wit-grad)" />
                  <path d="M 38 360 C 38 230 60 168 110 158 C 160 168 182 230 182 360 Z" fill="url(#tr-wit-grad)" />
                  <path d="M 78 200 L 110 232 L 142 200 L 138 244 L 82 244 Z" fill="rgba(20, 26, 14, 0.55)" />
                </svg>
                <div className="tr-witness-silhouette-glow" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hero title (large, beside character) */}
      <div className="tr-hero-title">
        <div className="tr-hero-label">{heroLabel}</div>
        <div className="tr-hero-big">{heroTitle}</div>
        {event.data?.partyName && (
          <div className="tr-hero-sub">{event.data.partyName} · {disputeName}</div>
        )}
      </div>

      {/* Typing bubble(s) */}
      {variant === 'slip' ? (
        <>
          {/* phase 1 — 격앙 외침 (즉시 박힘 + 흔들림) */}
          {slipStage === 'explosive' && (
            <div className={`tr-bubble tr-bubble-slip phase-1 ${phase1ShakeOn ? 'is-shake' : ''}`}>
              {slipPhase1Text}
            </div>
          )}
          {/* phase 1.5 — 당황 ("그게 아니라..." 짧게, 사라지는 효과) */}
          {slipStage === 'dismay' && (
            <div className="tr-bubble tr-bubble-slip phase-1-half">
              {slipPhase2Raw}
            </div>
          )}
          {/* phase 2 — 체념 자백 타이핑 (전체 진실) */}
          {slipStage === 'confession' && (
            <div className="tr-bubble tr-bubble-slip phase-2 is-visible">
              <span>{typed2}</span><span className={`tr-caret ${typed2.length >= slipFullConfession.length ? 'is-done' : ''}`} />
              {slipLinked && (
                <div className="tr-cascade-pill">
                  {tx('단서')} → {slipLinked}
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="tr-bubble">
          <span>{typed1}</span><span className={`tr-caret ${typed1.length >= primaryText.length ? 'is-done' : ''}`} />
        </div>
      )}

      {/* Confirm prompt — typing 끝 후 closure 열기 전 [확인 Space] 단계 */}
      {awaitingConfirm && !closureOpen && (
        <button
          type="button"
          className="tr-confirm-pre-closure"
          onClick={(e) => { e.stopPropagation(); handleConfirm() }}
        >
          <span>{tx('확인')}</span>
          <kbd>Space</kbd>
        </button>
      )}

      {/* Dim layer when closure opens */}
      <div className="tr-closure-dim" />

      {/* Closure card */}
      {closureOpen && (
        <div className="tr-closure-card">
          <div className="tr-closure-head">
            <span className="tr-closure-type">
              {variant === 'slip' ? tx('단서 누설') : tx('진실 확정')}
            </span>
            <span className="tr-closure-title">
              {variant === 'slip' && event.data?.linkedDisputeId
                ? `${tx('연결 쟁점')} ${event.data.linkedDisputeId}`
                : disputeName}
            </span>
            <span className="tr-closure-lock">
              {variant === 'slip' ? tx('추론 자료 추가') : tx('잠금 확정')}
            </span>
          </div>
          <div className="tr-closure-body">
            <div className="tr-closure-meta">
              {variant !== 'slip' && lieStateBefore && lieStateAfter && (
                <div className="tr-meta-row">
                  <span className="k">{tx('거짓 단계')}</span>
                  <span className="v changed">{lieStateBefore} → {lieStateAfter}</span>
                </div>
              )}
              {variant === 'witness' && (
                <div className="tr-meta-row">
                  <span className="k">{tx('트리거')}</span>
                  <span className="v">{tx('증인 진술')}</span>
                </div>
              )}
              {event.data?.route && (
                <div className="tr-meta-row">
                  <span className="k">{tx('경로')}</span>
                  <span className="v">{event.data.route === 'trust' ? tx('신뢰') : tx('감정')}</span>
                </div>
              )}
            </div>
            <div className="tr-closure-truth">
              <div className="tr-truth-label">
                {variant === 'slip' ? tx('누설된 단서') : tx('확정된 진실')}
              </div>
              <div className="tr-truth-quote">{closureTruth}</div>
            </div>
          </div>
          <div className="tr-closure-next">
            <span className="tr-next-hint">
              {variant === 'slip' && slipLinked
                ? `${tx('다음 단계로 진행 가능')} — ${slipLinked}`
                : tx('다음 단계로 진행 가능')}
            </span>
            <button
              type="button"
              className="tr-closure-confirm"
              onClick={(e) => { e.stopPropagation(); handleDismiss() }}
            >
              <span>{tx('확인')}</span>
              <kbd>Space</kbd>
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

// ── Character slot — 왼쪽(a)/오른쪽(b)에 portrait stack 렌더 ──
interface CharSlotProps {
  side: 'a' | 'b'
  focused: boolean
  portraitDefensive: string | null
  portraitTarget: string | null
  variant: Variant
  exprTarget: boolean
  oscIndex: number
  focusReady: boolean
}

function CharSlot({ side, focused, portraitDefensive, portraitTarget, variant, exprTarget, oscIndex, focusReady }: CharSlotProps) {
  if (!portraitDefensive) return null
  const stackClass = focused
    ? (focusReady ? 'is-focus' : 'is-defocus')
    : 'is-peer'
  const defensiveActive = focused
    ? (variant === 'witness' ? oscIndex === 0 : !exprTarget)
    : true  // peer always defensive
  const targetActive = focused && portraitTarget && (variant === 'witness' ? oscIndex === 1 : exprTarget)
  return (
    <div className={`tr-char-slot tr-char-slot-${side} ${focused ? 'is-focused' : 'is-peer-side'}`}>
      <div className={`tr-portrait-stack ${stackClass}`}>
        <img src={portraitDefensive} alt="" className={defensiveActive ? 'active' : ''} />
        {focused && portraitTarget && (
          <img src={portraitTarget} alt="" className={targetActive ? 'active' : ''} />
        )}
      </div>
    </div>
  )
}

// ── Typing helper (writes to setState) ──
function typeInto(
  text: string,
  speed: number,
  setter: (s: string) => void,
  onDone?: () => void,
): void {
  let i = 0
  setter('')
  const tick = () => {
    if (i < text.length) {
      i += 1
      setter(text.slice(0, i))
      setTimeout(tick, speed)
    } else {
      onDone?.()
    }
  }
  setTimeout(tick, 100)
}
