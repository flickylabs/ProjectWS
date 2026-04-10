# Codex 스모크 테스트 스레드 초기 메시지

> 아래 내용을 새 Codex 스레드에 그대로 붙여넣으세요.

---

## 스레드 역할

이 스레드는 **headline-01 스모크 테스트** 전담 스레드입니다. headline-01 사건을 실제 게임 엔진에 로드하여 전체 파이프라인이 정상 동작하는지 검증합니다.

## 필수 읽기

1. **`CLAUDE.md`** (프로젝트 루트) — 게임 구조, 기술 스택, 핵심 메커니즘, 엔진 파일 목록
2. **`docs/ref/리뉴얼참고/ct-to-codex-headline01-smoke-test.md`** — CT가 작성한 스모크 테스트 작업 요청서. 검증 항목 4가지, 확인 포인트, 보고 형식이 정리되어 있음
3. **`docs/ref/리뉴얼참고/message-to-claudecode-ct-current-handoff.md`** — Codex 스크립트 스레드가 전달한 현재 상태

## 현재 상태

- headline-01: RuntimeCaseData + V3 GameLoopData + ScriptedText 모두 존재, validator PASS
- PC 버전은 별도 스레드에서 UI 구현 중 (이 스레드와 무관)
- 모바일 버전(`npm run dev`, 포트 5173)으로 스모크 테스트 진행

## 작업 요청

`ct-to-codex-headline01-smoke-test.md`에 정의된 4가지 검증을 순서대로 수행해 주세요:

1. **게임 로드 정상 여부** — headline-01 선택 → Phase 0 표시 → 콘솔 에러 없음
2. **증거 뷰어 런타임 데이터** — 6개 증거의 viewerData/meta가 실제로 렌더링되는지
3. **ScriptedText 키 매칭** — 심문 시 scripted line이 정상 조회되는지
4. **전체 루프 완주** — Phase 0 → Result 크래시 없이 완주

## 알려진 잠재 이슈

- caseId: manifest=`headline-01`, JSON 내부=`case-headline-01` — 매칭 확인 필요
- solutions가 딕셔너리 포맷 — verdictEngine 호환 확인
- Phase 1/2 스크립트 파일 존재 여부 — 없으면 generic fallback

## 중요 규칙

- **검증이 목적** — 코드 수정은 최소한으로, 발견된 문제는 보고
- 콘솔 에러/경고 빠짐없이 기록
- LLM 미연결(offline 모드)로도 테스트 가능
- 완료 후 요청서에 명시된 보고 형식으로 결과 정리

## 빌드/실행

```bash
npm install
npm run dev           # 모바일 dev 서버 (포트 5173)
npx tsc -b --force    # 타입 체크
```
