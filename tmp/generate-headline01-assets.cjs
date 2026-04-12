#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CASE_ID = 'headline-01'
const OUTPUT_MODE = process.env.HEADLINE01_OUTPUT_MODE || 'all'
const caseData = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'data', 'cases', 'generated', `${CASE_ID}.json`), 'utf8'))
const STATES = ['S0', 'S1', 'S2', 'S3', 'S4', 'S5']
const BANDS = ['early', 'mid', 'late']
const QTYPES = ['fact_pursuit', 'motive_search', 'empathy_approach']

const R = {
  'a|d-1': ['self', '문제 장면을 꾸며낸 일', '복구 대화를 덜어낸 편집', '위기감을 키운 편집', '원본 촬영본에도 문제 장면은 남아 있습니다', '공익과 조회수를 함께 계산했습니다', '공익이라는 말 뒤에 계산을 숨긴 점이 부끄럽습니다', '실제 장면까지 거짓으로 만든 것은 아닙니다'],
  'a|d-2': ['observe', '제가 본 장면이 가벼운 실수로 끝나지 않았다는 판단', '주방 CCTV와 체크 사진에 남은 위생 장면', '상대는 반복 지적을 축소하고 싶어 했습니다', '소비자 경고의 의미가 사라질까 두려웠습니다', '즉시 영업정지 사안까지 단정한 것은 아니었습니다'],
  'a|d-3': ['self', '직접 협박 문구로 이익을 뜯어내려 한 일', '협조와 재검증이라는 말로 압박한 방식', '영향력을 이용해 거래 구도를 만든 일', '사전 협조 DM과 회복 패키지 견적이 앞뒤로 이어집니다', '콘텐츠 운영과 상품 연결을 함께 계산했습니다', '협조라는 말로 포장했지만 상대 압박을 외면했습니다', '처음부터 노골적 협박 문구를 보낸 것은 아니었습니다'],
  'a|d-4': ['hurt', '차량 번호와 촬영 동선이 점주 측 대화방에서 돌기 시작했다는 점', '삭제 복구된 단체방 캡처와 커뮤니티 확산 흔적', '상대는 평점 하락 충격을 제 신상 노출로 되갚으려 했습니다', '촬영 후 이동 동선까지 공유되는 순간 실제 위협으로 느껴졌습니다', '저도 격한 표현은 돌아보겠지만 신상 유포를 정당화할 수는 없습니다'],
  'b|d-1': ['mixed', '실제 위생 문제 자체까지 전부 허위라고 말할 수는 없습니다', '원본 촬영본에는 복구 대화와 서비스 시도 구간이 더 남아 있습니다', '상대는 공익과 조회수를 함께 올리는 그림을 원했습니다', '가게가 무너지는 상황에서도 화면 톤을 더 세게 잡았다는 점이 괴로웠습니다'],
  'b|d-2': ['self', '즉시 영업정지급 사고를 숨긴 일', '시정 권고를 제때 끝내지 못하고 버틴 일', '반복 지적을 알면서도 운영 사정으로 미룬 일', '주방 CCTV와 시정 메일에 누적 실패가 남아 있습니다', '바쁜 시간대를 핑계로 정비를 늦췄습니다', '가게를 지켜야 한다는 조급함이 기준을 흐리게 만들었습니다', '치명적 사고까지 난 상태는 아니었습니다'],
  'b|d-3': ['hurt', '협조 요청과 회복 패키지 연결이 한 흐름으로 이어졌다는 점', '메뉴 협조 DM과 MCN 견적서가 같은 갈등선 위에 있습니다', '상대는 영상 영향력을 교섭 카드처럼 쓰고 싶어 했습니다', '거절하면 더 크게 맞을 수 있다는 압박이 실제로 있었습니다', '직접 협박 문구는 없었지만 그래서 더 교묘하게 느껴졌습니다'],
  'b|d-4': ['self', '처음부터 조직적으로 신상 유포를 설계한 일', '단체방에서 격한 말과 정보 공유를 제지하지 못한 일', '차량 번호와 동선 공유를 직접 올리거나 사실상 용인한 일', '점주 단체방 복구본에 차량 번호와 촬영 동선이 남아 있습니다', '평점 하락과 예약 취소 충격에 보복 심리가 섞였습니다', '생계가 무너지는 공포를 핑계로 선을 넘었습니다', '반박과 대응이라는 말로 스스로를 합리화했습니다'],
}

const E = {
  'e-1': ['원본 촬영본과 업로드본', '문제 장면은 실제지만 복구 시도와 전후 맥락이 빠져 있습니다', '컷 순서가 위기감을 더 크게 만듭니다', 'a'],
  'e-2': ['주방 CCTV와 체크 사진', '냉장 보관 이탈과 조리 도구 교차 사용 장면이 남아 있습니다', '촬영 당일 관리 실패를 부인하기 어렵게 만듭니다', 'b'],
  'e-3': ['위생 시정 메일과 재점검 기록', '반복 지적이 누적된 상태였음이 기록으로 드러납니다', '즉시 영업정지 판단은 아니어도 누적 실패는 분명합니다', 'b'],
  'e-4': ['사전 협조 DM과 회복 패키지 견적', '촬영 전 협조 요청과 공개 뒤 상품 제안이 앞뒤로 이어집니다', '영향력을 거래 카드처럼 쓴 흔적이 남습니다', 'a'],
  'e-5': ['점주 단체방 캡처', '차량 번호와 촬영 동선 공유, 신고 독려 문구가 그대로 남아 있습니다', '삭제 뒤 복구본이라 확산 의도를 의심하게 합니다', 'b'],
  'e-6': ['평점 하락 타임라인과 플랫폼 로그', '영상 공개와 반격 게시가 시간차를 두고 확산을 키운 흐름이 보입니다', '한쪽만 떼어 보면 전체 파장이 왜곡됩니다', 'both'],
}

