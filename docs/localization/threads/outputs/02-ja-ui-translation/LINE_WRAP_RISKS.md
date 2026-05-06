# JA UI Translation — Line-Wrap Risks

Severity:
- **P0** = will overflow visible area on default Steam PC bucket (1080p).
- **P1** = wraps to 3+ lines on M/S buckets (900–899px); cramped but readable.
- **P2** = JA character density grows by ~20% over KO; verify on S/XS only.

| Severity | Key | JA text | Container / Why risky | Shorter alternative / Mitigation |
|---|---|---|---|---|
| P1 | `pc.home.guide.body` | モードを選び、セッションを決めて事件をクリックすると、ブリーフィングを経てすぐに公判が始まります。 | Home top-bar guide popover (~280px wide), 2-line cap. | 「モードを選びセッションを決めて事件をクリックすれば、すぐに公判が始まります。」 (短縮) |
| P1 | `pc.intro.slide1.body` | 質問・証拠・判断を組み合わせて、食い違う真相を見極める模擬法廷ゲームです。 | Centered hero copy on intro slide 1. | OK at L bucket; verify at S/XS — split into two short clauses if needed. |
| P1 | `pc.settings.data.reset.desc` | セーブスロット・事件進行・裁判官の傾向・実績・プロフィールをすべて削除します。元に戻せません。 | Danger action description in settings row. JA likely 3 lines. | Split into two `<p>`s: `削除対象: …` / `元に戻せません。` |
| P1 | `pc.settings.about.credit.desc` | ソロモン法廷 ─ AI同士の対立を、人の知恵で裁くリプレイ型推理ゲーム | About credit row, narrow column. | 「AI同士の対立を、人の知恵で裁くリプレイ型推理」 (drop subtitle prefix if branding allows) |
| P1 | `pc.profile.enhance.hint` | 各素材スロットを必要数まで満たすと強化ボタンが有効になります。強化が完了すると、その項目のレベルと称号の合計レベルが同時に上がります。 | Help block in narrow forge modal. | Render as two `<p>`s: split at 「。」 |
| P1 | `pc.dialogue.contradiction.body` | 前の供述と現在の供述の間に矛盾が検出されました。矛盾を積み重ねると、虚偽の状態が揺らぎ、新たな供述や手がかりが現れる可能性があります。 | Contradiction popup, mid-width body. | Split sentences across two `<p>`s. |
| P1 | `pc.actions.evidence.selected.hint` | スロットで選んだ証拠をすぐに提示することも、下のパネルから調査・対面質問へ繋ぐこともできます。 | Action panel hint area, narrow. | 「選んだ証拠はすぐ提示できます。下のパネルから調査・対面質問にも繋げます。」 |
| P1 | `pc.record.section.contradiction.empty` | 比較できる発言の食い違いはまだありません。同じ争点で違う質問タイプや証拠提示を行うと、供述の変化を確認できます。 | Empty state in record summary modal. | OK as 2 lines on L; on S consider splitting at 「ありません。」 |
| P1 | `pc.verdict.advance.body` | 現在の公開争点は{visible}件です。まだ明らかになっていない争点が{hidden}件残っています。それでも判決へ進みますか？ | Confirmation panel body. | Already 3 sentences — render with `<br>` between to control line breaks. |
| P2 | `pc.token.investigation.desc` | 証拠をより深く調べたり、新たな手がかりや記録を確認するときに消費します。 | Token detail popover (≈320px). | Verify line-height in popover; consider 2-line height. |
| P2 | `pc.token.skill.desc` | 即答要求、非公開保護、自動組合せ補助など、裁判官の積極的な介入に消費します。 | Token detail popover. | Same as above. |
| P2 | `pc.token.control.desc` | 無理な圧力や手続きの混乱に耐える力です。判決の安定性にも影響します。 | Token detail popover. | OK |
| P2 | `pc.session.spouse.desc` etc. (13 cards) | 各40–55字 description | Session category card ≈280px wide, 2-line cap in current CSS. | Verify each on S bucket; some may need 3 lines. Tagline + desc currently render together — check `.pc-session-card__copy`. |
| P2 | `pc.dock.witness.subtitle` | 適切なタイミングで召喚すると、核心の証言を引き出せます。 | Witness panel header subtitle. | OK |
| P2 | `pc.intro.slide2.body` | 感情と記録、沈黙と弁明、計算と誤解が異なる顔を見せます。 | Intro slide 2 hero body. | OK on L; verify S/XS. |
| P2 | `pc.home.history.play.empty.desc` | この事件をクリアすると、日付とスコア別の記録がここに保存されます。 | Empty state card. | OK |
| P2 | `pc.settings.data.export.desc` | 現在の進行状態（ローカルストレージ）をJSONファイルとしてダウンロードします。 | Action row description (data settings). | OK |
| P2 | `pc.case.disputes.hint` | 尋問の進行に応じて、新たな争点が現れる場合があります。 | Disputes section hint, narrow column on case browser/brief. | 「尋問が進むと、新たな争点が現れる場合があります。」 |
| P2 | `pc.session.partnership.desc` | 清算と分担、約束と責任、それぞれ違う計算が見えてきます。 | Session card desc (1 of 13). | Listed under generic session-card P2 — verify wrap on S. |
| P2 | `pc.session.online.desc` | コメントと投稿、スクショと世論が、事件の流れを変えていきます。 | Session card desc. | Listed under generic session-card P2. |
| P2 | `pc.verdict.responsibility.aMajor` (and 4 siblings) | `{partyA}側に主たる責任` etc. | After party-name interpolation, label can wrap to 2 lines on narrow buckets when name ≥ 6 JA chars. | Split: render party name on its own line, label below. |
| P2 | `pc.dock.special.{...}.cta` | `⚡-1 個別尋問を実行` etc. | Wide CTA button in dock — emoji + glyph + text. | OK width; verify emoji renders correctly across browsers. |
| P2 | `pc.actions.demand.meta` | 争点の選択が必要、証拠整理フェーズ以降で解禁 | Two facts joined by 句読点 in action panel meta line. | If tight: 「要争点 / 証拠整理以降」 |
| P2 | `pc.notes.expand.open` / `pc.notes.expand.close` | 発言ノート全体を見る / 発言ノート全体を閉じる | Title-attribute tooltip. | OK |
| P2 | `pc.combo.summary.dossier` etc. (12 strings) | 「決定的質問へ繋がる組合せが成立しました。」 etc. | Combo overlay center text. KO short → JA short. | OK |

## Counts

- P0: 0
- P1: 9
- P2: 13 (some are duplicate-class — generic session-card row)

## Layout audit handoff

The session-card desc row (pc.session.*.desc, 13 entries) is the highest-volume P2 risk and should be sampled by the layout audit thread (04-i18n-layout-audit) on at least the spouse/family/friend cards in S and XS buckets.

CSS files to inspect for line-clamp / max-height defaults:
- `src/app/pc.css` — `.pc-session-card`, `.pc-home-guide`, `.pc-intro__slide`, `.pc-settings__option-desc`, `.pc-record-summary__empty`
- `src/app/pc-main.css` — `.pc-dock`, `.pc-action-panel`
