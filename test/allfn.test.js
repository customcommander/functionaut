const test = require('tape');
const td = require('testdouble');
const {allfn: sut} = require('..');

test('allfn(...fn)(...args) -> true when all predicates passed', t => {
  t.plan(4);

  const f = td.func();
  const g = td.func();
  const h = td.func();

  td.when(f(1, 2)).thenDo(() => (t.pass('`f(1, 2)` passed'), true));
  td.when(g(1, 2)).thenDo(() => (t.pass('`g(1, 2)` passed'), true));
  td.when(h(1, 2)).thenDo(() => (t.pass('`h(1, 2)` passed'), true));

  t.same(sut(f, g, h)(1, 2), true);

  t.end();
});

test('allfn(...fn)(...args) -> false when a predicate failed', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();

  td.when(f(1, 2)).thenReturn(1);
  td.when(g(1, 2)).thenDo(() =>  t.fail('`g(1, 2)` has been called but `f(1, 2)` failed'));
  td.when(h(1, 2)).thenDo(() =>  t.fail('`h(1, 2)` has been called but `f(1, 2)` failed'));

  t.same(sut(f, g, h)(1, 2), false);

  t.end();
});
