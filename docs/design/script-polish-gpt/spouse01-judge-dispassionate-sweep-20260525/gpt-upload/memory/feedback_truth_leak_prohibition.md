---
name: 진실 누설 금지 — 게임 핵심 원칙 (잘못 패턴 #9)
description: 메인 잘못 패턴 #9. 재판관 / 시스템 메시지 등에서 NPC 자백 전 진실 콘텐츠 직접 언급 X. evidence는 surfaceName만 사용. dossier 카드 의미는 추상화. CLAUDE.md 핵심 원칙 위반 사례.
type: feedback
originSessionId: 04-26 v3 truth leak
---

# 진실 누설 금지 — 게임 핵심 원칙 (잘못 패턴 #9)

## 게임 핵심 원칙 (CLAUDE.md)

> **"진실은 플레이어가 직접 밝혀낸다"** — 어떤 채널도 플레이어보다 먼저 답을 말하면 안 됨.

## Why (2026-04-26 발생)

GPT 9 세션 작업 적용 후, 사용자가 spot check로 재판관 채널에서 70건 진실 누설 발견. 메인이 GPT 의뢰 메시지에 "사건 핵심 사실"만 강조 + "누설 금지"를 명시 안 한 결과. CLAUDE.md 핵심 원칙 위반.

대표 누설 sample:
- ❌ "GPS 좌표와 **형의 문자** 내용을 함께 놓고 보겠습니다." → e-4 진실 (= 형 문자) 노출
- ❌ "**조카 학교 알림**이 한 장소로 모입니다." → 조카 진실 노출
- ❌ "**형과 조카** 쪽으로 맞물립니다." → 가족 돌봄 진실 노출
- ❌ "**위임장 조작** 의심과 투자방 송금이 어디서..." → e-7 진실 노출

## How to apply

### 절대 회피 영역
재판관 4 채널 + 시스템 메시지 + dossier 안내 + (NPC 자백 전 시점 모든 채널):
- judge_question
- judge_contradiction
- judge_evidence_combo (가장 위험 — dossier 카드 의미 노출 위험)
- judge_witness_summon
- system_message
- aftermath는 OK (판결 후 narrative)
- NPC interrogation 등은 lieState 단계 따라 점진 노출이 정상 — 단 S0~S2에서 진실 노출 X

### Evidence — surface vs 진실 매핑

각 사건의 evidence.surfaceName만 사용. evidence.name (진실 호칭) 사용 X.

#### spouse-01 (가장 위험)
| ID | ✅ surface | ❌ 진실 (재판관 X) |
|---|---|---|
| e-1 | 영수증 묶음 5장 | (조카 학용품) |
| e-2 | 블랙박스 GPS 기록 | (오피스텔 주소) |
| e-3 | 통화기록 | (형과의 새벽 통화) |
| **e-4** | **발신자 미상 문자** | **형 문자 / 조카 학교 알림** ★ |
| e-5 | 개인 계좌 출금 내역 | (이준호 비자금) |
| e-6 | 투자방 카톡 기록 | (박지연 사기) |
| e-7 | 공동 적금 해지 서류 | (위임장 조작) |

추가 금지 키워드 (재판관 발화 시):
- "형", "조카", "친형", "돌봄", "가족을 돌본", "가족 사정", "위임장 조작", "투자 사기", "형 빚"

#### family-01
- e-7 surface = "어머니 일기장" / 진실 = "출생 비밀 (A 배다른 자식)"
- 금지 키워드: "출생 비밀", "배다른", "혈연 다른", "20년 동안 B 돈", "정후 돈으로 어머니"

#### friend-01
- 금지 키워드: "예비신랑이 먼저", "아버지의 사기", "아버지 돈 갈취", "같은 패턴 반복"

### dossier 카드 의미 — 추상화 (judge_evidence_combo)

dossier 카드 = 두 증거 조합으로 드러나는 진실의 방향성. 재판관은 그 진실을 "추궁의 단서"로만 사용. 답은 NPC가.

#### 올바른 패턴 (sample)
- ❌ "GPS와 형 문자 스레드가 한 사실을 가리킵니다." (e-4 진실 노출)
- ✅ "GPS 기록과 발신자 미상 문자가 한 사실을 가리킵니다." (surface 사용)
- ✅ "두 자료가 같은 시점, 같은 사람을 가리킵니다." (자료 의미 추상화 — 누가/뭐인지는 NPC가 답)

### GPT/Codex 의뢰 메시지 작성 시 필수
- "진실 누설 금지" 영역을 **가장 위에 명시**
- 사건별 surface vs 진실 매핑표 첨부
- 사용자 지적 4가지 잘못 sample 예시 명시
- dossier 카드 의미 추상화 가이드

### 자동 검증 시스템 (재발 방지)
모든 GPT/Codex 산출물 적용 전후 자동 실행:
- `tmp/detect-truth-leak.cjs` — 사건별 진실 키워드 검출
- `tmp/precheck-matrix.cjs` — 매트릭스 정합 + 호칭/조사/null text

검출 0건 PASS 후에만 적용.

## 관련 메모리
- `feedback_revision_meaning_over_form.md` — 잘못 패턴 #6, #7, #8
- `feedback_judge_question_quality.md` — 재판관 질문 품질 (기계적 관찰문 / 간접 인용)
- `story_v2_confirmed_3cases.md` — 3 사건 사건 설정
- `CLAUDE.md` — 게임 핵심 원칙
