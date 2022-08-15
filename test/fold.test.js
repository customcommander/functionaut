const test = require('tape');
const td = require('testdouble');
const {fold: sut} = require('..');

test('fold', t => {
  const f = td.func();

  const q = Symbol(); // initial value

  const a = Symbol(); // 1st element of the list
  const b = Symbol(); // 2nd element of the list
  const c = Symbol(); // 3rd element of the list

  const x = Symbol(); // 1st reduction
  const y = Symbol(); // 2nd reduction
  const z = Symbol(); // 3rd reduction

  td.when(f(q, a)).thenReturn(x);
  td.when(f(x, b)).thenReturn(y);
  td.when(f(y, c)).thenReturn(z);

  t.same(sut(f)(q)([a, b, c]), z);
  t.same(sut(f)(q)({a, b, c}), z);

  const g = td.func();

  t.same(sut(g)(q)([]), q);
  t.same(sut(g)(q)({}), q);

  td.verify(g(), {times: 0, ignoreExtraArgs: true});

  t.end();
});