function end(s) { s = String(s || '').trim(); return s ? /[.!?]$/.test(s) ? s : `${s}.` : '' }
function join(...arr) { return arr.filter(Boolean).map(end).join(' ') }
function ensure(p) { fs.mkdirSync(path.dirname(p), { recursive: true }) }
function band(state) { return state === 'S0' || state === 'S1' ? 'early' : state === 'S2' || state === 'S3' ? 'mid' : 'late' }
function evRole(ev, party) { const s = ev.subjectParty || 'both'; if (s === party) return 'self'; if (s === 'both') return ev.provenance === 'institutional' ? 'institutional' : 'both'; return ev.provenance === 'institutional' ? 'institutional' : 'other' }

function qFocus(type, cfg) {
  return type === 'fact_pursuit' ? cfg[4] : type === 'motive_search' ? cfg[5] || cfg[3] : cfg[6] || cfg[5] || cfg[3]
}

function selfLines(cfg, state, type) {
  const main = {
    S0: `재판관님, ${cfg[1]}은 아닙니다`,
    S1: `표현과 대응이 거칠어 보일 수는 있지만 ${cfg[3]}까지 한 것은 아닙니다`,
    S2: `${cfg[2]}은 인정합니다`,
    S3: `${cfg[2]}은 제 책임이지만 맥락까지 지우면 안 됩니다`,
    S4: `${cfg[3]}은 제 잘못입니다`,
    S5: `${cfg[3]}은 변명하지 않겠습니다`,
  }[state]
  const focus = qFocus(type, cfg)
  const extra = state === 'S5' ? cfg[7] : `다만 ${cfg[7]}`
  return [main, focus, extra]
}

function hurtLines(cfg, state, type) {
  const main = {
    S0: `재판관님, ${cfg[1]}은 분명합니다`,
    S1: `${cfg[1]}이라는 판단은 지금도 달라지지 않습니다`,
    S2: `${cfg[2]} 때문에 그 주장을 가볍게 넘길 수 없습니다`,
    S3: `상대가 선을 넘었다는 인식은 감정이 아니라 누적된 사실에서 나왔습니다`,
    S4: `${cfg[5]} 같은 사정이 있어도 ${cfg[1]} 자체는 바뀌지 않습니다`,
    S5: `${cfg[5]}까지 감안해도 ${cfg[1]}은 그대로입니다`,
  }[state]
  const focus = type === 'fact_pursuit' ? cfg[2] : type === 'motive_search' ? cfg[3] : cfg[4]
  const extra = state === 'S5' ? '저도 과장으로 읽힐 표현은 돌아보겠습니다' : `다만 ${cfg[5]}`
  return [main, focus, extra]
}

function mixedLines(cfg, state, type) {
  const main = {
    S0: `재판관님, ${cfg[1]}`,
    S1: `${cfg[1]} 그래도 편집 과장은 남습니다`,
    S2: `${cfg[2]}을 보면 상대 편집의 방향은 분명합니다`,
    S3: `실제 문제를 덮자는 뜻이 아니라 과장을 따져 달라는 뜻입니다`,
    S4: `${cfg[1]} 그래도 상대가 화면 톤을 키운 책임은 따로 봐야 합니다`,
    S5: `저희 쪽 잘못을 줄이려는 말은 아닙니다. 그래도 편집 과장은 사실입니다`,
  }[state]
  const focus = type === 'fact_pursuit' ? cfg[2] : type === 'motive_search' ? cfg[3] : cfg[4]
  return [main, focus, `다만 ${cfg[1]}`]
}

function observeLines(cfg, state, type) {
  const main = {
    S0: `재판관님, ${cfg[1]}은 제가 현장에서 그렇게 봤기 때문입니다`,
    S1: `제가 본 장면과 뒤 기록을 붙여 보면 ${cfg[1]}이 완전히 과한 판단은 아닙니다`,
    S2: `${cfg[5]}이라는 점은 압니다`,
    S3: `직접 본 장면만으로 끝나지 않고 ${cfg[2]}까지 이어졌습니다`,
    S4: `영상 연출과 공익 경고의 경계가 흐려진 부분은 돌아봅니다`,
    S5: `제가 공익 경고와 연출을 완전히 분리하지 못한 점은 인정합니다`,
  }[state]
  const focus = type === 'fact_pursuit' ? cfg[2] : type === 'motive_search' ? cfg[3] : cfg[4]
  return [main, focus, `다만 ${cfg[5]}`]
}

function ivariants(party, disputeId, state, type) {
  const cfg = R[`${party}|${disputeId}`]
  const kind = cfg[0]
  const lines = kind === 'self' ? selfLines(cfg, state, type) : kind === 'hurt' ? hurtLines(cfg, state, type) : kind === 'mixed' ? mixedLines(cfg, state, type) : observeLines(cfg, state, type)
  const texts = [join(lines[0], lines[1]), join(lines[1], lines[0]), join(lines[0], lines[2]), join(lines[1], lines[2]), join(lines[2], lines[0])]
  const hints = ['답을 짧게 다듬어 선을 긋습니다', '첫 문장을 눌러 말하며 재판관 시선을 붙잡습니다', '불리한 지점을 줄이려다 마지막 문장에서 흔들립니다', '맥락과 책임을 분리해 말하려 합니다', '후반 문장에서 감정이 미세하게 새어 나옵니다']
  return texts.map((text, i) => ({ id: `${party}|${disputeId}|${state}|${type}#${i + 1}`, text, behaviorHint: `${hints[i]}.` }))
}

function evariants(party, ev, b, role) {
  const cfg = E[ev.id]
  let a, c, d
  if (role === 'self') {
    a = b === 'early' ? `${cfg[0]}을 보셔도 제 의도를 단정할 수는 없습니다` : b === 'mid' ? `${cfg[0]}을 보면 제가 불리해지는 지점은 분명합니다` : `${cfg[0]} 앞에서는 더 돌려 말하지 않겠습니다`
    c = cfg[1]
    d = b === 'late' ? cfg[2] : `다만 ${cfg[2]}`
  } else if (role === 'both') {
    a = `${cfg[0]}은 한쪽만의 잘못으로 접히지 않습니다`
    c = cfg[1]
    d = cfg[2]
  } else {
    a = b === 'late' ? `${cfg[0]}은 상대가 끝까지 줄이려던 부분을 고정합니다` : `${cfg[0]}만 보셔도 ${cfg[1]}`
    c = b === 'early' ? cfg[2] : cfg[1]
    d = role === 'institutional' ? `${cfg[0]}이 공식 기록이라 더 무겁게 남습니다` : cfg[2]
  }
  const texts = [join(a, c), join(c, a), join(a, d), join(c, d), join(d, a)]
  return texts.map((text, i) => ({ id: `${party}|${ev.id}|${b}|${role}#${i + 1}`, text, behaviorHint: '자료의 출처와 맥락을 의식한 반응입니다.' }))
}

