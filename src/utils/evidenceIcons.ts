/**
 * 증거 유형별 아이콘 매핑
 * MS Fluent Emoji 기반 PNG (public/emoji/evidence_*.png)
 */

const TYPE_TO_ICON: Record<string, string> = {
  // 대화/소셜
  chat: '/emoji/evidence_chat.png',
  sns: '/emoji/evidence_chat.png',
  social_post: '/emoji/evidence_chat.png',

  // 문서
  document: '/emoji/evidence_document.png',
  institutional_note: '/emoji/evidence_document.png',
  record: '/emoji/evidence_document.png',
  contract: '/emoji/evidence_document.png',
  incident_report: '/emoji/evidence_document.png',
  spreadsheet: '/emoji/evidence_document.png',

  // 금융
  bank: '/emoji/evidence_bank.png',
  financial_record: '/emoji/evidence_bank.png',
  receipt: '/emoji/evidence_bank.png',
  estimate: '/emoji/evidence_bank.png',

  // 이메일
  email: '/emoji/evidence_email.png',

  // 디지털 로그
  platform_log: '/emoji/evidence_digital.png',
  cloud_log: '/emoji/evidence_digital.png',
  device_log: '/emoji/evidence_digital.png',
  delivery_record: '/emoji/evidence_digital.png',

  // 사진/영상
  photo: '/emoji/evidence_photo.png',
  photo_video: '/emoji/evidence_photo.png',
  cctv: '/emoji/evidence_photo.png',
  video: '/emoji/evidence_photo.png',
  dashcam: '/emoji/evidence_photo.png',

  // 접근/보안 기록
  access_log: '/emoji/evidence_access.png',
  security_log: '/emoji/evidence_access.png',

  // 음성
  audio: '/emoji/evidence_audio.png',
  audio_report: '/emoji/evidence_audio.png',

  // 감정/조사
  forensic_report: '/emoji/evidence_forensic.png',
  inspection_report: '/emoji/evidence_forensic.png',
  medical_record: '/emoji/evidence_forensic.png',

  // 기타
  mixed: '/emoji/evidence_misc.png',
  schedule: '/emoji/evidence_misc.png',
  repair_record: '/emoji/evidence_misc.png',
  complaint_log: '/emoji/evidence_misc.png',
}

export function getEvidenceIcon(type: string): string {
  return TYPE_TO_ICON[type] ?? '/emoji/evidence_misc.png'
}

export function getEvidenceIconEmoji(type: string): string {
  const map: Record<string, string> = {
    chat: '💬', sns: '💬', social_post: '💬',
    document: '📄', institutional_note: '📄', record: '📄', contract: '📄',
    bank: '🏦', financial_record: '🏦', receipt: '🏦',
    email: '📧',
    platform_log: '💻', cloud_log: '💻', device_log: '💻',
    photo: '📷', cctv: '📷', video: '📷',
    access_log: '🔐', security_log: '🔐',
    audio: '🔊',
    forensic_report: '🔬', medical_record: '🔬',
  }
  return map[type] ?? '📋'
}
