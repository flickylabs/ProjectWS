import { useEffect, useState, type ReactNode } from 'react'
import { isBgmEnabled, isSoundEnabled, setBgmEnabled, setSoundEnabled } from '../../../engine/soundEngine'
import { getSettings, updateSettings } from '../../../hooks/useLocalStorage'
import { useScreenPreset } from '../../../hooks/useScreenPreset'
import { SCREEN_PRESETS, type ScreenPresetId } from '../../../utils/screenPresets'
import { translate, useI18n, type LocaleCode } from '../../../i18n'
import PCSvgIcon from '../icons/PCSvgIcon'

const DISCORD_INVITE_URL = 'https://discord.gg/7mUjFGdcN'

type SettingsState = ReturnType<typeof getSettings>
type PendingScreenPreset = { previous: ScreenPresetId; next: ScreenPresetId }

export default function PCSettingsView() {
  const { t, locale, locales, setLocale } = useI18n()
  const { preset: screenPreset, setPreset: setScreenPreset } = useScreenPreset()
  const [settings, setSettings] = useState<SettingsState>(() => getSettings())
  const [bgmOn, setBgmOn] = useState(() => isBgmEnabled())
  const [sfxOn, setSfxOn] = useState(() => isSoundEnabled())
  const [pendingScreenPreset, setPendingScreenPreset] = useState<PendingScreenPreset | null>(null)
  const [screenConfirmCountdown, setScreenConfirmCountdown] = useState(5)

  useEffect(() => {
    if (!pendingScreenPreset) return
    setScreenConfirmCountdown(5)
    const countdownTimer = window.setInterval(() => {
      setScreenConfirmCountdown((current) => Math.max(0, current - 1))
    }, 1000)
    const revertTimer = window.setTimeout(() => {
      setScreenPreset(pendingScreenPreset.previous)
      setPendingScreenPreset(null)
    }, 5000)
    return () => {
      window.clearInterval(countdownTimer)
      window.clearTimeout(revertTimer)
    }
  }, [pendingScreenPreset, setScreenPreset])

  const toggleBgm = () => {
    const next = !bgmOn
    setBgmOn(next)
    setBgmEnabled(next)
  }

  const toggleSfx = () => {
    const next = !sfxOn
    setSfxOn(next)
    setSoundEnabled(next)
  }

  const updateBehaviorHints = (value: boolean) => {
    updateSettings({ showBehaviorHints: value })
    setSettings((current) => ({ ...current, showBehaviorHints: value }))
  }

  const updateAutoAdvance = (value: boolean) => {
    updateSettings({ autoAdvanceDialogue: value })
    setSettings((current) => ({ ...current, autoAdvanceDialogue: value }))
  }

  const updateTypingSpeed = (value: SettingsState['typingSpeed']) => {
    updateSettings({ typingSpeed: value })
    setSettings((current) => ({ ...current, typingSpeed: value }))
  }

  const requestScreenPreset = (nextPreset: ScreenPresetId) => {
    if (nextPreset === screenPreset) return
    const previousPreset = pendingScreenPreset?.previous ?? screenPreset
    setScreenPreset(nextPreset)
    setPendingScreenPreset({ previous: previousPreset, next: nextPreset })
    setScreenConfirmCountdown(5)
  }

  const keepScreenPreset = () => {
    setPendingScreenPreset(null)
    setScreenConfirmCountdown(5)
  }

  const revertScreenPreset = () => {
    if (pendingScreenPreset) setScreenPreset(pendingScreenPreset.previous)
    setPendingScreenPreset(null)
    setScreenConfirmCountdown(5)
  }

  return (
    <>
      <div className="pc-settings-row-list">
        <Row
          iconId="i-eye"
          title={t('settings.display.title')}
          description={t('settings.display.resolutionDescription')}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <select
            className="pc-settings-select"
            value={screenPreset}
            onChange={(event) => requestScreenPreset(event.target.value as ScreenPresetId)}
          >
            <option value="auto">{t('settings.display.autoDetect')}</option>
            {SCREEN_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>{p.label}{p.note ? ` (${p.note})` : ''}</option>
            ))}
          </select>
        </Row>

        <Row
          iconId="i-chat"
          title={t('settings.language.title')}
          description={t('settings.language.displayLanguageDescription')}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <select
            className="pc-settings-select"
            value={locale}
            aria-label={t('language.selectorTitle')}
            onChange={(event) => setLocale(event.target.value as LocaleCode)}
          >
            {locales.map((item) => (
              <option key={item.code} value={item.code}>{item.nativeName}</option>
            ))}
          </select>
        </Row>

        <Row
          iconId="i-bolt"
          title={t('settings.audio.title')}
          description={`${t('settings.audio.bgmShort')} · ${t('settings.audio.sfxShort')}`}
        >
          <ToggleControl
            label={t('settings.audio.bgmShort')}
            checked={bgmOn}
            onToggle={toggleBgm}
          />
          <ToggleControl
            label={t('settings.audio.sfxShort')}
            checked={sfxOn}
            onToggle={toggleSfx}
          />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </Row>

        <Row
          iconId="i-gavel"
          title={t('settings.gameplay.homeTitle')}
          description={t('settings.gameplay.textSpeedHomeDesc')}
        >
          <ToggleControl
            label={t('settings.gameplay.behaviorHintsShort')}
            checked={settings.showBehaviorHints}
            onToggle={() => updateBehaviorHints(!settings.showBehaviorHints)}
          />
          <ToggleControl
            label={t('settings.gameplay.autoAdvance')}
            checked={settings.autoAdvanceDialogue}
            onToggle={() => updateAutoAdvance(!settings.autoAdvanceDialogue)}
          />
          <span aria-hidden="true" />
          <select
            className="pc-settings-select"
            value={settings.typingSpeed}
            onChange={(event) => updateTypingSpeed(event.target.value as SettingsState['typingSpeed'])}
          >
            <option value="fast">{t('settings.gameplay.speed.fastAdverb')}</option>
            <option value="normal">{t('settings.gameplay.speed.normal')}</option>
            <option value="slow">{t('settings.gameplay.speed.slowAdverb')}</option>
          </select>
        </Row>

        <Row
          iconId="i-heart"
          title={t('settings.support.title')}
          description={t('settings.support.discordDesc')}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <a
            href={DISCORD_INVITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pc-inline-button"
          >
            {t('settings.support.discordButton')}
          </a>
        </Row>
      </div>

      <footer className="pc-settings-footer">
        <span className="pc-settings-footer__build">{t('settings.about.versionBuildValue')}</span>
      </footer>

      {pendingScreenPreset ? (
        <ScreenPresetConfirmModal
          countdown={screenConfirmCountdown}
          onCancel={revertScreenPreset}
          onConfirm={keepScreenPreset}
        />
      ) : null}
    </>
  )
}

