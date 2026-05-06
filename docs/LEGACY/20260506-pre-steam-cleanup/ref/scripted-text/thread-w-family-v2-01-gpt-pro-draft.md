# Thread W Family v2-01 GPT Pro Prompt

## 목적
- Thread S가 Story Gate를 통과시킨 family v2 사건 `치매 어머니의 유서`에 대해, Thread G가 생성한 RuntimeCaseData를 반영한 **CT 제출용 GPT Pro 프롬프트 완성본**이다.
- 이 문서는 `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`를 사건 단위로 구체화한 실행본이다.
- 범위는 `ScriptedText` 생성용 GPT Pro 프롬프트이며, Phase 1/2 전용 프롬프트는 별도 문서로 관리한다.

## 입력 고정본
- Story Gate: `PASS`
- caseId: `case-family-v2-01`
- working slug: `family-v2-01`
- 기준 파일:
  - `src/data/cases/generated/family-v2-01.json`
  - `docs/ref/리뉴얼참고/thread-s-v2-case-design-family.md`
  - `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
  - `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`
- 참고 메모:
  - 이번 케이스는 `v2 기획`이 사건 장치까지 직접 정의하고 있으므로, `investigationStages`, `evidenceCombinations`, `DossierCard`, `조합 스킬 노드`, `핵심 발언 확장`을 모두 프롬프트 내부에 명시 반영한다.
  - runtime JSON에는 별도 `dossierQuestionIds`/`dossierCards` 필드가 없으므로, v2 기획 문서의 `dc-1`~`dc-3`와 runtime `combinationLab`의 `combo-1`~`combo-3`, `n-1`~`n-3`를 프롬프트 anchor로 사용한다.
  - v1 family 사건 프롬프트/데이터는 이 문서의 기준이 아니다.

## 사건별 Intake 완성본

```yaml
story_gate_status: "PASS"
case_id: "case-family-v2-01"
working_slug: "family-v2-01"
title: "치매 어머니의 유서"
category: "family"
summary: "60대 40 유서와 요양원 방문기록만 보면 동생이 치매 어머니를 움직여 상속을 바꾼 것처럼 보이지만, 공증 스캔본·원본 유서·20년 송금 내역·어머니 일기장이 겹치며 자기 몫을 줄이고 형의 출생 비밀과 삶의 기반까지 떠안은 사건으로 뒤집히는 family v2 케이스."
headline_hook: "배다른 동생을 평생 못마땅해하던 형은, 치매 어머니가 남긴 유서에서 자기 몫이 40퍼센트라는 걸 보고 무너진다. 동생은 끝까지 담담하다. 그래서 더 수상해 보인다."
emotional_bait: "치매 어머니 유서에선 동생 몫이 더 많고, 말년 방문기록까지 동생 쪽에 붙어 있다. 그런데 조작 방향과 20년 송금 내역이 뒤집히면, 사건의 중심은 탐욕이 아니라 숨겨진 가족사와 잘못된 보호가 된다."
anchor_truth: "윤정후는 유서를 직접 손댄 건 맞지만 자기 몫을 줄이는 조작을 했고, 20년간 형과 어머니를 몰래 도우며 형의 출생 비밀까지 지켜 왔다. 윤태성은 어머니를 모시고 살았다는 이유로 자신이 더 받아야 한다고 믿으며 평생 윤정후를 깎아내려 왔다."
resolution_dilemma: "유서를 직접 손댄 건 분명히 윤정후다. 하지만 그 조작은 자기 몫을 줄인 조작이고, 20년간 형과 어머니를 몰래 떠받쳐 온 것도 윤정후다. 윤태성은 평생 윤정후를 괄시했지만, 그가 무엇을 숨기고 있었는지 몰랐고 자기 출생의 진실조차 모른 채 살아온 피해자이기도 하다."
context:
  type: "inheritance_dispute"
  description: "배다른 동생을 평생 못마땅해하던 형은, 치매 어머니가 남긴 유서에서 자기 몫이 40퍼센트라는 걸 보고 무너진다. 동생은 끝까지 담담하다. 그래서 더 수상해 보인다."
  emotional_pressure: 9
  trigger_amplifier: "초반에는 윤정후가 치매 어머니를 움직여 유서를 유리하게 바꾼 것처럼 보인다. 그러나 공증 스캔본과 원본 유서가 겹치면, 윤정후는 90대 10을 60대 40으로 자기 몫을 줄여 바꾼 것이었음이 드러난다. 이어 20년 송금 내역과 어머니 일기장이 열리면, 사건은 단순한 유산 다툼이 아니라 동생이 형의 삶과 비밀을 함께 떠안아 온 구조로 뒤집힌다."
