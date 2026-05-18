# 퍼널 의뢰서 §6 미결정 5건 사전 정리

작성일: 2026-05-18
용도: 사용자 결정 시점 빠르게 적용. 메인 추천 명시.
선행: [docs/design/funnel-telemetry/master-task.md](master-task.md) §6

---

## 결정 1: Steam ID 연동 정책

### 배경
의뢰서 §2.1 envelope: anon_id (`crypto.randomUUID()` → localStorage) 기본 사용. Steam ID 별도 연결 옵션.

### 옵션

| 옵션 | 동작 | 영향 |
|---|---|---|
| **A. anon_id만** (Recommended) | Steam ID 미수집. 익명 UUID만 영구 추적 | privacy 최강. Steam Stats / Achievements와 독립 추적. 같은 PC 두 유저 구분 불가 (드문 케이스) |
| B. Steam ID 해시 옵션 | 첫 실행 시 약관 동의 시 `sha256(steamId)` 저장. 동의 안 하면 anon_id만 | 더 정확한 사용자 추적 (디바이스 변경 시도). 약관 UI 확장 필요. GDPR/CCPA 대응 복잡 |
| C. Steam ID 평문 | Steam ID 그대로 저장 | 권장 안 함. privacy 약화. legal risk |

### 메인 추천
**옵션 A: anon_id만** — Steam 출시 초기에는 funnel 분석에 anon_id만으로 충분. 디바이스 변경 추적 등 고급 분석은 후속. privacy 단순성·법무 risk 최소화.

### 결정 시 영향
- A 선택: 구현 단순. 약관 UI도 최소
- B 선택: 약관 UI에 "Steam ID 연동 동의" 토글 추가. 별도 약관 항목 작성 필요

---

## 결정 2: opt-in vs opt-out 기본값

### 배경
의뢰서는 opt-in (기본 ON, 설정에서 끄기 가능)로 작성. 한국·EU 기준 더 보수적 정책 가능.

### 옵션

| 옵션 | 첫 실행 동작 | 영향 |
|---|---|---|
| **A. opt-in (기본 ON, 설정에서 끄기)** (Recommended) | 첫 실행 시 짧은 약관 안내 + 자동 ON. 설정에서 토글로 끄기 | 데이터 수집률 ↑. 약관에 명시. 한국 약관 표준 부합 |
| B. opt-out (기본 OFF, 약관 동의 시 ON) | 첫 실행 시 명시적 "동의" 클릭 시에만 ON. 기본 OFF | privacy 가장 보수적. 데이터 수집률 ↓. EU GDPR 가장 안전 |
| C. 강제 ON (끄기 불가) | 데이터 수집이 게임 약관 일부로 강제 | 권장 안 함. 사용자 통제 박탈. legal risk |

### 메인 추천
**옵션 A: opt-in (기본 ON)** — Steam 게임 업계 표준. 한국 시장 우선이라면 한국 법 기준 충분. 약관에 명확 안내 + 언제든 OFF 가능 옵션 보장.

다만 **EU 추후 출시 시점에는 B로 전환 또는 EU 사용자만 B 적용 분기 필요** (geolocation 기반). 이건 출시 후 대응.

### 결정 시 영향
- A 선택: telemetry 설정 토글 ON 상태로 출시
- B 선택: 첫 실행에 동의 화면 별도 디자인 필요 + 동의 거부 사용자도 게임 진행 가능

---

## 결정 3: production hosting (가장 복잡)

### 배경
현재 server/ 코드 구조:
- Express + better-sqlite3 + PORT 3001
- `npm run server` (별도 프로세스)
- `STEAM_REQUIRE_API_AUTH` 환경변수
- Vercel은 정적 호스팅만 (dist-pc) — server/ 는 Vercel에서 실행 안 됨

production에서 사용자 PC의 Electron이 어디로 `/api/telemetry/events`를 POST할지가 결정 영역.

### 비용 모델 핵심
- VPS는 **사용자수 무관 고정 월정액**. 사용자 0명이어도 $5/월 발생
- 서버리스(Cloudflare/Vercel Functions)는 **요청 수 기반** — 사용자 0이면 $0
- 무료 티어 VPS(Oracle Always Free)는 **영구 무료** (한도 안)

