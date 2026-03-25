/**
 * 캠페인 10 Stage 정의.
 * 각 Stage는 관계 유형, 허용 모듈 풀, 학습 목표를 가진다.
 */

export interface StageDefinition {
  stage: number
  title: string
  relationshipType: string
  description: string
  learningGoal: string
  allowedConflictSeeds: string[]
  allowedVariableModules: string[]
  allowedTwists: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  features: string[] // 이 Stage에서 새로 해금되는 기능
  minScore: number   // 다음 Stage 해금 조건
}

export const CAMPAIGN_STAGES: StageDefinition[] = [
  {
    stage: 1,
    title: '이웃 관계',
    relationshipType: 'neighbor',
    description: '층간소음과 주차 갈등. 가장 단순한 분쟁.',
    learningGoal: '거짓말 vs 오인 구분, 단순 증거, 질문 6종 기초',
    allowedConflictSeeds: ['CS-3'],
    allowedVariableModules: [],
    allowedTwists: [],
    difficulty: 'easy',
    features: ['질문 6종', '증거 제시', '사실 인정'],
    minScore: 30,
  },
  {
    stage: 2,
    title: '부부 관계',
    relationshipType: 'spouse',
    description: '감정과 사실이 뒤얽힌 관계.',
    learningGoal: '감정 발언과 사실 발언 분리, 공감 질문 도입',
    allowedConflictSeeds: ['CS-1', 'CS-4'],
    allowedVariableModules: ['VM-C'],
    allowedTwists: [],
    difficulty: 'easy',
    features: ['공감 질문', '행동 징후'],
    minScore: 35,
  },
  {
    stage: 3,
    title: '직장 관계',
    relationshipType: 'boss_employee',
    description: '문서와 기록이 중요한 분쟁.',
    learningGoal: '타임라인 재구성, 기록 증거, 증거 완전성',
    allowedConflictSeeds: ['CS-2'],
    allowedVariableModules: ['VM-B'],
    allowedTwists: [],
    difficulty: 'medium',
    features: ['증거 완전성', '메타데이터 조사'],
    minScore: 40,
  },
  {
    stage: 4,
    title: '동업자 관계',
    relationshipType: 'partnership',
    description: '돈과 신뢰가 엮인 분쟁.',
    learningGoal: '공동 책임 판정, 중재안',
    allowedConflictSeeds: ['CS-1', 'CS-6'],
    allowedVariableModules: ['VM-D'],
    allowedTwists: [],
    difficulty: 'medium',
    features: ['중재안 Phase', '책임 배분'],
    minScore: 45,
  },
  {
    stage: 5,
    title: '가족 관계',
    relationshipType: 'family',
    description: '과거와 감정이 겹치는 분쟁.',
    learningGoal: '과거 이력 활용, 수치심 동기, 신뢰 루트',
    allowedConflictSeeds: ['CS-1', 'CS-4'],
    allowedVariableModules: ['VM-E'],
    allowedTwists: [],
    difficulty: 'medium',
    features: ['신뢰/보호 행동', '비공개 진술', '편향 디렉터 활성화'],
    minScore: 50,
  },
  {
    stage: 6,
    title: '세입자-집주인',
    relationshipType: 'tenant_landlord',
    description: '계약과 증거 정당성이 핵심.',
    learningGoal: '증거 정당성, 위법 취득 증거',
    allowedConflictSeeds: ['CS-3', 'CS-6'],
    allowedVariableModules: ['VM-B'],
    allowedTwists: [],
    difficulty: 'medium',
    features: ['증거 정당성 판단', '출처 질문'],
    minScore: 50,
  },
  {
    stage: 7,
    title: '이웃 (심화)',
    relationshipType: 'neighbor',
    description: '제3자와 반전이 등장하는 이웃 분쟁.',
    learningGoal: '제3자 소환, 목격 진술 신뢰도',
    allowedConflictSeeds: ['CS-3'],
    allowedVariableModules: ['VM-A'],
    allowedTwists: ['TW-1'],
    difficulty: 'hard',
    features: ['제3자 소환', '피해자 반전'],
    minScore: 55,
  },
  {
    stage: 8,
    title: '직장 (심화)',
    relationshipType: 'boss_employee',
    description: '증거 부족과 희생 진술이 등장.',
    learningGoal: '하드 증거 부족 상황, LT-7 희생 진술',
    allowedConflictSeeds: ['CS-5'],
    allowedVariableModules: ['VM-C', 'VM-D'],
    allowedTwists: ['TW-3'],
    difficulty: 'hard',
    features: ['부분 해결 사건', '희생 진술 감지'],
    minScore: 55,
  },
  {
    stage: 9,
    title: '가족 (심화)',
    relationshipType: 'family',
    description: '공유 오해와 배후 반전.',
    learningGoal: 'TW-6 공유 오해, 신뢰 루트 필수',
    allowedConflictSeeds: ['CS-1', 'CS-4'],
    allowedVariableModules: ['VM-A', 'VM-E'],
    allowedTwists: ['TW-2', 'TW-6'],
    difficulty: 'hard',
    features: ['공유 오해 반전', '복합 중재안'],
    minScore: 60,
  },
  {
    stage: 10,
    title: '최종 시험',
    relationshipType: '', // 자유 선택
    description: '모든 시스템을 총동원하는 복합 사건.',
    learningGoal: '전체 시스템 종합',
    allowedConflictSeeds: ['CS-1', 'CS-2', 'CS-3', 'CS-4', 'CS-5', 'CS-6'],
    allowedVariableModules: ['VM-A', 'VM-B', 'VM-C', 'VM-D', 'VM-E'],
    allowedTwists: ['TW-1', 'TW-2', 'TW-3', 'TW-4', 'TW-5', 'TW-6'],
    difficulty: 'hard',
    features: ['부분 해결 필수', '편향 역이용 필수'],
    minScore: 0,
  },
]

// 캠페인 진행 상태
export interface CampaignProgress {
  currentStage: number
  stageScores: Record<number, number> // stage -> best score
  unlockedStages: number[]
}

const CAMPAIGN_STORAGE_KEY = 'solomon-campaign'

export function loadCampaignProgress(): CampaignProgress {
  try {
    const raw = localStorage.getItem(CAMPAIGN_STORAGE_KEY)
    if (!raw) return { currentStage: 1, stageScores: {}, unlockedStages: [1] }
    return JSON.parse(raw)
  } catch {
    return { currentStage: 1, stageScores: {}, unlockedStages: [1] }
  }
}

export function saveCampaignProgress(progress: CampaignProgress) {
  localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(progress))
}

export function completeStage(stage: number, score: number): CampaignProgress {
  const progress = loadCampaignProgress()
  const def = CAMPAIGN_STAGES.find((s) => s.stage === stage)

  // 최고 점수 갱신
  if (!progress.stageScores[stage] || score > progress.stageScores[stage]) {
    progress.stageScores[stage] = score
  }

  // 다음 Stage 해금
  if (def && score >= def.minScore && stage < 10) {
    const nextStage = stage + 1
    if (!progress.unlockedStages.includes(nextStage)) {
      progress.unlockedStages.push(nextStage)
    }
  }

  saveCampaignProgress(progress)
  return progress
}
