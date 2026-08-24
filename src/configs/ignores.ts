import type { OxlintConfig } from 'oxlint'

import { GLOB_EXCLUDE } from '../globs.ts'

export function ignores(userIgnores: string[] = []): Partial<OxlintConfig> {
  return {
    ignorePatterns: [...GLOB_EXCLUDE, ...userIgnores],
  }
}
