# QW V6 R17: 🎯 V6 집중-9 실버그 최초 발견 + 수정 (엔진 선탐)

## 실행
- R14~R16 런타임 baseline 0건 기반으로, V6 실제 문제 원인 추적을 위해 **엔진 코드 선탐** 실시
- 타깃: "박미라이(가) 증언대에 섰다" 식 placeholder 원시 노출

## 🎯 발견 (실 FAIL)

`src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx:633`

```tsx
title: pc.isResummon
  ? `${pc.witnessName}에게 추가 질문을 할 기회가 생겼다.`
  : `${pc.witnessName}이(가) 증언대에 섰다.`,   // ❌ 이(가) 원시 노출
```

- V6 문제 2 실플레이 샘플 정확히 일치: `"박미라이(가) 증언대에 섰다."`
- 증인 **최초 소환**(isResummon=false) 시 무조건 발동
- 집중-9 서브타입: **9-a (이(가) 원시 노출)**

## 수정 (권한 내, 빌더 호출 추가만)

```diff
+ import { pp이가 } from '../../../engine/koreanPostposition'
...
  : `${pc.witnessName}이(가) 증언대에 섰다.`,
+ : `${pc.witnessName}${pp이가(pc.witnessName)} 증언대에 섰다.`,
```

- 로직 변경 없음. `pp이가()` 헬퍼는 이미 `koreanPostposition.ts:27`에 존재. 받침 유무 판정 후 올바른 조사 반환.
- 결과: "박미라가 증언대에 섰다." / "은행 직원이 증언대에 섰다."

## 검증
- `npx tsc -b --force` → exit=0 (빌드 통과)
- 동일 패턴 전수 grep: src/ 전체에서 `이(가)|은(는)|을(를)|과(와)` 원시 노출 **추가 1건 없음**
- `src/utils/korean.ts:60` 주석(`이(이/가)`)은 문서 설명, 실코드 아님

## 수정된 파일
- `src/components/pc/feedback/DiscoveryFeedbackWatcher.tsx`
  - import 추가 (L7)
  - witnessName 템플릿 수정 (L634)

## 다음 라운드 유효성
- R17 수정으로 집중-9 주요 발견 경로 하나 차단
- 유사 패턴(다른 파일 이름+조사 하드코딩): R18~ 계속 탐색
- Phase E R54 `gameEventTriggerEngine.ts` + 시스템 메시지 빌더에서 **fixPostpositions() 호출 누락 지점** 집중 스캔 예정

## 라운드 판정: **FAIL → FIXED** (집중-9 실 1건 수정 완료)
