/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');

/**
 * @summary
 * Returns the sum of `a` and `b`.
 *
 * @example
 * // Add 42 to all numbers.
 * [0, 1, 2].map(add(42));
 * //=> [42, 43, 44]
 *
 * @curried
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
module.exports = curry((a, b) => a + b);
