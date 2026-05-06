#!/usr/bin/env node
const path = require('path')
const { buildWaveACase } = require('./lib/wave-a-case-builder.cjs')

const ROOT = path.join(__dirname, '..')
const result = buildWaveACase(ROOT, 'workplace-new-02')
console.log(`[build-pilot-workplace-new-02-runtime] wrote ${path.relative(ROOT, result.runtimeOutPath).replace(/\\/g, '/')}`)
