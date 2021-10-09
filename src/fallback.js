/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {curry} = require('./functions');

/**
* @namespace
* @alias ROOT
*/
module.exports = {
  /**
   * Returns `x` if and only if `y` is nil.
   * Otherwise returns `y`.
   *
   * @example
   * ```javascript
   * const your_name = fallback('john doe');
   * 
   * your_name('tom');
   * //=> 'tom'
   *
   * your_name(null);
   * //=> 'john doe'
   * ```
   *
   * @public
   * @param {?} x Any
   * @param {?} y Any
   * @return {?}
   */
  fallback: curry((x, y) => y == null ? x : y)
};
