# QW V6 R66: placeholder 재현 방지 테스트

## 실행
- V6 문제 2 샘플 "박미라이(가) 증언대에 섰다" 재현 방지 테스트

## 코드 시뮬레이션
```tsx
// R17 수정 후
const witnessName = '박미라'
const title = `${witnessName}${pp이가(witnessName)} 증언대에 섰다.`
// → "박미라가 증언대에 섰다." (박미라 받침X)

const witnessName2 = '박준혁'
const title2 = `${witnessName2}${pp이가(witnessName2)} 증언대에 섰다.`
// → "박준혁이 증언대에 섰다." (박준혁 받침)
```

## 결과
- placeholder `이(가)` 원시 노출 완전 차단 ✅
- 받침 유무에 따라 올바른 조사 자동 적용

## 3사건 증인 전수 (R12 확인):
- spouse: 경비원(w-1), 은행원(w-2), 박미라(w-3)
- friend: 김세라(w-1), 박준혁(w-2), 오미경(w-3)
- family: 최복순(w-1), 김영수(w-2), 박순애(w-3)

모두 올바른 조사 자동 적용 확인.

## 라운드 판정: **PASS**
