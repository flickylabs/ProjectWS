import { Fragment, useCallback, useState, type ReactNode } from 'react'
import { useStore } from '../../../store/useGameStore'
import { ARCHETYPE_META } from '../../../engine/archetypeHintEngine'
import { pulseHotbarSlot } from './hotbarHighlight'

interface ArchetypeTagProps {
  party: 'a' | 'b'
  archetype: string
}

/** 공략 힌트 내에서 하이라이트할 액션 키워드 → 핫바 data-guide-target 매핑 */
const ACTION_KEYWORDS: { text: string; target: string }[] = [
  { text: '사실 추궁', target: 'question-fact' },
  { text: '동기 탐색', target: 'question-motive' },
  { text: '공감 접근', target: 'question-empathy' },
]

/** 문자열을 키워드 기준으로 분리하여 [텍스트, 액션버튼, 텍스트, ...] React 노드 배열 생성 */
function renderStrategyHint(hint: string): ReactNode[] {
  type Segment = { kind: 'text'; value: string } | { kind: 'action'; text: string; target: string }
  let segments: Segment[] = [{ kind: 'text', value: hint }]

  for (const kw of ACTION_KEYWORDS) {
    const next: Segment[] = []
    for (const seg of segments) {
      if (seg.kind !== 'text') {
        next.push(seg)
        continue
      }
      const chunks = seg.value.split(kw.text)
      chunks.forEach((chunk, idx) => {
        if (chunk) next.push({ kind: 'text', value: chunk })
        if (idx < chunks.length - 1) next.push({ kind: 'action', text: kw.text, target: kw.target })
      })
    }
    segments = next
  }

  return segments.map((seg, i) => {
    if (seg.kind === 'text') {
      return <Fragment key={i}>{seg.value}</Fragment>
    }
    return (
      <button
        key={i}
        type="button"
        className="tag-arch__tip-action"
        onClick={(e) => {
          e.stopPropagation()
          pulseHotbarSlot(seg.target)
        }}
      >
        {seg.text}
      </button>
    )
  })
}

/**
 * 캐릭터 카드의 동적 archetype 태그.
 * - 최초 관찰 시 등장 (CSS slide-in + glow)
 * - 클릭 → 공략법 툴팁 토글
 * - 툴팁 내 액션 키워드(사실 추궁 / 동기 탐색 / 공감 접근) 클릭 → 핫바 해당 슬롯 깜빡
 * - data-archetype-tag="party:archetype" — Popup 수렴 타겟 식별용
 */
export default function ArchetypeTag({ party, archetype }: ArchetypeTagProps) {
  const glowingTagKey = useStore((s) => s.glowingTagKey)
  const dismissGlow = useStore((s) => s.dismissGlow)
  const [tipOpen, setTipOpen] = useState(false)

  const meta = ARCHETYPE_META[archetype]
  const isGlowing = glowingTagKey === `${party}:${archetype}`

  const handleClick = useCallback(() => {
    setTipOpen((v) => !v)
    if (isGlowing) dismissGlow()
  }, [isGlowing, dismissGlow])

  if (!meta) return null

  return (
    <span
      className={`tag tag-arch tag-arch--observed${isGlowing ? ' is-glowing' : ''}${tipOpen ? ' is-active' : ''}`}
      data-archetype-tag={`${party}:${archetype}`}
      data-resonance-target={`archetype-${party}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title={meta.strategyHint}
    >
      <span className="tag-arch__label">{meta.tagLabel}</span>
      {tipOpen ? (
        <span className="tag-arch__tip" role="tooltip">
          <button
            type="button"
            className="tag-arch__tip-close"
            onClick={(e) => { e.stopPropagation(); setTipOpen(false) }}
            aria-label="닫기"
          >
            ✕
          </button>
          <span className="tag-arch__tip-label">공략 힌트</span>
          <span className="tag-arch__tip-body">{renderStrategyHint(meta.strategyHint)}</span>
        </span>
      ) : null}
    </span>
  )
}
