# CT 이관 — 04-26 (사용자용 상세 가이드)

> **이 문서**: 새 스레드 시작 시 사용자가 직접 검토용
> **메모리 버전**: `memory/session_handoff_20260426_v3_complete.md` (다음 CT 자동 인지)

---

## 🎯 현재 상태

### Git
- spouse-01.json: modified (4,677 variants 통합 + QA 9 patch 적용 완료, 빌드 OK)
- 워킹 트리: spouse-01.json + tmp/ 분석 산출물 다수
- 다른 스레드 commits (UI 통합): d3ed033, 14890c8, 8bf90d0 — spouse-01.json 영향 X

### spouse-01 ScriptedText 보완 완료 ✓
- 1,253 → 4,677 variants (+3,432, 18 채널)
- 신규 4 채널: judge_evidence_combo / judge_witness_summon / rapport_milestone / contradict_milestone
- evidence_present stage 차원 신설 (코드 활성화는 별도 작업)
- dossier 옵션 B (lieBand 차원 신설)
- mediation 형식 변환
- system_message 평서체 narrative 톤
- 메인 13 patch + QA 9 patch 모두 적용

### Thread-QW-Cross (Codex 100회) — 사용자 진행 예정 ⚠️
- Codex 새 스레드에 의뢰 (cross-check 50 + 통계 분석 50)
- 작업 명세: `tmp/QA-thread-QW-codex-cross.md`
- 시작 메시지: `tmp/QA-QW-codex-cross-start-message.md` 박스 내용 복사 + `QA-thread-QW-codex-cross.md` 첨부
- 산출물 (예정): `tmp/QA-QW-codex-cross-{report.json,summary.md}`
- 다음 메인 작업: 산출물 받으면 ClaudeCode Thread-QW 결과와 cross-check + 추가 patch 적용 결정 (P0/P1/P2)

### family-01 GPT Pro 의뢰 진행 중 ⚠️
사용자가 이미 family-01 GPT Pro 의뢰 진행 (메인 commit 시점에 일부 산출물 회수됨):
- S1 interrogation: 산출물 3개 (`S01_family-01_scriptedText_merged_interrogation_v10.json` + 2 patch)
- S2 evidence stage d-1/d-2: 산출물 2개 (merged + entries)
- S3 evidence stage 다른 disputes: 산출물 1개 (entries)
- S4 dossier + witness: 산출물 3개 (expanded + merged + validation report)
- S5~S8: 미완료
- 위치: `gpt-pro-runs/judge-messages-v3/_master/assets-family-01/gpt-pro-package/sessions/SX/output/`

friend-01: GPT Pro 의뢰 미시작 (output 폴더 없음).

→ **다음 메인 우선순위**:
1. family-01 S5~S8 산출물 회수 (사용자 진행 완료까지 대기)
2. 모든 8 산출물 받으면 spouse-01 동일 절차 (자동화 스크립트 caseId/매트릭스 변경)로 통합 + 보정 + 적용

### family-01 / friend-01 GPT Pro 패키지 ✓
- 3 사건 모두 동일 형식 (source/ Knowledge 업로드용 + sessions/SX/ 세션 폴더 자기완결)
- 두 사용 방식 안내 (방식 A: Knowledge / 방식 B: 세션별 첨부)
- 사용자 GPT Pro 의뢰 시작 가능

---

## 🚨 다음 메인이 알아야 할 핵심 (직전 메인 학습 사항)

### 잘못 패턴 #1~#5 (직전 CT)
1. Agent 보고 무비판 수용 X — 데이터 직접 read 검증
2. 임의 이름/정보 작성 X
3. 다른 사건 정보 혼입 X
4. 신규 작성 vs 보완 혼동 X
5. 사용자 detail 메시지 = 항상 보완 방향

### 잘못 패턴 #6 — 보정 = 9차원 맥락-의미 정확성 (이번 세션 학습)
**보정은 단순 어휘 교체 X**. 9차원 맥락 (캐릭터 archetype × lieState × emotion × rapport × contradict_token × q_type × tone × 시점)을 정확히 매핑한 뒤 표현 선택.

