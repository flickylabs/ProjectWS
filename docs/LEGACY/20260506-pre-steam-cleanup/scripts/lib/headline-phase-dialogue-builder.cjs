#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

function makeEntry(speaker, text, relatedDisputes = [], behaviorHint = null) {
  return { speaker, text, relatedDisputes, behaviorHint }
}

function buildHeadline01Phase1(caseData) {
  const a = caseData.duo.partyA
  const b = caseData.duo.partyB
  return [
    makeEntry('system', '천만 조회의 폭로 영상 이후, 리뷰어와 업주가 서로를 공익과 보복의 얼굴로 지목하고 있습니다.'),
    makeEntry('a', `재판관님, 저는 위생 문제를 확인하고 기록한 겁니다. ${b.name} 씨 매장에 실제로 반복된 위생 하자가 있었고, 그 점을 알리는 게 제 역할이었다고 생각합니다.`, ['d-1', 'd-2'], '차분한 표정으로 문장을 짧게 끊는다.'),
    makeEntry('b', `그 역할이라는 말로 다 덮을 수는 없지요. ${a.name} 씨는 촬영 전부터 무상 협조를 기대하게 만들었고, 영상이 올라간 뒤에는 회복 패키지 이야기까지 꺼냈습니다.`, ['d-3'], '영수증을 쥔 손에 힘이 들어간다.'),
    makeEntry('a', `무상 협조를 요구한 게 아니라 정상적인 촬영 협조와 재방문 가능성을 타진한 겁니다. 문제는 ${b.name} 씨가 위생 지적보다 제 영상을 막는 데 더 민감하게 반응했다는 점입니다.`, ['d-1', 'd-3'], '발음은 또렷하지만 끝 문장에서 살짝 날이 선다.'),
    makeEntry('b', `위생 문제를 말하려면 있는 그대로 보여야지요. 서비스 복구 시도와 직원 설명은 잘라내고, 가장 자극적인 장면만 남겨서 매장을 끝장낸 건 ${a.name} 씨 쪽입니다.`, ['d-1'], '억눌렀던 분노가 섞인다.'),
    makeEntry('a', `잘라냈다고 말씀하시지만 구청 시정 기록은 남아 있습니다. 반복된 위생 권고가 있었던 건 편집이 아니라 사실입니다.`, ['d-2'], '준비해 온 문장을 확인하듯 낮게 말한다.'),
    makeEntry('b', `그 사실이 있다 해도 제 차량 번호와 동선이 커뮤니티에 풀린 건 다른 문제입니다. 저는 반박하려 했을 뿐인데, 어느 순간 서로를 파괴하는 싸움이 됐습니다.`, ['d-4'], '시선을 피하다가 마지막 문장에서 정면을 본다.'),
    makeEntry('system', '지금 이 법정이 봐야 할 건 네 갈래입니다. 영상 편집이 정말 공익이었는지, 실제 위생 하자가 어느 정도였는지, 무상 협조와 회복 패키지가 거래였는지, 그리고 보복성 신상 유포가 어디서 시작됐는지 차례로 가려야 합니다.'),
    makeEntry('b', `재판관님, 저는 잘못이 없다고 말하는 게 아닙니다. 다만 ${a.name} 씨가 공익을 말하면서 영향력을 거래했고, 저 역시 그 압박에 보복으로 응했다는 점까지 함께 봐 주셔야 합니다.`, ['d-1', 'd-2', 'd-3', 'd-4'], '말을 고르려다 체념한 듯 고개를 든다.'),
  ]
}

