const test = require('tape');
const {inc} = require('..');

test('inc', t => {
  t.true(inc(41) === 42, 'adds 1 to a number');
  t.true(Object.is(NaN, inc(NaN)), 'works with NaN');
  t.true(inc(Infinity) === Infinity, 'works with Infinity');
  t.true(inc(-Infinity) === -Infinity, 'works with -Infinity');
  t.end();
});
