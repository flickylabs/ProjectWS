import { useEffect, useState } from 'react'
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
  label: string
  iconId: string
  status: 'ready' | 'preview'  // ready=실제 옵션 / preview=구조만
}> = [
  { id: 'display',       label: '화면',     iconId: 'i-eye',     status: 'ready' },
  { id: 'audio',         label: '오디오',   iconId: 'i-bolt',    status: 'preview' },
  { id: 'gameplay',      label: '게임플레이', iconId: 'i-gavel',   status: 'preview' },
  { id: 'data',          label: '데이터',   iconId: 'i-doc',     status: 'preview' },
  { id: 'language',      label: '언어',     iconId: 'i-chat',    status: 'preview' },
  { id: 'accessibility', label: '접근성',   iconId: 'i-heart',   status: 'preview' },
  { id: 'controls',      label: '키보드',   iconId: 'i-hand',    status: 'preview' },
  { id: 'account',       label: '계정',     iconId: 'i-person',  status: 'preview' },
  { id: 'about',         label: '정보',     iconId: 'i-bulb',    status: 'ready' },
]

export default function PCSettingsPanel({ open, onClose }: Props) {
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
    <div className="pc-settings-fullscreen" role="dialog" aria-label="설정">
      <header className="pc-settings-fullscreen__header">
        <div className="pc-settings-fullscreen__title">
          <PCSvgIcon id="i-gear" size={22} />
          <span>설정</span>
        </div>
        <button
          type="button"
          className="pc-settings-fullscreen__close"
          onClick={onClose}
          aria-label="닫기 (Esc)"
          title="닫기 (Esc)"
        >
          <span>✕</span>
          <kbd>Esc</kbd>
        </button>
      </header>

      <div className="pc-settings-fullscreen__body">
        <nav className="pc-settings-sidebar" aria-label="설정 카테고리">
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
              <span className="pc-settings-sidebar__label">{cat.label}</span>
              {cat.status === 'preview' ? (
                <span className="pc-settings-sidebar__badge">준비 중</span>
              ) : null}
            </button>
          ))}
        </nav>

        <main className="pc-settings-main">
          {activeCategory === 'display' && <DisplaySettings />}
          {activeCategory === 'audio' && <PreviewSection title="오디오" desc="마스터·BGM·SFX·음성·음소거 옵션 — 다음 사이클 추가 예정" />}
          {activeCategory === 'gameplay' && <PreviewSection title="게임플레이" desc="텍스트 속도·자동 진행·자동 저장·힌트·튜토리얼 옵션 — 다음 사이클" />}
          {activeCategory === 'data' && <PreviewSection title="데이터" desc="저장 슬롯·백업·초기화·클라우드 동기 — 다음 사이클" />}
          {activeCategory === 'language' && <PreviewSection title="언어" desc="한국어 / 영어 / 일본어 — 확장 예정" />}
          {activeCategory === 'accessibility' && <PreviewSection title="접근성" desc="색약 모드·큰 글씨·자막·깜빡임 감소 — 다음 사이클" />}
          {activeCategory === 'controls' && <PreviewSection title="키보드" desc="단축키 커스터마이징 — 다음 사이클" />}
          {activeCategory === 'account' && <PreviewSection title="계정" desc="로그인·세이브 동기 — 확장 예정" />}
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
// 카테고리: 정보 (About)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AboutSection() {
  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">정보</h2>
      <p className="pc-settings-content__desc">버전 · 크레딧 · 라이선스</p>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">버전</h3>
        <div className="pc-settings-info-row">
          <span className="pc-settings-info-row__label">빌드</span>
          <span className="pc-settings-info-row__value">v0.x — 개발 중 (PC 베타)</span>
        </div>
        <div className="pc-settings-info-row">
          <span className="pc-settings-info-row__label">엔진</span>
          <span className="pc-settings-info-row__value">React 19 · TypeScript 5.9 · Vite 8</span>
        </div>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">크레딧</h3>
        <p className="pc-settings-content__desc" style={{ marginTop: 4 }}>
          솔로몬 법정 — AI 둘의 싸움을 인간 지혜로 재판하는 리플레이형 추리 게임
        </p>
      </section>

      <section className="pc-settings-group">
        <h3 className="pc-settings-group__title">라이선스</h3>
        <p className="pc-settings-content__desc" style={{ marginTop: 4 }}>
          오픈소스 라이브러리 · 폰트 · 에셋 정보 (개발 중)
        </p>
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 공통: Preview / Pending
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PreviewSection({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="pc-settings-content">
      <h2 className="pc-settings-content__title">{title}</h2>
      <p className="pc-settings-content__desc">{desc}</p>
      <div className="pc-settings-preview-empty">
        <PCSvgIcon id="i-clock" size={32} />
        <p>이 카테고리는 다음 사이클에서 옵션이 추가됩니다.</p>
        <p className="pc-settings-preview-empty__sub">v2.0 디자인 가이드의 카테고리 매트릭스 참고</p>
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

export { PC_OPEN_SETTINGS_EVENT }
