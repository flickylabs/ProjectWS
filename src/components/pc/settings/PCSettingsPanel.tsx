import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PCSvgIcon from '../icons/PCSvgIcon'
import { useI18n } from '../../../i18n'
import PCSettingsView from './PCSettingsView'

interface Props {
  open: boolean
  onClose: () => void
}

const PC_OPEN_SETTINGS_EVENT = 'pc:open-settings'

export function openPcSettings(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(PC_OPEN_SETTINGS_EVENT))
}

export default function PCSettingsPanel({ open, onClose }: Props) {
  const { t } = useI18n()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="pc-settings-fullscreen pc-settings-fullscreen--single" role="dialog" aria-label={t('settings.title')}>
      <header className="pc-settings-fullscreen__header">
        <div className="pc-settings-fullscreen__title">
          <PCSvgIcon id="i-gear" size={22} />
          <span>{t('settings.title')}</span>
        </div>
        <button
          type="button"
          className="pc-settings-fullscreen__close"
          onClick={onClose}
          aria-label={t('settings.closeWithShortcut')}
          title={t('settings.closeWithShortcut')}
        >
          <span>✕</span>
          <kbd className="pc-event-feedback__kbd">Esc</kbd>
        </button>
      </header>

      <div className="pc-settings-fullscreen__body">
        <PCSettingsView />
      </div>
    </div>,
    document.body,
  )
}

export { PC_OPEN_SETTINGS_EVENT }
