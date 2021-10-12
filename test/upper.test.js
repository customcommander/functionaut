const test = require('tape');
const {upper} = require('..');

test('upper returns `s` uppercased', t => {
  t.same(upper('foo'), 'FOO');
  t.end();
});
