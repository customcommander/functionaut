/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const _zip = require('./_zip');
const curry = require('./curry');

/**
 * @summary
 * Combine each element at the same index of two arrays.
 * 
 * @description
 * Takes two arrays `a` and `b` and returns a new array
 * where each element of `a` and `b` at the same index are
 * put together. The length of the new array is equal to the length
 * of the smallest array.
 *
 * @example
 * zip([1, 2], [10, 20]);
 * //=> [[1, 10], [2, 20]]
 *
 * @example
 * // When arrays are not the same length
 * zip([1, 2], [10, 20, 30]);
 * //=> [[1, 10], [2, 20]]
 * zip([1, 2], [10]);
 * //=> [[1, 10]]
 * zip([1, 2], []);
 * //=> []
 * zip([], [10, 20, 30]);
 * //=> []
 *
 * @curried
 * @param {Array} a An array
 * @param {Array} b Another array
 * @return {Array<Array>}
 * @see zip3
 * @see zip4
 */
module.exports = curry((a, b) => _zip(a, b));
