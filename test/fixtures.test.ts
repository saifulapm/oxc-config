import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

import { expect, it } from 'vitest'

const fixtureDir = fileURLToPath(new URL('../fixtures/basic', import.meta.url))
const oxlintBin = fileURLToPath(new URL('../node_modules/.bin/oxlint', import.meta.url))

interface OxlintReport {
  diagnostics: { code: string; filename: string }[]
}

it('oxlint reports the expected rules on the fixture project', () => {
  let stdout = ''
  try {
    stdout = execFileSync(oxlintBin, ['--format', 'json', '.'], {
      cwd: fixtureDir,
      encoding: 'utf8',
    })
  } catch (error) {
    // oxlint exits non-zero when it finds errors; the JSON is still on stdout
    stdout = (error as { stdout?: string }).stdout ?? ''
  }

  const report = JSON.parse(stdout) as OxlintReport
  const fired = new Set(report.diagnostics.map((diagnostic) => diagnostic.code))

  expect(fired).toContain('typescript(no-explicit-any)')
  expect(fired).toContain('eslint(no-console)')
  expect(fired).toContain('eslint(eqeqeq)')
  expect(fired).toContain('eslint(no-var)')
  expect(fired).toContain('anti-slop(no-chained-type-assertions)')
})
