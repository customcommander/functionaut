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
   * True if `a` and `b` are not equal. Use `Object.is`.
   *
   * @example
   * ```javascript
   * ne(null, undefined);
   * //=> true
   *
   * ne(NaN, NaN);
   * //=> false
   * ```
   *
   * @public
   * @param {?} a
   * @param {?} b
   * @return {boolean}
   * @see eq
   */
  ne: curry((a, b) => Object.is(a, b) == false)
};
