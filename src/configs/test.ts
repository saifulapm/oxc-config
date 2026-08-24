import type { OxlintConfig } from 'oxlint'

import { GLOB_TESTS } from '../globs.ts'
import type { Rules } from '../types.ts'

export interface TestOptions {
  isInEditor?: boolean
  overrides?: Rules
}

export function test(options: TestOptions = {}): Partial<OxlintConfig> {
  const { isInEditor = false, overrides = {} } = options

  return {
    plugins: ['vitest'],
    overrides: [
      {
        files: GLOB_TESTS,
        env: { vitest: true },
        rules: {
          'vitest/no-identical-title': 'error',
          'vitest/no-import-node-test': 'error',
          'vitest/no-focused-tests': isInEditor ? 'warn' : 'error',
          'vitest/prefer-hooks-in-order': 'error',
          'vitest/prefer-lowercase-title': 'error',
          'no-unused-expressions': 'off',
          'no-console': 'off',
          'typescript/no-explicit-any': 'off',
          'typescript/no-non-null-assertion': 'off',
          ...overrides,
        },
      },
    ],
  }
}
