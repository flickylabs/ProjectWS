/**
 * 보상 시스템.
 * 첫 플레이, 일일 접속, 별 3개 달성 등의 보상을 관리한다.
 */
import { useGameStore } from '../store/useGameStore'

interface RewardCondition {
  id: string
  label: string
  /** 보상 유형 */
  reward: { type: 'skill'; amount: number } | { type: 'invest'; amount: number }
  /** 달성 조건 체크 함수 */
  check: () => boolean
}

const REWARD_CONDITIONS: RewardCondition[] = [
  {
    id: 'first_play',
    label: '첫 사건 해결',
    reward: { type: 'skill', amount: 3 },
    check: () => {
      const history = JSON.parse(localStorage.getItem('solomon_history') ?? '[]')
      return history.length === 1 // 방금 첫 번째 완료
    },
  },
  {
    id: 'daily_login',
    label: '일일 접속 보상',
    reward: { type: 'invest', amount: 2 },
    check: () => {
      const lastLogin = localStorage.getItem('solomon_last_login')
      const today = new Date().toISOString().slice(0, 10)
      if (lastLogin === today) return false
      localStorage.setItem('solomon_last_login', today)
      return true
    },
  },
  {
    id: 'three_stars',
    label: '별 3개 달성',
    reward: { type: 'skill', amount: 1 },
    check: () => {
      // 직전 게임 결과가 3성인지 확인
      const store = useGameStore.getState()
      const verdict = store.verdictScore
      if (!verdict) return false
      const total = verdict.insight + verdict.authority + verdict.wisdom
      return total >= 85 // 85점 이상 = 3성
    },
  },
]

/** 게임 완료 후 보상 체크 및 지급 */
export function checkAndGrantRewards(): { id: string; label: string; amount: number; type: string }[] {
  const store = useGameStore.getState()
  const granted: { id: string; label: string; amount: number; type: string }[] = []

  // 이미 지급된 일회성 보상 추적
  const grantedIds: string[] = JSON.parse(localStorage.getItem('solomon_granted_rewards') ?? '[]')

  for (const cond of REWARD_CONDITIONS) {
    // 일일 보상은 매번 체크, 일회성은 중복 방지
    const isDaily = cond.id === 'daily_login'
    if (!isDaily && grantedIds.includes(cond.id)) continue

    if (cond.check()) {
      if (cond.reward.type === 'skill') {
        store.grantSkillReward(cond.reward.amount, cond.label)
      } else {
        // invest 보상
        const current = store.globalInvestTokens
        const max = store.freeCap
        const actual = Math.min(cond.reward.amount, max - current)
        if (actual > 0) {
          useGameStore.setState({ globalInvestTokens: current + actual })
        }
      }

      granted.push({ id: cond.id, label: cond.label, amount: cond.reward.amount, type: cond.reward.type })

      if (!isDaily) {
        grantedIds.push(cond.id)
        localStorage.setItem('solomon_granted_rewards', JSON.stringify(grantedIds))
      }
    }
  }

  return granted
}

/** 일일 접속 보상 체크 (앱 시작 시 호출) */
export function checkDailyLogin(): { granted: boolean; amount: number } {
  const lastLogin = localStorage.getItem('solomon_last_login')
  const today = new Date().toISOString().slice(0, 10)
  if (lastLogin === today) return { granted: false, amount: 0 }

  localStorage.setItem('solomon_last_login', today)
  const store = useGameStore.getState()
  const current = store.globalInvestTokens
  const max = store.freeCap
  const amount = Math.min(2, max - current)
  if (amount > 0) {
    useGameStore.setState({ globalInvestTokens: current + amount })
  }
  return { granted: true, amount }
}
