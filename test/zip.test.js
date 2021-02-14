const test = require('tape');
const {zip, zip3, zip4} = require('../dist');

test('zip', t => {
  t.deepEquals(zip([1, 2])([10, 20]), [[1, 10], [2, 20]],
    'can zip arrays of same length');

  t.deepEquals(zip([1])([10, 20]), [[1, 10]],
    'if `a` is shorter than `b` stop when `a` has been exhausted');

  t.deepEquals(zip([1, 2])([10]), [[1, 10]],
    'if `b` is shorter than `a` stop when `b` has been exhausted');

  t.deepEquals(zip([])([10, 20]), [],
    'if `a` is empty return empty');

  t.deepEquals(zip([1, 2])([]), [],
    'if `b` is empty return empty');

  t.throws(() => zip(42)([]),
    'throws when `a` is not an array');

  t.throws(() => zip([])(42),
    'throws when `b` is not an array');

  t.end();
});

test('zip3', t => {
  t.deepEquals(zip3([1, 2])([10, 20])([100, 200]), [[1, 10, 100], [2, 20, 200]],
    'can zip arrays of same length');

  t.deepEquals(zip3([1])([10, 20])([100, 200]), [[1, 10, 100]],
    'return array of the same length as `a`');

  t.deepEquals(zip3([1, 2])([10])([100, 200]), [[1, 10, 100]],
    'return array of the same length as `b`');

  t.deepEquals(zip3([1, 2])([10, 20])([100]), [[1, 10, 100]],
    'return array of the same length as `c`');

  t.deepEquals(zip3([])([10, 20])([100, 200]), [],
    'return empty array if `a` is empty');

  t.deepEquals(zip3([1, 2])([])([100, 200]), [],
    'return empty array if `b` is empty');

  t.deepEquals(zip3([1, 2])([10, 20])([]), [],
    'return empty array if `c` is empty');

  t.throws(() => zip3(42)([])([]),
    'throw if `a` is not an array');

  t.throws(() => zip3([])(42)([]),
    'throw if `b` is not an array');

  t.throws(() => zip3([])([])(42),
    'throw if `c` is not an array');

  t.end();
});

test('zip4', t => {
  t.deepEquals(zip4([1, 2])([10, 20])([100, 200])([1000, 2000]), [[1, 10, 100, 1000], [2, 20, 200, 2000]],
    'can zip arrays of same length');

  t.deepEquals(zip4([1])([10, 20])([100, 200])([1000, 2000]), [[1, 10, 100, 1000]],
    'return array of the same length as `a`');

  t.deepEquals(zip4([1, 2])([10])([100, 200])([1000, 2000]), [[1, 10, 100, 1000]],
    'return array of the same length as `b`');

  t.deepEquals(zip4([1, 2])([10, 20])([100])([1000, 2000]), [[1, 10, 100, 1000]],
    'return array of the same length as `c`');

    t.deepEquals(zip4([1, 2])([10, 20])([100, 200])([1000]), [[1, 10, 100, 1000]],
    'return array of the same length as `d`');

  t.deepEquals(zip4([])([10, 20])([100, 200])([1000, 2000]), [],
    'return empty array if `a` is empty');

  t.deepEquals(zip4([1, 2])([])([100, 200])([1000, 2000]), [],
    'return empty array if `b` is empty');

  t.deepEquals(zip4([1, 2])([10, 20])([])([1000, 2000]), [],
    'return empty array if `c` is empty');

  t.deepEquals(zip4([1, 2])([10, 20])([100, 200])([]), [],
    'return empty array if `d` is empty');

  t.throws(() => zip4(42)([])([])([]),
    'throw if `a` is not an array');

  t.throws(() => zip4([])(42)([])([]),
    'throw if `b` is not an array');

  t.throws(() => zip4([])([])(42)([]),
    'throw if `c` is not an array');

  t.throws(() => zip4([])([])([])(42),
    'throw if `d` is not an array');

  t.end();
});