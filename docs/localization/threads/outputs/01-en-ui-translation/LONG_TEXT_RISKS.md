# LONG_TEXT_RISKS — EN UI Translation

Severity: P0 = layout will break in default panel widths · P1 = clipping likely
in compact (M/S/XS) buckets · P2 = overflow only in extreme narrow case.

## P0 — visible layout break at default width

| key | English text | source | why risky | shorter alternative |
| --- | --- | --- | --- | --- |
| `hotbar.choice.fact.title` / `.motive.title` / `.empathy.title` | `Fact Pursuit — focus on contradictions` / `Motive Search — surface hidden disputes` / `Empathy Approach — invite confession` | [PCBottomDock.tsx:358](src/components/pc/hotbar/PCBottomDock.tsx#L358) | Header in a narrow modal panel (~360 px). Korean is already at the panel limit (e.g. `사실 추궁 - 모순에 집중하기`). EN expands ~40 % and pushes the close button. | Split into title + subtitle: title = `Fact Pursuit`, subtitle = `Focus on contradictions`. Same for the other two. |
| `hotbar.slot.fact` / `.motive` / `.empathy` / `.witness` / `.evidence` | `Fact Pursuit` / `Motive Search` / `Empathy Approach` / `Call Witness` / `Present Evidence` | [PCBottomDock.tsx:495-533](src/components/pc/hotbar/PCBottomDock.tsx#L495-L533) | Hotbar `.slot-nm` is fixed (~74 px in M bucket). Korean text is 4 chars; English doubles. Two-line `Fact / Pursuit` works but breaks the icon vertical alignment. | Add `[lang="en"] .slot-nm { font-size: 10.5px; letter-spacing: -0.01em; }`; allow 2-line wrap for `Empathy Approach` and `Present Evidence`. |
| `hotbar.special.immediate` | `Demand Answer` | [PCBottomDock.tsx:484](src/components/pc/hotbar/PCBottomDock.tsx#L484) | The special-skill chip is the narrowest of the three (`즉답 요구` is 4 chars; `Demand Answer` is 13). | Fall back to `Answer Now` if the chip overflows in M/S buckets. |
| `combination.kindLabel.upgradeEvidence` / `.upgradeDispute` / `.reframeEvidence` / `.reframeDispute` / `.elevateReliability` | `Evidence Strengthened` / `Dispute Strengthened` / `Evidence Reframed` / `Dispute Reframed` / `Reliability Raised` | [PCRightPanel.tsx:1626-1639](src/components/pc/panels/PCRightPanel.tsx#L1626-L1639) | These are inline kind tags in the combination feed. Korean averages 4–5 chars; English averages 16–22 chars and wraps to 2 lines. | Compress: `Evidence ↑`, `Dispute ↑`, `Evidence reframed`, `Reliability ↑`. Or move the verb out of the tag and into a sub-line. |

## P1 — clipping at compact buckets (M / S / XS)

| key | English text | source | why risky | shorter alternative |
| --- | --- | --- | --- | --- |
| `court.advance.banner` | `You can {label}.` interpolated with `Advance to Final Interrogation` (29 chars) | [PCBottomDock.tsx:342](src/components/pc/hotbar/PCBottomDock.tsx#L342) | Banner sits over the hotbar with prev/next + dismiss buttons. Korean string `XX할 수 있습니다` is short; EN combined with the long advance label spills. | Use a banner format that doesn’t embed the full label: `Ready: {label}` with the label rendered as the action button. |
| `verdict.footer.submitBlocked` | `Judge every dispute first ({done}/{total})` | [PCVerdictScreen.tsx:810](src/components/pc/verdict/PCVerdictScreen.tsx#L810) | Sits inline with progress indicator and prev/next buttons; shrinks the indicator. | `Judge all disputes first ({done}/{total})`. |
| `target.drawer.contradictionNote` | `Tracked per dispute. Reaching 5/5 lands a decisive contradiction and forces a confession.` | [PCRightPanel.tsx:1148](src/components/pc/panels/PCRightPanel.tsx#L1148) | Right-panel drawer is ~280 px. EN wraps to 4 lines. | `Tracked per dispute. 5/5 forces a confession.` |
| `target.drawer.lieStagesNote` | `Fact Pursuit, Evidence Presentation, and Empathy Approach push the gauge up.` | [PCRightPanel.tsx:1075](src/components/pc/panels/PCRightPanel.tsx#L1075) | 3 inline action references; wraps to 3 lines. | `Pushed up by Fact Pursuit, Evidence, or Empathy.` |
| `progression.fragments.exchangeRule` | `Trade {rate} of the same fragment for 1 different verdict fragment.` | [PCJudgeProgressionPanel.tsx:643](src/components/pc/profile/PCJudgeProgressionPanel.tsx#L643) | Exchange dialog body in a narrow modal. | `Trade {rate} same fragments → 1 different fragment.` |
| `combination.drawer.autoMatchCost` + `.autoMatchProceed` | `Auto-match consumes {cost} Skill Points. Proceed?` (rendered on two lines) | [PCRightPanel.tsx:1262-1263](src/components/pc/panels/PCRightPanel.tsx#L1262-L1263) | Two-line confirmation in narrow drawer. | Combine: `Auto-match for {cost} Skill Points?`. |
| `tactical.special.confidentialDesc` / `.demandDesc` / `.objectionDesc` / `.separationDesc` | `Promise confidentiality to lower defenses.` etc. | [PCActionsPanel.tsx:472-505](src/components/pc/hotbar/PCActionsPanel.tsx#L472-L505) | Action card description is ~3 lines on Korean already; EN goes to 4. | Replace with shorter imperatives — `Lower defenses by promising confidentiality.` |
| `result.judgeArchetype.*` (9 entries) | Sentence-length judge persona descriptions, 14–22 words each | [PCResultScreen.tsx:341-349](src/components/pc/result/PCResultScreen.tsx#L341-L349) | Persona block is fixed-width on the result screen. Korean averages 16 chars; EN ≥ 90 chars. | Constrain each to ≤ 14 words; lead with archetype noun (`Cold Judge`) and follow with one short clause. |

## P2 — overflow only in extreme narrow case

| key | English text | source | why risky | shorter alternative |
| --- | --- | --- | --- | --- |
| `court.tools.investigation` / `.skill` / `.courtControl` | `Investigation Resource` / `Skill Points` / `Court Control` | [PCCourtLayout.tsx:439-461](src/components/pc/layout/PCCourtLayout.tsx#L439-L461) | Header tool buttons show only icon + counter; tooltip is the title. Tooltips wrap fine on hover. | Tooltip stays full; visible chip unchanged. No action needed. |
| `evidence.detail.investigateLocked` | `Stage {stage} — unlock required` | [PCInteractionPanel.tsx:976](src/components/pc/layout/PCInteractionPanel.tsx#L976) | In compact panels the stage label lives inside a 220 px row. Korean: `조사 단계 N — 해금 필요` is similar length. | OK at default; in XS bucket fall back to `Stage {stage} locked`. |
| `settingsFull.data.resetConfirm` | Multi-line `window.confirm` body | [PCSettingsPanel.tsx:383-386](src/components/pc/settings/PCSettingsPanel.tsx#L383-L386) | Browser confirm dialog truncates very long bodies. EN is comparable length to KO. | Acceptable. Reviewer may shorten the bullet list. |
| `caseBrowser.season.description` | `Cases assigned to {seasonName}. Season-only cases will be curated later.` | [PCHomeScreen.tsx:380](src/components/pc/home/PCHomeScreen.tsx#L380) | Caps the description block; long season names push wrap. | OK at default; acceptable to wrap. |

## Hidden-truth / surface-text watch list

None of the proposed translations move information across the
`hidden_truth` / `surface_text` boundary. Verified per
[docs/disclosure-policy.md](docs/disclosure-policy.md) and
[docs/information-surface-policy.md](docs/information-surface-policy.md):

- `verdict.fact.locked` (`Not yet revealed`) preserves the gating message —
  it does not surface the truth content.
- `witness.card.maskedName` (`???`) is kept verbatim.
- `dispute_ribbon.popoverDefault` deliberately stays generic
  (`Reveal the truth through interrogation and evidence.`).
- `result.findingLabel.opponentTrue` (`Their claim judged true`) keeps
  the Korean abstraction — does not name a specific party fact.

No P0 hidden-truth violations detected in the EN proposals.
