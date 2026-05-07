import { useEffect, useMemo } from 'react'
import type { ClearanceCategory, ClearanceResult } from '../../../types'
import { useI18n } from '../../../i18n'
import {
  formatCountSuffix,
  getClearanceCategoryLabel,
  getClearanceItemLabel,
  getMissedConnectionKindLabel,
} from './resultCopy'

interface Props {
  result: ClearanceResult
  onClose: () => void
}

const CATEGORY_ORDER: ClearanceCategory[] = [
  'evidence',
  'combination',
  'witness',
  'interrogation',
  'dispute',
]

function buildMissedConnectionHints(result: ClearanceResult, locale: ReturnType<typeof useI18n>['locale']) {
  const counts = result.missedConnections.reduce((acc, connection) => {
    if (connection.label.startsWith('자동 조합')) {
      acc.auto += 1
    } else if (connection.label.startsWith('수동 조합')) {
      acc.manual += 1
    } else {
      acc.other += 1
    }
    return acc
  }, { auto: 0, manual: 0, other: 0 })

  const hints = [
    counts.auto > 0 ? { id: 'auto' as const, label: getMissedConnectionKindLabel('auto', locale), count: counts.auto } : null,
    counts.manual > 0 ? { id: 'manual' as const, label: getMissedConnectionKindLabel('manual', locale), count: counts.manual } : null,
    counts.other > 0 ? { id: 'other' as const, label: getMissedConnectionKindLabel('other', locale), count: counts.other } : null,
  ]
  return hints.filter((item): item is NonNullable<typeof hints[number]> => item !== null)
}

export default function PCClearanceDetailPopup({ result, onClose }: Props) {
  const { locale } = useI18n()
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const groupedItems = useMemo(() => {
    const groups = CATEGORY_ORDER
      .map((category) => ({
        category,
        label: getClearanceCategoryLabel(category, locale),
        items: result.items.filter((item) => item.category === category),
      }))
      .filter((group) => group.items.length > 0)

    return groups
  }, [locale, result.items])

  const missedConnectionHints = useMemo(() => buildMissedConnectionHints(result, locale), [locale, result])

  return (
    <div className="pc-clearance-popup" role="dialog" aria-modal="true" aria-label={locale === 'en' ? 'Clearance Details' : locale === 'ja' ? '達成率詳細' : locale === 'zh-CN' ? '完成率详情' : '클리어율 상세'}>
      <div className="pc-clearance-popup__backdrop" onClick={onClose} />
      <section className="pc-clearance-popup__panel" onClick={(event) => event.stopPropagation()}>
        <header className="pc-clearance-popup__header">
          <div>
            <div className="pc-clearance-popup__eyebrow">CLEARANCE REPORT</div>
            <h2>{locale === 'en' ? 'Clearance Details' : locale === 'ja' ? '達成率詳細' : locale === 'zh-CN' ? '完成率详情' : '클리어율 상세'}</h2>
          </div>
          <button className="pc-clearance-popup__close" onClick={onClose} type="button" aria-label={locale === 'en' ? 'Close' : locale === 'ja' ? '閉じる' : locale === 'zh-CN' ? '关闭' : '닫기'}>
            ×
          </button>
        </header>

        <div className="pc-clearance-popup__summary">
          <div className="pc-clearance-popup__summary-score">
            <strong>{result.percent}%</strong>
            <span>
              {locale === 'en' ? `${result.achieved} / ${result.total} items achieved`
                : locale === 'ja' ? `${result.achieved} / ${result.total}項目達成`
                  : locale === 'zh-CN' ? `${result.achieved} / ${result.total}项已达成`
                    : `${result.achieved} / ${result.total} 항목 달성`}
            </span>
          </div>
          <p>
            {locale === 'en' ? 'Fill every checklist item and clear the remaining links to reach 100%.'
              : locale === 'ja' ? 'すべてのチェック項目を満たし、残った接続をなくすと100%達成です。'
                : locale === 'zh-CN' ? '完成全部清单并消除剩余连接后即可达到100%。'
                  : '모든 체크리스트를 채우고 남은 연결 고리를 없애면 100% 클리어입니다.'}
          </p>
        </div>

        <div className="pc-clearance-popup__body">
          {groupedItems.map((group) => (
            <section className="pc-clearance-popup__section" key={group.category}>
              <h3>{group.label}</h3>
              <div className="pc-clearance-popup__list">
                {group.items.map((item) => (
                  <div className={`pc-clearance-popup__item${item.achieved ? ' is-achieved' : ''}`} key={item.id}>
                    <span className="pc-clearance-popup__item-mark">{item.achieved ? '✓' : '○'}</span>
                    <span className="pc-clearance-popup__item-label">{getClearanceItemLabel(item.id, item.label, locale)}</span>
                    <strong className="pc-clearance-popup__item-progress">{item.current}/{item.target}</strong>
                  </div>
                ))}
              </div>
            </section>
          ))}

          <section className="pc-clearance-popup__section">
            <h3>{locale === 'en' ? 'Missed Links' : locale === 'ja' ? '見逃した接続' : locale === 'zh-CN' ? '遗漏的连接' : '놓친 연결 고리'}</h3>
            {missedConnectionHints.length > 0 ? (
              <div className="pc-clearance-popup__list">
                {missedConnectionHints.map((hint) => (
                  <div className="pc-clearance-popup__item is-missed" key={hint.id}>
                    <span className="pc-clearance-popup__item-mark">?</span>
                    <span className="pc-clearance-popup__item-label">{hint.label}</span>
                    <strong className="pc-clearance-popup__item-progress">{formatCountSuffix(hint.count, locale)}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p className="pc-clearance-popup__empty">
                {locale === 'en' ? 'No missed combinations.'
                  : locale === 'ja' ? '見逃した組み合わせはありません。'
                    : locale === 'zh-CN' ? '没有遗漏的组合。'
                      : '놓친 조합이 없습니다.'}
              </p>
            )}
          </section>
        </div>

        <footer className="pc-clearance-popup__footer">
          <button className="pc-clearance-popup__button" onClick={onClose} type="button">
            {locale === 'en' ? 'Close' : locale === 'ja' ? '閉じる' : locale === 'zh-CN' ? '关闭' : '닫기'}
          </button>
        </footer>
      </section>
    </div>
  )
}
