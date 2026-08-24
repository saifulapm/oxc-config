import type { OxlintConfig } from 'oxlint'

import type { Rules } from '../types.ts'

export interface ReactOptions {
  /**
   * Enable jsx-a11y accessibility rules.
   * @default false
   */
  a11y?: boolean
  overrides?: Rules
}

export function react(options: ReactOptions = {}): Partial<OxlintConfig> {
  const { a11y = false, overrides = {} } = options

  return {
    plugins: a11y ? ['react', 'jsx-a11y'] : ['react'],
    rules: {
      // automatic JSX runtime — React import not required
      'react/react-in-jsx-scope': 'off',
      // real signal, but flags deliberate lazy-ref patterns — surface without failing
      'react/refs': 'warn',
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
