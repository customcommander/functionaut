const td = require('testdouble');
const test = require('tape');
const {when: sut} =  require('..');

test('when returns `g(x)` if `f(x)` returns `true`', t => {
  const f = td.func();
  const g = td.func();

  td.when(f(1)).thenReturn(true);
  td.when(f(2)).thenReturn(false);
  td.when(f(3)).thenReturn('truthy');

  td.when(g(1)).thenReturn('OK');

  t.same(sut(f)(g)(1), 'OK',
    'expected `g(x)` because f(x) returned `true`.');

  t.same(sut(f)(g)(2), undefined,
    'expected `undefined` because `f(x)` returned `false`.');

  t.same(sut(f)(g)(3), undefined,
    'expected `undefined` because `f(x)` returned truthy not `true`.');

  t.end();
});
