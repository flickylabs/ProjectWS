import { registerV3GameLoopData } from '../../engine/v3GameLoopLoader'
import { Headline01V3GameLoopData } from '../../../docs/ref/리뉴얼참고/headline-01-v3-game-loop-data'

export function registerHeadline01Data(): void {
  console.log('[Renewal] headline-01 data registration start')
  registerV3GameLoopData(Headline01V3GameLoopData as any)
  console.log('[Renewal] headline-01 registration complete: V3 GameLoop')
}
