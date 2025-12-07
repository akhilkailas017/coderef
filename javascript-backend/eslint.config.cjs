module.exports = [
  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly'
      }
    },

    ignores: ['node_modules/', 'dist/', 'coverage/'],

    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'no-var': 'error',
      'prefer-const': 'warn',
      'handle-callback-err': 'warn',
      'no-new-require': 'error',
      'no-path-concat': 'warn'
    }
  }
];
