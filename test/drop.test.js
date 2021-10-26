const test = require('tape');
const {drop} = require('..');

test('drop ignores the first nth items of the list.', t => {
  t.same(drop(2)('🌯🍣🌮'), '🌮');
  t.same(drop(2)([1, 2, 3]), [3]);
  t.same(drop(2)({a: 1, b: 2, c: 3}), {c: 3});
  t.end();
});

test('drop does not mutate the original list.', t => {
  const str = '123';
  const arr = [1, 2, 3];
  const obj = {a: 1, b: 2, c: 3};
  t.notSame(str, drop(2)(str));
  t.notSame(arr, drop(2)(arr));
  t.notSame(obj, drop(2)(obj));
  t.end();
});

test('drop returns an empty list if `n` is bigger than the number of items in the list.', t => {
  t.same(drop(Infinity)('123'), '');
  t.same(drop(Infinity)([1, 2, 3]), []);
  t.same(drop(Infinity)({a: 1, b: 2, c: 3}), {});
  t.end();
});

test('drop returns a new list if `n` <= 0 or NaN.', t => {
  t.same(drop(0)('123'), '123');
  t.same(drop(-Infinity)('123'), '123');
  t.same(drop(NaN)('123'), '123');
  t.same(drop(0)([1, 2, 3]), [1, 2, 3]);
  t.same(drop(-Infinity)([1, 2, 3]), [1, 2, 3]);
  t.same(drop(NaN)([1, 2, 3]), [1, 2, 3]);
  t.same(drop(0)({a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  t.same(drop(-Infinity)({a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  t.same(drop(NaN)({a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  t.end();
});
