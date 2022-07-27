#!/usr/bin/env node
import { copyFile, rm } from 'fs/promises'
import { join } from 'path'
import vite from 'vite'

import { SRC, DIST } from './lib/dir.js'

async function cleanBuildDir() {
  await rm(join(DIST, '*'), { force: true, recursive: true })
}

async function build() {
  await cleanBuildDir()
  await vite.build({
    mode: 'production'
  })
  await Promise.all([
    copyFile(join(SRC, 'base', 'logo.svg'), join(DIST, 'logo.svg')),
    copyFile(join(SRC, 'base', 'logo-leftp.svg'), join(DIST, 'logo-leftp.svg'))
  ])
}

build().catch(e => {
  if (e.stack) {
    process.stderr.write(e.stack + '\n')
  } else {
    process.stderr.write(e + '\n')
  }
  process.exit(1)
})
