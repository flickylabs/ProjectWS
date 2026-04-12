# V4 연출 구현 분류표

> 2026-04-12

## 기존 인프라

| 인프라 | 상태 | 위치 |
|--------|------|------|
| Web Audio + SFX 9개 + BGM 4개 | ✅ 완비 | `soundEngine.ts` + `public/sfx/` |
| CSS 키프레임 50+개 | ✅ 완비 | `index.css` + `pc.css` |
| 토스트 시스템 | ✅ 완비 | `Toast.tsx` → `showToast()` |
| 페이즈 배너 (중앙 오버레이) | ✅ 완비 | `PCCourtLayout.tsx` |
| 이모지 136개 | ✅ 완비 | `public/emoji/` |
| 증거 SVG 12개 | ✅ 완비 | `public/evidence/` |

---

## 15개 연출 구현 분류

### 범례
- **CSS**: CSS 키프레임/클래스 추가로 구현 가능
- **JS/React**: 컴포넌트 로직 + CSS 조합
- **Sound**: 기존 SFX 매핑 또는 Web Audio 합성
- **SVG**: 인라인 SVG 에셋 생성 필요
- **외부**: 별도 도구/에셋 제작 필요

| # | 연출 | 우선순위 | 구현 방식 | ClaudeCode 가능 | 상세 |
|---|------|---------|----------|----------------|------|
| 1 | NEW FACT 배너 | P0 | CSS + JS | ✅ 전부 가능 | 슬라이드인 배너 + 0.3초 딜레이. 기존 `pc-phase-banner` 변형 |
| 2 | 쟁점 카드 슬라이드인 | P0 | CSS + JS + SVG | ✅ 전부 가능 | 카드 컴포넌트 + `slide-up` 애니메이션 |
| 3 | 조합 카드 합체 | P2 | CSS + JS | ✅ 전부 가능 | 두 요소 translate → 중앙 + scale 팝 |
| 4 | 모순 ⚡ 표시 | P1 | CSS + SVG | ✅ 전부 가능 | 기존 `pc-contradiction-flash` + 인라인 SVG 번개 |
| 5 | S5 분위기 전환 | P0 | CSS + Sound | ✅ 전부 가능 | 배경색 transition + 기존 `reveal.mp3` + 타이핑 딜레이 |
| 6 | 끼어들기 팝업 보강 | P1 | CSS + JS | ✅ 전부 가능 | 기존 구현 + 반격 질문 버튼 (`pulse-glow`) |
| 7 | 판결 진입 전환 | P3 | CSS + Sound | ✅ 전부 가능 | 기존 `cutscene-cinematic-fade` + `verdict.mp3` |
| 8 | 판결문 타이핑 + 카운터 | P1 | JS + CSS | ✅ 전부 가능 | setInterval 타이핑 + 숫자 카운터 애니메이션 |
| 9 | 증거 디테일 해금 | P2 | CSS + JS | ✅ 전부 가능 | 텍스트 reveal + `notification.mp3` |
| 10 | 증인 소환 해금 | P3 | CSS + Sound | ✅ 전부 가능 | 버튼 비활성→활성 + `pulse-glow` + `notification.mp3` |
| 11 | 증인 핵심 증언 ★ | P3 | CSS | ✅ 전부 가능 | 강조 마크 + 글로우 |
| 12 | DossierCard 해금 | P2 | CSS + JS + SVG | ✅ 전부 가능 | 카드 슬라이드업 + `chime.mp3` |
| 13 | 쟁점 연쇄 연결선 | P3 | SVG + CSS | ✅ 전부 가능 | 인라인 SVG 선 draw 애니메이션 |
| 14 | 계좌 감시 폭로 쉐이크 | P3 | CSS + Sound | ✅ 전부 가능 | 기존 `shake`/`cutscene-shake` + `tension.mp3` |
| 15 | 위임장 폭로 톤 변화 | P3 | CSS + Sound | ✅ 전부 가능 | 오버레이 opacity flash + `alert.mp3` |

### 결론: **15개 전부 ClaudeCode로 구현 가능**

---

## 기존 SFX → V4 연출 매핑

| SFX 파일 | 기존 용도 | V4 매핑 |
|---------|----------|---------|
| `reveal.mp3` | 거짓말 붕괴 | #1 NEW FACT, #5 S5 자백 |
| `notification.mp3` | 증거 해금 | #9 증거 디테일, #10 증인 해금, #12 DossierCard |
| `whoosh.mp3` | Phase 전환 | #2 쟁점 카드, #7 판결 진입 |
| `chime.mp3` | 업그레이드 | #3 조합 성공, #8 칭호 등장 |
| `alert.mp3` | 에러/이의 | #4 모순 발견, #15 위임장 폭로 |
| `tension.mp3` | 분리 심문 | #6 끼어들기, #14 계좌 감시 폭로 |
| `stamp.mp3` | 증거 제시 | #11 증인 핵심 증언 |
| `gavel.mp3` | 의사봉 | #8 판결문 마무리 |
| `click.mp3` | 클릭 | 일반 UI |

### 추가 필요 SFX (Web Audio 합성으로 생성)

| 이름 | 용도 | 톤 | 합성 방식 |
|------|------|-----|----------|
| `discovery.synth` | NEW FACT 강조 | 밝은 2음 상승 | 사인파 C5→E5 (0.15초) |
| `dramatic.synth` | 숨겨진 쟁점/위임장 | 낮은 떨림 | 삼각파 A2 + tremolo (0.5초) |
| `counter-tick.synth` | 점수 카운터 | 짧은 틱 | 클릭 노이즈 (0.02초) |
