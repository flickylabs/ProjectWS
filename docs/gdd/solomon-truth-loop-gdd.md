# Solomon Court GDD - Truth Loop and Breakthrough System

Version: 2026-05-02  
Scope: PC main game loop, truth disclosure, witness/evidence gates, VFX sequencing, LLM response policy  
Applies to: `spouse-01`, `family-01`, `friend-01`

## 1. Game Pillar

The game is not about pressing the correct button until a hidden answer appears. The player acts as the judge and must build pressure, trust, evidence support, and witness support until a specific dispute can be resolved.

Core promise:

- Every dispute has a truth stage.
- Emotion and trust are character-wide posture meters.
- Evidence and witness testimony are dispute-specific support.
- A truth breakthrough happens only when a route peak and a dispute-specific support condition meet.
- Important changes must be visible through controlled VFX and notebook/observation movement, not through noisy repeated system logs.

## 1.1 Legacy GDD Integration

This document extends the existing GDD/diagnosis material instead of replacing the whole game concept. The older documents define these pillars, and this document turns them into the current truth-breakthrough runtime rule:

| Existing GDD Concept | Kept / Extended Here |
|---|---|
| Same people, different cases | Active case data is reusable. The runtime rule must be case-data driven and not spouse-specific. |
| Three-layer truth | Actual truth, perceived truth, and testified truth map to dispute stage, character response, and judge notebook findings. |
| Judge as player | The player does not "solve a quiz"; they choose pressure, trust, evidence, witness, and final judgment. |
| Phase 0-7 flow | Phase 3 remains the integrated interrogation loop; Phase 6 mediation and Phase 7 verdict depend on readiness. |
| Fact vs trust routes | Now formalized as emotion route and trust route, each with separate confession tone and gate readiness. |
| Discovery system | Contradiction, evidence appraisal, hidden dispute emergence, and emotional leverage are preserved but routed to the right screen surfaces. |
| Dossier / case cards | Combination and dossier results are treated as support sources or discovery sources, not generic system logs. |
| Blueprint / Atom / BeatScript | The engine decides stance and allowed information; LLM or scripts provide wording inside those constraints. |
| Readiness-based verdict | Verdict entry must depend on meaningful investigation, not one accidental S5 spike. |

The purpose of this GDD page is to make the current implementation reproducible: a developer should be able to rebuild the truth loop, UI routing, VFX priority, and LLM guardrails from this document alone.

## 2. Active Cases

All active cases use the same runtime rule. Case-specific content changes the names, evidence, witnesses, and confession text, not the gate logic.

| Case | Relationship Theme | Required Runtime Sources |
|---|---|---|
| `spouse-01` | spouse, hidden family support, money distrust | `disputes.requiredEvidence`, `evidence.proves`, `duo.socialGraph.relatedDisputeIds`, witness sessions |
| `family-01` | inheritance, caregiving, testament, debt, capacity | same shared fields; family terms are public relationship terms and must not be treated as leak tokens |
| `friend-01` | reputation, contact intent, online/public harm, money/access patterns | same shared fields; public/social evidence and witness slots carry the support condition |

The runtime must not contain spouse-only lexical rules such as "형", "조카", or "오피스텔" as breakthrough logic. Those words are content. The logic reads structured data.

## 3. Core Player Loop

1. Select a target party.
2. Ask a question, present evidence, call a witness, or combine clues.
3. The target posture changes through emotion or trust.
4. Evidence/witness support accumulates for specific disputes.
5. The judge identifies an opening.
6. If the target route is ready and the support condition is met, the dispute reaches S5.
7. The truth holder gives a confession/confirmation appropriate to the route.
8. The judge notebook records the resolved truth.
9. The player can continue unresolved disputes or proceed to verdict only when verdict readiness is met.

## 3.1 Full Game Flow

The complete case flow is:

| Phase | Name | Player Experience | Runtime Role |
|---|---|---|---|
| Phase 0 | Case intro | Read the case setup and parties | load case data, initial visible disputes, public facts |
| Phase 1 | Initial statements | A and B state their positions | create baseline claims and perceived truth |
| Phase 2 | Rebuttal | parties reject or reinterpret each other | seed conflicts and first lie-state movement |
| Phase 3 | Integrated interrogation | question, evidence, witness, combination, notebook | main truth loop; S0-S5 gate runs here |
| Phase 6 | Mediation | judge offers settlement paths | summarize known facts, responsibility, options |
| Phase 7 | Verdict input | player assigns findings, responsibility, evidence legality, solution | produce verdict state |
| Result | Result page | score, profile drift, aftermath, rewards | persist profile and explain consequences |

