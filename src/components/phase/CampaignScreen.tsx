import { CAMPAIGN_STAGES, loadCampaignProgress, type StageDefinition } from '../../data/campaign'
import Emoji from '../common/Emoji'

interface Props {
  onSelectStage: (stage: StageDefinition) => void
  onBack: () => void
}

export default function CampaignScreen({ onSelectStage, onBack }: Props) {
  const progress = loadCampaignProgress()

  return (
    <div className="h-screen bg-gray-950 text-gray-100 max-w-lg mx-auto flex flex-col">
      <div className="px-4 pt-6 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-500 hover:text-white text-sm">← 뒤로</button>
        <h1 className="text-sm font-bold text-amber-400">캠페인 모드</h1>
        <div className="w-12" />
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2">
        {CAMPAIGN_STAGES.map((stage) => {
          const unlocked = progress.unlockedStages.includes(stage.stage)
          const bestScore = progress.stageScores[stage.stage]
          const completed = bestScore !== undefined

          return (
            <button
              key={stage.stage}
              disabled={!unlocked}
              onClick={() => unlocked && onSelectStage(stage)}
              className={`w-full text-left border rounded-lg p-3 transition-colors ${
                unlocked
                  ? completed
                    ? 'border-emerald-800 bg-emerald-950/20 hover:border-emerald-600'
                    : 'border-gray-700 bg-gray-800/50 hover:border-amber-600'
                  : 'border-gray-800 bg-gray-900/30 opacity-50 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    completed ? 'bg-emerald-800 text-emerald-300' :
                    unlocked ? 'bg-amber-800 text-amber-300' : 'bg-gray-800 text-gray-600'
                  }`}>
                    {stage.stage}
                  </span>
                  <span className="text-sm font-semibold text-gray-200">{stage.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${
                    stage.difficulty === 'easy' ? 'text-emerald-500' :
                    stage.difficulty === 'medium' ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                    {stage.difficulty}
                  </span>
                  {bestScore !== undefined && (
                    <span className="text-xs text-emerald-400 font-bold">{bestScore}점</span>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-500">{stage.description}</p>

              {unlocked && stage.features.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {stage.features.map((f) => (
                    <span key={f} className="text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">
                      {f}
                    </span>
                  ))}
                </div>
              )}

              {!unlocked && (
                <p className="text-xs text-gray-600 mt-1"><Emoji char="🔒" size={12} /> 이전 Stage를 완료하면 해금</p>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
