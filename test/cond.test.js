const td = require('testdouble');
const test = require('tape');
const {cond: sut} = require('..');

test('cond returns a function.', t => {
  t.true(typeof sut(td.func(), td.func()) === 'function');
  t.end();
});

test('cond\'ed function skips all functions until a predicate is true then skips the rest.', t => {
  const pred1 = td.func();
  td.when(pred1(40, 2)).thenReturn(false);

  const fn1 = td.func();
  td.when(fn1(40, 2)).thenThrow(new Error('should not have been called'));

  const pred2 = td.func();
  td.when(pred2(40, 2)).thenReturn(true);

  const fn2 = td.func();
  td.when(fn2(40, 2)).thenReturn('ok!');

  const pred3 = td.func();
  const fn3 = td.func();

  const conded = sut(pred1, fn1, pred2, fn2, pred3, fn3);

  t.same(conded(40, 2), 'ok!');
  td.verify(pred3(), {ignoreExtraArgs: true, times: 0});
  td.verify(fn3(), {ignoreExtraArgs: true, times: 0});

  t.end();
});

test('cond\'ed function ignores truthy predicates.', t => {
  const pred1 = td.func();
  td.when(pred1(40, 2)).thenReturn(1);

  const fn1 = td.func();
  td.when(fn1(40, 2)).thenThrow(new Error('should not have been called'));

  const pred2 = td.func();
  td.when(pred2(40, 2)).thenReturn(true);

  const fn2 = td.func();
  td.when(fn2(40, 2)).thenReturn('ok!');

  t.same(sut(pred1, fn1, pred2, fn2)(40, 2), 'ok!');
  t.end();
});

test('cond\'ed function returns undefined when no predicates are true.', t => {
  const pred = td.func();
  const fn = td.func();
  td.when(pred(40, 2)).thenReturn(false);

  t.same(sut(pred, fn)(40, 2), undefined);
  t.end();
});
