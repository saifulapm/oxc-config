import type { OxlintConfig } from 'oxlint'

import { GLOB_DTS } from '../globs.ts'
import type { Rules } from '../types.ts'

export interface TypescriptOptions {
  overrides?: Rules
  type?: 'app' | 'lib'
  typeAware?: boolean
}

export function typescript(options: TypescriptOptions = {}): Partial<OxlintConfig> {
  const { overrides = {}, type = 'app', typeAware = false } = options

  const rules: Rules = {
    'typescript/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
    'typescript/consistent-type-definitions': ['error', 'interface'],
    'typescript/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      },
    ],
    'typescript/no-dynamic-delete': 'error',
    'typescript/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
    'typescript/no-explicit-any': 'error',
    'typescript/no-extraneous-class': 'error',
    'typescript/no-import-type-side-effects': 'error',
    'typescript/no-invalid-void-type': 'error',
    'typescript/no-non-null-assertion': 'warn',
    'typescript/no-require-imports': 'error',
    'typescript/no-unsafe-function-type': 'error',
    'typescript/no-wrapper-object-types': 'error',
    'typescript/prefer-as-const': 'error',
    'typescript/prefer-literal-enum-member': 'error',
    'typescript/unified-signatures': 'error',
  }

  if (type === 'lib') {
    rules['typescript/explicit-function-return-type'] = [
      'error',
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowIIFEs: true,
      },
    ]
  }

  Object.assign(rules, overrides)

  const config: Partial<OxlintConfig> = {
    plugins: ['typescript'],
    rules,
    overrides: [
      {
        files: [GLOB_DTS],
        rules: {
          'no-unused-vars': 'off',
          'import/no-duplicates': 'off',
          'typescript/no-explicit-any': 'off',
          // `export {}` is what makes a declaration file a module — never "useless"
          'typescript/no-useless-empty-export': 'off',
        },
      },
    ],
  }

  if (typeAware) config.options = { typeAware: true }

  return config
}
