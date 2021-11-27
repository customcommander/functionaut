/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const _zip = require('./_zip');
const curry = require('./curry');

/**
 * @summary
 * Same as `zip` but with four arrays.
 *
 * @example
 * zip4([1, 2], [10, 20], [100, 200], [1000, 2000]);
 * //=> [[1, 10, 100, 1000], [2, 20, 200, 2000]]
 *
 * @curried
 * @param {Array} a
 * @param {Array} b
 * @param {Array} c
 * @param {Array} d
 * @return {Array<Array>}
 * @see zip
 */
module.exports = curry((a, b, c, d) => _zip(a, b, c, d));
