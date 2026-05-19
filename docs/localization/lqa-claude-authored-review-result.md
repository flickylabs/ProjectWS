# Claude-authored KO Copy LQA Result

Anchor: `8d03b9aa`
Scope: `docs/localization/lqa-claude-authored-review.md` sections 1-4 only. User-authored KO in section 5 is excluded.

## Summary

Rating distribution: P0 3 / P1 22 / P2 23.

- P0: fix before copy freeze. All P0 findings are in Discovery / lieState system copy and match the user's concern: abstract nouns doing active/dramatic verbs.
- P1: acceptable for QA continuation, but should be polished before broad LQA or translation handoff.
- P2: acceptable as-is.

Primary risk: not tutorial copy. The tutorial set is mostly natural and aligned with the Flicky guide tone. The weak spots are system/event copy where "흐름", "감정", "진실" are treated as active agents.

## 1. Tutorial Step Copy

| Key | Current KO | Rating | Notes / replacement |
|---|---|---:|---|
| `pc.tutorial.spouse01.emotion-trust-intro.title` | 감정과 신뢰 | P2 | Natural UI title. Keep. |
| `.emotion-trust-intro.body` | 캐릭터의 감정과 신뢰 상태가 답변에 큰 영향을 줘요. 변화를 잘 살펴주세요. | P2 | Flicky tone and action guidance are clear. Keep. |
| `.evidence-detail-open.title` | 증거 열람 | P2 | Natural enough for panel guidance. Keep. |
| `.evidence-detail-open.body` | 선택한 증거의 자세한 내용을 살펴보세요. 단서가 정리되어 있어요. | P2 | Natural. Keep. |
| `.combination-intro.title` | 증거 조합 | P2 | Natural UI label. Keep. |
| `.combination-intro.body` | 여러 증거를 조합하면 숨은 단서나 쟁점이 드러날 수 있어요. | P2 | "드러날 수 있어요" is conventional here, not the problematic pattern. Keep. |
| `.record-summary-intro.title` | 기록 정리 | P2 | Matches UI canonical wording. Keep. |
| `.record-summary-intro.body` | 진행 상황은 [기록 정리]에서 한눈에 확인할 수 있어요. | P2 | Natural and actionable. Keep. |
| `.speech-note-intro.title` | 발언노트 | P2 | Existing UI has both `발언노트 즐겨찾기` and `발언 노트`; acceptable for target spotlight. Keep. |
| `.speech-note-intro.body` | 중요한 발언은 [발언노트 즐겨찾기]에 표시해 두면 다시 찾기 쉬워요. | P2 | Natural. Keep. |
| `.judge-observation-intro.title` | 재판관의 관찰 | P2 | Matches existing panel title. Keep. |
| `.judge-observation-intro.body` | 실시간으로 발견된 단서는 [재판관의 관찰]에 표시돼요. | P2 | Slightly system-like, but concise and clear. Keep. |
| `.initial-statement-acknowledge.title` | 사전 진술 | P2 | Natural phase label. Keep. |
| `.question-method-select.title` | 심문 방식 선택 | P2 | Clear UI label. Keep. |
| `.question-method-select.body` | 원하는 심문 방식을 선택해주세요. [사실 추궁], [동기 탐색], [공감 접근] 중 하나를 선택하시면 돼요. | P1 | Repeats `선택` and mixes formal `선택하시면` with Flicky tone. Suggested: `심문 방식을 골라주세요. [사실 추궁], [동기 탐색], [공감 접근] 중 하나면 돼요.` |
| `.question-dispute-select.title` | 쟁점 선택 | P2 | Clear UI label. Keep. |
| `.question-dispute-select.body` | 심문을 진행할 쟁점을 선택해주세요. | P1 | `심문을 진행할` repeats across steps and sounds procedural. Suggested: `심문할 쟁점을 선택해주세요.` |
| `.question-content-select.title` | 질문 선택 | P2 | Clear UI label. Keep. |
| `.question-content-select.body` | 심문을 진행할 내용을 선택해주세요. | P1 | `내용` is vague after the title says `질문 선택`. Suggested: `묻고 싶은 질문을 선택해주세요.` |
| `.evidence-select.title` | 증거 선택 | P2 | Clear UI label. Keep. |
| `.evidence-select.body` | 심문을 진행할 증거를 선택해주세요. | P1 | `심문을 진행할 증거` is an awkward collocation. Suggested: `심문에 사용할 증거를 선택해주세요.` |
| `.evidence-present-e2-to-b.title` | 증거 제시 대상 선택 | P1 | Clear but noun-stacked. Suggested: `제시할 대상 선택` or, if space allows, `증거를 보여줄 대상`. |
| `.evidence-present-e2-to-b.body` | 조사한 증거를 상대에게 제시하면 더 효과적인 심문을 진행할 수 있어요. | P1 | Meaning is correct, but `효과적인 심문을 진행` is stiff. Suggested: `조사한 증거를 상대에게 제시하면 심문을 더 효과적으로 이어갈 수 있어요.` |
| `.tutorial-complete.body` | 자, 이제 직접 심문을 진행하며 진실을 찾고 합당한 판결을 내려주세요. | P2 | User-specified closing tone; natural enough. Keep. |

