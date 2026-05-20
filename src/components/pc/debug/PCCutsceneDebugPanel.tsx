import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { triggerCutscene } from '../../discovery/CutsceneOverlay'
import type { CutsceneEvent } from '../../../engine/cutsceneTriggerEngine'
import { getRuntimeTextLocale } from '../../../i18n/runtimeText'

type Variant = 'trust' | 'slip' | 'witness'

interface DisputeRef {
  id: string
  name: string
  // slip 시 closure 카드에 표시할 cascade 대상 (mock — 보통 다음 dispute로 연결)
  slipLinkTo?: string
}

interface CaseRef {
  caseId: string
  label: string
  partyB: { id: 'b'; name: string }
  disputes: DisputeRef[]
}

const CASES: CaseRef[] = [
  {
    caseId: 'case-spouse-01',
    label: '배우자 · spouse-01',
    partyB: { id: 'b', name: '이준호' },
    disputes: [
      { id: 'd-1', name: '오피스텔 방문과 새벽 전화', slipLinkTo: 'd-2' },
      { id: 'd-2', name: '남편 명의 계좌의 목돈 출금', slipLinkTo: 'h-d3' },
      { id: 'h-d3', name: '공동 적금 2,000만원 해지 경위', slipLinkTo: 'h-d4' },
      { id: 'h-d4', name: '은폐와 선제행동의 순서' },
    ],
  },
  {
    caseId: 'case-family-01',
    label: '가족 · family-01',
    partyB: { id: 'b', name: '윤정후' },
    disputes: [
      { id: 'd-1', name: '유서 작성과 판단 능력', slipLinkTo: 'd-2' },
      { id: 'd-2', name: '공증 유서와 별도 문서의 차이', slipLinkTo: 'd-3' },
      { id: 'd-3', name: '오래된 지원의 출처', slipLinkTo: 'd-4' },
      { id: 'd-4', name: '가족 기록과 침묵의 이유', slipLinkTo: 'd-5' },
      { id: 'd-5', name: '어머니의 숨겨진 마음' },
    ],
  },
  {
    caseId: 'case-friend-01',
    label: '친구 · friend-01',
    partyB: { id: 'b', name: '최수민' },
    disputes: [
      { id: 'd-1', name: '9일간의 연락 의도', slipLinkTo: 'd-2' },
      { id: 'd-2', name: '예비신랑의 선 넘는 접근', slipLinkTo: 'd-3' },
      { id: 'd-3', name: '아버지의 돈 접근 패턴', slipLinkTo: 'd-4' },
      { id: 'd-4', name: '과거 손절의 이유', slipLinkTo: 'd-5' },
      { id: 'd-5', name: '단톡방 매도와 명예훼손' },
    ],
  },
]

const STORAGE_KEY = 'solomon-pc-cutscene-debug-open'

function buildEvent(variant: Variant, c: CaseRef, d: DisputeRef): CutsceneEvent {
  const base = {
    caseId: c.caseId,
    disputeId: d.id,
    partyId: c.partyB.id,
    partyName: c.partyB.name,
    disputeName: d.name,
    phase: 'phase3',
  }
  if (variant === 'trust') {
    return {
      type: 'truth_reveal_trust',
      data: { ...base, lieStateBefore: 'S4', lieStateAfter: 'S5', route: 'trust' },
    }
  }
  if (variant === 'slip') {
    return {
      type: 'truth_reveal_slip',
      data: { ...base, linkedDisputeId: d.slipLinkTo },
    }
  }
  return {
    type: 'truth_reveal_witness',
    data: {
      ...base,
      lieStateBefore: 'S3',
      lieStateAfter: 'S5',
      route: 'trust',
      witnessId: 'w-mock',
      witnessName: '증인 김민수',
      witnessQuote: '제가 그날 직접 보았습니다.',
    },
  }
}

