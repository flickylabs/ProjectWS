# GPT Pro 의뢰 — 스크립트 재작업 (2026-04-26)

## 프로젝트 개요

**솔로몬 법정** 게임의 ScriptedText 스크립트를 9 세션으로 재작업.

### 작업 범위 요약
- **재판관 4 채널 전면 재정비** (S1~S3 — 3 사건 × 4 채널 = 1,455 variants)
- **family-01 S8 tonePatch 재작업** (S5 — 사건 비율 정확 반영)
- **friend-01 S8 dossier 재작업** (S6 — S4 expanded base)
- **잘못 패턴 #6 보정** (S7~S9 — 3 사건 noun_action / weak_쪽 / 사용자 모범 4)
- **spouse-01 w-2-angle 추가** (S4 — case data combinationLab.nodes 단일 entry)

총 9 세션. **병렬 진행 가능** (각 세션 자기완결).

---

## 사용 방식 (방식 A 권장: GPT Pro 프로젝트 + Knowledge)

1. GPT Pro에서 **새 프로젝트 생성** (예: "Solomon Court Script Redo 20260426")
2. 프로젝트의 **Knowledge에 `source/` 폴더 11 파일 모두 업로드**
3. 9 세션 각 폴더의 `prompt.md`만 첨부하여 별도 conversation 시작
4. 각 conversation 병렬 진행 가능

## 사용 방식 (방식 B: 세션별 자기완결)

각 `sessions/SX/` 폴더 안에는 `prompt.md` + 그 세션에 필요한 source 파일 명시.
세션마다 source 파일을 별도로 첨부하여 conversation 시작.

---

## source/ 파일 일람 (11 파일)

### 사건 데이터 (3 파일)
1. `01-case-spouse-01.json` — spouse-01 사건 정의 (duo / disputes / evidence / combinationLab 등)
2. `01-case-family-01.json` — family-01
3. `01-case-friend-01.json` — friend-01

### ScriptedText 재판관 4 채널 발췌 (3 파일)
4. `02-scriptedText-spouse-01-judge.json` — judge_question / judge_contradiction / judge_evidence_combo / judge_witness_summon (465 variants)
5. `02-scriptedText-family-01-judge.json` — 510 variants
6. `02-scriptedText-friend-01-judge.json` — 480 variants

### ScriptedText 전체 (3 파일 — pattern6 / S8 작업용)
7. `03-scriptedText-spouse-01-full.json` — 18 채널 4,677 variants
8. `03-scriptedText-family-01-full.json` — 18 채널 5,172 variants
9. `03-scriptedText-friend-01-full.json` — 18 채널 5,082 variants

### 가이드 (4 파일)
10. `04-story-v2-3cases.md` — **3 사건 핵심 스토리 + 캐릭터 archetype** (절대 충돌 금지)
11. `05-user-pattern-correction.md` — **사용자 모범 patch 4 + 잘못 패턴 #6 / #7 / #8**
12. `06-korean-quality-rules.md` — 한국어 품질 규칙 (호칭 / 톤 / Truth Throttle / 깨진 조사)
13. `07-mistake-patterns.md` — 메인 잘못 패턴 #1~#8 (절대 회피)

---

## sessions/ 일람 (9 세션)

| 세션 | 작업 | 사건 | 규모 | 출력 |
|---|---|---|---|---|
| **S1** | 재판관 4 채널 재정비 | spouse-01 | 465v | `output/judge-rewrite-spouse-01.json` |
| **S2** | 재판관 4 채널 재정비 | family-01 | 510v | `output/judge-rewrite-family-01.json` |
| **S3** | 재판관 4 채널 재정비 | friend-01 | 480v | `output/judge-rewrite-friend-01.json` |
| **S4** | combinationLab w-2-angle 추가 | spouse-01 | 단일 entry | `output/spouse-01-w2-angle-patch.json` |
| **S5** | S8 tonePatch 재작업 (비율 정확) | family-01 | 64건 재생성 | `output/S08-family-01-aftermath-tone-patch-v2.json` |
| **S6** | S8 dossier 재작업 (S4 base) | friend-01 | 14건 재생성 | `output/s08-friend01-dossier-tonepatch-v2.json` |
| **S7** | 잘못 패턴 #6 보정 | spouse-01 | 검출 결과 | `output/correction-pattern6-spouse-01.json` |
| **S8** | 잘못 패턴 #6 보정 | family-01 | 175건+ | `output/correction-pattern6-family-01.json` |
| **S9** | 잘못 패턴 #6 보정 | friend-01 | 109건+ | `output/correction-pattern6-friend-01.json` |

각 세션 `output/` 폴더에 산출물 저장 (사용자가 수동으로 폴더 생성 후 업로드).

---

## 산출물 회수 절차 (사용자)

1. GPT Pro 각 세션에서 산출물 .json 다운로드
2. `gpt-pro-runs/script-redo-20260426/sessions/SX/output/` 폴더에 저장
3. 메인에게 회수 완료 알림

## 메인 통합 절차 (회수 후)

1. 각 산출물 사건 설정 spot check (잘못 패턴 #8)
2. 메인 patch 보존 검증
3. 통합 스크립트 (자동) — patch 적용 + 채널별 통합
4. 빌드 + tsc 검증
5. 사용자 시각 검증

## QA 의뢰 (이번 9 세션 완료 + 통합 후)

QA 3 의뢰 메시지는 별도 위치에 보관:
- `tmp/REQUEST-QA-A-codex-general.md` — 일반 QA Codex 200 tasks
- `tmp/REQUEST-QA-B-claude-script.md` — 스크립트 중심 QA Claude (9차원)
- `tmp/REQUEST-QA-C-codex-cross.md` — Cross Check Codex 100 tasks

이번 9 세션 산출물 통합 + 적용 후 QA 진행.

---

## 절대 강조

### 사건 설정 (★★★ 가장 중요)
- spouse-01: 외도 의심 / 조카 돌봄 / 시댁 갈등 / 위임장 / 투자 사기 (5,000만 원 증발)
- family-01: **A 40 / B 60** (B가 자기 몫 90→60 줄임). 절대 반대 X.
- friend-01: 예비신랑 선 넘은 메시지 / A 아버지 돈 갈취 / 같은 패턴 반복

### 잘못 패턴 #1~#8 모두 회피
`07-mistake-patterns.md` 정독 필수.

### 사용자 모범 4 patch 일관 적용
`05-user-pattern-correction.md` 정독 필수.

### 호칭 규칙
- 재판관 → 당사자: "OOO 씨"
- 재판관 → 증인: 증인 실명 ("오피스텔 경비님" / "박미라 씨" 등). **"증인 씨" 절대 X**
- 재판관 발언 합니다체 유지

### 검증 체크리스트 (각 세션 산출물 제출 전)
- [ ] 사건 설정 (사용자 메모 일치)
- [ ] 캐릭터 archetype 톤
- [ ] Truth Throttle 단계
- [ ] 호칭 규칙
- [ ] 합니다체 유지
- [ ] 사용자 모범 4 patch 적용
- [ ] before 본문 (S5/S6/S7/S8/S9) 실제 데이터 일치
- [ ] 직접 인용 + 시스템 관찰 결합 0건
