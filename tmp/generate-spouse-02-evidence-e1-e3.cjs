const fs = require('fs')
const path = require('path')

const OUT = path.join(__dirname, 'spouse-02-evidence-e1-e3.json')

function entry(key, variants) {
  return {
    key,
    variants: variants.map((text, index) => ({
      id: `${key}#${index + 1}`,
      text,
      behaviorHint: '증거의 공개 범위와 책임 경계를 조심스럽게 드러낸다.',
    })),
  }
}

function buildVariants(meta) {
  const {
    title,
    coreEarly,
    coreMid,
    coreLate,
    timing,
    source,
    caution,
    contextEarly,
    contextMid,
    contextLate,
    focusEarly,
    focusMid,
    focusLate,
    roleLead,
  } = meta

  return {
    early: [
      `우선 ${title}입니다. ${coreEarly}`,
      `${title}부터 확인해 주십시오. ${timing}`,
      `${source} ${caution}`,
      `${roleLead} ${contextEarly}`,
      `지금 확인되는 건 ${title}입니다. ${focusEarly}입니다.`,
    ],
    mid: [
      `${title}입니다. ${coreMid}`,
      `${timing} ${source}`,
      `${caution} ${contextMid}`,
      `지금은 ${focusMid}까지 함께 봐야 합니다.`,
      `이 자료는 ${focusMid}까지 함께 봐야 합니다.`,
    ],
    late: [
      `${title}입니다. ${coreLate}`,
      `${source} ${timing}`,
      `${contextLate} ${caution}`,
      `이 자료가 말하는 건 ${focusLate}입니다. ${contextLate}`,
      `더 이상 돌릴 수 없는 사실은 ${focusLate}입니다.`,
    ],
  }
}

