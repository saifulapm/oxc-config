import type { OxlintConfig } from 'oxlint'

import { GLOB_CONFIGS, GLOB_JS, GLOB_SCRIPTS } from '../globs.ts'

export function disables(): Partial<OxlintConfig> {
  return {
    overrides: [
      {
        files: GLOB_SCRIPTS,
        rules: {
          'no-console': 'off',
          'typescript/explicit-function-return-type': 'off',
        },
      },
      {
        files: GLOB_CONFIGS,
        rules: {
          'no-console': 'off',
          'import/no-default-export': 'off',
          'typescript/explicit-function-return-type': 'off',
        },
      },
      {
        files: [GLOB_JS],
        rules: {
          'typescript/no-require-imports': 'off',
        },
      },
    ],
  }
}
