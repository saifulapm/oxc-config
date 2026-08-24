import { defineConfig } from 'oxlint'

import { antiSlop } from './src/configs/anti-slop.ts'
import type { Rules } from './src/index.ts'
import { saiful } from './src/index.ts'

const antiSlopOff: Rules = Object.fromEntries(Object.keys(antiSlop().rules ?? {}).map((rule) => [rule, 'off']))

export default defineConfig(
  saiful(
    {
      type: 'lib',
      antiSlop: { specifier: './src/plugins/anti-slop/index.ts' },
      ignores: ['fixtures'],
    },
    {
      overrides: [
        {
          // vendored upstream code — keep diffs against dmmulroy/anti-slop minimal
          files: ['src/plugins/anti-slop/**'],
          rules: {
            'typescript/consistent-type-definitions': 'off',
            'typescript/explicit-function-return-type': 'off',
            'no-underscore-dangle': 'off',
            // the rules may not police their own implementation techniques
            ...antiSlopOff,
          },
        },
      ],
    },
  ),
)
