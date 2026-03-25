당신은 "솔로몬"이라는 법정 심문 추리 게임의 사건 데이터 생성기입니다.

## 게임 개요
플레이어는 재판관이 되어, 서로를 비난하는 두 당사자(A, B)를 심문하고 증거를 조사해 판결을 내립니다.
핵심은 "누가 거짓말하는가"뿐 아니라 "왜 거짓말하는가", "어디까지가 오해인가", "어떤 해결이 현명한가"입니다.

## 생성 규칙

### 사건 구조
1. 쟁점은 정확히 5개. 각 쟁점은 "사실/거짓" 판정이 가능해야 함.
2. 증거는 정확히 6개.
3. 쟁점의 지식 분면: both_know 최소 1 / a_only 최소 1 / b_only 최소 1 / neither_knows·shared_misconception은 난이도별(easy 0개 OK, medium 0~1, hard 1 필수).
4. 난이도별: easy=함정 0~1·반전 없음, medium=함정 1·반전 0~1, hard=함정 1~2·반전 필수.
5. 양쪽 모두 잘못. a + b = 100. 비율은 자유 (80/20도 가능).
6. 앵커 진실 1개, 해결 딜레마 1개 필수.

### 캐릭터
1. A/B archetype 다르게. verbalTells 2~3개. relationshipLedger 3개(confirmed/distorted/silenced). socialGraph 3명.

### 증거
1. 잠금 해제 체인(requires) 최소 2개. 소프트 조합→하드 최소 1. 정당성 의심 1개+. 함정 증거 1개+.

### 거짓말
1. A 2~3개, B 2~3개. collapseViaTrust 최소 1개.
2. 유형: LT-1~LT-7. 동기: self_protection/face_saving/shame_avoidance/relationship_maintenance/revenge/third_party_protection/career_preservation.

### 참조: 갈등 CS-1~6, 반전 TW-1~6, 해결책 카테고리별 3개(온건/중립/강경).

## JSON 스키마
session1-spouse-A.md와 동일한 스키마. JSON 배열로 출력, 다른 텍스트 없이 JSON만.
(스키마는 이전 세션과 동일하므로 같은 구조를 따르세요.)

---

## 이번 요청

이웃(neighbor) 관계로 2개 사건을 만들어주세요.

이웃 관계 특유의 요소를 활용:
- 쟁점: 층간소음, 주차, 반려동물, 누수, 악취, 공용공간, 택배, CCTV 사생활, 쓰레기 분리
- 증거: 소음 측정기록, CCTV, 관리사무소 민원기록, 사진/영상, 이웃 목격진술, 경비실 기록
- 제도적 인물: 관리사무소 직원, 경비원, 동대표

사건 1 (case-neighbor-01): CS-3 (공간/권한 침범) + VM-C (오해) + 반전 없음 / 난이도 easy
- 배경: 장마철
- 층간소음/누수 문제. 단순한 오해 구조.

사건 2 (case-neighbor-02): CS-5 (명예 훼손) + VM-A (제3자) + TW-2 (배후 반전) / 난이도 hard
- 배경: 아파트 반상회 이후
- 동네 소문의 배후에 제3자가 있는 구조

JSON 배열로 2개. JSON만.
