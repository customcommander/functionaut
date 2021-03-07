const test = require('tape');
const {constant} = require('../dist');

test('constant returns a function.', t => {
  t.true(typeof constant(42) === 'function');
  t.end();
});

test('constant takes a x and returns a function that always returns x.', t => {
  const x = {};
  const answer = constant(x);
  t.same(answer(), x);
  t.same(answer('foobar'), x);
  t.end();
});
