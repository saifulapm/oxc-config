import process from 'node:process'

import type { OxlintConfig } from 'oxlint'

import type { OptionsConfig, OptionsOverrides, Rules } from './types.ts'

// oxlint-disable-next-line anti-slop/no-unsafe-dictionary-type -- generic merge over arbitrary config keys
type ConfigRecord = Record<string, unknown>

const ARRAY_KEYS = new Set(['overrides', 'ignorePatterns', 'jsPlugins'])
const OBJECT_KEYS = new Set(['rules', 'globals', 'env', 'settings', 'categories', 'options'])

/**
 * Merge partial oxlint configs into one flat config.
 * Objects (rules, globals, env, settings, categories, options) shallow-merge with later
 * entries winning; arrays (overrides, ignorePatterns, jsPlugins) concatenate; plugins union.
 */
export function mergeConfigs(...configs: Partial<OxlintConfig>[]): OxlintConfig {
  const merged: ConfigRecord = {}
  for (const config of configs) {
    for (const [key, value] of Object.entries(config)) {
      if (value == null) continue
      const previous = merged[key]
      if (key === 'plugins') {
        // SAFETY: `plugins` is typed string[] on every input config
        merged[key] = [...new Set([...((previous as string[] | undefined) ?? []), ...(value as string[])])]
      } else if (ARRAY_KEYS.has(key)) {
        // SAFETY: these keys are typed as arrays on every input config
        merged[key] = [...((previous as unknown[] | undefined) ?? []), ...(value as unknown[])]
      } else if (OBJECT_KEYS.has(key)) {
        // SAFETY: these keys are typed as plain objects on every input config
        merged[key] = { ...(previous as ConfigRecord | undefined), ...(value as ConfigRecord) }
      } else {
        merged[key] = value
      }
    }
  }
  // SAFETY: every entry originates from a Partial<OxlintConfig>, merged per-key type-preservingly
  return merged as OxlintConfig
}

type SubOptionKeys = 'typescript' | 'react' | 'vue' | 'svelte' | 'astro' | 'test' | 'antiSlop'

export function resolveSubOptions<K extends SubOptionKeys>(
  options: OptionsConfig,
  key: K,
): Exclude<OptionsConfig[K], boolean | undefined> {
  const value = options[key]
  // oxlint-disable-next-line anti-slop/no-runtime-typeof -- this IS the boundary parser for `boolean | object` options
  const resolved = typeof value === 'boolean' || value == null ? {} : value
  // SAFETY: booleans and undefined are replaced by {} above, so only the object form remains
  return resolved as Exclude<OptionsConfig[K], boolean | undefined>
}

export function getOverrides(options: OptionsConfig, key: SubOptionKeys): Rules {
  // SAFETY: every sub-option object form extends OptionsOverrides
  const subOptions = resolveSubOptions(options, key) as OptionsOverrides
  return subOptions.overrides ?? {}
}

export function isInEditorEnv(): boolean {
  if (process.env.CI) return false
  if (isInGitHooksOrLintStaged()) return false
  return !!(
    process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM ||
    process.env.NVIM ||
    (process.env.ZED_ENVIRONMENT && !process.env.ZED_TERM)
  )
}

export function isInGitHooksOrLintStaged(): boolean {
  return !!(
    process.env.GIT_PARAMS ||
    process.env.VSCODE_GIT_COMMAND ||
    process.env.npm_lifecycle_script?.startsWith('lint-staged')
  )
}
