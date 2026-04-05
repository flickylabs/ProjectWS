# 배치 5 검수 결과 요약

| caseId | Evidence 교정 | DossierCard 교정 |
|---|---:|---:|
| friend-08 | 4 | 7 |
| friend-09 | 7 | 6 |
| friend-10 | 3 | 7 |
| friend-11 | 10 | 6 |
| friend-12 | 6 | 6 |
| neighbor-02 | 4 | 6 |
| neighbor-03 | 7 | 6 |

## 기준
- Evidence: surfaceName/surfaceDescription의 기관명·서비스명·직함·핵심 진실 선노출 여부
- DossierCard: q1 힌트 단계 과노출, 내부 ID/영문 UI 노출, 자연스러운 한국어 여부

## Evidence 위반
{"caseId": "friend-08", "evidenceId": "e-2", "field": "surfaceName", "before": "공모전 제출 폼과 수정 이력", "after": "제출 문서와 수정 이력", "reason": "기관 맥락(공모전)을 표면 이름에서 먼저 드러내고 있어 증거 종류만 남기라는 기준에 어긋난다."}
{"caseId": "friend-08", "evidenceId": "e-2", "field": "surfaceDescription", "before": "공모전 제출 양식 내보내기와 수정 이력이다. 제출 시점과 변경 내용 확인이 필요하다.", "after": "제출 문서 원본과 수정 기록이다. 제출 시점과 변경 흐름 확인이 필요하다.", "reason": "기관 맥락을 표면 설명에 직접 노출해 플레이어가 증거 출처를 너무 빨리 특정하게 만든다."}
{"caseId": "friend-08", "evidenceId": "e-5", "field": "surfaceName", "before": "심사위원 회신 메일과 상장 원본", "after": "회신 메일과 증명 문서", "reason": "직함(심사위원)이 표면 이름에 들어가 있어 금지 기준에 걸린다."}
{"caseId": "friend-08", "evidenceId": "e-5", "field": "surfaceDescription", "before": "심사위원의 회신 메일과 상장 원본 이미지다. 심사 결과와 수상 내용 확인이 필요하다.", "after": "관련 회신 메일과 증명 문서 이미지다. 수신 시점과 표기 내용 확인이 필요하다.", "reason": "직함을 직접 드러내고 있어 표면 단계에서 출처와 권위를 과하게 노출한다."}
{"caseId": "friend-09", "evidenceId": "e-1", "field": "surfaceName", "before": "후기 비교 콜라주 캡처", "after": "후기 이미지 캡처", "reason": "편집 방식(비교 콜라주)을 표면 이름에서 먼저 밝혀 조작·편집 쟁점을 너무 이르게 암시한다."}
{"caseId": "friend-09", "evidenceId": "e-3", "field": "surfaceName", "before": "과거 공개 지적 글과 후속 DM", "after": "과거 게시글과 후속 대화", "reason": "'공개 지적'이라는 판단이 과거 앙금의 방향을 너무 빨리 정해 준다."}
{"caseId": "friend-09", "evidenceId": "e-3", "field": "surfaceDescription", "before": "과거에 올라온 공개 지적 게시글과 후속 DM 기록이다. 작성 경위와 맥락 확인이 필요하다.", "after": "이전 게시글과 뒤이어 오간 대화 기록이다. 작성 경위와 전후 맥락 확인이 필요하다.", "reason": "표면 설명에서 갈등 성격을 먼저 규정해 anchorTruth의 오래된 앙금 축을 과도하게 노출한다."}
{"caseId": "friend-09", "evidenceId": "e-4", "field": "surfaceName", "before": "익명계정 가입·로그인·삭제 로그", "after": "계정 활동 로그", "reason": "표면 이름이 계정 성격과 행위 흐름을 너무 구체적으로 드러내 첫 인상 단계 정보를 과하게 준다."}
{"caseId": "friend-09", "evidenceId": "e-4", "field": "surfaceDescription", "before": "커뮤니티 익명계정의 가입·로그인·삭제 기록이다. 계정 소유와 활동 이력 확인이 필요하다.", "after": "관련 계정의 생성·접속·삭제 기록이다. 사용 흐름과 시점 확인이 필요하다.", "reason": "출처 성격과 소유 판단 방향을 표면 설명에서 지나치게 앞당긴다."}
{"caseId": "friend-09", "evidenceId": "e-6", "field": "surfaceName", "before": "운영자 소명 DM과 삭제·책임전가 대화", "after": "해명 대화와 후속 대화 기록", "reason": "직함(운영자)과 평가어(책임전가)를 동시에 드러내 핵심 진실을 표면 이름에서 노출한다."}
{"caseId": "friend-09", "evidenceId": "e-6", "field": "surfaceDescription", "before": "운영자에게 보낸 소명 DM과 상호 삭제·책임전가 대화다. 대화 흐름과 시점 확인이 필요하다.", "after": "문제 이후 오간 해명과 후속 대화 기록이다. 대화 흐름과 시점 확인이 필요하다.", "reason": "직함 노출과 함께 '책임전가'라는 결론형 표현이 들어가 있어 안전하지 않다."}
{"caseId": "friend-10", "evidenceId": "e-1", "field": "surfaceDescription", "before": "특정 주간 일정 비움을 언급한 메시지 캡처다. 발신 맥락과 확정 여부 확인이 필요하다.", "after": "그 주 일정과 관련된 메시지 캡처다. 발신 맥락과 확정 여부 확인이 필요하다.", "reason": "금지된 '특정 X' 패턴이 그대로 들어가 있다."}
{"caseId": "friend-10", "evidenceId": "e-3", "field": "surfaceName", "before": "반주자 DM과 가예약 메모", "after": "대화 기록과 가예약 메모", "reason": "직함(반주자)이 표면 이름에 들어가 있어 금지 기준에 걸린다."}
{"caseId": "friend-10", "evidenceId": "e-3", "field": "surfaceDescription", "before": "반주자와의 DM 대화와 가예약 메모다. 예약 확정 여부와 합의 확인이 필요하다.", "after": "관련 대화 기록과 가예약 메모다. 예약 단계와 합의 여부 확인이 필요하다.", "reason": "직함을 직접 노출해 플레이어가 관계 구도를 너무 빨리 특정하게 만든다."}
{"caseId": "friend-11", "evidenceId": "e-2", "field": "surfaceName", "before": "본인확인 합의 메시지와 결제 메모", "after": "과거 합의 대화와 결제 메모", "reason": "핵심 쟁점인 본인확인 정보 사용을 표면 이름에서 바로 드러낸다."}
{"caseId": "friend-11", "evidenceId": "e-2", "field": "surfaceDescription", "before": "과거 일회성 본인확인 합의 메시지와 결제 관련 메모다. 합의 범위와 조건 확인이 필요하다.", "after": "이전 합의 대화와 관련 메모다. 합의 범위와 조건 확인이 필요하다.", "reason": "핵심 행위 축을 표면 설명에서 먼저 알려 출발점 진실을 너무 빨리 노출한다."}
{"caseId": "friend-11", "evidenceId": "e-3", "field": "surfaceName", "before": "구독 서비스 보안 로그와 관리자 변경 기록", "after": "보안 로그와 설정 변경 기록", "reason": "서비스 맥락과 핵심 행위(관리자 변경)를 표면 이름에서 직접 드러낸다."}
{"caseId": "friend-11", "evidenceId": "e-3", "field": "surfaceDescription", "before": "구독 서비스의 보안 접속 로그와 관리자 메일 변경 기록이다. 접속 주체와 변경 시점 확인이 필요하다.", "after": "보안 접속 기록과 설정 변경 내역이다. 변경 시점과 주체 확인이 필요하다.", "reason": "핵심 진실인 관리자 구조 변경을 표면 설명에서 거의 정답처럼 알려 준다."}
{"caseId": "friend-11", "evidenceId": "e-4", "field": "surfaceName", "before": "청구서 캡처와 개인정보 메모", "after": "청구서 캡처와 관련 메모", "reason": "'개인정보'는 핵심 위반 성격을 표면 이름에서 바로 노출한다."}
{"caseId": "friend-11", "evidenceId": "e-4", "field": "surfaceDescription", "before": "휴대폰 갤러리의 청구서 캡처와 개인정보 메모다. 보관 경위와 용도 확인이 필요하다.", "after": "휴대폰에 남아 있던 청구서 캡처와 관련 메모다. 보관 경위와 사용 흐름 확인이 필요하다.", "reason": "핵심 진실인 정보 보관·재사용 축을 너무 직접적으로 암시한다."}
{"caseId": "friend-11", "evidenceId": "e-5", "field": "surfaceName", "before": "계정 복구 신청서와 접근권 회수 로그", "after": "복구 신청서와 조치 기록", "reason": "표면 이름이 후속 조치 결론을 너무 선명하게 제시한다."}
{"caseId": "friend-11", "evidenceId": "e-5", "field": "surfaceDescription", "before": "계정 복구 신청서와 접근권 회수 기록이다. 신청 시점과 처리 결과 확인이 필요하다.", "after": "복구 신청 문서와 후속 조치 기록이다. 신청 시점과 처리 흐름 확인이 필요하다.", "reason": "접근권 회수라는 결론형 표현이 표면 설명에서 먼저 나온다."}
{"caseId": "friend-11", "evidenceId": "e-6", "field": "surfaceName", "before": "아이템 이전·환불 내역과 복원 보고서", "after": "처리 내역과 복원 보고서", "reason": "이전·환불이라는 결과를 표면 이름에서 노출해 '도난이 아닐 수 있다'는 핵심 진실을 너무 빨리 흘린다."}
{"caseId": "friend-11", "evidenceId": "e-6", "field": "surfaceDescription", "before": "디지털 아이템 이전·환불 내역과 프로필 복원 보고서다. 처리 경위와 결과 확인이 필요하다.", "after": "디지털 항목 처리 내역과 프로필 복원 보고서다. 처리 경위와 결과 확인이 필요하다.", "reason": "핵심 정답에 가까운 결과 표현을 표면 설명에서 먼저 준다."}
{"caseId": "friend-12", "evidenceId": "e-1", "field": "surfaceName", "before": "스트리밍 카드·포스터·릴 썸네일 캡처", "after": "공개 화면 캡처 묶음", "reason": "서비스·플랫폼 맥락이 표면 이름에 그대로 드러난다."}
{"caseId": "friend-12", "evidenceId": "e-1", "field": "surfaceDescription", "before": "스트리밍 카드, 포스터, 릴 썸네일 캡처 모음이다. 게시 시점과 크레딧 표기 확인이 필요하다.", "after": "여러 공개 화면을 모은 캡처다. 게시 시점과 표기 방식 확인이 필요하다.", "reason": "플랫폼 노출 구조를 표면 설명에서 먼저 특정해 해석 방향을 과하게 잡아 준다."}
{"caseId": "friend-12", "evidenceId": "e-2", "field": "surfaceName", "before": "공유 노션 기획안과 크레딧 메모", "after": "공유 기획안과 크레딧 메모", "reason": "서비스명(노션)이 표면 이름에 들어가 있다."}
{"caseId": "friend-12", "evidenceId": "e-2", "field": "surfaceDescription", "before": "공유 노션의 기획안 문서와 크레딧 관련 메모다. 합의 내용과 수정 이력 확인이 필요하다.", "after": "공유 기획 문서와 크레딧 관련 메모다. 합의 내용과 수정 이력 확인이 필요하다.", "reason": "서비스명을 직접 드러내는 표면 설명이다."}
{"caseId": "friend-12", "evidenceId": "e-5", "field": "surfaceName", "before": "쇼케이스 제출 폼과 음원유통 메타데이터", "after": "제출 문서와 등록 정보 내보내기", "reason": "기관·서비스 맥락이 표면 이름에서 먼저 드러난다."}
{"caseId": "friend-12", "evidenceId": "e-5", "field": "surfaceDescription", "before": "쇼케이스 제출 양식과 음원 유통 메타데이터 내보내기다. 등록 정보와 크레딧 확인이 필요하다.", "after": "제출 양식과 등록 정보 내보내기 자료다. 등록 시점과 표기 내용 확인이 필요하다.", "reason": "기관·서비스 맥락을 표면 설명에서 직접 노출한다."}
{"caseId": "neighbor-02", "evidenceId": "e-2", "field": "surfaceName", "before": "오배송 처리대장과 CCTV 원본 영상", "after": "처리대장과 원본 영상", "reason": "'오배송'이 표면 이름에서 바로 드러나 절도 오해의 반대 결론을 너무 빨리 흘린다."}
{"caseId": "neighbor-02", "evidenceId": "e-2", "field": "surfaceDescription", "before": "경비실 오배송 처리대장과 CCTV 원본 영상이다. 처리 경위와 영상 시간대 확인이 필요하다.", "after": "관련 처리대장과 원본 영상이다. 처리 경위와 전후 흐름 확인이 필요하다.", "reason": "핵심 진실 방향을 표면 설명에서 먼저 제시한다."}
{"caseId": "neighbor-02", "evidenceId": "e-4", "field": "surfaceName", "before": "악취 민원 원문과 수거 사고보고", "after": "민원 문서와 보고서", "reason": "민원 성격과 보고서 성격을 구체적으로 드러내 사건 해석을 너무 빨리 좁힌다."}
{"caseId": "neighbor-02", "evidenceId": "e-4", "field": "surfaceDescription", "before": "관리사무소 악취 민원 원문과 음식물 수거 사고 보고서다. 접수 시점과 경위 확인이 필요하다.", "after": "민원 원문과 관련 보고서다. 접수 시점과 발생 경위 확인이 필요하다.", "reason": "기관명(관리사무소)과 사건 성격이 표면 설명에 그대로 드러난다."}
{"caseId": "neighbor-03", "evidenceId": "e-2", "field": "surfaceDescription", "before": "세척실 출입 로그와 직원용 PIN 발급 기록이다. 출입 주체와 발급 경위 확인이 필요하다.", "after": "세척실 출입 기록과 코드 발급 기록이다. 출입 경로와 발급 경위 확인이 필요하다.", "reason": "핵심 쟁점인 '직원용 PIN'을 표면 설명에서 바로 노출한다."}
{"caseId": "neighbor-03", "evidenceId": "e-4", "field": "surfaceName", "before": "동물병원 상처도면과 진료소견", "after": "상처도면과 진료소견", "reason": "기관 유형(동물병원)이 표면 이름에 직접 들어가 있다."}
{"caseId": "neighbor-03", "evidenceId": "e-4", "field": "surfaceDescription", "before": "동물병원에서 발급된 상처 도면과 진료 소견서다. 진료 시점과 소견 내용 확인이 필요하다.", "after": "상처 위치 도면과 진료 소견서다. 진료 시점과 손상 유형 확인이 필요하다.", "reason": "기관 유형을 표면 설명에 직접 노출한다."}
{"caseId": "neighbor-03", "evidenceId": "e-5", "field": "surfaceName", "before": "CCTV 원본 추출본과 해시 비교보고", "after": "원본 영상과 비교 보고서", "reason": "해시 비교보고라는 포렌식 결론형 표현이 위조 쟁점을 표면 이름에서 먼저 알려 준다."}
{"caseId": "neighbor-03", "evidenceId": "e-5", "field": "surfaceDescription", "before": "CCTV 원본 영상 추출본과 해시·타임코드 비교 보고서다. 무결성 검증 결과 확인이 필요하다.", "after": "원본 영상 추출본과 비교 보고서다. 파일 차이와 무결성 확인이 필요하다.", "reason": "포렌식 비교 항목을 표면 설명에서 과하게 구체화해 authenticity 정답을 너무 빨리 암시한다."}
{"caseId": "neighbor-03", "evidenceId": "e-6", "field": "surfaceName", "before": "예약 부재 캡처와 단체방 전달본", "after": "시설 화면 캡처와 단체방 전달본", "reason": "'예약 부재'는 쌍방 위반의 한 축을 표면 이름에서 바로 드러낸다."}
{"caseId": "neighbor-03", "evidenceId": "e-6", "field": "surfaceDescription", "before": "시설 예약 부재 화면 캡처와 사고 직후 단체방 전달본이다. 전달 시점과 맥락 확인이 필요하다.", "after": "시설 화면 캡처와 사고 직후 전달본이다. 전달 시점과 전후 맥락 확인이 필요하다.", "reason": "핵심 사실인 예약 공백을 표면 설명에서 먼저 알려 준다."}

