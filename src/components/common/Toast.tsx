import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Emoji from './Emoji'

interface ToastMessage {
  id: number
  text: string
  type: 'error' | 'warn' | 'info' | 'success'
}

let nextId = 0
let addToastFn: ((msg: Omit<ToastMessage, 'id'>) => void) | null = null

/** 어디서든 토스트를 표시할 수 있는 전역 함수 */
export function showToast(text: string, type: ToastMessage['type'] = 'info') {
  addToastFn?.({ text, type })
}

/** LLM 에러 배너 상태 */
let showErrorBannerFn: ((show: boolean) => void) | null = null

/** LLM 에러 시 자연스러운 에러 배너 표시 */
export function showLLMErrorBanner() {
  showErrorBannerFn?.(true)
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [errorBanner, setErrorBanner] = useState(false)

  const addToast = useCallback((msg: Omit<ToastMessage, 'id'>) => {
    const id = nextId++
    setToasts((prev) => [...prev.slice(-4), { ...msg, id }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    addToastFn = addToast
    showErrorBannerFn = setErrorBanner
    return () => { addToastFn = null; showErrorBannerFn = null }
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

  const handleReport = () => {
    const subject = encodeURIComponent('[솔로몬] 게임 중 통신 오류 신고')
    const body = encodeURIComponent(
      `[오류 신고]\n\n발생 시점: ${new Date().toLocaleString('ko-KR')}\n브라우저: ${navigator.userAgent}\n\n증상:\n- 게임 중 AI 응답이 정상적으로 생성되지 않았습니다.\n\n추가 설명:\n(여기에 상황을 적어주세요)\n`,
    )
    window.open(`mailto:support@flickylabs.com?subject=${subject}&body=${body}`, '_blank')
    setErrorBanner(false)
  }

  return (
    <>
      {/* 일반 토스트 — 화면 중앙 */}
      {toasts.length > 0 && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none px-6">
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {toasts.map((t) => {
              const colors = t.type === 'error'
                ? 'bg-red-950/95 text-red-200 border-red-700/50 shadow-red-900/30'
                : t.type === 'warn'
                  ? 'bg-amber-950/95 text-amber-200 border-amber-700/50 shadow-amber-900/30'
                  : t.type === 'success'
                    ? 'bg-emerald-950/95 text-emerald-200 border-emerald-700/50 shadow-emerald-900/30'
                    : 'bg-gray-900/95 text-gray-200 border-gray-700/50 shadow-black/30'
              const icon = t.type === 'error' ? '⚠️' : t.type === 'warn' ? '💡' : t.type === 'success' ? '✅' : 'ℹ️'
              return (
                <div
                  key={t.id}
                  onClick={() => dismissToast(t.id)}
                  className={`pointer-events-auto cursor-pointer px-5 py-3.5 rounded-2xl text-sm font-medium shadow-xl border backdrop-blur-sm animate-scale-in flex items-center gap-3 ${colors}`}
                >
                  <Emoji char={icon} size={20} />
                  <span className="flex-1 leading-snug">{t.text}</span>
                </div>
              )
            })}
          </div>
        </div>,
        document.body
      )}

      {/* LLM 에러 배너 — 자연스러운 에러 메시지 + 신고 버튼 */}
      {errorBanner && createPortal(
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700/50 rounded-2xl p-5 w-[320px] shadow-2xl text-center space-y-4">
            <div className="text-2xl">📡</div>
            <div className="text-sm text-gray-200 font-medium">
              데이터 송수신에 일시적인 문제가 발생했습니다
            </div>
            <div className="text-xs text-gray-500 leading-relaxed">
              통신이 원활한 환경에서 다시 시도해 주세요.<br />
              문제가 반복되면 아래 버튼으로 알려주세요.
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleReport}
                className="flex-1 py-2.5 rounded-xl text-xs font-medium bg-amber-600/80 text-gray-950 active:scale-95 transition-all"
              >
                오류 신고하기
              </button>
              <button
                onClick={() => setErrorBanner(false)}
                className="flex-1 py-2.5 rounded-xl text-xs text-gray-400 bg-gray-800 active:scale-95 transition-all"
              >
                닫기
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