### 옵션

| 옵션 | 사용자 0 비용 | 사용자 1만/월 | 사용자 10만/월 | server/ 마이그레이션 |
|---|---|---|---|---|
| A. 유료 VPS (Hetzner/Lightsail) | $5/월 | $5/월 | $5/월 + bandwidth | 거의 0 (Express 그대로) |
| D. 1차 telemetry 비활성 | $0 | $0 | $0 | 0 |
| **E. Cloudflare Workers + D1** (장기 추천) | **$0** | $0 (무료 한도) | ~$5~10/월 | Express → Workers 변환 (중간 작업) |
| F. Vercel Functions + KV | $0 | $0 | ~$10~30/월 | Express → Edge Functions 변환 |
| **G. Oracle Cloud Always Free VPS** (Recommended) | **$0** | $0 | $0 (한도 안) | 거의 0 (Express 그대로) |

### 옵션별 trade-off

**A. 유료 VPS ($5/월)** — 가장 단순. 안정. 0명이어도 비용 발생. 후속 백엔드 작업 시 자연스러움.

**D. 1차 telemetry 비활성** — 코드만 구현, endpoint 비활성. 출시 일정 가장 빠름. 출시 초기 funnel 데이터 누락.

**E. Cloudflare Workers + D1** — 무료 한도 매우 큼(10M req/day, D1 5GB). 안정성 최강. Workers 마이그레이션 필요(telemetry 라우트만이라 작업 작음). 사용자 늘어도 거의 무료.

**F. Vercel Functions + KV** — Vercel Hobby tier. 무료 한도 작은 편. 사용자 늘면 비용 증가율 큼.

**G. Oracle Cloud Always Free VPS** — 1 OCPU + 1GB RAM × 2 인스턴스 영구 무료. server/ 코드 그대로 deploy. TOS 변동 위험 드물게 있음. 한국 등 region 가능. 셋업 약간 까다로움.

### 메인 추천

**1차 추천: G (Oracle Cloud Always Free)** — 비용 0 + server/ 코드 그대로 + 안정적 운영 가능. Oracle 계정 + 인스턴스 셋업 + Node.js/sqlite 설치 + Let's Encrypt SSL의 1회 셋업 약 2~4시간.

**대안 (출시 일정 최우선):** D (1차 비활성) — 코드만 구현, endpoint는 출시 후 결정. 첫 2~4주 데이터 없음 감수.

**대안 (장기 확장 우선):** E (Cloudflare Workers) — Workers 마이그레이션 작업 추가하되 사용자 0~100k 규모까지 영구 무료. 안정성 최강.

**비추천:** A (VPS 유료, 비용 부담), F (Vercel 무료 한도 작음)

### 구체 셋업 단계 (G 선택 시)
1. Oracle Cloud 계정 생성 (한국 지역 선택 가능)
2. Always Free 인스턴스 (Ampere 1 OCPU, 1GB RAM, Ubuntu 22) 생성
3. Node.js 20 + sqlite + nginx + Let's Encrypt 설치
4. server/ 코드 deploy (git pull + pm2 + systemd)
5. 도메인 연결 (cloudflare 무료 plan, SSL 자동)
6. Electron의 `VITE_API_URL`을 production 도메인으로 설정 (build 시점 주입)

### 결정 시 영향
- G: 의뢰서에 Oracle 셋업 가이드 + server/ deploy 스크립트 추가
- D: 의뢰는 코드만 구현. endpoint 결정 후 환경변수 변경
- E: 별도 Workers 마이그레이션 의뢰 분리 (코드 변환 + D1 schema)
- A/F: 의뢰서 §A.3 그대로 + 호스팅 셋업 가이드 추가

---

## 결정 4: 약관 UI

### 배경
첫 실행 시 사용자에게 telemetry 안내 + opt-out 토글 노출 UI 필요. 별도 디자인 의뢰서로 분리할지, 퍼널 의뢰에 포함할지.

### 옵션

