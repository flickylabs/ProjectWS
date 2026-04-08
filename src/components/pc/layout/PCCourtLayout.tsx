import type { ReactNode } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useStore } from '../../../store/useGameStore'
import PCDialogueLog from './PCDialogueLog'
import Emoji from '../../common/Emoji'
import PCLeftPanel from '../panels/PCLeftPanel'
import PCRightPanel from '../panels/PCRightPanel'
import PCBottomDock from '../hotbar/PCBottomDock'
import PCEvidenceViewer from '../evidence/PCEvidenceViewer'

interface Props {
  onDialogueTap?: () => void
  isDialoguePhase?: boolean
}

export default function PCCourtLayout({ onDialogueTap, isDialoguePhase }: Props) {
  const chatRef = useRef<HTMLDivElement>(null)
  const dialogueLog = useStore((s) => s.dialogueLog)
  const caseData = useStore((s) => s.caseData)
  const currentPhase = useStore((s) => s.currentPhase)
  const resources = useStore((s) => s.resources)

  // 새 메시지 시 자동 스크롤
  useEffect(() => {
    const timer = setTimeout(() => {
      const el = chatRef.current
      if (el) el.scrollTop = el.scrollHeight
    }, 50)
    return () => clearTimeout(timer)
  }, [dialogueLog.length])

  const handleChatClick = useCallback(() => {
    if (isDialoguePhase) onDialogueTap?.()
  }, [isDialoguePhase, onDialogueTap])

  const PHASE_LABELS: Record<string, string> = {
    phase1: '초기 진술', phase2: '반박', phase3: '심문',
    phase4: '증거 심리', phase5: '재심문', phase6: '중재', phase7: '판결',
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--pc-bg)', color: '#dcdce0' }}>
      {/* ── Header ── */}
      <header
        className="flex items-center px-6 gap-4 shrink-0"
        style={{ height: 52, background: 'var(--pc-p1)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="flex items-center gap-2.5">
          <Emoji char="⚖️" size={24} />
          <span className="text-xl font-bold" style={{ color: 'var(--pc-gold)', letterSpacing: '-0.02em' }}>솔로몬</span>
          {caseData && (
            <span className="text-sm ml-1" style={{ color: '#4e4e5c' }}>{caseData.caseId}</span>
          )}
        </div>

        {/* 페이즈 필 */}
        <div
          className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-sm font-medium"
          style={{ background: 'rgba(212,162,78,0.08)', border: '1px solid rgba(212,162,78,0.18)', color: 'var(--pc-gold-light)' }}
        >
          <Emoji char="📋" size={14} />
          {PHASE_LABELS[currentPhase] ?? currentPhase}
        </div>

        {/* 리소스 */}
        <nav className="ml-auto flex items-center gap-5 text-sm" style={{ color: '#8b8b9a' }}>
          <span className="flex items-center gap-1.5">
            <Emoji char="🔍" size={14} />
            <b className="font-semibold" style={{ color: '#dcdce0' }}>{resources.investigationTokens}</b>
          </span>
          <span className="flex items-center gap-1.5">
            <Emoji char="⚡" size={14} />
            <b className="font-semibold" style={{ color: '#dcdce0' }}>{resources.skillPoints}</b>
          </span>
          <div style={{ width: 1, height: 16, background: '#282832' }} />
          <span className="flex items-center gap-1.5">
            <Emoji char="⚖️" size={14} />
            <b className="font-semibold" style={{ color: 'var(--pc-gold)' }}>{resources.courtControl}</b>
          </span>
        </nav>
      </header>

      {/* ── 3-Column Body ── */}
      <div className="flex-1 min-h-0 flex">
        {/* Left Panel: 쟁점 / 증거 / 미터 */}
        <aside
          className="shrink-0 overflow-y-auto pc-panel-border-r"
          style={{ width: 400, background: 'var(--pc-p1)' }}
        >
          <PCLeftPanel />
        </aside>

        {/* Center: 대화 */}
        <main className="flex-1 min-w-0 flex flex-col relative" style={{ background: 'var(--pc-bg)' }}>
          {/* Ambient glows (matching prototype) */}
          <div className="absolute inset-0 pointer-events-none">
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 60%, rgba(91,141,239,0.02), transparent 50%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 60%, rgba(224,96,96,0.02), transparent 50%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(212,162,78,0.015), transparent 50%)' }} />
          </div>

          {/* Chat area */}
          <div className="flex-1 min-h-0 relative">
            <div
              ref={chatRef}
              className="absolute inset-0 overflow-y-auto"
              style={{ padding: '28px 40px 16px', scrollbarWidth: 'thin', scrollbarColor: '#282832 transparent' }}
              onClick={handleChatClick}
            >
              <PCDialogueLog />
            </div>
          </div>

          {/* Bottom gradient fade into dock */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{ height: 60, background: 'linear-gradient(180deg, transparent 0%, var(--pc-p1) 100%)', zIndex: 1 }}
          />
        </main>

        {/* Right Panel: 대상 / 노트 / 타임라인 */}
        <aside
          className="shrink-0 overflow-y-auto pc-panel-border-l"
          style={{ width: 380, background: 'var(--pc-p1)' }}
        >
          <PCRightPanel />
        </aside>
      </div>

      {/* ── Bottom Dock (Hotbar) ── */}
      <PCBottomDock />

      {/* ── Evidence Detail Viewer Overlay ── */}
      <PCEvidenceViewer />
    </div>
  )
}

/* ── Shared sub-components ── */

function PanelSection({ icon, title, count, children }: {
  icon: string; title: string; count?: number; children: ReactNode
}) {
  return (
    <div className="px-6 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
      <div className="flex items-center gap-2 mb-4">
        <Emoji char={icon} size={14} />
        <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#4e4e5c' }}>
          {title}
        </span>
        {count !== undefined && (
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: 'var(--pc-p4)', color: '#8b8b9a' }}>
            {count}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}

function MeterBar({ label, color, value }: { label: string; color: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium w-8" style={{ color: '#4e4e5c' }}>{label}</span>
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--pc-p4)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${Math.min(value, 100)}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
      <span className="text-sm font-medium tabular-nums w-9 text-right" style={{ color: '#4e4e5c' }}>
        {value}%
      </span>
    </div>
  )
}
