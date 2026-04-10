import prototypeHtml from '../../../../pc-prototype/index.html?raw'

function extractBlock(pattern: RegExp, label: string): string {
  const match = prototypeHtml.match(pattern)
  if (!match?.[1]) {
    throw new Error(`Failed to extract ${label} from pc-prototype/index.html`)
  }
  return match[1].trim()
}

export const PROTOTYPE_CSS = extractBlock(/<style>([\s\S]*?)<\/style>/, 'prototype CSS')

export const PROTOTYPE_SVG_DEFS = extractBlock(
  /<svg style="position:absolute;width:0;height:0">\s*<defs>([\s\S]*?)<\/defs>/,
  'prototype SVG defs',
)
