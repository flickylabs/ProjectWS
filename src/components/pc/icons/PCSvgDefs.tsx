import { PROTOTYPE_SVG_DEFS } from '../prototype/prototypeSource'

export default function PCSvgDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs dangerouslySetInnerHTML={{ __html: PROTOTYPE_SVG_DEFS }} />
    </svg>
  )
}
