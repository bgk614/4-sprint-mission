// eslint.config.js
import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules/**', 'prisma/**', 'src/generated/**', 'dist'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: { ...globals.node },
    },
    plugins: { 'simple-import-sort': simpleImportSort, import: pluginImport },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs'],
        },
      },
    },
    rules: {
      // import 정렬
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // import 관련
      'import/extensions': ['error', 'ignorePackages', { js: 'always' }],
      'import/no-unresolved': 'error',

      // JS 기본 스타일 보완
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  // 테스트 파일 전용 완화
  {
    files: ['**/*.test.js', 'vitest.config.js'],
    rules: {
      'no-unused-expressions': 'off', // chai/expect 스타일 허용
      'import/no-unresolved': 'off', // vitest/config 경로 무시
    },
  },
];
