# Recommended Patch Priority

Date: 2026-04-27

This is a CT-Main handoff recommendation only. No patch was applied in this audit session.

## P0
1. Block surface-only judge truth lexemes across all 3 cases.
   - spouse: `형`, `조카`, `가족 사정`, `가족 안의 갈등` in `judge_*`.
   - family: `출생에 관한 사실`, `출생 비밀`, `공장 자금` in `judge_*`.
   - friend: `거절한 사실`, `선을 넘는 메시지/말` in `judge_*` and `evidence_discovery`.
2. Fix early/gated evidence_present truth leaks.
   - spouse e-1/e-4/e-5 early variants.
   - family e-4/e-7 early variants.
   - friend e-4/e-5 early-mid variants.
3. Fix NPC S0-S2 direct truth leaks.
   - spouse S2 `가족을 돕는 일이 급했습니다`.
   - family S2 `배다른 동생`.

## P1
1. Tighten family S0 direct denial wording around `유서를 손댄`.
2. Review `비자금`, `자기 몫을 줄`, and `예비신랑에게 돈 이야기를 꺼낸` as paraphrase leakage rather than exact anchor lexemes only.
3. Re-run a broad homologous detection pass after any patch request; do not patch only the examples in findings.json.

## P2
1. Korean polish pass for `이유은`, `때문입니다, 제가`, `그 가족라는`, `의 먼저 보낸 말`, `대화의 선후가 먼저`.
2. Response-thin pass for short evidence reactions such as `문구가... 같습니다.`.
3. Optional tone review for repeated hard judge command `답하십시오`; not promoted as a finding by itself because hard tone can be intentional.