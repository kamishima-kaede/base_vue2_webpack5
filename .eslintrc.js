module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['vue'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always']
  }
};
