/**
 * CutsceneOverlay — 전체 화면 컷씬 연출 컴포넌트
 * ─────────────────────────────────
 * 게임 하이라이트 시점에 극적 비주얼을 전체 화면 위에 표시.
 * 기존 GameEventModal, StateTransitionFeedback 등과 공존하되 z-index 최상위.
 *
 * 6종 컷씬:
 *   lie_collapse       — 거짓말 붕괴 (S5 도달)
 *   contradiction_hit  — 모순 지적 성공
 *   emotional_burst    — 감정 폭발
 *   dispute_emergence  — 쟁점 발현
 *   phase_transition   — Phase 전환
 *   verdict_gavel      — 최종 판결
 *
 * 각 유형은 자동 dismiss + 유저 클릭 dismiss 모두 지원.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import type { CutsceneEvent } from '../../engine/cutsceneTriggerEngine'
import { CUTSCENE_DURATION } from '../../engine/cutsceneTriggerEngine'

// ── 외부 트리거 함수 ──────────────────────────────────

type CutsceneListener = (event: CutsceneEvent) => void
let _listener: CutsceneListener | null = null

/** 외부에서 호출하여 컷씬을 발동시킨다 */
export function triggerCutscene(event: CutsceneEvent): void {
  _listener?.(event)
}

// ── 메인 컴포넌트 ──────────────────────────────────

export default function CutsceneOverlay() {
  const [event, setEvent] = useState<CutsceneEvent | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 리스너 등록
  useEffect(() => {
    _listener = (e: CutsceneEvent) => setEvent(e)
    return () => { _listener = null }
  }, [])

  // 자동 dismiss
  useEffect(() => {
    if (!event) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setEvent(null)
      timerRef.current = null
    }, CUTSCENE_DURATION[event.type])
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [event])

  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = null
    setEvent(null)
  }, [])

  if (!event) return null

  return (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center cursor-pointer"
      onClick={dismiss}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Escape' || e.key === ' ') dismiss() }}
    >
      {event.type === 'lie_collapse' && <LieCollapseScene data={event.data} />}
      {event.type === 'contradiction_hit' && <ContradictionHitScene data={event.data} />}
      {event.type === 'emotional_burst' && <EmotionalBurstScene data={event.data} />}
      {event.type === 'dispute_emergence' && <DisputeEmergenceScene data={event.data} />}
      {event.type === 'phase_transition' && <PhaseTransitionScene data={event.data} />}
      {event.type === 'verdict_gavel' && <VerdictGavelScene data={event.data} />}
    </div>
  )
}

// ── 개별 씬 ──────────────────────────────────────

/** 1. 거짓말 붕괴 — 금이 가는 효과 + 텍스트 */
function LieCollapseScene({ data }: { data?: CutsceneEvent['data'] }) {
  return (
    <div className="absolute inset-0 bg-gray-950/80 flex flex-col items-center justify-center">
      {/* 균열 효과 */}
      <div className="cutscene-crack absolute inset-0 pointer-events-none" />

      <div className="relative z-10 text-center px-6 animate-cutscene-fade-in">
        <div className="text-5xl mb-4 animate-cutscene-crack-scale">
          <svg width="64" height="64" viewBox="0 0 64 64" className="mx-auto">
            <path d="M32 4 L36 24 L44 20 L38 32 L48 36 L34 38 L36 52 L30 36 L20 40 L28 30 L16 24 L30 26 Z"
              fill="none" stroke="rgba(250,204,21,0.8)" strokeWidth="2" className="cutscene-crack-path" />
          </svg>
        </div>
        <p className="text-2xl font-black text-amber-400 tracking-wider mb-2">
          방어가 무너졌습니다
        </p>
        {data?.partyName && (
          <p className="text-sm text-amber-300/70">{data.partyName}</p>
        )}
      </div>
    </div>
  )
}