function buildHeadline01Phase2(caseData) {
  const a = caseData.duo.partyA
  const b = caseData.duo.partyB
  return [
    makeEntry('system', '양측은 이제 상대의 주장에 직접 반박할 수 있습니다. 감정이 아니라 사실과 책임 범위를 중심으로 말씀하십시오.'),
    makeEntry('b', `먼저 짚겠습니다. ${a.name} 씨는 공익 제보자처럼 말하지만, 촬영 전에도 협조를 기대하게 했고 공개 뒤에는 평판 회복 견적을 연결했습니다. 그게 왜 거래가 아닙니까.`, ['d-3'], '정리된 문장으로 몰아붙인다.'),
    makeEntry('a', `거래라면 협박이 있어야 합니다. 저는 삭제를 조건으로 돈을 요구한 적이 없고, 실제 위생 문제가 있었기 때문에 영상 자체를 막을 이유도 없었습니다.`, ['d-2', 'd-3'], '짧게 끊어 말하며 감정을 누른다.'),
    makeEntry('b', `그런데도 복구 시도와 설명은 지워졌습니다. 공익이라면서 왜 가장 위험해 보이는 장면만 남겼습니까.`, ['d-1'], '숨을 고른 뒤 질문을 던진다.'),
    makeEntry('a', `복구 시도가 있었다고 해서 반복된 하자가 사라지지는 않습니다. 오히려 ${b.name} 씨는 제 신상과 동선을 커뮤니티에 퍼뜨리며 반박의 선을 넘었습니다.`, ['d-2', 'd-4'], '차분하던 표정이 굳어진다.'),
    makeEntry('b', `그 부분은 저도 선을 넘었습니다. 하지만 제가 그렇게까지 몰린 배경에 ${a.name} 씨의 편집과 영향력 행사가 있었다는 점도 빠질 수 없습니다.`, ['d-1', 'd-4'], '인정과 반박을 섞어 말한다.'),
    makeEntry('a', `결국 이 사건은 위생 문제를 바로잡는 방식이었는지, 아니면 서로의 약점을 이용한 싸움이었는지의 문제입니다. 저는 적어도 출발점만큼은 공익이었다고 생각합니다.`, ['d-1', 'd-3'], '확신을 보이지만 마지막 음절이 짧게 떨린다.'),
    makeEntry('system', '초기 반박이 끝났습니다. 이제 재판관은 증거와 심문을 통해 공익, 거래, 보복의 경계를 가려야 합니다.'),
  ]
}

function buildHeadline02Phase1(caseData) {
  const a = caseData.duo.partyA
  const b = caseData.duo.partyB
  return [
    makeEntry('system', '숙소 앞 셀카가 퍼진 뒤 사생 계정이 접근했고, 아이돌과 매니저는 서로가 위험을 키웠다고 주장하고 있습니다.'),
    makeEntry('a', `재판관님, 저는 누가 정보를 새는지 확인하려고 했을 뿐입니다. 그런데 제가 보낸 비공개 셀카와 이동 힌트가 합쳐져서 사생이 숙소 앞까지 온 건 정말 무서운 일이었습니다.`, ['d-1', 'd-3'], '애써 침착한 톤을 유지하지만 손끝이 굳어 있다.'),
    makeEntry('b', `그 확인이라는 방식이 너무 위험했습니다. ${a.name} 씨가 직접 반응을 주지 않았다면 그쪽이 통한다는 신호도 덜 갔을 겁니다.`, ['d-3'], '감정을 누르고 관리 책임을 강조한다.'),
    makeEntry('a', `${b.name} 씨는 그렇게 말씀하시지만, 팬사이트가 제 이동 시간과 대기 위치를 어떻게 그렇게 정확히 알았겠어요. 저는 누가 새는지 의심할 수밖에 없었습니다.`, ['d-1', 'd-2'], '시선을 고정한 채 단어를 정확히 찍어 말한다.'),
    makeEntry('b', `정확한 주소를 준 적은 아니지만, 현장 통제를 위해 팬사이트와 접촉한 건 맞습니다. 그게 곧 숙소 침입을 허용한 거래였다는 식의 말은 과합니다.`, ['d-2'], '업무상 조율이었다는 프레임을 내세운다.'),
    makeEntry('a', `그런데 왜 보안업체 보고는 축약됐고, 왜 경찰 보고는 늦어졌나요. 조용히 넘기자는 말은 했어도, 사고 자체를 작게 만들자는 뜻은 아니었습니다.`, ['d-4'], '문장 끝에서 억눌린 분노가 드러난다.'),
    makeEntry('b', `컴백 일정이 걸려 있었고 현장도 과열돼 있었습니다. 저는 보호를 우선한 겁니다. 하지만 ${a.name} 씨도 사생 계정에 직접 반응한 책임에서 완전히 벗어날 수는 없습니다.`, ['d-3', 'd-4'], '합리적인 설명처럼 말하지만 끝을 단정한다.'),
    makeEntry('system', '지금 이 사건에서 갈라 봐야 할 건 네 가지입니다. 셀카 유출과 동선 노출이 어떻게 겹쳤는지, 팬사이트와의 접촉이 어디까지 정보 거래였는지, 당사자의 직접 반응이 위험을 얼마나 키웠는지, 그리고 사고 뒤 축소 보고가 왜 붙었는지입니다.'),
    makeEntry('b', `재판관님, 저는 현장을 막아야 하는 사람이었고 ${a.name} 씨는 스스로를 지키려다 선을 넘은 사람입니다. 어느 쪽이 더 무거운 잘못인지 차분하게 가려 주십시오.`, ['d-1', 'd-2', 'd-3', 'd-4'], '정리된 말투로 책임의 비중을 묻는다.'),
  ]
}

