# 스레드 C 완료 — 컨트롤 타워 전달

## 완료 사항

spouse-01 V3 스크립트 파일럿이 전수 검증을 통과했습니다.

- BeatScriptV3: 55개 (partyA 28 + partyB 27)
- DossierCard scriptedResponse: 18개
- 증인 scriptedTestimonies: 12개 (4명 × 3depth)
- InvestigationStage NPC 응답: 세션 1~4에 포함

타입 확장 5건(TruthLevel, BeatScriptV3, scriptedResponse, scriptedNpcResponses, scriptedTestimonies)은 이미 코드에 반영되어 있습니다.

83건 확장용 GPT 세션 프롬프트(사건당 6세션 분할)와 검증 자동화 규칙도 준비 완료입니다.

---

## 컨트롤 타워 확인 요청 — 3건

### 1. S2 상태에서 partial beat 사용 불가 건

Truth Throttle 규칙을 엄밀 적용한 결과, S2에서는 truthLevel "hint"까지만 허용됩니다.
따라서 partial beatType은 S3부터만 선택됩니다.

현재 동작:
```
S0-S1 → deny (none)
S2    → hedge (hint) ← partial 사용 불가
S3    → partial/blame (partial)
S4-S5 → confession (full)
```

S2에서도 "행위는 인정하되 구체적 진실은 숨기는" 대사가 필요하다면,
S2 전용 partial beat를 truthLevel "hint"로 별도 추가해야 합니다.
이 경우 대사 내용은 hint 수준("가족 일", "개인 사정")으로 제한됩니다.

→ **S2 전용 hint-partial을 추가할지, 현재 구조(S2=hedge까지)로 갈지 결정 필요**

### 2. DossierCard scriptedResponse truthLevel 기준

카드 질문은 "정답"이므로 NPC가 상당히 인정하는 톤으로 작성했습니다.
truthLevel은 질문의 requiredLieState에 대응:

```
q1 (requiredLieState 없음) → truthLevel "hint"
q2 (requiredLieState S2)   → truthLevel "partial"
q3 (requiredLieState S3)   → truthLevel "partial" 또는 "full"
```

→ **이 기준을 83건에 동일 적용해도 되는지 확인**

### 3. 기관 증인 partial 예외

spouse-01의 최민정(재가돌봄센터 상담팀장)처럼 기관 증인은
partial depth에서도 자기 업무 범위의 사실을 일부 공개할 수 있도록 했습니다.
(예: "간병 예약 건으로 상담을 요청하셨습니다")
단, 대상자 실명은 full에서만 공개.

→ **83건의 institutional 증인에도 동일 예외를 적용할지 확인**

---

## 스키마 변경 요청

없음. 현재 타입으로 모든 데이터 표현 가능.

---

## 다음 단계

위 3건 확인 후:
1. 83건 GPT 배치 시작 (프롬프트 + 검증 규칙 준비 완료)
2. 엔진 연결 (v3GameLoopLoader 확장 — 별도 스레드 권장)

상세 보고서: `thread-packages/thread-C/thread-C-report.md`
산출물 전체: `thread-packages/thread-C/gpt-sessions/` 하위 6개 폴더