## 2. Modal, Banner, Phase Copy

| Key / location | Current KO | Rating | Notes / replacement |
|---|---|---:|---|
| `pc.hotbar.advance.interrogation` | 판결 진행 | P1 | Compact but noun-stacked. Suggested: `판결로 진행`. |
| `pc.hotbar.advance.banner.interrogation` | 이제 판결을 진행할 수 있습니다 | P1 | `판결을 진행` is understandable but stiff. Suggested: `이제 판결로 진행할 수 있습니다`. |
| `pc.verdictAdvance.hidden.title` | 미발견 쟁점 존재 | P1 | Headline/register issue. Suggested: `아직 발견하지 못한 쟁점이 있습니다` or shorter `미발견 쟁점이 있습니다`. |
| `pc.verdictAdvance.hidden.body` | 현재 드러난 쟁점은 {visible}개입니다. 아직 밝혀지지 않은 쟁점이 {hidden}개 남아 있습니다. 그래도 바로 판결을 진행하시겠습니까? 미발견 쟁점 존재 시, 판결에 제약이 있을 수 있습니다. | P1 | Last sentence is report-style. Suggested: `현재 드러난 쟁점은 {visible}개입니다. 아직 발견하지 못한 쟁점이 {hidden}개 남아 있습니다. 그래도 바로 판결로 진행하시겠습니까? 미발견 쟁점이 남아 있으면 판결에 제약이 있을 수 있습니다.` |
| `pc.verdictAdvance.hidden.confirm` | 판결 진행 | P1 | Match button with hotbar if changed: `판결로 진행`. |
| `pc.verdictAdvance.hidden.keepInvestigating` | 추가 심문 진행 | P1 | Button label can be shorter and less procedural. Suggested: `추가 심문` or `더 심문하기`. |
| `pc.phase.mediation` | 판결 | P2 | Acceptable as KO-specific phase label if this phase is verdict entry. Keep. |
| `pc.phase.verdict` | 선고 | P2 | Clear distinction from `판결`. Keep. |
| `pc.phase.verdict.subtitle` | 판단 내용을 기준으로 선고를 내려주세요. | P1 | Slightly translated. Suggested: `판단한 내용을 바탕으로 선고를 내려주세요.` |
| `pc.court.combination.summary.mediation` | 판결에 참고할 힌트가 추가됐습니다. | P1 | `힌트` is game-like but `판결에 참고할` is stiff. Suggested: `판결 때 참고할 단서가 추가됐습니다.` |
| `Phase6_Mediation` eyebrow | 판결 | P2 | Keep. |
| `Phase6_Mediation` title | 심문을 마치고 판결에 들어가시겠습니까? | P2 | Natural enough. Keep. |
| `Phase6_Mediation` body | 심문을 마저 이어나갈지, 바로 판결에 들어갈지 결정합니다. | P1 | `마저 이어나갈지` is awkward. Suggested: `심문을 더 이어갈지, 바로 판결로 들어갈지 결정합니다.` |
| `Phase6_Mediation` tag | 공개 쟁점 {N} / 숨은 쟁점 {N} | P2 | Clear UI tags. Keep. |
| `Phase6_Mediation` unresolved warning | 아직 확정되지 않은 쟁점이 존재합니다. 이대로 선고하시겠습니까? | P1 | `존재합니다` is report-style. Suggested: `아직 정리되지 않은 쟁점이 있습니다. 이대로 선고하시겠습니까?` |
| `Phase6_Mediation` hidden warning | 미발견 쟁점이 남아 있으면 선고가 불완전한 기록으로 평가될 수 있습니다. | P1 | Meaning is right, but `선고가 기록으로 평가` is imprecise. Suggested: `미발견 쟁점이 남아 있으면 판결 기록이 불완전하다고 평가될 수 있습니다.` |
| `Phase6_Mediation` unresolved-only warning | 선고는 가능하지만, 불완전한 기록으로 평가될 수 있습니다. | P1 | Same precision issue. Suggested: `선고는 가능하지만, 판결 기록이 불완전하다고 평가될 수 있습니다.` |
| `Phase6_Mediation` secondary action | 추가 심리 | P1 | Legal term is valid, but the button returns to interrogation. Suggested for UX consistency: `추가 심문`. |
| `Phase6_Mediation` primary action | 판결 선고 | P1 | Redundant and possibly premature if it enters the verdict screen rather than finalizing judgment. Suggested: `선고 단계로` or `선고로 진행`. |