party_a:
  id: "a"
  name: "윤태성"
  age: 48
  occupation: "주방가구 공장 대표"
  archetype: "confrontational"
  speech_style: "동생 책임을 먼저 몰아붙이고, 자기 상처와 분노를 정당성처럼 앞세운다. 그러나 출생과 돈의 출처가 흔들리면 문장 끝이 갑자기 짧아진다."
  to_partner: "정후"
  to_judge: "제 동생"
  angry: "윤정후"
  tells:
    - "자기 답보다 먼저 동생이 얼마나 비정했는지부터 길게 말한다."
    - "어머니를 모신 사람이라는 명분을 방패처럼 세운다."
    - "출생과 돈의 출처 얘기가 나오면 말끝을 갑자기 끊는다."
party_b:
  id: "b"
  name: "윤정후"
  age: 44
  occupation: "자동차부품 가게 운영"
  archetype: "affect_flattening"
  speech_style: "핵심을 아예 부정하기보다 감정을 눌러 말하고, 가장 무거운 이유는 가장 늦게 꺼낸다. 사실을 말하면서도 체온이 낮은 식으로 정리한다."
  to_partner: "형"
  to_judge: "저희 형"
  angry: "윤태성 형"
  tells:
    - "유서 조작 같은 장면도 마치 장부를 설명하듯 건조하게 말한다."
    - "자기 잘못과 형의 오해를 한 문장 안에 묶어 무게를 평평하게 만든다."
    - "핵심 이유는 끝까지 미루다가 마지막 문장에서만 꺼낸다."
disputes:
  - id: "d-1"
    name: "말년 어머니는 유서를 스스로 판단할 능력이 있었나, B가 그 틈을 탄 건가"
    quadrant: "b_only"
    runtime_truth: "윤정후가 말년에 자주 찾아가고 서류를 챙긴 것은 사실이지만, 그 방문 자체만으로 어머니를 이용했다고 단정할 수는 없다. 핵심은 치매 말기의 판단능력과 공증 전후 흐름을 누가 어떻게 조절했는가다."
    writing_direction: "초반에는 동생이 치매 어머니를 움직였다는 의심이 가장 강해야 하고, 공증과 원본 흐름이 열린 뒤에야 방문 자체와 이용 여부를 분리해 읽게 만들어야 한다."
  - id: "d-2"
    name: "60대 40 유서 조작은 자기 몫을 늘리려 한 조작인가, 줄이려 한 조작인가"
    quadrant: "b_only"
    runtime_truth: "윤정후는 유서를 조작했다. 다만 방향은 자기 몫을 늘리는 쪽이 아니라 90대 10을 60대 40으로 바꾸며 자기 몫을 줄이는 쪽이었다. 문제는 그 이유와 그 조작의 정당성이다."
    writing_direction: "공증 스캔본이 나올 때까진 조작 의심이 강화돼야 하고, 원본 유서가 열린 뒤에는 조작의 존재보다 방향과 이유가 핵심이 돼야 한다."
  - id: "d-3"
    name: "20년 생활비와 A 사업 실패 때 돈은 누구 돈이었고 어떤 성격이었나"
    quadrant: "b_only"
    runtime_truth: "어머니 이름으로 흘러들어온 생활비와 공장 구제금 상당수는 윤정후 돈이었다. 다만 그 돈을 숨긴 방식이 보호였는지, 형의 판단을 빼앗은 통제였는지가 남는다."
    writing_direction: "late에서는 상속 비율보다 돈 출처와 장기 지원의 축이 더 무거워져야 한다."
  - id: "d-4"
    name: "A의 출생 비밀을 B는 왜 알고도 숨겼는가"
    quadrant: "b_only"
    runtime_truth: "윤정후는 형이 배다른 자식이라는 사실을 어머니 일기와 오래된 정황으로 알고 있었고, 그 비밀이 드러나면 집안 자리와 공장 기반이 함께 무너질 거라고 판단했다. 그래서 유서까지 손댔다."
    writing_direction: "비밀은 초반에 절대 새지 말고, late에서만 유서 조작의 진짜 이유로 열려야 한다."
  - id: "d-5"
    name: "누가 정말 어머니를 이용했는가"
    quadrant: "shared_misconception"
    runtime_truth: "윤태성은 어머니를 모셨다는 이유로 상속과 정당성을 독점하려 했고, 윤정후는 어머니 뜻을 지킨다는 명분으로 유서를 직접 바꿨다. 둘 다 어머니의 침묵을 각자 다른 방식으로 사용했다."
    writing_direction: "최종 결론은 한쪽의 탐욕 고발이 아니라, 두 형제가 모두 어머니의 침묵과 명분을 각자 다르게 소비했다는 씁쓸함으로 닫혀야 한다."
