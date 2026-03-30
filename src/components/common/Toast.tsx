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
      {/* 일반 토스트 */}
      {toasts.length > 0 && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
          {toasts.map((t) => (
            <div
              key={t.id}
              onClick={() => dismissToast(t.id)}
              className={`pointer-events-auto cursor-pointer px-4 py-2.5 rounded-xl text-xs font-medium shadow-lg animate-slide-up flex items-center gap-2 ${
                t.type === 'error' ? 'bg-red-900/90 text-red-200 border border-red-700/50' :
                t.type === 'warn' ? 'bg-amber-900/90 text-amber-200 border border-amber-700/50' :
                'bg-gray-800/90 text-gray-200 border border-gray-700/50'
              }`}
            >
              <Emoji char={t.type === 'error' ? '⚠️' : t.type === 'warn' ? '💡' : '✅'} size={14} />
              <span className="flex-1">{t.text}</span>
              <span className="text-gray-500 text-[10px] ml-1">✕</span>
            </div>
          ))}
        </div>
      )}

      {/* LLM 에러 배너 — 자연스러운 에러 메시지 + 신고 버튼 */}
      {errorBanner && (
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
        </div>
      )}
    </>
  )
}