const DP = {
  'dossier-1.a': { early: ['업로드본 정리는 제가 했지만 문제 장면을 꾸며낸 것은 아닙니다', '복구 대화를 덜어낸 건 인정해도 공포를 조작했다는 말까지는 과합니다', '원본 촬영본과 업로드본이 같은 사건선 위에 있다는 점은 숨길 수 없습니다'], mid: ['편집 방향이 위기감을 키운 쪽으로 기운 건 인정합니다', '원본 촬영본을 알고도 더 센 장면 배열을 택한 계산이 있었습니다', '그래도 실제 위생 장면 자체를 허구로 만든 건 아닙니다'], late: ['저는 편집으로 공익 경고와 연출을 섞었습니다', '복구 구간을 덜어내면 반응이 커질 걸 알고도 그 선택을 했습니다', '그 점은 제 영향력을 스스로 거래한 방식과 닿아 있습니다'] },
  'dossier-1.b': { early: ['편집이 과장됐다고 해서 실제 문제까지 지워지는 것은 아닙니다', '평점 하락 직후 격한 대응이 나온 건 사실이지만 신상 유포까지 묶는 건 과합니다', '반격 시점 질문은 답하되 실제 위생 문제와는 분리해 봐주셔야 합니다'], mid: ['실제 문제와 편집 과장은 동시에 존재합니다', '반격 게시가 빨랐던 건 매장 충격이 컸기 때문이지만 그래서 더 위험했습니다', '반박과 신상 노출의 선이 흐려진 순간이 있었다는 점은 인정합니다'], late: ['실제 위생 실패를 핑계로 제 보복 행동까지 지울 수는 없습니다', '평점 하락 직후 제가 감정적으로 선을 넘으며 반격을 키웠습니다', '편집을 탓하더라도 그다음 행동의 책임은 제 몫입니다'] },
  'dossier-2.a': { early: ['당시 현장에서 본 장면이 가벼운 실수처럼 보이진 않았습니다', '재점검 기록까지 알기 전이라도 공적 경고가 필요하다고 봤습니다', '다만 누적 실패 전체를 처음부터 다 알고 있었던 것은 아닙니다'], mid: ['직접 본 장면과 누적 위생 실패를 한 덩어리로 말한 부분은 인정합니다', '소비자 경고의 필요성을 크게 본 나머지 표현 강도를 더 세게 가져갔습니다', '그래도 현장에서 본 문제를 가볍게 만들 생각은 없었습니다'], late: ['저는 공익 경고와 영상 연출의 경계를 분명히 지키지 못했습니다', '누적 기록을 뒤늦게 확인한 뒤에도 처음 톤을 스스로 낮추지 않았습니다', '그 점은 제 판단 책임으로 남습니다'] },
  'dossier-2.b': { early: ['즉시 영업정지 사안이 아니라는 말과 반복 실패가 없다는 말은 다릅니다', '저는 그 차이를 알면서도 운영 사정을 앞세워 버틴 적이 있습니다', '하지만 현장 전체를 곧바로 폐업감처럼 몰아간 표현도 과했습니다'], mid: ['반복된 시정 권고를 제때 끝내지 못한 책임은 부인하지 않겠습니다', '온도 관리와 교차오염 방지를 매출과 인력 사정 뒤로 미뤘던 계산이 있었습니다', '그럼에도 치명적 사고까지 난 상태는 아니었다는 점은 분리해 봐주셔야 합니다'], late: ['저는 기준을 알면서도 운영을 핑계로 위생 정비를 늦췄습니다', '반복 지적이 누적된 상태를 축소해 말한 것도 사실입니다', '결국 그 선택이 업주 책임이라는 점은 인정합니다'] },
  'dossier-3.a': { early: ['협조 요청과 회복 제안을 한 흐름으로 본 질문은 이해합니다', '다만 그걸 곧장 협박이나 직접 거래 강요로 단정하시는 건 과합니다', '저는 당시 그 선을 스스로 더 안전하다고 착각했습니다'], mid: ['협조와 재검증이라는 표현 뒤에 압박이 실렸다는 점은 인정합니다', '영향력을 가진 쪽이라는 걸 알면서도 거절하기 어려운 구조를 열어둔 건 사실입니다', '직접 협박 문구가 없었다는 말로 그 구조를 지울 수는 없습니다'], late: ['저는 협조와 회복이라는 말을 써서 거래 구조를 부드럽게 포장했습니다', '상대가 느낀 압박을 알고도 영향력을 계속 카드처럼 쥐고 있었습니다', '그 점은 제 책임으로 남겨야 합니다'] },
  'dossier-3.b': { early: ['단체방에 감정적인 말이 오간 건 사실입니다', '다만 그때는 매장이 무너지는 충격 속에서 대응선이 이미 흐려져 있었습니다', '처음부터 조직적으로 유포를 설계했다는 말까지는 아직 받아들이기 어렵습니다'], mid: ['차량 번호와 촬영 동선이 단체방에서 돈 순간 선을 넘었다는 건 압니다', '삭제 복구본이 나온 이상 우발적 감정 배설만으로 설명되기 어렵습니다', '그때 저는 반박과 보복을 분리하지 못했습니다'], late: ['생계가 무너지는 공포를 핑계로 신상 유포를 용인한 점은 인정합니다', '단체방에서 퍼진 정보가 실제 위협으로 이어질 수 있다는 것도 알았습니다', '그래도 그걸 멈추지 못한 책임은 제게 있습니다'] },
}

