import type { OxlintConfig } from 'oxlint'

import { GLOB_TESTS } from '../globs.ts'
import type { Rules } from '../types.ts'

export interface AntiSlopOptions {
  overrides?: Rules
  /** Run all anti-slop rules at this severity. Use 'warn' while ratcheting legacy code. */
  severity?: 'error' | 'warn'
  specifier?: string
}

export function antiSlop(options: AntiSlopOptions = {}): Partial<OxlintConfig> {
  const { overrides = {}, severity = 'error', specifier = '@saifulapm/oxc-config/anti-slop' } = options

  return {
    jsPlugins: [{ name: 'anti-slop', specifier }],
    rules: {
      'anti-slop/no-chained-type-assertions': severity,
      'anti-slop/no-conditional-empty-object-spread': severity,
      'anti-slop/no-known-value-widening': severity,
      'anti-slop/no-module-mocking': severity,
      'anti-slop/no-object-parameters': severity,
      'anti-slop/no-reflect-apply': severity,
      'anti-slop/no-reflect-get': severity,
      'anti-slop/no-runtime-typeof': severity,
      'anti-slop/no-shape-in-symbol-names': severity,
      'anti-slop/no-unknown-parameters': severity,
      'anti-slop/no-unknown-returns': severity,
      'anti-slop/no-unknown-type-aliases': severity,
      'anti-slop/no-unsafe-dictionary-type': severity,
      'anti-slop/no-widen-then-assert': severity,
      'anti-slop/require-safety-comment-for-type-assertion': severity,
      ...overrides,
    },
    overrides: [
      {
        // mocking and looser typing are legitimate inside tests and test infrastructure
        files: [...GLOB_TESTS, '**/tests/**', '**/test/**', '**/*.setup.*'],
        rules: {
          'anti-slop/no-module-mocking': 'off',
          'anti-slop/no-unknown-parameters': 'off',
          'anti-slop/no-object-parameters': 'off',
          'anti-slop/require-safety-comment-for-type-assertion': 'off',
          // tests fabricate loose payloads and narrow them ad hoc by design
          'anti-slop/no-chained-type-assertions': 'off',
          'anti-slop/no-known-value-widening': 'off',
          'anti-slop/no-runtime-typeof': 'off',
          'anti-slop/no-unsafe-dictionary-type': 'off',
        },
      },
    ],
  }
}