dispute_ids: ["d-1", "d-2", "d-3", "d-4", "d-5"]
monetary_dispute_ids: ["d-2", "d-3", "d-5"]
base_evidence_ids: ["e-1", "e-2", "e-3"]
evidence_ids: ["e-1", "e-2", "e-3", "e-4", "e-5", "e-6", "e-7"]
evidence:
  - id: "e-1"
    type: "contract"
    surface_name: "60대 40 유서 사본"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "동생이 상속을 유리하게 바꿨다는 초반 의심의 출발점"
  - id: "e-2"
    type: "log"
    surface_name: "요양원 방문기록"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "말년 접근이 많았다는 early 보강 증거"
  - id: "e-3"
    type: "testimony"
    surface_name: "전 요양보호사 음성증언"
    required_lie_state: null
    requires: []
    subject_party: "b"
    writing_role: "종이와 서류를 챙기던 장면으로 B를 더 수상하게 만드는 early 증거"
  - id: "e-4"
    type: "log"
    surface_name: "공증사무실 스캔 보관본"
    required_lie_state: "S2"
    requires: ["e-1", "e-2"]
    subject_party: "b"
    writing_role: "유서 조작 존재를 확정해 오히려 의심을 한 번 더 키우는 mid 증거"
  - id: "e-5"
    type: "contract"
    surface_name: "원본 유서 90대 10"
    required_lie_state: "S3"
    requires: ["e-4"]
    subject_party: "b"
    writing_role: "조작 방향이 탐욕이 아니라 자기 몫 축소였음을 여는 핵심 반전 증거"
  - id: "e-6"
    type: "bank"
    surface_name: "20년 송금 내역 묶음"
    required_lie_state: "S2"
    requires: ["e-5"]
    subject_party: "b"
    writing_role: "상속 비율 논쟁을 돈 출처와 장기 지원 문제로 바꾸는 late 증거"
  - id: "e-7"
    type: "device"
    surface_name: "어머니 일기장 사진"
    required_lie_state: "S3"
    requires: ["e-5", "e-6"]
    subject_party: "b"
    writing_role: "출생 비밀과 잘못된 보호를 최종 이유로 확정하는 late 증거"
witness_pool:
  - id: "w-1"
    name: "최복순"
    bias: "neutral"
    related_disputes: ["d-1", "d-2"]
  - id: "w-2"
    name: "김영수"
    bias: "neutral"
    related_disputes: ["d-2"]
  - id: "w-3"
    name: "박순애"
    bias: "pro_b"
    related_disputes: ["d-3", "d-4", "d-5"]
witness_ids: ["w-1", "w-2", "w-3"]
dossier_card_ids_v2: ["dc-1", "dc-2", "dc-3"]
evidence_combinations_ids_v2: ["c-1", "c-2", "c-3", "c-4"]
combination_recipe_ids: ["combo-1", "combo-2", "combo-3"]
derived_note_ids: ["n-1", "n-2", "n-3"]
analysis_points_base: 5
result_classes_baseline:
  - "a_primary_fault"
  - "b_primary_fault"
  - "shared_fault"
  - "protective_resolution"
  - "procedural_caution"
system_keys_baseline:
  - "interrogation|repeat_warning"
  - "evidence|new_unlock"
  - "evidence|trap_notice"
  - "dossier|challenge_cleared"
  - "witness|credibility_shift"
  - "verdict|profile_update"