/** 2. 모순 지적 성공 — 화면 흔들림 + 좌우 대비 */
function ContradictionHitScene({ data }: { data?: CutsceneEvent['data'] }) {
  return (
    <div className="absolute inset-0 bg-gray-950/85 animate-cutscene-shake">
      {/* 번개 이펙트 */}
      <div className="cutscene-lightning absolute inset-0 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-5">
        <p className="text-3xl font-black text-yellow-400 tracking-widest mb-6 animate-cutscene-fade-in">
          모순 발견!
        </p>

        {/* 좌우 대비 레이아웃 */}
        {(data?.statement1 || data?.statement2) && (
          <div className="flex gap-3 w-full max-w-md animate-cutscene-fade-in">
            <div className="flex-1 bg-blue-950/40 border border-blue-500/30 rounded-xl p-3">
              <p className="text-[10px] text-blue-400/60 font-bold mb-1">진술 A</p>
              <p className="text-xs text-blue-200 leading-relaxed">
                {data?.statement1 ?? '...'}
              </p>
            </div>
            <div className="flex items-center text-yellow-400 font-black text-lg">VS</div>
            <div className="flex-1 bg-rose-950/40 border border-rose-500/30 rounded-xl p-3">
              <p className="text-[10px] text-rose-400/60 font-bold mb-1">진술 B</p>
              <p className="text-xs text-rose-200 leading-relaxed">
                {data?.statement2 ?? '...'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/** 3. 감정 폭발 — 붉은 플래시 + 대사 강조 */
function EmotionalBurstScene({ data }: { data?: CutsceneEvent['data'] }) {
  return (
    <div className="absolute inset-0">
      {/* 붉은 플래시 오버레이 */}
      <div className="absolute inset-0 bg-red-600 cutscene-red-flash pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 animate-cutscene-pulse">
        {data?.text && (
          <div className="bg-gray-950/70 border border-red-500/40 rounded-2xl px-6 py-4 max-w-sm">
            <p className="text-base text-red-200 font-bold leading-relaxed text-center italic">
              &ldquo;{data.text}&rdquo;
            </p>
          </div>
        )}
        {data?.partyName && (
          <p className="text-xs text-red-400/60 mt-3">{data.partyName}</p>
        )}
      </div>
    </div>
  )
}

/** 4. 쟁점 발현 — 퍼즐 조각 등장 */
function DisputeEmergenceScene({ data }: { data?: CutsceneEvent['data'] }) {
  return (
    <div className="absolute inset-0 bg-gray-950/80 flex flex-col items-center justify-center">
      {/* 퍼즐 조각 아이콘 */}
      <div className="cutscene-puzzle-in mb-4">
        <svg width="56" height="56" viewBox="0 0 56 56" className="text-amber-400">
          <rect x="4" y="4" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
          <rect x="32" y="4" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8" />
          <rect x="4" y="32" width="20" height="20" rx="3" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.8" />
          <rect x="32" y="32" width="20" height="20" rx="3" fill="currentColor" opacity="0.3" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <p className="text-xl font-black text-amber-400 tracking-wide mb-2 animate-cutscene-fade-in">
        새로운 쟁점이 드러났습니다
      </p>
      {data?.disputeName && (
        <p className="text-sm text-amber-300/70 animate-cutscene-fade-in">
          {data.disputeName}
        </p>
      )}
    </div>
  )
}

const PHASE_LABELS: Record<string, string> = {
  phase0: '사건 소개',
  phase1: '초기 진술',
  phase2: '반박 진술',
  phase3: '심문 개시',
  phase4: '증거 심리',
  phase5: '재심문',
  phase6: '중재',
  phase7: '판결',
}

const PHASE_ICONS: Record<string, string> = {
  phase0: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  phase1: 'M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z',
  phase2: 'M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z',
  phase3: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z',
  phase4: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6z',
  phase5: 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5z',
  phase6: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z',
  phase7: 'M1 21h22L12 2 1 21z',
}

/** 5. Phase 전환 — 극적 페이드 + 아이콘 + 제목 */
function PhaseTransitionScene({ data }: { data?: CutsceneEvent['data'] }) {
  const phase = data?.phase ?? ''
  const label = PHASE_LABELS[phase] ?? phase
  const iconPath = PHASE_ICONS[phase] ?? PHASE_ICONS['phase0']

  return (
    <div className="absolute inset-0 bg-gray-950 cutscene-cinematic-fade flex flex-col items-center justify-center">
      <div className="cutscene-cinematic-scale">
        <svg width="48" height="48" viewBox="0 0 24 24" className="text-amber-400 mx-auto mb-4">
          <path d={iconPath} fill="currentColor" opacity="0.7" />
        </svg>
        <p className="text-3xl font-black text-amber-400 tracking-widest text-center">
          {label}
        </p>
      </div>
    </div>
  )
}

/** 6. 최종 판결 — 망치 내려치기 + 점수 */
function VerdictGavelScene({ data }: { data?: CutsceneEvent['data'] }) {
  return (
    <div className="absolute inset-0 bg-gray-950/90 flex flex-col items-center justify-center">
      {/* 망치 SVG */}
      <div className="cutscene-gavel-swing mb-6">
        <svg width="80" height="80" viewBox="0 0 80 80" className="text-amber-400">
          {/* 망치 머리 */}
          <rect x="20" y="10" width="40" height="18" rx="4" fill="currentColor" opacity="0.9" />
          {/* 손잡이 */}
          <rect x="37" y="28" width="6" height="36" rx="2" fill="currentColor" opacity="0.7" />
          {/* 받침대 */}
          <ellipse cx="40" cy="68" rx="18" ry="4" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      <div className="animate-cutscene-fade-in text-center">
        <p className="text-2xl font-black text-amber-400 tracking-widest mb-3">
          판결
        </p>
        {data?.score != null && (
          <p className="text-4xl font-black text-white">
            {data.score}<span className="text-lg text-gray-400 ml-1">점</span>
          </p>
        )}
      </div>
    </div>
  )
}
