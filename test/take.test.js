const test = require('tape');
const {take} = require('../dist');

test('take returns the first nth elements of the list.', t => {
  t.same(take(2)('🌯🍣🌮'), '🌯🍣');
  t.same(take(2)([1, 2, 3]), [1, 2]);
  t.same(take(2)({a: 1, b: 2, c: 3}), {a: 1, b: 2});
  t.end();
});

test('take does not mutate the original list.', t => {
  const str = '123';
  const arr = [1, 2, 3];
  const obj = {a: 1, b: 2, c: 3};
  t.notSame(str, take(2)(str));
  t.notSame(arr, take(2)(arr));
  t.notSame(obj, take(2)(obj));
  t.end();
});

test('take cannot return more than there is in the list.', t => {
  t.same(take(Infinity)('123'), '123');
  t.same(take(Infinity)([1, 2, 3]), [1, 2, 3]);
  t.same(take(Infinity)({a: 1, b: 2, c: 3}), {a: 1, b: 2, c: 3});
  t.end();
});

test('take returns an empty list when asked to take nothing or less.', t => {
  t.same(take(0)('123'), '');
  t.same(take(0)([1, 2, 3]), []);
  t.same(take(0)({a: 1, b: 2, c: 3}), {});
  t.same(take(NaN)('123'), '');
  t.same(take(NaN)([1, 2, 3]), []);
  t.same(take(NaN)({a: 1, b: 2, c: 3}), {});
  t.same(take(-Infinity)('123'), '');
  t.same(take(-Infinity)([1, 2, 3]), []);
  t.same(take(-Infinity)({a: 1, b: 2, c: 3}), {});
  t.end();
});

test('take returns null when not given a list.', t => {
  t.same(take(2)(null), null);
  t.same(take(2)(true), null);
  t.same(take(2)(1), null);
  t.end();
});

test('take fails when not given a number.', t => {
  t.throws(() => take([])('123'));
  t.throws(() => take([])([1, 2, 3]));
  t.throws(() => take([])({a: 1, b: 2, c: 3}));
  t.end();
});
