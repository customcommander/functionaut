const test = require('tape');
const td = require('testdouble');
const {compose} = require('..');

test('compose(f, g, h)(a, b)', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();

  const a = Symbol();
  const b = Symbol();
  const c = Symbol();
  const d = Symbol();
  const e = Symbol();

  td.when(h(a, b)).thenReturn(c);
  td.when(g(c)).thenReturn(d);
  td.when(f(d)).thenReturn(e);

  t.true(compose(f, g, h)(a, b) === e,
    'compose(f, g, h)(a, b) === f(g(h(a, b)))');

  t.end();
});