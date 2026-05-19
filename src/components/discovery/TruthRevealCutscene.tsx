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
import { getPcPortraitUrl } from '../pc/icons/pcPortraitUtils'
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

  // ── Portrait URLs (defensive → emotion target) ──
  const portraitDefensive = getPcPortraitUrl(caseId, party, 'defensive', null)
  const portraitTarget = (() => {
    if (variant === 'trust') return getPcPortraitUrl(caseId, party, 'defensive', 'S5')
    if (variant === 'slip') return getPcPortraitUrl(caseId, party, 'shaken', null)
    return getPcPortraitUrl(caseId, party, 'resigned', null) // witness final
  })()
  const portraitAlt = variant === 'witness' ? getPcPortraitUrl(caseId, party, 'shaken', null) : null

  // ── Phase state ──
  const [focusReady, setFocusReady] = useState(false)
  const [exprTarget, setExprTarget] = useState(false)
  const [phase2Visible, setPhase2Visible] = useState(false)
  const [phase1ShakeOn, setPhase1ShakeOn] = useState(false)
  const [closureOpen, setClosureOpen] = useState(false)
  const [oscIndex, setOscIndex] = useState(0) // 0 = target, 1 = alt (witness only)
  const oscIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeouts = useRef<Array<ReturnType<typeof setTimeout>>>([])

  // ── Texts ──
  const route = event.data?.route ?? 'trust'
  const confessionTrust = getConfessionTrust(caseId, disputeId, locale)
  const slipPhase1 = getSlipPhase1(caseId, disputeId, locale)
  const slipPhase2 = getSlipPhase2(caseId, disputeId, locale)
  const admissionWitness = getAdmissionWitness(caseId, disputeId, route, locale)
  const closureTruth = getClosureTruth(caseId, disputeId, locale)
  const slipLinked = getSlipLinkedDisputeId(caseId, disputeId)

  const primaryText =
    variant === 'trust' ? confessionTrust :
    variant === 'slip' ? slipPhase1 :
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
  useEffect(() => {
    const tt = timeouts.current

    // 0.9s — focus pull (blur → sharp)
    tt.push(setTimeout(() => setFocusReady(true), 900))

    if (variant === 'trust') {
      // 1.6s — expression crossfade
      tt.push(setTimeout(() => setExprTarget(true), 1600))
      // 2.0s — typing
      tt.push(setTimeout(() => typeInto(primaryText, 42, setTyped1, () => {
        tt.push(setTimeout(() => setClosureOpen(true), 1500))
      }), 2000))
    } else if (variant === 'slip') {
      // 2.0s — typing phase 1 (slower, 65ms/char)
      tt.push(setTimeout(() => typeInto(slipPhase1, 65, setTyped1, () => {
        // 1.2s gap → phase 2 + expression swap + bubble shake
        tt.push(setTimeout(() => {
          setPhase2Visible(true)
          setExprTarget(true)
          setPhase1ShakeOn(true)
          tt.push(setTimeout(() => setPhase1ShakeOn(false), 600))
          typeInto(slipPhase2, 55, setTyped2, () => {
            tt.push(setTimeout(() => setClosureOpen(true), 1500))
          })
        }, 1200))
      }), 2000))
    } else {
      // witness — expression oscillates between shaken/resigned every 1.2s
      oscIntervalRef.current = setInterval(() => {
        setOscIndex((i) => (i + 1) % 2)
      }, 1200)
      // 1.6s — first toggle
      tt.push(setTimeout(() => setOscIndex(1), 1600))
      // 2.4s — typing
      tt.push(setTimeout(() => typeInto(primaryText, 48, setTyped1, () => {
        // Stop oscillation, settle on target (resigned)
        if (oscIntervalRef.current) clearInterval(oscIntervalRef.current)
        oscIntervalRef.current = null
        setOscIndex(0)
        setExprTarget(true)
        tt.push(setTimeout(() => setClosureOpen(true), 1500))
      }), 2400))
    }

    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, primaryText, slipPhase1, slipPhase2])

  const handleDismiss = useCallback(() => {
    clearTimers()
    onDismiss()
  }, [clearTimers, onDismiss])

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

  return (
    <div
      className={`tr-cutscene tr-cutscene-${variant} ${closureOpen ? 'is-closure' : ''}`}
      onClick={handleDismiss}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Escape' || e.key === ' ') handleDismiss() }}
    >
      {/* Blurred game backdrop */}
      <div className="tr-bg-blur" />

      {/* Variant-specific VFX layers */}
      {variant === 'trust' && (
        <>
          <div className="tr-pin-spotlight" />
          <div className="tr-pin-motes" />
        </>
      )}
      {variant === 'slip' && <div className="tr-red-flash" />}
      {variant === 'witness' && event.data?.witnessName && (
        <div className="tr-witness-modal">
          <div className="tr-witness-label">{tx('증인 진술')} · {event.data?.witnessId ?? ''}</div>
          <div className="tr-witness-name">{event.data.witnessName}</div>
          <div className="tr-witness-quote">{event.data.witnessQuote}</div>
        </div>
      )}

      {/* Character portrait stack */}
      <div className="tr-char-zone">
        <div className="tr-char-frame">
          <div className={`tr-portrait-stack ${focusReady ? 'is-focus' : 'is-defocus'}`}>
            {portraitDefensive && (
              <img
                src={portraitDefensive}
                alt=""
                className={
                  variant === 'witness'
                    ? oscIndex === 0 ? 'active' : ''
                    : !exprTarget ? 'active' : ''
                }
              />
            )}
            {portraitTarget && (
              <img
                src={portraitTarget}
                alt=""
                className={
                  variant === 'witness'
                    ? oscIndex === 1 ? 'active' : ''
                    : exprTarget ? 'active' : ''
                }
              />
            )}
          </div>
        </div>
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
          <div className={`tr-bubble tr-bubble-slip phase-1 ${phase1ShakeOn ? 'is-shake' : ''}`}>
            <span>{typed1}</span><span className={`tr-caret ${typed1.length >= slipPhase1.length ? 'is-done' : ''}`} />
          </div>
          {phase2Visible && (
            <div className="tr-bubble tr-bubble-slip phase-2 is-visible">
              <span>{typed2}</span><span className={`tr-caret ${typed2.length >= slipPhase2.length ? 'is-done' : ''}`} />
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
            <span className="tr-next-prompt">{tx('[클릭하여 계속]')}</span>
          </div>
        </div>
      )}
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
