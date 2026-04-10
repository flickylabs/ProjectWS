import { registerV3GameLoopData } from '../../engine/v3GameLoopLoader'
import { Headline02V3GameLoopData } from '../../../docs/ref/리뉴얼참고/headline-02-v3-game-loop-data'

export function registerHeadline02Data(): void {
  console.log('[Renewal] headline-02 데이터 등록 시작')
  registerV3GameLoopData(Headline02V3GameLoopData as any)
  console.log('[Renewal] headline-02 등록 완료: V3 GameLoop')
}
