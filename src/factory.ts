import { isPackageExists } from 'local-pkg'
import type { OxlintConfig } from 'oxlint'

import { antiSlop } from './configs/anti-slop.ts'
import { disables } from './configs/disables.ts'
import { astro, svelte, vue } from './configs/frameworks.ts'
import { ignores } from './configs/ignores.ts'
import { javascript } from './configs/javascript.ts'
import { react } from './configs/react.ts'
import { test } from './configs/test.ts'
import { typescript } from './configs/typescript.ts'
import type { OptionsConfig } from './types.ts'
import { getOverrides, isInEditorEnv, mergeConfigs, resolveSubOptions } from './utils.ts'

const VUE_PACKAGES = ['vue', 'nuxt', 'vitepress']

/**
 * Build a complete oxlint config. Use directly in `oxlint.config.ts`:
 *
 * ```ts
 * import saiful from '@saifulapm/oxc-config'
 * export default saiful({ react: true })
 * ```
 */
export function saiful(options: OptionsConfig = {}, ...userConfigs: Partial<OxlintConfig>[]): OxlintConfig {
  const {
    typescript: enableTs = isPackageExists('typescript'),
    react: enableReact = isPackageExists('react'),
    vue: enableVue = VUE_PACKAGES.some((pkg) => isPackageExists(pkg)),
    svelte: enableSvelte = isPackageExists('svelte'),
    astro: enableAstro = isPackageExists('astro'),
    test: enableTest = isPackageExists('vitest'),
    antiSlop: enableAntiSlop = true,
    typeAware = false,
    type = 'app',
    isInEditor = isInEditorEnv(),
  } = options

  const configs: Partial<OxlintConfig>[] = [
    ignores(options.ignores),
    javascript({ isInEditor, env: options.env, globals: options.globals }),
  ]

  if (enableTs) {
    configs.push(
      typescript({
        overrides: getOverrides(options, 'typescript'),
        type,
        typeAware,
      }),
    )
  }

  if (enableReact) configs.push(react({ overrides: getOverrides(options, 'react') }))

  if (enableVue) configs.push(vue({ overrides: getOverrides(options, 'vue') }))

  if (enableSvelte) configs.push(svelte({ overrides: getOverrides(options, 'svelte') }))

  if (enableAstro) configs.push(astro({ overrides: getOverrides(options, 'astro') }))

  if (enableTest) configs.push(test({ isInEditor, overrides: getOverrides(options, 'test') }))

  if (enableAntiSlop && enableTs) {
    configs.push(
      antiSlop({
        overrides: getOverrides(options, 'antiSlop'),
        specifier: resolveSubOptions(options, 'antiSlop').specifier,
      }),
    )
  }

  configs.push(disables())

  return mergeConfigs(...configs, ...userConfigs)
}
