const test = require('tape');
const {upper, lower} = require('..');

test('upper returns `s` uppercased', t => {
  t.same(upper('foo'), 'FOO');
  t.end();
});

test('lower returns `s` lowercased', t => {
  t.same(lower('FOO'), 'foo');
  t.end();
});
