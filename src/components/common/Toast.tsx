import { useEffect, useState, useCallback } from 'react'
import Emoji from './Emoji'

interface ToastMessage {
  id: number
  text: string
  type: 'error' | 'warn' | 'info'
}

let nextId = 0
let addToastFn: ((msg: Omit<ToastMessage, 'id'>) => void) | null = null

/** 어디서든 토스트를 표시할 수 있는 전역 함수 */
export function showToast(text: string, type: ToastMessage['type'] = 'info') {
  addToastFn?.({ text, type })
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = nextId++
    setToasts((prev) => [...prev.slice(-4), { ...msg, id }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
  }, [])

  useEffect(() => {
    addToastFn = addToast
    return () => { addToastFn = null }
  }, [addToast])

  // 네트워크 상태 감지
  useEffect(() => {
    const onOffline = () => addToast({ text: '네트워크 연결이 끊어졌습니다', type: 'error' })
    const onOnline = () => addToast({ text: '네트워크가 복구되었습니다', type: 'info' })
    window.addEventListener('offline', onOffline)
    window.addEventListener('online', onOnline)
    return () => {
      window.removeEventListener('offline', onOffline)
      window.removeEventListener('online', onOnline)
    }
  }, [addToast])

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto px-4 py-2.5 rounded-xl text-xs font-medium shadow-lg animate-slide-up flex items-center gap-2 ${
            t.type === 'error' ? 'bg-red-900/90 text-red-200 border border-red-700/50' :
            t.type === 'warn' ? 'bg-amber-900/90 text-amber-200 border border-amber-700/50' :
            'bg-gray-800/90 text-gray-200 border border-gray-700/50'
          }`}
        >
          <Emoji char={t.type === 'error' ? '⚠️' : t.type === 'warn' ? '💡' : '✅'} size={14} />
          {t.text}
        </div>
      ))}
    </div>
  )
}