channel_inventory_source: "family-v2-01 runtime JSON + family v2 design doc + runtime combinationLab + current new-case scripted bundle baseline"
```

## v2 장치 반영 메모

### investigationStages
- `e-1 60대 40 유서 사본`
  - stage 0: 유서 사본 진위와 최종본 여부 확인
  - stage 1: 왜 40대 60 비율이 처음부터 이상했는지 추궁
  - stage 2: 사본만으로 왜 B를 범인으로 확신했는지 추궁
- `e-2 요양원 방문기록`
  - stage 0: 말년 방문 빈도 확인
  - stage 1: 공증 직전 방문이 왜 늘었는지 추궁
  - stage 2: 그 흐름을 이용이라고 단정한 근거를 추궁
- `e-3 전 요양보호사 음성증언`
  - stage 0: 종이와 서류를 챙긴 정황 확인
  - stage 1: 그 장면이 왜 유서 준비처럼 보였는지 추궁
  - stage 2: 보호였는지 배제였는지 끝까지 묻는 압박으로 올린다
- `e-4 공증사무실 스캔 보관본`
  - stage 0: 같은 날 두 버전이 존재하는지 확인
  - stage 1: 90에서 60으로 바뀐 흐름과 재접수 주체를 추궁
  - stage 2: 자기 몫을 줄이는 조작까지 왜 했는지 이유를 찌른다
- `e-5 원본 유서 90대 10`
  - stage 0: 더 이른 날짜의 원본 진위 확인
  - stage 1: 원래 90대 10이었다는 사실이 무엇을 뒤집는지 추궁
  - stage 2: 탐욕이 아니라면 무엇을 막으려 했는지 비밀 축을 연다
- `e-6 20년 송금 내역 묶음`
  - stage 0: 생활비와 공장 구제금 출처 확인
  - stage 1: 왜 형이 어머니 돈인 줄로만 알게 뒀는지 추궁
  - stage 2: 보호와 통제 중 어느 쪽이었는지 압박한다
- `e-7 어머니 일기장 사진`
  - stage 0: 필체와 기록 진위 확인
  - stage 1: 출생 비밀과 90대 10 이유를 어떻게 읽어야 하는지 추궁
  - stage 2: 결국 유서 조작이 무엇을 지키기 위한 선택이었는지 끝까지 묻는다

### evidenceCombinations
- `c-1`: `e-1 + e-2`
  - 효과: `"말년 접근과 60대 40 유서가 붙으며 B가 치매 어머니를 움직였다는 의심"` 확정
  - 반영 규칙: d-1 early 반응과 trap 계열 system 문구는 플레이어가 자연스럽게 B를 범인으로 보게 만드는 함정 결이어야 한다
- `c-2`: `e-4 + e-5`
  - 효과: `"조작은 맞지만 방향은 반대였다"` 확정
  - 반영 규칙: d-2는 탐욕 추궁에서 이유 추궁으로 넘어가고, `dc-1`이 붙으면 B가 자기 몫을 왜 줄였는지 끝까지 밀어야 한다
- `c-3`: `e-5 + e-6`
  - 효과: `"90대 10의 배경은 감정이 아니라 20년 지원이었다"` 확정
  - 반영 규칙: d-3과 `dc-2`는 상속 비율보다 돈 출처와 장기 부양의 무게를 전면으로 세워야 한다
- `c-4`: `e-6 + e-7`
  - 효과: `"B는 돈과 비밀 둘 다 떠안고 있었다"` 전체 그림 완성
  - 반영 규칙: d-4, d-5, aftermath의 중심은 탐욕이 아니라 비밀과 잘못된 보호, 그리고 어머니 침묵의 사용 방식이 된다

### DossierCard
- `dc-1`
  - 카드 문장: `유서를 고친 건 맞는데, 왜 자기 몫을 더 많이 가져가는 쪽이 아니라 덜 가져가는 쪽으로 바꿨습니까?`
  - 해금 조건: `d-2 S3+`, `e-5`
  - 효과: d-2를 S4~S5로 밀어 올리며 조작의 진짜 이유를 강제로 열게 한다
- `dc-2`
  - 카드 문장: `형이 평생 어머니 돈인 줄 알았던 그 돈, 사실은 당신 돈이었습니까?`
  - 해금 조건: `d-3 S2+`, `e-6`
  - 효과: d-3을 돈 출처와 은폐 책임의 축으로 바꾸고, 장기 지원의 무게를 직접 자백시키게 한다
- `dc-3`
  - 카드 문장: `60대 40으로 바꾸지 않았다면, 형이 무엇을 잃게 됐습니까?`
  - 해금 조건: `d-4 S3+`, `e-7`
  - 효과: 출생 비밀, 자리, 공장 기반을 late에서만 구체화하게 만드는 최종 비밀 카드다

### 조합 스킬 노드
- `combo-1` -> `n-1 말년 접근과 유산 비율이 맞물린다`
  - 입력: `e-1`, `e-2`
  - judgeHint: 초반 의심이 왜 강했는지 설명하는 함정 조합
- `combo-2` -> `n-2 조작은 맞다. 그런데 자기 몫을 줄였다`
  - 입력: `e-4`, `e-5`
  - judgeHint: 조작 존재는 유지하되 탐욕 프레임이 무너지는 핵심 반전 조합
- `combo-3` -> `n-3 B는 돈과 비밀 둘 다 떠안고 있었다`
  - 입력: `e-6`, `e-7`
  - judgeHint: 상속 사건이 아니라 비밀과 보호의 사건으로 프레임이 넘어가는 최종 조합

### 핵심 발언 확장
- d-1에서 B가 `유서 얘기를 아예 안 한 건 아닙니다`라고 말하면, d-2에서는 `그 유서에 당신 손이 닿은 건 사실입니까?`로 바로 이어져야 한다
- d-2에서 B가 `더 가지려고 바꾼 게 아닙니다`라고 말하면, d-4에서는 `그럼 무엇을 막으려 한 겁니까?`로 확장돼야 한다
- d-3에서 B가 `형 자존심이 무너질까 봐 말 못 했다`라고 말하면, d-5에서는 `형을 지킨다는 명분으로 어머니 뜻까지 고친 건 정당합니까?`로 이어져야 한다
- d-5에서 A가 `어머니가 늘 나를 살린 줄 알았다`라고 말하면, d-3에서는 `그 돈의 출처를 확인한 적은 한 번이라도 있었습니까?`로 되돌아가야 한다

## GPT Pro 공통 첨부 묶음

### 필수 첨부
- `src/data/cases/generated/family-v2-01.json`
- `docs/ref/리뉴얼참고/thread-s-v2-case-design-family.md`
- `docs/ref/scripted-text/thread-w-gpt-pro-standard-template.md`
- `docs/ref/scripted-text/thread-w-korean-quality-checklist.md`

### 후속 보강 첨부
- family-v2-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold`가 생성되면 재실행 시 함께 첨부
- 다만 현재 문서는 위 파일들 없이도 runtime + 기획만으로 GPT Pro 실행이 가능하도록 닫아 둔다

