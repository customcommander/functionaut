/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {curry} = require('./curry');

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {
  /**
   * Takes a binary function `f`, a unary function `g` and an `a` and a `b`.
   * Applies `f` to the result of `g(a)` and `g(b)`.
   *
   * @example
   * > Building a case-insensitive string comparison function.
   *
   * ```javascript
   * const streqi = on(eq, lower); // i.e. (a, b) => eq(lower(a), lower(b))
   * 
   * streqi('FOObar', 'fooBAR');
   * //=> true
   * ```
   *
   * @public
   * @param {function(?, ?): ?} f Binary function.
   * @param {function(?): ?} g Unary function.
   * @param {?} a Any value.
   * @param {?} b Any value.
   * @return {function(?, ?): ?}
   */
  on: curry((f, g, a, b) => f(g(a), g(b)))
};
