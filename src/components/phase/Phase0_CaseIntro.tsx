import { useGameStore } from '../../store/useGameStore'
import { GamePhase } from '../../types'

export default function Phase0_CaseIntro() {
  const caseData = useGameStore((s) => s.caseData)
  const advancePhase = useGameStore((s) => s.advancePhase)

  if (!caseData) return null

  const { duo, context } = caseData

  return (
    <div className="flex flex-col h-full overflow-y-auto max-w-lg mx-auto">
      {/* 히어로 영역 — 그라데이션 배경 */}
      <div className="relative px-5 pt-8 pb-6 bg-gradient-to-b from-amber-950/30 via-gray-950 to-gray-950">
        <div className="text-center space-y-1">
          <div className="text-amber-500/80 text-xs font-semibold tracking-[0.2em] uppercase">사건 개요</div>
          <div className="text-xs text-gray-600">{getRelationLabel(duo.relationshipType)}</div>
        </div>

        {/* VS 인물 카드 */}
        <div className="flex items-stretch gap-3 mt-5">
          <PersonCard
            name={duo.partyA.name}
            age={duo.partyA.age}
            occupation={duo.partyA.occupation}
            trait={getArchetypeLabel(duo.partyA.archetype)}
            emoji="👨"
            color="blue"
          />
          <div className="flex flex-col items-center justify-center shrink-0 w-8">
            <div className="w-px h-6 bg-gradient-to-b from-blue-600 to-transparent" />
            <div className="text-xs font-black text-gray-500 my-1">VS</div>
            <div className="w-px h-6 bg-gradient-to-b from-transparent to-rose-600" />
          </div>
          <PersonCard
            name={duo.partyB.name}
            age={duo.partyB.age}
            occupation={duo.partyB.occupation}
            trait={getArchetypeLabel(duo.partyB.archetype)}
            emoji="👩"
            color="rose"
          />
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="px-4 pb-6 space-y-3">
        {/* 배경 상황 */}
        <InfoSection icon="📍" title="배경 상황">
          <p className="text-sm text-gray-300 leading-relaxed">{context.description}</p>
        </InfoSection>

        {/* 쟁점 */}
        <InfoSection icon="⚡" title={`쟁점 (${caseData.disputes.length}개)`}>
          <div className="flex flex-wrap gap-1.5">
            {caseData.disputes.map((d) => (
              <span key={d.id} className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                d.weight === 'high' ? 'bg-red-500/15 text-red-400 ring-1 ring-red-500/20' :
                d.weight === 'medium' ? 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/20' :
                'bg-gray-500/15 text-gray-400 ring-1 ring-gray-500/20'
              }`}>{d.name}</span>
            ))}
          </div>
        </InfoSection>

        {/* 관계 이력 */}
        {duo.relationshipLedger.length > 0 && (
          <InfoSection icon="📂" title="과거 이력">
            <div className="space-y-2">
              {duo.relationshipLedger
                .filter((l) => caseData.activeLedgerEntries.includes(l.id) || l.connectionToCurrent === 'direct')
                .slice(0, 2)
                .map((l) => (
                  <div key={l.id} className="flex items-start gap-2 text-xs">
                    <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      l.category === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400' :
                      l.category === 'distorted' ? 'bg-amber-500/15 text-amber-400' :
                      'bg-gray-500/15 text-gray-400'
                    }`}>{l.category === 'confirmed' ? '✓' : l.category === 'distorted' ? '?' : '…'}</span>
                    <span className="text-gray-400 leading-relaxed">{l.description}</span>
                  </div>
                ))}
            </div>
          </InfoSection>
        )}

        {/* 관련 인물 */}
        {duo.socialGraph.length > 0 && (
          <InfoSection icon="👥" title="관련 인물">
            <div className="flex flex-wrap gap-2">
              {duo.socialGraph.slice(0, 3).map((tp) => (
                <div key={tp.id} className="flex items-center gap-1.5 text-xs bg-gray-800/60 ring-1 ring-gray-700/50 rounded-full px-3 py-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    tp.bias === 'pro_a' ? 'bg-blue-400' :
                    tp.bias === 'pro_b' ? 'bg-rose-400' : 'bg-gray-400'
                  }`} />
                  <span className="text-gray-300">{tp.name}</span>
                </div>
              ))}
            </div>
          </InfoSection>
        )}

        {/* 시작 버튼 */}
        <div className="pt-3 text-center">
          <button
            onClick={() => advancePhase(GamePhase.Phase1_InitialStatement)}
            className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-950 font-bold px-10 py-3 rounded-xl transition-all shadow-lg shadow-amber-600/20 active:scale-95"
          >
            초기 진술 듣기 →
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoSection({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-900/60 border border-gray-800/60 rounded-xl p-3.5">
      <div className="flex items-center gap-1.5 mb-2.5">
        <span className="text-sm">{icon}</span>
        <span className="text-xs font-semibold text-gray-300">{title}</span>
      </div>
      {children}
    </div>
  )
}

function PersonCard({ name, age, occupation, trait, emoji, color }: {
  name: string; age: number; occupation: string; trait: string; emoji: string; color: string
}) {
  const ring = color === 'blue' ? 'ring-blue-500/40' : 'ring-rose-500/40'
  const bg = color === 'blue' ? 'bg-blue-950/40' : 'bg-rose-950/40'
  const nameColor = color === 'blue' ? 'text-blue-400' : 'text-rose-400'
  const gradient = color === 'blue' ? 'from-blue-600/20 to-transparent' : 'from-rose-600/20 to-transparent'

  return (
    <div className={`flex-1 rounded-xl p-3 ring-1 ${ring} ${bg} bg-gradient-to-b ${gradient}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-10 h-10 rounded-full bg-gray-800 ring-2 ${ring} flex items-center justify-center text-lg`}>
          {emoji}
        </div>
        <div>
          <div className={`text-sm font-bold ${nameColor}`}>{name}</div>
          <div className="text-xs text-gray-500">{age}세</div>
        </div>
      </div>
      <div className="text-xs text-gray-400">{occupation}</div>
      <div className="text-xs text-gray-500 mt-0.5">{trait}</div>
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
