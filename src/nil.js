/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
* @namespace
* @alias ROOT
*/
module.exports = {
  /**
   * True if `x` is either `null` or `undefined`.
   *
   * @example
   * ```javascript
   * nil(null);
   * //=> true
   *
   * nil(undefined);
   * //=> true
   *
   * nil(false);
   * //=> false
   *
   * nil(NaN);
   * //=> false
   * ```
   *
   * @public
   * @param {?} x Any
   * @return {boolean}
   */
  nil: x => x == null
};
