# CT → Codex: headline-01 스모크 테스트 작업 요청

> 발신: CT (Claude Code)
> 수신: Codex (스모크 테스트 전담 스레드)
> 일시: 2026-04-08
> 유형: 통합 검증 작업

---

## 배경

`headline-01` (천만 조회의 저녁 — 리뷰어 vs 사장) 사건이 파이프라인 전체를 통과한 첫 번째 케이스입니다. RuntimeCaseData, V3 GameLoopData, ScriptedText가 모두 존재하며 validator PASS 상태입니다.

**이 스레드의 목표**: headline-01을 실제 게임 엔진에 로드하여 전체 파이프라인이 정상 작동하는지 검증하고, 발견된 문제를 보고합니다.

---

## 프로젝트 이해를 위한 필수 읽기

1. **`CLAUDE.md`** (프로젝트 루트) — 게임 구조, 기술 스택, 8단계 재판 루프, 핵심 엔진 파일 목록
2. **`docs/ref/리뉴얼참고/message-to-claudecode-ct-current-handoff.md`** — Codex(스크립트 스레드)가 CT에 전달한 현재 상태 메시지
3. **`docs/ref/리뉴얼참고/codex-to-ct-headline-status-response.md`** — headline-01 상태 상세 응답

---

## 기술 스택 요약

```
React 19 + TypeScript 5.9 + Vite 8 + Tailwind CSS 4 + Zustand 5
실행: npm run dev (포트 5173, 모바일) / npm run dev:pc (포트 5174, PC)
타입: npx tsc -b --force
```

---

## headline-01 관련 파일

| 파일 | 역할 | 상태 |
|------|------|------|
| `src/data/cases/generated/headline-01.json` | RuntimeCaseData (1,129줄) | 완성 |
| `docs/ref/리뉴얼참고/headline-01-v3-game-loop-data.json` | V3 GameLoopData | 완성 |
| `docs/ref/리뉴얼참고/headline-01-v3-game-loop-data.ts` | V3 TS 등록 | 완성 |
| `src/data/claimPolicies/headline-01.ts` | ClaimPolicies 등록 브릿지 | 완성 |
| `src/data/scriptedText/headline-01.json` | ScriptedText (8,395줄) | 완성, PASS |
| `src/data/cases/refined/manifest.json` | 케이스 목록 (headline-01 포함) | 완성 |
| `tmp/headline-01-stage3-validate.txt` | 검증 로그 | PASS, summary={} |

---

## 검증 항목 (4가지)

### 검증 1: 게임 로드 정상 여부

headline-01을 선택하여 게임이 정상적으로 초기화되는지 확인합니다.

**확인 방법**:
1. `npm run dev` 실행 (포트 5173)
2. 브라우저에서 게임 시작
3. headline-01 사건이 선택 가능한지 확인 (또는 `getRandomCase('headline')` 호출)
4. Phase 0 (사건 소개) 화면이 정상 표시되는지 확인

**확인 포인트**:
- `caseId: "case-headline-01"` — caseLoader가 `case-` prefix를 올바르게 처리하는지
- `duo.partyA.name: "강민호"`, `duo.partyB.name: "정태성"` 정상 표시
- `disputes` 4개, `evidence` 6개 인식
- `baseEvidenceIds: ["e-1", "e-3", "e-5"]` 초기 증거 해금
- 콘솔에 에러/경고 없음

**가능한 문제**:
- caseId 포맷: manifest에는 `headline-01`이지만 JSON 내부는 `case-headline-01`. caseLoader에서 매칭 로직 확인 필요
- solutions 포맷: headline-01의 `solutions`가 배열이 아닌 딕셔너리(`{"공개정정": [...], ...}`). verdictEngine이 이 포맷을 처리할 수 있는지 확인

### 검증 2: 증거 뷰어 런타임 데이터 연결

6개 증거가 runtime data의 `viewerData/meta` 기준으로 표시되는지 확인합니다.

**headline-01 증거 목록**:

| ID | 이름 | type | meta.trustLevel | meta.source | viewerData 타입 |
|----|------|------|----------------|-------------|----------------|
| e-1 | 원본 촬영본과 최종 업로드본 비교 | device | mid | third | device |
| e-2 | 주방 CCTV와 위생 체크 사진 | cctv | high | org | cctv |
| e-3 | 구청 위생 시정 메일과 재점검 기록 | log | high | org | log |
| e-4 | 사전 협조 DM과 사후 회복 패키지 견적 | chat | mid | third | chat |
| e-5 | 점주 단체방 공유 캡처와 삭제 복구본 | chat | mid | third(sus) | chat |
| e-6 | 평점 하락 타임라인과 플랫폼 확산 로그 | sns | high | org | sns |