## 사건별 공통 지시문

```text
너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 family 카테고리의 "치매 어머니의 유서"다.
기존 family v1 사건이나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건의 필수 곡선:
- 동생이 치매 어머니를 움직여 유서를 유리하게 바꿨다는 의심
- 공증 스캔본으로 조작 사실이 확인되며 의심이 한 번 더 강화
- 원본 유서 90대 10이 열리며 조작 방향이 반대로 뒤집힘
- 20년 송금 내역으로 90대 10의 배경이 장기 지원이었다는 점이 드러남
- 어머니 일기장으로 형의 출생 비밀과 잘못된 보호가 열림
- 최종적으로는 단순 상속 다툼이 아니라 비밀·보호·통제의 사건으로 프레임이 바뀜

사건 핵심:
- 60대 40 유서 사본
- 말년 요양원 방문기록과 전 요양보호사 증언
- 공증사무실 스캔본의 이중 버전
- 원본 유서 90대 10
- 20년 생활비·공장 구제금 송금
- 어머니 일기장의 출생 비밀
- 누가 어머니를 지켰는가가 아니라, 누가 어머니 침묵을 어떻게 사용했는가

초반 인상:
- 윤정후가 치매 어머니를 흔들어 유서를 바꾼 사람처럼 보여야 한다.

중반 뒤집기:
- 조작은 맞지만 방향이 탐욕이 아니라 자기 몫 축소였다는 1차 반전이 열려야 한다.

후반 정리:
- 윤정후는 이유와 무관하게 유서를 직접 손댄 책임, 형 삶을 대신 설계한 책임이 무겁게 남아야 한다.
- 윤태성은 어머니를 모셨다는 명분과 분노로 동생을 오래 범인 취급했고, 돈 출처와 가족사를 확인하지 않은 채 정당성을 독점한 책임이 남아야 한다.
- 결론은 "누가 더 가져가려 했는가"가 아니라 "누가 어머니 침묵을 어떻게 사용했고, 누구 삶을 대신 결정했는가"가 되어야 한다.

화자 정보:
- A 윤태성: 48세, 주방가구 공장 대표, confrontational
  - 동생 책임을 먼저 몰아붙이고, 자기 상처와 분노를 정당성처럼 앞세운다.
  - 자기 답보다 먼저 동생이 얼마나 비정했는지부터 길게 말한다.
  - 어머니를 모신 사람이라는 명분을 방패처럼 세운다.
  - 출생과 돈의 출처 얘기가 나오면 말끝을 갑자기 끊는다.
  - 상대 직접 호칭은 "정후", 감정이 올라가면 "윤정후", 재판관에게 상대를 말할 때는 "제 동생"
- B 윤정후: 44세, 자동차부품 가게 운영, affect_flattening
  - 핵심을 아예 부정하기보다 감정을 눌러 말하고, 가장 무거운 이유는 가장 늦게 꺼낸다.
  - 유서 조작 같은 장면도 장부 설명처럼 건조하게 말한다.
  - 자기 잘못과 형의 오해를 한 문장 안에 묶어 무게를 평평하게 만든다.
  - 핵심 이유는 끝까지 미루다가 마지막 문장에서만 꺼낸다.
  - 상대 직접 호칭은 "형", 감정이 올라가면 "윤태성 형", 재판관에게 상대를 말할 때는 "저희 형"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- 재판관에게 상대를 말할 때는 A는 "제 동생", B는 "저희 형"을 쓴다
- 상대에게 직접 말할 때만 "정후" / "윤정후" / "형" / "윤태성 형"을 쓴다
- 한 문장 안에 재판관 호칭과 직접 호칭을 섞지 마라

Truth Throttle:
- early에서는 90대 10 원본, 20년 송금, 형의 출생 비밀, 유서를 자기 몫 축소 방향으로 고쳤다는 핵심을 전부 다 열지 마라
- early에서는 "그 서류", "그 비율", "그 방문", "그 돈", "그 비밀"처럼 감춘 표현을 주로 써라
- mid에서는 조작 존재와 방향 반전까지만 열고, 이유는 끝까지 미뤄라
- late에서는 90대 10, 60대 40, 20년 지원, 공장 구제금, 출생 비밀까지 구체화된다
- monetaryDisputeIds가 `d-2`, `d-3`, `d-5`이므로 관련 late 문장에는 90대 10, 60대 40, 20년 지원, 큰돈 송금 같은 수치·규모 정보가 살아 있어야 한다

장치 반영 규칙:
- investigationStages는 evidence_present 반응에서 반드시 살아 있어야 한다: stage 0은 진위 확인, stage 1은 목적 추궁, stage 2는 은폐 이유와 관계 파장 추궁으로 올라가야 한다
- evidenceCombinations `c-1`, `c-2`, `c-3`, `c-4`와 combo nodes `n-1`~`n-3`은 서로 다른 의미 전환을 만들어야 한다. 단순 요약으로 뭉개지 마라
- DossierCard `dc-1`~`dc-3`은 기본 증거 질문의 반복이 아니라, late state를 강제로 밀어 올리는 카드처럼 들려야 한다
- 핵심 발언 확장은 interrogation 대사 간 연결 고리로 반드시 살아 있어야 한다

채널 공통 규칙:
- 첫 문장은 질문이나 증거에 대한 직접 반응이어야 한다
- 질문 원문, dispute 이름, evidence 표면명을 그대로 복붙하지 마라
- 설계 문서, 런타임 JSON 문장을 그대로 살리지 마라
- 같은 key의 variants는 사실 관계는 같고 표현만 달라야 한다
- A와 B는 같은 내용을 말해도 문장 시작어, 공격 습관, 리듬이 전혀 달라야 한다
- 번역체 9패턴, 사전 상의/협의, 미리 말씀드리지 못한, 특정 X 금지

이 사건에서 특히 금지:
- 초반부터 90대 10 원본, 20년 송금, 출생 비밀을 전부 자백시키는 것
- 조작 방향 반전을 너무 빨리 열어 초반 tension을 죽이는 것
- 윤정후를 순수한 희생자, 윤태성을 순수한 탐욕가로 고정하는 것
- "치매 어머니의 유서"라는 제목이나 JSON 표현을 대사 안에 그대로 넣는 것
```

