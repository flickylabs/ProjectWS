const WITNESS_PORTRAIT_BASE = '/assets/character/witness'

const WITNESS_PORTRAITS_BY_ID: Record<string, Record<string, string>> = {
  'spouse-01': {
    'w-1': 'spouse-01-w1-security-guard.png',
    'w-2': 'spouse-01-w2-bank-clerk.png',
    'w-3': 'spouse-01-w3-cafe-owner.png',
  },
  'family-01': {
    'w-1': 'family-01-w1-choi-boksoon.png',
    'w-2': 'family-01-w2-kim-youngsoo.png',
    'w-3': 'family-01-w3-park-soonae.png',
  },
  'friend-01': {
    'w-1': 'friend-01-w1-kim-sera.png',
    'w-2': 'friend-01-w2-park-junhyuk.png',
    'w-3': 'friend-01-w3-oh-mikyung.png',
  },
}

const WITNESS_PORTRAITS_BY_NAME: Record<string, string> = {
  '오피스텔 경비': 'spouse-01-w1-security-guard.png',
  '은행 직원': 'spouse-01-w2-bank-clerk.png',
  '박미라': 'spouse-01-w3-cafe-owner.png',
  '최복순': 'family-01-w1-choi-boksoon.png',
  '김영수': 'family-01-w2-kim-youngsoo.png',
  '박순애': 'family-01-w3-park-soonae.png',
  '김세라': 'friend-01-w1-kim-sera.png',
  '박준혁': 'friend-01-w2-park-junhyuk.png',
  '오미경': 'friend-01-w3-oh-mikyung.png',
}

function normalizeCaseId(caseId?: string | null) {
  return caseId?.replace(/^case-/, '') ?? ''
}

export function getWitnessPortraitPath(caseId?: string | null, witnessId?: string | null, witnessName?: string | null) {
  const normalizedCaseId = normalizeCaseId(caseId)
  const fileName = (witnessId ? WITNESS_PORTRAITS_BY_ID[normalizedCaseId]?.[witnessId] : undefined)
    ?? (witnessName ? WITNESS_PORTRAITS_BY_NAME[witnessName] : undefined)

  return fileName ? `${WITNESS_PORTRAIT_BASE}/${fileName}` : null
}
