spouse-01 manual 테스트·수정 thread 이어서 진행합니다.

[진입 base]
- git log --oneline -3 + git status 로 HEAD/uncommitted 확인.
  - 직전 HEAD = af7c6a8f (공통 CT thread 가 Issue E 폴백 발화 제거 커밋).
  - **본 작업 전부 uncommitted** (working tree M 파일 다수). 같은 worktree 를 공통 CT thread 와 공유 — 커밋 전 git status 로 영역 충돌 확인.
- 메모리 정독:
  - session-handoff-20260528-spouse01-bizline-cut-d3-e8-relocate  (최신, 본 thread 전체 맥락 — 정독 필수)
  - design-new-entity-emergence-unified-vfx-panel  (새 항목 등장 통일 패널/VFX 최상위 정책)
  - feedback-claude-korean-polish-limitation  (ScriptedText = Codex 직접)
  - feedback-avoid-code-abbreviations-with-user  (사용자 대화 시 한글 명칭 병기)
  - design-spouse01-truth-disclosure-policy / project-spouse01-event-timeline
  - design-core-case-derive-hybrid-merge  (e-1 investigationStages = generated json 보존)
  - feedback-codex-ide-parallel-same-worktree  (CT thread 병렬)

[최우선 — manual 테스트 재검증 (브라우저, fresh build)]
※ dev server 재시작 + hard reload 필수 (사용자 직전 stale build 가능성 — d-3 가 게이트 fix 후에도 보였다고 보고).
1. e-1 「영수증 묶음」 / e-2 「블랙박스 GPS」 조사 2단계 이준호 제시 → 「내연녀 임신 의심」(d-3) **안 떠야 함** (auto경로 차단됨).
2. e-1 조사 3단계 + 박지연 제시 → 「출산 준비 도서」(e-10) + d-3 dual emergence.
3. e-2 조사 3단계 → d-3.
4. e-10 조사 2단계(목차) → 「주차 영수증」(e-8) 등장 (책 목차 발견 popup).
5. e-8 smudge(불규칙 다각형 2개, 1단계 2개/2·3단계 1개) + ambient 오염 얼룩 시각 확인.
6. 비자금 라인(증거 e-9 / 단서 dc-8 / 쟁점 h-d4) 완전 사라졌는지.

[검증 OK 시]
- 사용자 승인 후 커밋 (현재 전부 uncommitted).

[인계 추적 (다른 thread)]
- 공통 CT thread: docs/design/common-ct-handoff/CT-handoff.md Issue F(모순발견 라벨)/G(모순 검출 오작동)/H(쟁점 해결 후 증거 규칙).
- Codex thread: docs/design/spouse-01-entity-matrix/codex-brief-e8-dialogue.md (b-e-8 재작성 + orphan scriptedText 정리 + 다국어 generated json sync — .en/.ja/.zh-CN 아직 h-d4/e-9/dc-8 남음).

[정책 주의]
- d-3 등장 = 명시적 hook 2곳만 (auto-emergence 는 passesSpouse01EmergenceGate 에서 d-3→false 로 차단). 추가 emergence 필요 시 hook 방식.
- 사용자와 대화 시 코드 명칭 단독 금지 — 한글 명칭 병기.
- ScriptedText KO 시안 = Codex 직접 (GPT Pro 경유 X).
- 공통 영역(UI/VFX/store/공통 컴포넌트/엔진 일반) = 공통 CT thread 위임.
