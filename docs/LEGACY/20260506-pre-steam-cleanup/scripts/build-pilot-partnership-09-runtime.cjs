#!/usr/bin/env node
const path = require('path')
const { compileCore6Runtime } = require('./lib/core6-runtime-redesign.cjs')

const ROOT = path.join(__dirname, '..')
const result = compileCore6Runtime(ROOT, 'partnership-09')
console.log(`[build-pilot-partnership-09-runtime] wrote ${path.relative(ROOT, result.outPath).replace(/\\/g, '/')}`)
