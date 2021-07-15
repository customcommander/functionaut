const test = require('tape');
const {eq, ne} = require('../');

test('eq returns true if both parameters are equal', t => {
  const run = (a, b) => t.same(eq(a)(b), Object.is(a, b));
  run(1, '1');
  run(0, false);
  run(+0, -0);
  run(NaN, NaN);
  run(null, undefined);
  t.end();
});

test('ne returns true if both parameters are not equal', t => {
  const run = (a, b) => t.same(ne(a)(b), Object.is(a, b) == false);
  run(1, '1');
  run(0, false);
  run(+0, -0);
  run(NaN, NaN);
  run(null, undefined);
  t.end();
});