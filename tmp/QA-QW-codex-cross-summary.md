# QA-QW Codex Cross-Check Summary

- 대상: `src/data/scriptedText/spouse-01.json`
- 총 variants: 4677 / channels: 18
- Part A: 50 tasks, weighted agreement 83% ({"일치":38,"다른 발견":5,"부분 일치":7})
- Part B: 50 statistical tasks

## 결론

- ClaudeCode가 지적한 조사 오류 6건과 `judgewit-w-3-mid-v1` 약한 표현은 현재본에서 모두 보정 완료.
- Codex 추가 발견: 자동 보정 artifact로 보이는 문법 오류 22건. 모두 P0 후보로 분리.
- `evidence_present`는 ClaudeCode 보고의 subjectRole 42 / lieBand 126 이원 패턴이 아니라 현재 활성 3건 모두 subjectRole+lieBand 동시 key 모델이다. loader와는 호환되지만 QA 기준 갱신이 필요하다.
- `combinationLab.nodes`에는 w-1 라벨 불일치와 w-2-angle 누락이 남아 있다. scriptedText 직접 결함은 아니지만 구조 정합 P1이다.

## 주요 통계

| 항목 | 결과 |
| --- | --- |
| interrogation trigram >= 0.6 | 22 |
| evidence_present trigram >= 0.6 | 31 |
| dossier early-late avg overlap | 0.095 |
| mediation trigram >= 0.6 | 0 |
| 박지연 helplessness global | 7/2134 (0.3%) |
| 이준호 answer_delay global | 528/2283 (23.1%) |
| 부인/부인하다 text hits | 0/0 |
| sourceRefs missing | 0 |

## 권장 Patch

### P0

현재본 text에 남아 있는 명백한 비문/조사 artifact입니다.

