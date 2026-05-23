# spouse-01 NPC 적극 발화 5 차원 cleanup (50 entries)

> 본 file을 진행하기 전 `policy-01-natural-korean.md` 와 `policy-02-truth-disclosure.md` 를 정독해 주세요.

---

## 본 batch 특이성

- 50 unique entries 1:1 polish
- 채널 분포: interrogation 13 / evidence_present 27 / dossier 1 / aftermath 7 / contradiction_pursuit 1 / trust_action 1
- 패턴 분포: 1.강력어휘:범죄 18 + 2.모호referent:다른_사정 14 + 4.직역구문:그_행동에는 5 + 2.모호referent:다른_일 5 + 2.모호referent:제_일 4 + 1.강력어휘:사기 4
- ★ lieState 단계 분리 정책:
  - S5 자백 영역 (강력 어휘 자기 인정 자연) → batch 제외 (32 entries 보존됨)
  - **본 batch entries** = S0~S4 (회피/변명) + 모든 단계 (모호 referent / 직역구문)

---

## 변경 대상 50 entries

| ID | channel | party | lieBand | stage | qt | 5차원 패턴 | KO 원본 |
|----|---------|-------|---------|-------|-----|------|---------|
| dc-4-a-q2-mid-v3 | dossier | - | mid | evade | - | 1.강력어휘:사기 | 사기 가능성을 말하면 서류와 돈 문제까지 같이 열릴까 봐 겁났습니다. |
| a-e-7-mid-restore_context-v1 | evidence_present | a | mid | evade | - | 1.강력어휘:범죄 | 범죄라고 하시면 무섭습니다. 저는 남편이 결국 동의할 거라고 생각했습니다. |
| b-e-1-mid-self-v4 | evidence_present | b | mid | evade | - | 2.모호referent:다른_사정 | 참고서 얘기까지 나오면 다른 사정도 말해야 합니다. 제가 볼 책은 아니었습니다. |
| b-e-1-mid-stage1-v6 | evidence_present | b | mid | evade | - | 4.직역구문:그_행동에는 | 이 자료가 제 행동에서 나온 건 맞습니다. 하지만 그 행동에는 다른 사정이 있었습니다. |
| b-e-1-mid-stage3-v1 | evidence_present | b | mid | evade | - | 2.모호referent:다른_사정 | 참고서까지 산 건 다른 사정 때문입니다. 말하지 않은 건 제 책임입니다. |
| b-e-2-mid-stage1-v6 | evidence_present | b | mid | evade | - | 4.직역구문:그_행동에는 | 이 자료가 제 행동에서 나온 건 맞습니다. 하지만 그 행동에는 다른 사정이 있었습니다. |
| b-e-2-mid-stage2-v1 | evidence_present | b | mid | evade | - | 2.모호referent:다른_일 | 같은 장소를 반복해서 간 건 다른 일정 때문입니다. 다만 더 자세한 건 조심스럽습니다. |
| b-e-2-mid-stage2-v6 | evidence_present | b | mid | evade | - | 2.모호referent:다른_일 | 다른 일정이었다고만 말씀드리겠습니다. 다른 사람의 사정까지 얽혀있어 말씀드리기 어렵습니다. |
| b-e-3-mid-stage1-v6 | evidence_present | b | mid | evade | - | 4.직역구문:그_행동에는 | 이 자료가 제 행동에서 나온 건 맞습니다. 하지만 그 행동에는 다른 사정이 있었습니다. |
| b-e-3-mid-stage2-v6 | evidence_present | b | mid | evade | - | 2.모호referent:다른_사정 | 다른 사정이라고만 말씀드리겠습니다. 다른 사람의 사정까지 얽혀있어 말씀드리기 어렵습니다. |
| b-e-4-mid-stage1-v6 | evidence_present | b | mid | evade | - | 4.직역구문:그_행동에는 | 이 자료가 제 행동에서 나온 건 맞습니다. 하지만 그 행동에는 다른 사정이 있었습니다. |
| b-e-4-mid-stage2-v1 | evidence_present | b | mid | evade | - | 2.모호referent:다른_일 | 번호를 저장하지 않은 이유는 다른 일이 커질까 봐서였습니다. 다만 더 자세한 건 조심스럽습니다. |
| b-e-4-mid-stage2-v6 | evidence_present | b | mid | evade | - | 2.모호referent:다른_일 | 다른 일이 커질까 봐서였다고만 말씀드리겠습니다. 다른 사람의 사정까지 얽혀있어 말씀드리기 어렵습니다. |
| b-e-5-mid-stage1-v6 | evidence_present | b | mid | evade | - | 4.직역구문:그_행동에는 | 이 자료가 제 행동에서 나온 건 맞습니다. 하지만 그 행동에는 다른 사정이 있었습니다. |
| b-e-5-mid-stage3-v1 | evidence_present | b | mid | evade | - | 2.모호referent:다른_사정 | 그 돈은 다른 사정을 처리하려고 뺀 겁니다. 말하지 않은 건 제 책임입니다. |
| b-e-7-mid-restore_context-v3 | evidence_present | b | mid | evade | - | 1.강력어휘:범죄 | 범죄 여부를 따진다면, 저도 먼저 숨긴 사실을 같이 말해야 합니다. |
| a-h-d3-S3-empathy-approach-v1 | interrogation | a | - | evade | - | 1.강력어휘:범죄 | 범죄라는 건 압니다. 그래도 그때는… 살아남는 게 먼저였습니다. |
| a-h-d4-S3-empathy-approach-v9 | interrogation | a | - | evade | - | 1.강력어휘:범죄 | 재판관님, 범죄라는 단어를 듣는 건 아직도 버겁습니다. 그래도 그 상처가 쉽게 가라앉지 않았습니다. |
| a-h-d4-S3-fact-pursuit-v4 | interrogation | a | - | evade | - | 1.강력어휘:범죄 | 제가 먼저 본 사람인 데서 끝난 게 아니라, 결국 제가 먼저 범죄로 넘어갔습니다. 그건 사실입니다. |
| a-h-d4-S3-fact-pursuit-v9 | interrogation | a | - | evade | - | 1.강력어휘:범죄 | 재판관님, 범죄라는 단어를 듣는 건 아직도 버겁습니다. 그걸 보고도 가만히 있기는 어려웠습니다. |
| a-h-d4-S3-motive-search-v1 | interrogation | a | - | evade | - | 1.강력어휘:범죄 | 남편은 숨기는 잘못을 했지만, 저는 범죄를 저질렀습니다. 겁이 나서 제 몫을 먼저 빼야 한다고 생각했습니다. |
| a-h-d4-S3-motive-search-v3 | interrogation | a | - | evade | - | 1.강력어휘:범죄 | 확인만으로는 안심이 안 됐습니다. 그래서 제가 직접 먼저 움직였고, 그 움직임이 범죄가 됐습니다. |
| a-h-d4-S3-motive-search-v9 | interrogation | a | - | evade | - | 1.강력어휘:범죄 | 재판관님, 범죄라는 단어를 듣는 건 아직도 버겁습니다. 제가 잘했다는 뜻은 아니지만, 겁이 판단을 밀었습니다. |
| b-d-1-S3-fact-pursuit-v10 | interrogation | b | - | evade | - | 2.모호referent:다른_사정 | 재판관님, 다른 사정을 숨긴 건 맞지만 외도는 아닙니다. 숨긴 일과 외도는 다르게 봐야 합니다. |
| b-d-2-S2-motive-search-v2 | interrogation | b | - | evade | - | 2.모호referent:제_일 | 제 일이라기보다 집안에서 바로 손을 써야 하는 일이었습니다. |
| b-h-d4-S4-fact-pursuit-v1 | interrogation | b | - | evade | - | 1.강력어휘:범죄 | 서류 처리 경위는 범죄입니다. 하지만 거기까지 몰아간 건 제 침묵이라고 생각합니다. |
| trust-b-separation-S3-v5 | trust_action | b | - | evade | - | 2.모호referent:다른_일 | 혼자 말씀드리면, 비자금도 형에게 갔습니다. 외도와는 다른 일이었습니다. |
| a-d-2-S5-empathy-approach-v9 | interrogation | a | - | confess | - | 2.모호referent:제_일 | 재판관님, 남편의 3,000만 원 출금을 앞세워 제 일을 덮으려 했습니다. 제가 숨긴 이유까지 이제는 기록해야 합니다. |
| a-d-2-S5-fact-pursuit-v9 | interrogation | a | - | confess | - | 2.모호referent:제_일 | 재판관님, 남편의 3,000만 원 출금을 앞세워 제 일을 덮으려 했습니다. 제가 숨긴 이유까지 이제는 기록해야 합니다. |
| a-d-2-S5-motive-search-v9 | interrogation | a | - | confess | - | 2.모호referent:제_일 | 재판관님, 남편의 3,000만 원 출금을 앞세워 제 일을 덮으려 했습니다. 제가 숨긴 이유까지 이제는 기록해야 합니다. |
| a_primary_fault-v1 | aftermath | - | - | unknown | - | 1.강력어휘:사기 | 판결 뒤 박지연은 오래 고개를 들지 못했다. 이준호의 숨김이 가벼운 잘못은 아니었지만, 재판관은 위임장 조작과 투자 사기 송금을 더 무겁게 보았다. 이준호는 형과 조카 이야기를 더는 숨기지 않겠다고 했고, 박지연은 잃은 돈보다 먼저 무너진 신뢰를 어떻게 감당할지 마주하게 되었다. |
| a_primary_fault-v2 | aftermath | - | - | unknown | - | 1.강력어휘:범죄 | 법정이 정리된 뒤에도 부부는 곧바로 서로를 마주 보지 못했다. 재판관은 누군가를 위한 침묵보다 문서를 조작하고 공동 적금을 빼낸 선택이 더 치명적이었다고 판단했다. 이준호는 형 문제를 공개적으로 정리하겠다고 했고, 박지연은 불안이 범죄로 바뀐 순간을 되짚으며 천천히 자리를 떴다. |
| a_primary_fault-v5 | aftermath | - | - | unknown | - | 1.강력어휘:범죄 | 박지연은 '저도 버림받을까 두려웠다'고 마지막까지 말했지만, 판결은 그 두려움이 범죄의 방패가 될 수 없다고 정리했다. 이준호는 형과 조카 일을 숨긴 책임을 인정하며 시댁 갈등을 따로 정리하겠다고 했다. 부부는 한동안 별거하며 공동재산 회복과 형사 절차를 따로 진행하기로 했다. |
| procedural_caution-v1 | aftermath | - | - | unknown | - | 1.강력어휘:범죄 | 재판관은 위임장 조작이 관계 다툼으로 덮일 수 없는 범죄라고 분명히 경고했다. 동시에 이준호의 침묵 역시 박지연을 벼랑 끝으로 몰았다는 점을 짚으며, 처벌과 별개로 관계 회복의 문은 닫지 않았다. 두 사람은 각자 잘못을 인정하는 서류보다 먼저, 서로에게 설명해야 할 말을 떠안고 돌아갔다. |
| protective_resolution-v1 | aftermath | - | - | unknown | - | 1.강력어휘:사기 | 재판관은 승패보다 회복을 먼저 말했다. 형과 조카 문제는 더는 비밀로 둘 수 없고, 투자 사기 피해도 부부가 함께 수습해야 할 일이라고 했다. 법정을 나서는 두 사람 사이엔 여전히 서늘함이 남았지만, 처음으로 같은 방향을 봐야 한다는 말 앞에서는 둘 다 오래 침묵했다. |
| protective_resolution-v2 | aftermath | - | - | unknown | - | 1.강력어휘:사기 | 결론은 단죄만으로 끝나지 않았다. 재판관은 이준호에게는 가족 문제를 투명하게 드러내라고, 박지연에게는 숨은 돈을 쫓는 대신 피해 회복 절차를 밟으라고 권했다. 형과 조카, 사기 피해, 무너진 부부 관계가 한꺼번에 놓인 자리에서 두 사람은 처음으로 함께 해결해야 할 문제를 마주했다. |
| shared_fault-v4 | aftermath | - | - | unknown | - | 1.강력어휘:범죄 | 한 사람만 피해자라고 부르기 어려운 결말이었다. 이준호의 침묵은 외도 오해를 키웠고, 박지연의 선제행동은 범죄와 손실로 이어졌다. 두 사람은 합의 이혼과 관계 회복 상담을 모두 열어 둔 채, 먼저 형 가족을 도운 것과 공동재산 관리를 문서로 정리하기로 했다. |
| contra-a-h-d3-S1-v6 | contradiction_pursuit | a | - | deny | - | 1.강력어휘:범죄 | 제가 서류를 챙겼다고 해서 바로 범죄자처럼 보시면 안 됩니다. 당시에는 확인이라고 생각했습니다. |
| a-e-1-early-stage3-v6 | evidence_present | a | early | deny | - | 2.모호referent:다른_사정 | 이 단서를 다른 사정으로 받아들이기는 어려웠습니다. 남편이 숨긴 게 너무 많다고 느꼈습니다. |
| a-e-2-early-stage3-v6 | evidence_present | a | early | deny | - | 2.모호referent:다른_사정 | 이 단서를 다른 사정으로 받아들이기는 어려웠습니다. 남편이 숨긴 게 너무 많다고 느꼈습니다. |
| a-e-3-early-stage3-v6 | evidence_present | a | early | deny | - | 2.모호referent:다른_사정 | 이 단서를 다른 사정으로 받아들이기는 어려웠습니다. 남편이 숨긴 게 너무 많다고 느꼈습니다. |
| a-e-4-early-stage3-v6 | evidence_present | a | early | deny | - | 2.모호referent:다른_사정 | 이 단서를 다른 사정으로 받아들이기는 어려웠습니다. 남편이 숨긴 게 너무 많다고 느꼈습니다. |
| a-e-5-early-stage3-v6 | evidence_present | a | early | deny | - | 2.모호referent:다른_사정 | 이 단서를 다른 사정으로 받아들이기는 어려웠습니다. 남편이 숨긴 게 너무 많다고 느꼈습니다. |
| a-e-7-early-request_original-v3 | evidence_present | a | early | deny | - | 2.모호referent:다른_사정 | 적금은 다른 사정 때문에 해지한 겁니다. 제가 혼자 꾸민 일은 아닙니다. |
| a-e-7-early-restore_context-v1 | evidence_present | a | early | deny | - | 1.강력어휘:범죄 | 범죄라는 말로 몰아가면 저는 더 말하기 어렵습니다. |
| a-e-7-early-restore_context-v10 | evidence_present | a | early | deny | - | 1.강력어휘:범죄 | 범죄 행위라고 바로 확정하면, 제가 왜 그런 판단을 했는지는 사라집니다. |
| b-e-1-early-stage3-v1 | evidence_present | b | early | deny | - | 2.모호referent:다른_사정 | 중학생용 참고서까지 물으시면 지금은 답하기 어렵습니다. 그걸 설명하려면 다른 사정까지 말해야 합니다. |
| b-e-3-early-stage3-v1 | evidence_present | b | early | deny | - | 2.모호referent:다른_사정 | 짧게 끊긴 통화까지 물으시면 지금은 답하기 어렵습니다. 번호를 밝히면 다른 사정까지 말해야 했습니다. |
| b-e-5-early-stage3-v1 | evidence_present | b | early | deny | - | 2.모호referent:다른_사정 | 현금이 마지막에 어디로 갔는지까지 물으시면 지금은 답하기 어렵습니다. 돈의 행선지를 말하면 다른 사정까지 알려질 수밖에 없습니다. |
| b-e-7-early-restore_context-v1 | evidence_present | b | early | deny | - | 1.강력어휘:범죄 | 범죄라고까지 들으니 더 멍합니다. 저는 그런 동의를 한 적이 없습니다. |