function buildHeadline02Phase2(caseData) {
  const a = caseData.duo.partyA
  const b = caseData.duo.partyB
  return [
    makeEntry('system', '초기 진술 이후, 양측은 상대 주장에 직접 반박할 수 있습니다. 보호와 책임을 분리해서 말씀하십시오.'),
    makeEntry('b', `${a.name} 씨는 공포 때문에 그랬다고 하지만, 사생 계정에 직접 반응하고 비공개 셀카를 미끼로 쓴 건 사실입니다. 그 선택이 위험을 키웠습니다.`, ['d-3'], '절제된 말투로 핵심만 찌른다.'),
    makeEntry('a', `그 선택이 무모했다는 건 인정할 수 있습니다. 하지만 팬사이트가 제 동선을 알고 있었다는 더 큰 문제를 가리려는 방식으로 들립니다.`, ['d-1', 'd-2', 'd-3'], '인정과 반박을 한 문장 안에 묶어 말한다.'),
    makeEntry('b', `현장 통제 차원의 접촉을 곧장 거래로 단정하면 곤란합니다. 업계에서는 과열된 팬을 막기 위해 접촉 창구를 유지하는 경우도 있습니다.`, ['d-2'], '관행을 방패로 삼는다.'),
    makeEntry('a', `그 관행 때문에 숙소 접근 시도가 현실이 됐잖아요. 그리고 사고 뒤에 보안 보고를 줄이고 대응을 미룬 건 보호가 아니라 축소입니다.`, ['d-2', 'd-4'], '차분한 톤이지만 단어마다 힘이 실린다.'),
    makeEntry('b', `보고를 늦춘 책임은 제게 있습니다. 다만 ${a.name} 씨도 조용히 처리하자고 했고, 저는 그 요청을 따른다고 생각했습니다.`, ['d-4'], '자기 책임을 일부 인정하며 공동 책임으로 돌린다.'),
    makeEntry('a', `저는 노출을 막고 싶었지 기록을 지우고 싶었던 게 아닙니다. ${b.name} 씨는 그 차이를 이용해 본인 책임까지 가볍게 만들었습니다.`, ['d-4'], '낮게 말하지만 마지막 문장이 날카롭다.'),
    makeEntry('system', '반박 진술이 끝났습니다. 이제 재판관은 위험한 직접 접촉과 구조적 유출, 그리고 축소 대응의 무게를 따져야 합니다.'),
  ]
}

function buildHeadlinePhaseDialogues(caseData, caseKey) {
  if (caseKey === 'headline-01') {
    return { phase1: buildHeadline01Phase1(caseData), phase2: buildHeadline01Phase2(caseData) }
  }
  if (caseKey === 'headline-02') {
    return { phase1: buildHeadline02Phase1(caseData), phase2: buildHeadline02Phase2(caseData) }
  }
  throw new Error(`unsupported headline phase dialogue case: ${caseKey}`)
}

function compileHeadlinePhaseDialogues(root, caseKey) {
  const casePath = path.join(root, 'src', 'data', 'cases', 'generated', `${caseKey}.json`)
  if (!fs.existsSync(casePath)) {
    throw new Error(`missing generated case: ${path.relative(root, casePath).replace(/\\/g, '/')}`)
  }

  const caseData = readJson(casePath)
  const built = buildHeadlinePhaseDialogues(caseData, caseKey)
  const phase1OutPath = path.join(root, 'src', 'data', 'dialogues', 'phase1', `${caseKey}.json`)
  const phase2OutPath = path.join(root, 'src', 'data', 'dialogues', 'phase2', `${caseKey}.json`)

  writeJson(phase1OutPath, { caseId: caseData.caseId, dialogues: built.phase1 })
  writeJson(phase2OutPath, { caseId: caseData.caseId, dialogues: built.phase2 })

  return { phase1OutPath, phase2OutPath, caseId: caseData.caseId }
}

module.exports = {
  compileHeadlinePhaseDialogues,
}