function dvariants(qid, b, party) {
  const p = qid.split('.').slice(0, 2).join('.')
  const arr = DP[p][b]
  const texts = [join(arr[0], arr[1]), join(arr[1], arr[2]), join(arr[2], arr[0])]
  return texts.map((text, i) => ({ id: `${party}|${qid}|${b}#${i + 1}`, text, behaviorHint: '카드 질문 의도를 의식하며 답을 고릅니다.' }))
}

const cards = [
  { id: 'dossier-1', name: '편집 구간 비교', description: '원본 촬영본과 업로드본의 차이를 묶어 편집 의도와 반격 시점을 함께 확인하는 카드입니다.', evidenceIds: ['e-1', 'e-6'], relatedDisputes: ['d-1', 'd-4'], subjectParty: 'both', challenges: [{ targetParty: 'a', questions: [{ id: 'dossier-1.a.q1', text: '최종 업로드본에서 복구 대화 구간을 직접 덜어낸 사람이 본인 맞습니까?', attackVector: 'identity', onSuccess: { blockVector: 'identity', revealAtom: 'headline01:a:d-1:S2:0', lieAdvance: true } }, { id: 'dossier-1.a.q2', text: '원본 촬영본보다 위기감이 세게 느껴지도록 컷 순서를 바꾼 이유를 설명해 주십시오.', attackVector: 'context', onSuccess: { blockVector: 'context', revealAtom: 'headline01:a:d-1:S3:0', lieAdvance: true } }, { id: 'dossier-1.a.q3', text: '문제 장면이 실제였더라도 편집으로 공포를 키운 점은 인정하십니까?', attackVector: 'authenticity', onSuccess: { blockVector: 'authenticity', revealAtom: 'headline01:a:d-1:S4:0', lieAdvance: true } }] }, { targetParty: 'b', questions: [{ id: 'dossier-1.b.q1', text: '편집이 과장됐더라도 실제 위생 문제가 있었다는 점까지 전부 부인하십니까?', attackVector: 'context', onSuccess: { blockVector: 'context', revealAtom: 'headline01:b:d-1:S2:0', lieAdvance: true } }, { id: 'dossier-1.b.q2', text: '평점 하락 직후 반격 게시를 먼저 꺼낸 사람이 누구인지 지금 말씀해 주십시오.', attackVector: 'identity', onSuccess: { blockVector: 'identity', revealAtom: 'headline01:b:d-4:S2:0', lieAdvance: true } }, { id: 'dossier-1.b.q3', text: '반박과 신상 유포의 선이 어디서 무너졌는지 아직도 구분된다고 보십니까?', attackVector: 'legality', onSuccess: { blockVector: 'legality', revealAtom: 'headline01:b:d-4:S3:0', lieAdvance: true } }] }] },
  { id: 'dossier-2', name: '위생 누적 기록', description: '주방 CCTV와 재점검 기록을 묶어 실제 위생 실패의 정도와 반복성을 따져보는 카드입니다.', evidenceIds: ['e-2', 'e-3'], relatedDisputes: ['d-2'], subjectParty: 'both', challenges: [{ targetParty: 'a', questions: [{ id: 'dossier-2.a.q1', text: '구청 재점검 기록까지 보기 전부터 즉각적인 공적 경고가 필요하다고 판단한 이유는 무엇입니까?', attackVector: 'context', onSuccess: { blockVector: 'context', revealAtom: 'headline01:a:d-2:S2:0', lieAdvance: true } }, { id: 'dossier-2.a.q2', text: '직접 본 장면과 누적 위생 실패를 같은 무게로 묶어 설명한 점은 인정하십니까?', attackVector: 'authenticity', onSuccess: { blockVector: 'authenticity', revealAtom: 'headline01:a:d-2:S3:0', lieAdvance: true } }, { id: 'dossier-2.a.q3', text: '소비자 경고와 영상 연출의 경계가 흐려진 순간이 있었다는 점은 부인하지 않으시겠지요?', attackVector: 'legality', onSuccess: { blockVector: 'legality', revealAtom: 'headline01:a:d-2:S4:0', lieAdvance: true } }] }, { targetParty: 'b', questions: [{ id: 'dossier-2.b.q1', text: '반복된 시정 권고를 받은 뒤에도 온도 관리와 교차오염 방지를 미룬 이유를 말씀해 주십시오.', attackVector: 'context', onSuccess: { blockVector: 'context', revealAtom: 'headline01:b:d-2:S2:0', lieAdvance: true } }, { id: 'dossier-2.b.q2', text: '즉시 영업정지 사안이 아니라는 점과 누적 실패가 없다는 말은 같은 뜻이 아닌데, 그 차이를 알고도 섞어 말한 것 아닙니까?', attackVector: 'authenticity', onSuccess: { blockVector: 'authenticity', revealAtom: 'headline01:b:d-2:S3:0', lieAdvance: true } }, { id: 'dossier-2.b.q3', text: '바쁜 시간대와 매출 압박을 핑계로 기준을 낮춘 점은 결국 업주 책임 아닙니까?', attackVector: 'legality', onSuccess: { blockVector: 'legality', revealAtom: 'headline01:b:d-2:S4:0', lieAdvance: true } }] }] },
  { id: 'dossier-3', name: '협조 제안과 단체방', description: '협조 DM, 회복 패키지 견적, 점주 단체방 캡처를 함께 놓고 거래 압박과 보복 확산을 분리해 보는 카드입니다.', evidenceIds: ['e-4', 'e-5'], relatedDisputes: ['d-3', 'd-4'], subjectParty: 'both', challenges: [{ targetParty: 'a', questions: [{ id: 'dossier-3.a.q1', text: '촬영 전 메뉴 협조 요청과 공개 뒤 회복 패키지 연결이 한 흐름으로 이어진 점은 인정하십니까?', attackVector: 'identity', onSuccess: { blockVector: 'identity', revealAtom: 'headline01:a:d-3:S2:0', lieAdvance: true } }, { id: 'dossier-3.a.q2', text: '직접 협박 문구가 없었다는 말로 영향력 거래 구조까지 지울 수 있다고 보십니까?', attackVector: 'context', onSuccess: { blockVector: 'context', revealAtom: 'headline01:a:d-3:S3:0', lieAdvance: true } }, { id: 'dossier-3.a.q3', text: '협조라는 표현 뒤에 상대가 거절하기 어려운 압박이 있었다는 점은 이제 인정하셔야 하지 않겠습니까?', attackVector: 'legality', onSuccess: { blockVector: 'legality', revealAtom: 'headline01:a:d-3:S4:0', lieAdvance: true } }] }, { targetParty: 'b', questions: [{ id: 'dossier-3.b.q1', text: '점주 단체방에서 차량 번호와 촬영 동선을 처음 꺼낸 사람이 누구인지 분명히 말씀해 주십시오.', attackVector: 'identity', onSuccess: { blockVector: 'identity', revealAtom: 'headline01:b:d-4:S2:1', lieAdvance: true } }, { id: 'dossier-3.b.q2', text: '삭제한 뒤 복구된 게시물까지 보면 단순 감정 배설이 아니라 확산 의도가 있었다는 점을 부인하십니까?', attackVector: 'context', onSuccess: { blockVector: 'context', revealAtom: 'headline01:b:d-4:S4:0', lieAdvance: true } }, { id: 'dossier-3.b.q3', text: '생계가 무너지는 두려움이 있었다고 해도 신상 유포가 정당화되진 않는다는 점은 인정하십니까?', attackVector: 'legality', onSuccess: { blockVector: 'legality', revealAtom: 'headline01:b:d-4:S5:0', lieAdvance: true } }] }] },
]

