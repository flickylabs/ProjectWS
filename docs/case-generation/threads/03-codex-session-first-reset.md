# Thread: CASE_GENERATOR_REBUILD - Session-First Reset

Target: Codex

You are continuing the Korean-first case generator work for Project_Solomon.

## Controller Review Result

The previous `spouse-02` concept round is rejected.

This is not a small revision request. Start again from the generation guide.

The problem was not only the selected concept. The guide allowed concepts where the parties merely happened to be spouses. That is wrong for Project_Solomon.

## Main Correction

Cases must be **Session-first**.

If the selected Session is `spouse`, the central incident must be about something that naturally and specifically happens inside a spouse/marriage/long-term partnership relationship.

Do not take a generic dispute and force spouse labels onto it.

Read first:

- `docs/case-generation/session-first-case-guide.md`
- `docs/case-generation/current-generator-design.md`
- `docs/case-generation/pilot-case-generation-plan.md`
- `docs/case-generation/pilot-case-brief-template.md`
- `docs/disclosure-policy.md`
- `docs/information-surface-policy.md`
- `src/data/cases/generated/spouse-01.json`

## Required Work

### 1. Update the Generator Guide

Update:

- `docs/case-generation/current-generator-design.md`
- `docs/case-generation/pilot-case-generation-plan.md`

Add the Session-first rule explicitly.

The guide must say:

- The selected Session defines the case's core event.
- A case is invalid if it can move to another Session with only superficial renaming.
- Every concept must include a human-readable decision brief.
- Generator notes alone are not enough for controller decisions.

### 2. Mark Previous spouse-02 Concept As Rejected

Create:

- `tmp/case-generation/spouse-02/input/rejection-notes.md`

Explain:

- The previous Option A was rejected because it was a generic housing/repair/compensation dispute.
- It did not require the spouse Session.
- It should not be revised by simply adding marital details.
- `spouse-02` should restart with new concepts.

### 3. Regenerate spouse-02 Concepts From Scratch

Create:

- `tmp/case-generation/spouse-02/input/concept-options-session-first.md`
- `tmp/case-generation/spouse-02/input/controller-decision-brief.md`

Generate 3 completely new `spouse-02` concept options in Korean.

Each concept must be inherently spouse-centered.

Use at least two of these as core engines:

- shared marital finances
- spouse consent and trust
- career sacrifice inside marriage
- domestic labor imbalance
- family planning
- caregiving responsibility
- in-law pressure
- private information known inside marriage
- joint account / joint loan / joint lease / insurance beneficiary
- separation preparation handled in a grounded, non-sensational way

Avoid repeating `spouse-01`:

- no affair misunderstanding
- no officetel visit mystery
- no hidden sibling/niece care structure
- no investment scam center
- no joint savings withdrawal as the main twist

### 4. Make The Output Readable For The User

The controller must be able to decide without reading raw generator notes.

For each concept, include:

- 전체 시놉시스
- 왜 이 사건이 spouse Session인지
- Party A의 표면 입장
- Party B의 표면 입장
- 숨은 진실
- 초반에 플레이어가 믿게 되는 것
- 중반에 흔들리는 것
- 후반에 드러나는 것
- 4-5개 쟁점
- 5-7개 주요 증거
- 3명 주요 증인
- 판결 딜레마
- 기존 `spouse-01`과 다른 점
- 민감도 리스크
- 번역 리스크

Then recommend one option and explain why.

## Constraints

- Do not write production files under `src/data/**`.
- Keep drafts under `tmp/case-generation/spouse-02/`.
- Do not add `spouse-02` to `src/data/cases/refined/manifest.json`.
- Do not generate translations.
- Do not regenerate or edit existing active cases.
- Do not proceed to detailed runtime JSON until the controller approves one concept.

## Validation

Run:

```powershell
node --check scripts/generate-case-draft.mjs
npm run build:pc
```

If blocked or too slow, report it.

## Final Response

Report:

- Files created/modified.
- What guide changes were made.
- The 3 new concept titles.
- Recommended concept.
- Why the recommended concept is truly Session-first.
- Validation results.
- Questions for `PROJECT_CONTROL_TOWER`.
