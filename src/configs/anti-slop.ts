import type { OxlintConfig } from 'oxlint'

import { GLOB_TESTS } from '../globs.ts'
import type { Rules } from '../types.ts'

export interface AntiSlopOptions {
  overrides?: Rules
  specifier?: string
}

export function antiSlop(options: AntiSlopOptions = {}): Partial<OxlintConfig> {
  const { overrides = {}, specifier = '@saifulapm/oxc-config/anti-slop' } = options

  return {
    jsPlugins: [{ name: 'anti-slop', specifier }],
    rules: {
      'anti-slop/no-chained-type-assertions': 'error',
      'anti-slop/no-conditional-empty-object-spread': 'error',
      'anti-slop/no-known-value-widening': 'error',
      'anti-slop/no-module-mocking': 'error',
      'anti-slop/no-object-parameters': 'error',
      'anti-slop/no-reflect-apply': 'error',
      'anti-slop/no-reflect-get': 'error',
      'anti-slop/no-runtime-typeof': 'error',
      'anti-slop/no-shape-in-symbol-names': 'error',
      'anti-slop/no-unknown-parameters': 'error',
      'anti-slop/no-unknown-returns': 'error',
      'anti-slop/no-unknown-type-aliases': 'error',
      'anti-slop/no-unsafe-dictionary-type': 'error',
      'anti-slop/no-widen-then-assert': 'error',
      'anti-slop/require-safety-comment-for-type-assertion': 'error',
      ...overrides,
    },
    overrides: [
      {
        // mocking and looser typing are legitimate inside tests
        files: GLOB_TESTS,
        rules: {
          'anti-slop/no-module-mocking': 'off',
          'anti-slop/no-unknown-parameters': 'off',
          'anti-slop/no-object-parameters': 'off',
          'anti-slop/require-safety-comment-for-type-assertion': 'off',
        },
      },
    ],
  }
}