const atoms = { a: {}, b: {} }
for (const p of ['a', 'b']) for (const d of caseData.disputes) atoms[p][d.id] = {}
for (const c of cards) for (const ch of c.challenges) for (const q of ch.questions) {
  const party = ch.targetParty
  const disputeId = c.relatedDisputes.length > 1 ? c.relatedDisputes[Math.min(Number(q.id.slice(-1)) - 1, c.relatedDisputes.length - 1)] : c.relatedDisputes[0]
  const state = q.onSuccess.revealAtom.includes(':S5:') ? 'S5' : q.onSuccess.revealAtom.includes(':S4:') ? 'S4' : q.onSuccess.revealAtom.includes(':S3:') ? 'S3' : 'S2'
  atoms[party][disputeId][state] = atoms[party][disputeId][state] || []
  atoms[party][disputeId][state].push({ id: q.onSuccess.revealAtom, factText: `${c.name} 카드에서 ${party === 'a' ? '리뷰어' : '업주'} 쪽 숨기던 축이 한 단계 더 드러났습니다`, tags: ['headline', disputeId, c.id], unlockedAtState: state, slots: { summary: { default: `${c.name} 카드에서 숨기던 축이 더 드러났습니다` } }, stanceHints: ['partial', 'blame', 'confess'] })
}

const v3 = {
  caseId: CASE_ID,
  dossierCards: cards,
  stateUnlockAtoms: atoms,
  events: {
    contradictions: [{ id: 'headline-01-contradiction-1', statementA: '리뷰어는 문제 장면을 꾸며내지 않았다고 말합니다.', statementB: '원본 촬영본과 업로드본 비교에선 복구 구간이 의도적으로 빠져 있습니다.', options: { point_out: { label: '편집 차이를 짚는다', effect: '리뷰어 방어 폭이 줄어듭니다.' }, let_go: { label: '지금은 넘긴다', effect: '더 넓은 맥락을 노릴 수 있습니다.' } }, npcReaction: '리뷰어는 실제 장면이었다는 말만 붙잡으려 합니다.' }, { id: 'headline-01-contradiction-2', statementA: '업주는 즉시 영업정지급은 아니었다고 말합니다.', statementB: '기관 기록에는 반복된 시정 권고와 누적 실패가 남아 있습니다.', options: { point_out: { label: '누적 실패를 짚는다', effect: '업주 변명이 약해집니다.' }, let_go: { label: '나중으로 미룬다', effect: '감정 폭발을 더 크게 유도할 수 있습니다.' } }, npcReaction: '업주는 즉시 영업정지가 아니었다는 말만 붙잡습니다.' }],
    interjections: [{ id: 'headline-01-interjection-1', interruptor: 'a', interjectionLine: '회복 패키지 얘기만 붙들면 정작 업주 쪽 위생 실패를 흐리게 만듭니다.', options: { allow: { label: '말하게 둔다', effect: '리뷰어 방어가 길어집니다.' }, block: { label: '끊고 돌아간다', effect: '핵심 사실선으로 복귀합니다.' } } }, { id: 'headline-01-interjection-2', interruptor: 'b', interjectionLine: '편집과 거래 압박을 같이 봐야지, 위생 얘기로만 끝내면 안 됩니다.', options: { allow: { label: '말을 받는다', effect: '업주 감정이 더 노출됩니다.' }, block: { label: '지금은 끊는다', effect: '신상 유포 쟁점이 선명해집니다.' } } }],
    emotionalOutbursts: [{ id: 'headline-01-outburst-1', party: 'a', outburstLine: '제가 찍은 영상 때문에 불편해진 건 알아도, 그래서 제 동선까지 돌린 건 선 넘은 겁니다.', options: { press: { label: '밀어붙인다', effect: '피해 감정이 사실 고백으로 이어질 수 있습니다.' }, calm: { label: '가라앉힌다', effect: '방어 반응이 잠시 누그러집니다.' } } }, { id: 'headline-01-outburst-2', party: 'b', outburstLine: '위생이 완벽했다고는 못 하겠습니다. 그런데 그걸 그렇게까지 세게 걸었으니 저도 눈이 뒤집힌 겁니다.', options: { press: { label: '보복 책임을 짚는다', effect: '업주 감정 방어가 무너집니다.' }, calm: { label: '누적 실패를 다시 본다', effect: '운영 책임 축으로 복귀합니다.' } } }],
  },
  transitionBeats: [{ id: 'tb-headline-a-d1-s1-s2', caseId: CASE_ID, party: 'a', disputeId: 'd-1', fromState: 'S1', toState: 'S2', primaryBeatType: 'evidence_hit', line: '원본 촬영본이 나란히 깔리자 리뷰어는 더는 컷 차이를 부정하지 못하고 공익과 연출을 함께 묶어 답하려 듭니다.', behaviorHint: '목소리가 잠깐 낮아졌다가 다시 단단해집니다.' }, { id: 'tb-headline-a-d3-s4-s5', caseId: CASE_ID, party: 'a', disputeId: 'd-3', fromState: 'S4', toState: 'S5', primaryBeatType: 'confession', line: '협조와 회복이라는 단어를 썼지만 실질적으로는 영향력을 거래 카드처럼 쥐고 있었다는 고백이 터져 나옵니다.', behaviorHint: '마지막 한 문장을 내뱉고 짧게 침묵합니다.' }, { id: 'tb-headline-b-d2-s1-s2', caseId: CASE_ID, party: 'b', disputeId: 'd-2', fromState: 'S1', toState: 'S2', primaryBeatType: 'evidence_hit', line: '주방 CCTV와 시정 메일이 겹치자 업주는 즉시 영업정지 사안이 아니었다는 말만 붙들고 누적 실패 자체는 더는 피하지 못합니다.', behaviorHint: '숫자와 시점을 과하게 정확히 말하려 듭니다.' }, { id: 'tb-headline-b-d4-s4-s5', caseId: CASE_ID, party: 'b', disputeId: 'd-4', fromState: 'S4', toState: 'S5', primaryBeatType: 'confession', line: '업주는 생계 위기를 핑계로 차량 번호와 동선 공유를 막지 않았고 일부는 자신이 직접 올렸다는 수준까지 내려옵니다.', behaviorHint: '단어 사이 간격이 길어지고 손끝이 멈춥니다.' }],
}

