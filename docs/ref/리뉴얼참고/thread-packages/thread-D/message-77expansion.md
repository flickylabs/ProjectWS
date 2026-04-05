# CT → Thread D: 77건 확장 착수 안내

> 일시: 2026-04-05
> 발신: 컨트롤 타워 (CT)
> 수신: Thread D (Phase 1/2 스크립트 교정)

---

## 상황

Stage-1 7건 교정이 PASS되었다. 네가 교정한 14개 파일은 모두 검증을 통과했고, 치명적 스포일러 3건(friend-01 anchorTruth 노출, partnership-01 핵심 용어, spouse-01 금지 인물명)도 정확히 잡아냈다.

이제 **77건 확장**에 들어간다.

---

## 미션

**77건 x 2 Phase = 154파일 교정.**

상세 미션은 `mission-77expansion.md`에 정리되어 있다. 핵심만 요약하면:

1. **GPT Pro에 7건씩 배치 전달** (총 11배치)
   - 각 사건의 case JSON + Phase 1 + Phase 2 를 함께 전달
   - 섹션 3의 프롬프트 복사하여 사용

2. **교정 기준은 Stage-1과 동일**
   - anchorTruth 키워드 제거 (인물명, 기관명, 금액, 날짜)
   - 해요체 → 합니다체 (재판관 대상)
   - 당사자 간 반말 유지
   - 호칭 callTerms 참조
   - 번역체 9패턴 / "특정 X" / "사전 상의" 0건

3. **매 배치 완료 시 기계 검증 grep 실행** (mission 문서 섹션 6)

4. **CRITICAL 발견 시 즉시 보고** (anchorTruth 직접 노출 등)

---

## Stage-1에서 배운 것

77건에도 동일 패턴이 **반복될 가능성이 높다**:

- **해요체**: GPT 생성물에서 일관적으로 나타남. 52건 교정했으니 77건에서는 수백 건 예상.
- **구체적 금액/날짜**: GPT가 생성 시 case JSON의 데이터를 그대로 가져다 쓰는 경향.
- **anchorTruth 직접 노출**: friend-01, partnership-01에서 발견. 가장 위험한 패턴이므로 매 사건마다 anchorTruth를 먼저 읽고 키워드를 추출한 뒤 Phase 1/2를 검수할 것.

---

## 배치 순서

spouse-02~08 (배치1) → spouse-09~12 + family-02~05 (배치2) → ... → workplace-09~12 (배치11)

카테고리 순서: spouse → family → friend → neighbor → partnership → tenant → workplace

첫 배치(spouse-02~08) 결과를 CT에 먼저 보고해라. 품질 확인 후 나머지 배치를 연속 진행한다.

---

## 참고 파일

| 파일 | 용도 |
|------|------|
| `thread-D/mission-77expansion.md` | 상세 미션 (프롬프트, 배치표, 체크리스트) |
| `thread-D/correction-log.md` | Stage-1 교정 내역 (패턴 참고용) |
| `thread-D/mission.md` | 원본 미션 (Stage-1 기준) |
| `src/data/dialogues/phase1/spouse-01.json` | 기준본 |
| `src/data/dialogues/phase2/spouse-01.json` | 기준본 |
| `src/data/cases/generated/{case}.json` | anchorTruth/callTerms 참조용 |

---

## 주의사항

- **작업 범위**: 이 미션은 **Phase 1/2 스크립트만** 다룬다. case JSON이나 v2-atoms는 건드리지 마라.
- **첫 배치 보고 필수**: spouse-02~08 완료 후 CT에 보고. 품질 이슈 발견 시 나머지 배치 전에 기준을 조정한다.
- **corrections 배열 보존**: GPT Pro가 출력하는 corrections 배열을 배치별로 보관. 추후 전체 교정 통계에 사용.

착수해라.
