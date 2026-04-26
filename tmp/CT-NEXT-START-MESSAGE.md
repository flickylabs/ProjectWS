# 새 ClaudeCode CT 첫 메시지 (사용자 복사용)

> **사용 방법**: 새 ClaudeCode 스레드 시작 → 아래 박스 안 내용 그대로 복사 → 첫 메시지로 던짐
> **상황**: ScriptedText 폴리싱 v6까지 완료 + UI 3건 fix + 5 commits push (vercel 배포 OK, 플레이 가능 확인됨)

---

```
이전 CT 이관 받아줘. 다음 파일 정독:

1. memory/MEMORY.md (인덱스)
2. memory/session_handoff_20260427_v6.md (CT 이관 최신 — Codex v4/v5/v6 + UI 3건 fix)
3. memory/feedback_truth_leak_prohibition.md (잘못 패턴 #9 — 진실 누설 금지)
4. memory/feedback_broad_homologous_detection.md (잘못 패턴 #11 — 광범위 동형 검출 본질)
5. memory/feedback_static_analysis_limit.md (잘못 패턴 #12 — 정적 분석 한계 / D1~D4 차원)
6. memory/feedback_revision_meaning_over_form.md (잘못 패턴 #6/#7/#8)
7. memory/story_v2_confirmed_3cases.md (3건 사건 핵심)
8. memory/project_active_cases.md (활성 3건)
9. CLAUDE.md (게임 구조 + 핵심 원칙 "진실은 플레이어가 직접 밝혀낸다")

현재 상태 (origin/main = a10b801):
- ScriptedText 폴리싱 627 patches 누적 (v4 81 + v5 385 + v6 161)
- v3 매트릭스 (채널 × 시점 × 화자 누설) 보존 / 누설 0건
- UI 3건 fix 완료: 증인 소환 slot whitelist / 판결 보류 미니 아이콘 / 증거 제시 subjectParty 분기
- vercel 정상 배포 + 플레이 가능 확인

분담 정착 (사용자 명시):
- Codex = 의미 / 맥락 / 상황 / 게임 흐름 / 메커니즘
- ClaudeCode = 호칭 / 존칭 / 어법 / 자연체

핵심 강조 (메인 절대 회피):
- 잘못 패턴 #1 Agent 보고 무비판 수용 X (자동 검증 PASS = 완료 X — spot check 필수)
- 잘못 패턴 #6 9차원 의미 정확성 (단순 어휘 교체 X)
- 잘못 패턴 #9 진실 누설 금지 (v3 매트릭스 절대 보존)
- 잘못 패턴 #11 사용자 사례 = 예시 (광범위 동형 검출이 본질)
- 잘못 패턴 #12 정적 분석 한계 (게임 흐름/메커니즘/정량 차원 별개)

다음 메인 우선순위 (사용자 결정 영역):
1순위. 사용자 게임 테스트 spot check 사례 수신 → 패턴 추출 + 동형 처리
2순위. P1 Q-A 정합 잔여 (자동 검출 한계 — 사용자 + 메인 협업 영역)
3순위. C1/C3 보류 영역 폴리싱 (false positive 의심으로 보류 중)
4순위. P7 UI 누설 별도 코드 fix 의뢰 (p7-ui-surface-leaks-v6.json 활용)
5순위. d-5 신규 cell GPT Pro 의뢰 (S10/S11 패키지 + "진실 누설 금지" prompt 추가 후 시작)
6순위. 코드 fallback 23건 정리

자료 위치:
- Codex 산출물: tmp/codex-recovery/{,-v3,-v4,-v5,-v6}/
- 의뢰서: tmp/REQUEST-Codex-recovery-v[2,4,5,6].md
- Claude 폴리싱: tmp/polish-c2-narration.cjs / tmp/polish-c3-c4-lexicon.cjs / tmp/fix-v6-truth-leak.cjs
- 검증: tmp/detect-truth-leak.cjs / tmp/precheck-matrix.cjs / 각 codex-recovery-v*/precheck-*.cjs

UI 변경 영역 (이번 세션):
- src/types/{character,discovery}.ts
- src/store/slices/{discoverySlice,eventFeedbackSlice}.ts
- src/components/pc/feedback/{EventFeedbackCard,DiscoveryFeedbackWatcher}.tsx
- src/components/pc/hotbar/{PCBottomDock,PCDeferredVerdictIcon}.tsx
- src/components/pc/layout/PCInteractionPanel.tsx (witness whitelist + subjectParty 분기)
- src/components/pc/panels/PCLeftPanel.tsx
- src/components/phase/Phase0_CaseIntro.tsx
- src/engine/discoveryEngine.ts
- src/app/pc.css

정독 + 사용자 다음 명령 대기.
```

---

## 사용자 참고 (이번 세션 핵심)

### 이번 세션 commits (origin/main)
```
a10b801 fix(pc-evidence): 증거 제시 모달에 subjectParty 분기 적용
5a1c587 fix(pc-header-band) ← 사용자 직접
251116f fix(pc-ui): PCDeferredVerdictIcon selector 무한 루프 fix
95fda1d feat(script-polish-v6): Codex v6 새 4 차원 (D1~D4) + 누설 회귀 fix + UI 안전 가드
ae80dfc fix(pc-ui): 증인 소환 slot whitelist 제거 + 판결 보류 미니 아이콘 추가
df5f7ca feat(script-polish): 3 사건 ScriptedText Codex v4/v5 + Claude C2/C3/C4 폴리싱
```

### Codex v4/v5/v6 결과 통계

| Pattern | v4 | v5 | v6 (누적) | 의미 |
|---|---:|---:|---:|---|
| P1 Q-A 정합 | 1 | 1 | 1 | ★ 자동 검출 한계 영역 |
| P2 캐릭터 화법 | 7 | 263 | 263 | v5 광범위 강화 효과 |
| P3 추궁 각도 | 5 | 89 | 89 | v5 광범위 강화 효과 |
| P4 정황 풀어쓰기 | 1 | 46 | 46 | v5 광범위 강화 효과 |
| P5 코드명 | 68 | 68 | 68 | v4부터 광범위 처리 |
| P6 시스템 트리거 | 1 | 1 | 1 | known issue 분리 |
| **D1 LieState Flow** | - | - | **159** | ★ v6 NEW 차원 |
| D2 Evidence Unlock | - | - | 2 | v6 NEW |
| D3 Archetype Quant | - | - | 0 | v6 NEW |
| D4 Meter Timing | - | - | 0 | v6 NEW |
| **누적 patches** | **81** | **466** | **627** | |

### 새 잘못 패턴 (v5/v6)
- #11 사용자 사례 = 예시. 광범위 동형 검출이 본질
- #12 정적 분석 한계 (게임 흐름 / 메커니즘 / 정량 차원 별개)

### 사용자 게임 테스트 결과
- vercel 정상 배포 + 플레이 가능 확인 (251116f deploy 후)
- 추가 spot check 결과는 다음 세션에서 처리
