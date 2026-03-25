# 사건 생성 배치 파일 사용법

## 사전 준비
- ChatGPT Pro 확장모드 사용
- 각 .md 파일의 ``` ``` 블록 안쪽 내용만 복사 (``` 마크 자체는 빼고)

## 순서

### 세션 1: 부부/연인 (새 대화)
1. `session1-spouse-A.md` → 파일 내용 전체 복사 → 붙여넣기 → 전송
2. JSON 응답 → `src/data/cases/spouse-01.json`, `spouse-02.json`으로 저장
3. 같은 대화에서 `session1-spouse-B.md` → 전송 → `spouse-03.json`, `spouse-04.json`
4. C → D → E → F 순서로 반복 (같은 대화에서 이어서)

### 세션 2: 이웃 (새 대화 열기!)
1. `session2-neighbor-A.md` → 새 대화에서 전송
2. B~F 같은 대화에서 이어서

### 세션 3~7: 동일 패턴
- 관계가 바뀔 때마다 새 대화
- 각 세션 A 파일에 마스터 규칙이 포함되어 있음
- B~F 파일은 짧은 추가 요청만

## 응답 문제 시 대처

ChatGPT가 JSON이 아닌 텍스트 설명을 섞어서 응답하면:
→ "JSON만 출력해주세요. 다른 텍스트 없이." 라고 재요청

JSON 파싱이 안 되면 (괄호 짝 안 맞음, 콤마 빠짐 등):
→ "유효한 JSON으로 다시 출력해주세요." 라고 재요청

응답이 너무 길어서 잘리면:
→ "이어서 출력해주세요." 라고 요청하고, 앞뒤를 합쳐서 저장

## 결과 저장

```
src/data/cases/
  spouse-01.json ~ spouse-12.json    (세션 1)
  neighbor-01.json ~ neighbor-12.json (세션 2)
  work-01.json ~ work-12.json        (세션 3)
  partner-01.json ~ partner-10.json   (세션 4)
  family-01.json ~ family-12.json     (세션 5)
  tenant-01.json ~ tenant-10.json     (세션 6)
  friend-01.json ~ friend-10.json     (세션 7)
```

전부 저장 완료되면 알려주세요 → 사건 로더 + GPT-4o-mini 대화 연동을 붙입니다.

## 검수 체크리스트 (저장 전 확인)

- [ ] JSON 파싱이 되는가
- [ ] 쟁점 5개, 증거 6개인가
- [ ] easy는 단순한가 (neither_knows 없어도 OK)
- [ ] hard는 neither_knows 1개 + 반전이 있는가
- [ ] 양쪽 모두 잘못이 있는가
- [ ] 증거 잠금 체인이 논리적인가 (requires)
- [ ] collapseViaTrust가 최소 1개인가
- [ ] 캐릭터 이름이 같은 세션 내에서 겹치지 않는가
