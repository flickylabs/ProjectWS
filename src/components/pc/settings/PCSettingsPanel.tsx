import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import PCSvgIcon from '../icons/PCSvgIcon'
import { useScreenPreset } from '../../../hooks/useScreenPreset'
import { SCREEN_PRESETS, nearestPreset, type ScreenPresetId } from '../../../utils/screenPresets'
import { getSettings, updateSettings } from '../../../hooks/useLocalStorage'
import { useI18n, type LocaleCode, type MessageKey } from '../../../i18n'
import { useGameStore } from '../../../store/useGameStore'
import { isTelemetryOptedOut, setOptOut } from '../../../telemetry/funnelClient'
import {
  isBgmEnabled,
  setBgmEnabled,
  isSoundEnabled,
  setSoundEnabled,
} from '../../../engine/soundEngine'

interface Props {
  open: boolean
  onClose: () => void
}

const PC_OPEN_SETTINGS_EVENT = 'pc:open-settings'

export function openPcSettings(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(PC_OPEN_SETTINGS_EVENT))
}

type SettingsCategoryId =
  | 'display'
  | 'audio'
  | 'gameplay'
  | 'data'
  | 'language'
  | 'accessibility'
  | 'controls'
  | 'account'
  | 'about'

const CATEGORIES: Array<{
  id: SettingsCategoryId
  labelKey: MessageKey
  iconId: string
  status: 'ready' | 'preview'  // ready=실제 옵션 / preview=구조만
}> = [
  { id: 'display',       labelKey: 'settings.category.display',       iconId: 'i-eye',     status: 'ready' },
  { id: 'audio',         labelKey: 'settings.category.audio',         iconId: 'i-bolt',    status: 'ready' },
  { id: 'gameplay',      labelKey: 'settings.category.gameplay',      iconId: 'i-gavel',   status: 'ready' },
  { id: 'data',          labelKey: 'settings.category.data',          iconId: 'i-doc',     status: 'ready' },
  { id: 'language',      labelKey: 'settings.category.language',      iconId: 'i-chat',    status: 'ready' },
  { id: 'accessibility', labelKey: 'settings.category.accessibility', iconId: 'i-heart',   status: 'preview' },
  { id: 'controls',      labelKey: 'settings.category.controls',      iconId: 'i-hand',    status: 'preview' },
  { id: 'account',       labelKey: 'settings.category.account',       iconId: 'i-person',  status: 'preview' },
  { id: 'about',         labelKey: 'settings.category.about',         iconId: 'i-bulb',    status: 'ready' },
]

