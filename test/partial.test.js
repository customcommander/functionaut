const td = require('testdouble');
const test = require('tape');
const {partial: sut} = require('..');

test('partial applies f to the initial arguments and the remaining arguments', t => {
  const f = td.func();
  td.when(f(10, 20, 5, 5, 1, 1)).thenReturn(42);
  t.same(sut(f, 10, 20, 5)(5, 1, 1), 42);
  t.end();
});

test('partial can be given no arguments at all', t => {
  const f = td.func();
  td.when(f()).thenReturn(42);
  t.same(sut(f)(), 42);
  t.end();
});