const data = [
  {
    evidenceId: 'e-1',
    party: 'a',
    subjectRole: 'self',
    title: '공유 프린터에 남은 학교 메일 초안',
    coreEarly: '밤 11시 52분에 출력됐지만 보낸 편지함에는 같은 메일이 없습니다.',
    coreMid: '출력만 남고 발송은 되지 않은 초안입니다.',
    coreLate: '밤 11시 52분에 출력된 연락망 제외 초안이 남아 있습니다.',
    timing: '출력 시각은 밤 11시 52분입니다.',
    source: '가정용 프린터 스풀 로그와 용지 일련번호가 일치합니다.',
    caution: '출력과 발송은 같은 단계가 아닙니다.',
    contextEarly: '익명 글을 보고 급히 적은 흔적이 있습니다.',
    contextMid: '발송 전 초안과 실제 전달 여부를 분리해 봐야 합니다.',
    contextLate: '출력됐다고 해서 곧바로 보낸 것으로 볼 수는 없습니다.',
    focusEarly: '발송하지 않은 초안',
    focusMid: '발송 전 초안과 실제 전달 여부의 분리',
    focusLate: '발송하지 않은 초안과 실제 전달 여부',
    roleLead: '제가',
  },
  {
    evidenceId: 'e-1',
    party: 'b',
    subjectRole: 'other',
    title: '공유 프린터에 남은 학교 메일 초안',
    coreEarly: '상대방이 남긴 출력물은 밤 11시 52분에 찍혔지만 보낸 편지함에는 같은 메일이 없습니다.',
    coreMid: '출력만 남고 발송은 되지 않은 초안입니다.',
    coreLate: '상대방이 출력한 연락망 제외 초안이 남아 있습니다.',
    timing: '출력 시각은 밤 11시 52분입니다.',
    source: '가정용 프린터 스풀 로그와 용지 일련번호가 일치합니다.',
    caution: '출력과 발송은 같은 단계가 아닙니다.',
    contextEarly: '익명 글을 보고 급히 적은 흔적이 보입니다.',
    contextMid: '발송 전 초안과 실제 전달 여부를 분리해 봐야 합니다.',
    contextLate: '출력됐다고 해서 곧바로 보낸 것으로 볼 수는 없습니다.',
    focusEarly: '상대방이 남긴 발송하지 않은 초안',
    focusMid: '상대방의 초안 작성과 발송 여부',
    focusLate: '상대방이 남긴 발송하지 않은 초안과 실제 전달 여부',
    roleLead: '상대방이',
  },
  {
    evidenceId: 'e-2',
    party: 'a',
    subjectRole: 'both',
    title: '초안 메일 버전기록과 계정 접근 로그',
    coreEarly: '초안은 저장만 됐고 발송되지 않았습니다.',
    coreMid: '버전 기록과 로그인 로그가 함께 남아 있습니다.',
    coreLate: '초안은 저장만 됐고 발송되지 않았습니다.',
    timing: '익명 글 유포 37분 후에 접속이 찍혀 있습니다.',
    source: '메일 플랫폼 보안 로그로 확인됩니다.',
    caution: '저장, 접속, 발송 여부는 각각 따로 봐야 합니다.',
    contextEarly: '저장과 발송을 같은 말로 묶을 수는 없습니다.',
    contextMid: '삭제 시도 흔적까지 남아 있어 선후 관계가 더 분명합니다.',
    contextLate: '접속 시점과 저장 이력을 함께 보면 흐름이 또렷해집니다.',
    focusEarly: '초안 저장과 접속 시점',
    focusMid: '접속 기록과 저장 이력의 선후',
    focusLate: '접속 기록과 저장 이력의 선후',
    roleLead: '두 사람의',
  },
  {
    evidenceId: 'e-2',
    party: 'b',
    subjectRole: 'both',
    title: '초안 메일 버전기록과 계정 접근 로그',
    coreEarly: '초안은 저장만 됐고 발송되지 않았습니다.',
    coreMid: '버전 기록과 로그인 로그가 함께 남아 있습니다.',
    coreLate: '초안은 저장만 됐고 발송되지 않았습니다.',
    timing: '익명 글 유포 37분 후에 접속이 찍혀 있습니다.',
    source: '메일 플랫폼 보안 로그로 확인됩니다.',
    caution: '저장, 접속, 발송 여부는 각각 따로 봐야 합니다.',
    contextEarly: '저장과 발송을 같은 말로 묶을 수는 없습니다.',
    contextMid: '삭제 시도 흔적까지 남아 있어 선후 관계가 더 분명합니다.',
    contextLate: '접속 시점과 저장 이력을 함께 보면 흐름이 또렷해집니다.',
    focusEarly: '초안 저장과 접속 시점',
    focusMid: '접속 기록과 저장 이력의 선후',
    focusLate: '접속 기록과 저장 이력의 선후',
    roleLead: '두 사람의',
  },
  {
    evidenceId: 'e-3',
    party: 'a',
    subjectRole: 'other',
    title: '입학 예정 학부모방 익명 글 캡처',
    coreEarly: '이미지 해시가 상대방의 보조 이메일과 가정용 복합기 스캔 경로를 가리킵니다.',
    coreMid: '외부 글처럼 보이지만 출처 경로는 상대방 쪽에 닿아 있습니다.',
    coreLate: '이미지 해시가 상대방의 보조 이메일과 복합기 스캔 경로를 가리킵니다.',
    timing: '오리엔테이션 명단 공지 직후에 올라간 글입니다.',
    source: '채팅방 관리자 확인과 캡처 메타데이터가 함께 남아 있습니다.',
    caution: '크롭과 블러 때문에 원문 전문은 가려져 있습니다.',
    contextEarly: '겉으로는 외부 글처럼 보여도 내부 경로가 남아 있습니다.',
    contextMid: '작성자 특정은 어렵지만 출처 축은 단순 외부인으로 보기 어렵습니다.',
    contextLate: '가려진 화면 뒤에 상대방 쪽 연결 흔적이 남아 있습니다.',
    focusEarly: '상대방 쪽으로 이어지는 출처 경로',
    focusMid: '가려진 원문과 상대방 쪽 연결 흔적',
    focusLate: '상대방 쪽 연결 흔적과 가려진 원문',
    roleLead: '상대방 쪽',
  },
  {
    evidenceId: 'e-3',
    party: 'b',
    subjectRole: 'self',
    title: '입학 예정 학부모방 익명 글 캡처',
    coreEarly: '이미지 해시가 제 보조 이메일과 가정용 복합기 스캔 경로를 가리킵니다.',
    coreMid: '외부 글처럼 보이지만 출처 경로는 제 쪽에 닿아 있습니다.',
    coreLate: '이미지 해시가 제 보조 이메일과 복합기 스캔 경로를 가리킵니다.',
    timing: '오리엔테이션 명단 공지 직후에 올라간 글입니다.',
    source: '채팅방 관리자 확인과 캡처 메타데이터가 함께 남아 있습니다.',
    caution: '크롭과 블러 때문에 원문 전문은 가려져 있습니다.',
    contextEarly: '겉으로는 외부 글처럼 보여도 내부 경로가 남아 있습니다.',
    contextMid: '작성자 특정은 어렵지만 출처 축은 제 쪽으로 이어집니다.',
    contextLate: '가려진 화면 뒤에 제 쪽 연결 흔적이 남아 있습니다.',
    focusEarly: '제 쪽으로 이어지는 출처 경로',
    focusMid: '가려진 원문과 제 쪽 연결 흔적',
    focusLate: '제 쪽 연결 흔적과 가려진 원문',
    roleLead: '제 쪽',
  },
]

const result = []
for (const item of data) {
  const variantsByBand = buildVariants(item)
  for (const band of ['early', 'mid', 'late']) {
    const key = `${item.party}|${item.evidenceId}|${band}|${item.subjectRole}`
    result.push(entry(key, variantsByBand[band]))
  }
}

fs.writeFileSync(OUT, `${JSON.stringify(result, null, 2)}\n`, 'utf8')
console.log(`wrote ${OUT}`)
