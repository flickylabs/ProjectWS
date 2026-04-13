/**
 * 캐릭터 얼굴 SVG — 저울/결과 화면용
 * party='a' → 파란색, party='b' → 빨간색
 */

interface Props {
  party: 'a' | 'b'
  size?: number
  name?: string
}

export default function CharacterFaceSvg({ party, size = 48, name }: Props) {
  const isA = party === 'a'
  const fill = isA ? 'rgba(91,141,239,0.15)' : 'rgba(224,96,96,0.15)'
  const stroke = isA ? '#5b8def' : '#e06060'
  const eyeColor = isA ? '#5b8def' : '#e06060'

  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* 얼굴 원형 */}
      <circle cx="24" cy="22" r="18" fill={fill} stroke={stroke} strokeWidth="2" />
      {/* 눈 */}
      <circle cx="17" cy="19" r="2.5" fill={eyeColor} />
      <circle cx="31" cy="19" r="2.5" fill={eyeColor} />
      {/* 눈 하이라이트 */}
      <circle cx="18" cy="18" r="0.8" fill="white" />
      <circle cx="32" cy="18" r="0.8" fill="white" />
      {/* 입 */}
      <path d="M18 27 Q24 31 30 27" stroke={eyeColor} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* 이름 (선택) */}
      {name && (
        <text x="24" y="46" textAnchor="middle" fontSize="9" fontWeight="700" fill={stroke}>{name}</text>
      )}
    </svg>
  )
}
