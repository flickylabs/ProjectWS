# 사건 선택 씬 — 3안 시안 (PCCaseBrowser)

> 메인 세션 인계분. Phase 1~2 톤(다크 우드 + 골드) 기준.
> 시스템 유지: zigzag 스테이지맵 / 우측 브리핑 패널 / 진행 흐름.
> 변경 자유: 레이아웃/그리드 비율, 색감, 버튼, 폰트, 하이라이트/active, 토글.

---

## 0. 현재 상태 요약 (HEAD ceed614)

| 영역 | 토큰 |
|---|---|
| 분할 비율 | 560px (좌 zigzag) / 1fr (우 brief) |
| 헤더 eyebrow | 10px 800 0.2em gold-light |
| 헤더 h2 | 22px #f3efe8 |
| stage node | 100min-w · radius 12 · border 1.5 0.06 · bg 20·20·28/.85 |
| stage active | gold border 0.5 + bg 0.10 + shadow 16 0.10 |
| brief title h3 | 36px 800 #f3efe8 |
| brief VS gap | 24 (양옆 24/24 padding) |
| brief grid | 1fr 1fr · gap 20 · padding 24/28 |
| brief item | 18px 0.7 · radius 10 · padding 12/16 |
| brief start | gold gradient · radius 10 · 15px 800 |
| 토글 | pc-toggle 슬라이딩 (T&M-1로 통일됨) |

---

## A안 — 보수 (Conservative): "현재 구조 미세 조정"

> 컨셉: 익숙함 유지. 스페이싱·폰트 위계만 정돈. 리스크 0.

### 변경
- **분할 비율 유지** (560px / 1fr)
- **헤더**: eyebrow 10 → 11px (Phase 1~2 표준), h2 22 → 24px
- **stage node**:
  - radius 12 → 14
  - active glow: shadow 0.10 → 0.18 (살짝 진하게)
  - border-width 1.5 → 1px (CB v2 통일)
- **brief title h3**: 36 → 32px (디테일 페이지 스케일 통일)
- **brief party name**: 22 → 20px
- **brief item**: 18 → 16px (항목 한 화면에 더 많이)
- **brief start 버튼**: radius 10 → 12 (Phase 1~2 표준)
- **하이라이트**: cleared stage에 골드 라인 1px underline 추가 (선형 마커)

### 색감
- 변경 없음. 기존 그대로.

### 위험도
- ★☆☆ (텍스트 밀도 약간 증가, 시각 변화 최소)

### Best for
- "지금 톤이 좋다, 미세 정돈만"이라는 사용자

---

## B안 — 중립 (Balanced): "위계 재배치"

> 컨셉: 좌우 비율을 brief 우선으로. 사건이 주인공.

### 변경
- **분할 비율 변경**: 560 / 1fr → **440 / 1fr** (zigzag 좁게, brief 넓게)
- **stage node**:
  - 작아짐: min-width 100 → 84
  - 가로 padding 16 → 12
  - radius 12 → 999 (필 형태)
  - active: 골드 dot indicator 좌측 추가 (4×4 원형)
- **zigzag-line**: 2px → 1px, opacity 0.12 → 0.16
- **brief title h3**: 36px 유지 (메인이니까 그대로)
- **brief VS**: 양옆 패딩 28 → 36, gap 24 → 32
- **brief grid 항목**:
  - radius 10 → 12
  - bg 0.03 → 0.04 (조금 더 보임)
  - border-color cleared면 골드 0.18 (현재는 흰색만)
- **brief start 버튼**: width 100% 유지, radius 10 → 14, padding-y 12 → 14, font 15 → 16
- **하이라이트**:
  - active stage 자체는 골드 유지
  - brief 패널 좌측에 4px 골드 라인 추가 (--pc-gold 0.6, top→bottom)

### 색감
- background gradient 약간 어둡게: rgba(20,20,28,0.8) → rgba(15,16,22,0.85)
- accent border opacity 0.06 → 0.08

### 위험도
- ★★☆ (레이아웃 비율 변경, 익숙함 일부 깨짐)

### Best for
- "사건 정보가 더 풍부하게 보였으면 좋겠다"는 사용자

