/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');

/**
 * @summary
 * Apply `f` to the result of `g(a)` and `g(b)`.
 *
 * @example
 * // Building a case-insensitive string comparison function.
 * const streqi = on(eq, lower); // i.e. (a, b) => eq(lower(a), lower(b))
 * 
 * streqi('FOObar', 'fooBAR');
 * //=> true
 *
 * @curried
 * @param {function(?, ?): ?} f Binary function.
 * @param {function(?): ?} g Unary function.
 * @param {?} a Any value.
 * @param {?} b Any value.
 * @return {?}
 */
module.exports = curry((f, g, a, b) => f(g(a), g(b)));
