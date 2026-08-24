import type { OxlintConfig, OxlintEnv, OxlintGlobals } from 'oxlint'

export interface JavascriptOptions {
  isInEditor?: boolean
  env?: OxlintEnv
  globals?: OxlintGlobals
}

export function javascript(options: JavascriptOptions = {}): Partial<OxlintConfig> {
  const { isInEditor = false, env = {}, globals = {} } = options

  return {
    plugins: ['eslint', 'oxc', 'unicorn', 'import', 'promise', 'node', 'jsdoc'],
    categories: {
      correctness: 'error',
      suspicious: 'warn',
      perf: 'warn',
    },
    env: {
      builtin: true,
      browser: true,
      node: true,
      ...env,
    },
    globals,
    options: {
      reportUnusedDisableDirectives: 'warn',
    },
    rules: {
      // category-enabled rules that are too noisy in practice
      'no-await-in-loop': 'off',
      'no-underscore-dangle': 'off',
      'unicorn/no-array-sort': 'off',
      'jsdoc/require-yields': 'off',
      eqeqeq: ['error', 'smart'],
      'no-alert': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-var': 'error',
      'no-array-constructor': 'error',
      'no-object-constructor': 'error',
      'no-lonely-if': 'error',
      'no-multi-assign': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-computed-key': 'error',
      'no-useless-rename': 'error',
      'no-else-return': ['error', { allowElseIf: false }],
      'no-throw-literal': 'error',
      'no-undef': 'error',
      'no-unexpected-multiline': 'error',
      'no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTaggedTemplates: true,
          allowTernary: true,
        },
      ],
      'no-unused-vars': [
        isInEditor ? 'warn' : 'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
          ignoreRestSiblings: true,
        },
      ],
      'no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
      'object-shorthand': ['error', 'always'],
      'one-var': ['error', 'never'],
      'prefer-arrow-callback': ['error', { allowNamedFunctions: false, allowUnboundThis: true }],
      'prefer-const': [isInEditor ? 'warn' : 'error', { destructuring: 'all' }],
      'prefer-exponentiation-operator': 'error',
      'prefer-object-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-spread': 'error',
      'prefer-template': 'error',
      yoda: ['error', 'never'],

      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-self-import': 'error',

      'promise/no-callback-in-promise': 'warn',
      'promise/no-new-statics': 'error',
      'promise/no-return-in-finally': 'error',

      'node/no-exports-assign': 'error',
      'node/no-new-require': 'error',

      'unicorn/error-message': 'error',
      'unicorn/no-instanceof-builtins': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/prefer-includes': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-string-starts-ends-with': 'error',
      'unicorn/prefer-type-error': 'error',
      'unicorn/throw-new-error': 'error',
      'unicorn/no-array-for-each': 'warn',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
    },
  }
}
