const test = require('tape');
const {identity} = require('../dist');

test('identity returns its argument.', t => {
  const x = {};
  t.same(identity(x), x);
  t.end();
});

test('identity ignores the arguments after the first.', t => {
  t.same(identity(1, 2, 3), 1);
  t.end();
});
