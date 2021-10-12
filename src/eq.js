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
   * True if `a` and `b` are equal. Use `Object.is`.
   *
   * @example
   * ```javascript
   * const eq42 = eq(42);
   *
   * eq42(42);
   * //=> true
   *
   * eq42('42');
   * //=> false
   *
   * eq(NaN, NaN);
   * //=> true;
   * ```
   *
   * @public
   * @param {?} a
   * @param {?} b
   * @return {boolean}
   * @see ne
   */
  eq: curry((a, b) => Object.is(a, b) == true)
};
