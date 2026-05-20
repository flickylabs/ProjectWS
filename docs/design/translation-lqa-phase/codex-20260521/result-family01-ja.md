# family-01 JA 작업 결과

작업일: 2026-05-21
브랜치: `codex/witness-cutscene-family-ja`
범위: family-01 JA witness / case truth / cutscene / scriptedText

## 변경 요약

- `src/data/witnessTestimonyData/localized.ts`
  - `FAMILY_01_OVERLAYS.ja` 13 slot을 새 KO 의도에 맞춰 갱신.
  - 박순애 `w3-d3-why-kept-secret`에서 `本人` 지시 대상을 장남/형 `ユン・テソン`으로 고정.
- `src/data/cases/generated/family-01.ja.json`
  - `dailyRoutine`, d-3/d-4 truth, e-2/e-7 restore context, e-7 depth summary, truthTable t-4, officialRecord 4를 새 truth 구조로 갱신.
  - d-4는 `ユン・テソン（長男）が父の実子ではない`로 정정하고, `ユン・ジョンフ`가 실자임을 알고도 가업 공장을 형에게 양보했다는 기록을 반영.
- `src/data/cutsceneText/family-01/d-1.json` ~ `d-5.json`
  - `slip_explosive.phase2.ja`를 모두 `それは…` 톤과 trailing `…`로 갱신.
- `src/data/scriptedText/family-01.ja.json`
  - `ユン・ジョンフ/弟`가 친자 비밀의 대상처럼 읽히던 stale JA 표현을 장남 `兄/ユン・テソン` 기준으로 정정.

## 박순애 w3-d3 JA 샘플

```text
ただ二人の息子のことを心配しているだけでした。上の息子が事業に執着するのは、もしかすると兄ご自身が父の実子ではないことに気づいて、成功に固執しているのではないかと心配されていました。それに、下の息子から受け取ったお金まで全部上の息子へ送っていたので、せめて遺産は下の息子に返してやらなければならない、と話したことがあります。
```

주체 확인:
- `上の息子` = 형/장남 `ユン・テソン`
- `兄ご自身が父の実子ではない` = 형 본인이 아버지의 실자가 아님
- `下の息子` = `ユン・ジョンフ`

## 검증 결과

- `npx tsc -b --noEmit`: PASS
- `npm run qa:fast`: PASS, `static P0=0`, `route P0=0`, `combined P0=0`
- `node scripts/detect-truth-leak.cjs`: PASS, truth leak findings `0`
- `node scripts/detect-truth-leak.cjs --strict`: PASS, truth leak findings `0`
- `npm run qa:lqa`: FAIL
  - 실패 지점: `node scripts/verify-translations.cjs --strict --scan-applied`
  - 출력 요약: `total issues: 60009`, `placeholder issues: 0`, `glossary issues: 0`, `system tone remnant issues: 0`
  - `qa:lqa` 내부의 `detect-truth-leak --strict`는 `&&` 앞 단계 실패로 실행되지 않아 별도 실행했고 0건 확인.

## truth-leak 확인

`node scripts/detect-truth-leak.cjs` 및 `node scripts/detect-truth-leak.cjs --strict` 모두 0건.
