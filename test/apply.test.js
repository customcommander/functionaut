const test = require('tape');
const td = require('testdouble');
const {apply: sut} = require('..');

test('apply(f)(xs)', t => {
  const f = td.func();
  const a = Symbol();
  const b = Symbol();
  const c = Symbol();
  const x = Symbol();
  const y = Symbol();
  const z = Symbol();

  td.when(f()       ).thenReturn(x);
  td.when(f(a)      ).thenReturn(y);
  td.when(f(a, b, c)).thenReturn(z);

  t.true(sut(f)([])        === x);
  t.true(sut(f)([a])       === y);
  t.true(sut(f)([a, b, c]) === z);
  t.end();
});