const qids = cards.flatMap(c => c.challenges.flatMap(ch => ch.questions.map(q => q.id)))

const bundle = {
  schemaVersion: 1,
  caseId: CASE_ID,
  generatedAt: new Date().toISOString(),
  notes: ['Programmatically generated headline-01 bundle.', 'Full coverage for interrogation, evidence_present, dossier, witness, aftermath, and system_message.'],
  coverage: {
    interrogation: { parties: ['a', 'b'], disputes: caseData.disputes.map(d => d.id), lieStates: STATES, questionTypes: QTYPES, variantsPerKey: 5 },
    evidence_present: { parties: ['a', 'b'], evidenceIds: caseData.evidence.map(e => e.id), lieBands: BANDS, variantsPerKey: 5 },
    dossier: { parties: ['a', 'b'], questionIds: qids, lieBands: BANDS, variantsPerKey: 3 },
    witness: { witnessIds: (caseData.duo.socialGraph || []).map(p => p.id), depths: ['vague', 'partial', 'full'], variantsPerKey: 3 },
    aftermath: { resultClasses: ['a_primary_fault', 'b_primary_fault', 'shared_fault', 'trust_rebuild', 'procedural_caution'], variantsPerKey: 2 },
    system_message: { keys: [{ context: 'interrogation', eventType: 'repeat_warning' }, { context: 'evidence', eventType: 'new_unlock' }, { context: 'evidence', eventType: 'trap_notice' }, { context: 'dossier', eventType: 'challenge_cleared' }, { context: 'witness', eventType: 'credibility_shift' }, { context: 'verdict', eventType: 'profile_update' }], variantsPerKey: 2 },
  },
  channels: {
    interrogation: { entries: [] },
    evidence_present: { entries: [] },
    dossier: { entries: [] },
    witness: { entries: [] },
    aftermath: { entries: [] },
    system_message: { entries: [] },
  },
}

for (const party of ['a', 'b']) for (const d of caseData.disputes) for (const state of STATES) for (const type of QTYPES) {
  const cfg = R[`${party}|${d.id}`]; const kind = cfg[0]
  bundle.channels.interrogation.entries.push({ key: `${party}|${d.id}|${state}|${type}`, party, disputeId: d.id, lieState: state, questionType: type, stanceHint: kind === 'self' ? (state === 'S0' ? 'deny' : state === 'S1' ? 'hedge' : state === 'S2' ? 'partial' : state === 'S3' ? 'blame' : state === 'S4' ? 'partial' : 'confess') : kind === 'mixed' ? (state === 'S0' ? 'hedge' : state === 'S1' ? 'answer' : state === 'S2' ? 'partial' : state === 'S3' ? 'blame' : 'partial') : kind === 'observe' ? (state === 'S0' ? 'answer' : state === 'S1' ? 'hedge' : state === 'S2' ? 'partial' : state === 'S3' ? 'answer' : state === 'S4' ? 'partial' : 'answer') : (state === 'S0' ? 'answer' : state === 'S1' ? 'answer' : state === 'S2' ? 'partial' : state === 'S3' ? 'emotional' : state === 'S4' ? 'partial' : 'answer'), truthLevel: state === 'S0' ? 'none' : state === 'S1' ? 'hint' : state === 'S5' ? 'full' : 'partial', variants: ivariants(party, d.id, state, type) })
}

for (const party of ['a', 'b']) for (const ev of caseData.evidence) for (const b of BANDS) {
  const role = evRole(ev, party)
  bundle.channels.evidence_present.entries.push({ key: `${party}|${ev.id}|${b}|${role}`, party, evidenceId: ev.id, lieBand: b, subjectRole: role, stanceHint: role === 'self' ? (b === 'early' ? 'deny' : b === 'mid' ? 'partial' : 'confess') : b === 'late' ? 'partial' : 'answer', truthLevel: b === 'early' ? 'hint' : b === 'mid' ? 'partial' : 'full', variants: evariants(party, ev, b, role) })
}

for (const qid of qids) for (const b of BANDS) {
  const party = qid.split('.')[1]
  bundle.channels.dossier.entries.push({ key: `${party}|${qid}|${b}`, party, dossierQuestionId: qid, lieBand: b, stanceHint: b === 'early' ? 'hedge' : b === 'mid' ? 'partial' : 'confess', truthLevel: b === 'early' ? 'hint' : b === 'mid' ? 'partial' : 'full', variants: dvariants(qid, b, party) })
}

