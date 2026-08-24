import type { OxlintConfig } from 'oxlint'

import { GLOB_ASTRO, GLOB_SVELTE, GLOB_VUE } from '../globs.ts'
import type { Rules } from '../types.ts'

export interface FrameworkOptions {
  overrides?: Rules
}

// Oxlint lints only <script> blocks of SFC files today (no template linting yet).
// These configs wire up the framework globals/envs and per-file relaxations so the
// consumer API is stable when oxc ships template support.

export function vue(options: FrameworkOptions = {}): Partial<OxlintConfig> {
  const { overrides = {} } = options

  return {
    plugins: ['vue'],
    overrides: [
      {
        files: [GLOB_VUE],
        env: { vue: true },
        rules: {
          'no-unused-vars': 'off',
          'no-undef': 'off',
          'import/first': 'off',
          ...overrides,
        },
      },
    ],
  }
}

export function svelte(options: FrameworkOptions = {}): Partial<OxlintConfig> {
  const { overrides = {} } = options

  return {
    overrides: [
      {
        files: [GLOB_SVELTE],
        env: { svelte: true },
        rules: {
          'no-unused-vars': 'off',
          'no-undef': 'off',
          'prefer-const': 'off',
          ...overrides,
        },
      },
    ],
  }
}

export function astro(options: FrameworkOptions = {}): Partial<OxlintConfig> {
  const { overrides = {} } = options

  return {
    overrides: [
      {
        files: [GLOB_ASTRO],
        env: { astro: true },
        rules: {
          'no-unused-vars': 'off',
          ...overrides,
        },
      },
    ],
  }
}
