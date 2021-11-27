/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const _zip = require('./_zip');
const curry = require('./curry');

/**
 * @summary
 * Same as `zip` but with three arrays.
 *
 * @example
 * zip3([1, 2], [10, 20], [100, 200]);
 * //=> [[1, 10, 100], [2, 20, 200]]
 *
 * @curried
 * @param {Array} a
 * @param {Array} b
 * @param {Array} c
 * @return {Array<Array>}
 * @see zip
 */
module.exports = curry((a, b, c) => _zip(a, b, c));
