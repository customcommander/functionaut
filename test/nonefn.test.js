const test = require('tape');
const td = require('testdouble');
const {nonefn: sut} = require('..');

test('nonefn(...fn)(...args) -> true when no predicate passed', t => {
  const a = Symbol();
  const b = Symbol();

  const f = td.func();
  const g = td.func();
  const h = td.func();
  td.when(f(a, b)).thenReturn(false);
  td.when(g(a, b)).thenReturn(false);
  td.when(h(a, b)).thenReturn(1); // Truthy check. This is not a boolean so should be considered as failed.

  t.same(sut(f, g, h)(a, b), true);
  td.verify(f(), {times:1, ignoreExtraArgs: true});
  td.verify(g(), {times:1, ignoreExtraArgs: true});
  td.verify(h(), {times:1, ignoreExtraArgs: true});

  t.end();
});

test('nonefn(...fn)(...args) -> false when one predicate passed', t => {
  const a = Symbol();
  const b = Symbol();

  const f = td.func();
  td.when(f(a, b)).thenReturn(true);

  t.same(sut(f, f, f)(a, b), false);
  td.verify(f(), {times:1, ignoreExtraArgs: true});

  t.end();
});
