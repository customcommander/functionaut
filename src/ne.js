/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');

/**
 * @summary
 * True if `a` and `b` are not equal. Use `Object.is`.
 *
 * @example
 * ne(null, undefined);
 * //=> true
 *
 * ne(NaN, NaN);
 * //=> false
 *
 * @curried
 * @param {?} a
 * @param {?} b
 * @return {boolean}
 * @see eq
 */
module.exports = curry((a, b) => Object.is(a, b) == false);
