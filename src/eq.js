/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');

/**
 * @summary
 * True if `a` and `b` are equal as per `Object.is`.
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
 * @curried
 * @param {?} a
 * @param {?} b
 * @return {boolean}
 * @see ne
 */
module.exports = curry((a, b) => Object.is(a, b) == true);
