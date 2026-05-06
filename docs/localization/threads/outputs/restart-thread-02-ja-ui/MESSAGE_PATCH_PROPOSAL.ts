/**
 * Restart Thread 02 — JA UI Translation
 *
 * Japanese-only patch proposal for the current namespace message values.
 * Apply by replacing the `ja` block in each namespace file in src/i18n/messages/*.ts.
 *
 * Brand rules applied:
 * - Public JA full title: 「ソロモンのジレンマ：真実の裁き」 (full-width colon ：)
 * - Internal-only project name: Project_Solomon
 * - Avoid: ソロモン法廷, プロジェクト・ソロモン
 *
 * Status legend (see COVERAGE_REPORT.csv for per-key status):
 *   ok                    — keep current value as-is
 *   changed               — proposed wording differs from current
 *   needs_native_review   — minor refinement; flag to native JA reviewer
 *   needs_codex_refactor  — none in this thread
 */

export const jaMessagePatch = {
  common: {
    'app.title': 'ソロモンのジレンマ：真実の裁き',
    'brand.internalProjectName': 'Project_Solomon',
    'brand.title': 'ソロモンのジレンマ',
    'brand.subtitle': '真実の裁き',
    'brand.fullTitle': 'ソロモンのジレンマ：真実の裁き',
    'splash.subtitle': '法廷シミュレーションゲーム',
    'language.selectorLabel': '言語',
    'language.selectorTitle': '表示言語を選択',
    'steam.authRequired.title': 'Steam認証が必要です',
    'steam.authRequired.description':
      'Steamクライアントとサーバー認証の状態を確認のうえ、再度お試しください。',
    'steam.authRequired.retry': '再試行',
    'steam.authFailedFallback': 'Steam認証に失敗しました。',
    'session.preparing.title': 'セッション準備中',
    'session.preparing.description': '事件データと法廷環境を読み込んでいます。',
  },
  settings: {
    'settings.about.credits.title': 'ソロモンのジレンマ：真実の裁き',
    'settings.about.credits.description':
      'AI同士の対立を人間の知恵で裁く、リプレイ型の推理ゲーム',
    'settings.language.title': '言語',
    'settings.language.description': 'ゲームUIに使用する表示言語を選択します。',
    'settings.language.displayLanguage': '表示言語',
    'settings.language.displayLanguageDescription':
      'ホーム、設定、システムUIにすぐ適用されます。',
    'settings.language.current': '現在の言語',
    'settings.language.restartNote':
      '一部の事件本文と保存済み記録は、次の画面遷移後に更新される場合があります。',
  },
  home: {
    'home.gameTitle': 'ソロモンのジレンマ：真実の裁き',
    // changed: 裁き手 → 裁判官 to align with glossary judge=裁判官 and KO 재판관
    'home.tagline': '現代の裁判官となり、証言の奥にある真相を見極めましょう。',
    'pc.home.moreCases': 'ほか {count}件',
    'pc.home.countdown.ready': 'まもなく回復',
    'pc.home.countdown.minutesSeconds': '{minutes}分{seconds}秒',
    'pc.home.countdown.seconds': '{seconds}秒',
    // needs_native_review: 前 → 元 reads more natural for resolution rollback
    'pc.resolutionConfirm.rollback': '{seconds}秒後に元の解像度へ戻ります。',
  },
  court: {
    'pc.notes.unseen': '（未確認項目 {count}件）',
    // changed: 接続可能 → 連結できます — 連結 reads natural for card combinations
    'pc.combo.ready': '組み合わせ可能 {count}件 ─ 今すぐ連結できます',
    // changed: tighter phrasing + ようです tone preserves KO 듯 nuance
    'pc.combo.potential':
      '手がかり要 {count}件 ─ まだ見つかっていない手がかりがあるようです',
    'pc.combo.readyPairToast': '組み合わせ可能なペアが準備できました',
    'pc.combo.readyItemsNotice': '組み合わせ可能な項目が{count}件あります',
    // changed: 準備できました → 揃いました — natural collocation for materials
    'pc.combo.readyMaterialsNotice': '組み合わせ可能な材料が{count}件揃いました',
    'pc.combo.readyDetailLabel': '組み合わせ可能項目の詳細',
    'pc.recordSummary.moreConvincing':
      '{party}側の主張のほうが説得力があると判断しました。',
    // needs_native_review: minor flow tweak (進行できます → 進められます; 明らかな → 明らかになっている)
    'pc.verdictAdvance.minimumVisible':
      '判決は争点が{required}件以上明らかになってから進められます。現在明らかになっている争点は{visible}件です。',
    // changed: 真実 → 真相 to match glossary truth=真相
    'pc.verdictAdvance.conditionsMissing':
      'まだ判決条件を満たしていません。争点ごとの真相と証拠をさらに確認してください。',
    'pc.verdictAdvance.hidden.title': 'まだ明らかになっていない争点があります',
    'pc.verdictAdvance.hidden.subtitle': '判決前の確認',
    // needs_native_review: consistency with minimumVisible (明らかな → 明らかになっている)
    'pc.verdictAdvance.hidden.body':
      '現在明らかになっている争点は{visible}件です。\\nまだ明らかになっていない争点が{hidden}件残っています。\\n\\nそれでも判決へ進みますか？',
    'pc.verdictAdvance.hidden.visibleTag': '公開争点 {count}',
    'pc.verdictAdvance.hidden.hiddenTag': '隠れた争点 {count}',
    'pc.verdictAdvance.hidden.confirm': 'それでも判決へ進む',
    'pc.verdictAdvance.hidden.collapse': '判決ボタンだけ隠す',
    'pc.verdictAdvance.hidden.keepInvestigating': 'さらに調査する',
  },
  verdict: {
    'pc.verdict.factOption.partyClaimCorrect': '{party}側の主張が正しい',
    // changed: ASCII hyphen "-" → em-dash "─" for cleaner JA punctuation, matches court.* style
    'pc.verdict.factOption.partyClaimCorrectWithContradiction':
      'この争点は事実と異なります ─ {party}側の主張が正しい',
    // needs_native_review: 主な責任 → 主たる責任 — slightly more formal courtroom register
    'pc.verdict.responsibility.major': '{party}側に主たる責任',
    'pc.verdict.responsibility.greater': '{party}側により大きな責任',
    // changed: 双方に近い責任 → 双方ほぼ同等の責任 — "similar" semantics clearer
    'pc.verdict.responsibility.similar': '双方ほぼ同等の責任',
  },
  profile: {
    'pc.perk.required': '{name}が必要',
    'pc.profile.fragments.needCount': '{count}個以上必要',
  },
} as const
