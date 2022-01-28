const test = require('tape');
const {drop: sut} = require('..');

test('drop ignores the first nth items of the list.', t => {
  t.same(sut(2)([1, 2, 3]), [3]);
  t.same(sut(2)({a: 1, b: 2, c: 3}), {c: 3});
  t.end();
});

test('drop does not mutate the original list.', t => {
  const arr = [1, 2, 3];
  const obj = {a: 1, b: 2, c: 3};
  t.notSame(arr, sut(2)(arr));
  t.notSame(obj, sut(2)(obj));
  t.end();
});

test('drop returns an empty list if `n` is bigger than the number of items in the list.', t => {
  t.same(sut(Infinity)([1, 2, 3]), []);
  t.same(sut(Infinity)({a: 1, b: 2, c: 3}), {});
  t.end();
});

test('drop returns a new list if `n` <= 0 or NaN.', t => {
  t.same(sut(0)([1, 2, 3]), [1, 2, 3]);
  t.same(sut(-Infinity)([1, 2, 3]), [1, 2, 3]);
  t.same(sut(NaN)([1, 2, 3]), [1, 2, 3]);
  t.same(sut(0)({a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  t.same(sut(-Infinity)({a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  t.same(sut(NaN)({a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  t.end();
});
