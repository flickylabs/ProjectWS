# S3: evidence_present stage 차원 신설 (h-d3, h-d4 관련 evidence)

> ⚠️ **사건별 차이**: 본 prompt.md는 spouse-01 패턴을 base로 작성. **Knowledge의 사건 데이터(특히 `00-common-instructions.md`, `01-character-info.md`)를 우선 참조**하여 사건별 인물(송다은/최수민), dispute, evidence, dossier에 맞춰 작업하라.


> **작업 시작 전 필수**: **같은 폴더 안의 source 파일들** (또는 GPT Pro 프로젝트 Knowledge에 업로드된 동일 파일들)을 참조.
> **특히** `00-common-instructions.md` 전체 학습 후 작업 시작.
> **산출물**: 본 답변에 JSON 형식 entries 배열 출력. 메인(Claude Opus)이 받아 한국어 보정 후 patch 적용.

---

## 작업 목표
S2와 동일 작업 — h-d3/h-d4 관련 evidence (e-6, e-7).

## 분량
- 2 evidence × 2p × 3 lieBand × 3 stage = 36 cells × 10v = **360 entries**
- ⚠️ 명세 v2의 +550 분량은 e-1~e-7 전체 재계산 시 미세 조정 — **이 세션 정확 분량은 +360**
- (S2와 합산 시 evidence_present 전체 = 90 + 36 = 126 cells × 10v = 1,260 entries → 명세 §3.2 정확)

## 작업 명세

### 2 evidence (h-d3, h-d4 관련)
| id | name | subjectParty | requiredLieState |
|---|---|---|---|
| e-6 | 박지연 투자방 카톡 + 송금 기록 | a | S2 |
| e-7 | 공동 적금 해지 서류 (위임장) | (재확인 — a가 핵심) | (재확인) |

### subjectRole (party × subjectParty)
- e-6 (a): a → self / b → other
- e-7 (a 추정): a → self / b → other (재확인 필요)

## 입력 자료

### evidence 정의
파일: `Knowledge: `04-case-friend-01.json`` → `evidences[]`

### e-6 핵심
- investigationResults.request_original: "박지연이 투자방에 3,000만원을 송금한 내역과 카톡 대화 기록"
- check_metadata: "송금 시점은 5주 전, 친구 박미라가 보내준 링크를 통해 가입. 송금액 = 공동 적금 해지액과 정확 일치"
- restore_context: "투자방은 사기였으며, 4주 전에 3,000만원 전액 손실이 확정"
- partyContext.a.questionAngle: "이 송금 기록에 대해 설명해 주십시오"
- partyContext.b.questionAngle: "이 기록을 처음 보십니까? 아내가 이런 일을 한 것을 알고 있었습니까?"

### e-7 (재확인 필수 — `cases/generated/friend-01.json` evidences[6] 직접 read)
위임장 + 해지 기록. A의 위임장 조작 증거.

## 작성 가이드

### a (박지연 self)
- e-6: 투자 사기 피해 경위 — early에는 회피/부정 / mid에는 부분 인정 / late에는 자백
- e-7: 위임장 조작 — early에는 강한 부정 / mid에는 핑계 (남편 동의 가정) / late에는 인정 (S5)

### b (이준호 other)
- e-6: 박지연 행동을 처음 알게 된 충격 / 거기까지 몰린 경위 인정
- e-7: 적금 해지 사실을 자기도 모르고 있었음 / 자기 침묵이 단초였음 인정

## 검증 체크리스트
[S2 동일](./S2-evidence-stage-d1-d2.md#검증-체크리스트) + 다음:
- [ ] e-7의 subjectParty 사건 데이터 직접 read 후 확정
- [ ] 박미라 (w-3 친구) 언급 시 "h-d3 친구 — 오피스텔 무관" 정합 유지
- [ ] e-6 송금액 = 공동 적금 해지액 일치 단서 (h-d3과 연결)
