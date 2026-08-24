# @saifulapm/oxc-config

Saiful's shareable [Oxlint](https://oxc.rs) + [Oxfmt](https://oxc.rs) config — an antfu-style
factory with the [anti-slop](https://github.com/dmmulroy/anti-slop) rules bundled in.

- One factory call per project, everything else auto-detected (TypeScript, React, Vue, Svelte, Astro, Vitest)
- 300+ native rules, zero plugin dependencies
- anti-slop's 15 AI-slop guardrails run as a bundled oxlint JS plugin — no per-repo vendoring
- Matching oxfmt config: no semicolons, single quotes, import sorting, package.json sorting
- Editor-aware: disruptive rules (unused vars, focused tests) soften to warnings while editing

## Setup

```sh
pnpm add -D oxlint oxfmt @saifulapm/oxc-config
```

`oxlint.config.ts`:

```ts
import saiful from '@saifulapm/oxc-config'

export default saiful({
  // everything is auto-detected; set options only to override
  ignores: ['generated/**'],
})
```

`oxfmt.config.ts`:

```ts
import { fmt } from '@saifulapm/oxc-config/fmt'

export default fmt()
```

`package.json` scripts:

```json
{
  "lint": "oxlint",
  "fmt": "oxfmt"
}
```

## Options

```ts
export default saiful(
  {
    typescript: true, // auto: typescript installed
    react: { overrides: { 'react/no-array-index-key': 'off' } },
    vue: false, // auto: vue/nuxt/vitepress installed (script blocks only — oxc has no template linting yet)
    svelte: false, // auto: svelte installed
    astro: false, // auto: astro installed
    test: true, // auto: vitest installed
    antiSlop: true, // default on (requires typescript)
    typeAware: false, // needs `oxlint-tsgolint` + TS 7
    type: 'app', // 'lib' adds explicit-function-return-type
    ignores: [],
    globals: { shopify: 'readonly' },
  },
  // extra partial configs, merged last (highest priority)
  { rules: { 'no-console': 'off' } },
)
```

Merge semantics: later entries win for `rules`/`globals`/`env`/`settings`/`categories`/`options`;
`overrides`/`ignorePatterns`/`jsPlugins` concatenate; `plugins` union.

## anti-slop

The generic rules from [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) are vendored
under `src/plugins/anti-slop` (MIT) and exposed as `@saifulapm/oxc-config/anti-slop`. All 15 are
enabled as errors by default; mocking/loose-typing rules are relaxed in test files. Disable with
`antiSlop: false` or tune with `antiSlop: { overrides: { ... } }`.

## Development

```sh
pnpm typecheck
pnpm lint        # self-hosted: lints this repo with its own config
pnpm fmt
pnpm test        # factory snapshots + end-to-end fixture lint
pnpm test:rules  # vendored anti-slop RuleTester suites
pnpm build       # tsdown → dist/
```

Rule-set changes show up as readable diffs in `test/__snapshots__/*.json` — review them like
lockfile diffs.
