import { useEffect, useState } from 'react'
import PCSvgIcon from '../icons/PCSvgIcon'
import { markPcIntroSeen, PC_HOME_INTRO_SLIDES } from './pcHomeShared'

interface Props {
  onComplete: () => void
}

export default function PCIntroSlides({ onComplete }: Props) {
  const [index, setIndex] = useState(0)
  const slide = PC_HOME_INTRO_SLIDES[index]
  const isLast = index === PC_HOME_INTRO_SLIDES.length - 1

  const goPrev = () => setIndex((current) => Math.max(0, current - 1))
  const goNext = () => setIndex((current) => Math.min(PC_HOME_INTRO_SLIDES.length - 1, current + 1))

  const finish = () => {
    markPcIntroSeen()
    onComplete()
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        goPrev()
      }
      if (event.key === 'ArrowRight' || event.key === ' ') {
        event.preventDefault()
        if (isLast) finish()
        else goNext()
      }
      if (event.key === 'Enter' && isLast) {
        finish()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isLast])

  return (
    <section className="pc-intro">
      <div className="pc-intro__card">
        <header className="pc-intro__header">
          <div className="pc-intro__brand">
            <span className="pc-intro__brand-mark">
              <PCSvgIcon id="i-scale" size={28} />
            </span>
            <span className="pc-intro__brand-copy">COURT SIMULATION GAME</span>
          </div>

          <button className="pc-intro__skip" onClick={finish} type="button">
            건너뛰기
          </button>
        </header>

        <div className="pc-intro__body">
          <span className="pc-intro__kicker">{slide.kicker}</span>
          <h1>{slide.title}</h1>
          <p>{slide.body}</p>
        </div>

        <footer className="pc-intro__footer">
          <div className="pc-intro__dots">
            {PC_HOME_INTRO_SLIDES.map((_, dotIndex) => (
              <button
                aria-label={`intro-slide-${dotIndex + 1}`}
                className={`pc-intro__dot${dotIndex === index ? ' is-active' : ''}`}
                key={dotIndex}
                onClick={() => setIndex(dotIndex)}
                type="button"
              />
            ))}
          </div>

          <div className="pc-intro__actions">
            <button className="pc-intro__ghost" disabled={index === 0} onClick={goPrev} type="button">
              이전
            </button>
            <button className="pc-intro__primary" onClick={isLast ? finish : goNext} type="button">
              {isLast ? '로비 입장' : '다음'}
            </button>
          </div>
        </footer>
      </div>
    </section>
  )
}