## Session 1 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party a, 즉 윤태성만이다.

생성 범위:
- disputes: d-1, d-5
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

윤태성 쪽 추가 규칙:
- 초반에는 동생을 거의 범인으로 확정한 형처럼 들려야 한다
- "어머니를 모신 건 나다", "정후가 말년에 자주 들락거렸다"는 명분과 분노를 먼저 세워라
- confrontational답게 자기 답보다 비난을 먼저 던지고, 질문이 오면 그제야 본론으로 들어가라
- d-1의 고백은 `S0 동생이 어머니를 흔들었다 -> S1 자주 드나든 건 사실이다 -> S2 유서 얘기도 꺼냈을 거다 -> S3 판단능력이 흔들린 건 인정한다 -> S4 내가 보고 싶은 쪽으로 의심한 것도 있다 -> S5 어머니를 모신 분노가 동생을 범인으로 굳혔다`의 흐름을 가져야 한다
- d-5의 고백은 `S0 이용한 건 동생뿐이다 -> S1 나는 어머니를 모신 쪽이다 -> S2 내 명분도 어머니 침묵 위에 있었다 -> S3 돈 출처를 몰랐다 -> S4 출생 진실도 몰랐다 -> S5 나도 어머니를 내 정당성으로 쓰고 있었다`의 흐름을 가져야 한다
- `어머니가 늘 나를 살린 줄 알았다` 같은 문장이 later d-3 돈 출처 질문으로 되돌아갈 수 있게 씨앗을 심어라
- S0-S1에서는 90대 10 원본, 20년 송금, 출생 비밀을 열지 마라

이 사건에서 윤태성의 실패 패턴:
- 너무 빨리 자기 오해를 자백하면 초반 범인 프레임이 죽는다
- 끝까지 동생 비난만 반복하면 d-5의 shared fault가 안 선다
- 윤정후 같은 평평한 문장으로 쓰면 실패다

출력 형식:
{
  "channel": "interrogation",
  "party": "a",
  "entries": []
}

JSON 바깥 텍스트 없이 반환하라.
```

## Session 2 Prompt

```text
너는 위 공통 지시문을 따르는 scripted text 작성 모델이다.

이번 세션 범위는 interrogation 채널 중 party b, 즉 윤정후만이다.

생성 범위:
- disputes: d-1, d-2, d-3, d-4
- lieStates: S0, S1, S2, S3, S4, S5
- questionTypes: fact_pursuit, motive_search, empathy_approach
- key당 variants 5개

