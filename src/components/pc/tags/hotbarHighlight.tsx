import { Fragment, type MouseEvent, type ReactNode } from 'react'

/**
 * 핫바 슬롯 깜빡 + 정보 텍스트 강조 헬퍼.
 *
 * - pulseHotbarSlot(target): 단일 슬롯 짧게 깜빡
 * - pulseHotbarSlots(targets[]): 여러 슬롯 동시 깜빡
 * - <Em>: 단순 노란색 강조
 * - <ActionEm targets={[...]}>: 노란색 강조 + 클릭 시 핫바 슬롯 깜빡
 *
 * data-guide-target 매핑 (PCBottomDock):
 *   question-fact / question-motive / question-empathy
 *   evidence-present / witness-summon
 */

const PULSE_CLASS = 'pc-hotbar-slot-pulse'
const PULSE_DURATION_MS = 2400

export function pulseHotbarSlot(target: string): void {
  if (typeof document === 'undefined') return
  const el = document.querySelector<HTMLElement>(`[data-guide-target="${target}"]`)
  if (!el) return
  el.classList.remove(PULSE_CLASS)
  // reflow로 애니메이션 재시작
  void el.offsetWidth
  el.classList.add(PULSE_CLASS)
  window.setTimeout(() => {
    el.classList.remove(PULSE_CLASS)
  }, PULSE_DURATION_MS)
}

export function pulseHotbarSlots(targets: readonly string[]): void {
  for (const t of targets) pulseHotbarSlot(t)
}

const EM_COLOR = '#fbbf24' // amber-400

export function Em({ children }: { children: ReactNode }) {
  return <strong style={{ color: EM_COLOR }}>{children}</strong>
}

interface ActionEmProps {
  /** data-guide-target 값들 — 여러 개면 모두 깜빡 (예: 모든 액션) */
  targets: readonly string[]
  children: ReactNode
}

export function ActionEm({ targets, children }: ActionEmProps) {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation()
    pulseHotbarSlots(targets)
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        margin: 0,
        cursor: 'pointer',
        color: EM_COLOR,
        fontWeight: 700,
        font: 'inherit',
      }}
    >
      {children}
    </button>
  )
}

/** 강조 키워드 → data-guide-target 사전 정의 매핑 */
export const ACTION_TARGETS = {
  fact: ['question-fact'],
  motive: ['question-motive'],
  empathy: ['question-empathy'],
  evidence: ['evidence-present'],
  witness: ['witness-summon'],
  /** 사실 추궁·동기 탐색·공감 접근 3종 동시 강조 */
  allInterrogation: ['question-fact', 'question-motive', 'question-empathy'],
} as const

/** ArchetypeTag 호환용 — 키워드 기반 자동 분리 (string → React 노드 배열) */
const KEYWORD_PATTERNS: { keyword: string; targets: readonly string[] }[] = [
  { keyword: '사실 추궁', targets: ACTION_TARGETS.fact },
  { keyword: '동기 탐색', targets: ACTION_TARGETS.motive },
  { keyword: '공감 접근', targets: ACTION_TARGETS.empathy },
]

export function renderStrategyHint(hint: string): ReactNode[] {
  type Segment = { kind: 'text'; value: string } | { kind: 'action'; text: string; targets: readonly string[] }
  let segments: Segment[] = [{ kind: 'text', value: hint }]

  for (const kw of KEYWORD_PATTERNS) {
    const next: Segment[] = []
    for (const seg of segments) {
      if (seg.kind !== 'text') {
        next.push(seg)
        continue
      }
      const chunks = seg.value.split(kw.keyword)
      chunks.forEach((chunk, idx) => {
        if (chunk) next.push({ kind: 'text', value: chunk })
        if (idx < chunks.length - 1) next.push({ kind: 'action', text: kw.keyword, targets: kw.targets })
      })
    }
    segments = next
  }

  return segments.map((seg, i) => {
    if (seg.kind === 'text') {
      return <Fragment key={i}>{seg.value}</Fragment>
    }
    return (
      <ActionEm key={i} targets={seg.targets}>
        {seg.text}
      </ActionEm>
    )
  })
}
