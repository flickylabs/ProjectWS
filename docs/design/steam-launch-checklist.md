# Steam 출시 체크리스트

작성일: 2026-05-18
목적: 출시 직전 일괄 점검. 진행 중 트랙 완료 후 활용.

---

## §1. 코드 / 빌드

### 1.1. 빌드 통과
- [ ] `npx tsc -p tsconfig.app.json --noEmit` 통과 (4언어 적용 후 재확인)
- [ ] `npm run check:all` 통과 (lint + type + test)
- [ ] `npm run build:pc` 정상 (Vite production build)
- [ ] `npm run build:pc:steam` 정상 (steamworks bridge 포함)
- [ ] 빌드 산출물 사이즈 점검 (asar / dist-pc) — 가이드: < 500MB

### 1.2. Electron / Steam 패키징
- [ ] electron-builder.json 출시 config 검증 (productName / appId / publisher / version)
- [ ] Steam Depot ID + AppID 환경변수 (`STEAMWORKS_APP_ID`)
- [ ] 코드 사이닝 (Windows / Mac) — 필요 시
- [ ] 자동 업데이트 채널 결정 (steam_appid.txt)

### 1.3. 환경 변수 (production)
- [ ] `VITE_API_URL` = production 도메인 (Oracle 호스팅 또는 비활성)
- [ ] `VITE_OPENAI_API_KEY` **클라이언트 노출 0** ← P0 (메모리 영역). 모든 LLM 호출은 `/api/llm` 프록시
- [ ] `TELEMETRY_DAILY_SALT_BASE` 무작위 64자
- [ ] `STEAMWORKS_APP_ID` 등 Steam 메타

---

## §2. 콘텐츠 / 게임플레이

### 2.1. 사건 완주 (4언어 모두)
- [ ] spouse-01 ko 완주 (튜토리얼 포함 신규 플레이)
- [ ] spouse-01 en 완주
- [ ] spouse-01 ja 완주
- [ ] spouse-01 zh-CN 완주
- [ ] family-01 ko/en/ja/zh-CN 각 완주
- [ ] friend-01 ko/en/ja/zh-CN 각 완주
- [ ] 후일담 / 분기 결과 정상

### 2.2. 튜토리얼
- [ ] spouse-01 첫 진입 시 10단계 자동 시작
- [ ] localStorage 영구 플래그 (`solomon.tutorial.spouse01.v1`) 동작
- [ ] Skip 버튼 동작 + 재진입 시 미표시
- [ ] 설정 → 튜토리얼 재실행 동작
- [ ] 4언어 카피 자연 (한국어 PC QA 완료, en/ja/zh-CN 추가 검증)
- [ ] micro-hint 표시 여부 결정 (현재 보유 미적용)

### 2.3. 임팩트 5비트
- [ ] Beat 1 새 쟁점 등장 동작
- [ ] Beat 2 증거 hard hit 동작
- [ ] Beat 3 판단 충돌 split + VS 동작
- [ ] Beat 4 판결 진입 cutscene 동작 (review montage + 망치)
- [ ] Beat 5 h-d3 T3 동작 (spouse-01 1회만, T3 cap)
- [ ] S4→S5 자백 (`v4-confession-overlay`) 그대로 동작
- [ ] 4언어 카피 자연 + 진실 누설 0 (특히 Beat 5)

### 2.4. 핵심 메커니즘
- [ ] 6슬롯 핫바 + 2슬롯 조합
- [ ] 4단계 판결 흐름
- [ ] 재판관 성향 9조각 / 6성향 / 15퍼크
- [ ] lieState S0→S5 진행
- [ ] 증거 unlock + 조합 (combinationLab)
- [ ] dc-6 / h-d3 등 hidden dispute emerge

---

## §3. 다국어

### 3.1. 텍스트
- [ ] 본 번역 19,203행 + tutorial 22 + impact 5 모두 적용 (Phase 3)
- [ ] glossary 위배 0 (verify-translations.cjs 통과)
- [ ] placeholder 보존 ({count}, {party}, {name}, {phase})
- [ ] CJK 잔류 0 (en 컬럼에 한글/한자/카나 없음)
- [ ] UI overflow 점검 (영어 / 중국어 폭증 영역 — CSS 줄바꿈 또는 폰트 조정)