---

## C안 — 도전 (Bold): "포트레이트 메인"

> 컨셉: brief를 카드형 풀-피쳐로. 인물 초상화 메인 비주얼화. 시각 임팩트 최대.

### 변경
- **분할 비율 변경**: 560 / 1fr → **400 / 1fr**
- **stage node**:
  - 컴팩트화: padding 8/12, radius 8, gap 8
  - 스코어 텍스트 → 작은 골드 chip(필)으로 변환
  - hover scale 1.03 → 1.05
- **zigzag-line**: gold gradient (top: 0.12 → mid: 0.22 → bottom: 0.12)
- **brief 전체 재구성**:
  - 1단: **히어로 배너** — 양측 portrait 80×80 양 끝, 가운데 큰 VS (32px)
  - 2단: **사건 제목** — 40px 800, 하단 emotionalBait 16px italic
  - 3단: **부가 메타** — 카테고리/난이도/길이 칩 3개 가로 정렬
  - 4단: **쟁점·증거 그리드** (현재 유지하되 카드형)
    - bg 단색 → linear gradient 180deg
    - border-radius 14, padding 16/20
    - hover시 골드 보더 0.22 강조
  - 5단: **CTA** — 버튼 너비 100% 유지하되 height 56, radius 16, font 17 800
- **하이라이트**:
  - active stage: 골드 글로우 link되어 brief 패널 hero 배너에도 동일 톤 광채 (sympathetic light)
  - cleared stage: 작은 골드 체크 아이콘(✓) 추가
- **하단 진행률 표시**: brief 우측 하단에 본인 best score % progress ring (지름 56)

### 색감
- brief banner: gradient 더 명확하게 — rgba(28,28,40,0.95) → rgba(14,14,22,0.98)
- gold 라인 0.12 → gradient (0.16 → 0.28 → 0.16)
- 캐릭터 색 강조: party A 보더 0.3 → 0.45, party B 동일

### 위험도
- ★★★ (구조 변경 큼, 새 컴포넌트 필요)

### Best for
- "강한 인상을 주고 싶다, 첫 화면 임팩트 강화"라는 사용자

---

## 비교표

| 항목 | A 보수 | B 중립 | C 도전 |
|---|---|---|---|
| 좌/우 비율 | 560/1fr (유지) | 440/1fr | 400/1fr |
| stage 형태 | 박스 (radius 14) | 필 (radius 999) | 컴팩트 박스 + chip 스코어 |
| brief 제목 | 32px | 36px | 40px (대폭 강조) |
| brief 항목 | 16px | 16px (border 색감 강조) | 카드형 gradient |
| Portrait | 48px (현재) | 48px | **80px 히어로** |
| CTA 버튼 | radius 12 | radius 14 | radius 16 + height 56 |
| Progress ring | — | — | ✓ (best score %) |
| 임팩트 | 낮음 | 중간 | 높음 |
| 구현 시간 | ~30분 | ~60분 | ~120분 |
| 회귀 위험 | 매우 낮음 | 낮음 | 중간 |

---

## 결정 후 적용 절차

1. 사용자가 A/B/C 중 1안 지정
2. 채택안만 별 커밋으로 atomic 적용 (CSS 변경, 필요시 TSX 미세 조정)
3. dev에서 spouse-01 / family-01 / friend-01 모두 확인
4. 빌드 + tsc 통과
5. 메인 세션에 결과 보고

---

## 참고 — 현재 PCCaseBrowser 구조 요약

```
PCCaseBrowser
├── header (back / eyebrow + h2 / tools: toggle + count)
├── empty state (사건 0건일 때)
└── split
    ├── stages (zigzag-line + alternating left/right rows)
    │   └── stage button × N (num + score/lock)
    └── detail
        └── brief (CaseBriefPanel)
            ├── title (h3 + bait p)
            ├── VS layout (party A | VS | party B with portraits)
            ├── grid (쟁점 | 증거)
            ├── record (best score, optional)
            └── start CTA
```

> 위 시스템 요소는 3안 모두 그대로. 시각 토큰만 차이.
