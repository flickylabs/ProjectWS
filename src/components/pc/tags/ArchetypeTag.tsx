import { useCallback, useState } from 'react'
import { useStore } from '../../../store/useGameStore'
import { ARCHETYPE_META } from '../../../engine/archetypeHintEngine'

interface ArchetypeTagProps {
  party: 'a' | 'b'
  archetype: string
}

/**
 * 캐릭터 카드의 동적 archetype 태그.
 * - 최초 관찰 시 등장 (CSS slide-in + glow)
 * - 클릭 → 공략법 툴팁 토글
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
      onClick={handleClick}
      role="button"
      tabIndex={0}
      title={meta.strategyHint}
    >
      <span className="tag-arch__label">{meta.tagLabel}</span>
      {tipOpen ? (
        <span className="tag-arch__tip" role="tooltip">
          <span className="tag-arch__tip-label">공략 힌트</span>
          <span className="tag-arch__tip-body">{meta.strategyHint}</span>
        </span>
      ) : null}
    </span>
  )
}
