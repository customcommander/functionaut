const td = require('testdouble');
const test = require('tape');
const {juxt: sut} = require('..');

test('juxt throws when called with no functions', t => {
  t.throws(() => sut());
  t.throws(() => sut(td.func(), 42));
  t.end();
});

test('juxt applies a list of functions to a list of arguments', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();

  td.when(f(1, 2, 3)).thenReturn(10);
  td.when(g(1, 2, 3)).thenReturn(20);
  td.when(h(1, 2, 3)).thenReturn(30);

  t.same(sut(f, g, h)(1, 2, 3), [10, 20, 30]);

  td.when(f()).thenReturn('🌯');
  td.when(g()).thenReturn('🍣');
  td.when(h()).thenReturn('🌮');

  t.same(sut(f, g, h)(), ['🌯', '🍣', '🌮']);

  t.end();
});