Phase 4 and Phase 5 are not separate player phases in the current PC loop. Evidence and fact-finding are folded into Phase 3.

## 3.2 Phase 3 Action Loop

Every turn in Phase 3 follows this order:

1. Player chooses an action.
2. Runtime checks cost, target, lockout, and availability.
3. Judge prompt is created if needed.
4. Target, witness, or evidence response is generated.
5. Question effect, evidence effect, or witness effect is applied.
6. Discovery checks run.
7. Truth breakthrough gate is evaluated only for relevant disputes.
8. UI feedback routes to dialogue, observation, notebook, evidence, witness, or dispute destination.
9. Readiness is recalculated.

The order matters. Result/system processing must not happen before the target answer when the action expects a response.

## 4. Data Concepts

### 4.1 Party

The two main characters are `party a` and `party b`. They can both hold relevant truth, but a confession should come from the character who lied, hid, distorted, or owns the decisive knowledge.

If the speaker is not the liar:

- Do not label their answer as "confession".
- Use "confirmation", "key testimony", "correction", or "judicial finding".

### 4.2 Dispute

A dispute is the unit of truth progression. Each dispute has its own stage from S0 to S5.

The player may pressure the same character globally, but only the currently supported dispute can reach S5.

### 4.3 Evidence

Evidence can support one or more disputes through `evidence.proves` or `disputes.requiredEvidence`.

Evidence has investigation stages. A shallow evidence view should not expose late-stage truth.

### 4.4 Witness

A witness is related to disputes through `relatedDisputeIds`. The witness route becomes useful only after relevant testimony has been heard.

Witness questions should not display "1단계", "2단계", or "3단계" to the player. The UI should present natural question choices that deepen from broad to specific.

### 4.5 Judge Notebook

The notebook stores durable judicial findings:

- confirmed truth
- decisive statements
- player-selected interim judgments
- key unresolved doubts
- important contradiction records

The notebook must not be filled with generic messages such as "문구가 기록되었습니다".

### 4.6 Judge Observation

Observation stores weaker, current-state interpretation:

- emotional posture
- trust posture
- weak hints
- stale approach warning
- action guidance

Observation should absorb low-importance feedback so the dialogue log does not become cluttered.

## 4.7 Dossier / Combination

Dossier and combination cards connect evidence into a higher-order result.

Combination result types:

- evidence result: unlock or upgrade an evidence item, then animate to the left evidence panel;
- dispute result: emerge or upgrade a dispute, then animate to the top dispute ribbon;
- witness result: unlock or add a witness, then animate to the bottom witness button;
- notebook result: record a durable finding, then animate to judge notebook;
- observation result: record a weak interpretation, then animate to judge observation.

Combination success should not always say "related dispute". The destination message must match the actual result type.

## 4.8 Three-Layer Truth

The existing GDD's three-layer truth model is implemented as:

| Layer | Runtime Representation | Player Surface |
|---|---|---|
| Actual truth | case data, dispute definitions, evidence/witness support | hidden until S5 or valid support |
| Perceived truth | party-specific stance, lie state, misconception, interim judgment | character dialogue and judge prompts |
| Testified truth | what the party/witness currently says | dialogue log and notebook entries |

The player wins by separating perceived/testified truth from actual truth, not by extracting one global answer.

## 5. Truth Stage Model

| Stage | Meaning | Content Boundary |
|---|---|---|
| S0 | denial / no meaningful admission | public facts only |
| S1 | surface shake | partial uncertainty, no hidden truth payload |
| S2 | excuse / guarded admission | weak hints, still no decisive truth |
| S3 | cornered | stronger hints, limited relation to evidence or witness |
| S4 | ready but not resolved | route can be ready, but S5 blocked until support condition is met |
| S5 | truth resolved for this dispute | full truth/confession/confirmation allowed |

S5 is never a generic "character collapsed" state. It is a resolved state for one dispute.

## 6. Route Readiness

There are three route types.

### 6.1 Emotion Route

Trigger shape:

- pressure
- contradiction pursuit
- effective factual pursuit
- target reaches resignation or extreme emotional pressure

Confession tone:

- cornered
- terse
- ashamed, angry, or exhausted
- may push back before admitting

Example structure:

```text
[Judge] 이 부분은 더 피하기 어렵습니다. 지금 숨긴 사실을 분명히 말해 주십시오.
[B] 숨기고 버티면 지나갈 줄 알았습니다. 하지만 그 판단이 틀렸습니다...
```

