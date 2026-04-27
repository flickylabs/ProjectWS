# REQUEST — Release QA: 출시 전 readiness 검증 (P0-C)

**의뢰일**: 2026-04-27
**요청자**: ClaudeCode CT-Main
**우선순위**: P0 (출시 전 최우선)
**병렬**: P0-A (자유심문 MVP) / P0-B (자유심문 안전장치)

---

## 1. 목표

유료 출시 전 release readiness 9 영역 검증. 콘텐츠 품질(P1)과 별개 트랙으로 즉시 진행. **P0 발견 시 P1 작업보다 우선 처리.**

---

## 2. 진입 조건

- HEAD: `c6ec522`
- baseline anchor: `baseline-pre-policy-v1` / `baseline-pre-policy-v2`
- feature flag: `VITE_DISCLOSURE_GUARD_MODE=off`
- working tree: tracked clean (untracked OK)
- `npm run check:all` PASS / `npm run build` PASS / `npx tsc -b --force` PASS

---

## 3. 분담

| 영역 | 담당 |
|---|---|
| 정책 / 분류 / P0·P1 판정 | CT-Main |
| **이 세션 (Release QA)** | **9 영역 검증 + 발견 사례 8필드 기록** |
| 자유심문 (P0-A) | Codex-Dev A |
| 자유심문 안전장치 (P0-B) | Codex-Dev B |
| 사용자 | Manual spot check / 최종 판단 |

---

## 4. 검증 9 영역

### 4.1 저장 / 로드
- localStorage `solomon-judge-progression` 무결성
- localStorage `solomon-history` 무결성 (max 100건)
- 다른 브라우저에서 새로 시작 정상
- 빌드 후 (vercel preview) 저장·로드 정상
- 저장 데이터 손상 시 graceful recovery

### 4.2 build / packaging
- `npm run build` artifact 크기 / 정상 생성
- `dist/` 영역 검증 (index.html / assets/ / 누락 없음)
- Vercel deployment 정상 (vercel.json 검증)
- production build에서 dev-only 코드 제거 확인

### 4.3 Steam 환경
- Electron 빌드 시점 영역 (보류 가능 — 사용자 결정 영역)
- 보류 시 보고서에 기록만

### 4.4 API key / env 노출
- build artifact 안에 `OPENAI_API_KEY` 또는 다른 secret X
- `import.meta.env.VITE_*` 외 노출 X
- `.env` 파일이 git에 들어가지 않았는지 확인
- network tab에서 key 노출 영역 X

### 4.5 API 실패 시 게임 멈춤
- network drop simulation (DevTools offline)
- timeout simulation (slow 3G)
- quota exceeded simulation (mock 429)
- 모두에서 게임 흐름 정지 X (현재 P0-B 영역과 협조)
- LLM 호출 실패 시 fallback 동작 확인

### 4.6 Phase 0 guard off 안정성
- `VITE_DISCLOSURE_GUARD_MODE=off` (default) 운영
- 콘솔 console.warn / console.error 0건
- guard policy import 시간 0 (mode=off에서)
- 5분 연속 플레이 (spouse-01 Phase 0→1→2→3) 안정성

### 4.7 한글 폰트 / 깨짐
- 모든 phase / NPC 발화 / 시스템 메시지
- 자모 분리 / 깨진 글자 / 폰트 fallback
- 특수 한자 / 이모지 정상

### 4.8 해상도 / 창 크기
- 1280×720 / 1920×1080 / 2560×1440 / 4K
- 창 mode resize 시 layout broken 0
- 좌우/상하 cutoff 0
- 핫바 / 드로어 / 모달 정상

### 4.9 브라우저 / PC 빌드 차이
- Chrome / Firefox / Safari / Edge / Electron (있을 시)
- 각 브라우저에서 LLM 호출 / localStorage / 폰트 정상

### 4.10 VFX QA (P0-E·P0-F 영역 흡수)

P0-E (VFX Hierarchy) + P0-F (AI Reasoning Cutscene) 결과물 검증. 별도 QA-VFX 세션 신설 X / 본 세션이 흡수.

