module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
    sourceType: 'script',
  },
  plugins: [
    'import',
  ],
  rules: {
    'max-len': ['error', 120],
    'semi': ['error', 'never'],
  },
}
