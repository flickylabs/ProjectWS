/**
 * V4 연출용 인라인 SVG 에셋.
 * 외부 파일 의존 없이 React 컴포넌트로 렌더링.
 */

/** #4 모순 발견 — 번개 볼트 */
export function BoltIcon({ size = 28, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** #2 쟁점 카드 — 돋보기 아이콘 */
export function SearchIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

/** #12 DossierCard — 열쇠 아이콘 */
export function KeyIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  )
}

/** #3 조합 — 합치기 아이콘 */
export function MergeIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 6l4 4 4-4" />
      <path d="M12 2v8" />
      <path d="M6 18h12" />
      <path d="M12 14v8" />
    </svg>
  )
}

/** #13 쟁점 연쇄 — 연결선 SVG (두 점 사이) */
export function ConnectionLine({
  width = 200,
  height = 40,
  className = '',
  animated = true,
}: {
  width?: number
  height?: number
  className?: string
  animated?: boolean
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <path
        d={`M 10 ${height / 2} C ${width * 0.3} ${height * 0.1}, ${width * 0.7} ${height * 0.9}, ${width - 10} ${height / 2}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray={animated ? width : 'none'}
        strokeDashoffset={animated ? width : 0}
        style={animated ? {
          animation: `v4-line-draw 1s ease forwards`,
        } : undefined}
      />
      {/* 끝점 원 */}
      <circle cx="10" cy={height / 2} r="4" fill="currentColor" />
      <circle cx={width - 10} cy={height / 2} r="4" fill="currentColor" opacity={animated ? 0 : 1}
        style={animated ? { animation: 'v4-combine-pop 0.3s 0.8s ease both' } : undefined}
      />
    </svg>
  )
}

/** #1 NEW FACT — 별 스파클 */
export function SparkleIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z" />
    </svg>
  )
}