## DossierCard 위반
{"caseId": "friend-08", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "시상 직후 공개 방식이 왜 한쪽 성과처럼 읽혔는지부터 설명해 주시겠습니까?"}
{"caseId": "friend-08", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "공식 제출과 바깥에서 받은 인상을 왜 같은 결론으로 묶어 보게 됐는지부터 말씀해 주시겠습니까?"}
{"caseId": "friend-08", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "상대 기여를 거의 없었다고 보게 된 이유부터 차근차근 말씀해 주시겠습니까?"}
{"caseId": "friend-08", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "마감 직전 빠진 부분이 있었는지부터 먼저 분명히 해 주시겠습니까?"}
{"caseId": "friend-08", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "문제가 된 표현을 나중에 고친 흐름을 보면, 처음 선택을 어떻게 설명하시겠습니까?"}
{"caseId": "friend-08", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "바깥 평가가 정말 한 사람 성과처럼 읽혔다고 본 근거부터 말씀해 주시겠습니까?"}
{"caseId": "friend-08", "cardId": "dossier-1", "questionId": "dossier-1.a.q2", "issue": "영문 UI 용어(form)가 그대로 들어가 플레이 질문 문장으로 어색하다.", "fix": "제출 양식엔 팀원 칸이 살아 있는데, 공개 게시물에선 그 맥락을 왜 지웠습니까?"}
{"caseId": "friend-09", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "게시 직전 이미지를 직접 만진 사람이 누구인지부터 분명히 해 주시겠습니까?"}
{"caseId": "friend-09", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "게시만 했다는 설명과 사전 대화 참여가 어떻게 함께 성립하는지부터 설명해 주시겠습니까?"}
{"caseId": "friend-09", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "예전 갈등이 이번 판단과 완전히 무관했다고 보시는지부터 답해 주시겠습니까?"}
{"caseId": "friend-09", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "문제 계정이 누구 손에서 만들어지고 움직였는지부터 분명히 해 주시겠습니까?"}
{"caseId": "friend-09", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "이미지를 만든 뒤 바깥으로 다시 보낸 흐름까지 본인 손이 이어졌는지부터 설명해 주시겠습니까?"}
{"caseId": "friend-09", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "문제가 불거진 뒤 왜 바로 수습 문구부터 맞추게 됐는지부터 말씀해 주시겠습니까?"}
{"caseId": "friend-10", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "잘린 대화를 보고 두 역할을 한꺼번에 확정으로 읽은 이유부터 설명해 주시겠습니까?"}
{"caseId": "friend-10", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "들러리 쪽 준비가 꽤 진행됐는데도 왜 끝까지 미확정이라고 보시는지부터 말씀해 주시겠습니까?"}
{"caseId": "friend-10", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "아직 정리가 덜 된 단계였는데도 왜 주변에는 이미 확정처럼 알리게 됐는지부터 설명해 주시겠습니까?"}
{"caseId": "friend-10", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "노래 쪽 가능성을 열어 두는 신호를 계속 준 건 아닌지부터 답해 주시겠습니까?"}
{"caseId": "friend-10", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "예전 규칙을 알고도 이번에는 왜 먼저 이름을 쓰게 됐는지부터 말씀해 주시겠습니까?"}
{"caseId": "friend-10", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "같은 규칙을 기억하고도 왜 바로 선을 긋지 못했는지부터 설명해 주시겠습니까?"}
{"caseId": "friend-10", "cardId": "dossier-3", "questionId": "dossier-3.a.q2", "issue": "내부 증거 ID(e-6)가 질문 본문에 그대로 노출돼 플레이 문장으로 부자연스럽다.", "fix": "들러리 준비는 진행됐어도 축가는 따로 남아 있었는데, 두 역할을 다시 가르지 않은 이유가 무엇입니까?"}
{"caseId": "friend-11", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "예전에 한 번만 쓰기로 했던 자료를 왜 계속 들고 있게 됐는지부터 설명해 주시겠습니까?"}
{"caseId": "friend-11", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "그 약속이 중요했다면 왜 같은 방에서 먼저 말을 붙이지 못했는지부터 말씀해 주시겠습니까?"}
{"caseId": "friend-11", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "본인 쪽 기기에서 설정이 바뀐 흐름에 대해 먼저 어떻게 설명하시겠습니까?"}
{"caseId": "friend-11", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "출발점을 알고도 처음 설명에서 그 부분을 왜 앞세우지 않았는지부터 말씀해 주시겠습니까?"}
{"caseId": "friend-11", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "손실을 본 뒤 곧바로 상대가 가져갔다고 확신한 이유부터 설명해 주시겠습니까?"}
{"caseId": "friend-11", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "복구 조치 뒤 바로 설명하지 않고 정리부터 한 이유가 무엇인지부터 말씀해 주시겠습니까?"}
{"caseId": "friend-12", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "공개 직후 표현이 왜 한쪽 작품처럼 읽히게 됐는지부터 설명해 주시겠습니까?"}
{"caseId": "friend-12", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "한쪽 이름만 먼저 보이는 화면을 굳이 골라 쓴 이유부터 말씀해 주시겠습니까?"}
{"caseId": "friend-12", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "작업 로그가 섞여 있는데도 왜 단독작처럼 말하게 됐는지부터 설명해 주시겠습니까?"}
{"caseId": "friend-12", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "상대 기여를 단순 보조처럼 본 이유부터 먼저 말씀해 주시겠습니까?"}
{"caseId": "friend-12", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "항의가 오간 뒤에도 왜 단독형 표현을 바로 걷지 못했는지부터 설명해 주시겠습니까?"}
{"caseId": "friend-12", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "공동 표기를 알고도 왜 본인 쪽에 유리한 화면만 골라 쓰게 됐는지부터 말씀해 주시겠습니까?"}
{"caseId": "neighbor-02", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "그 장면을 왜 주변에 먼저 보여 주게 됐는지부터 설명해 주시겠습니까?"}
{"caseId": "neighbor-02", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "그 캡처가 돌았을 때 본인에게 어떤 오해가 붙었는지부터 말씀해 주시겠습니까?"}
{"caseId": "neighbor-02", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "상대가 같은 말을 여러 곳에 퍼뜨렸다는 걸 언제 어떻게 알게 됐는지부터 설명해 주시겠습니까?"}
{"caseId": "neighbor-02", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "확인되지 않은 말을 왜 여러 대화방에 반복하게 됐는지부터 말씀해 주시겠습니까?"}
{"caseId": "neighbor-02", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "전단과 첫 소문 배후를 왜 곧바로 상대로 단정했는지부터 설명해 주시겠습니까?"}
{"caseId": "neighbor-02", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "전단 문구가 어디서 시작됐는지 다른 가능성은 왜 먼저 살피지 않았는지부터 말씀해 주시겠습니까?"}
{"caseId": "neighbor-03", "cardId": "dossier-1", "questionId": "dossier-1.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "본인 계정이 아닌 다른 경로로 문을 연 이유부터 설명해 주시겠습니까?"}
{"caseId": "neighbor-03", "cardId": "dossier-1", "questionId": "dossier-1.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "안에 다른 사람이 있다는 걸 알았는데도 왜 문을 더 열었는지부터 말씀해 주시겠습니까?"}
{"caseId": "neighbor-03", "cardId": "dossier-2", "questionId": "dossier-2.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "예전 합의를 알고도 왜 먼저 그 선을 넘게 됐는지부터 설명해 주시겠습니까?"}
{"caseId": "neighbor-03", "cardId": "dossier-2", "questionId": "dossier-2.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "그 장면을 직접 본 것과 그렇게 느낀 것을 왜 바로 구분하지 못했는지부터 말씀해 주시겠습니까?"}
{"caseId": "neighbor-03", "cardId": "dossier-3", "questionId": "dossier-3.a.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "돌아다닌 짧은 영상과 실제 원본이 왜 달랐는지부터 설명해 주시겠습니까?"}
{"caseId": "neighbor-03", "cardId": "dossier-3", "questionId": "dossier-3.b.q1", "issue": "q1인데 증거 세부나 확정 정보를 너무 많이 드러내 힌트 단계 규칙을 넘겼다.", "fix": "원본을 보기 전에 왜 먼저 단체방에서 이름을 내게 됐는지부터 말씀해 주시겠습니까?"}