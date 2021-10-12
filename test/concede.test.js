const td = require('testdouble');
const test = require('tape');
const {concede: sut} = require('..');

test('concede returns the value from the rightmost function', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();

  td.when(f(41)).thenReturn(42);
  td.when(g(40)).thenReturn(41);
  td.when(h(39, 1)).thenReturn(40);

  t.same(sut(f, g, h)(39, 1), 42);
  t.end();
});

test('concede returns nil as soon as nil is detected', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();

  td.when(g(40)).thenReturn(null);
  td.when(h(39, 1)).thenReturn(40);

  td.when(g(41)).thenReturn(undefined);
  td.when(h(40, 1)).thenReturn(41);

  t.same(sut(f, g, h)(39, 1), null);
  t.same(sut(f, g, h)(40, 1), undefined);
  td.verify(f(), {ignoreExtraArgs: true, times: 0}); // should never have been called!
  t.end();
});
