import { defineConfig } from 'oxlint'
import { saiful } from '../../src/index.ts'

export default defineConfig(saiful({
  isInEditor: false,
  typescript: true,
  react: true,
  test: true,
  antiSlop: { specifier: '../../src/plugins/anti-slop/index.ts' },
}))