### 6.2 Trust Route

Trigger shape:

- empathy
- careful factual separation
- non-accusatory clarification
- target reaches maximum trust toward judge

Confession tone:

- cooperative
- explanatory
- less hostile
- often starts with "이제는 말해야 할 것 같습니다"

Example structure:

```text
[Judge] 지금 말하면 책임을 피하는 것이 아니라 사실을 정리하는 데 도움이 됩니다.
[B] 네. 그 부분은 제가 숨겼습니다. 이유를 설명드리겠습니다...
```

### 6.3 Explicit Route

Trigger shape:

- authored direct confession
- authored event that intentionally bypasses the support gate

This route should be rare and hand-authored. Generated text should not use this route without explicit runtime permission.
Witness truth probes are not direct explicit routes. They are witness support/probe events and must still pass the shared S5 gate before a truth breakthrough is allowed.

## 7. Support Conditions

A route peak is not enough. A dispute must also have support.

### 7.1 Evidence Support

Evidence support is satisfied when at least one relevant evidence item has been investigated or presented deeply enough.

Relevant evidence is:

- listed in `disputes.requiredEvidence`, or
- has the dispute id in `evidence.proves`.

Minimum stage:

- If evidence has investigation stages, the required depth is up to stage 2 by default.
- Deep investigation always satisfies support.
- Presentation at the required stage to the target party can satisfy support.

### 7.2 Witness Support

Witness support is satisfied when:

- witness `relatedDisputeIds` includes the dispute, and
- the player has heard testimony slots tied to that dispute, and
- the testimony is deep enough.

Accepted witness support:

- a decisive slot id such as `truth`, `confirm`, `final`, `full`, or `d3`;
- at least two related slots;
- for a direct witness, at least one related slot plus repeated questioning.

A witness simply being related to a dispute is not enough.

### 7.3 Explicit Support

An authored direct truth probe may bypass evidence/witness support. This must be explicitly marked by code or scripted content. It is not available to generic LLM fallback.

## 8. S5 Gate Rule

Pseudocode:

```text
routeReady =
  emotion is resigned/peak
  OR trust is maximum
  OR explicit authored route

supportReady =
  relevant evidence support met
  OR relevant witness support met
  OR explicit bypass

if explicit authored route:
  allow S5
else if routeReady and supportReady:
  allow S5 for this dispute only
else if routeReady and not supportReady:
  hold at S4
else:
  follow normal S0-S4 progression
```

## 9. Anti-Exploit Rule

Affinity can weight a route, but repetition cannot solve a dispute by itself.

Rules:

- Repeating the same question type on the same target/dispute becomes stale.
- Stale repetition produces no lie-state progress.
- The UI should guide the player to change angle: evidence, witness, different question type, or timing.
- A character weak to emotion can rise faster through pressure, but pressure spam still stalls without evidence/witness support.
- A character receptive to trust can cooperate faster, but empathy spam still stalls without support.

## 9.1 Affinity and Character Bias

Characters can be biased toward one of three route profiles:

| Bias | Effect | Risk Control |
|---|---|---|
| emotion-weighted | pressure changes emotion faster | stale repetition blocks progress and S5 still requires support |
| trust-weighted | empathy/trust changes cooperation faster | trust peak alone holds at S4 without support |
| balanced | both routes respond moderately | player must choose based on evidence/witness timing |

The bias should make a character feel different. It must not expose a dominant button.

## 10. Leak Policy

Automatic leak is not a route to S5.

Allowed:

- small authored slips that become observations;
- a slip can create a follow-up probe;
- if the judge catches it, the player can pursue it.

Blocked:

- generated leak text cannot dump truth;
- a slip alone cannot force S5;
- "누설 100%" should not auto-reveal truth unless it is converted into a hand-authored probe and then passes the S5 gate.

## 11. Confession Ownership

The subject of S5 must be the correct knowledge owner.

| Situation | Speaker |
|---|---|
| One party lied or hid truth | that party confesses |
| One party misread facts | that party corrects their judgment |
| Witness proves fact | witness gives key testimony; judge records finding |
| Evidence proves fact | judge asks with evidence; target explains or concedes |
| Both parties own different truths | resolve each dispute or sub-dispute separately |

The victim should not "confess" to the offender's secret. They can admit misjudgment, overreaction, or a separate act.

## 12. Evidence Presentation Flow

