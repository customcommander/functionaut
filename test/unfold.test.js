const test = require('tape');
const td = require('testdouble');
const {unfold} = require('..');

test('unfold', t => {
  const noop = () => { /* empty */ };

  t.deepEquals(unfold(() => 'true')(noop)(noop)(42), [],
    'predicate must return true and not a truthy value');

  const pred = td.function();
  td.when(pred(1)).thenReturn(true);
  td.when(pred(2)).thenReturn(true);
  td.when(pred(3)).thenReturn(true);
  td.when(pred(4)).thenReturn(false);

  const map = td.function();
  td.when(map(1)).thenReturn('one');
  td.when(map(2)).thenReturn('two');
  td.when(map(3)).thenReturn('three');

  const next = td.function();
  td.when(next(1)).thenReturn(2);
  td.when(next(2)).thenReturn(3);
  td.when(next(3)).thenReturn(4);

  t.deepEquals(unfold(pred)(map)(next)(1), ['one', 'two', 'three'],
    'apply `pred`, `map` and `next` to all values of `x`');

  t.end();
});