---

## 출력 형식

```
## spouse-01 NPC 적극 발화 5 차원 cleanup (50 entries) 결과

dc-4-a-q2-mid-v3:
변경 후: <<polish 결과>>
변경 영역: <<자연화 영역 요약>>

... (50 entries 모두)
```

### 출력 시 주의사항

1. ID 표 그대로 사용
2. 변경 후 텍스트는 자연 한국어 (원문 길이/리듬 보존)
3. 변경 영역은 짧고 명료
4. **lieState stage 정합** (deny=S0/S1 / evade=S2~S4 / confess=S5)
5. **차원 1 강력 어휘**: S0~S4는 완화 / S5는 자기 인정 (본 batch에 confess 3 entries 있음 — 모호 referent/직역구문만 정리, 강력 어휘는 보존)
6. **차원 2 모호 referent**: "다른 사정 / 다른 일 / 제 일" → 구체 referent
7. **차원 3 피동 직역**: 능동·내면 발화로
8. **차원 4 직역구문**: "그 행동에는 뜻이 있었습니다" → 한국어 내면 발화체
9. **차원 5 자연 완충재**: "말씀드리기 어렵지만 / 어쩔 수 없었습니다 / 변명의 여지가 없습니다" 활용
10. **진실 누설 자가 점검**: spouse-01 hidden keyword 신규 도입 X