Evidence presentation is a judge-led exchange, not a bare system log.

Expected layout:

```text
[Judge] 이준호 씨, 이 품목들은 누구를 위해 구입한 것입니까?
        [Evidence: 영수증 묶음 (5장) - 조사 2단계]
[B] ...
```

Rules:

- Stage 0 evidence cannot be presented to the party.
- Stage 1 can be presented and produces stage-appropriate answer.
- Stage 2 costs 2 investigation tokens and unlocks a deeper answer.
- When investigation stage rises, presentation to the relevant party is enabled again.
- Evidence viewer at stage 0 should offer "증거조사 바로가기".

## 12.1 Evidence Media Layout

Evidence media should read like the object it represents.

Examples:

- Receipt: visible outer paper margin, row spacing, readable totals, navigation controls with padding.
- Message thread: phone-like narrow width, top center unknown phone number only, no hidden spoiler title, left/right bubbles, no per-message numbering.
- GPS/call log: table spacing and timestamp hierarchy.
- Dossier card: compact summary plus evidence chips, not a raw truth dump.

Evidence titles must not reveal late truth. For example, an unknown sender thread remains "발신자 미상 문자" until the story explicitly reveals otherwise.

## 13. Witness Flow

Witness questioning is staged but should appear natural.

UI:

- show topic-style choices, not "1단계/2단계" labels;
- after a witness answer, close or minimize the panel so the player can see dialogue;
- if the answer creates a truth support condition, trigger judge interpretation or notebook flow.

Truth process after decisive witness:

1. Witness states the key fact.
2. Judge identifies the relevant dispute.
3. Judge asks the liable party to confirm or explain.
4. If route readiness is also met, S5 breakthrough fires.
5. Notebook records the truth.

## 14. Record Summary

Record summary should show progress and usefulness, not generic completeness.

Required counters:

- opened disputes / total disputes;
- S5 disputes / total disputes;
- evidence unlocked / total evidence;
- evidence investigated stages / total investigation stages;
- evidence presented / presentable total;
- witnesses questioned / total witnesses;
- unresolved doubts count;
- contradiction count.

Confirmed facts:

- final truth for S5 disputes;
- player's interim judgments for unresolved disputes;
- key evidence/witness findings.

Unresolved doubts:

- hidden or unresolved disputes;
- disputes stuck at S3/S4;
- evidence or witness support missing.

Contradictions:

- only show real A/B/reason comparisons;
- do not say "no contradictions" if contradiction detection has not meaningfully run.

## 15. VFX and Cutscene Model

Strong VFX is not controlled by a frequency cap. Instead, only rare events qualify.

### 15.1 Strong Cutscene Events

- Emotion peak.
- Trust peak.
- S5 truth breakthrough.
- New dispute emergence.
- New evidence emergence.
- New witness emergence.

### 15.2 Destination Absorption

When a result belongs to a destination, the effect should move there:

- new evidence -> left evidence panel;
- new witness -> bottom witness button;
- new dispute -> top dispute ribbon;
- notebook finding -> judge notebook;
- observation -> judge observation.

### 15.3 Sequencing

Never run cutscene behind an open modal.

Required order:

1. close active modal or combination overlay;
2. run cutscene;
3. run destination absorption/highlight;
4. show follow-up panel or dialogue;
5. return control.

### 15.4 Visual Tone

- Emotion peak: red pressure, pulse, unstable shake.
- Trust peak: warm gold/blue calm expansion.
- S5 breakthrough: judicial gold, page/notebook lock-in, separate from emotion/trust.
- New dispute: strong lightning/zigzag connection from source message to dispute ribbon.
- New evidence: green/gold evidence absorption into left evidence list.
- New witness: portrait/hotbar highlight and summon-ready pulse.

## 15.5 Message Routing Matrix

| Event Type | First Surface | Durable Destination | Strength |
|---|---|---|---|
| judge question | dialogue bubble | dialogue log | normal |
| party answer | dialogue bubble | dialogue log | normal |
| witness answer | dialogue bubble | dialogue log, possible notebook | normal to high |
| weak system guidance | black ribbon or observation | observation | low |
| stale repetition | black ribbon or observation | observation | low |
| evidence investigated | black ribbon | evidence list | medium |
| evidence presented | judge bubble with evidence subline | dialogue log | medium |
| contradiction with valid A/B/reason | action CTA then modal | notebook if pursued | high |
| emotional slip | popup | observation | high |
| emotion peak | cutscene | observation | high |
| trust peak | cutscene | observation | high |
| new evidence | cutscene/absorption | evidence list | high |
| new witness | cutscene/absorption | hotbar witness slot | high |
| new dispute | cutscene/zigzag connection | dispute ribbon | highest |
| S5 truth breakthrough | cutscene + confession | notebook + dispute stage | highest |
| verdict readiness | restrained banner | verdict gate | medium |

