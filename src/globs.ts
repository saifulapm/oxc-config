export const GLOB_JS = '**/*.{js,mjs,cjs}'
export const GLOB_JSX = '**/*.{jsx,tsx}'
export const GLOB_TS = '**/*.{ts,mts,cts}'
export const GLOB_TSX = '**/*.tsx'
export const GLOB_SRC = '**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'
export const GLOB_DTS = '**/*.d.{ts,mts,cts}'

export const GLOB_VUE = '**/*.vue'
export const GLOB_SVELTE = '**/*.svelte'
export const GLOB_ASTRO = '**/*.astro'

export const GLOB_TESTS = [
  '**/__tests__/**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
  '**/*.spec.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
  '**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
  '**/*.bench.{js,mjs,cjs,jsx,ts,mts,cts,tsx}',
]

export const GLOB_SCRIPTS = ['**/scripts/**', '**/cli/**', '**/bin/**', '**/bin.*']

export const GLOB_CONFIGS = ['**/*.config.*', '**/*.config.*.*', '**/.*rc.{js,mjs,cjs,ts}']

// gitignore-style patterns for `ignorePatterns`
export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',
  '**/build',
  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.cache',
  '**/.output',
  '**/.next',
  '**/.nuxt',
  '**/.svelte-kit',
  '**/.astro',
  '**/.vercel',
  '**/.wrangler',
  '**/.shopify',
  '**/.react-router',
  '**/.yarn',
  '**/.vite-inspect',
  '**/vite.config.*.timestamp-*',
  '**/*.min.*',
  '**/__snapshots__',
  '**/auto-imports.d.ts',
  '**/components.d.ts',
  '**/worker-configuration.d.ts',
]