사용자 직접 보정 모범 4 patch:
1. "쪽이었는데" → "주장이었는데" (인지 단계 약화)
2. "무엇을 알고" → "왜 그렇게 확신하고" (정보 → 동기 추궁)
3. "흐리면" → "밝히지 않으면" (추상 → 직접 행동)
4. "가족 돌봄으로" → "가족을 돌본 것이라고" (명사형 → 동사형 자연체)

### 잘못 패턴 #7 — 단순 확인 질문에 옵션 제시 X (이번 세션 학습)
- 사용자 "이거 spouse만이야?" → "응, spouse만" 한 줄
- 작업 옵션 (A/B/C/D)은 단계 종결 시 + 명시적 요청 시만

---

## 📋 다음 메인 작업 절차

### Phase 1: 사용자 GPT Pro 의뢰 진행 (사용자 직접)
- family-01 / friend-01 패키지 위치 (Windows):
  - `D:\ProjectWS\gpt-pro-runs\judge-messages-v3\_master\assets-family-01\gpt-pro-package\`
  - `D:\ProjectWS\gpt-pro-runs\judge-messages-v3\_master\assets-friend-01\gpt-pro-package\`
- 사용 방식 (README-사용가이드.md 참조):
  - 방식 A (권장): GPT Pro 프로젝트 생성 → source/ 11 파일 Knowledge 업로드 → 세션마다 prompt.md만 첨부
  - 방식 B: 세션마다 sessions/SX/ 폴더 안 모든 파일 첨부

### Phase 2: 산출물 회수 + 통합 (메인 진행)
spouse-01과 동일 절차 — 자동화 스크립트 재사용:

```bash
# 1. 형식/카운트 검증 (caseId 변경)
node tmp/inspect-outputs.cjs

# 2. 잘못 패턴 #6 자동 검출
node tmp/detect-issues-outputs.cjs

# 3. 정밀 필터링 (false positive 제거)
node tmp/refine-detection.cjs

# 4. 자동 보정 (사용자 모범 4 적용)
node tmp/generate-corrections.cjs

# 5. 정밀 점검 (조사 오류 fix)
node tmp/refine-corrections.cjs

# 6. 통합 (8 산출물 → 새 ScriptedText)
node tmp/merge-all.cjs

# 7. 적용 + 빌드
cp tmp/{caseId}-merged.json src/data/scriptedText/{caseId}.json
npm run build
npx tsc -b --force
```

⚠️ **family/friend는 사건별 차이 적응 필요**:
- 5 disputes (spouse 4)
- evidences 단수형 (spouse 복수형)
- dossier 카드 수 다름 (spouse 8 / family 11 / friend 9)

→ 각 스크립트에서 caseId / 매핑 / 분량 매트릭스 변경.

### Phase 3: QA 의뢰 (사용자)
spouse-01 QA 메시지 base로 사건별 변경:
- `tmp/QA-thread-QW-claudecode.md` → caseId/인물 변경 후 ClaudeCode 별도 스레드
- `tmp/QA-thread-Q-codex.md` → caseId/인물 변경 후 Codex

QA 결과 patch 메인 검증 후 적용.

### Phase 4: 시각 검증 (사용자)
```bash
npm run dev
```
사용자가 family-01 / friend-01 플레이 → 보강 효과 확인.

### Phase 5: 메모리 업데이트 + 새 인수인계
- `memory/session_handoff_*.md` 업데이트
- MEMORY.md 인덱스 갱신

---

## 🔥 최우선 강조 (다음 메인 필독)

### A. 잘못 패턴 #6 모범 4 (위 학습 사항 참조)
모든 보정 작업의 일관 기준.

### B. 자동 보정 한계
- 명사구 일부 자동 변환 X (예: "X 지원 내역" 그대로)
- 조사 오류 ("X 것로") 검증 필요
- 약한 단어 "쪽"은 NPC voice 보존 (자동 변환 X)

### C. 활성 3건만 + 다른 사건 혼입 X
spouse-01 / family-01 / friend-01만 작업.

### D. 사용자 단순 확인 → 짧은 답만
옵션 제시 자제 (잘못 패턴 #7).

---

## 📂 핵심 파일 위치 요약

### 활성 데이터
- `src/data/scriptedText/{spouse-01,family-01,friend-01}.json`
- `src/data/cases/generated/{caseId}.json`
- `src/data/claimPolicies/{caseId}-*.json`

### GPT Pro 패키지 (3 사건)
- `gpt-pro-runs/judge-messages-v3/_master/assets-{caseId}/gpt-pro-package/`

### 통합 스크립트 (재사용)
- `tmp/{inspect-outputs,detect-issues-outputs,refine-detection,generate-corrections,refine-corrections,merge-all}.cjs`

### QA 메시지 + 결과
- `tmp/QA-thread-{QW-claudecode,Q-codex}.md` (사건별 caseId 변경 후 재사용)
- `tmp/QA-Q-spouse-01-codex-*` (spouse-01 QA 결과 — 참고용)
- `tmp/QA-QW-spouse-01-*` (spouse-01 QA 결과 — 참고용)

### 메모리
- `MEMORY.md`
- `session_handoff_20260426_v3_complete.md` (현재 최신)
- `feedback_revision_meaning_over_form.md` (잘못 패턴 #6, #7)

---

## 🎬 새 스레드 첫 메시지 (사용자 복사용)

(아래 박스 내용 그대로 새 스레드에 복사)

```
이전 CT 이관 받아줘. 다음 파일 정독:

