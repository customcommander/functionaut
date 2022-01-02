/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a === b`. Use `Object.is`.
 *
 * @example
 * const eq42 = eq(42);
 *
 * eq42(42);     //=> true
 * eq42('42');   //=> false (1)
 * eq(NaN, NaN); //=> true
 *
 * // 1: **failed:** not the same type
 *
 * @operator
 * @function
 * @param {?} a
 * @param {?} b
 * @return {boolean}
 * @see ne
 */
module.exports = op((a, b) => Object.is(a, b) == true);