윤정후 쪽 추가 규칙:
- 초반에는 유서 조작 의심을 전면 부정하기보다, 사실을 조금씩만 꺼내는 affect_flattening 리듬이어야 한다
- 자기 행동은 "찾아뵌 것뿐", "서류를 본 적은 있다", "정리하려고 했다", "더 가지려던 건 아니다"처럼 한 단계씩만 열어라
- d-1의 고백은 `S0 그럴 의도는 없었다 -> S1 자주 간 건 맞다 -> S2 유서 얘기를 아예 안 한 건 아니다 -> S3 말년 흐름을 정리한 건 맞다 -> S4 형이 모르는 사정이 있었다 -> S5 형 삶이 무너질까 두려웠다`의 순서를 가져야 한다
- d-2의 고백은 `S0 손댄 적 없다 -> S1 문장을 다시 본 적은 있다 -> S2 최종본에 손이 닿았다 -> S3 90을 60으로 낮췄다 -> S4 더 가지려고 한 게 아니다 -> S5 형의 삶과 비밀을 막으려 한 선택이었다`의 순서를 가져야 한다
- d-3의 고백은 `S0 보낸 적 없다 -> S1 조금 도운 적은 있다 -> S2 거의 매달 보냈다 -> S3 공장 무너질 때도 돈을 넣었다 -> S4 형이 어머니 돈인 줄 알도록 뒀다 -> S5 형 자존심과 집안이 무너질까 말 못 했다`의 순서를 가져야 한다
- d-4의 고백은 `S0 그런 비밀 모른다 -> S1 일기장 같은 건 본 적 있다 -> S2 형이 모르는 집안 얘기다 -> S3 출생 비밀을 알고 있었다 -> S4 들추면 자리와 공장이 무너진다고 여겼다 -> S5 그래서 유서까지 바꿨다`의 순서를 가져야 한다
- `더 가지려고 바꾼 게 아닙니다`, `형 자존심이 무너질까 봐 말 못 했습니다` 같은 문장이 later d-4, d-5 압박으로 확장될 수 있게 미리 심어라
- S0-S1에서는 90대 10, 20년 송금, 출생 비밀을 전부 다 열지 마라

이 사건에서 윤정후의 실패 패턴:
- 너무 빨리 자기 몫 축소와 출생 비밀을 다 자백하면 mid 반전이 죽는다
- 끝까지 "보호였다"만 반복하면 유서 조작과 통제의 무게가 안 선다
- 윤태성 같은 공격형 문장으로 쓰면 실패다

출력 형식:
{
  "channel": "interrogation",
  "party": "b",
  "entries": []
}

JSON 바깥 텍스트 없이 반환하라.
```

## Session 3 Prompt

```text
너는 위 공통 지시문과 v2 장치 반영 메모를 따르는 scripted text 작성 모델이다.

이번 세션 범위는 아래 두 채널이다.
- evidence_present
- dossier

현재 증거 범위:
- e-1 60대 40 유서 사본
- e-2 요양원 방문기록
- e-3 전 요양보호사 음성증언
- e-4 공증사무실 스캔 보관본
- e-5 원본 유서 90대 10
- e-6 20년 송금 내역 묶음
- e-7 어머니 일기장 사진

생성 범위:
- evidence_present
  - parties: a, b
  - evidenceIds: e-1, e-2, e-3, e-4, e-5, e-6, e-7
  - investigationStages: stage_0, stage_1, stage_2
  - lieBands: early, mid, late
  - key당 variants 5개
- dossier
  - dossierCardIdsV2: dc-1, dc-2, dc-3
  - targets:
    - dc-1 -> b
    - dc-2 -> b
    - dc-3 -> b
  - cardBands: unlock, pressure, collapse
  - key당 variants 3개

이 사건의 evidence reaction 축:
- e-1/e-2/e-3: 세 개가 겹치면 B가 치매 어머니를 움직여 상속을 바꾼 사람처럼 보여야 한다
- e-4: 유서 조작이 실제로 확인되며 의심이 한 번 더 강해져야 한다
- e-5: 조작 존재는 유지한 채, 방향이 자기 몫 축소였다는 반전이 열린다
- e-6: 상속 다툼이 돈 출처와 장기 부양의 문제로 바뀐다
- e-7: 출생 비밀과 잘못된 보호가 조작의 진짜 이유로 닫힌다

investigationStages 반영 규칙:
- stage 0 반응은 진위 확인을 받는 순간의 짧고 즉각적인 반응이어야 한다
- stage 1 반응은 왜 그 흐름이 생겼는지 묻는 순간의 방어·축소·흔들림이어야 한다
- stage 2 반응은 무엇을 숨겼고, 왜 숨겼고, 누구 삶을 대신 결정했는지까지 치고 들어가는 압박 반응이어야 한다

evidenceCombinations / combo nodes 반영 규칙:
- `c-1`과 `n-1`이 붙을 때는 d-1이 B 범인 프레임 쪽으로 강하게 기울어지는 함정 결을 반영하라
- `c-2`와 `n-2`가 붙을 때는 "조작은 맞다"를 유지한 채 "그런데 왜 자기 몫을 줄였는가"가 핵심 질문으로 떠올라야 한다
- `c-3`과 `dc-2`가 붙을 때는 상속 비율 논쟁이 돈 출처와 장기 지원 축으로 완전히 옮겨가야 한다
- `c-4`와 `n-3`이 붙을 때는 사건 프레임이 `유산 탐욕`에서 `비밀과 보호의 왜곡`으로 완전히 바뀌어야 한다

DossierCard 반영 규칙:
- `dc-1`은 B에게 조작 방향의 비정상성을 직격하는 카드여야 한다
- `dc-2`는 B에게 20년 지원과 돈 출처를 직접 자백시키는 카드여야 한다
- `dc-3`은 B가 형에게서 무엇을 지키려 했는지 late에서만 열게 만드는 카드여야 한다

