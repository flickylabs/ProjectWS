import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import ErrorBoundary from '../components/layout/ErrorBoundary'
import ToastContainer from '../components/common/Toast'
import AIReasoningCutscene from '../components/freeInterrogation/AIReasoningCutscene'
import { I18nProvider } from '../i18n'

// PWA 서비스 워커 등록
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <I18nProvider>
        <App />
        <ToastContainer />
        <AIReasoningCutscene />
      </I18nProvider>
    </ErrorBoundary>
  </StrictMode>,
)
