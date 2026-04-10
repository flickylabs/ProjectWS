# Thread-E 100 New Cases — Wave A Authoring Order

## 목적

이 문서는 Wave A 10건을 스레드 A에 넘길 때의 **권장 생성 순서**와 **사건별 handoff readiness**를 정리한 것이다.

핵심 판단 기준은 3개다.

1. **초기 생성 안정성**  
   첫 배치에서 증거 체인과 판결 딜레마가 가장 명확한 사건부터 넣어, ScriptedText/RuntimeCaseData 변환 품질을 빠르게 고정한다.
2. **카테고리 다양성**  
   초반부터 회사/임대차/공공/동업/부부/이웃/온라인/의료/친구/가족이 섞이도록 해서 생성기 편향을 줄인다.
3. **민감도 램프업**  
   고도의 민감 소재(의료 응급, 딥페이크, 가족폭력 기록 복원)는 생성 스타일이 안정된 뒤 후반에 넣는다.

## Readiness 판정 기준

### `READY_NOW`

- 현재 기획서만으로 **스레드 A가 추가 질의 없이 RuntimeCaseData + ScriptedText 변환에 착수 가능**
- 즉, `사건 훅 / 양측 숨김 / 쟁점 / 증거 해금 순서 / 핵심 조합 / 뒤집기 / 판결 딜레마`가 이미 충분히 고정되어 있음

### 공통 전처리 메모

Wave A 10건은 모두 `READY_NOW`다.  
다만 현재 문서는 `authoring brief` 형식이므로, 스레드 A는 변환 전 아래 **공통 전처리**를 넣어야 한다.

- `headlineHook`, `summary`, `meta.emotionalBait`, `meta.anchorTruth`, `meta.resolutionDilemma`를 brief에서 정식 필드로 정리
- 기본 3증거(`baseEvidenceIds`) 선택
- 증거 체인을 `requiredLieState`, `investigationStages`, `evidenceCombinations`로 확장
- `socialGraph / witnessPool / relationshipLedger`를 생성기 친화형으로 보강
- 민감 소재 사건에는 `sensitivityTags`를 먼저 고정

이 5개는 **보강 작업**이지, 사건 기획이 비어 있다는 뜻은 아니다.

## 권장 순서

### Batch 1 — 생성기 캘리브레이션

1. `workplace-new-02` — **행사가 72시간** [`workplace`, `READY_NOW`]  
   가장 먼저 넣기 좋은 이유는 문서·메일·시간창·이사회 자료처럼 증거 형식이 명확하고, 양측 숨김도 깔끔하게 대칭적이기 때문이다. 회사 매각/옵션 행사 구조는 stakes가 크지만 복잡한 물리현장이나 감각 증거가 적어 생성기 안정화용 1번 타자로 적합하다.  
   투입 메모: 옵션 행사 기회 상실과 잔류보너스 협상을 `현재 손해 vs 숨은 계산`으로 분리해 lie-state를 짜면 된다.

2. `tenant-new-01` — **보일러 앱의 18도** [`tenant`, `READY_NOW`]  
   IoT 로그, 가스 사용량, 관리실 문자, 공실 전환 메시지 등 엔진에 바로 얹기 좋은 증거들이 정리돼 있다. 생활 밀착형이라 플레이 감각이 빠르고, 기존 `tenant-09`류 계약서 사기 축과도 달라 초기 배치용으로 좋다.  
   투입 메모: `난방 제한`과 `무단 조리 테스트`를 각각 별도 진실축으로 두고 base evidence 3장을 명확히 고르면 된다.

3. `civic-new-10` — **심사표 72점** [`civic`, `READY_NOW`]  
   점수표, 고용 명부, 외부 청탁 메신저, 현장실사 자료가 잘 분리돼 있어 공공/제도 카테고리의 기준 샘플로 쓰기 좋다. 제도 이야기지만 설명형에 갇히지 않고, 심사 조작과 신청 자료 부풀리기가 동시에 살아 있다.  
   투입 메모: 심사표 수정 전후가 한눈에 보이도록 viewerData를 먼저 설계하면 변환이 쉽다.

