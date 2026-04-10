import type { CSSProperties, SVGProps } from 'react'

type Props = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  id: string
  size?: number | string
  title?: string
  viewBox?: string
  style?: CSSProperties
}

export default function PCSvgIcon({
  id,
  size = 24,
  title,
  viewBox = '0 0 24 24',
  className,
  style,
  ...rest
}: Props) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={className}
      focusable="false"
      height={size}
      role={title ? 'img' : undefined}
      style={style}
      viewBox={viewBox}
      width={size}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <use href={`#${id}`} />
    </svg>
  )
}
