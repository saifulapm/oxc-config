import type { OxlintConfig } from 'oxlint'

import type { Rules } from '../types.ts'

export interface ReactOptions {
  overrides?: Rules
}

export function react(options: ReactOptions = {}): Partial<OxlintConfig> {
  const { overrides = {} } = options

  return {
    plugins: ['react', 'react-perf', 'jsx-a11y'],
    rules: {
      'react/rules-of-hooks': 'error',
      'react/exhaustive-deps': 'warn',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-key': 'error',
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-target-blank': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
      'react/no-array-index-key': 'warn',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-string-refs': 'error',
      'react/self-closing-comp': 'error',
      'react/void-dom-elements-no-children': 'error',
      ...overrides,
    },
  }
}
