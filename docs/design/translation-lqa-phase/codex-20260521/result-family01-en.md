# family-01 EN witness/case/cutscene result

## 변경 요약

- `FAMILY_01_OVERLAYS.en`의 family-01 witness 슬롯을 새 KO 의도에 맞춰 갱신했다.
  - 최복순 w-1 2개 슬롯.
  - 김영수 w-2 출장 공증인 시나리오의 topic/question/testimony.
  - 박순애 w-3 5개 슬롯, 특히 `w3-d3-why-kept-secret`의 주어를 큰아들 윤태성으로 고정.
- `src/data/cases/generated/family-01.en.json`의 truth 영역을 새 d-4 정정에 맞췄다.
  - 윤태성이 Father의 biological son이 아님을 명시.
  - 정후가 biological son이며, 이를 알고도 가업 공장을 형에게 양보했다는 맥락을 반영.
  - e-2 restore_context는 `notary's home visit`로 정정.
- family-01 cutscene `d-1`~`d-5`의 `slip_explosive.phase2.en` placeholder를 "It's just that..." 톤으로 교체했다.
- `scriptedText/family-01.en.json`에서 기존 "Jeong-hu is the half-brother" 방향으로 읽히던 EN 반복문을 Tae-seong birth fact 중심으로 정리했다.

## 검증 결과

- `npx tsc -b --noEmit`: PASS
- `npm run qa:fast`: PASS, combined P0=0
- `node scripts/detect-truth-leak.cjs`: PASS, truth leak findings 0
- `node scripts/detect-truth-leak.cjs --strict`: PASS, truth leak findings 0
- `npm run qa:lqa`: verify-translations 단계에서 repo-wide 기존 strict 이슈로 exit 1
  - 최종 total issues: 60003
  - tracked HEAD report 기준 total issues 60004보다 1건 감소
  - `qa:lqa`의 `&&` 뒤 truth-leak strict는 verify exit 1 때문에 실행되지 않아 별도 실행으로 0건 확인

## d-4 정정 sample EN

> The mother's diary records that Yoon Tae-seong (the older brother) is not Father's biological son, that from Mother's perspective both sons were equally her children, and that Yoon Jeong-hu, who is the biological son, yielded the family factory to his brother despite knowing this.

## 박순애 w3-d3 sample EN

> She worried that her older son kept clinging to business perhaps because he had noticed that he himself was not his father's biological son, and was clinging to success because of that.
