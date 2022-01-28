const test = require('tape');
const {take: sut} = require('..');

test('take returns the first nth elements of the list.', t => {
  t.same(sut(2)([1, 2, 3]), [1, 2]);
  t.same(sut(2)({a: 1, b: 2, c: 3}), {a: 1, b: 2});
  t.end();
});

test('take does not mutate the original list.', t => {
  const arr = [1, 2, 3];
  const obj = {a: 1, b: 2, c: 3};
  t.notSame(arr, sut(2)(arr));
  t.notSame(obj, sut(2)(obj));
  t.end();
});

test('take cannot return more than there is in the list.', t => {
  t.same(sut(Infinity)([1, 2, 3]), [1, 2, 3]);
  t.same(sut(Infinity)({a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  t.end();
});

test('take returns an empty list when asked to take nothing or less.', t => {
  t.same(sut(0)([1, 2, 3]), []);
  t.same(sut(0)({a: 1, b: 2, c: 3}), {});
  t.same(sut(NaN)([1, 2, 3]), []);
  t.same(sut(NaN)({a: 1, b: 2, c: 3}), {});
  t.same(sut(-Infinity)([1, 2, 3]), []);
  t.same(sut(-Infinity)({a: 1, b: 2, c: 3}), {});
  t.end();
});
