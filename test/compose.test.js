const test = require('tape');
const td = require('testdouble');
const {compose} = require('../dist');

test('compose', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();

  td.when(h(30, 10)).thenReturn(40);
  td.when(g(40)).thenReturn(41);
  td.when(f(41)).thenReturn(42);

  const comp = compose(f, g, h);
  t.true(comp(30, 10) === 42, 'compose(f, g, h)(x) === f(g(h(x)))');

  t.throws(() => compose(), 'throws when called with no arguments');
  t.throws(() => compose(() => 42, [], () => 42), 'throws when called with non-function arguments');

  t.end();
});