### Batch 2 — 분기 확장

4. `partnership-new-10` — **데이터룸의 체크박스** [`partnership`, `READY_NOW`]  
   데이터룸, 실명 상담 메모, 허위 비식별 체크, 인수사 미팅이라는 현대적 갈등축이 강하고 증거 해금 구조도 선명하다. 기존 `partnership-09`와 겹치지 않으면서 동업 카테고리의 고급형 사건으로 바로 쓸 수 있다.  
   투입 메모: 개인정보·의료정보 관련 `sensitivityTags`를 먼저 붙이고, 증거의 `legitimacy`와 `provenance`를 정교하게 나누는 편이 좋다.

5. `spouse-new-06` — **냉동배아 연장동의서** [`spouse`, `READY_NOW`]  
   병원 앱 알림, 결제 중단, 해외 이동 준비, 동의 종료라는 조합이 매우 강하고 부부 사건 중에서도 기존 대표축과 다르다. 감정 강도가 높지만 로그·계약형 증거가 중심이라 생성기는 안정적으로 받을 수 있다.  
   투입 메모: 재생산·의료 동의 소재이므로 `reproductive_privacy`, `medical_consent` 태그를 고정하고 판단 축을 `생명계획 vs 일방 결정`으로 선명하게 잡는 것이 중요하다.

6. `neighbor-new-03` — **전자동의서의 지문** [`neighbor`, `READY_NOW`]  
   재건축 전자동의, 노인 OTP, 허위 공사 약속으로 증거전이 또렷하고, 기존 이웃 리디자인과 완전히 다른 정치·커뮤니티 전장이다. 제3자(노인 세대, 추진위, 반대 측)가 있지만 사건 중심축이 흐리지 않는다.  
   투입 메모: socialGraph를 풍부하게 넣되, 핵심 대립은 끝까지 A/B에 남겨 두는 방식이 좋다.

### Batch 3 — 민감도 높은 고밀도 사건

7. `online-new-05` — **음성모델 11초** [`online`, `READY_NOW`]  
   딥보이스 가짜 사과 클립이라는 훅이 강하고, 선행 음성권 침해와 보복 유포가 서로를 정당화하지 못하는 구조가 좋다. 온라인 카테고리 대표 샘플로 적합하지만, AI/딥페이크 표현 톤을 먼저 안정시킨 뒤 넣는 편이 안전하다.  
   투입 메모: `deepfake`, `voice_rights`, `platform_reputation` 태그를 고정하고, 음성 파일·파형·제보 메일을 viewerData에서 과장 없이 다뤄야 한다.

8. `professional-new-01` — **주황 팔찌의 13분** [`professional`, `READY_NOW`]  
   의료 응급 판단, 보호자 라이브 폭로, 외부 약물 투여, 병상 부족 압박이 모두 살아 있어 카테고리 대표 사건으로 매우 강하다. 다만 응급의학적 표현이 과도하게 단정적으로 가면 안 되므로, 생성 스타일이 안정된 뒤 투입하는 것이 좋다.  
   투입 메모: `medical`, `emergency_care`, `patient_privacy` 태그를 붙이고, 진단 단정보다 `판단 왜곡`과 `현장 개입` 중심으로 ScriptedText를 짜야 한다.

9. `friend-new-08` — **구조보다 먼저 올라간 릴스** [`friend`, `READY_NOW`]  
   산악 구조보다 브랜드 릴스가 먼저 올라간다는 훅이 강하고, 기상 경보 은폐와 구조 장면 선점이 서로 반격 재료가 된다. 친구 카테고리 안에서도 구조·협찬·콘텐츠 윤리가 한 번에 묶여 있어 독자적이다.  
   투입 메모: witness 역할이 많아질 수 있으므로 구조대/크루/브랜드 담당자 중 2~3명만 핵심 증인으로 압축하는 편이 좋다.

