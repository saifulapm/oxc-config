import { describe, expect, it } from 'vitest'

import { saiful } from '../src/index.ts'

// Snapshot the resolved config per preset so every rule-set change shows up as a
// readable diff (pattern borrowed from antfu/eslint-config's factory snapshots).

const presets = {
  default: {},
  'full-on': {
    typescript: true,
    react: true,
    vue: true,
    svelte: true,
    astro: true,
    test: true,
    antiSlop: true,
    typeAware: true,
    type: 'lib',
  },
  'full-off': {
    typescript: false,
    react: false,
    vue: false,
    svelte: false,
    astro: false,
    test: false,
    antiSlop: false,
  },
  'react-app': { typescript: true, react: true, vue: false, svelte: false, astro: false },
  'in-editor': { isInEditor: true },
} satisfies Record<string, Parameters<typeof saiful>[0]>

describe('factory presets', () => {
  for (const [name, options] of Object.entries(presets)) {
    // oxlint-disable-next-line vitest/valid-title -- titles come from the preset table
    it(name, async () => {
      const config = saiful({ isInEditor: false, ...options })
      await expect(JSON.stringify(config, null, 2)).toMatchFileSnapshot(`__snapshots__/${name}.json`)
    })
  }
})

describe('factory behavior', () => {
  it('user configs win over module rules', () => {
    const config = saiful({ isInEditor: false }, { rules: { 'no-console': 'off' } })
    expect(config.rules?.['no-console']).toBe('off')
  })

  it('per-module overrides win over defaults', () => {
    const config = saiful({
      isInEditor: false,
      typescript: { overrides: { 'typescript/no-explicit-any': 'off' } },
    })
    expect(config.rules?.['typescript/no-explicit-any']).toBe('off')
  })

  it('editor mode softens disruptive rules', () => {
    const config = saiful({ isInEditor: true })
    expect(config.rules?.['no-unused-vars']).toEqual(['warn', expect.any(Object)])
  })

  it('anti-slop is skipped without typescript', () => {
    const config = saiful({ isInEditor: false, typescript: false })
    expect(config.jsPlugins ?? []).toEqual([])
  })

  it('user ignores are appended', () => {
    const config = saiful({ isInEditor: false, ignores: ['generated'] })
    expect(config.ignorePatterns).toContain('generated')
    expect(config.ignorePatterns).toContain('**/node_modules')
  })
})
