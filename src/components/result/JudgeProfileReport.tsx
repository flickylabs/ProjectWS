import { useMemo, useState, useCallback } from 'react'
import { loadDriftState, loadJudgePerks, saveJudgePerks } from '../../data/leaderboard'
import { deriveJudgeProfile, getThreshold, TITLE_LABELS, AXIS_LABELS, TIER_LABELS, LEVEL_LABELS } from '../../engine/judgeProfileEngine'
import type { AxisLevelState, JudgeProfile } from '../../engine/judgeProfileEngine'
import { getAvailablePerks, axisToLevel } from '../../engine/judgePerks'
import type { PerkId, PerkDefinition } from '../../engine/judgePerks'
import JudgeProfileCard from './JudgeProfileCard'

/** 7단계 레벨 바: -3 ~ +3, progress 표시 포함 */
function LevelBar({ label, axisState, negLabel, posLabel }: {
  label: string
  axisState: AxisLevelState
  negLabel: string
  posLabel: string
}) {
  const { level, progress } = axisState
  const absLevel = Math.abs(level)
  const threshold = absLevel < 3 ? getThreshold(absLevel) : getThreshold(2)
  const progressPct = absLevel >= 3 ? 100 : (progress / threshold) * 100

  // 레벨 위치: -3~+3 → 0~6 → 0%~100%
  const levelPct = ((level + 3) / 6) * 100

  const dirLabel = level !== 0
    ? (level < 0 ? negLabel : posLabel)
    : '균형'
  const levelText = LEVEL_LABELS[level] ?? '균형'
  const displayText = level === 0 ? '균형' : `${dirLabel} ${levelText}`

  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>{label}</span>
        <span className={level < 0 ? 'text-blue-400' : level > 0 ? 'text-amber-400' : 'text-gray-400'}>
          Lv{level > 0 ? '+' : ''}{level} ({displayText})
        </span>
      </div>
      {/* 7단계 레벨 바 */}
      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden">
        {/* 단계 구분선 */}
        {[1, 2, 3, 4, 5].map(i => (
          <div
            key={i}
            className="absolute top-0 h-full w-px bg-gray-700 z-10"
            style={{ left: `${(i / 6) * 100}%` }}
          />
        ))}
        {/* 중앙선 (Lv0) */}
        <div className="absolute left-1/2 top-0 h-full w-px bg-gray-500 z-10" />
        {/* 레벨 채움 */}
        {level < 0 && (
          <div
            className="absolute top-0 h-full bg-blue-500/60"
            style={{ left: `${levelPct}%`, width: `${50 - levelPct}%` }}
          />
        )}
        {level > 0 && (
          <div
            className="absolute top-0 h-full bg-amber-500/60"
            style={{ left: '50%', width: `${levelPct - 50}%` }}
          />
        )}
        {/* 현재 위치 마커 */}
        <div
          className="absolute top-0 h-full w-1.5 bg-white rounded-full z-20 shadow"
          style={{ left: `calc(${levelPct}% - 3px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 mt-0.5">
        <span>-3 {negLabel}</span>
        <span>{posLabel} +3</span>
      </div>
      {/* progress 바 (Lv3 미만일 때만) */}
      {absLevel < 3 && (
        <div className="mt-1">
          <div className="flex justify-between text-[10px] text-gray-600 mb-0.5">
            <span>다음 단계까지</span>
            <span>{progress}/{threshold}</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${level < 0 ? 'bg-blue-400/40' : level > 0 ? 'bg-amber-400/40' : 'bg-gray-500/40'}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

/** 퍼크 선택 카드 */
function PerkSelector({ tier, profile, currentPerkId, onSelect }: {
  tier: 'major' | 'minor'
  profile: JudgeProfile
  currentPerkId: PerkId | null
  onSelect: (perkId: PerkId | null) => void
}) {
  const levels = useMemo(() => ({
    inquiry: axisToLevel(profile.inquiryAxis),
    judgment: axisToLevel(profile.judgmentAxis),
    resolution: axisToLevel(profile.resolutionAxis),
  }), [profile.inquiryAxis, profile.judgmentAxis, profile.resolutionAxis])

  const available = useMemo(
    () => getAvailablePerks(levels, tier),
    [levels, tier],
  )

  if (available.length === 0) {
    return (
      <div className="text-xs text-gray-600 text-center py-2">
        {tier === 'major' ? '메이저' : '마이너'} 퍼크 해금 조건 미달 (축 Lv{tier === 'major' ? 3 : 2} 이상 필요)
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      {available.map((perk: PerkDefinition) => {
        const isActive = currentPerkId === perk.id
        return (
          <button
            key={perk.id}
            onClick={() => onSelect(isActive ? null : perk.id)}
            className={`w-full text-left px-3 py-2 rounded-lg border transition-colors text-xs ${
              isActive
                ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:border-gray-600 hover:text-gray-300'
            }`}
          >
            <div className="font-semibold">{perk.name}</div>
            <div className="text-[10px] mt-0.5 opacity-80">{perk.description}</div>
          </button>
        )
      })}
    </div>
  )
}

export default function JudgeProfileReport() {
  const [showCard, setShowCard] = useState(false)

  const { profile, driftState, totalGames, savedPerks } = useMemo(() => {
    const drift = loadDriftState()
    const perks = loadJudgePerks()
    const prof = deriveJudgeProfile(drift, undefined, {
      major: perks.major as PerkId | null,
      minor: perks.minor as PerkId | null,
    })

    return {
      profile: prof,
      driftState: drift,
      totalGames: drift.casesProcessed,
      savedPerks: perks,
    }
  }, [])

  const [majorPerk, setMajorPerk] = useState<PerkId | null>(savedPerks.major as PerkId | null)
  const [minorPerk, setMinorPerk] = useState<PerkId | null>(savedPerks.minor as PerkId | null)

  const handleMajorSelect = useCallback((id: PerkId | null) => {
    setMajorPerk(id)
    saveJudgePerks(id, minorPerk)
  }, [minorPerk])

  const handleMinorSelect = useCallback((id: PerkId | null) => {
    setMinorPerk(id)
    saveJudgePerks(majorPerk, id)
  }, [majorPerk])

  const titleInfo = TITLE_LABELS[profile.titleId] ?? TITLE_LABELS.neutral_observer
  const tierInfo = TIER_LABELS[profile.tier]

  // 퍼크 해금 조건
  const canSelectMinor = profile.tier === 'regular' || profile.tier === 'veteran' || profile.tier === 'senior' || profile.tier === 'legendary'
  const canSelectMajor = profile.tier === 'veteran' || profile.tier === 'senior' || profile.tier === 'legendary'

  return (
    <div className="space-y-5">
      {/* 칭호 */}
      <div className="text-center">
        <div className="text-lg font-bold text-amber-300">{titleInfo.name}</div>
        <div className="text-xs text-gray-400 mt-0.5">{titleInfo.subtitle}</div>
        {profile.subtags.length > 0 && (
          <div className="flex justify-center gap-1.5 mt-2">
            {profile.subtags.map(tag => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 등급 표시 */}
      <div className="text-center">
        <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
          {tierInfo.emoji} {tierInfo.name} ({profile.casesCompleted}건)
          {profile.isStabilized && <span className="ml-1 text-green-400">안정</span>}
        </span>
      </div>

      {/* 3축 레벨 게이지 */}
      <div className="bg-gray-800/50 rounded-xl p-4">
        <div className="text-xs text-gray-400 mb-3 font-semibold">
          {totalGames > 1 ? `누적 성향 (${totalGames}건)` : '성향 분석'}
        </div>
        <LevelBar
          label={AXIS_LABELS.inquiry.label}
          axisState={driftState.inquiry}
          negLabel={AXIS_LABELS.inquiry.negative}
          posLabel={AXIS_LABELS.inquiry.positive}
        />
        <LevelBar
          label={AXIS_LABELS.judgment.label}
          axisState={driftState.judgment}
          negLabel={AXIS_LABELS.judgment.negative}
          posLabel={AXIS_LABELS.judgment.positive}
        />
        <LevelBar
          label={AXIS_LABELS.resolution.label}
          axisState={driftState.resolution}
          negLabel={AXIS_LABELS.resolution.negative}
          posLabel={AXIS_LABELS.resolution.positive}
        />
      </div>

      {/* 퍼크 선택 */}
      {(canSelectMinor || canSelectMajor) && (
        <div className="bg-gray-800/50 rounded-xl p-4">
          <div className="text-xs text-gray-400 mb-3 font-semibold">재판관 퍼크</div>

          {canSelectMajor && (
            <div className="mb-3">
              <div className="text-[10px] text-amber-400 mb-1.5 font-semibold">메이저 퍼크</div>
              <PerkSelector
                tier="major"
                profile={profile}
                currentPerkId={majorPerk}
                onSelect={handleMajorSelect}
              />
            </div>
          )}

          {canSelectMinor && (
            <div>
              <div className="text-[10px] text-blue-400 mb-1.5 font-semibold">마이너 퍼크</div>
              <PerkSelector
                tier="minor"
                profile={profile}
                currentPerkId={minorPerk}
                onSelect={handleMinorSelect}
              />
            </div>
          )}

          {!canSelectMajor && canSelectMinor && (
            <div className="text-[10px] text-gray-600 mt-2 text-center">
              메이저 퍼크는 숙련 등급(10건) 이상에서 해금
            </div>
          )}
        </div>
      )}

      {/* 아직 퍼크 미해금 */}
      {!canSelectMinor && !canSelectMajor && totalGames > 0 && (
        <div className="bg-gray-800/50 rounded-xl p-3 text-center">
          <div className="text-xs text-gray-500">
            퍼크는 정식 등급(5건 + 성향 안정화) 이상에서 해금됩니다
          </div>
          <div className="text-[10px] text-gray-600 mt-1">
            현재 {profile.casesCompleted}건 완료
            {profile.casesCompleted >= 5 && !profile.isStabilized && ' | 성향 안정화 필요'}
          </div>
        </div>
      )}

      {/* 프로필 카드 토글 */}
      <div className="text-center">
        <button
          onClick={() => setShowCard(v => !v)}
          className="text-xs px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
        >
          {showCard ? '카드 접기' : '프로필 카드 보기'}
        </button>
      </div>

      {showCard && <JudgeProfileCard profile={{ ...profile, majorPerk: majorPerk, minorPerk: minorPerk }} />}

      {/* 설명 */}
      <div className="text-xs text-gray-500 text-center leading-relaxed">
        {getProfileDescription(profile.titleId)}
      </div>
    </div>
  )
}

function getProfileDescription(titleId: string): string {
  const descriptions: Record<string, string> = {
    cold_judge: '증거와 논리를 중시하며, 엄격한 기준으로 공정한 판결을 내리는 타입입니다.',
    practical_analyst: '논리적 분석을 바탕으로 현실적인 해결책을 찾아내는 타입입니다.',
    balanced_sage: '논리적이면서도 관대한 시선으로 원칙을 지키는 타입입니다.',
    careful_mediator: '신중한 분석과 관용적 태도로 양측의 화해를 이끄는 타입입니다.',
    instinct_judge: '직관적 판단과 엄격한 원칙으로 정의를 추구하는 타입입니다.',
    passion_arbiter: '열정적인 공감과 단호한 판단으로 해결을 이끄는 타입입니다.',
    gentle_guardian: '따뜻한 공감과 관대한 시선으로 원칙을 수호하는 타입입니다.',
    warm_mediator: '공감과 이해를 바탕으로 양측 모두가 만족하는 화해를 추구하는 타입입니다.',
    neutral_observer: '편향 없이 균형 잡힌 시선으로 사건을 바라보는 타입입니다.',
  }
  return descriptions[titleId] ?? descriptions.neutral_observer
}
