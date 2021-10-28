const test = require('tape');
const td = require('testdouble');
const {anyfn: sut} = require('..');

test('anyfn(...fn)(...args) -> true when one predicate passed', t => {
  const a = Symbol();
  const b = Symbol();

  const f = td.func();
  const g = td.func();
  const h = td.func();

  td.when(f(a, b)).thenReturn(true);
  td.when(g(a, b)).thenDo(() => t.fail('`g(a, b)` called but `f(a, b)` passed'));
  td.when(h(a, b)).thenDo(() => t.fail('`h(a, b)` called but `f(a, b)` passed'));

  t.same(sut(f, g, h)(a, b), true);

  td.verify(f(), {times:1, ignoreExtraArgs: true});

  t.end();
});

test('anyfn(...fn)(...args) -> false when no predicates passed', t => {
  const a = Symbol();
  const b = Symbol();

  const f = td.func();
  td.when(f(a, b)).thenReturn(1);

  t.same(sut(f, f, f)(a, b), false);

  td.verify(f(), {times:3, ignoreExtraArgs: true});

  t.end();
});
