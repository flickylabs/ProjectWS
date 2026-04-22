import { useState } from 'react'
import PCSvgIcon from './PCSvgIcon'

type Props = {
  sessionId: string
  size: number
  fallbackSymbolId: string
  className?: string
  alt?: string
}

export default function PCSessionIcon({ sessionId, size, fallbackSymbolId, className, alt }: Props) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return <PCSvgIcon className={className} id={fallbackSymbolId} size={size} />
  }

  return (
    <img
      alt={alt ?? ''}
      aria-hidden={alt ? undefined : true}
      className={className}
      height={size}
      onError={() => setErrored(true)}
      src={`/icons/session/${sessionId}.png`}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4)) drop-shadow(0 0 8px rgba(212, 162, 78, 0.15))',
      }}
      width={size}
    />
  )
}
