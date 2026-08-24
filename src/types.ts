import type { DummyRule, DummyRuleMap, OxlintConfig, OxlintEnv, OxlintGlobals } from 'oxlint'

/**
 * Typed rule map, opened up so plugin-prefixed rules that oxlint doesn't know
 * statically (e.g. `anti-slop/*` from jsPlugins) can be configured too.
 */
export type Rules = DummyRuleMap & Record<string, DummyRule | undefined>

export interface OptionsOverrides {
  overrides?: Rules
}

export interface OptionsReact extends OptionsOverrides {
  /**
   * Enable jsx-a11y accessibility rules.
   * @default false
   */
  a11y?: boolean
}

export interface OptionsAntiSlop extends OptionsOverrides {
  /**
   * Run all anti-slop rules at this severity. Use 'warn' while ratcheting legacy code.
   * @default 'error'
   */
  severity?: 'error' | 'warn'

  /**
   * Module specifier oxlint should load the plugin from.
   * Defaults to the published package export; override for local development.
   * @default '@saifulapm/oxc-config/anti-slop'
   */
  specifier?: string
}

export interface OptionsConfig {
  /**
   * Auto-detected from the `typescript` package by default.
   */
  typescript?: boolean | OptionsOverrides

  /**
   * React rules (includes react-hooks; jsx-a11y via the `a11y` sub-option).
   * Auto-detected from the `react` package by default.
   */
  react?: boolean | OptionsReact

  /**
   * Vue rules + globals. Only `<script>` blocks are linted (oxc limitation).
   * Auto-detected from `vue` / `nuxt` / `vitepress` by default.
   */
  vue?: boolean | OptionsOverrides

  /**
   * Svelte globals + script-block linting. Auto-detected from `svelte`.
   */
  svelte?: boolean | OptionsOverrides

  /**
   * Astro globals + script-block linting. Auto-detected from `astro`.
   */
  astro?: boolean | OptionsOverrides

  /**
   * Vitest rules for test files. Auto-detected from `vitest` by default.
   */
  test?: boolean | OptionsOverrides

  /**
   * Bundled anti-slop rules (https://github.com/dmmulroy/anti-slop).
   * @default true
   */
  antiSlop?: boolean | OptionsAntiSlop

  /**
   * Enable type-aware rules. Requires `oxlint-tsgolint` and TypeScript 7+.
   * @default false
   */
  typeAware?: boolean

  /**
   * `lib` enables stricter API-surface rules (explicit return types).
   * @default 'app'
   */
  type?: 'app' | 'lib'

  /**
   * Extra gitignore-style patterns appended to the default excludes.
   */
  ignores?: string[]

  globals?: OxlintGlobals
  env?: OxlintEnv

  /**
   * Softens rules that are disruptive mid-edit (unused vars, focused tests).
   * Auto-detected from editor environment variables by default.
   */
  isInEditor?: boolean
}

export type { OxlintConfig }
