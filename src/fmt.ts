import type { OxfmtConfig } from 'oxfmt'

/**
 * Shared oxfmt config, antfu-flavored: no semicolons, single quotes, 2-space indent.
 * Use in `oxfmt.config.ts`:
 *
 * ```ts
 * import { fmt } from '@saifulapm/oxc-config/fmt'
 * export default fmt()
 * ```
 */
export function fmt(options: OxfmtConfig = {}): OxfmtConfig {
  return {
    semi: false,
    singleQuote: true,
    printWidth: 120,
    tabWidth: 2,
    trailingComma: 'all',
    experimentalSortImports: {},
    experimentalSortPackageJson: true,
    ignorePatterns: ['**/pnpm-lock.yaml', '**/CHANGELOG*.md', '**/*.min.*', '**/__snapshots__'],
    ...options,
  }
}

export default fmt