for (const w of caseData.duo.socialGraph || []) {
  bundle.channels.witness.entries.push({ key: `${w.id}|vague`, witnessId: w.id, depth: 'vague', stanceHint: 'answer', truthLevel: 'hint', variants: [{ id: `${w.id}|vague#1`, text: end(`${w.name} 증인은 현장 흐름을 대략적으로만 기억하고 세부 순서는 기록을 다시 봐야 한다고 진술합니다`), behaviorHint: '기억 범위를 스스로 제한하며 답합니다.' }, { id: `${w.id}|vague#2`, text: end(`${w.name} 증인은 직접 본 구간만 말하고 확신이 없는 부분은 단정하지 않겠다고 진술합니다`), behaviorHint: '확실한 것만 남기려는 조심스러운 어조입니다.' }, { id: `${w.id}|vague#3`, text: end(`${w.name} 증인은 그날 분위기와 동선 정도만 먼저 말하고 긴 해석은 보류하겠다고 진술합니다`), behaviorHint: '판단보다 관찰을 앞세웁니다.' }] })
  bundle.channels.witness.entries.push({ key: `${w.id}|partial`, witnessId: w.id, depth: 'partial', stanceHint: 'answer', truthLevel: 'partial', variants: [{ id: `${w.id}|partial#1`, text: join(`${w.name} 증인은 ${w.knowledgeScope}`, '다만 자기 위치에서 본 구간만 확실하다고 선을 긋습니다'), behaviorHint: '기억난 장면부터 차례로 정리합니다.' }, { id: `${w.id}|partial#2`, text: join(`${w.name} 증인은 현장 분위기와 직전 대화를 함께 설명합니다`, '확산 이후 정황과 최초 장면은 나눠 말해야 한다고 합니다'), behaviorHint: '처음 장면과 뒤늦은 소문을 구분하려고 합니다.' }, { id: `${w.id}|partial#3`, text: join(`${w.name} 증인은 직접 본 사실은 분명히 말하지만 동기 추정에는 신중합니다`, '기록이 있는 부분부터 보자고 합니다'), behaviorHint: '추정보다 관찰을 우선합니다.' }] })
  bundle.channels.witness.entries.push({ key: `${w.id}|full`, witnessId: w.id, depth: 'full', stanceHint: 'answer', truthLevel: 'full', variants: [{ id: `${w.id}|full#1`, text: join(`${w.name} 증인은 ${w.knowledgeScope}`, '직접 본 구간과 뒤늦게 알게 된 구간을 나눠 설명합니다', '누가 먼저 대응을 바꿨는지까지 시점별로 정리합니다'), behaviorHint: '핵심 구간에서 목소리가 또렷해집니다.' }, { id: `${w.id}|full#2`, text: join(`${w.name} 증인은 처음 충돌 지점과 이후 확산 과정을 순서대로 말합니다`, '본인에게 불리한 대목도 아예 빼지는 못합니다', '직접 본 사실과 전해 들은 정황을 구분해 진술합니다'), behaviorHint: '자기 몫의 불편한 사실도 피하지 못합니다.' }, { id: `${w.id}|full#3`, text: join(`${w.name} 증인은 기록으로 확인되는 사실과 현장 체감을 함께 진술합니다`, '기록으로 확인되는 장면과 체감만 남는 장면을 따로 나눕니다', '그래서 어느 쪽 말이 좁아지는지 비교적 분명하게 드러납니다'), behaviorHint: '관찰과 해석을 나눠 말하려는 숙고가 있습니다.' }] })
}

bundle.channels.aftermath.entries = [
  { key: 'a_primary_fault', resultClass: 'a_primary_fault', variants: [{ id: 'a_primary_fault#1', text: join('재판관은 리뷰어 쪽의 편집 과장과 영향력 거래 성격을 더 무겁게 봅니다', '실제 위생 문제가 있었다는 점은 남지만, 그 사실 위에 계산된 연출을 덧씌운 책임이 먼저 적시됩니다'), behaviorHint: '없음' }, { id: 'a_primary_fault#2', text: join('이번 결론은 리뷰어가 공익과 사업 감각을 섞은 지점을 중심으로 정리됩니다', '업주 쪽 위생 실패는 별도로 남겨 두되 판단의 축은 영향력 사용의 선을 넘은 쪽에 놓입니다'), behaviorHint: '없음' }] },
  { key: 'b_primary_fault', resultClass: 'b_primary_fault', variants: [{ id: 'b_primary_fault#1', text: join('재판관은 업주 쪽의 반복된 위생 실패와 보복성 정보 공유를 더 크게 봅니다', '편집 과장이 있었다 해도 실제 문제와 신상 유포 책임이 지워지지는 않는다는 취지입니다'), behaviorHint: '없음' }, { id: 'b_primary_fault#2', text: join('이번 결론은 업주가 운영 실패를 줄여 말하고 반격에서 선을 넘은 점에 무게를 둡니다', '리뷰어의 계산은 비판하되 생계 위기를 핑계로 한 보복 확산은 더 직접적인 책임으로 적시됩니다'), behaviorHint: '없음' }] },
  { key: 'shared_fault', resultClass: 'shared_fault', variants: [{ id: 'shared_fault#1', text: join('재판관은 양측 모두 사실 위에 자기 계산을 얹었다고 봅니다', '한쪽은 공익을 과장했고 다른 한쪽은 생계 위기를 핑계로 보복을 키웠다는 점이 함께 적시됩니다'), behaviorHint: '없음' }, { id: 'shared_fault#2', text: join('이번 사건은 누가 완전히 깨끗한가보다 누가 어떤 선을 넘었는가를 나눠 읽는 결론에 가깝습니다', '그래서 책임은 나뉘되 공개정정과 영업개선, 개인정보보호 조치가 함께 권고됩니다'), behaviorHint: '없음' }] },
  { key: 'trust_rebuild', resultClass: 'trust_rebuild', variants: [{ id: 'trust_rebuild#1', text: join('재판관은 공개 비난만으로는 이 갈등이 끝나지 않는다고 봅니다', '편집과 위생, 보복 확산의 사실을 각각 적시한 뒤 공개정정과 개인정보보호 조치를 함께 묶어 신뢰 회복의 틀을 제안합니다'), behaviorHint: '없음' }, { id: 'trust_rebuild#2', text: join('이번 결론은 처벌보다 다시는 같은 방식으로 부딪히지 않게 하는 절차를 세우는 데 초점을 둡니다', '공개정정과 영업개선, 반격 금지 원칙을 동시에 남겨 관계의 바닥선을 복구하려는 판단입니다'), behaviorHint: '없음' }] },
  { key: 'procedural_caution', resultClass: 'procedural_caution', variants: [{ id: 'procedural_caution#1', text: join('재판관은 무엇이 사실인지 못지않게 그 사실을 다루는 방식이 무너졌다고 봅니다', '그래서 영상 편집 기준과 반박 채널, 개인정보보호 절차를 다시 세우는 조치를 우선 권고합니다'), behaviorHint: '없음' }, { id: 'procedural_caution#2', text: join('이번 사건은 양측 모두 절차를 잃은 뒤 파장이 커졌다는 점이 핵심으로 남습니다', '증거와 기록을 기준으로 정리하되 다음 대응은 공개정정, 영업개선, 개인정보보호 원칙 아래에서만 허용된다는 선을 긋습니다'), behaviorHint: '없음' }] },
]

