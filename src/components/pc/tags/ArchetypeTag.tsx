import { Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useStore } from '../../../store/useGameStore'
import { ARCHETYPE_META } from '../../../engine/archetypeHintEngine'
import { pulseHotbarSlot } from './hotbarHighlight'
import { useI18n, type MessageKey } from '../../../i18n'

interface ArchetypeTagProps {
  party: 'a' | 'b'
  archetype: string
}

/** 공략 힌트 내에서 하이라이트할 액션 키워드 → 핫바 data-guide-target 매핑 */
const ACTION_KEYWORDS: { key: MessageKey; target: string }[] = [
  { key: 'pc.archetype.action.fact', target: 'question-fact' },
  { key: 'pc.archetype.action.motive', target: 'question-motive' },
  { key: 'pc.archetype.action.empathy', target: 'question-empathy' },
]

const ARCHETYPE_MESSAGE_KEYS: Record<string, { labelKey: MessageKey; hintKey: MessageKey }> = {
  avoidant: {
    labelKey: 'pc.archetype.avoidant.label',
    hintKey: 'pc.archetype.avoidant.hint',
  },
  confrontational: {
    labelKey: 'pc.archetype.confrontational.label',
    hintKey: 'pc.archetype.confrontational.hint',
  },
  victim_cosplay: {
    labelKey: 'pc.archetype.victimCosplay.label',
    hintKey: 'pc.archetype.victimCosplay.hint',
  },
  cold_logic: {
    labelKey: 'pc.archetype.coldLogic.label',
    hintKey: 'pc.archetype.coldLogic.hint',
  },
  affect_flattening: {
    labelKey: 'pc.archetype.affectFlattening.label',
    hintKey: 'pc.archetype.affectFlattening.hint',
  },
  premature_summary: {
    labelKey: 'pc.archetype.prematureSummary.label',
    hintKey: 'pc.archetype.prematureSummary.hint',
  },
}

/** 문자열을 키워드 기준으로 분리하여 [텍스트, 액션버튼, 텍스트, ...] React 노드 배열 생성 */
function renderStrategyHint(hint: string, t: (key: MessageKey) => string): ReactNode[] {
  type Segment = { kind: 'text'; value: string } | { kind: 'action'; text: string; target: string }
  let segments: Segment[] = [{ kind: 'text', value: hint }]

  for (const kw of ACTION_KEYWORDS) {
    const keyword = t(kw.key)
    const next: Segment[] = []
    for (const seg of segments) {
      if (seg.kind !== 'text') {
        next.push(seg)
        continue
      }
      const chunks = seg.value.split(keyword)
      chunks.forEach((chunk, idx) => {
        if (chunk) next.push({ kind: 'text', value: chunk })
        if (idx < chunks.length - 1) next.push({ kind: 'action', text: keyword, target: kw.target })
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
  const { t } = useI18n()
  const glowingTagKey = useStore((s) => s.glowingTagKey)
  const dismissGlow = useStore((s) => s.dismissGlow)
  const tagRef = useRef<HTMLSpanElement | null>(null)
  const [tipOpen, setTipOpen] = useState(false)
  const [tipPosition, setTipPosition] = useState<{ top: number; left: number } | null>(null)

  const meta = ARCHETYPE_META[archetype]
  const isGlowing = glowingTagKey === `${party}:${archetype}`

  const getTipPosition = useCallback(() => {
    if (typeof window === 'undefined') return null
    const rect = tagRef.current?.getBoundingClientRect()
    if (!rect) return null

    const margin = 12
    const width = 280
    const left = Math.min(
      window.innerWidth - width - margin,
      Math.max(margin, rect.right - width),
    )

    return {
      top: rect.bottom + 8,
      left,
    }
  }, [])

  const handleClick = useCallback(() => {
    setTipOpen((v) => {
      const next = !v
      if (next) setTipPosition(getTipPosition())
      return next
    })
    if (isGlowing) dismissGlow()
  }, [getTipPosition, isGlowing, dismissGlow])

  useEffect(() => {
    if (!tipOpen) return

    const syncPosition = () => setTipPosition(getTipPosition())
    syncPosition()

    window.addEventListener('resize', syncPosition)
    window.addEventListener('scroll', syncPosition, true)
    return () => {
      window.removeEventListener('resize', syncPosition)
      window.removeEventListener('scroll', syncPosition, true)
    }
  }, [getTipPosition, tipOpen])

  if (!meta) return null
  const localizedKeys = ARCHETYPE_MESSAGE_KEYS[archetype]
  const tagLabel = localizedKeys ? t(localizedKeys.labelKey) : meta.tagLabel
  const strategyHint = localizedKeys ? t(localizedKeys.hintKey) : meta.strategyHint

  const portalRoot = typeof document !== 'undefined' ? document.body : null
  const tooltip = tipOpen && tipPosition ? (
    <span
      className="tag-arch__tip tag-arch__tip--portal"
      role="tooltip"
      style={{ top: `${tipPosition.top}px`, left: `${tipPosition.left}px` }}
    >
      <button
        type="button"
        className="tag-arch__tip-close"
        onClick={(e) => { e.stopPropagation(); setTipOpen(false) }}
        aria-label={t('pc.archetype.close')}
      >
        ✕
      </button>
      <span className="tag-arch__tip-label">{t('pc.archetype.tipLabel')}</span>
      <span className="tag-arch__tip-body">{renderStrategyHint(strategyHint, t)}</span>
    </span>
  ) : null

  return (
    <span
      ref={tagRef}
      className={`tag tag-arch tag-arch--observed${isGlowing ? ' is-glowing' : ''}${tipOpen ? ' is-active' : ''}`}
      data-archetype-tag={`${party}:${archetype}`}
      data-resonance-target={`archetype-${party}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title={strategyHint}
    >
      <span className="tag-arch__label">{tagLabel}</span>
      {portalRoot && tooltip ? createPortal(tooltip, portalRoot) : null}
    </span>
  )
}
