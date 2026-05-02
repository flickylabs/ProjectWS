# Truth Breakthrough Logic

This document defines the shared truth-disclosure rule for all active cases:
`spouse-01`, `family-01`, and `friend-01`.

## Design Goal

Truth disclosure must happen per dispute, not per character as a whole. Emotion and trust are shared character meters, but they only create an opportunity. A specific dispute reaches S5 only when the player also secures concrete support through evidence, witness testimony, or an authored direct truth probe.

The intended player-facing loop is:

1. The player pressures or reassures a character.
2. The character reaches a route peak: resignation through pressure, or cooperation through trust.
3. The player secures a dispute-specific support condition through evidence or witness testimony.
4. The judge pushes that exact dispute.
5. The truth holder gives a route-specific confession, correction, or decisive statement.
6. Only that dispute reaches truth stage S5.

## Shared S5 Gate

A dispute can enter S5 only when both halves are true.

### Route Readiness

One of the following must be true:

- Emotion route: the target is in the resigned band, or emotional pressure has reached the peak threshold.
- Trust route: trust toward the judge has reached the maximum band.
- Explicit route: an authored confession, witness truth probe, or direct truth confirmation is being executed.

### Support Condition

One of the following must be true for the same dispute:

- Evidence condition: an evidence item required by the dispute, or an evidence item whose `proves` list includes the dispute, has been investigated or presented deeply enough.
- Witness condition: a witness whose `relatedDisputeIds` includes the dispute has given testimony slots connected to that dispute. A decisive slot or at least two related slots are enough. A direct witness can also satisfy the condition after at least one related slot and repeated questioning.
- Explicit bypass: only an authored route that is deliberately marked as direct can bypass evidence/witness support.

If route readiness is true but support is missing, the dispute may rise to S4 but must not enter S5.

## Case Coverage

The rule is case-data driven and applies to all active cases.

- `spouse-01`: uses `requiredEvidence`, `evidence.proves`, and spouse witness `relatedDisputeIds` to determine whether a specific marital dispute can reach S5.
- `family-01`: uses the same evidence/witness gate for inheritance, caregiving, testament, debt, and capacity disputes. Family terms are normal public relationships, not automatic truth leaks.
- `friend-01`: uses the same gate for contact intent, reputation harm, online/public-message disputes, and money/access patterns.

No case should use a spouse-only string rule such as `형`, `조카`, or `오피스텔` to decide truth disclosure. Those are content terms. The runtime gate must rely on structured case data.

## Route Identity

Emotion route:

- Player intent: pressure, contradiction pursuit, repeated factual pressure at the right timing.
- Character posture: collapse, anger, defensive exhaustion, resignation.
- Confession style: reluctant, terse, cornered, often ashamed or irritated.
- VFX: pressure peak first; if S5 follows, use a separate truth-breakthrough cutscene.

Trust route:

- Player intent: empathy, careful fact separation, non-accusatory clarification.
- Character posture: guarded cooperation, relief, willingness to explain.
- Confession style: voluntary explanation, less hostile, more complete context.
- VFX: trust peak first; if S5 follows, use a separate truth-breakthrough cutscene.

Explicit witness/evidence route:

- Player intent: use a key witness or evidence at the right stage.
- Character posture: depends on who owns the lie. A non-liar should not "confess"; they give confirmation, correction, or a judicially useful statement.
- VFX: source-specific emergence or notebook/destination effect, then S5 breakthrough if the dispute actually resolves.

## Anti-Exploit Rule

Character affinity may make a route more effective, but it cannot let one button solve a dispute by repetition.

Expected behavior:

- Strong affinity improves early progress.
- Repeating the same question type on the same target/dispute becomes stale.
- Stale repetition should produce no further lie-state progress and should tell the player to change angle.
- The player must vary question type, evidence, witness, or timing.

## Leak Route Policy

Raw automatic leak is not a full route.

Allowed:

- Authored, stage-safe slips that become observations.
- Slips can create a probe opportunity.
- If a slip is used, the judge must catch it and the player must pursue it before S5.

