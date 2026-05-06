#!/usr/bin/env node
const path = require('path')
const { compileCore6Runtime } = require('./lib/core6-runtime-redesign.cjs')

const ROOT = path.join(__dirname, '..')
const result = compileCore6Runtime(ROOT, 'tenant-09')
console.log(`[build-pilot-tenant-09-runtime] wrote ${path.relative(ROOT, result.outPath).replace(/\\/g, '/')}`)
