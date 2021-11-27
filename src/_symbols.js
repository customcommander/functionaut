/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

module.exports = {
  /**
   * Can be used where `into` is used to convert a list
   * into another list of the **same** type:
   *
   * ```javascript
   * // Instead of this:
   *
   * if (typeof xs == 'string') {
   *   into('', map(foo), xs);
   * } else if (Array.isArray(xs)) {
   *   into([], map(foo), xs);
   * }
   *
   * // Do this:
   *
   * into(SameListType, map(foo), xs);
   * ```
   *
   * @private
   */
  SameListType: Symbol(),

  Recur: Symbol(),

  Args: Symbol(),

  Value: Symbol()
};


