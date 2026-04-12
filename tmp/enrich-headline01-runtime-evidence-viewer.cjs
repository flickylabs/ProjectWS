#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const CASE_PATH = path.join(ROOT, 'src', 'data', 'cases', 'generated', 'headline-01.json')

const data = JSON.parse(fs.readFileSync(CASE_PATH, 'utf8'))

const enrichments = {
  'e-1': {
    meta: {
      trustLevel: 'mid',
      trustLabel: '보통',
      source: 'third',
      sourceLabel: '제3자',
      legality: 'ok',
      legalLabel: '적법',
      stage: 1,
      stageLabel: '초기 공개',
      sourceNote: '원본 파일 비교본과 편집 이력 대조 자료',
      redactions: ['촬영 협조 직원 실명', '매장 내부 얼굴 일부'],
    },
    viewerData: {
      device: {
        ownerName: '편집 비교 패널',
        sections: [
          {
            title: '원본 촬영본',
            id: 'raw',
            items: [
              { text: '18:42 문제 장면 포착, 바닥 정리 미흡 구간 유지', suspicious: true },
              { text: '18:43 직원이 복구를 시도하며 카메라 밖 대화 발생', suspicious: false },
              { text: '18:44 실랑이 직전 주방 정리 장면 존재', suspicious: false },
            ],
          },
          {
            title: '최종 업로드본',
            id: 'edited',
            items: [
              { text: '복구 시도 직전부터 컷 시작, 긴박감이 바로 올라감', suspicious: true },
              { text: '실랑이 전후 맥락 삭제, 위기 장면만 압축됨', suspicious: true },
              { text: '썸네일과 자막이 공포감을 더 강하게 유도함', suspicious: true },
            ],
          },
          {
            title: '비교 메모',
            id: 'notes',
            items: [
              { text: '문제 장면 자체는 실재함', suspicious: false },
              { text: '다만 편집 강도가 의도 해석에 직접 영향을 줌', suspicious: true },
            ],
          },
        ],
      },
    },
  },
  'e-2': {
    meta: {
      trustLevel: 'high',
      trustLabel: '높음',
      source: 'org',
      sourceLabel: '기관',
      legality: 'ok',
      legalLabel: '적법',
      stage: 1,
      stageLabel: '공식 기록',
      sourceNote: '현장 CCTV와 위생 체크 사진 원본 대조',
      redactions: ['직원 얼굴 일부'],
    },
    viewerData: {
      cctv: [
        { time: '18:41', pct: 0, label: '입장', desc: '촬영팀 입장 직후 주방 전경이 포착됩니다.', suspicious: false },
        { time: '18:42', pct: 28, label: '냉장', desc: '냉장 보관 온도 이탈 구간이 화면에 남습니다.', suspicious: true },
        { time: '18:43', pct: 57, label: '교차 사용', desc: '조리 도구 교차 사용 장면이 확인됩니다.', suspicious: true },
        { time: '18:44', pct: 82, label: '정리 시도', desc: '직원이 뒤늦게 정리와 교체를 시도합니다.', suspicious: false },
      ],
    },
  },
  'e-3': {
    meta: {
      trustLevel: 'high',
      trustLabel: '높음',
      source: 'org',
      sourceLabel: '기관',
      legality: 'ok',
      legalLabel: '적법',
      stage: 2,
      stageLabel: '재점검',
      sourceNote: '구청 위생과 시정 메일 및 재점검 보고서 묶음',
      redactions: ['담당 공무원 직통 연락처'],
    },
    viewerData: {
      log: {
        rows: [
          { date: '04/03 10:12', type: 'out', typeLabel: '시정', target: '정태성 업소', duration: '메일 1건', suspicious: true },
          { date: '04/03 10:18', type: 'in', typeLabel: '회신', target: '업소 측 확인', duration: '회신 1건', suspicious: false },
          { date: '04/05 15:40', type: 'out', typeLabel: '재점검', target: '현장 방문', duration: '보고서 4p', suspicious: true },
          { date: '04/05 16:05', type: 'miss', typeLabel: '미이행', target: '온도 관리', duration: '개선 미흡', suspicious: true },
          { date: '04/07 11:00', type: 'out', typeLabel: '안내', target: '추가 시정 요구', duration: '메일 1건', suspicious: false },
        ],
        note: '즉시 영업정지 사안은 아니지만 반복 지적과 재점검 이력이 누적돼 있습니다.',
      },
    },
  },
  'e-4': {
    meta: {
      trustLevel: 'mid',
      trustLabel: '보통',
      source: 'third',
      sourceLabel: '제3자',
      legality: 'ok',
      legalLabel: '적법',
      stage: 2,
      stageLabel: '연결 제안',
      sourceNote: '촬영 전 DM과 공개 후 MCN 견적서 연결 캡처',
      redactions: ['실무자 이메일', '브랜드명 일부'],
    },
    viewerData: {
      chat: {
        header: '메뉴 협조 DM + 회복 패키지 전달 이력',
        messages: [
          { side: 'left', sender: '강민호', text: '사장님, 촬영 전에 시그니처 메뉴와 운영 흐름을 협조해 주시면 좋겠습니다.' },
          { side: 'right', sender: '정태성', text: '협조는 가능하지만 무상 제공 전제는 곤란합니다.' },
          { side: 'left', sender: '강민호', text: '공식 협찬은 아니고, 촬영 동선이 매끄러우면 결과가 좋아질 수 있습니다.' },
          { type: 'read', text: '영상 공개 후 1일 경과' },
          { side: 'left', sender: 'MCN 실무', text: '브랜드 회복 패키지 제안서를 전달드립니다. 검색어 관리와 후기 복구를 포함합니다.' },
          { side: 'right', sender: '정태성', text: '촬영 전 협조 요청과 지금 제안이 따로라고 보기 어렵습니다.' },
        ],
      },
    },
  },
  'e-5': {
    meta: {
      trustLevel: 'mid',
      trustLabel: '보통',
      source: 'third',
      sourceLabel: '제3자',
      legality: 'sus',
      legalLabel: '주의',
      stage: 2,
      stageLabel: '삭제 복구',
      sourceNote: '점주 단체방 캡처와 삭제 뒤 복구된 로그',
      redactions: ['차량 번호 일부', '점주 닉네임 일부'],
    },
    viewerData: {
      chat: {
        header: '점주 단체방 공유 캡처 복구본',
        messages: [
          { side: 'left', sender: '정태성', text: '저 사람 차량 번호는 이겁니다. 오늘 동선도 대충 보입니다.' },
          { side: 'left', sender: '점주A', text: '신고 넣으려면 플랫폼이랑 세무 쪽도 같이 봐야겠네요.' },
          { type: 'deleted', text: '삭제된 게시물 2건 복구됨' },
          { side: 'left', sender: '정태성', text: '영상 때문에 예약이 무너졌습니다. 그냥 두면 안 됩니다.' },
          { side: 'right', sender: '점주B', text: '반박은 하더라도 번호랑 동선 공유는 선 넘는 것 아닙니까.' },
        ],
      },
    },
  },
  'e-6': {
    meta: {
      trustLevel: 'high',
      trustLabel: '높음',
      source: 'org',
      sourceLabel: '기관',
      legality: 'ok',
      legalLabel: '적법',
      stage: 3,
      stageLabel: '확산 추적',
      sourceNote: '플랫폼 평점 하락 및 재게시 확산 시간대 로그',
      redactions: ['개별 리뷰어 계정 일부'],
    },
    viewerData: {
      sns: {
        username: '플랫폼 확산 추적',
        handle: '@review-trace',
        date: '2026.04.08',
        privacy: '내부 수집 로그',
        text: '영상 공개 후 평점 하락, 예약 취소, 커뮤니티 재게시가 4시간 안에 연쇄적으로 겹쳤습니다.',
        hashtags: ['#평점하락', '#재게시확산', '#예약취소'],
        likes: 0,
        comments: [
          { name: '플랫폼', text: '19:10 평점 4.6 → 3.9' },
          { name: '커뮤니티', text: '19:34 반박 게시 링크 재공유 시작' },
          { name: '예약시스템', text: '20:05 취소율 급증 감지' },
        ],
        warnings: [
          '영상 공개 직후와 점주 측 반격 직후에 확산 속도가 각각 한 번씩 급등했습니다.',
          '한쪽 행위만으로 설명되지 않고, A 공개와 B 반격이 순차적으로 파장을 키웠습니다.',
        ],
      },
    },
  },
}

for (const evidence of data.evidence || []) {
  const enrichment = enrichments[evidence.id]
  if (!enrichment) continue
  evidence.meta = enrichment.meta
  evidence.viewerData = enrichment.viewerData
}

fs.writeFileSync(CASE_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
console.log(`[headline-01] enriched runtime evidence viewer data in ${path.relative(ROOT, CASE_PATH)}`)