export default function PCCutsceneDebugPanel() {
  const [open, setOpen] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })
  const [locale, setLocale] = useState(() => getRuntimeTextLocale())

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, open ? '1' : '0') } catch { /* ignore */ }
  }, [open])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyC') {
        event.preventDefault()
        setOpen((v) => !v)
      }
    }
    const onStorage = () => setLocale(getRuntimeTextLocale())
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const fire = useCallback((variant: Variant, c: CaseRef, d: DisputeRef) => {
    triggerCutscene(buildEvent(variant, c, d))
  }, [])

  const localeBadge = useMemo(() => {
    const map: Record<string, string> = { ko: '한국어', en: 'English', ja: '日本語', 'zh-CN': '简体中文' }
    return map[locale] ?? locale
  }, [locale])

  if (!open) {
    return (
      <button type="button" style={styles.fab} onClick={() => setOpen(true)} title="Cutscene debug (Ctrl+Shift+C)">
        CUT
      </button>
    )
  }

  return (
    <aside style={styles.panel} aria-label="Cutscene debug panel">
      <div style={styles.header}>
        <div>
          <div style={styles.kicker}>CUTSCENE DEBUG</div>
          <strong style={styles.title}>Truth Reveal Trigger</strong>
          <div style={styles.localeLine}>현재 언어: {localeBadge} <span style={styles.localeHint}>(우상단 언어 셀렉터로 변경)</span></div>
        </div>
        <button type="button" style={styles.closeButton} onClick={() => setOpen(false)} title="Close">
          x
        </button>
      </div>

      <div style={styles.scrollArea}>
        {CASES.map((c) => (
          <section key={c.caseId} style={styles.caseBlock}>
            <header style={styles.caseHead}>{c.label} · <span style={styles.partySmall}>{c.partyB.name}</span></header>
            {c.disputes.map((d) => (
              <div key={d.id} style={styles.disputeRow}>
                <div style={styles.disputeMeta}>
                  <span style={styles.disputeId}>{d.id}</span>
                  <span style={styles.disputeName}>{d.name}</span>
                </div>
                <div style={styles.variantButtons}>
                  <button type="button" style={styles.btnTrust} onClick={() => fire('trust', c, d)}>Trust</button>
                  <button type="button" style={styles.btnSlip} onClick={() => fire('slip', c, d)}>Slip</button>
                  <button type="button" style={styles.btnWitness} onClick={() => fire('witness', c, d)}>Witness</button>
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>

      <div style={styles.footer}>Ctrl+Shift+C · shouldTriggerCutscene 우회(쿨다운 무시)</div>
    </aside>
  )
}

const styles: Record<string, CSSProperties> = {
  fab: {
    position: 'fixed',
    left: 18,
    bottom: 18,
    zIndex: 9999,
    width: 54,
    height: 34,
    border: '1px solid rgba(193, 132, 232, 0.5)',
    borderRadius: 6,
    background: 'rgba(17, 20, 28, 0.92)',
    color: '#dab2ff',
    fontSize: 12,
    fontWeight: 800,
    cursor: 'pointer',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
  },
  panel: {
    position: 'fixed',
    left: 18,
    bottom: 18,
    zIndex: 9999,
    width: 360,
    maxHeight: '78vh',
    padding: 14,
    border: '1px solid rgba(193, 132, 232, 0.32)',
    borderRadius: 8,
    background: 'rgba(12, 15, 22, 0.94)',
    color: '#f6efe0',
    boxShadow: '0 18px 46px rgba(0, 0, 0, 0.48)',
    backdropFilter: 'blur(14px)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  kicker: {
    color: '#c89cf7',
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 1,
  },
  title: {
    display: 'block',
    marginTop: 1,
    fontSize: 15,
  },
  localeLine: {
    marginTop: 4,
    fontSize: 11,
    color: 'rgba(246, 239, 224, 0.72)',
  },
  localeHint: {
    color: 'rgba(246, 239, 224, 0.36)',
  },
  closeButton: {
    width: 28,
    height: 28,
    border: '1px solid rgba(255, 255, 255, 0.14)',
    borderRadius: 6,
    background: 'rgba(255, 255, 255, 0.06)',
    color: '#d9d4ca',
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: 1,
  },
  scrollArea: {
    overflowY: 'auto',
    paddingRight: 4,
    display: 'grid',
    gap: 10,
  },
  caseBlock: {
    padding: 8,
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
    background: 'rgba(255, 255, 255, 0.03)',
  },
  caseHead: {
    fontSize: 12,
    fontWeight: 700,
    color: '#dab2ff',
    marginBottom: 6,
  },
  partySmall: {
    fontSize: 11,
    color: 'rgba(246, 239, 224, 0.6)',
    fontWeight: 500,
  },
  disputeRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 180px',
    gap: 8,
    alignItems: 'center',
    padding: '5px 4px',
    borderTop: '1px dashed rgba(255, 255, 255, 0.06)',
  },
  disputeMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    minWidth: 0,
  },
  disputeId: {
    fontSize: 10,
    color: 'rgba(246, 239, 224, 0.48)',
    fontWeight: 700,
  },
  disputeName: {
    fontSize: 12,
    color: '#f6efe0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  variantButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: 4,
  },
  btnTrust: {
    height: 26,
    border: '1px solid rgba(232, 193, 114, 0.45)',
    borderRadius: 4,
    background: 'rgba(212, 162, 78, 0.18)',
    color: '#f4d58d',
    cursor: 'pointer',
    fontSize: 11,
    fontWeight: 700,
  },
  btnSlip: {
    height: 26,
    border: '1px solid rgba(244, 114, 114, 0.45)',
    borderRadius: 4,
    background: 'rgba(244, 114, 114, 0.18)',
    color: '#ffb3b3',
    cursor: 'pointer',
    fontSize: 11,
    fontWeight: 700,
  },
  btnWitness: {
    height: 26,
    border: '1px solid rgba(114, 168, 244, 0.45)',
    borderRadius: 4,
    background: 'rgba(114, 168, 244, 0.18)',
    color: '#b3d0ff',
    cursor: 'pointer',
    fontSize: 11,
    fontWeight: 700,
  },
  footer: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    textAlign: 'right',
  },
}