핵심 발언 확장 규칙:
- B가 유서 얘기를 아예 안 한 건 아니라고 말하면 d-2 조작 직접 추궁으로 이어져야 한다
- B가 더 가지려고 바꾼 게 아니라고 말하면 d-4 비밀 추궁으로 이어져야 한다
- B가 형 자존심을 말하면 d-5 정당성 질문으로 이어져야 한다
- A가 어머니가 자신을 살린 줄 알았다고 말하면 d-3 돈 출처 질문으로 되돌아가야 한다

출력 형식:
{
  "evidence_present": { "entries": [] },
  "dossier": { "entries": [] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## Session 4 Prompt

```text
너는 위 공통 지시문과 v2 장치 반영 메모를 따르는 scripted text 작성 모델이다.

이번 세션 범위는 아래 세 채널이다.
- witness
- aftermath
- system_message

생성 범위:
- witness
  - witnessIds: w-1, w-2, w-3
  - depths: vague, partial, full
  - key당 variants 3개
- aftermath
  - resultClasses: a_primary_fault, b_primary_fault, shared_fault, protective_resolution, procedural_caution
  - key당 variants 2개
- system_message
  - keys:
    - interrogation|repeat_warning
    - evidence|new_unlock
    - evidence|trap_notice
    - dossier|challenge_cleared
    - witness|credibility_shift
    - verdict|profile_update
  - key당 variants 2개

증인 작성 지침:
- w-1 최복순: 전 요양보호사다. 말년 방문 빈도, B가 종이와 서류를 챙기던 장면, 어머니가 불안해하던 공기까지 직접 본 사람처럼 말해야 한다. d-1, d-2 핵심 증인이다
- w-2 김영수: 공증사무실 직원이다. 같은 날 두 버전 문서가 스캔되고 마지막 재접수 주체가 B였다는 사실을 기록 중심으로 증언해야 한다. d-2 핵심 증인이다
- w-3 박순애: 어머니의 오래된 친구다. 어머니가 "정후가 보내는 돈"을 언급한 적과 태성의 출생 비밀을 걱정하던 말을 기억하는 사람처럼 말해야 한다. d-3, d-4, d-5 핵심 증인이다
- witness는 증인 본인이 재판관에게 직접 말하는 문장이어야 한다
- vague / partial / full의 구체성 차이를 분명히 두고, full에서만 숨은 연결과 해석이 강해지게 하라

aftermath 작성 지침:
- a_primary_fault: 윤태성이 어머니를 모신 명분과 오래된 분노로 동생을 먼저 범인 취급하고, 돈 출처와 가족사를 확인하지 않은 채 정당성을 독점한 쪽이라는 결말
- b_primary_fault: 윤정후가 이유와 무관하게 유서를 직접 조작하고, 형 삶과 비밀을 대신 설계한 쪽이라는 결말
- shared_fault: 한쪽은 어머니 돌봄을 정당성 방패로 삼고, 다른 한쪽은 어머니 뜻을 지킨다는 명분으로 유서를 바꿨으며, 결국 둘 다 어머니 침묵을 이용했다는 씁쓸한 결말
- protective_resolution: 출생 비밀을 상속 공격 카드로 쓰지 말고, 장기 부양 기여와 유서 조작 책임을 분리해 정리하는 결말
- procedural_caution: 어떤 이유로도 타인 인생과 유서를 대신 설계해선 안 된다는 경고, 그리고 가족사 은폐와 상속 절차 혼용 자체를 경계하는 결말
- aftermath는 판결문 요약이 아니라 "탐욕처럼 보였던 사건이 비밀과 통제로 더 무거워진다"는 뒷맛을 보여야 한다

system_message 원칙:
- 플레이어를 밀어주는 중립 문구만 허용
- 출생 비밀이나 90대 10 원본을 직접 스포일러하지 마라
- combo node나 derived note가 열릴 때도 비스포일러 문장으로 유지하라
- `evidence|new_unlock` 변형 일부는 `비율만 보이던 사건이 출처와 이유로 넘어가고 있습니다`, `숨겨진 지원의 흐름이 이어지고 있습니다` 같은 문장으로 v2 장치 반영이 가능해야 한다
- `dossier|challenge_cleared` 변형 일부는 hard question이 통했다는 인상을 주되, `dc-1`~`dc-3` 문장을 낭독하지 마라

출력 형식:
{
  "witness": { "entries": [] },
  "aftermath": { "entries": [] },
  "system_message": { "entries": [] }
}

JSON 바깥 텍스트 없이 반환하라.
```

## 후속 보강 포인트
- family-v2-01 전용 `structure-v2` / `v2-atoms` / `full-scaffold`가 별도로 생성되면 combo note, dossier card, hard question coverage를 1회 더 대조한다.
- 현재 문서는 runtime JSON과 v2 기획만으로도 GPT Pro 실행이 가능하도록 닫아 두었다.
