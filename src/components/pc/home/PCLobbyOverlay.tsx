import type { ReactNode } from 'react'
import PCSvgIcon from '../icons/PCSvgIcon'

interface Props {
  title: string
  subtitle?: string
  iconId?: string
  onClose: () => void
  children?: ReactNode
}

export default function PCLobbyOverlay({
  title,
  subtitle,
  iconId = 'i-doc',
  onClose,
  children,
}: Props) {
  return (
    <div className="pc-lobby-modal__scrim" onClick={onClose}>
      <section className="pc-lobby-modal" onClick={(event) => event.stopPropagation()}>
        <div className="pc-lobby-modal__header">
          <div className="pc-lobby-modal__title-wrap">
            <div className="pc-lobby-modal__icon">
              <PCSvgIcon id={iconId} size={20} />
            </div>
            <div>
              <h2>{title}</h2>
              {subtitle ? <p>{subtitle}</p> : null}
            </div>
          </div>
          <button className="pc-lobby-modal__close" onClick={onClose} type="button">
            닫기
          </button>
        </div>

        <div className="pc-lobby-modal__body">
          {children}
        </div>
      </section>
    </div>
  )
}