Dialogue log should be reserved for spoken dialogue and meaningful judicial statements. Low-value progress texts should not accumulate there.

## 16. LLM Response Policy

LLM must be given enough context to avoid generic or leaking answers.

Required input context:

- case id;
- active dispute id;
- target party;
- current route readiness;
- support condition status;
- lie state;
- public relationship terms;
- character archetype and speech style;
- evidence/witness source if relevant;
- forbidden truth payload if gate is not open.

LLM must:

- answer public identity questions naturally;
- use party-specific tone;
- avoid "상대방" and "해당 장소" when a public relationship term is available;
- avoid S5 truth before the gate;
- produce confession only for the correct truth owner;
- generate evidence-presentation answers according to investigation stage.

## 16.1 Blueprint / Atom / BeatScript Contract

The older GDD separates engine decision from wording. Preserve that separation:

1. Engine selects stance, allowed information, route, and gate status.
2. Atom/claim policy selects what facts may be expressed.
3. Scripted text or LLM turns the selected information into natural speech.
4. Post-processing checks honorifics, Korean particles, truth leakage, and route tone.

LLM is never allowed to decide that S5 is open by itself.

## 16.2 Required LLM Output Tone

| Context | Expected Tone |
|---|---|
| S0-S2 target answer | guarded, incomplete, no direct hidden truth |
| S3-S4 target answer | strained, more specific, still not full confession |
| emotion-route S5 | cornered, exhausted, reluctant, direct |
| trust-route S5 | cooperative, explanatory, less hostile |
| evidence presentation | answer the evidence stage only |
| witness answer | witness speech style, no party-confession wording |
| public info free question | answer public identity/context naturally |
| leak probe | refuse or redirect without hidden truth |

## 17. Case Authoring Requirements

Each case must define:

- `disputes` with ids, titles, and `requiredEvidence`;
- `evidence` with ids, `proves`, and investigation stages;
- witnesses in `duo.socialGraph` with `relatedDisputeIds`;
- witness testimony slots whose ids and effects identify related disputes;
- S5 confession/confirmation text for route types;
- evidence presentation responses per investigation stage;
- verdict readiness thresholds.

## 17.1 Minimum Case Data Checklist

For every new case:

- each dispute has a stable id and a readable player title;
- each dispute lists required or strongly related evidence;
- each evidence item lists `proves`;
- each evidence item has stage-safe media and stage-safe text;
- each witness lists `relatedDisputeIds`;
- witness testimony slots map to disputes and deepen naturally;
- S5 route text exists for the likely truth holder;
- non-liar confirmation text exists when evidence/witness proves someone else's truth;
- verdict readiness does not unlock after only one isolated breakthrough unless the case is designed as a short case.

## 17.2 Active Case Data Sanity

Current active case data satisfies the shared runtime fields:

| Case | Disputes | Evidence with `proves` | Witnesses with `relatedDisputeIds` |
|---|---:|---:|---:|
| `spouse-01` | 4 | 7/7 | 3/3 |
| `family-01` | 5 | 7/7 | 3/3 |
| `friend-01` | 5 | 7/7 | 3/3 |

This means the shared S5 gate can run for all three cases. Content quality still depends on the scripted lines following the same disclosure policy.

## 18. Implemented Numeric Rules

This section records the current runtime values. If the design intent changes, update the code and this section together.

### 18.1 Starting Resources and Action Costs

| Resource | Start Value | Current Uses |
|---|---:|---|
| Investigation tokens | 20 | evidence investigation, witness calls, free-question consume routes |
| Skill points | 10 | evasion reading, combinations, dossier-style skills |
| Court control | 5 | immediate answer, separation/private control style actions |

Current explicit costs:

| Action | Cost |
|---|---:|
| Witness call | investigation token 1 |
| Evidence investigation stage 1 | 0 |
| Evidence investigation stage 2 | investigation tokens 2 |
| Evidence investigation stage 3+ | investigation token 1 per stage |
| Evidence presentation | no direct token cost, but evidence must be investigated to stage 1+ |
| Free question | investigation token 1 only when policy returns `costPolicy: consume`; public/no-cost routes spend 0 |
| Immediate answer | court control 1 |
| Evasion reading | skill point 1 |

