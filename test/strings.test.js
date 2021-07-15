const test = require('tape');
const {upper, lower} = require('../');

test('upper throws when `s` is not a string', t => {
  t.throws(() => upper(42));
  t.throws(() => upper(new String('42')));
  t.end();
});

test('upper returns `s` uppercased', t => {
  t.same(upper('foo'), 'FOO');
  t.end();
});

test('lower throws when `s` is not a string', t => {
  t.throws(() => lower(42));
  t.throws(() => lower(new String('42')));
  t.end();
});

test('lower returns `s` lowercased', t => {
  t.same(lower('FOO'), 'foo');
  t.end();
});