1. memory/MEMORY.md (인덱스)
2. memory/session_handoff_20260426_v3_complete.md (CT 이관 최신, spouse-01 통합 완료 + family/friend 패키지 준비)
3. tmp/CT-HANDOFF-20260426.md (사용자용 상세 가이드)
4. memory/feedback_revision_meaning_over_form.md (잘못 패턴 #6, #7)
5. memory/project_active_cases.md (활성 3건)
6. memory/story_v2_confirmed_3cases.md (3건 스토리)

현재 상태:
- spouse-01.json: 4,677 variants 통합 + QA 9 patch 적용 완료 (commit + push 완료)
- family-01 / friend-01 GPT Pro 패키지 준비 완료 (3 사건 동일 형식)
- **Thread-QW-Cross (Codex 100회) 진행 중** — 사용자가 별도 스레드에 의뢰. 산출물 받으면 검증 + patch 적용
- 다른 스레드 UI commits 진행 중 (spouse-01.json 무관)
- 빌드 OK (npm run build + npx tsc -b --force)

다음 작업:
1. **Thread-QW-Cross 산출물 회수 + 검증** (Codex 결과 받으면 — `tmp/QA-QW-codex-cross-*`)
2. 사용자 family-01 / friend-01 GPT Pro 의뢰 시작 (사용자 직접)
3. 산출물 받으면 spouse-01 동일 절차 적용 (메인 자동화 스크립트 재사용)
4. QA Thread-QW + Thread-Q 의뢰 (사건별 메시지 변경)
5. 시각 검증 (사용자 dev 서버)

핵심 강조 (메인 필독):
- 잘못 패턴 #6: 보정 = 9차원 맥락-의미 정확성 (단순 어휘 교체 X)
- 잘못 패턴 #7: 단순 확인 질문에 옵션 X
- 활성 3건만 (_LEGACY 무시)
- Agent 보고 무비판 수용 X (데이터 직접 read 검증)
- 사용자 모범 4 patch 일관 적용 (인지 단계 / 동기 추궁 / 직접 행동 / 동사형 자연체)

자료 위치:
- 패키지: gpt-pro-runs/judge-messages-v3/_master/assets-{caseId}/gpt-pro-package/
- 자동화 스크립트: tmp/{inspect-outputs,detect-issues-outputs,refine-detection,generate-corrections,refine-corrections,merge-all}.cjs
- QA 메시지: tmp/QA-thread-{QW-claudecode,Q-codex}.md (caseId 변경 후 사용)

진행 가능한 작업:
1순위. 사용자 GPT Pro 의뢰 진행 상황 확인
2순위. (사용자 산출물 회수 시) family-01 통합 절차 시작 — spouse-01과 동일
3순위. (family-01 완료 후) friend-01 동일 절차

정독 완료 후 어떤 작업부터 시작할지 물어봐줘.
```