### 3.2. 폰트 / 렌더링
- [ ] 한자권 폰트 임베드 (zh-CN 간체 / ja 한자 / 카나)
- [ ] 폰트 라이센스 확인 (재배포 가능 / OFL 또는 상업 라이센스)
- [ ] 모든 locale 화면 렌더링 정상 (한자 깨짐 없음)

### 3.3. 언어 전환
- [ ] 설정 메뉴에서 언어 전환 즉시 반영
- [ ] 게임 진행 중 전환 시 현재 화면 유지
- [ ] 첫 실행 시 OS 언어 감지 (옵션) 또는 ko 기본

---

## §4. Steam Stats / Achievements

- [ ] 9개 업적 (ACH_FIRST_CASE_CLEARED 등) 트리거 정상
- [ ] Steamworks SDK 통합 (`steamworks.js` 0.4.0)
- [ ] electron/steamworks-bridge.cjs 동작
- [ ] mock bridge (web/dev) 동작
- [ ] Steam 친구에게 업적 노출 정책 (private/public)

---

## §5. 약관 / 법무

### 5.1. 게임 약관
- [ ] EULA 작성 (한국어 / 영어 / 일본어 / 중국어)
- [ ] 개인정보 처리 방침 (특히 telemetry anon_id 수집 명시)
- [ ] telemetry 첫 실행 약관 모달 카피 (퍼널 의뢰 산출)

### 5.2. 한국 게임물관리위원회
- [ ] 자체등급분류 사업자 또는 GRAC 심의 (PC 게임)
- [ ] 등급 결정 (전체이용가 / 12세 / 15세 / 청소년이용불가)
- [ ] Steam 한국 출시 시 필수

### 5.3. 해외
- [ ] GDPR (EU) — DELETE /api/telemetry/me API 동작
- [ ] CCPA (캘리포니아)
- [ ] 일본 / 중국 출시 결정 시 추가 심의

---

## §6. 인프라

### 6.1. Telemetry hosting (사용자 결정 기반)
- [ ] **G안 (Oracle Free) 선택 시:**
  - [ ] Oracle Cloud 계정 + Always Free 인스턴스 (Ampere 1 OCPU / 1GB RAM)
  - [ ] Ubuntu 22 + Node.js 20 + sqlite + nginx + Let's Encrypt
  - [ ] server/ 코드 deploy (git pull + pm2 + systemd)
  - [ ] Cloudflare 무료 plan DNS + SSL
  - [ ] 도메인 연결
  - [ ] VITE_API_URL 환경변수 production 값 주입
- [ ] **D안 (1차 비활성) 선택 시:**
  - [ ] `TELEMETRY_ENABLED=false` 또는 endpoint 미설정
  - [ ] 출시 후 호스팅 결정 + 활성화 계획

### 6.2. LLM API 프록시
- [ ] `/api/llm` 프록시 정상 (server/routes/llm.js)
- [ ] OpenAI API key 서버에만 (`OPENAI_API_KEY`)
- [ ] 클라이언트 번들 `VITE_OPENAI_API_KEY` 노출 0 (P0 검증)
- [ ] Rate limit / 토큰 사용량 모니터링

### 6.3. 데이터 백업
- [ ] SQLite DB 정기 백업 (Oracle 인스턴스 또는 별도)
- [ ] 게임 history / telemetry events 백업

---

## §7. QA (최종)

### 7.1. 기능 QA
- [ ] 3 사건 4언어 = 12 완주 시나리오
- [ ] 첫 실행 약관 모달 + opt-out 동작
- [ ] 설정 메뉴 모든 항목 동작
- [ ] localStorage / 세션 영속성
- [ ] 게임 저장 / 불러오기 (있다면)
- [ ] 크래시 / 에러 핸들링 (try-catch + 에러 로그)

### 7.2. 성능
- [ ] 사양별 FPS 점검 (저사양 / 고사양)
- [ ] 메모리 누수 점검 (장시간 플레이)
- [ ] 로딩 시간 < 10초
- [ ] LLM 응답 대기 시 UI freeze 없음

### 7.3. 호환성
- [ ] Windows 10 / 11
- [ ] Mac (Universal binary, 필요 시)
- [ ] Steam Deck (요청 시 — ACH_STEAM_DECK_SESSION 업적 있음)
- [ ] 해상도 / 비율 (16:9 / 16:10 / 21:9 / Steam Deck)

