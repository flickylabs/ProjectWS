import type { AIReasoningCutscenePayload } from './AIReasoningCutscene'

interface Props {
  payload: AIReasoningCutscenePayload
}

export default function AIReasoningCompactVFX({ payload }: Props) {
  const chipList = [
    { key: 'target', title: '대상', chip: payload.chips.target },
    { key: 'intent', title: '의도', chip: payload.chips.intent },
    { key: 'dispute', title: '쟁점', chip: payload.chips.dispute },
    payload.chips.evidence ? { key: 'evidence', title: '증거', chip: payload.chips.evidence } : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <div className="ai-rc ai-rc--compact" role="status" aria-live="polite">
      <div className="ai-rc-compact__rail">
        <span className="ai-rc-compact__status">질문 분석</span>
        <div className="ai-rc-compact__chips">
          {chipList.map((item) => (
            <span
              className={`ai-rc-chip ai-rc-chip--${item.key}`}
              data-ai-cutscene-chip={item.key}
              key={item.key}
            >
              <span className="ai-rc-chip__title">{item.title}</span>
              <strong>{item.chip.label}</strong>
            </span>
          ))}
        </div>
        <span className="ai-rc-compact__done">질문 경로 확정</span>
      </div>
    </div>
  )
}