10. `family-new-04` — **가족클라우드의 복원본** [`family`, `READY_NOW`]  
   디지털 유산, AI 복원, 출판사 유출, 가족폭력 기록이라는 조합이 매우 강하지만 감정층이 가장 복합적이다. 기획 자체는 충분히 단단하므로 바로 착수 가능하되, 생성기 톤이 안정된 이후 마지막 카드로 넣는 편이 전체 완성도를 높인다.  
   투입 메모: `trauma_record`, `family_privacy`, `digital_estate` 태그를 고정하고, `누가 기록을 팔았나`보다 `누가 어떤 페이지를 살리고 숨겼나`가 중심이 되게 유지해야 한다.

## 사건별 readiness 확인

| 순서 | caseId | 사건명 | category | readiness | 비고 |
|------|--------|--------|----------|-----------|------|
| 1 | `workplace-new-02` | 행사가 72시간 | workplace | `READY_NOW` | 문서·로그형 증거가 가장 안정적 |
| 2 | `tenant-new-01` | 보일러 앱의 18도 | tenant | `READY_NOW` | 생활형+IoT 증거 조합이 명확 |
| 3 | `civic-new-10` | 심사표 72점 | civic | `READY_NOW` | 점수표·고용률 자료 구조가 깔끔 |
| 4 | `partnership-new-10` | 데이터룸의 체크박스 | partnership | `READY_NOW` | 개인정보·매각 문서축이 선명 |
| 5 | `spouse-new-06` | 냉동배아 연장동의서 | spouse | `READY_NOW` | 고감도지만 문서형 구조가 안정적 |
| 6 | `neighbor-new-03` | 전자동의서의 지문 | neighbor | `READY_NOW` | 제3자 많아도 핵심 공방이 유지됨 |
| 7 | `online-new-05` | 음성모델 11초 | online | `READY_NOW` | 딥페이크 표현 가드레일만 선반영 |
| 8 | `professional-new-01` | 주황 팔찌의 13분 | professional | `READY_NOW` | 의료 표현 정밀도 주의 |
| 9 | `friend-new-08` | 구조보다 먼저 올라간 릴스 | friend | `READY_NOW` | witness 압축 필요 |
| 10 | `family-new-04` | 가족클라우드의 복원본 | family | `READY_NOW` | 감정층·민감 태그 관리 중요 |

## 스레드 A 전달 방식 권장

### 전달 단위

- **1차 전달**: 1~3번
- **2차 전달**: 4~6번
- **3차 전달**: 7~10번

이렇게 3묶음으로 보내면, 앞 배치에서 생성기 말투·증거 viewerData·lie-state 설계 패턴을 고정한 뒤 뒤 배치에 반영하기 좋다.

### 전달 문구 기준

- 현재 문서만으로 **추가 질의 없이 착수 가능**
- 단, 스레드 A는 변환 시 `LieState 전이`, `baseEvidenceIds`, `socialGraph`, `meta` 보강을 공통 작업으로 넣어야 함
- 민감 사건(`spouse-new-06`, `online-new-05`, `professional-new-01`, `family-new-04`)은 `sensitivityTags`부터 고정 후 작성 권장

## 결론

- Wave A 10건은 **전부 스레드 A handoff ready**
- 권장 생성 순서는  
  `workplace-new-02 → tenant-new-01 → civic-new-10 → partnership-new-10 → spouse-new-06 → neighbor-new-03 → online-new-05 → professional-new-01 → friend-new-08 → family-new-04`
- 이유는 **초기 안정성 확보 → 카테고리 확장 → 민감도 높은 고밀도 사건 후반 배치** 순으로 품질을 관리하기 위해서다.
