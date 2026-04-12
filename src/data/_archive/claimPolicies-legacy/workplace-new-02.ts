import { registerV3GameLoopData } from '../../engine/v3GameLoopLoader'
import workplaceNew02V3GameLoopData from '../../../docs/ref/리뉴얼참고/workplace-new-02-v3-game-loop-data.json'

export function registerWorkplaceNew02Data(): void {
  console.log('[Renewal] workplace-new-02 데이터 등록 시작')
  registerV3GameLoopData(workplaceNew02V3GameLoopData as any)
  console.log('[Renewal] workplace-new-02 등록 완료: V3 GameLoop')
}
