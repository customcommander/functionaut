/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a < b`.
 *
 * @example
 * // Keep numbers lower than `5`:
 * filter(lt(5))([2,4,6,8]);
 * //=> [2,4]
 *
 * @operator
 * @function
 * @param {number} a
 * @param {number} b
 * @return {boolean}
 * @see __
 */
module.exports = op((a, b) => a < b);