export default function PCSettingsPanel({ open, onClose }: Props) {
  const { t } = useI18n()
  const [activeCategory, setActiveCategory] = useState<SettingsCategoryId>('display')

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
    <div className="pc-settings-fullscreen" role="dialog" aria-label={t('settings.title')}>
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
        <nav className="pc-settings-sidebar" aria-label={t('settings.title')}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`pc-settings-sidebar__item${activeCategory === cat.id ? ' is-active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              aria-current={activeCategory === cat.id ? 'page' : undefined}
            >
              <span className="pc-settings-sidebar__icon">
                <PCSvgIcon id={cat.iconId} size={16} />
              </span>
              <span className="pc-settings-sidebar__label">{t(cat.labelKey)}</span>
              {cat.status === 'preview' ? (
                <span className="pc-settings-sidebar__badge">{t('settings.category.preview')}</span>
              ) : null}
            </button>
          ))}
        </nav>

        <main className="pc-settings-main">
          {activeCategory === 'display' && <DisplaySettings />}
          {activeCategory === 'audio' && <AudioSettings />}
          {activeCategory === 'gameplay' && <GameplaySettings />}
          {activeCategory === 'data' && <DataSettings />}
          {activeCategory === 'language' && <LanguageSettings />}
          {activeCategory === 'accessibility' && (
            <PreviewSection title={t('settings.category.accessibility')} desc={t('settings.preview.accessibility.description')} />
          )}
          {activeCategory === 'controls' && (
            <PreviewSection title={t('settings.category.controls')} desc={t('settings.preview.controls.description')} />
          )}
          {activeCategory === 'account' && (
            <PreviewSection title={t('settings.category.account')} desc={t('settings.preview.account.description')} />
          )}
          {activeCategory === 'about' && <AboutSection />}
        </main>
      </div>
    </div>,
    document.body,
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 카테고리: 화면
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DisplaySettings() {
  const { t } = useI18n()
  const { preset, bucket, setPreset } = useScreenPreset()
  const near = typeof window !== 'undefined' ? nearestPreset(window.innerWidth, window.innerHeight) : null

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">{t('settings.display.title')}</h2>
      <p className="pc-settings-content__desc">{t('settings.display.description')}</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.display.resolutionPreset')}</h3>
        <p className="pc-settings-group__desc">
          {t('settings.display.resolutionDescription')}
        </p>

        <div className="pc-settings-res-grid">
          <ResolutionOption
            id="auto"
            label={t('settings.display.autoDetect')}
            hint={near ? t('settings.display.currentPreset', { label: near.label }) : undefined}
            selected={preset === 'auto'}
            onSelect={setPreset}
          />
          {SCREEN_PRESETS.map((p) => (
            <ResolutionOption
              key={p.id}
              id={p.id}
              label={p.label}
              hint={p.note}
              selected={preset === p.id}
              onSelect={setPreset}
            />
          ))}
        </div>

        <div className="pc-settings-bucket-note">
          {t('settings.display.currentUiStage')}: <strong>{bucket}</strong>
          <span className="pc-settings-bucket-note__desc">
            {' '}
            ({t(`settings.display.bucket.${bucket}` as MessageKey)})
          </span>
        </div>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.display.displayOptions')}</h3>
        <div className="pc-settings-pending">
          <PendingRow label={t('settings.display.pending.fullscreen')} desc={t('settings.display.pending.fullscreenDesc')} />
          <PendingRow label={t('settings.display.pending.uiScale')} desc={t('settings.display.pending.uiScaleDesc')} />
          <PendingRow label={t('settings.display.pending.fpsLimit')} desc={t('settings.display.pending.fpsLimitDesc')} />
          <PendingRow label={t('settings.display.pending.reducedMotion')} desc={t('settings.display.pending.reducedMotionDesc')} />
          <PendingRow label={t('settings.display.pending.grain')} desc={t('settings.display.pending.grainDesc')} />
        </div>
      </section>
    </div>
  )
}

function ResolutionOption({
  id, label, hint, selected, onSelect,
}: {
  id: ScreenPresetId
  label: string
  hint?: string
  selected: boolean
  onSelect: (id: ScreenPresetId) => void
}) {
  return (
    <button
      type="button"
      className={`pc-settings-res-option${selected ? ' is-selected' : ''}`}
      onClick={() => onSelect(id)}
    >
      <span className="pc-settings-res-option__label">{label}</span>
      {hint ? <span className="pc-settings-res-option__hint">{hint}</span> : null}
    </button>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 카테고리: 오디오
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AudioSettings() {
  const { t } = useI18n()
  const [bgm, setBgm] = useState<boolean>(() => {
    try { return isBgmEnabled() } catch { return true }
  })
  const [sfx, setSfx] = useState<boolean>(() => {
    try { return isSoundEnabled() } catch { return true }
  })

  const onToggleBgm = useCallback((v: boolean) => {
    setBgm(v)
    try { setBgmEnabled(v) } catch { /* */ }
  }, [])
  const onToggleSfx = useCallback((v: boolean) => {
    setSfx(v)
    try { setSoundEnabled(v) } catch { /* */ }
  }, [])

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">{t('settings.audio.title')}</h2>
      <p className="pc-settings-content__desc">{t('settings.audio.description')}</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.audio.sound')}</h3>
        <ToggleRow
          label={t('settings.audio.bgm')}
          desc={t('settings.audio.bgmDesc')}
          checked={bgm}
          onChange={onToggleBgm}
        />
        <ToggleRow
          label={t('settings.audio.sfx')}
          desc={t('settings.audio.sfxDesc')}
          checked={sfx}
          onChange={onToggleSfx}
        />
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.audio.audioOptions')}</h3>
        <div className="pc-settings-pending">
          <PendingRow label={t('settings.audio.pending.masterVolume')} desc={t('settings.audio.pending.masterVolumeDesc')} />
          <PendingRow label={t('settings.audio.pending.bgmVolume')} desc={t('settings.audio.pending.bgmVolumeDesc')} />
          <PendingRow label={t('settings.audio.pending.sfxVolume')} desc={t('settings.audio.pending.sfxVolumeDesc')} />
          <PendingRow label={t('settings.audio.pending.voiceVolume')} desc={t('settings.audio.pending.voiceVolumeDesc')} />
        </div>
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 카테고리: 게임플레이
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GameplaySettings() {
  const { t } = useI18n()
  const [hints, setHints] = useState<boolean>(() => {
    try { return getSettings().showBehaviorHints } catch { return true }
  })
  const [autoAdvance, setAutoAdvance] = useState<boolean>(() => {
    try { return getSettings().autoAdvanceDialogue } catch { return true }
  })
  const [typing, setTyping] = useState<'fast' | 'normal' | 'slow'>(() => {
    try { return getSettings().typingSpeed } catch { return 'normal' }
  })
  const [tutorialFeedback, setTutorialFeedback] = useState('')

  const onToggleHints = useCallback((v: boolean) => {
    setHints(v)
    try { updateSettings({ showBehaviorHints: v }) } catch { /* */ }
  }, [])
  const onToggleAuto = useCallback((v: boolean) => {
    setAutoAdvance(v)
    try { updateSettings({ autoAdvanceDialogue: v }) } catch { /* */ }
  }, [])
  const onChangeTyping = useCallback((v: 'fast' | 'normal' | 'slow') => {
    setTyping(v)
    try { updateSettings({ typingSpeed: v }) } catch { /* */ }
  }, [])
  const onRestartTutorial = useCallback(() => {
    useGameStore.getState().restartTutorial()
    setTutorialFeedback(t('settings.gameplay.tutorialRestarted' as MessageKey))
  }, [t])

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">{t('settings.gameplay.title')}</h2>
      <p className="pc-settings-content__desc">{t('settings.gameplay.description')}</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.gameplay.progress')}</h3>
        <ToggleRow
          label={t('settings.gameplay.behaviorHints')}
          desc={t('settings.gameplay.behaviorHintsDesc')}
          checked={hints}
          onChange={onToggleHints}
        />
        <ToggleRow
          label={t('settings.gameplay.autoAdvance')}
          desc={t('settings.gameplay.autoAdvanceDesc')}
          checked={autoAdvance}
          onChange={onToggleAuto}
        />
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.gameplay.textSpeed')}</h3>
        <p className="pc-settings-group__desc">{t('settings.gameplay.textSpeedDesc')}</p>
        <div className="pc-settings-segmented">
          <SegmentButton selected={typing === 'fast'}   onClick={() => onChangeTyping('fast')}   label={t('settings.gameplay.speed.fast')} />
          <SegmentButton selected={typing === 'normal'} onClick={() => onChangeTyping('normal')} label={t('settings.gameplay.speed.normal')} />
          <SegmentButton selected={typing === 'slow'}   onClick={() => onChangeTyping('slow')}   label={t('settings.gameplay.speed.slow')} />
        </div>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.gameplay.gameplayOptions')}</h3>
        <div className="pc-settings-pending">
          <PendingRow label={t('settings.gameplay.pending.autosave')} desc={t('settings.gameplay.pending.autosaveDesc')} />
        </div>
        <div className="pc-settings-action-row">
          <div className="pc-settings-action-row__main">
            <span className="pc-settings-action-row__label">{t('settings.gameplay.pending.tutorial')}</span>
            <span className="pc-settings-action-row__desc">{t('settings.gameplay.pending.tutorialDesc')}</span>
          </div>
          <button type="button" className="pc-settings-action-btn" onClick={onRestartTutorial}>
            {t('settings.gameplay.tutorialRestart' as MessageKey)}
          </button>
        </div>
        <div className="pc-settings-pending">
          <PendingRow label={t('settings.gameplay.pending.difficulty')} desc={t('settings.gameplay.pending.difficultyDesc')} />
        </div>
        {tutorialFeedback ? (
          <div className="pc-settings-toast" role="status" aria-live="polite">
            {tutorialFeedback}
          </div>
        ) : null}
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 카테고리: 데이터
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const DATA_KEYS = [
  'solomon-save',
  'solomon-history',
  'solomon-judge-progression',
  'solomon-case-progress',
  'solomon-claimed-achievements',
  'solomon-login-streak',
  'solomon-max-evidence',
  'solomon-profile',
  'solomon-player-id',
] as const

function DataSettings() {
  const { t } = useI18n()
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState<string>('')
  const [telemetryAllowed, setTelemetryAllowed] = useState<boolean>(() => {
    try { return !isTelemetryOptedOut() } catch { return true }
  })

  const onExport = useCallback(() => {
    try {
      const dump: Record<string, string | null> = {}
      DATA_KEYS.forEach((k) => { dump[k] = localStorage.getItem(k) })
      const blob = new Blob([JSON.stringify({
        format: 'solomon-court-save',
        version: 1,
        exportedAt: new Date().toISOString(),
        data: dump,
      }, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `solomon-save-${new Date().toISOString().slice(0, 10)}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setFeedback(t('settings.data.exportSuccess'))
    } catch {
      setFeedback(t('settings.data.exportFailure'))
    }
  }, [t])

  const onReset = useCallback(() => {
    if (busy) return
    if (typeof window === 'undefined') return
    const ok = window.confirm(t('settings.data.resetConfirm'))
    if (!ok) return
    setBusy(true)
    try {
      DATA_KEYS.forEach((k) => { try { localStorage.removeItem(k) } catch { /* */ } })
      setFeedback(t('settings.data.resetSuccess'))
    } catch {
      setFeedback(t('settings.data.resetFailure'))
    } finally {
      setBusy(false)
    }
  }, [busy, t])

  const onToggleTelemetry = useCallback((v: boolean) => {
    setTelemetryAllowed(v)
    setOptOut(!v)
  }, [])

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">{t('settings.data.title')}</h2>
      <p className="pc-settings-content__desc">{t('settings.data.description')}</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.data.backupRestore')}</h3>
        <div className="pc-settings-action-row">
          <div className="pc-settings-action-row__main">
            <span className="pc-settings-action-row__label">{t('settings.data.exportJson')}</span>
            <span className="pc-settings-action-row__desc">{t('settings.data.exportJsonDesc')}</span>
          </div>
          <button type="button" className="pc-settings-action-btn" onClick={onExport}>
            {t('settings.data.export')}
          </button>
        </div>
        <div className="pc-settings-pending">
          <PendingRow label={t('settings.data.importJson')} desc={t('settings.data.importJsonDesc')} />
          <PendingRow label={t('settings.data.cloudSync')} desc={t('settings.data.cloudSyncDesc')} />
        </div>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.data.telemetry.group')}</h3>
        <ToggleRow
          label={t('settings.data.telemetry.toggle')}
          desc={t('settings.data.telemetry.toggleDesc')}
          checked={telemetryAllowed}
          onChange={onToggleTelemetry}
        />
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.data.reset')}</h3>
        <div className="pc-settings-action-row pc-settings-action-row--danger">
          <div className="pc-settings-action-row__main">
            <span className="pc-settings-action-row__label">{t('settings.data.resetProgress')}</span>
            <span className="pc-settings-action-row__desc">
              {t('settings.data.resetDesc')}
            </span>
          </div>
          <button
            type="button"
            className="pc-settings-action-btn pc-settings-action-btn--danger"
            onClick={onReset}
            disabled={busy}
          >
            {busy ? t('settings.data.busy') : t('settings.data.reset')}
          </button>
        </div>
      </section>

      {feedback ? (
        <div className="pc-settings-toast" role="status" aria-live="polite">
          {feedback}
        </div>
      ) : null}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 카테고리: 정보 (About)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function LanguageSettings() {
  const { locale, locales, setLocale, t } = useI18n()
  const selectedLocale = locales.find((item) => item.code === locale)

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">{t('settings.language.title')}</h2>
      <p className="pc-settings-content__desc">{t('settings.language.description')}</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.language.displayLanguage')}</h3>
        <div className="pc-settings-select-row">
          <div>
            <strong>{t('settings.language.displayLanguage')}</strong>
            <p>{t('settings.language.displayLanguageDescription')}</p>
          </div>
          <select
            className="pc-settings-select"
            value={locale}
            aria-label={t('language.selectorTitle')}
            onChange={(event) => setLocale(event.target.value as LocaleCode)}
          >
            {locales.map((item) => (
              <option key={item.code} value={item.code}>
                {item.nativeName}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.language.current')}</h3>
        <div className="pc-settings-info-row">
          <span className="pc-settings-info-row__label">{t('settings.language.current')}</span>
          <span className="pc-settings-info-row__value">{selectedLocale?.nativeName ?? locale}</span>
        </div>
        <p className="pc-settings-content__desc" style={{ marginTop: 12 }}>
          {t('settings.language.restartNote')}
        </p>
      </section>
    </div>
  )
}

function AboutSection() {
  const { t } = useI18n()

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">{t('settings.about.title')}</h2>
      <p className="pc-settings-content__desc">{t('settings.about.description')}</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.about.versionGroup')}</h3>
        <div className="pc-settings-info-row">
          <span className="pc-settings-info-row__label">{t('settings.about.versionBuildLabel')}</span>
          <span className="pc-settings-info-row__value">{t('settings.about.versionBuildValue')}</span>
        </div>
        <div className="pc-settings-info-row">
          <span className="pc-settings-info-row__label">{t('settings.about.engineLabel')}</span>
          <span className="pc-settings-info-row__value">{t('settings.about.engineValue')}</span>
        </div>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.about.creditsGroup')}</h3>
        <p className="pc-settings-content__desc" style={{ marginTop: 4 }}>
          <strong>{t('settings.about.credits.title')}</strong>
          <br />
          {t('settings.about.credits.description')}
        </p>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">{t('settings.about.licenseGroup')}</h3>
        <p className="pc-settings-content__desc" style={{ marginTop: 4 }}>
          {t('settings.about.licenseDescription')}
        </p>
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공통: Preview / Pending
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PreviewSection({ title, desc }: { title: string; desc: string }) {
  const { t } = useI18n()

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">{title}</h2>
      <p className="pc-settings-content__desc">{desc}</p>
      <div className="pc-settings-preview-empty">
        <PCSvgIcon id="i-clock" size={32} />
        <p>{t('settings.preview.nextCycle')}</p>
        <p className="pc-settings-preview-empty__sub">{t('settings.preview.designGuideNote')}</p>
      </div>
    </div>
  )
}

function PendingRow({ label, desc }: { label: string; desc: string }) {
  const { t } = useI18n()
  return (
    <div className="pc-settings-pending-row">
      <div className="pc-settings-pending-row__main">
        <span className="pc-settings-pending-row__label">{label}</span>
        <span className="pc-settings-pending-row__desc">{desc}</span>
      </div>
      <span className="pc-settings-pending-row__badge">{t('settings.pending')}</span>
    </div>
  )
}

function ToggleRow({
  label, desc, checked, onChange,
}: {
  label: string
  desc?: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  const { t } = useI18n()
  return (
    <div className="pc-settings-toggle-row">
      <div className="pc-settings-toggle-row__main">
        <span className="pc-settings-toggle-row__label">{label}</span>
        {desc ? <span className="pc-settings-toggle-row__desc">{desc}</span> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`pc-settings-toggle${checked ? ' is-on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="pc-settings-toggle__thumb" aria-hidden="true" />
        <span className="pc-settings-toggle__sr">{checked ? t('settings.toggle.on') : t('settings.toggle.off')}</span>
      </button>
    </div>
  )
}

function SegmentButton({
  selected, onClick, label,
}: {
  selected: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      type="button"
      className={`pc-settings-segmented__btn${selected ? ' is-selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {label}
    </button>
  )
}

export { PC_OPEN_SETTINGS_EVENT }
