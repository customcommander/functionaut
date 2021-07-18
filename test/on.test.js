const td = require('testdouble');
const test = require('tape');
const {on: sut} = require('../');

test('on throws when either `f` or `g` is not a function', t => {
  t.throws(() => sut(td.func())(42)('a')('b'));
  t.throws(() => sut(42)(td.func())('a')('b'));
  t.end();
});

test('on returns a binary function and applies `f` to `g(a)` and `g(b)`', t => {
  const f = td.func();
  td.when(f(40, 2)).thenReturn(42);

  const g = td.func();
  td.when(g(39)).thenReturn(40);
  td.when(g(1)).thenReturn(2);

  t.same(sut(f)(g)(39)(1), 42);
  t.end();
});
