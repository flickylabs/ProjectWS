import { useState, useRef, useEffect } from 'react'
import Emoji from '../common/Emoji'

const INTRO_KEY = 'solomon-intro-seen'

const slides = [
  {
    icon: '⚖️',
    title: '솔로몬',
    body: '현대판 솔로몬이 되어\n판결을 내려보세요!',
  },
  {
    icon: null,
    title: null,
    body: '사람들 사이의 갈등 —\n누가 옳고 누가 그른지,\n답은 단순하지 않습니다.',
  },
  {
    icon: null,
    title: null,
    body: '심문하고, 증거를 들이밀고,\n숨겨진 진실을 밝혀내세요.',
  },
  {
    icon: null,
    title: null,
    body: '당신의 첫 번째 사건이\n기다리고 있습니다.',
    cta: true,
  },
]

export function hasSeenIntro(): boolean {
  return localStorage.getItem(INTRO_KEY) === 'true'
}

export function markIntroSeen(): void {
  localStorage.setItem(INTRO_KEY, 'true')
}

interface Props {
  onComplete: () => void
}

export default function IntroSlides({ onComplete }: Props) {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const goNext = () => {
    if (current < slides.length - 1) setCurrent(current + 1)
  }
  const goPrev = () => {
    if (current > 0) setCurrent(current - 1)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext()
      else goPrev()
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    if (x > rect.width / 2) goNext()
    else goPrev()
  }

  const handleStart = () => {
    markIntroSeen()
    onComplete()
  }

  // keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Enter' && current === slides.length - 1) handleStart()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })

  const slide = slides[current]

  return (
    <div
      ref={containerRef}
      className="h-[100dvh] bg-gray-950 text-gray-100 max-w-lg mx-auto flex flex-col select-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      {/* skip button */}
      <div className="flex justify-end px-5 pt-5">
        {current < slides.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleStart()
            }}
            className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
          >
            건너뛰기
          </button>
        )}
      </div>

      {/* slide content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="text-center space-y-5 transition-opacity duration-300">
          {slide.icon && (
            <div className="text-7xl mb-2 animate-pulse"><Emoji char={slide.icon} size={64} /></div>
          )}
          {slide.title && (
            <h1 className="text-3xl font-bold text-amber-400 tracking-tight font-[Pretendard]">
              {slide.title}
            </h1>
          )}
          <p className="text-base text-gray-300 leading-relaxed whitespace-pre-line font-[Pretendard]">
            {slide.body}
          </p>
          {slide.cta && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleStart()
              }}
              className="mt-6 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-950 font-bold py-3.5 px-10 rounded-xl transition-all shadow-lg shadow-amber-600/20 active:scale-95 text-base"
            >
              재판 시작 →
            </button>
          )}
        </div>
      </div>

      {/* dots */}
      <div className="flex justify-center gap-2 pb-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              setCurrent(i)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current
                ? 'bg-amber-400 w-6'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