### 18.2 Emotion Values

Emotion is stored as `internalValue` from 0 to 100 and converted to a phase.

| Phase | Runtime Range | Default Initial Value |
|---|---:|---:|
| defensive | 0-19 | 10 |
| confident | 20-39 | 30 |
| shaken | 40-59 | 50 |
| angry | 60-79 | 70 |
| resigned | 80-100 | 90 |

Formula:

```text
newEmotion = clamp(currentEmotion + delta, 0, 100)
phase = highest phase whose min threshold is <= newEmotion
```

Important applied deltas:

| Trigger | Delta |
|---|---:|
| Evidence presentation, hard evidence | +15 |
| Evidence presentation, soft evidence | +8 |
| Contradiction pursuit | +35 |
| Witness testimony hurts a party | +10 to the unfavored party |
| Motive/leak crosses 50 | +8 |
| Motive/leak crosses 80 | +15 |

Truth route readiness:

```text
emotion route ready = emotional phase is resigned OR internalValue >= 84
```

Because resigned currently starts at 80, the phase check can open the route at 80 even though the numeric constant is 84. If the desired threshold is exactly 84, either the resigned threshold or the route check must be adjusted.

### 18.3 Trust Values

Trust state has three fields:

| Field | Initial Value | Clamp |
|---|---:|---:|
| trustTowardJudge | 30 | 0-100 |
| fearOfExposure | 50 | 0-100 |
| retaliationWorry | 30 | 0-100 |

Formula:

```text
newTrustField = clamp(currentTrustField + delta, 0, 100)
```

Current trust deltas and thresholds:

| Rule | Value |
|---|---:|
| empathyQuestion delta | trustTowardJudge +12 |
| confidentialProtection | trustTowardJudge +20, fearOfExposure -15 |
| separation | retaliationWorry -10 |
| excessivePressure | trustTowardJudge -15 |
| sidingWithOpponent | trustTowardJudge -20 |
| confidentialAcceptance helper threshold | 50 |
| preDisclosureConsent helper threshold | 60 |
| legacy voluntaryConfession helper threshold | 70 |
| current S5 trust route threshold | 100 |

The current S5 gate is stricter than the legacy helper. A party may be "willing" by old helper logic at 70, but the new truth breakthrough gate requires 100 plus dispute support.

### 18.4 Question Effects

The question effect engine keeps per-party meters:

| Meter | Range | Purpose |
|---|---:|---|
| contradictionTokens | 0-5 | fact-pursuit pressure on one dispute |
| leakMeter | 0-100 | motive-search pressure and hidden-link hints |
| trustWindow | 0-100 | empathy route window |

#### Fact Pursuit

Effective only when stance is `deny`, `hedge`, or `blame`.

```text
tokenGain = round(1 * multiplier)
disputeTokens = min(previousTokens + tokenGain, 5)
```

Effects:

| Token Count | Effect |
|---:|---|
| 2+ | lie transition bonus metadata = token count * 10 |
| 3+ | weakens `timeline_padding` defense |
| 4+ | weakens `flat_denial` defense |

Meter decay from fact pursuit:

```text
leakMeter -= 3
trustWindow -= 2
```

The action dispatcher also has an additional fact-pursuit transition counter:

| Affinity Grade | Token Gain |
|---|---:|
| strong | 2 |
| normal | 1 |
| weak | 0.5 |

Transition threshold:

```text
threshold = 2 if lieState is S0-S1
threshold = 3 if lieState is S2+
```

When the threshold is reached, a lie-state transition is attempted and the local counter resets.

#### Motive Search

```text
baseLeak = 15
emotionBonus = calm 0, agitated 10, explosive 20, shutdown -5
leakGain = round((baseLeak + emotionBonus) * multiplier)
if lieState >= S3: leakGain += 15
if lieState >= S4: leakGain += 10
newLeakMeter = min(previousLeakMeter + leakGain, 100)
```

Effects:

| Condition | Effect |
|---|---|
| lieState >= S2 and leak >= 40 | hidden dispute hook / observation |
| leak crosses 50 | suppression leak observation + emotion +8 |
| leak crosses 80 | emotion +15 |

Meter decay from motive search:

```text
trustWindow -= 3
```

Automatic critical leak is currently disabled:

```text
ENABLE_AUTOMATIC_CRITICAL_LEAK = false
```

That means leak 100 should not directly generate an automatic S5 confession. S5 must come through the breakthrough gate.

