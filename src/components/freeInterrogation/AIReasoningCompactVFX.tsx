import type { AIReasoningCutscenePayload } from './AIReasoningCutscene'
import { useI18n, type LocaleCode } from '../../i18n'

interface Props {
  payload: AIReasoningCutscenePayload
}

const AI_REASONING_COMPACT_COPY = {
  ko: {
    title: '질문 분석',
    target: '대상',
    intent: '의도',
    dispute: '쟁점',
    evidence: '증거',
    done: '질문 경로 확정',
  },
  en: {
    title: 'Question Analysis',
    target: 'Target',
    intent: 'Intent',
    dispute: 'Dispute',
    evidence: 'Evidence',
    done: 'Question route confirmed',
  },
  ja: {
    title: '質問分析',
    target: '対象',
    intent: '意図',
    dispute: '争点',
    evidence: '証拠',
    done: '質問ルート確定',
  },
  'zh-CN': {
    title: '问题分析',
    target: '对象',
    intent: '意图',
    dispute: '争议点',
    evidence: '证据',
    done: '问题路径已确认',
  },
} as const satisfies Record<LocaleCode, Record<string, string>>

export default function AIReasoningCompactVFX({ payload }: Props) {
  const { locale } = useI18n()
  const copy = AI_REASONING_COMPACT_COPY[locale]
  const chipList = [
    { key: 'target', title: copy.target, chip: payload.chips.target },
    { key: 'intent', title: copy.intent, chip: payload.chips.intent },
    { key: 'dispute', title: copy.dispute, chip: payload.chips.dispute },
    payload.chips.evidence ? { key: 'evidence', title: copy.evidence, chip: payload.chips.evidence } : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item))

  return (
    <div className="ai-rc ai-rc--compact" role="status" aria-live="polite" aria-label={copy.title}>
      <div className="ai-rc-compact__rail">
        <span className="ai-rc-compact__status">{copy.title}</span>
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
        <span className="ai-rc-compact__done">{copy.done}</span>
      </div>
    </div>
  )
}
