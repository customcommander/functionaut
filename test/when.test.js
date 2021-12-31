const td = require('testdouble');
const test = require('tape');
const {when: sut} =  require('..');

test('when(pred)(fn)(...x)', t => {
  // parameters symbols
  const a = Symbol();
  const b = Symbol();
  const c = Symbol();
  const d = Symbol();

  // return symbol
  const z = Symbol();

  const pred = td.func();
  const fn = td.func();

  // logical true
  td.when(pred(a, a)).thenReturn(true);
  td.when(pred(a, b)).thenReturn(NaN);
  td.when(pred(a, c)).thenReturn(0);
  td.when(pred(a, d)).thenReturn('');

  // logical false
  td.when(pred(b, b)).thenReturn(false);
  td.when(pred(b, c)).thenReturn(null);
  td.when(pred(b, d)).thenReturn(undefined);

  td.when(fn(a, a)).thenReturn(z);
  td.when(fn(a, b)).thenReturn(z);
  td.when(fn(a, c)).thenReturn(z);
  td.when(fn(a, d)).thenReturn(z);

  t.same(sut(pred)(fn)(a, a), z, 'Returns `fn(a, a)` as `pred(a, a)` is logical true (`true`).');
  t.same(sut(pred)(fn)(a, b), z, 'Returns `fn(a, b)` as `pred(a, b)` is logical true (`NaN`).');
  t.same(sut(pred)(fn)(a, c), z, 'Returns `fn(a, c)` as `pred(a, c)` is logical true (`0`).');
  t.same(sut(pred)(fn)(a, d), z, 'Returns `fn(a, d)` as `pred(a, d)` is logical true (``).');

  t.same(sut(pred)(fn)(b, b), undefined, 'Returns `undefined` as `pred(b, b)` is logical false (`false`).');
  t.same(sut(pred)(fn)(b, c), undefined, 'Returns `undefined` as `pred(b, c)` is logical false (`null`).');
  t.same(sut(pred)(fn)(b, d), undefined, 'Returns `undefined` as `pred(b, d)` is logical false (`undefined`).');

  td.verify(fn(b, b), {times: 0, ignoreExtraArgs: true});
  td.verify(fn(b, c), {times: 0, ignoreExtraArgs: true});
  td.verify(fn(b, d), {times: 0, ignoreExtraArgs: true});

  t.same(sut(pred, fn, a, a), z, 'Can supply one or more `x` immediately.');

  t.end();
});
