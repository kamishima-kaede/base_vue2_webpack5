module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest'
  },
  globals: {
    process: true
  },
  plugins: ['vue'],
  rules: {}
}
