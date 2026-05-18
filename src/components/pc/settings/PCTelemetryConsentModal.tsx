import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  hasTelemetryConsentDecision,
  isTelemetryOptedOut,
  setOptOut,
  setTelemetryConsentDecision,
} from '../../../telemetry/funnelClient'
import { useI18n } from '../../../i18n'

export default function PCTelemetryConsentModal() {
  const { t } = useI18n()
  const [ready, setReady] = useState(false)
  const [open, setOpen] = useState(false)
  const [allowed, setAllowed] = useState(true)

  useEffect(() => {
    setAllowed(!isTelemetryOptedOut())
    setOpen(!hasTelemetryConsentDecision())
    setReady(true)
  }, [])

  const accept = useCallback(() => {
    setOptOut(!allowed)
    setTelemetryConsentDecision()
    setOpen(false)
  }, [allowed])

  if (!ready || !open || typeof document === 'undefined') return null

  return createPortal(
    <div className="pc-telemetry-consent" role="dialog" aria-modal="true" aria-labelledby="pc-telemetry-consent-title">
      <div className="pc-telemetry-consent__panel">
        <div className="pc-telemetry-consent__eyebrow">{t('settings.consent.telemetry.eyebrow')}</div>
        <h2 id="pc-telemetry-consent-title">{t('settings.consent.telemetry.title')}</h2>
        <p>{t('settings.consent.telemetry.body1')}</p>
        <p>{t('settings.consent.telemetry.body2')}</p>

        <button
          type="button"
          role="switch"
          aria-checked={allowed}
          className={`pc-telemetry-consent__switch${allowed ? ' is-on' : ''}`}
          onClick={() => setAllowed((value) => !value)}
        >
          <span>
            <strong>{t('settings.consent.telemetry.toggle')}</strong>
            <small>{t('settings.consent.telemetry.toggleDesc')}</small>
          </span>
          <i aria-hidden="true" />
        </button>

        <button type="button" className="pc-telemetry-consent__start" onClick={accept}>
          {t('settings.consent.telemetry.cta')}
        </button>
      </div>
    </div>,
    document.body,
  )
}
