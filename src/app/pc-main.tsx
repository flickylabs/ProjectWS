import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './pc.css'
import PCApp from './PCApp'
import ErrorBoundary from '../components/layout/ErrorBoundary'
import ToastContainer from '../components/common/Toast'

// PC 모드 — body 클래스 추가
document.body.classList.add('pc-mode')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PCApp />
      <ToastContainer />
    </ErrorBoundary>
  </StrictMode>,
)
