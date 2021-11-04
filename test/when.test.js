const td = require('testdouble');
const test = require('tape');
const {when: sut} =  require('..');

test('when(f)(g)(...x)', t => {
  // parameters symbols
  const a = Symbol();
  const b = Symbol();
  const c = Symbol();
  const d = Symbol();

  // return symbol
  const z = Symbol();

  const f = td.func();
  const g = td.func();

  // logical true
  td.when(f(a, a)).thenReturn(true);
  td.when(f(a, b)).thenReturn(NaN);
  td.when(f(a, c)).thenReturn(0);
  td.when(f(a, d)).thenReturn('');

  // logical false
  td.when(f(b, b)).thenReturn(false);
  td.when(f(b, c)).thenReturn(null);
  td.when(f(b, d)).thenReturn(undefined);

  td.when(g(a, a)).thenReturn(z);
  td.when(g(a, b)).thenReturn(z);
  td.when(g(a, c)).thenReturn(z);
  td.when(g(a, d)).thenReturn(z);

  t.same(sut(f)(g)(a, a), z, 'Returns `g(a, a)` as `f(a, a)` is logical true (`true`).');
  t.same(sut(f)(g)(a, b), z, 'Returns `g(a, b)` as `f(a, b)` is logical true (`NaN`).');
  t.same(sut(f)(g)(a, c), z, 'Returns `g(a, c)` as `f(a, c)` is logical true (`0`).');
  t.same(sut(f)(g)(a, d), z, 'Returns `g(a, d)` as `f(a, d)` is logical true (``).');

  t.same(sut(f)(g)(b, b), undefined, 'Returns `undefined` as `f(b, b)` is logical false (`false`).');
  t.same(sut(f)(g)(b, c), undefined, 'Returns `undefined` as `f(b, c)` is logical false (`null`).');
  t.same(sut(f)(g)(b, d), undefined, 'Returns `undefined` as `f(b, d)` is logical false (`undefined`).');

  td.verify(g(b, b), {times: 0, ignoreExtraArgs: true});
  td.verify(g(b, c), {times: 0, ignoreExtraArgs: true});
  td.verify(g(b, d), {times: 0, ignoreExtraArgs: true});

  t.same(sut(f, g, a, a), z, 'Can supply one or more `x` immediately.');

  t.end();
});
