import { useState, type CSSProperties } from 'react'

const TITLE_EMBLEM_NAME: Record<string, string> = {
  cold_judge: 'cold-judge',
  practical_analyst: 'practical',
  balanced_sage: 'balanced',
  careful_mediator: 'careful',
  instinct_judge: 'instinct',
  passion_arbiter: 'passion',
  gentle_guardian: 'gentle',
  warm_mediator: 'warm',
  neutral_observer: 'neutral',
}

type Props = {
  titleId: string
  size: number
  alt?: string
  className?: string
  style?: CSSProperties
}

export default function PCTitleEmblem({ titleId, size, alt, className, style }: Props) {
  const [errored, setErrored] = useState(false)
  const name = TITLE_EMBLEM_NAME[titleId] ?? 'neutral'

  if (errored) {
    return null
  }

  return (
    <img
      alt={alt ?? ''}
      aria-hidden={alt ? undefined : true}
      className={className}
      height={size}
      onError={() => setErrored(true)}
      src={`/icons/emblem/${name}.png`}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        filter: 'drop-shadow(0 3px 10px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 12px rgba(212, 162, 78, 0.22))',
        ...style,
      }}
      width={size}
    />
  )
}
