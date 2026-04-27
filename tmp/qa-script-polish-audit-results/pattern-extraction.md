# Script Polish Audit Pattern Extraction

Date: 2026-04-27

## High-risk Regex / Keyword Patterns

### spouse-01
- `/가족을 돕는 일이 급/` in NPC S0-S2 interrogation: exact S2 truth leak.
- `/형한테 온 문자|제 형에게 온 문자|형 번호/` in e-4 before late confession.
- `/비자금/` in early evidence_present for e-5.
- `/학용품|조카|가족 사정/` in early evidence_present for e-1~e-5.
- `/형 이야기를|형을 도운|형에게|가족 사정|가족 안의 갈등/` in `judge_*` channels.
- `/이유은|때문입니다, 제가|그 가족라는/` for Korean polish defects.

### family-01
- `/유서를 손댄/` in S0 NPC interrogation.
- `/배다른/` before S3+.
- `/자기 몫을 줄/` in early evidence_present.
- `/출생에 관한 사실|출생 비밀/` in `judge_question` and `judge_contradiction`.
- `/공장 자금/` in `judge_evidence_combo` and `judge_witness_summon`.
- `/유서를 바꾼 진짜 이유/` in early evidence_present.
- `/만을/` for Korean quality pass.

### friend-01
- `/먼저 선을 넘는 메시지|선을 넘은 말/` in evidence_discovery/evidence_present before late confession.
- `/거절한 사실|거절한 사람/` in judge channels.
- `/예비신랑에게 돈 이야기를 꺼낸/` in early evidence_present.
- `/예비신랑의 먼저 보낸 말|대화의 선후가 먼저/` for Korean/Q-A polish.
- `/^문구가... 같습니다.$/` for response-thin evidence reaction.

## Homologous Candidate Areas
- Surface-only judge channels: `judge_question`, `judge_contradiction`, `judge_evidence_combo`, `judge_witness_summon`.
- Early/gated evidence channels: `evidence_present` with `lieBand=early` or stage 1/2; `evidence_discovery` capture/probe/confirm steps.
- NPC S0-S2 interrogation and contradiction routes.
- Polish-only pass over all variants for particle mistakes and comma-spliced causal clauses.