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
import ResonanceLayer from '../components/pc/observation/ResonanceLayer'
import { bucketFromPreset, readStoredPreset } from '../utils/screenPresets'

// PC 모드 — body 클래스 추가
document.body.classList.add('pc-mode')

// 해상도 프리셋 bucket을 React 첫 렌더 전에 동기적으로 반영
// (hook의 useLayoutEffect가 적용되기 전이라도 CSS는 바로 분기되어야 함)
{
  const initialPreset = readStoredPreset()
  const initialBucket = bucketFromPreset(initialPreset, window.innerHeight)
  document.body.dataset.screenBucket = initialBucket
  document.body.dataset.screenPreset = initialPreset
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PCPrototypeStyle />
      <PCSvgDefs />
      <PCApp />
      <ToastContainer />
      <EventFeedbackCard />
      <ResonanceLayer />
    </ErrorBoundary>
  </StrictMode>,
)
