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
  partyA: { id: 'a'; name: string }
  partyB: { id: 'b'; name: string }
  disputes: DisputeRef[]
}

const CASES: CaseRef[] = [
  {
    caseId: 'case-spouse-01',
    label: '배우자 · spouse-01',
    partyA: { id: 'a', name: '박지연' },
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
    partyA: { id: 'a', name: '윤태성' },
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
    partyA: { id: 'a', name: '송다은' },
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

type PartySelection = 'a' | 'b'

const STORAGE_KEY = 'solomon-pc-cutscene-debug-open'
const PARTY_KEY = 'solomon-pc-cutscene-debug-party'

function buildEvent(variant: Variant, c: CaseRef, d: DisputeRef, partySel: PartySelection): CutsceneEvent {
  const focused = partySel === 'a' ? c.partyA : c.partyB
  const base = {
    caseId: c.caseId,
    disputeId: d.id,
    partyId: focused.id,
    partyName: focused.name,
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
  // Witness — dispute별 적절한 증인 + caseData의 knowledgeScope 기반 quote.
  const caseWitnesses = WITNESS_BY_DISPUTE[c.caseId] ?? {}
  const witness = caseWitnesses[d.id] ?? caseWitnesses['__default'] ?? { id: 'w-1', name: '증인', quote: '제가 본 대로 말씀드립니다.' }
  return {
    type: 'truth_reveal_witness',
    data: {
      ...base,
      lieStateBefore: 'S3',
      lieStateAfter: 'S5',
      route: 'trust',
      witnessId: witness.id,
      witnessName: witness.name,
      witnessQuote: witness.quote,
    },
  }
}

/**
 * Dispute별 증인 매핑 — caseData(src/data/cases/generated/{case}.json) socialGraph에서 발췌.
 * witness id는 caseData 형식("w-1") 사용 (portrait helper에서 normalize). dispute에 매핑 없으면 __default fallback.
 * quote는 knowledgeScope를 증인 화법(speechStyle, addressJudge="재판관님")으로 가공.
 */
const WITNESS_BY_DISPUTE: Record<string, Record<string, { id: string; name: string; quote: string }>> = {
  'case-spouse-01': {
    // w-1 오피스텔 경비 (사실 위주 간결, 재판관님)
    'd-1': { id: 'w-1', name: '오피스텔 경비', quote: '재판관님, 그 차는 일주일에 두세 번씩 왔습니다. 그 층에 여자 혼자 사는 집은 없습니다.' },
    // w-2 은행 직원 (업무적 정확)
    'h-d3': { id: 'w-2', name: '은행 직원', quote: '재판관님, 위임장으로 적금을 해지한 건이 있었습니다. 절차상 미흡한 점이 있었지만 그대로 처리됐습니다.' },
    'h-d4': { id: 'w-2', name: '은행 직원', quote: '재판관님, 해지 직후 같은 명의로 새 계좌가 개설된 기록이 남아 있습니다.' },
    // w-3 박미라 (또렷이 기억하는 지인) — d-2 fallback
    '__default': { id: 'w-3', name: '박미라', quote: '재판관님, 지연 씨가 \'남편이 바람이면 내 돈부터 지키겠다\'고 했어요. 그 투자방 링크는 제가 보냈고요.' },
  },
  'case-family-01': {
    // w-1 최복순 (요양보호사, 조심스러운 화법)
    'd-1': { id: 'w-1', name: '최복순', quote: '재판관님, 작은아들분이 어머님께 종이를 읽어드리던 걸 봤습니다. 큰아들분 오기 전에 끝내자고 조심스러워하셨어요.' },
    // w-2 김영수 (공증인 메모 담당, 업무적)
    'd-2': { id: 'w-2', name: '김영수', quote: '재판관님, 공증 당일 메모에 어머님 상태와 숫자 혼선 기록이 남아 있습니다. 작은아들분이 절차를 서두른 듯한 관찰도 적혀 있고요.' },
    // w-3 박순애 (어머니 친구, 감정 섞임)
    'd-3': { id: 'w-3', name: '박순애', quote: '재판관님, 그 어머니가 살아 계실 때 \'정후가 매달 돈을 보내준다\'고 하셨어요. \'태성이 공장 어려울 때 정후 돈으로 막았다\'고도 하셨고요.' },
    'd-5': { id: 'w-3', name: '박순애', quote: '재판관님, 어머니가 두 아드님을 두고 다른 마음을 품고 계셨던 것 같아요. 한쪽한테 더 미안하다는 말씀도 자주 하셨고요.' },
    '__default': { id: 'w-3', name: '박순애', quote: '재판관님, 어머님이 두 아들에 대해 다른 속마음을 갖고 계셨던 건 분명합니다.' },
  },
  'case-friend-01': {
    // w-1 김세라 (공통 친구, 솔직하되 본인 동조는 줄임)
    'd-5': { id: 'w-1', name: '김세라', quote: '재판관님, 단톡방에서 다은이 글을 보고 저도 같이 동조했어요... 나중에 찜찜한 마음이 들었습니다.' },
    // w-2 박준혁 (예비신랑 후배, 간결한 사실)
    'd-2': { id: 'w-2', name: '박준혁', quote: '재판관님, 예비신랑이 수민 씨에게 먼저 접근한 게 맞습니다. 회사에서도 그런 얘기를 한 적 있고요.' },
    // w-3 오미경 (분식집 사장, 정 담아 정확하게)
    'd-4': { id: 'w-3', name: '오미경', quote: '재판관님, 그 집 딸 아버님이 우리 가게 단골이던 수민 씨한테 돈 빌리러 오신 적 있어요. 수민 씨가 울면서 가게에 온 적도 있고요.' },
    '__default': { id: 'w-1', name: '김세라', quote: '재판관님, 그 단톡방에서 다은이가 처음 말 꺼낸 건 맞아요.' },
  },
}

export default function PCCutsceneDebugPanel() {
  const [open, setOpen] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === '1' } catch { return false }
  })
  const [partySel, setPartySel] = useState<PartySelection>(() => {
    try { return (localStorage.getItem(PARTY_KEY) as PartySelection) === 'a' ? 'a' : 'b' } catch { return 'b' }
  })
  const [locale, setLocale] = useState(() => getRuntimeTextLocale())

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, open ? '1' : '0') } catch { /* ignore */ }
  }, [open])

  useEffect(() => {
    try { localStorage.setItem(PARTY_KEY, partySel) } catch { /* ignore */ }
  }, [partySel])

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
    triggerCutscene(buildEvent(variant, c, d, partySel))
  }, [partySel])

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

      <div style={styles.partyToggleRow}>
        <span style={styles.partyToggleLabel}>등장 인물</span>
        <button
          type="button"
          style={{ ...styles.partyToggleBtn, ...(partySel === 'a' ? styles.partyToggleBtnActive : {}) }}
          onClick={() => setPartySel('a')}
        >
          A (고소인)
        </button>
        <button
          type="button"
          style={{ ...styles.partyToggleBtn, ...(partySel === 'b' ? styles.partyToggleBtnActive : {}) }}
          onClick={() => setPartySel('b')}
        >
          B (피고소인)
        </button>
      </div>

      <div style={styles.scrollArea}>
        {CASES.map((c) => {
          const focused = partySel === 'a' ? c.partyA : c.partyB
          return (
          <section key={c.caseId} style={styles.caseBlock}>
            <header style={styles.caseHead}>{c.label} · <span style={styles.partySmall}>{focused.name} ({partySel.toUpperCase()})</span></header>
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
          )
        })}
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
  partyToggleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 8px',
    marginBottom: 8,
    border: '1px solid rgba(232, 193, 114, 0.28)',
    borderRadius: 6,
    background: 'rgba(212, 162, 78, 0.08)',
  },
  partyToggleLabel: {
    fontSize: 10,
    color: 'rgba(246, 239, 224, 0.62)',
    letterSpacing: 1,
    marginRight: 'auto',
    fontWeight: 700,
  },
  partyToggleBtn: {
    height: 24,
    padding: '0 10px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: 4,
    background: 'rgba(255, 255, 255, 0.04)',
    color: '#cfc6b5',
    cursor: 'pointer',
    fontSize: 11,
    fontWeight: 600,
  },
  partyToggleBtnActive: {
    background: 'rgba(232, 193, 114, 0.28)',
    border: '1px solid rgba(232, 193, 114, 0.7)',
    color: '#f4d58d',
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
