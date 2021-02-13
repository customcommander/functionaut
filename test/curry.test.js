const test = require('tape');
const {curry} = require('../dist');

test('curry', t => {
  const add3 = (a, b, c) => a + b + c;
  const add3_curried = curry(add3);
  t.true(add3 !== add3_curried, 'return a new function.');
  t.true(add3_curried(1, 2, 3) === 6, 'execute function when all parameters have been supplied first time.');
  t.true(add3_curried()(1)()(2)()(3) === 6, 'execute function when all parameters have been supplied');
  t.true(typeof add3_curried()()(1)()()(2)()() === 'function', 'keep returning a function until all parameters have been supplied');
  t.throws(() => curry(42), 'throw an error when `fn` is not a function');
  t.end();
});