| 옵션 | 동작 | 영향 |
|---|---|---|
| **A. 퍼널 의뢰에 포함 (간단 모달)** (Recommended) | 짧은 약관 텍스트 + "사용 데이터 수집 허용" 토글 + "동의하고 시작" 버튼. 한 화면. Codex 일괄 구현 | 1건 의뢰로 끝. 디자인 가벼움. 출시 빠름 |
| B. 별도 디자인 의뢰서 (full onboarding) | 풀스크린 다단계 약관 + 게임 소개 + telemetry 동의를 한 흐름으로. 디자인 컨셉 + 코드 의뢰 별도 | 출시 임팩트 ↑. 다만 출시 일정 +1~2일 |
| C. 단순 footer 알림 + 설정에서만 토글 | 첫 실행 시 footer에 "사용 데이터 수집 중 (설정에서 끄기)" 작은 알림. 약관 UI 부재 | 가장 단순. 한국 약관 표준 미충족 가능 |

### 메인 추천
**옵션 A: 간단 모달.** Steam 게임 업계 일반 패턴. 첫 실행만 보이고 다음부터 미표시. 약관 텍스트는 메인 세션이 짧게 작성 가능 (한국어 + 다국어 합류).

### 결정 시 영향
- A: 퍼널 의뢰 §A.2.3 설정 UI 영역에 약관 모달 추가
- B: 별도 디자인 의뢰서 작성 (메인 세션 추가 작업)

---

## 결정 5: 로컬 dev 환경 정책

### 배경
`npm run dev:pc` 시 사용자가 telemetry endpoint를 안 띄워두면 fetch가 404/502 실패. 게임 진행에는 영향 없지만 콘솔 로그 noise.

### 옵션

| 옵션 | 동작 | 영향 |
|---|---|---|
| **A. dev 환경 자동 비활성화 (Recommended)** | `import.meta.env.DEV === true`면 telemetry 자동 OFF. 강제 ON은 환경변수 `VITE_TELEMETRY_FORCE_ON=true`로 | dev 콘솔 깨끗. 의도적 telemetry 테스트는 환경변수로 |
| B. dev에서도 시도, 실패 시 silent | endpoint POST 시도하되 fail silently. 콘솔 에러 noise | 코드 단순. dev 노이즈 약간 |
| C. `TELEMETRY_ENABLED=false` 환경변수로 강제 | 사용자가 .env.local에 명시 안 하면 항상 작동. 명시 시 OFF | 명시적이지만 dev 사용자가 매번 설정 필요 |

### 메인 추천
**옵션 A: dev 자동 비활성화.** dev 콘솔 노이즈 0. 의도적 telemetry 통합 테스트 시 환경변수로 ON. 가장 사용자 친화적.

### 결정 시 영향
- A: 퍼널 클라이언트 funnelClient.ts에 `import.meta.env.DEV` 분기 추가
- B/C: 환경변수 처리만

---

## 결정 일괄 적용 시 의뢰서 변경 영역

| 결정 | 추천 | 의뢰서 변경 위치 |
|---|---|---|
| 1. Steam ID | anon_id만 | §6 첫 항목 confirm — 변경 없음 |
| 2. opt-in/out | opt-in (기본 ON) | §1.5 + §A.2.3 첫 실행 모달 |
| 3. hosting | 외부 VPS 또는 1차 비활성 | §A.3 deploy 가이드 추가 + VITE_API_URL 설정 |
| 4. 약관 UI | 퍼널 의뢰 포함 | §A.2.3 설정 UI에 첫 실행 모달 추가 |
| 5. dev 정책 | dev 자동 비활성 | §A.2.1 funnelClient init에 `import.meta.env.DEV` 분기 |

5건 모두 메인 추천 채택 시 의뢰서 §6 부분 짧게 수정 후 발송 가능.

---

## 사용자 결정 절차

1. 본 문서 검토 후 5건 결정 (전수 추천 수락 또는 개별 변경)
2. 결정 결과를 메인 세션에 전달 (예: "5건 모두 추천 수락" 또는 "결정 3은 D안으로")
3. 메인이 의뢰서 §6에 결정 박음 + 발송 메시지 정리
4. Codex 별도 스레드에 발송
