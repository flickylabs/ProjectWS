너는 솔로몬 법정 게임의 Thread W용 scripted text 작성 모델이다.
지금부터 만드는 것은 구조 채우기가 아니라 실제 플레이에서 자연스럽게 들리는 한국어 대사다.

이번 사건은 spouse 카테고리의 "새벽 통화기록"이다.
기존 spouse v1 사건이나 다른 케이스 문장을 참고하거나 모사하지 마라.
현재 첨부된 이 사건 자료만 사용하라.

사건의 필수 곡선:
- 딴살림 의심
- 형/조카 돌봄 1차 반전
- 시댁 불화가 숨김의 이유로 열림
- 공동 적금 3,000만 원 독단 해지로 B가 다시 무거워짐
- A의 투자 사기 2,000만 원이 열림
- 최종적으로는 부부 합산 5,000만 원 증발 사건으로 프레임이 바뀜

화자 정보:
- A 박지연: 36세, 학원 데스크 직원, victim_cosplay
  - 상대 직접 호칭은 "준호 씨", 감정이 올라가면 "이준호 씨", 재판관에게 상대를 말할 때는 "제 남편"
- B 이준호: 38세, 가전매장 직원, avoidant
  - 상대 직접 호칭은 "지연 씨", 감정이 올라가면 "박지연 씨", 재판관에게 상대를 말할 때는 "제 아내"

호칭 규칙:
- 재판관에게 말하는 문장은 반드시 합니다체
- 재판관에게 상대를 말할 때는 A는 "제 남편", B는 "제 아내"를 쓴다
- 상대에게 직접 말할 때만 해당 호칭 사용

Truth Throttle:
- 증인도 vague/partial/full 단계에 따라 구체성이 다름
- vague에서는 감춘 표현, full에서만 구체적 연결과 단정

---

이번 세션 범위는 아래 세 채널이다.
- witness
- aftermath
- system_message

생성 범위:
- witness
  - w-1 이성호 (43, 친형, 택배 상하차) — d-1, d-2, d-4 핵심 증인. 빚 독촉 때문에 새벽부터 일했고, "제수씨에겐 말하지 마"라고 한 장본인. 시댁 불화 배경도 증언 가능.
  - w-2 이가은 (15, 중2 조카딸) — d-1 감정 축 핵심 증인. 삼촌이 왜 생리대/스타킹을 사다줬는지, 왜 저녁마다 왔는지 증언.
  - w-3 박미라 (37, 동네 지인, 반찬가게) — d-3, d-4 핵심 증인. A가 "따로 굴릴 데 없냐"고 먼저 물었고, 투자방 링크를 보낸 사실 증언.
  - depths: vague, partial, full
  - key당 variants 3개

- aftermath
  - resultClasses:
    - a_primary_fault: 배신 확신 속 2,000만 원을 먼저 움직여 사기에 날린 쪽
    - b_primary_fault: 외도처럼 보일 행동을 숨기고 적금 3,000만 원 독단 처리한 쪽
    - shared_fault: 숨긴 돌봄은 B 먼저, 비밀 송금은 A 먼저, 부부 돈 5,000만 원 증발
    - protective_resolution: 미성년 조카, 투자 사기 2차 피해, 공동재산 복구 우선
    - procedural_caution: 장기 은폐, 독단 해지, 비밀 송금 방식 자체를 경고
  - key당 variants 2개
  - aftermath는 판결문 요약이 아니라 "외도 오해가 풀려도 신뢰와 돈은 이미 무너져 있다"는 뒷맛

- system_message
  - keys:
    - interrogation|repeat_warning
    - evidence|new_unlock
    - evidence|trap_notice
    - dossier|challenge_cleared
    - witness|credibility_shift
    - verdict|profile_update
  - key당 variants 2개
  - 플레이어를 밀어주는 중립 문구만 허용
  - "누가 먼저였다"를 직접 알려주지 마라

증인 작성 핵심:
- witness는 증인 본인이 재판관에게 직접 말하는 문장
- vague/partial/full의 구체성 차이를 분명히 — full에서만 연결과 단정이 강해짐
- w-1 full에서는 "외도 은폐보다 시댁 갈등 재폭발 공포" 해석을 지지
- w-2는 감정 축 — 삼촌에 대한 고마움과 혼란이 교차
- w-3는 A의 첫 행동을 증언 — "A가 먼저 물어왔다"

금지:
- 번역체 9패턴
- 설계 문서/JSON 복붙
- system_message에서 정답을 직접 알려주는 것
- aftermath를 판결문 요약처럼 쓰는 것

출력 형식:
```json
{
  "witness": { "entries": [] },
  "aftermath": { "entries": [] },
  "system_message": { "entries": [] }
}
```

JSON 바깥 텍스트 없이 반환하라.
