/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a !== b`. Use `Object.is`.
 *
 * @example
 * ne(null, undefined);
 * //=> true
 *
 * ne(NaN, NaN);
 * //=> false
 *
 * @operator
 * @function
 * @param {?} a
 * @param {?} b
 * @return {boolean}
 * @see eq
 */
module.exports = op((a, b) => Object.is(a, b) == false);
