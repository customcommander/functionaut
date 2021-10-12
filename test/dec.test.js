const test = require('tape');
const {dec} = require('..');

test('dec', t => {
  t.true(dec(43) === 42, 'takes 1 away from a number');
  t.true(Object.is(NaN, dec(NaN)), 'works with NaN');
  t.true(dec(Infinity) === Infinity, 'works with Infinity');
  t.true(dec(-Infinity) === -Infinity, 'works with -Infinity');
  t.end();
});