## 3. Discovery / lieState System Messages

| Location | Current KO | Rating | Notes / replacement |
|---|---|---:|---|
| Discovery emergence card subtitle (chain) | `"{sourceName}" 흐름이 풀리며 다른 면이 보입니다` | P0 | Direct hit for abstract-noun active phrasing. `"{sourceName}" 흐름` also lacks a natural particle. Suggested: `"{sourceName}"을 확인하는 과정에서 다른 쟁점이 보입니다`. |
| Discovery emergence body (chain) | `"{sourceName}" 쟁점의 진실에 다가가면서 "{disputeName}"이(가) 새 쟁점으로 부상했습니다. 아직 결론이 아닙니다. 관련 기록과 진술을 더 확인해 쟁점으로 다룰지 판단하십시오.` | P1 | Meaning is correct, but `진실에 다가가면서`, `부상했습니다`, `판단하십시오` are stiff. Also use postposition helper instead of literal `이(가)`. Suggested: `"{sourceName}" 쟁점을 확인하는 과정에서 "{disputeName}"{이가} 새 쟁점으로 떠올랐습니다. 아직 결론은 아닙니다. 관련 기록과 진술을 더 확인한 뒤, 쟁점으로 다룰지 판단해주세요.` |
| Discovery sysMsg (chain) | `"{sourceName}" 흐름이 풀리면서 새 쟁점이 드러났다 — {disputeName}` | P0 | Same `흐름이 풀리다` issue; headline tone. Suggested: `"{sourceName}"을 확인하는 과정에서 새 쟁점이 드러났다 - {disputeName}`. |
| emotional_burst lieState jump sysMsg | `감정이 무너지면서 진실에 가까워졌다 — {disputeName} 단계 {before} → {after}` | P0 | `감정이 무너지다` treats an abstract noun as a collapsing object, and `진실에 가까워졌다` leaves the subject vague. Suggested: `감정이 격해지며 더 솔직한 진술이 나왔다 - {disputeName} 단계 {before} → {after}`. |

Implementation note for the Discovery body: the repo already has `pp이가` / `fixPostpositions` in `src/engine/koreanPostposition.ts`. Prefer `const particle = pp이가(disputeName)` or `fixPostpositions(...)` over shipping raw `이(가)` in user-facing copy.

## 4. ScriptedText Spot Fix

| Location | Current KO | Rating | Notes / replacement |
|---|---|---:|---|
| `src/data/scriptedText/spouse-01.json` `judgeq-d-1-motive_search-2-v1` | 이준호 씨, 장소를 숨긴 것보다 그 뒤 사정을 말씀하시기가 더 두려웠던 이유를 들려주시겠습니까. | P1 | Truth-leak abstraction succeeds: no `형`, `조카`, `돌봄`, `가족 사정` leak. Naturalness issue is `그 뒤 사정` + `말씀하시기가`. Suggested: `이준호 씨, 장소를 숨긴 일보다 그 뒤의 사정을 말하는 게 더 두려웠던 이유를 들려주시겠습니까.` More formal option: `이준호 씨, 장소를 숨긴 일보다 그 뒤의 사정을 밝히는 일이 더 두려웠던 이유를 들려주시겠습니까.` |

## 5. Automatic Detection Rule Proposal

Goal: catch "modifier + abstract item + active/dramatic verb" before it reaches LQA, without blocking normal UI phrases like `새 쟁점이 드러났습니다`.

Recommended integration: add a focused pass to `verify-translations.cjs` or a sibling script such as `tmp/detect-translationese-copy.cjs`, then run it over KO strings from:

