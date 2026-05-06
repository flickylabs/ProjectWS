import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import PCSvgIcon from '../icons/PCSvgIcon'
import { useScreenPreset } from '../../../hooks/useScreenPreset'
import { SCREEN_PRESETS, nearestPreset, type ScreenPresetId } from '../../../utils/screenPresets'
import { getSettings, updateSettings } from '../../../hooks/useLocalStorage'
import { useI18n, type LocaleCode, type MessageKey } from '../../../i18n'
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
          <kbd>Esc</kbd>
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
  const { preset, bucket, setPreset } = useScreenPreset()
  const near = typeof window !== 'undefined' ? nearestPreset(window.innerWidth, window.innerHeight) : null

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">화면</h2>
      <p className="pc-settings-content__desc">해상도 · 풀스크린 · UI 표시 옵션</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">해상도 프리셋</h3>
        <p className="pc-settings-group__desc">
          선택한 해상도에 맞춰 좌우 패널 레이아웃이 단계적으로 조정됩니다.
        </p>

        <div className="pc-settings-res-grid">
          <ResolutionOption
            id="auto"
            label="Auto (자동 감지)"
            hint={near ? `현재 ${near.label}` : undefined}
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
          현재 UI 단계: <strong>{bucket}</strong>
          <span className="pc-settings-bucket-note__desc">
            {bucket === 'L' && ' (기본 · 1080px 이상)'}
            {bucket === 'M' && ' (축소 1단계 · 900–1079px)'}
            {bucket === 'S' && ' (축소 2단계 · 768–899px)'}
            {bucket === 'XS' && ' (축소 3단계 · 767px 이하)'}
          </span>
        </div>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">표시 옵션 (예정)</h3>
        <div className="pc-settings-pending">
          <PendingRow label="풀스크린 모드" desc="브라우저 풀스크린 토글" />
          <PendingRow label="UI 스케일" desc="80% ~ 120%" />
          <PendingRow label="FPS 제한" desc="30 / 60 / 120 / 무제한" />
          <PendingRow label="모션 감소" desc="펄스/애니메이션 비활성" />
          <PendingRow label="그레인/필터 효과" desc="배경 그레인 토글" />
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
      <h2 className="pc-settings-content__title">오디오</h2>
      <p className="pc-settings-content__desc">배경음 · 효과음 · 음소거 옵션</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">사운드</h3>
        <ToggleRow
          label="배경음 (BGM)"
          desc="법정 배경 음악을 재생합니다."
          checked={bgm}
          onChange={onToggleBgm}
        />
        <ToggleRow
          label="효과음 (SFX)"
          desc="버튼·상태 전이 등 인터랙션 사운드를 재생합니다."
          checked={sfx}
          onChange={onToggleSfx}
        />
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">표시 옵션 (예정)</h3>
        <div className="pc-settings-pending">
          <PendingRow label="마스터 볼륨" desc="0% ~ 100% 슬라이더" />
          <PendingRow label="BGM 볼륨" desc="배경음 개별 볼륨" />
          <PendingRow label="SFX 볼륨" desc="효과음 개별 볼륨" />
          <PendingRow label="보이스 볼륨" desc="LLM 음성 합성 (확장 예정)" />
        </div>
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 카테고리: 게임플레이
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function GameplaySettings() {
  const [hints, setHints] = useState<boolean>(() => {
    try { return getSettings().showBehaviorHints } catch { return true }
  })
  const [autoAdvance, setAutoAdvance] = useState<boolean>(() => {
    try { return getSettings().autoAdvanceDialogue } catch { return true }
  })
  const [typing, setTyping] = useState<'fast' | 'normal' | 'slow'>(() => {
    try { return getSettings().typingSpeed } catch { return 'normal' }
  })

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

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">게임플레이</h2>
      <p className="pc-settings-content__desc">텍스트 속도 · 자동 진행 · 행동 힌트</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">진행</h3>
        <ToggleRow
          label="행동 힌트 표시"
          desc="심문/증거 행동 선택지에 추천 힌트를 표시합니다."
          checked={hints}
          onChange={onToggleHints}
        />
        <ToggleRow
          label="대사 자동 진행"
          desc="스크립트 대사를 자동으로 다음 줄로 넘깁니다."
          checked={autoAdvance}
          onChange={onToggleAuto}
        />
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">텍스트 속도</h3>
        <p className="pc-settings-group__desc">대사 타이핑 효과의 속도를 조정합니다.</p>
        <div className="pc-settings-segmented">
          <SegmentButton selected={typing === 'fast'}   onClick={() => onChangeTyping('fast')}   label="빠름" />
          <SegmentButton selected={typing === 'normal'} onClick={() => onChangeTyping('normal')} label="보통" />
          <SegmentButton selected={typing === 'slow'}   onClick={() => onChangeTyping('slow')}   label="느림" />
        </div>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">표시 옵션 (예정)</h3>
        <div className="pc-settings-pending">
          <PendingRow label="자동 저장 주기" desc="페이즈마다 / 사건 종료 시 / 비활성" />
          <PendingRow label="튜토리얼 다시 보기" desc="첫 사건 가이드 재생" />
          <PendingRow label="난이도" desc="초보 / 표준 / 전문가" />
        </div>
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
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState<string>('')

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
      setFeedback('저장 데이터를 JSON 파일로 내보냈습니다.')
    } catch {
      setFeedback('내보내기에 실패했습니다.')
    }
  }, [])

  const onReset = useCallback(() => {
    if (busy) return
    if (typeof window === 'undefined') return
    const ok = window.confirm(
      '진행 데이터를 모두 초기화합니다.\n\n' +
      '- 저장 슬롯, 사건 진행, 재판관 성향, 도전과제, 프로필이 삭제됩니다.\n' +
      '- 이 동작은 되돌릴 수 없습니다.\n\n계속하시겠습니까?',
    )
    if (!ok) return
    setBusy(true)
    try {
      DATA_KEYS.forEach((k) => { try { localStorage.removeItem(k) } catch { /* */ } })
      setFeedback('진행 데이터를 초기화했습니다. 다음 새로고침부터 적용됩니다.')
    } catch {
      setFeedback('초기화에 실패했습니다.')
    } finally {
      setBusy(false)
    }
  }, [busy])

  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">데이터</h2>
      <p className="pc-settings-content__desc">저장 데이터 내보내기 · 초기화</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">백업 / 복원</h3>
        <div className="pc-settings-action-row">
          <div className="pc-settings-action-row__main">
            <span className="pc-settings-action-row__label">JSON 내보내기</span>
            <span className="pc-settings-action-row__desc">현재 진행 상태(로컬 저장소)를 JSON 파일로 다운로드합니다.</span>
          </div>
          <button type="button" className="pc-settings-action-btn" onClick={onExport}>
            내보내기
          </button>
        </div>
        <div className="pc-settings-pending">
          <PendingRow label="JSON 가져오기" desc="기존 백업 파일을 읽어 복원 — 다음 사이클" />
          <PendingRow label="클라우드 동기" desc="계정 연동 후 자동 백업 — 확장 예정" />
        </div>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">초기화</h3>
        <div className="pc-settings-action-row pc-settings-action-row--danger">
          <div className="pc-settings-action-row__main">
            <span className="pc-settings-action-row__label">진행 데이터 초기화</span>
            <span className="pc-settings-action-row__desc">
              저장 슬롯·사건 진행·재판관 성향·도전과제·프로필을 모두 삭제합니다. 되돌릴 수 없습니다.
            </span>
          </div>
          <button
            type="button"
            className="pc-settings-action-btn pc-settings-action-btn--danger"
            onClick={onReset}
            disabled={busy}
          >
            {busy ? '처리 중…' : '초기화'}
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
  return (
    <div className="pc-settings-pending-row">
      <div className="pc-settings-pending-row__main">
        <span className="pc-settings-pending-row__label">{label}</span>
        <span className="pc-settings-pending-row__desc">{desc}</span>
      </div>
      <span className="pc-settings-pending-row__badge">예정</span>
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
        <span className="pc-settings-toggle__sr">{checked ? '켜짐' : '꺼짐'}</span>
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
