import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    fmt: 'src/fmt.ts',
    'anti-slop': 'src/plugins/anti-slop/index.ts',
  },
  format: ['esm'],
  dts: true,
  clean: true,
})