Blocked:

- A slip alone cannot force S5.
- A slip cannot dump S5 truth text before the dispute reaches S5.
- Generated or unreviewed leak text must not be treated as confession.

## Meter Consumption

Emotion and trust are character-wide meters. Because S5 is dispute-specific, a single meter peak must not unlock every dispute.

Runtime policy:

- S5 is evaluated against one dispute at a time.
- After S5, the route opportunity is consumed for that dispute.
- Future tuning may cool down or partially reset the shared meter so a peak does not chain-unlock unrelated disputes.
- Even without cooldown, other disputes still require their own evidence or witness support.

## Cutscene Priority

Strong cutscenes are reserved for rare structural events:

- Emotion peak.
- Trust peak.
- S5 truth breakthrough.
- New dispute emergence.
- New evidence emergence.
- New witness emergence.

The S5 truth-breakthrough cutscene must feel different from the emotion/trust peak cutscene because they can happen back-to-back. UI sequencing is strict: close active modal first, run cutscene, apply destination absorption/highlight, then show follow-up panel or dialogue.

## Runtime Numbers

The detailed numeric appendix lives in `docs/gdd/solomon-truth-loop-gdd.md`. The active gate currently uses these headline values:

| Area | Runtime Value |
|---|---|
| Emotion phases | defensive 0, confident 20, shaken 40, angry 60, resigned 80 |
| Emotion route ready | phase is `resigned` or internal value >= 84 |
| Trust initial value | trustTowardJudge 30, fearOfExposure 50, retaliationWorry 30 |
| Trust route ready | trustTowardJudge >= 100 |
| Legacy voluntary confession helper | trustTowardJudge >= 70, but this is not enough for the new S5 gate |
| Evidence support requirement | required evidence or `proves` evidence investigated/presented to required depth |
| Evidence required depth | 1 if no stages, otherwise `min(2, investigationStages.length)` |
| Witness support requirement | decisive related slot, or 2 related slots, or 1 related direct-witness slot with summon count >= 2 |
| Fact repetition transition threshold | S0-S1 needs 2 local tokens; S2+ needs 3 |
| Fatigue floor | repeated stale angles can reduce effect multiplier down to 0.05 |
| Normal verdict minimum turn | 12 |
| Early finish minimum turn | 6 |
| Base forced verdict turn | 16 plus 4 turns per emerged/hidden dispute |

The key balancing rule is that emotion and trust are only route readiness. They do not unlock S5 without support from evidence, witness testimony, or an authored explicit probe.

## Content Requirements

S0-S2:

- No direct truth payload.
- Use guarded language and incomplete explanations.
- Do not expose hidden family, money, or relationship truth unless the case publicly allows it.

S3-S4:

- Allow stronger hints and pressure.
- Still avoid full confession unless the S5 gate passes.
- If a line feels like confession, it belongs at S5 or must be rewritten.

S5:

- The liable truth holder, or the correct confirming source, gives the decisive statement.
- The statement must be tied to the support condition that unlocked it.
- The judge's notebook records the confirmed truth, not a generic system message.

## LLM Requirements

LLM/free-question responses must receive and respect:

- `caseId`
- current dispute
- current lie state
- route readiness
- support condition status
- character profile and archetype
- public relationship terms
- evidence/witness support source if present

The LLM may not reveal S5 truth unless the runtime gate says the dispute can reach S5 or the route is an authored explicit truth probe.

## Acceptance Tests

Minimum tests for each active case:

1. Repeating one question type alone does not reach S5.
2. Emotion peak without evidence/witness support holds at S4.
3. Trust peak without evidence/witness support holds at S4.
4. Evidence support plus route readiness can reach S5 for only the supported dispute.
5. Witness support plus route readiness can reach S5 for only the supported dispute.
6. A witness for one dispute does not unlock unrelated disputes.
7. Automatic leak does not force S5.
8. S5 produces route-specific confession/confirmation text, not generic system text.
