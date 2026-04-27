# REQUEST — Codex-Dev B: Free Interrogation Guard / Fallback / API 실패 처리 (P0-B)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P0 (출시 전 최우선)
**병렬**: P0-A (자유심문 MVP) / P0-C (Release QA)

---

## 1. 목표

자유심문 LLM 응답 경로의 **launch-safe gate** 구축. global disclosure guard와 별도 영역. 위험 응답 / API 실패 / 빈 응답 시 게임이 멈추지 않고 안전 fallback으로 대체된다.

---

## 2. 진입 조건

- HEAD: `c6ec522`
- baseline anchor: `baseline-pre-policy-v1` (a10b801) / `baseline-pre-policy-v2` (acf5d27)
- global feature flag: `VITE_DISCLOSURE_GUARD_MODE=off` **유지** (이 의뢰서로 변경 X)
- working tree: tracked clean (untracked OK)
- `npm run check:all` PASS (hard 0 / warnings 157 baseline-known)

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / 실패 기준 / fallback 패턴 검수 | CT-Main |
| **이 세션 (Codex-Dev B)** | **freeInterrogationGuard / fallback lookup / API 실패 처리 / heuristic 검출** |
| 자유심문 UI / intent / 매핑 / pipeline | Codex-Dev A (P0-A) |
| Release readiness | Release QA (P0-C) |

---

## 4. Scope

### 4.1 신규 영역
- `src/engine/freeInterrogation/guard.ts` — `evaluateFreeInterrogationResponse(text, ctx) → GuardResult`
- `src/engine/freeInterrogation/fallback.ts` — 안전 fallback lookup (캐릭터 × lieState 매트릭스)
- `src/engine/freeInterrogation/heuristic.ts` — 캐릭터 무관·intent 불일치·빈 응답 휴리스틱 검출
- `src/types/freeInterrogationGuard.ts` — 타입
- feature flag: `VITE_FREE_INTERROGATION_GUARD_MODE=off|log|fallback` (default `fallback`)

### 4.2 재활용 영역
- 기존 `disclosureGuard.ts`의 `blockHiddenTruthLexemes` 함수 호출 (paraphrase set + globalTruthLexemes 재사용)
- 자유심문 추가 차원만 본 의뢰서 영역

### 4.3 fallback lookup 매트릭스

캐릭터 archetype × lieState 별 안전 fallback 응답 (각 3~5 variants).

```
박지연 (victim_cosplay) × S0   → ["그건 답하기 어렵습니다", "잠시 생각해보겠습니다", ...]
박지연 (victim_cosplay) × S1   → ...
박지연 (victim_cosplay) × S2   → ...
박지연 (victim_cosplay) × S3+  → ...
이준호 (avoidant) × S0          → ["...글쎄요", "잘 모르겠습니다", ...]
이준호 (avoidant) × S1          → ...
... (family-01 / friend-01 NPC 4명도 동일)
```

총 6 NPC × 4 lieState bucket (S0/S1, S2, S3+, S4·S5) × 3~5 variants = 72~120 entries.

**조건**:
- 캐릭터 archetype 정합 (victim_cosplay = 단정적 / avoidant = 모호 / etc.)
- lieState 정합 (S0~S2 = 진실 누설 0 / S3+ = 일부 허용)
- 한국어 자연체 (번역체 9패턴 X / 명사형 어색 X)
- 호칭·존칭 정합 (재판관 → "OOO 씨" / 당사자 → "재판관님" 합니다체)

---

## 5. Guard 차원

| 차원 | 검출 | 처리 |
|---|---|---|
| 위험 lexeme | 기존 `blockHiddenTruthLexemes` 재사용 | fallback lookup |
| paraphrase 우회 | 기존 paraphrase set 재사용 | fallback lookup |
| API 실패 / timeout | 5초 timeout + retry 1회 | fallback lookup |
| 빈 응답 / `...` | text trim length < 5 | fallback lookup |
| 캐릭터 무관 응답 | archetype tone heuristic (예: avoidant인데 단정 단어 강하게 등장) | fallback lookup |
| intent 불일치 | P0-A에서 intent 전달 + 응답 keyword 정합 | fallback lookup |

---

## 6. 절대 회피선

- global `VITE_DISCLOSURE_GUARD_MODE` default 변경 X (`off` 유지)
- log/sanitize/block global 자동 진입 X (기존 Phase 0 운영 영역 변경 X)
- ScriptedText / caseData 직접 수정 X
- baseline anchor 회귀 X
- 기존 `disclosureGuard.ts` 본체 변경 X (재사용만 / 새 영역은 freeInterrogation/ 하위)
- pc.css touch X
- `llmDialogueResolver.ts` 본체 변경 X (P0-A의 hook 자리만)

---

## 7. 실패 기준 (CT 정의)

| # | 실패 패턴 | 검증 |
|---|---|---|
| 1 | 위험 lexeme 검출 시 원문 그대로 출력 | 기존 paraphrase set sample 50건 검증 |
| 2 | API 실패 시 게임 정지 | timeout simulation × 5회 |
| 3 | 빈 응답 시 fallback X | 빈 응답 simulation × 3회 |
| 4 | fallback이 캐릭터 archetype 무관 | archetype 정합 sample 검토 |
| 5 | fallback이 lieState 무관 (S0~S2에서 진실 누설) | lieState bucket sample 검토 |
| 6 | fallback 한국어 번역체 / 어색 | 사용자 spot check |
| 7 | log mode 자동 진입 (의도 외) | feature flag default 검증 |

---

## 8. 종료 조건

- [ ] feature flag `VITE_FREE_INTERROGATION_GUARD_MODE=fallback` (default) 동작 검증
- [ ] 위험 lexeme 50건 sample → fallback 100% pass
- [ ] API timeout × 5 / 빈 응답 × 3 → 게임 정지 X / fallback pass
- [ ] fallback 매트릭스 6 NPC × 4 lieState bucket × 3+ variants 작성 + 정합 검토
- [ ] `log` mode = QA 전용 / 자동 진입 X 검증
- [ ] `npm run check:all` PASS (hard 0)
- [ ] `npm run build` PASS / `npx tsc -b --force` PASS
- [ ] 산출물: `tmp/qa-codex-dev-b-freeinterrogation-guard-results/` 영역 + summary.md

---

## 9. 산출물

- `tmp/qa-codex-dev-b-freeinterrogation-guard-results/20260427-spike-summary.md` (1차 spike)
- `tmp/qa-codex-dev-b-freeinterrogation-guard-results/20260427-mvp-summary.md` (MVP 완료)
- fallback 매트릭스 sample JSON
- API 실패 시뮬 결과 log

---

## 10. 관련 자료

- `docs/disclosure-policy.md` — disclosure 정책 본문 (재활용)
- `src/engine/disclosureGuard.ts` — Tier 3 guard MVP (재활용)
- `src/engine/disclosurePolicyLoader.ts` — paraphrase set loader (재활용)
- 본 세션 진입 메시지: `tmp/CODEX-DevB-NEXT-START-MESSAGE.md`
- 협조 의뢰서: `tmp/REQUEST-Codex-DevA-FreeInterrogation-MVP.md` (P0-A — hook 인터페이스 합의)

---

**상태**: 초안 작성 완료. Codex-Dev B 검토 + 1차 spike 진입 대기.
