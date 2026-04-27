# 새 ClaudeCode CT 첫 메시지 (사용자 복사용)

> **사용 방법**: 새 ClaudeCode 스레드 시작 → 아래 박스 안 내용 그대로 복사 → 첫 메시지로 던짐
> **상황**: 중앙 컨트롤 (Tier 3 Guard 시스템) 개발 완료 + Phase 0 default off 안정 운영 진입 가능 + 출시 전 품질 개선 단계 전환

---

```
이전 CT 이관 받아줘. 다음 파일 정독:

[메모리 — 필수]
1. memory/MEMORY.md (인덱스)
2. memory/session_handoff_20260427_tier3_phase0_started.md (CT 이관 최신 — 중앙 컨트롤 개발 완료)
3. memory/feedback_wrapper_baseline_is_head.md (wrapper baseline 본질)
4. memory/feedback_baseline_anchor_scripted_text.md (ScriptedText 변경 영역)
5. memory/feedback_qa_session_clean_worktree.md (QA 세션 진입 조건)
6. memory/feedback_revision_meaning_over_form.md (잘못 패턴 #6/#7/#8)
7. memory/feedback_truth_leak_prohibition.md (잘못 패턴 #9)
8. memory/feedback_broad_homologous_detection.md (잘못 패턴 #11)
9. memory/feedback_static_analysis_limit.md (잘못 패턴 #12)
10. memory/story_v2_confirmed_3cases.md (3 사건 핵심 사실)
11. memory/project_active_cases.md (활성 3건)

[프로젝트]
12. CLAUDE.md (게임 핵심 원칙 "진실은 플레이어가 직접 밝혀낸다")
13. docs/disclosure-policy.md (Tier 3 정책 입력 — paraphrase set + uiSurfaceMap surface + gating 박스)

[참고 — 필요 시]
- memory/session_handoff_20260427_tier3_mvp_complete.md (Tier 3 MVP 설치 영역)
- memory/session_handoff_20260427_tier1_tier2_complete.md (Tier 0/1/2 정착 영역)
- memory/session_handoff_20260427_ui_v3_subthread.md (UI 서브 스레드 영역 — CT 영역 X)
- memory/design_color_tokens_pc.md (pc.css 토큰 권위 문서)

═══════════════════════════════════════════════════════
[현재 상태]
═══════════════════════════════════════════════════════
- HEAD: bd46418 fix(disclosureGuard): catch 보내신 honorific inflection in family-01 paraphrase
- origin/main sync 완료 (ahead 0)
- baseline-pre-policy-v1 (a10b801) — 원래 anchor (불변)
- baseline-pre-policy-v2 (acf5d27) — Dev-A P1 stabilization
- 운영 단계: Phase 0 default off — 안정 운영 진입 가능
- feature flag VITE_DISCLOSURE_GUARD_MODE default = 'off' 유지
- npm run check:all PASS (hard 0 / warnings 157)

═══════════════════════════════════════════════════════
[중앙 컨트롤 개발 완료 — 이전 세션 영역, 사용자 명시 정의]
═══════════════════════════════════════════════════════
- Tier 3 Guard MVP 설치 완료 (commit f03f49f)
- Dev-B follow-up FN 1건 처리 (commit bd46418, 활용형 catch 영역 보강)
- baseline-pre-policy-v2 tag 생성 (acf5d27)
- 7 commits 누적 흐름 / origin sync 완료
- 검증 PASS (build / tsc / check:all 모두)

→ 다음 단계는 중앙 컨트롤 개발 X / 출시 전 품질 개선 영역만

═══════════════════════════════════════════════════════
[작업 중 영역 — UI 서브 스레드 (CT 영역 X)]
═══════════════════════════════════════════════════════
- src/app/pc.css dirty 상태 (656건 토큰 일괄 통일 / 의미 변화 0)
- CT 영역 X / 사용자 결정 영역
- CT 임의 stash/discard/commit 절대 금지
- 산출물: tmp/style-guide-v1.html / tmp/pages-mockup-v1.html / tmp/cutscene-mockup-v1.html

═══════════════════════════════════════════════════════
[다음 단계 = 출시 전 품질 개선 (사용자 명시 4 영역)]
═══════════════════════════════════════════════════════
1. Manual play spot check (즉시 시작 가능 / 사용자 직접)
   - 기본 mode=off / 필요 시 ?guard=log 또는 localStorage['solomon-disclosure-guard-mode']='log'
   - 발견 사례 = docs/spot-check-format.md 8필드 기록
   - P0/P1 = 출시 전 우선 처리 / P2 = 누적 backlog
2. P1 script polish (Codex-Dev 영역, Dev-A 패턴 정합)
   - ScriptedText 보정 = Codex-Dev 의뢰 (CT-Main 직접 X — wrapper 회귀)
   - 9차원 의미 보존 (잘못 패턴 #6)
3. 제한형 자유 질문 MVP 설계/구현 (CT-Main 설계 + Codex-Dev 구현)
   - 영역 새로 설계 (별도 의뢰서)
   - feature flag default off 패턴 권장 (Tier 3 Guard MVP와 정합)
4. 컷씬/피드백 MVP 설계/구현 (CT-Main 설계 + Codex-Dev + UI 서브 협조)
   - tmp/cutscene-mockup-v1.html 참조 가능

═══════════════════════════════════════════════════════
[분담 정착]
═══════════════════════════════════════════════════════
- CT-Main = 한국어 자연체 / 의미 정확성 / 정책 검수 / 우선순위 결정 / Codex-Dev 의뢰서 작성 / Manual spot check 분류
- Codex-Dev = 정책 JSON / 검증 wrapper / runtime guard / ScriptedText 보정 / UI 코드 fix / harness (의뢰 시)
- CT-Cross = 의미 차원 깊은 review (Codex 결과 교차 검증)
- UI 서브 스레드 = src/app/pc.css 토큰 통일 / UI 디자인 v3 (CT 영역 X)
- 사용자 = Manual play spot check / 최종 판단 / 큰 영역 승인

═══════════════════════════════════════════════════════
[절대 회피선]
═══════════════════════════════════════════════════════
- ScriptedText (src/data/scriptedText/*.json) working tree 직접 수정 X
  → wrapper hard fail / Codex-Dev 의뢰 영역
- caseData (src/data/cases/generated/*.json) 직접 수정 X
- baseline anchor (a10b801 / acf5d27) 회귀 X
- baseline-pre-policy-v1 / v2 tag 변경 X
- feature flag default 변경 X (반드시 'off' 유지)
- log/sanitize/block 자동 진입 X (사용자 명시 승인 영역)
- harness 신규 작성 X (보류 영역 — 출시 후 또는 단계 진입 시)
- useActionDispatch.ts / judgeQuestionEngine.ts / scriptedTextLoader.ts 대형 리팩터 X (Tier 4+ 보류)
- src/app/pc.css 어떤 형태로든 touch X (UI 서브 스레드 영역 보존)
- 정책 (docs/disclosure-policy.md) 자동 변경 X (CT-Main + CT-Cross 검수 영역)
- 자동 보고 무비판 수용 X (Codex 보고 = 직접 sample 검증 영역)
- 단순 어휘 교체 X (9차원 의미 정확성)
- ScriptedText 자동 일괄 수정 X
- 사용자 1 사례만 처리 X (동형 광범위 검출)

═══════════════════════════════════════════════════════
[QA 세션 진입 조건 (학습 영역)]
═══════════════════════════════════════════════════════
- tracked file modified/staged 0건만 검사 (untracked 무시)
- 각 세션 자기 영역 (tmp/qa-{세션}-results/) 결과 파일 = untracked 정상
- working tree 변경 시 wrapper hard fail = expected (commit으로 들어가야 PASS)
- wrapper의 실제 baseline = git HEAD (anchor SHA는 표시값)

═══════════════════════════════════════════════════════
[잘못 패턴 종합]
═══════════════════════════════════════════════════════
- #1 자동 보고 무비판 수용 X (직접 검증)
- #6 9차원 의미 정확성 (단순 어휘 교체 X)
- #7 사용자 단순 확인 = 짧은 답 (옵션 제시 X)
- #9 진실 누설 금지 (게임 핵심 원칙)
- #11 동형 광범위 검출 (사용자 사례 = 시작점)
- #12 정적 분석 한계 (의미/동적 영역 별개)

═══════════════════════════════════════════════════════
[즉시 처리 영역 — 사용자 결정 영역]
═══════════════════════════════════════════════════════
추천 (가): Manual play spot check 시작 (사용자 직접)
- 기본 mode=off / 필요 시 ?guard=log
- 발견 사례 받음 → CT-Main이 8필드 분류 → 우선순위 결정

또는 (나): 자유 질문 MVP 또는 컷씬 MVP 영역 새로 설계 (CT-Main 영역)

═══════════════════════════════════════════════════════
[의뢰서 보존 영역]
═══════════════════════════════════════════════════════
- tmp/REQUEST-Codex-Tier{0,1,2}-*.md (Tier 0/1/2 7건)
- tmp/REQUEST-Codex-DevA-P1-Stabilization.md
- tmp/REQUEST-Codex-DevB-Tier3-Guard-MVP.md
- tmp/REQUEST-Codex-DevB-followup-fn-fix.md
→ 향후 docs/handoff/codex-requests/ 영구 위치 이동 결정 영역 (CT-Main 판단)

═══════════════════════════════════════════════════════
[QA 결과 영역 (untracked, 보존 가치)]
═══════════════════════════════════════════════════════
- tmp/qa-functional-results/ (Codex Q P-3·P-4·P-5)
- tmp/qa-scripted-results/ (Codex QW S-1·S-3·S-4·S-5)
- tmp/qa-ct-cross-results/ (CT-Cross S-2 + 정책 hardening review)
- tmp/qa-codex-dev-a-results/ (Dev-A spike + Phase 2)
- tmp/qa-codex-dev-b-results/ (Dev-B spike + MVP)
- tmp/qa-codex-dev-b-followup-results/ (FN fix)
- tmp/qa-t3-functional-off-results/ (Phase 0 검증)
- tmp/qa-t3-guard-log-results/ (log mode 검증)

═══════════════════════════════════════════════════════
[7 commits 누적 흐름]
═══════════════════════════════════════════════════════
bd46418 fix(disclosureGuard): catch 보내신 honorific inflection in family-01 paraphrase
f03f49f feat(engine): tier-3 disclosure guard MVP — log mode + feature flag default off
acf5d27 fix(scripted): correct p1 stabilization text variants (← baseline-pre-policy-v2)
2e527bd fix(ui): stabilize surface labels and archetype fallback
4e0a1b6 docs(policy): tier-3 guard hardening — paraphrase set + uiSurfaceMap surface
db0130e docs(qa): tier-2 QA test cases — functional / scripted / index
5378700 docs(handoff): avoid pinning moving handoff head (← 이전 세션 base)

정독 + 사용자 다음 명령 대기.
```
