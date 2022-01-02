/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a + b`.
 *
 * @example
 * // Add 42 to all numbers.
 * [0, 1, 2].map(add(42));
 * //=> [42, 43, 44]
 *
 * @operator
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
module.exports = op((a, b) => a + b);
