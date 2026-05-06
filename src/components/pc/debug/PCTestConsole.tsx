import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Resources } from '../../../types'
import { useGameStore, useStore } from '../../../store/useGameStore'

type ResourceKey = keyof Resources

const RESOURCE_LABELS: Record<ResourceKey, string> = {
  investigationTokens: '조사 토큰',
  skillPoints: '스킬 포인트',
  courtControl: '법정 장악',
}

const QUICK_AMOUNTS = [1, 5, 10]
const STORAGE_KEY = 'solomon-pc-test-console-open'

export default function PCTestConsole() {
  const resources = useStore((s) => s.resources)
  const [open, setOpen] = useState(() => localStorage.getItem(STORAGE_KEY) === '1')
  const [amounts, setAmounts] = useState<Record<ResourceKey, string>>({
    investigationTokens: '10',
    skillPoints: '5',
    courtControl: '5',
  })

  const resourceKeys = useMemo(() => Object.keys(RESOURCE_LABELS) as ResourceKey[], [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, open ? '1' : '0')
  }, [open])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.code === 'KeyT') {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const grant = (resource: ResourceKey, amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return
    useGameStore.getState().gain(resource, amount)
  }

  const grantCustom = (resource: ResourceKey) => {
    const amount = Number.parseInt(amounts[resource], 10)
    grant(resource, amount)
  }

  const setCustomAmount = (resource: ResourceKey, value: string) => {
    setAmounts((current) => ({ ...current, [resource]: value }))
  }

  if (!open) {
    return (
      <button type="button" style={styles.fab} onClick={() => setOpen(true)} title="Test token console">
        TEST
      </button>
    )
  }

  return (
    <aside style={styles.panel} aria-label="PC test token console">
      <div style={styles.header}>
        <div>
          <div style={styles.kicker}>LOCAL TEST</div>
          <strong style={styles.title}>Token Console</strong>
        </div>
        <button type="button" style={styles.closeButton} onClick={() => setOpen(false)} title="Close">
          x
        </button>
      </div>

      <div style={styles.rows}>
        {resourceKeys.map((resource) => (
          <div key={resource} style={styles.row}>
            <div style={styles.resourceHead}>
              <span>{RESOURCE_LABELS[resource]}</span>
              <strong>{resources[resource]}</strong>
            </div>
            <div style={styles.actions}>
              {QUICK_AMOUNTS.map((amount) => (
                <button key={amount} type="button" style={styles.actionButton} onClick={() => grant(resource, amount)}>
                  +{amount}
                </button>
              ))}
              <input
                aria-label={`${RESOURCE_LABELS[resource]} custom amount`}
                style={styles.input}
                value={amounts[resource]}
                inputMode="numeric"
                onChange={(event) => setCustomAmount(resource, event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') grantCustom(resource)
                }}
              />
              <button type="button" style={styles.primaryButton} onClick={() => grantCustom(resource)}>
                지급
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footer}>Ctrl+Shift+T</div>
    </aside>
  )
}

const styles: Record<string, CSSProperties> = {
  fab: {
    position: 'fixed',
    right: 18,
    bottom: 18,
    zIndex: 9999,
    width: 54,
    height: 34,
    border: '1px solid rgba(232, 193, 114, 0.5)',
    borderRadius: 6,
    background: 'rgba(17, 20, 28, 0.92)',
    color: '#f4d58d',
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 0,
    cursor: 'pointer',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
  },
  panel: {
    position: 'fixed',
    right: 18,
    bottom: 18,
    zIndex: 9999,
    width: 342,
    padding: 14,
    border: '1px solid rgba(232, 193, 114, 0.32)',
    borderRadius: 8,
    background: 'rgba(12, 15, 22, 0.94)',
    color: '#f6efe0',
    boxShadow: '0 18px 46px rgba(0, 0, 0, 0.48)',
    backdropFilter: 'blur(14px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  kicker: {
    color: '#d4a24e',
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: 0,
  },
  title: {
    display: 'block',
    marginTop: 1,
    fontSize: 15,
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
  rows: {
    display: 'grid',
    gap: 10,
  },
  row: {
    padding: 10,
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    background: 'rgba(255, 255, 255, 0.045)',
  },
  resourceHead: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 8,
    fontSize: 13,
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: '44px 44px 44px 1fr 54px',
    gap: 6,
  },
  actionButton: {
    height: 30,
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: 6,
    background: 'rgba(255, 255, 255, 0.08)',
    color: '#f6efe0',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 700,
  },
  primaryButton: {
    height: 30,
    border: '1px solid rgba(232, 193, 114, 0.5)',
    borderRadius: 6,
    background: 'rgba(212, 162, 78, 0.22)',
    color: '#f4d58d',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 800,
  },
  input: {
    minWidth: 0,
    height: 30,
    border: '1px solid rgba(255, 255, 255, 0.14)',
    borderRadius: 6,
    background: 'rgba(0, 0, 0, 0.22)',
    color: '#ffffff',
    padding: '0 8px',
    fontSize: 12,
  },
  footer: {
    marginTop: 10,
    color: 'rgba(255, 255, 255, 0.44)',
    fontSize: 11,
    textAlign: 'right',
  },
}