검증 항목:
- 번개 / VFX 과다 반복 (cooldown 정합 / 같은 target 5턴 이내 반복 X)
- modal / overlay / VFX 동시 출력 시 위계 우선순위 정합 (낮은 영역 skip 검증)
- 해상도 / 창 크기에서 VFX 깨짐 (1280×720 / 1920×1080 / 4K)
- 한글 텍스트 넘침 (chip label / `심문 경로 확정` 등)
- `prefers-reduced-motion` 대응 (CSS media query)
- Steam / PC 빌드 성능 (frame drop / 컷씬 stutter)
- **첫 자유심문 컷인이 실제로 AI 게임처럼 느껴지는지** (사용자 spot check 영역 — 정량 X / 사용자 인상 영역)
- 내부 용어 노출 0 (`intent` / `classifier` / `LLM` / `guard` / `policy` / `누설`)
- truth leak 0 (chip 텍스트 surface 표현만)
- 한 사건 major cutscene 4회 이상 발생 X (hard cap)
- 한 phase에 cut-in 5회 이상 발생 시 콘솔 warn 동작

**VFX P0/P1 이슈가 많이 나오면**: 별도 QA-VFX 세션으로 분리 — CT-Main 결정 영역.

---

## 5. Out of Scope

- 콘텐츠 품질 (P1-A 영역)
- 자유심문 기능 자체 (P0-A·B 영역)
- 자동화 harness 신규 작성 X (Manual + screenshot 우선)
- ScriptedText / caseData 수정 X

---

## 6. 절대 회피선

- ScriptedText / caseData / pc.css touch X
- baseline anchor 회귀 X
- feature flag default 변경 X
- 정책 자동 변경 X

---

## 7. 리포트 포맷 (8필드)

`docs/spot-check-format.md` 기반.

| 필드 | 내용 |
|---|---|
| caseId | spouse-01 / family-01 / friend-01 / N/A |
| phase | Phase 0~7 / 외부 영역 |
| action | 증거 제시 / 자유심문 / 저장 / 빌드 / etc. |
| target | 박지연 / 이준호 / UI / system / etc. |
| quote | 발견 사례 원문 (있으면) |
| expected | 기대 동작 |
| actual | 실제 발견 |
| 왜 문제인지 | severity 근거 |

추가:
- severity: P0 / P1 / P2
- 재현 경로 (1, 2, 3...)
- 추천 처리: CT 판단 / Codex 수정 / UI 수정 / QA 재확인
- screenshot (있으면 path)

---

## 8. 종료 조건

- [ ] 9 영역 각 P0 0건
- [ ] §4.10 VFX QA 11 항목 각 P0 0건 (특히 내부 용어 노출 0 / truth leak 0 / hard cap 정합)
- [ ] P1 발견 → 8필드 분류 → CT-Main 보고
- [ ] P2 발견 → 누적 backlog (출시 후 처리 영역)
- [ ] `npm run check:all` PASS
- [ ] `npm run build` PASS
- [ ] `npx tsc -b --force` PASS
- [ ] 산출물: `tmp/qa-release-results/` + 종합 summary.md (VFX 섹션 포함)

---

## 9. 산출물

- `tmp/qa-release-results/20260427-overall-summary.md`
- `tmp/qa-release-results/20260427-domain-{1~9}-summary.md` (각 영역별)
- `tmp/qa-release-results/20260427-domain-10-vfx.md` (§4.10 VFX QA)
- `tmp/qa-release-results/screenshots/` (필요 시)
- `tmp/qa-release-results/findings.json` (8필드 구조화 list)

---

## 10. 관련 자료

- `docs/spot-check-format.md` — 8필드 포맷
- `CLAUDE.md` — 빌드 / 실행 / Vercel 배포 영역
- `vercel.json` — 배포 설정
- 본 세션 진입 메시지: `tmp/QA-Release-NEXT-START-MESSAGE.md`

---

**상태**: 초안 작성 완료. QA 세션 검토 + 1차 spike 진입 대기.
