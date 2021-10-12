const test = require('tape');
const td = require('testdouble');
const {flip} = require('..');

test('flip inverts the order of the first two parameters.', t => {
  const fn = td.function();
  const flipped = flip(fn);
  flipped('foo')('bar');
  td.verify(fn('bar', 'foo'));
  flipped('baz', 'bat');
  td.verify(fn('bat', 'baz'));
  t.end();
});

test('flip forwards the rest of the parameters.', t => {
  const fn = td.function();
  const flipped = flip(fn);
  flipped('foo')('bar', 'baz');
  td.verify(fn('bar', 'foo', 'baz'));
  flipped('foo', 'bar', 'baz', 'bat');
  td.verify(fn('bar', 'foo', 'baz', 'bat'));
  t.end();
});