**확인 방법**:
1. Phase 4 (증거 조사) 진입
2. 각 증거를 선택하여 뷰어가 열리는지 확인
3. viewerData 내용이 정상 렌더링되는지 확인

**확인 포인트**:
- 증거 뷰어 컴포넌트가 `viewerData` 필드를 읽는지 (vs 하드코딩된 데모 데이터)
- meta 태그 (trustLevel, source, legality) 표시
- investigationStages 3단계 질문 동작

### 검증 3: ScriptedText 키 매칭

scriptedText의 key가 실제 게임플레이에서 생성되는 lookup key와 정확히 매칭되는지 확인합니다.

**확인 방법**:
1. Phase 3 (심문) 진입
2. 각 심문 유형(fact_pursuit, motive_search, empathy_approach) 실행
3. NPC 응답이 scriptedText에서 정상 조회되는지 확인

**확인 포인트**:
- `llmDialogueResolver.ts`에서 scriptedText lookup 시 key 포맷: `{party}|{disputeId}|{lieState}|{questionType}`
- 4 disputes × 6 lieStates × 3 questionTypes × 2 parties = 144 조합이 커버되는지
- fallback이 아닌 실제 scripted line이 반환되는지 (콘솔 로그 확인)
- `llmSpeechGuide.ts`의 scriptedText 참조 경로 확인

**핵심 엔진 파일 참조**:
- `src/engine/llmDialogueResolver.ts` — LLM 호출 + scripted text fallback
- `src/engine/llmSpeechGuide.ts` — scripted text 로딩/조회
- `src/data/scriptedText/headline-01.json` — scripted text 데이터

### 검증 4: 전체 게임 루프 완주

Phase 0 ~ Result까지 전체 루프를 한 번 완주하여 크래시/에러 없이 진행 가능한지 확인합니다.

**확인 방법**:
1. Phase 0: 사건 소개 읽기 → Phase 1 진입
2. Phase 1: 초기 진술 (스크립트 자동 재생) → Phase 2 진입
3. Phase 2: 반박 진술 → Phase 3 진입
4. Phase 3: 심문 최소 3턴 수행
5. Phase 4: 증거 제시 최소 1회
6. Phase 5: 재심문 최소 1턴
7. Phase 6: 중재 → Phase 7 진입
8. Phase 7: 판결 (책임 비율 + 솔루션 선택)
9. Result: 점수/칭호 표시

**확인 포인트**:
- 각 Phase 전환 시 에러 없음
- LieState 전이가 정상 동작 (S0 → S1+ 이동 확인)
- 감정 상태 변화 (defensive → 다른 상태)
- 판결 화면에서 solutions 딕셔너리 포맷 정상 처리

---

## 알려진 잠재 이슈

1. **caseId prefix**: `case-headline-01` vs `headline-01` — caseLoader 매칭 로직 확인
2. **solutions 포맷**: 딕셔너리 `{"공개정정": [...]}` — verdictEngine 호환 여부
3. **socialGraph 미존재**: duo에 `socialGraph` 없음, `activeThirdParties` top-level — witnessEngine 호환
4. **Phase 1/2 스크립트**: `src/data/dialogues/phase1/headline-01.json` 존재 여부 — 없으면 generic fallback 사용

---

## 보고 형식

검증 완료 후 아래 형식으로 결과를 보고해 주세요:

```
## headline-01 스모크 테스트 결과

### 검증 1: 게임 로드
- [ ] PASS / FAIL
- 발견 이슈: (있으면 기술)

### 검증 2: 증거 뷰어
- [ ] PASS / FAIL
- 발견 이슈:

### 검증 3: ScriptedText 키 매칭
- [ ] PASS / FAIL
- 발견 이슈:

### 검증 4: 전체 루프 완주
- [ ] PASS / FAIL
- 발견 이슈:

### 종합 판정
- headline-01 기준 케이스 승인: YES / NO / 조건부
- 필수 수정 사항: (있으면)
- 권장 수정 사항: (있으면)
```

---

## 유의사항

- **코드 수정은 최소한으로** — 이 스레드의 목적은 검증이지 구현이 아님
- caseLoader/verdictEngine 등에서 포맷 불일치 발견 시, 문제와 원인만 보고 (수정은 CT가 판단)
- 콘솔 에러/경고를 빠짐없이 기록
- LLM 연결 없이도 테스트 가능 (offline 모드 / scripted text fallback)
