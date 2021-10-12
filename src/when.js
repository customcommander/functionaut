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
   * Returns `g(x)` if `f(x)` returns `true`.
   * Returns `undefined` otherwise.
   *
   * @example
   * ```javascript
   * when(eq(40), add(2))(40);
   * //=> 42
   *
   * when(eq(40), add(2))(41);
   * //=> undefined
   * ```
   *
   * @public
   * @param {function(?): boolean} f Predicate. Must return `true` not thruthy.
   * @param {function(?): ?} g Function applied to `x` if predicate is satisfied.
   * @param {?} x
   * @returns {?}
   */
  when: curry((f, g, x) => f(x) === true ? g(x) : undefined)
};