#### Empathy Approach

```text
baseTrust = 12
stateBonus = S0 0, S1 3, S2 5, S3 8, S4 12, S5 0
trustGain = round((baseTrust + stateBonus) * multiplier)
if emotion is agitated or explosive: trustGain += 5
if emotion is explosive: trustGain += 8
if emotion is shutdown: trustGain = round(trustGain * 0.5)
newTrustWindow = min(previousTrustWindow + trustGain, 100)
```

Effects:

| Condition | Effect |
|---|---|
| always | trustTowardJudge increases by `round(trustGain * 0.5)` through `trust_boost` |
| action dispatcher empathy branch | additional trustTowardJudge +12 |
| trustWindow >= 40 | counterattack suppressed for 2 turns |
| lieState >= S3 and trustWindow >= 50 | private confirmation path opens |
| trustWindow crosses 60 | confession window for 3 turns |

Meter decay from empathy:

```text
current dispute contradictionTokens -= 1
```

### 18.5 Question Fatigue

Question fatigue applies a multiplier before question effects.

Local key:

```text
party + disputeId + angleTag
```

Local multiplier:

| Local Streak | Multiplier |
|---:|---:|
| 1 | 1.00 |
| 2 | 0.70 |
| 3 | 0.35 |
| 4+ | 0.10 |

Spotlight multiplier for repeatedly questioning the same party:

| Spotlight Streak | Multiplier |
|---:|---:|
| 1 | 1.00 |
| 2 | 0.90 |
| 3 | 0.75 |
| 4 | 0.60 |
| 5+ | 0.45 |

Final multiplier:

```text
finalMultiplier = clamp(round2(localMultiplier * spotlightMultiplier), 0.05, 1)
appliedDelta = round(rawDelta * finalMultiplier)
```

Fatigue levels:

| Final Multiplier | Level |
|---:|---|
| >= 0.90 | fresh |
| >= 0.50 | wary |
| >= 0.20 | high |
| < 0.20 | exhausted |

Fatigue beat condition:

```text
trigger fatigue beat if localStreak >= 3 OR level is high/exhausted
```

If the same question type is repeated three times without V2 fatigue bypass, the legacy engine returns no progress and tells the player to change evidence, witness, or question angle.

### 18.6 Affinity and NPC Reaction Weights

Action affinity starts from lie motive:

| Lie Motive | Fact | Motive | Empathy | Evidence | Separation | Confidential |
|---|---:|---:|---:|---:|---:|---:|
| self_protection | 1.20 | 0.95 | 0.75 | 1.25 | 1.00 | 0.90 |
| face_saving | 0.85 | 1.20 | 0.90 | 1.00 | 0.95 | 1.10 |
| shame_avoidance | 0.70 | 0.95 | 1.25 | 0.90 | 1.00 | 1.25 |
| relationship_maintenance | 0.80 | 0.95 | 1.20 | 0.85 | 0.95 | 1.20 |
| revenge | 1.15 | 0.90 | 0.60 | 1.10 | 0.95 | 0.80 |
| third_party_protection | 0.75 | 0.95 | 1.10 | 0.85 | 1.20 | 1.30 |
| career_preservation | 1.05 | 0.95 | 0.70 | 1.25 | 0.90 | 0.95 |

Affinity grade:

| Score | Grade | Point |
|---:|---|---:|
| >= 1.20 | best | +2 |
| >= 1.05 | good | +1 |
| 0.85-1.04 | neutral | 0 |
| 0.70-0.84 | weak | -1 |
| < 0.70 | worst | -2 |

NPC reaction base weights:

| Action Quality | Comply | Resist | Counter |
|---|---:|---:|---:|
| good | 75 | 20 | 5 |
| normal | 55 | 30 | 15 |
| bad | 35 | 40 | 25 |

Reaction modifiers are added by archetype, motive, dispute kind, retaliation, and then normalized to 100%. Counter is capped at 15%. Outcomes:

| Outcome | Effect Multiplier | Authority Delta | Result |
|---|---:|---:|---|
| comply | 1.00 | 0 | uses blueprint stance |
| resist | 0.55 | 0 | hardens stance but respects lie-state floor |
| counter | 0.20 | -1 | switches to blame/counterattack |

Counter is blocked when:

```text
lieState is S4/S5 OR blockedVectors >= 3 OR trustWindow >= 60
```

When `authorityDelta` is applied in the action dispatcher, it is multiplied by 3 before changing `trustTowardJudge`.