bundle.channels.system_message.entries = [
  { key: 'interrogation|repeat_warning', context: 'interrogation', eventType: 'repeat_warning', variants: [{ id: 'interrogation|repeat_warning#1', text: '같은 축의 질문이 반복되고 있습니다. 장면, 동기, 감정 가운데 다른 각도로 전환해 주십시오.', behaviorHint: '없음' }, { id: 'interrogation|repeat_warning#2', text: '반복 질문 경고입니다. 지금부터는 같은 사실을 다시 묻기보다 빠진 맥락을 겨냥하는 편이 유효합니다.', behaviorHint: '없음' }] },
  { key: 'evidence|new_unlock', context: 'evidence', eventType: 'new_unlock', variants: [{ id: 'evidence|new_unlock#1', text: '새 조사 결과가 열렸습니다. 이제 같은 자료라도 출처와 전후 맥락까지 함께 읽어야 합니다.', behaviorHint: '없음' }, { id: 'evidence|new_unlock#2', text: '증거 해석 폭이 넓어졌습니다. 방금 열린 자료는 다음 응답의 책임 비율을 바꿀 수 있습니다.', behaviorHint: '없음' }] },
  { key: 'evidence|trap_notice', context: 'evidence', eventType: 'trap_notice', variants: [{ id: 'evidence|trap_notice#1', text: '이 자료는 표면만 보면 함정이 됩니다. 화면보다 잘린 구간과 취득 경위를 먼저 확인해 주십시오.', behaviorHint: '없음' }, { id: 'evidence|trap_notice#2', text: '주의가 필요한 증거입니다. 한 장면만으로 결론을 내리면 실제 책임 배분이 왜곡될 수 있습니다.', behaviorHint: '없음' }] },
  { key: 'dossier|challenge_cleared', context: 'dossier', eventType: 'challenge_cleared', variants: [{ id: 'dossier|challenge_cleared#1', text: '카드 질문이 정리되었습니다. 차단된 공격 벡터와 새로 열린 사실 조각이 다음 심문에 반영됩니다.', behaviorHint: '없음' }, { id: 'dossier|challenge_cleared#2', text: '도시어 카드가 성공적으로 처리되었습니다. 이제 상대가 쓰기 어려워진 변명 축이 생겼습니다.', behaviorHint: '없음' }] },
  { key: 'witness|credibility_shift', context: 'witness', eventType: 'credibility_shift', variants: [{ id: 'witness|credibility_shift#1', text: '증인 신뢰도가 갱신되었습니다. 같은 말이라도 지금부터는 무게가 다르게 계산됩니다.', behaviorHint: '없음' }, { id: 'witness|credibility_shift#2', text: '증언 해석 기준이 바뀌었습니다. 관찰과 추정을 더 엄격히 나눠 읽어 주십시오.', behaviorHint: '없음' }] },
  { key: 'verdict|profile_update', context: 'verdict', eventType: 'profile_update', variants: [{ id: 'verdict|profile_update#1', text: '이번 판단이 재판관 프로필에 반영됩니다. 사실, 절차, 보호 중 어디에 무게를 두었는지가 기록됩니다.', behaviorHint: '없음' }, { id: 'verdict|profile_update#2', text: '판결 성향이 갱신됩니다. 다음 사건에서는 지금의 책임 분배 습관이 더 선명하게 드러납니다.', behaviorHint: '없음' }] },
]

const JSON_PATH = path.join(ROOT, 'docs', 'ref', '리뉴얼참고', `${CASE_ID}-v3-game-loop-data.json`)
const TS_PATH = path.join(ROOT, 'docs', 'ref', '리뉴얼참고', `${CASE_ID}-v3-game-loop-data.ts`)
const SCRIPTED_PATH = path.join(ROOT, 'src', 'data', 'scriptedText', `${CASE_ID}.json`)
ensure(JSON_PATH); ensure(TS_PATH); ensure(SCRIPTED_PATH)
if (OUTPUT_MODE === 'all' || OUTPUT_MODE === 'structure') {
  fs.writeFileSync(JSON_PATH, `${JSON.stringify(v3, null, 2)}\n`, 'utf8')
  fs.writeFileSync(TS_PATH, `export const headline01V3GameLoopData = ${JSON.stringify(v3, null, 2)} as const\n`, 'utf8')
  console.log(`[headline-01] wrote ${path.relative(ROOT, JSON_PATH)}`)
  console.log(`[headline-01] wrote ${path.relative(ROOT, TS_PATH)}`)
}
if (OUTPUT_MODE === 'all' || OUTPUT_MODE === 'scripted') {
  fs.writeFileSync(SCRIPTED_PATH, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
  console.log(`[headline-01] wrote ${path.relative(ROOT, SCRIPTED_PATH)}`)
}
