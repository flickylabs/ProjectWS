import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './pc.css'
import PCApp from './PCApp'
import ErrorBoundary from '../components/layout/ErrorBoundary'
import ToastContainer from '../components/common/Toast'
import PCPrototypeStyle from '../components/pc/prototype/PCPrototypeStyle'
import PCSvgDefs from '../components/pc/icons/PCSvgDefs'
import EventFeedbackCard from '../components/pc/feedback/EventFeedbackCard'
import MinorFeedbackStream from '../components/pc/feedback/MinorFeedbackStream'

// PC 모드 — body 클래스 추가
document.body.classList.add('pc-mode')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PCPrototypeStyle />
      <PCSvgDefs />
      <PCApp />
      <ToastContainer />
      <EventFeedbackCard />
      <MinorFeedbackStream />
    </ErrorBoundary>
  </StrictMode>,
)