### 18.7 Evidence and Witness Support

Evidence support for S5 uses the dispute's `requiredEvidence` plus every evidence whose `proves` includes that dispute.

Investigation requirement per evidence:

```text
requiredStage = 1 if evidence has no investigationStages
requiredStage = min(2, investigationStages.length) otherwise
```

Evidence condition is satisfied if any is true:

- `deepInvestigated` is true;
- investigated action count >= requiredStage;
- max stage presented to the target party >= requiredStage;
- requiredStage <= 1 and evidence was presented to that party.

Evidence presentation:

```text
currentPresentationStage = investigatedActions.length
if stage <= 0: cannot present
if same party already received this stage: cannot present again until stage increases
```

Witness support is satisfied if a related witness meets any one condition:

| Witness Condition | Support Result |
|---|---|
| heard related decisive slot | satisfied |
| heard 2+ related slots | satisfied |
| heard 1 related slot, witness is direct, summon count >= 2 | satisfied |

Witness call cost is investigation token 1.

### 18.8 Truth Breakthrough Gate

S5 is only allowed when route readiness and support readiness meet.

Route readiness:

| Route | Ready When |
|---|---|
| emotion | emotional phase is resigned OR internalValue >= 84 |
| trust | trustTowardJudge >= 100 |
| explicit | trigger contains `confession_dispatched`, `explicit_confession`, or a direct `truth_probe_confirmed` route that is explicitly authored to bypass support |
| blocked | neither route is ready |

Support readiness:

```text
conditionReady = satisfiedEvidence.length + satisfiedWitness.length > 0
```

Final gate:

```text
if route is explicit direct bypass: canBreakthrough = true
else canBreakthrough = routeReady && conditionReady
```

If code attempts S5 without this gate:

```text
from S4 -> stays S4, trigger suffix = :truth_gate_held
from S0-S3 -> moves only to S4, trigger suffix = :truth_gate_held
```

Current implementation guardrails:

- Witness truth probes may provide support or hold a target at S4/probe, but they do not force S5 alone.
- Emotional leak/slip events are observations or weak clues. They do not dispatch automatic S5 confession.
- Release QA must keep `qa:fast` at static P0 = 0 and route P0 = 0, `qa:free-interrogation` passing, and scripted semantic/template/runtime validators at FAIL = 0 for each active case.

### 18.9 Verdict Readiness

Readiness score:

```text
score =
  min(crackedDisputeCount, 2) * 1 +
  min(resolvedDisputeCount, 2) * 2 +
  min(investigationSuccessCount, 2) * 1 +
  min(fullCollapseCount, 2) * 1 +
  min(hiddenDisputeRevealCount, 1) * 1 +
  min(confessionCount, 1) * 2
```

Lie-state aggregation:

| Lie State | Readiness Bucket |
|---|---|
| S0-S1 | none |
| S2-S3 | cracked |
| S4 | resolved |
| S5 | resolved + confession |

Normal verdict condition:

```text
turn >= 12
score >= 5
crackedDisputeCount + resolvedDisputeCount >= 2
resolvedDisputeCount >= 2
investigationSuccessCount + fullCollapseCount >= 1
resolvedDisputeCount + fullCollapseCount + confessionCount >= 1
```

Early finish condition:

```text
turn >= 6 AND (
  resolvedDisputeCount >= 2 OR
  resolvedDisputeCount >= 1 AND fullCollapseCount >= 1 AND investigationSuccessCount >= 2
)
```

Forced verdict:

```text
effectiveMaxTurn = max(16 + emergenceCount * 4, 16 + hiddenDisputeRevealCount * 4)
if turn >= effectiveMaxTurn:
  verdictMode = normal if eligible else forced_incomplete
```

## 19. Current Acceptance Checklist

For `spouse-01`, `family-01`, and `friend-01`:

1. No route reaches S5 with question repetition alone.
2. Emotion peak without evidence/witness support holds at S4.
3. Trust peak without evidence/witness support holds at S4.
4. Evidence support plus route readiness reaches S5 only for that dispute.
5. Witness support plus route readiness reaches S5 only for that dispute.
6. A witness answer does not unlock unrelated disputes.
7. Automatic leak does not reveal S5 truth.
8. S5 has a clear cutscene and a route-specific dialogue.
9. Notebook receives the durable finding.
10. Dialogue log does not accumulate repeated low-value system lines.
11. Record summary accurately reports what is resolved and what remains.
12. LLM/free-question answers obey the same gate.