| channel | id | issue | old | new |
| --- | --- | --- | --- | --- |
| interrogation | `b-h-d3-S5-fact-pursuit-v8` | 제를 숨긴, 것는 | 재판관님, 아내의 위임장 조작과 제를 숨긴 것는 따로 봐야 합니다. 제 아내에게 말하지 않은 잘못까지 인정합니다. | 재판관님, 아내의 위임장 조작과 제가 숨긴 것은 따로 봐야 합니다. 제 아내에게 말하지 않은 잘못까지 인정합니다. |
| interrogation | `b-h-d3-S5-motive-search-v8` | 제를 숨긴, 것는 | 재판관님, 아내의 위임장 조작과 제를 숨긴 것는 따로 봐야 합니다. 제 아내에게 말하지 않은 잘못까지 인정합니다. | 재판관님, 아내의 위임장 조작과 제가 숨긴 것은 따로 봐야 합니다. 제 아내에게 말하지 않은 잘못까지 인정합니다. |
| interrogation | `b-h-d3-S5-empathy-approach-v8` | 제를 숨긴, 것는 | 재판관님… 아내의 위임장 조작과 제를 숨긴 것는 따로 봐야 합니다. 제 아내에게 말하지 않은 잘못까지 인정합니다. | 재판관님… 아내의 위임장 조작과 제가 숨긴 것은 따로 봐야 합니다. 제 아내에게 말하지 않은 잘못까지 인정합니다. |
| evidence_present | `b-e-6-late-restore_context-v10` | 제를 숨긴, 것와 | 이제는 제를 숨긴 것와 아내의 투자 사기 손실을 따로 기록해야 합니다. | 이제는 제가 숨긴 것과 아내의 투자 사기 손실을 따로 기록해야 합니다. |
| evidence_present | `b-e-7-late-restore_context-v6` | 제를 숨긴, 것를 | 저는 제를 숨긴 것를 인정합니다. 아내는 위임장 조작을 인정해야 합니다. | 저는 제가 숨긴 것을 인정합니다. 아내는 위임장 조작을 인정해야 합니다. |
| dossier | `dc-2-b-q1-early-v6` | 것는 | 외도를 숨긴 것는 아닙니다. 하지만 시댁 문제를 덮으려 한 건 사실입니다. | 외도를 숨긴 것은 아닙니다. 하지만 시댁 문제를 덮으려 한 건 사실입니다. |
| dossier | `dc-2-b-q1-late-v4` | 보다를, 것를 | 형네 사정이 알려지면 예전 시댁 상처가 다시 터질까 봐, 저는 진실보다를 피한 것를 골랐습니다. | 형네 사정이 알려지면 예전 시댁 상처가 다시 터질까 봐, 저는 진실을 피하는 쪽을 골랐습니다. |
| dossier | `dc-5-a-q1-late-v2` | 의를 숨긴, 것를 | 저는 남편의를 숨긴 것를 이유로 제 송금을 덮으려 했습니다. 하지만 순서는 숨길 수 없습니다. | 저는 남편이 숨긴 것을 이유로 제 송금을 덮으려 했습니다. 하지만 순서는 숨길 수 없습니다. |
| witness | `w-2-full-v8` | 었고를, 것는 | 위임 서류는 있었고를 처리한 것는 됐습니다. 다만 서명 진정성 확인은 충분하지 않았습니다. | 위임 서류는 있었고 처리는 됐습니다. 다만 서명 진정성 확인은 충분하지 않았습니다. |
| witness | `w-2-full-v9` | 안전한을, 것는 | 재판관님, 절차상 근거는 있었지만 안전한을 처리한 것는 아니었습니다. 그 점은 인정합니다. | 재판관님, 절차상 근거는 있었지만 안전한 처리는 아니었습니다. 그 점은 인정합니다. |
| aftermath | `a_primary_fault-v4` | 것와, 것를 | 판결 뒤 박지연에게 남은 건 잃은 돈보다 서명 한 줄의 무게였다. 재판관은 이준호의를 피한 것와 가족 사정을 숨긴 것를 짚었지만, 공동 적금을 해지하려고 위임장을 꾸민 선택을 더 무겁게 기록했다. 이준호는 형 문제를 더는 부부 밖에 숨기지 않겠다고 약속했고, 박지연은 사과와 피해 회복 계획을 먼저 내놓아야 했다. | 판결 뒤 박지연에게 남은 건 잃은 돈보다 서명 한 줄의 무게였다. 재판관은 이준호가 피한 점과 가족 사정을 숨긴 점을 짚었지만, 공동 적금을 해지하려고 위임장을 꾸민 선택을 더 무겁게 기록했다. 이준호는 형 문제를 더는 부부 밖에 숨기지 않겠다고 약속했고, 박지연은 사과와 피해 회복 계획을 먼저 내놓아야 했다. |
| contradiction_pursuit | `contra-a-d-2-S1-v7` | 없는을, 것였습니다 | 제가 의심한 건 돈 자체보다 설명 없는을 처리한 것였습니다. 그 차이는 분명히 봐주셔야 합니다. | 제가 의심한 건 돈 자체보다 설명 없이 처리된 일이었습니다. 그 차이는 분명히 봐주셔야 합니다. |
| contradiction_pursuit | `contra-a-h-d4-S3-v7` | 것와 | 남편의 2,000만 원을 숨긴 것와 제 3,000만 원 해지는 서로 다른 축이라는 걸 받아들이겠습니다. | 남편이 2,000만 원을 숨긴 것과 제 3,000만 원 해지는 서로 다른 축이라는 걸 받아들이겠습니다. |
| contradiction_pursuit | `contra-a-h-d4-S4-v9` | 의를 숨긴, 것와 | 위임장 조작이라는 축은 제 몫입니다. 남편의를 숨긴 것와 섞어서 흐릴 수 없습니다. | 위임장 조작이라는 축은 제 몫입니다. 남편이 숨긴 것과 섞어서 흐릴 수 없습니다. |
| contradiction_pursuit | `contra-b-d-2-S1-v7` | 단순한을, 것와 | 그 부분은 단순한을 숨긴 것와는 다릅니다. 쓰임을 빼고 말하면 사실이 반쪽이 됩니다. | 그 부분은 단순히 숨긴 것과는 다릅니다. 쓰임을 빼고 말하면 사실이 반쪽이 됩니다. |
| contradiction_pursuit | `contra-b-h-d3-S1-v9` | 것였습니다 | 그 적금 문제를 나중에 알았다고만 말한 건 제를 피한 것였습니다. 일부는 먼저 눈치챘습니다. | 그 적금 문제를 나중에 알았다고만 말한 건 제가 피한 것이었습니다. 일부는 먼저 눈치챘습니다. |
| contradiction_pursuit | `contra-b-h-d3-S3-v8` | 제를 숨긴, 것와, 것는 | 하지만 제를 숨긴 것와 서류를 처리한 것는 같은 무게가 아닙니다. 그 부분은 분리해 주셨으면 합니다. | 하지만 제가 숨긴 것과 서류를 처리한 것은 같은 무게가 아닙니다. 그 부분은 분리해 주셨으면 합니다. |
| contradiction_pursuit | `contra-b-h-d4-S2-v4` | 것는 | 침묵의 시작이 제 쪽일 수 있습니다. 하지만 아내의 서류를 처리한 것는 또 다른 축입니다. | 침묵의 시작이 제 쪽일 수 있습니다. 하지만 아내가 서류를 처리한 것은 또 다른 축입니다. |
| contradiction_pursuit | `contra-b-h-d4-S2-v8` | 한을 처리한, 것를 | 먼저 숨긴 건 제 잘못입니다. 그래도 아내가 한을 처리한 것를 제가 동의한 건 아닙니다. | 먼저 숨긴 건 제 잘못입니다. 그래도 아내가 처리한 것을 제가 동의한 건 아닙니다. |
| interjection | `interject-b-h-d4-major-v2` | 것는 | 박지연! 내가 말 못 한 건 잘못이지만, 당신이 한 서류를 처리한 것는 다른 문제야! | 박지연! 내가 말 못 한 건 잘못이지만, 당신이 서류를 처리한 것은 다른 문제야! |
| judge_question | `judgeq-h-d4-fact_pursuit-2-v4` | 단순을, 것를 | 두 분, 범죄 행위와 단순을 숨긴 것를 같은 말로 묶지 않겠습니다. | 두 분, 범죄 행위와 단순히 숨긴 것을 같은 말로 묶지 않겠습니다. |
| judge_witness_summon | `judgewit-w-2-mid-v2` | 어떻게를 | 해지 서류가 어떻게를 처리한 것됐는지 더 미룰 수 없습니다. 은행 직원을 부르겠습니다. | 해지 서류가 어떻게 처리됐는지 더 미룰 수 없습니다. 은행 직원을 부르겠습니다. |

### P1

- `evidence_present` QA 기준 갱신: 현재 loader와 데이터는 `(party,evidenceId,lieBand,subjectRole)` 통합 key 모델.
- `combinationLab.nodes` 정리: `w-1-angle` 라벨을 오피스텔 경비로 정정, `w-2-angle` 은행 직원 축 추가.

### P2

- 박지연 helplessness marker 보강: S2/S3 일부에 낮은 빈도로 추가.
- trigram-overlap 0.6 이상 후보는 raw report의 top pairs 기준으로 정형 반복인지 수동 샘플링.

## 산출물

- Raw: `tmp/QA-QW-codex-cross-report.json`
- Summary: `tmp/QA-QW-codex-cross-summary.md`
