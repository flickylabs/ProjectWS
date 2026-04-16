import { useState } from 'react'
import type { EmotionalPhase, LieState, PartyId } from '../../../types'
import PCSvgIcon from './PCSvgIcon'
import { getPcPortraitUrl } from './pcPortraitUtils'

type Props = {
  caseId: string | undefined | null
  party: PartyId
  emotion: EmotionalPhase | undefined
  lieState?: LieState | null
  /** PNG/SVG 모두 적용되는 표시 크기(px). */
  size: number
  /** PNG 로드 실패 시 대체할 SVG 심볼 id (기존 getPcFaceSymbolId 결과). */
  fallbackSymbolId: string
  /** 추가 className (원형 프레임 등). */
  className?: string
  alt?: string
}

export default function PCCharacterPortrait({
  caseId,
  party,
  emotion,
  lieState,
  size,
  fallbackSymbolId,
  className,
  alt,
}: Props) {
  const url = getPcPortraitUrl(caseId, party, emotion, lieState)
  const [errored, setErrored] = useState(false)

  if (!url || errored) {
    return <PCSvgIcon className={className} id={fallbackSymbolId} size={size} />
  }

  return (
    <img
      alt={alt ?? ''}
      aria-hidden={alt ? undefined : true}
      className={className ? `pc-portrait ${className}` : 'pc-portrait'}
      height={size}
      loading="lazy"
      onError={() => setErrored(true)}
      src={url}
      style={{ width: size, height: size, objectFit: 'cover', borderRadius: '50%' }}
      width={size}
    />
  )
}
