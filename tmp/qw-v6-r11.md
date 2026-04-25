# QW V6 R11: 3사건 끼어들기(interjection) + 모순추궁(contradiction_pursuit) 집중

## 실행
- 축: 집중-3 (끼어들기 대상 party 정확성) + 집중-4 (모순추궁 NPC 응답 완결성)
- 검사: key↔party 일치, variant 존재, lieState 체인 완결성

## 집중-3 끼어들기 대상 정합성
- 3사건 전부 interjection 8 entries, key 접두 ↔ party 필드 **100% 일치**
- spouse-01: 8×3=**24 variants**
- friend-01: 8×2=**16 variants**
- family-01: 8×2=**16 variants**
- 빈 text: **0건**

## 집중-4 모순추궁 lieState 체인
- spouse-01: 16 entries (2 party × 2 dispute × 4 lieState) — **완전** S1~S4
- friend-01: 8 entries, **S3/S4 누락 (8 entries)**
  - 누락 키: a\|d-1\|S3, a\|d-1\|S4, a\|d-2\|S3, a\|d-2\|S4, b\|d-1\|S3, b\|d-1\|S4, b\|d-2\|S3, b\|d-2\|S4
- family-01: 동일 패턴, S3/S4 누락 **8건**

### 판정
- **NOTE (FAIL 아님)**: V5 리포트에서 이미 "LLM fallback" 처리로 기록됨. 엔진이 S3/S4 에서 LLM 생성으로 대응. 데이터 갭이지 버그 아님.
- 런타임에서 실제 S3/S4 상황에 NPC 응답이 자연스러운지는 **Phase D R14~에서 확인 필수**

## 집중-8/9/FORBID 재스캔 (interjection + contradiction_pursuit만)
- 3사건 이 두 채널만: **0건** (이미 R1~R9에서 전체 스캔 완료, 일관성 확인용)

## 수정 (이번 라운드, 권한 내)
- 없음

## CT 검토 요청 (권한 초과)
- **friend-01 / family-01 contradiction_pursuit S3/S4 공란**:
  - 안 1: 현행 유지 (LLM fallback 전제) — V5와 동일 결정
  - 안 2: 각 8 entries × 2 variants = 16 entries 보완 (GPT Pro 경유 생성 필요)
  - 안 3: spouse-01 패턴 복제 후 고유 맥락 맞춤 수정
  - 제안: **런타임 결과에서 S3/S4 모순추궁 품질이 낮으면 안 2 채택**. Phase D R23~ (friend) / R32~ (family) 관찰 후 판단.

## 다음 라운드로 이월
- R12: 3사건 증인 다층 증언 (집중-5)
- R13: 3사건 증거 뷰어 + 판결/결과 (집중-6/7)

## 라운드 판정: **PASS with NOTE** (FAIL 0 / 데이터 갭 16건)
