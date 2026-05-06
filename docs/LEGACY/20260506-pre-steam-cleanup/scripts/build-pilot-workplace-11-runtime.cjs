#!/usr/bin/env node
const path = require('path')
const { compileCore6Runtime } = require('./lib/core6-runtime-redesign.cjs')

const ROOT = path.join(__dirname, '..')
const result = compileCore6Runtime(ROOT, 'workplace-11')
console.log(`[build-pilot-workplace-11-runtime] wrote ${path.relative(ROOT, result.outPath).replace(/\\/g, '/')}`)
