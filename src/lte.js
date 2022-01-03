/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a <= b`.
 *
 * @example
 * // Keep numbers lower than or equal to `3`:
 * filter(lte(3))([1,2,3,4,5]);
 * //=> [1,2,3]
 *
 * @operator
 * @function
 * @param {number} a
 * @param {number} b
 * @return {boolean}
 * @see __
 */
module.exports = op((a, b) => a <= b);
