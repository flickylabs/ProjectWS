import { useGameStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'

export default function Phase0_CaseIntro() {
  const caseData = useGameStore((s) => s.caseData)
  const advancePhase = useGameStore((s) => s.advancePhase)

  if (!caseData) return null

  const { duo, context } = caseData

  return (
    <div className="flex flex-col items-center justify-start h-full px-4 py-6 overflow-y-auto max-w-lg mx-auto">
      <div className="w-full space-y-4">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <div className="text-amber-500 text-sm font-semibold tracking-widest">사건 개요</div>
          <h2 className="text-2xl font-bold">{duo.partyA.name} vs {duo.partyB.name}</h2>
          <div className="text-gray-500 text-sm">{getRelationLabel(duo.relationshipType)} · {context.contextType === 'holiday' ? '추석 직전' : context.description}</div>
        </div>

        {/* 인물 카드 */}
        <div className="grid grid-cols-2 gap-4">
          <PersonCard
            name={duo.partyA.name}
            age={duo.partyA.age}
            occupation={duo.partyA.occupation}
            trait={getArchetypeLabel(duo.partyA.archetype)}
            color="blue"
          />
          <PersonCard
            name={duo.partyB.name}
            age={duo.partyB.age}
            occupation={duo.partyB.occupation}
            trait={getArchetypeLabel(duo.partyB.archetype)}
            color="rose"
          />
        </div>

        {/* 배경 맥락 */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
          <div className="text-xs text-amber-500 font-semibold mb-2">배경 상황</div>
          <p className="text-sm text-gray-300 leading-relaxed">{context.description}</p>
        </div>

        {/* 쟁점 */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
          <div className="text-xs text-amber-500 font-semibold mb-2">쟁점 ({caseData.disputes.length}개)</div>
          <div className="flex flex-wrap gap-1.5">
            {caseData.disputes.map((d) => (
              <span key={d.id} className={`text-xs px-2 py-0.5 rounded-full ${
                d.weight === 'high' ? 'bg-red-900/40 text-red-400 border border-red-800/40' :
                d.weight === 'medium' ? 'bg-yellow-900/40 text-yellow-400 border border-yellow-800/40' :
                'bg-gray-700 text-gray-400 border border-gray-600'
              }`}>{d.name}</span>
            ))}
          </div>
        </div>

        {/* 관계 이력 힌트 (활성화된 것만) */}
        {duo.relationshipLedger.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
            <div className="text-xs text-amber-500 font-semibold mb-2">과거 이력</div>
            <div className="space-y-1.5">
              {duo.relationshipLedger
                .filter((l) => caseData.activeLedgerEntries.includes(l.id) || l.connectionToCurrent === 'direct')
                .slice(0, 2)
                .map((l) => (
                  <div key={l.id} className="text-xs text-gray-400 flex items-start gap-1.5">
                    <span className="shrink-0">{l.category === 'confirmed' ? '📌' : l.category === 'distorted' ? '🔄' : '🤐'}</span>
                    <span>{l.description}</span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* 제3자 힌트 */}
        {duo.socialGraph.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
            <div className="text-xs text-amber-500 font-semibold mb-2">관련 인물</div>
            <div className="flex flex-wrap gap-2">
              {duo.socialGraph.slice(0, 3).map((tp) => (
                <span key={tp.id} className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded">
                  {tp.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 시작 버튼 */}
        <div className="text-center">
          <button
            onClick={() => advancePhase(GamePhase.Phase1_InitialStatement)}
            className="bg-amber-600 hover:bg-amber-500 text-gray-950 font-bold px-8 py-3 rounded-lg transition-colors"
          >
            초기 진술 듣기 →
          </button>
        </div>
      </div>
    </div>
  )
}

function PersonCard({ name, age, occupation, trait, color }: {
  name: string; age: number; occupation: string; trait: string; color: string
}) {
  const borderColor = color === 'blue' ? 'border-blue-800' : 'border-rose-800'
  const textColor = color === 'blue' ? 'text-blue-400' : 'text-rose-400'
  return (
    <div className={`border ${borderColor} rounded-lg p-4 bg-gray-900/60`}>
      <div className={`font-bold ${textColor}`}>{name} <span className="text-gray-500 text-xs font-normal">({age}세)</span></div>
      <div className="text-xs text-gray-400 mt-1">{occupation}</div>
      <div className="text-xs text-gray-500 mt-1">성향: {trait}</div>
    </div>
  )
}

function getRelationLabel(type: string) {
  const map: Record<string, string> = {
    spouse: '부부', neighbor: '이웃', boss_employee: '직장', partnership: '동업',
    family: '가족', tenant_landlord: '세입자-집주인', friend: '친구',
  }
  return map[type] ?? type
}

function getArchetypeLabel(type: string) {
  const map: Record<string, string> = {
    avoidant: '회피형', confrontational: '정면돌파형', victim_cosplay: '피해자형', cold_logic: '냉정논리형',
  }
  return map[type] ?? type
}
