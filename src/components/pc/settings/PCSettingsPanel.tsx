import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import PCSvgIcon from '../icons/PCSvgIcon'
import { useScreenPreset } from '../../../hooks/useScreenPreset'
import { SCREEN_PRESETS, nearestPreset, type ScreenPresetId } from '../../../utils/screenPresets'

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
  const { preset, bucket, setPreset } = useScreenPreset()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const near = typeof window !== 'undefined' ? nearestPreset(window.innerWidth, window.innerHeight) : null

  return createPortal(
    <div className="pc-settings-backdrop" onClick={onClose}>
      <div
        className="pc-settings-panel"
        role="dialog"
        aria-label="설정"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="pc-settings-panel__header">
          <div className="pc-settings-panel__title">
            <PCSvgIcon id="i-gear" size={18} />
            <span>설정</span>
          </div>
          <button
            type="button"
            className="pc-settings-panel__close"
            onClick={onClose}
            aria-label="닫기"
          >
            ✕
          </button>
        </header>

        <section className="pc-settings-section">
          <h3 className="pc-settings-section__title">화면 해상도</h3>
          <p className="pc-settings-section__desc">
            선택한 해상도에 맞춰 좌우 패널의 레이아웃이 단계적으로 조정됩니다.
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
      </div>
    </div>,
    document.body,
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

export { PC_OPEN_SETTINGS_EVENT }
