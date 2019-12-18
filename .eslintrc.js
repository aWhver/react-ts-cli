module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'react-app'],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/no-unused-vars": 2,
    "@typescript-eslint/explicit-function-return-type": 0, // 函数必须有返回值类型
    "@typescript-eslint/interface-name-prefix": 0
  },
  overrides: [
    {
      files: ['scripts/**/*.js', 'webpack/**/*.js'],
      rules: {
        "@typescript-eslint/no-var-requires": 0
      }
    }
  ]
};
