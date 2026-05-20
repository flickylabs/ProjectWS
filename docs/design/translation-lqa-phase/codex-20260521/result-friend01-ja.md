# friend-01 JA 적용 결과

## 범위

- `src/data/witnessTestimonyData/localized.ts`의 `FRIEND_01_OVERLAYS.ja` 12개 slot을 새 KO 의도에 맞춰 갱신했다.
- `src/data/cutsceneText/friend-01/d-1.json` ~ `d-5.json`의 `slip_explosive.phase2.ja`를 보강된 dismay 문장으로 교체했다.
- `src/data/cases/generated/friend-01.ja.json`은 호칭 및 직접 mirror 충돌 여부를 검토했다. `ダウン`/`スミン` 애칭 mirror는 유지 가능했고, `スミンさん`은 원문이 `수민 씨`인 프로필/대화 문맥이라 수정하지 않았다.

## 반영 메모

- 다은이/수민이 애칭은 `ダウン`/`スミン`으로 통일했다.
- 박준혁 `w2-d2-flirt-remark`의 "꼬셨을 텐데"는 `口説いていただろうに`로 반영했다.
- 박준혁 `w2-d3-rejection-ignored`의 "도도한 척 튕기네 / 결국 넘어 올 거면서"는 `気取って跳ね返してる / 結局は落ちてくるくせに`로 반영했다.
- 오미경 증언의 "그 남성분"은 `年配の男性`, "그 젊은 분"은 `若い方`로 주체를 분리했다.
- cutscene `d-5`는 송다은 시점 자백으로 번역했다.

## 검증

- `npx tsc -b --noEmit`: pass
- `npm run qa:fast`: pass, combined P0=0
- `node scripts/detect-truth-leak.cjs`: pass, findings 0
