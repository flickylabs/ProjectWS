function cleanJudgeReference(value) {
  return String(value || '')
    .replace(/\r/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeJudgeReference(value) {
  return cleanJudgeReference(value).replace(/\s+/g, '')
}

function isGenericJudgeReference(value) {
  const cleaned = cleanJudgeReference(value)
  const normalized = normalizeJudgeReference(value)
  if (!cleaned) return true
  if (/^\uD574\uB2F9\s+/u.test(cleaned)) return true
  return [
    '\uC0C1\uB300\uBC29',
    '\uC0C1\uB300',
    '\uADF8\uCABD',
    '\uC0C1\uB300\uCE21',
    '\uC0C1\uB300\uB2D8',
    '\uB2F9\uC0AC\uC790',
    '\uD574\uB2F9\uB2F9\uC0AC\uC790',
    '\uD574\uB2F9\uC778\uBB3C',
    '\uD574\uB2F9\uBD84',
  ].includes(normalized)
}

function looksLikeJudgeAddress(value) {
  const cleaned = cleanJudgeReference(value)
  return [
    '\uC7AC\uD310\uAD00\uB2D8',
    '\uC7AC\uD310\uBD80\uB2D8',
    '\uD310\uC0AC\uB2D8',
    '\uC7AC\uD310\uAD00',
    '\uC7AC\uD310\uBD80',
    '\uD310\uC0AC',
  ].some((term) => cleaned.includes(term))
}

function containsFalseAmountToken(value) {
  return /(?<![가-힣A-Za-z0-9])(?:\d[\d,.]*|[\uC77C\uC774\uC0BC\uC0AC\uC624\uC721\uCE60\uD314\uAD6C\uC2ED\uBC31\uCC9C]+)\s*\uC6D0(?![가-힣A-Za-z0-9])/u.test(cleanJudgeReference(value))
}

function normalizeRoleLabel(roleText) {
  return cleanJudgeReference(roleText)
    .replace(/^(?:\uD574\uB2F9|\uC0C1\uB300|\uADF8)\s+/u, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function roleBackedFallback(role) {
  const normalized = normalizeRoleLabel(role)
  if (!normalized) return ''
  if (/^(?:\uB0A8\uD3B8|\uC544\uB0B4|\uBC30\uC6B0\uC790|\uCE5C\uAD6C|\uB3D9\uC5C5\uC790|\uC774\uC6C3|\uC606\uC9D1 \uBD84|\uC9D1\uC8FC\uC778|\uC138\uC785\uC790)$/u.test(normalized)) {
    return normalized
  }
  return `\uADF8 ${normalized}`
}

function categoryFallback(relationshipType, role) {
  const roleFallback = roleBackedFallback(role)
  if (roleFallback) return roleFallback

  const map = {
    spouse: '\uC81C \uBC30\uC6B0\uC790',
    family: '\uC800\uD76C \uAC00\uC871',
    friend: '\uC81C \uCE5C\uAD6C',
    neighbor: '\uC606\uC9D1 \uBD84',
    partnership: '\uC81C \uB3D9\uC5C5\uC790',
    tenant_landlord: '\uC0C1\uB300 \uC784\uB300\uCC28 \uB2F9\uC0AC\uC790',
    boss_employee: '\uADF8 \uC9C1\uC7A5 \uB2F9\uC0AC\uC790',
    civic: '\uADF8 \uB2F9\uC0AC\uC790',
    professional: '\uADF8 \uC5C5\uBB34 \uB2F9\uC0AC\uC790',
    online: '\uADF8 \uC6B4\uC601\uC790',
    headline: '\uADF8 \uB2F9\uC0AC\uC790',
  }
  return map[relationshipType] || '\uADF8 \uB2F9\uC0AC\uC790'
}

function compactRoleReference(role) {
  const normalized = normalizeRoleLabel(role)
  if (!normalized) return ''

  const compactMap = [
    [/\uC2E0\uCCAD\uC790$/u, '\uC2E0\uCCAD\uC778'],
    [/\uC2E0\uCCAD\uC778$/u, '\uC2E0\uCCAD\uC778'],
    [/\uC218\uAE09\uC790$/u, '\uC218\uAE09\uC790'],
    [/\uC9C0\uC6D0\s*\uB2F4\uB2F9$/u, '\uB2F4\uB2F9\uC790'],
    [/\uC8FC\uAC70\uC9C0\uC6D0\s*\uB2F4\uB2F9$/u, '\uB2F4\uB2F9\uC790'],
    [/\uBCF5\uC9C0\s*\uB2F4\uB2F9$/u, '\uB2F4\uB2F9\uC790'],
    [/\uC6B4\uC601\s*\uB2F4\uB2F9$/u, '\uB2F4\uB2F9\uC790'],
    [/\uC704\uD0C1?\uC2EC\uC0AC\uC6D0$/u, '\uC2EC\uC0AC\uC6D0'],
    [/\uC2EC\uC0AC\uC6D0$/u, '\uC2EC\uC0AC\uC6D0'],
    [/\uC6B4\uC601\uC790$/u, '\uC6B4\uC601\uC790'],
    [/\uACFC\uC7A5$/u, '\uACFC\uC7A5'],
    [/\uBD80\uC7A5$/u, '\uBD80\uC7A5'],
    [/\uD300\uC7A5$/u, '\uD300\uC7A5'],
    [/\uB9E4\uB2C8\uC800$/u, '\uB9E4\uB2C8\uC800'],
    [/\uAD00\uB9AC\uC790$/u, '\uAD00\uB9AC\uC790'],
    [/\uB2F4\uB2F9\uC790$/u, '\uB2F4\uB2F9\uC790'],
    [/\uC0C1\uB2F4\uC0AC$/u, '\uC0C1\uB2F4\uC0AC'],
    [/\uC870\uC0AC\uAD00$/u, '\uC870\uC0AC\uAD00'],
    [/\uAE30\uC790$/u, '\uAE30\uC790'],
    [/\uC758\uC0AC$/u, '\uC758\uC0AC'],
    [/\uAC15\uC0AC$/u, '\uAC15\uC0AC'],
    [/\uAD50\uC0AC$/u, '\uAD50\uC0AC'],
    [/CEO$/u, 'CEO'],
    [/CFO$/u, 'CFO'],
    [/PM$/u, 'PM'],
    [/AE$/u, 'AE'],
    [/PD$/u, 'PD'],
    [/\uB9AC\uD06C\uB8E8\uD130$/u, '\uB9AC\uD06C\uB8E8\uD130'],
    [/\uB3D9\uC5C5\uC790$/u, '\uB3D9\uC5C5\uC790'],
    [/\uC138\uC785\uC790$/u, '\uC138\uC785\uC790'],
    [/\uC9D1\uC8FC\uC778$/u, '\uC9D1\uC8FC\uC778'],
  ]

  for (const [pattern, replacement] of compactMap) {
    if (pattern.test(normalized)) {
      if (!containsFalseAmountToken(`\uADF8 ${replacement}`)) return replacement
    }
  }

  const parts = normalized.split(/\s+/u).filter(Boolean)
  if (parts.length >= 2) {
    const tail = parts.slice(-2).join(' ')
    if (!containsFalseAmountToken(`\uADF8 ${tail}`)) return tail
  }
  if (parts.length >= 1) {
    const tail = parts[parts.length - 1]
    if (!containsFalseAmountToken(`\uADF8 ${tail}`)) return tail
  }

  const stripped = normalized
    .replace(/\uC9C0\uC790\uCCB4/gu, '')
    .replace(/\uC5D0\uB108\uC9C0\uC9C0\uC6D0/gu, '')
    .replace(/\uC9C0\uC6D0/gu, '')
    .replace(/\uC704\uD0C1/gu, '')
    .replace(/\uC678\uBD80/gu, '')
    .replace(/\s+/gu, ' ')
    .trim()
  return stripped || normalized
}

function deriveRelationshipSpecificJudgeReference({ otherRole, relationshipType }) {
  const role = normalizeRoleLabel(otherRole)
  const compactRole = compactRoleReference(role)

  if (relationshipType === 'spouse') {
    if (/\uB0A8\uD3B8/u.test(role)) return '\uC81C \uB0A8\uD3B8'
    if (/\uC544\uB0B4/u.test(role)) return '\uC81C \uC544\uB0B4'
    return '\uC81C \uBC30\uC6B0\uC790'
  }
  if (relationshipType === 'family') {
    if (/^(?:\uC544\uBC84\uC9C0|\uC5B4\uBA38\uB2C8|\uB204\uB098|\uD615|\uC5B8\uB2C8|\uB3D9\uC0DD|\uC624\uBE60|\uC790\uB140)$/u.test(role)) return role
    return '\uC800\uD76C \uAC00\uC871'
  }
  if (relationshipType === 'friend') return '\uC81C \uCE5C\uAD6C'
  if (relationshipType === 'neighbor') return '\uC606\uC9D1 \uBD84'
  if (relationshipType === 'partnership') return '\uC81C \uB3D9\uC5C5\uC790'
  if (relationshipType === 'tenant_landlord') {
    if (/\uC9D1\uC8FC\uC778|\uC784\uB300\uC778|\uAC74\uBB3C\uC8FC/u.test(role)) return '\uC9D1\uC8FC\uC778'
    if (/\uC138\uC785\uC790|\uC784\uCC28\uC778/u.test(role)) return '\uC138\uC785\uC790'
    return '\uC0C1\uB300 \uC784\uB300\uCC28 \uB2F9\uC0AC\uC790'
  }
  if (relationshipType === 'boss_employee') {
    if (/\uD300\uC7A5|\uBD80\uC7A5|\uACFC\uC7A5|\uB9E4\uB2C8\uC800|\uB9AC\uB4DC/u.test(role)) return `\uADF8 ${compactRole || role}`
    if (/\uC9C1\uC6D0|\uD300\uC6D0|\uC0AC\uC6D0/u.test(role)) return `\uADF8 ${compactRole || role}`
    return '\uADF8 \uC9C1\uC7A5 \uB2F9\uC0AC\uC790'
  }
  if (compactRole) {
    const roleBacked = `\uADF8 ${compactRole}`
    if (
      !isGenericJudgeReference(roleBacked) &&
      !looksLikeJudgeAddress(roleBacked) &&
      !containsFalseAmountToken(roleBacked)
    ) {
      return roleBacked
    }
  }
  return categoryFallback(relationshipType, compactRole || role)
}

function pickJudgeReference(candidate, { otherRole, relationshipType }) {
  const cleaned = cleanJudgeReference(candidate)
  if (
    cleaned &&
    !isGenericJudgeReference(cleaned) &&
    !looksLikeJudgeAddress(cleaned) &&
    !containsFalseAmountToken(cleaned)
  ) {
    return normalizeRoleLabel(cleaned)
  }

  const derived = deriveRelationshipSpecificJudgeReference({ otherRole, relationshipType })
  if (
    derived &&
    !isGenericJudgeReference(derived) &&
    !looksLikeJudgeAddress(derived) &&
    !containsFalseAmountToken(derived)
  ) {
    return normalizeRoleLabel(derived)
  }

  const compactRole = compactRoleReference(otherRole)
  if (compactRole) return normalizeRoleLabel(`\uADF8 ${compactRole}`)
  return normalizeRoleLabel(categoryFallback(relationshipType, otherRole))
}

module.exports = {
  cleanJudgeReference,
  isGenericJudgeReference,
  looksLikeJudgeAddress,
  containsFalseAmountToken,
  normalizeRoleLabel,
  deriveRelationshipSpecificJudgeReference,
  pickJudgeReference,
}