### 7.4. 사용자 베타 (출시 전)
- [ ] 한국 베타 테스터 10~30명 (1주)
- [ ] 일본 / 영미 베타 테스터 (선택)
- [ ] 피드백 수집 채널 (Discord 또는 form)
- [ ] 핫픽스 1~2회

---

## §8. Steam 스토어 페이지

### 8.1. 기본
- [ ] 게임명 (4언어): 솔로몬 / Solomon / ソロモン / 所罗门
- [ ] 짧은 설명 (4언어, 50자 이내)
- [ ] 긴 설명 (4언어, 마크다운)
- [ ] 태그 (재판/추리/미스터리/스토리/인디 등)
- [ ] 카테고리 선택

### 8.2. 비주얼
- [ ] 캡슐 이미지 (메인 / 작은 캡슐 / 큰 캡슐)
- [ ] 헤더 이미지
- [ ] 스크린샷 5~10장 (4언어 버전)
- [ ] 트레일러 영상 1~2개 (1분 / 30초)
- [ ] GIF / 짧은 영상 (스토어 페이지)

### 8.3. 메타
- [ ] 출시 날짜 결정
- [ ] 가격 결정 (지역별 + 한국 원화 / USD / JPY / CNY)
- [ ] DLC / 시즌 패스 계획 (있다면)
- [ ] Early Access 여부 결정

---

## §9. 마케팅 / PR

- [ ] 트레일러 영상 (Steam + YouTube)
- [ ] 보도자료 (한국 게임 매체 + 영미 매체)
- [ ] 인플루언서 / 스트리머 contact
- [ ] Discord 서버 (커뮤니티)
- [ ] Twitter / X 계정
- [ ] 출시 D-day 카운트다운
- [ ] Steam wishlist 캠페인 (출시 1~3개월 전)

---

## §10. 출시 후

### 10.1. 모니터링
- [ ] Steam 리뷰 모니터링 (한국어 / 영어 / 일본어 / 중국어)
- [ ] Discord / Twitter 피드백
- [ ] telemetry funnel 분석 (활성화 시 — 1차 비활성이면 추후)
- [ ] 크래시 리포트 수집

### 10.2. 핫픽스
- [ ] 1주차: 빠른 핫픽스 채널 (코드 사이닝 자동화)
- [ ] 첫 달: 데이터 기반 미세 조정

### 10.3. 재미 요소 후속 (출시 후 결정)
- [ ] 논리 사슬 보드
- [ ] 결정적 추궁 버튼
- [ ] 반전 타임라인
- [ ] 막힘 감지 힌트
- [ ] 재판관 성향 실전 체감

이 5개는 telemetry 데이터 + 사용자 피드백 보고 우선순위 결정.

---

## §11. 출시 D-day 점검

- [ ] §1~§9 모든 항목 ✓
- [ ] 백업 (DB / 코드 / 환경변수)
- [ ] 롤백 계획 (이전 빌드 보관)
- [ ] 비상 contact (서버 다운 / 크래시 대응)
- [ ] Steam 출시 페이지 활성화 시각
- [ ] 마케팅 push 일정

---

## 진행 현황 매핑

본 체크리스트의 진행 항목 매핑 (2026-05-18 기준):

| 영역 | 진행 |
|---|---|
| §2.2 튜토리얼 | Codex 구현 완료 / 한국어 카피 박음 / **사용자 PC QA 대기** |
| §2.3 임팩트 | Codex 구현 완료 / 카피 박음 / **사용자 PC QA 대기** |
| §3.1 텍스트 | spouse-01 완료, family-01 진행 중, 라운드 3~5 대기 |
| §5.3 GDPR (DELETE API) | 퍼널 의뢰서 포함 — Codex 구현 중 |
| §6.1 telemetry hosting | **Oracle Free 결정** — 사용자 셋업 대기 (또는 D안 결정) |
| §6.2 LLM 프록시 | 기존 구현 정상 (`/api/llm`) — P0 검증 필요 |
| 외 항목 | 출시 임박 시 점검 진입 |

---

본 체크리스트는 출시 임박 시 (모든 트랙 완료 + 다국어 적용 후) 일괄 점검.
