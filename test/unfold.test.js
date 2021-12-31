const test = require('tape');
const td = require('testdouble');
const {unfold: sut} = require('..');

test('unfold(pred)(map)(next)(x)', t => {
  const pred = td.func();
  const map  = td.func();
  const next = td.func();

  const x = Symbol();
  const y = Symbol();
  const z = Symbol();
  const $ = Symbol('stop');

  // Little helper for thenDo method
  const _do = (msg, ret) => () => (t.pass(msg), ret);

  td.when(pred(x)).thenDo(_do('pred(x) returned logical true' , 0));
  td.when(pred(y)).thenDo(_do('pred(y) returned logical true' , ''));
  td.when(pred(z)).thenDo(_do('pred(z) returned logical true' , NaN));
  td.when(pred($)).thenDo(_do('pred($) returned logical false', false));

  td.when(next(x)).thenDo(_do('next(x) returned y', y));
  td.when(next(y)).thenDo(_do('next(y) returned z', z));
  td.when(next(z)).thenDo(_do('next(z) returned $', $));

  td.when(map(x)).thenDo(_do('map(x) returned "x"', 'x'));
  td.when(map(y)).thenDo(_do('map(y) returned "y"', 'y'));
  td.when(map(z)).thenDo(_do('map(z) returned "z"', 'z'));

  t.plan(14);
  t.deepEquals(sut(pred)(map)(next)(x), ['x', 'y', 'z']);
  t.true(td.explain(pred).callCount === 4);
  t.true(td.explain(map).callCount === 3);
  t.true(td.explain(next).callCount === 3);
  t.end();
});
