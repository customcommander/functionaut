const test = require('tape');
const td = require('testdouble');
const {filter} = require('../dist');

test('filter keeps the elements that satisfy the predicate.', t => {
  const pred = td.function();
  td.when(pred('🌯')).thenReturn(true);
  td.when(pred('🍣')).thenReturn(true);
  td.when(pred('🌮')).thenReturn(false);
  t.same(filter(pred)('🌯🍣🌮'), '🌯🍣');
  t.same(filter(pred)(['🌯', '🍣', '🌮']), ['🌯', '🍣']);
  t.same(filter(pred)({a: '🌯', b: '🍣', c: '🌮'}), {a: '🌯', b: '🍣'});
  td.verify(pred(/* … */), {ignoreExtraArgs: true, times: 9});
  t.end();
});

test('filter does not mutate the original list.', t => {
  const pred = td.function();
  td.when(pred(td.matchers.anything())).thenReturn(false);
  const str = "123";
  const arr = [1, 2, 3];
  const obj = {a: 1, b: 2, c: 3};
  t.notSame(str, filter(pred)(str));
  t.notSame(arr, filter(pred)(arr));
  t.notSame(obj, filter(pred)(obj));
  t.end();
});

test('filter works with predicates that return true (not truthy).', t => {
  const pred = td.function();
  td.when(pred(td.matchers.anything())).thenReturn(1);
  t.same(filter(pred)("123"), '');
  t.same(filter(pred)([1, 2, 3]), []);
  t.same(filter(pred)({a: 1, b:2, c: 3}), {});
  t.end();
});

test('filter does not call the predicate when the list is empty.', t => {
  const pred = td.function();
  filter(pred)('');
  filter(pred)([]);
  filter(pred)({});
  td.verify(pred(/* … */), {ignoreExtraArgs: true, times: 0});
  t.end();
});

test('filter returns null when not given a list.', t => {
  const pred = td.function();
  t.same(filter(pred)(null), null);
  td.verify(pred(/* … */), {ignoreExtraArgs: true, times: 0});
  t.end();
});

test('filter fails when not given a function.', t => {
  t.throws(() => filter([])('123'));
  t.throws(() => filter([])([1, 2, 3]));
  t.throws(() => filter([])({a: 1, b: 2, c: 3}));
  t.end();
});
