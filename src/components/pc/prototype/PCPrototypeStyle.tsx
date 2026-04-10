import { PROTOTYPE_CSS } from './prototypeSource'

export default function PCPrototypeStyle() {
  return <style dangerouslySetInnerHTML={{ __html: PROTOTYPE_CSS }} />
}
