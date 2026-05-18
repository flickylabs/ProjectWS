# Codex Thread β10 — LQA Phase 2 / UI i18n / EN+JA+ZH-CN

작성일: {{DATE}} (자동 생성)
상위 문서: [translation-lqa-phase/execution-plan-v2.md](../execution-plan-v2.md) §4
오케스트레이션: [translation-lqa-phase/orchestration.md](../orchestration.md)
주체: Codex thread β10 (병렬 10 thread 중 UI 전담 / 3언어 동시)

---

## §0. 진입 조건

§0~§2는 [codex-thread-template-case-lang.md](codex-thread-template-case-lang.md) 와 동일 + 다음 차이:

- 대상: UI i18n 메시지 (cross-case, 3언어 동시)
- 출력: 3개 CSV (lang별 분리)
  - `docs/design/translation-lqa-phase/reports/ui-global_en.csv`
  - `docs/design/translation-lqa-phase/reports/ui-global_ja.csv`
  - `docs/design/translation-lqa-phase/reports/ui-global_zh-CN.csv`

---

## §1. 작업 범위

### 1.1. 검수 대상 (READ-ONLY)

KO baseline (각 파일의 `ko: {...}` 블록):
- `src/i18n/messages/common.ts`
- `src/i18n/messages/court.ts`
- `src/i18n/messages/home.ts`
- `src/i18n/messages/hotbar.ts`
- `src/i18n/messages/layout.ts`
- `src/i18n/messages/profile.ts`
- `src/i18n/messages/scripts.ts`
- `src/i18n/messages/settings.ts`
- `src/i18n/messages/verdict.ts`
- `src/i18n/messages/tutorial.ts`

EN/JA/ZH-CN 검수 대상 (각 파일의 `en: {...}` / `ja: {...}` / `"zh-CN": {...}` 블록):
- 위 10개 파일 동일

### 1.2. 표본 사이즈

UI 메시지는 양이 적고 사용자 노출 빈도 매우 높음 → **100% 전수 검수**.
- 추정 약 979 키 × 3 lang = 2,937 cell

### 1.3. 추가 cross-lang 일관성 점검

UI는 같은 키가 lang마다 톤/길이 통일 중요 (버튼 라벨 등). 다음 추가 점검:
- 길이 spike: KO `length × 2.5 + 24` 초과 시 노트
- 톤 분기: 같은 키가 EN은 친근/JA는 공식/ZH는 중립 같은 분기 발생 시 노트
- placeholder 일관: `{count}`, `{name}` 등이 모든 lang 동일

---

## §2~§7

[codex-thread-template-case-lang.md](codex-thread-template-case-lang.md) 동일 적용, 단:

- §3 CSV 출력 — lang별 3개 파일 분리 (스키마 동일)
- §5 commit — 3개 CSV 한 commit으로 묶음
- 메시지: `LQA Phase 2 / UI i18n / 3 langs — {{COMMIT_SUMMARY}}`

---

## §8. 예상 소요

- 2,937 cell × 5초 = 약 4시간
- 1일 wall-clock 충분