function Row({ iconId, title, description, children }: { iconId: string; title: string; description: string; children: ReactNode }) {
  return (
    <div className="pc-settings-row">
      <span className="pc-settings-row__icon" aria-hidden="true">
        <PCSvgIcon id={iconId} size={22} />
      </span>
      <div className="pc-settings-row__main">
        <strong className="pc-settings-row__title">{title}</strong>
        <p className="pc-settings-row__desc">{description}</p>
      </div>
      <div className="pc-settings-row__control">{children}</div>
    </div>
  )
}

function ToggleControl({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <label className="pc-settings-toggle-control">
      <span className="pc-settings-toggle-control__label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`pc-settings-switch${checked ? ' is-on' : ''}`}
        onClick={onToggle}
      >
        <span className="pc-settings-switch__knob" aria-hidden="true" />
      </button>
    </label>
  )
}

function ScreenPresetConfirmModal({ countdown, onCancel, onConfirm }: { countdown: number; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="pc-resolution-confirm-backdrop" role="presentation">
      <section className="pc-resolution-confirm" role="dialog" aria-modal="true" aria-labelledby="pc-resolution-confirm-title">
        <h3 id="pc-resolution-confirm-title">{translate('pc.resolutionConfirm.title')}</h3>
        <div className="pc-resolution-confirm__count">
          <span>{translate('pc.resolutionConfirm.rollback', { seconds: countdown })}</span>
        </div>
        <div className="pc-resolution-confirm__actions">
          <button className="pc-inline-button" onClick={onConfirm} type="button">{translate('pc.home.yes')}</button>
          <button className="pc-inline-button is-ghost" onClick={onCancel} type="button">{translate('pc.home.no')}</button>
        </div>
      </section>
    </div>
  )
}
