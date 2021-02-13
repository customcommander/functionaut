const test = require('tape');
const {curry} = require('../dist');

test('curry', t => {
  const add3 = curry((a, b, c) => a + b + c);
  t.true('function' === typeof add3()(1)()(2)()(), 'keep returning a function until all parameters have been supplied.');
  t.true(6 === add3(1)()(2)()(3), 'execute the function when all parameters have been supplied.');
  t.end();
});
