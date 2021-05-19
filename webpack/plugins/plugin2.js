const babel = require('@babel/core');
const plugin = require('./babel-plugin-test');

const source = `function foo(a, b) {
  return a === b;
}`;

const code = babel.transform(source, { plugins: [plugin] }).code;

console.log(code);