- `src/i18n/messages/**/*.ts`
- hardcoded user-facing strings in `src/components/**/*.tsx`
- `src/data/scriptedText/**/*.json` judge/system channels

Suggested heuristic:

```js
const ABSTRACT_NOUNS = [
  '이유', '사정', '흐름', '감정', '진실', '구도', '축', '방향',
  '책임', '의심', '관계', '맥락', '기록', '상황', '입장', '주장'
]

const HIGH_RISK_VERBS = [
  '쏟아지', '무너지', '풀리', '부상하', '뒤집히', '휘몰아치',
  '폭발하', '치솟', '밀려오'
]

const REVIEW_VERBS = [
  '드러나', '떠오르', '보이', '열리', '흔들리', '가까워지'
]

const ABSTRACT_SUBJECT_RE = new RegExp(
  `(?<subject>(?:"[^"]+"\\s*)?(?:[가-힣A-Za-z0-9{}\\[\\]-]+(?:의|한|된|로운)?\\s*){0,4}(?:${ABSTRACT_NOUNS.join('|')}))` +
  `(?:이|가|은|는)\\s*(?<adverb>[가-힣]+게\\s*)?` +
  `(?<verb>${[...HIGH_RISK_VERBS, ...REVIEW_VERBS].join('|')})[가-힣]*`,
  'g'
)

function scoreTranslationeseMatch(match, sourceKind) {
  const subject = match.groups.subject
  const verb = match.groups.verb
  const adverb = match.groups.adverb ?? ''
  let score = 0

  if (/"[^"]+"/.test(subject)) score += 2 // quoted title modifying an abstract noun: "{sourceName} 흐름"
  if (/(이유|사정|흐름|감정|진실|구도|축|방향)/.test(subject)) score += 2
  if (HIGH_RISK_VERBS.includes(verb)) score += 3
  if (REVIEW_VERBS.includes(verb)) score += 1
  if (/(거칠게|갑자기|완전히|빠르게)/.test(adverb)) score += 1
  if (/(의|와|과)/.test(subject) || subject.length >= 8) score += 1
  if (/(system|impact|feedback|scriptedText)/.test(sourceKind)) score += 1

  return score
}
```

Severity mapping:

- score >= 6: fail as P0/P1 candidate. Examples: `이유가 거칠게 쏟아진다`, `"{sourceName}" 흐름이 풀리며`, `감정이 무너지면서`.
- score 4-5: warn for reviewer. Examples: `구도가 흔들린다`, `진실에 가까워졌다`.
- score <= 3: informational only.

Allowlist candidates:

- `새 쟁점이 드러났다`
- `단서가 드러나요`
- `기록에 추가됐습니다`
- `진술이 흔들리는지`

The allowlist should be phrase-level, not noun-level. `쟁점이 드러나다` is acceptable alone, but `"{sourceName}" 흐름이 풀리면서 새 쟁점이 드러났다` should still fail because the first clause is the problem.

## 6. Priority Apply List

1. P0: replace Discovery chain subtitle and system message in `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`.
2. P0: replace emotional burst lieState jump system message in `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`.
3. P1: polish Discovery chain body and remove raw `이(가)` using the existing Korean postposition helper.
4. P1: polish `Phase6_Mediation.tsx` body, warnings, and action labels so the verdict-entry screen does not read like a report.
5. P1: polish hidden verdict modal strings in `src/i18n/messages/court.ts` even if the modal is currently dormant; stale keys tend to resurface.
6. P1: polish hotbar and layout verdict-entry labels in `src/i18n/messages/hotbar.ts` and `src/i18n/messages/layout.ts` for consistency.
7. P1: optionally polish the six tutorial branch/body strings listed above before multi-language LQA handoff.
8. P1: adjust the scripted judge question to `그 뒤의 사정` / `말하는 게` or `밝히는 일이`, keeping truth-leak abstraction intact.

## 7. Scope-Out Appendix

The legacy sample `억울함이 치솟으면서 형의 개인회생과 현금 전달 이유가 거칠게 쏟아진다` is outside this Claude-authored review scope, but it is the best regression test for the detector. It should fail because:

- abstract subject: `이유`
- long modifier chain: `형의 개인회생과 현금 전달`
- high-risk adverb and verb: `거칠게 쏟아진다`

Natural direction for future copy: make the person speak or the player observe, rather than making an abstract item act. Example: `감정이 격해지자, 숨기던 이유를 더 거칠게 털어놓는다.`
