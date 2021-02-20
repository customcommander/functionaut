/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {curry} = require('./functions');
const {assert_array} = require('./private/helpers');

/**
 * @param {Array} a
 * @param {Array} b
 * @param {?Array} c
 * @param {?Array} d
 * @return {Array<Array>}
 */
const _zip =
  (a, b, c = null, d = null) => {
    const zip3 = c !== null && d === null;
    const zip4 = c !== null && d !== null;

    const zipN =
      ( zip4 ? i => [a[i], b[i], c[i], d[i]]
      : zip3 ? i => [a[i], b[i], c[i]]
             : i => [a[i], b[i]]);

    // smallest array length is the maximum number
    // of items we can take from each array.
    const len =
      ( zip4 ? Math.min(a.length, b.length, c.length, d.length)
      : zip3 ? Math.min(a.length, b.length, c.length)
             : Math.min(a.length, b.length));

    const ret = [];
    for (let i = 0; i < len; i += 1) ret.push(zipN(i));
    return ret;
  };

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {

  /**
   * Takes two arrays `a` and `b` and returns a new array
   * where each element of `a` and `b` at the same index are
   * put together. The length of the new array is equal to the length
   * of the smallest array.
   *
   * @example
   * ```javascript
   * zip([1, 2], [10, 20]);
   * //=> [[1, 10], [2, 20]]
   * ```
   *
   * @example
   * > When arrays are not the same length
   *
   * ```javascript
   * zip([1, 2], [10, 20, 30]);
   * //=> [[1, 10], [2, 20]]
   * zip([1, 2], [10]);
   * //=> [[1, 10]]
   * zip([1, 2], []);
   * //=> []
   * zip([], [10, 20, 30]);
   * //=> []
   * ```
   *
   * @public
   * @param {Array} a An array
   * @param {Array} b Another array
   * @return {Array<Array>}
   * @throws If either `a` or `b` is not an array.
   */
  zip: curry((a, b) => {
    assert_array(a, 'zip: `a` is not an array');
    assert_array(b, 'zip: `b` is not an array');
    return _zip(a, b, null, null);
  }),

  /**
   * Same as `zip` but with three arrays.
   *
   * @example
   * ```javascript
   * zip3([1, 2], [10, 20], [100, 200]);
   * //=> [[1, 10, 100], [2, 20, 200]]
   * ```
   *
   * @public
   * @param {Array} a
   * @param {Array} b
   * @param {Array} c
   * @return {Array<Array>}
   * @throws If either `a`, `b` or `c` is not an array.
   */
  zip3: curry((a, b, c) => {
    assert_array(a, 'zip3: `a` is not an array');
    assert_array(b, 'zip3: `b` is not an array');
    assert_array(c, 'zip3: `c` is not an array');
    return _zip(a, b, c, null);
  }),

  /**
   * Same as `zip` but with four arrays.
   *
   * @example
   * ```javascript
   * zip4([1, 2], [10, 20], [100, 200], [1000, 2000]);
   * //=> [[1, 10, 100, 1000], [2, 20, 200, 2000]]
   * ```
   *
   * @public
   * @param {Array} a
   * @param {Array} b
   * @param {Array} c
   * @param {Array} d
   * @return {Array<Array>}
   * @throws If either `a`, `b`, `c` or `d` is not an array.
   */
  zip4: curry((a, b, c, d) => {
    assert_array(a, 'zip4: `a` is not an array');
    assert_array(b, 'zip4: `b` is not an array');
    assert_array(c, 'zip4: `c` is not an array');
    assert_array(d, 'zip4: `d` is not an array');
    return _zip(a, b, c, d);
  })
};
