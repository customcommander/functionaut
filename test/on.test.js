const td = require('testdouble');
const test = require('tape');
const {on: sut} = require('..');

test('on returns a binary function and applies `f` to `g(a)` and `g(b)`', t => {
  const f = td.func();
  td.when(f(40, 2)).thenReturn(42);

  const g = td.func();
  td.when(g(39)).thenReturn(40);
  td.when(g(1)).thenReturn(2);

  t.same(sut(f)(g)(39)(1), 42);
  t.end();
});
