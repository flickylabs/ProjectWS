# spouse-01 ZH-CN 적용 결과

작성일: 2026-05-21
브랜치: `codex/witness-cutscene-spouse-zh`

## 변경 범위

- `src/data/witnessTestimonyData/localized.ts`
  - `SPOUSE_01_OVERLAYS["zh-CN"]` 6개 slot 갱신:
    - `w1-d1-resident-info`
    - `w1-d1-no-single-woman`
    - `w1-d1-core`
    - `w2-d2-cash-pattern`
    - `w2-hd3-signature-doubt`
    - `w2-hd3-core`
- `src/data/cutsceneText/spouse-01/{d-1,d-2,h-d3,h-d4}.json`
  - `slip_explosive.phase2["zh-CN"]` placeholder를 KO 보강 의도에 맞춰 교체.

## 반영 메모

- `w1-d1-core`는 302호 `住户`가 숨기려 한 맥락, 아이의 `叔叔` 호칭, `来访的人` 주체를 명시했다.
- `w2-d2-cash-pattern`은 ATM 출금이 아니라 `柜台直接取款`으로 정리했다.
- `w2-hd3-core`는 `丈夫先生过来`로 나중에 은행에 온 주체를 명시했다.
- phase2 컷신은 ZH-CN 톤 가이드에 맞춰 `那个...` / `其实...`와 trailing `...`를 유지했다.
- `src/data/cases/generated/spouse-01.zh-CN.json` mirror를 검토했으며, 이번 overlay/cutscene placeholder와 중복되는 stale 문자열은 발견하지 못했다. 은행 거래 원장 쪽 ATM/柜台 표기는 KO mirror의 원장 항목과 같은 별도 증거 데이터라 수정하지 않았다.

## 검증

- `npx tsc -b --noEmit`: PASS
- `npm run qa:fast`: PASS, static P0=0 / route P0=0 / combined P0=0
- `node scripts/detect-truth-leak.cjs`: PASS, truth leak findings 0, zh-CN 0

## 비고

- 지정된 `docs/design/translation-lqa-phase/codex-20260521/thread-spouse01-zh.md`는 worktree에 없었다. 대신 상위 의뢰서와 현존하는 `threads/thread-beta3-spouse-01-zh-CN.md`를 확인했고, 현재 사용자 요청의 write 범위를 우선했다.
