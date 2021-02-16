const test = require('tape');
const {inc, dec} = require('../dist');

test('inc', t => {
  t.true(inc(41) === 42, 'adds 1 to a number');
  t.true(Object.is(NaN, inc(NaN)), 'works with NaN');
  t.true(inc(Infinity) === Infinity, 'works with Infinity');
  t.true(inc(-Infinity) === -Infinity, 'works with -Infinity');
  t.throws(() => inc('42'), 'does not work with number like');
  t.throws(() => inc(new Number(42)), 'does not work with number object');
  t.end();
});

test('dec', t => {
  t.true(dec(43) === 42, 'takes 1 away from a number');
  t.true(Object.is(NaN, dec(NaN)), 'works with NaN');
  t.true(dec(Infinity) === Infinity, 'works with Infinity');
  t.true(dec(-Infinity) === -Infinity, 'works with -Infinity');
  t.throws(() => dec('43'), 'does not work with number like');
  t.throws(() => dec(new Number(43)), 'does not work with number object');
  t.end();
});
