/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a >= b`.
 *
 * @example
 * // Keep numbers greater than or equal to `3`:
 * filter(gte(3))([1,2,3,4]);
 * //=> [3,4]
 *
 * @operator
 * @function
 * @param {number} a
 * @param {number} b
 * @return {boolean}
 * @see __
 */
module.exports = op((a, b) => a >= b);
