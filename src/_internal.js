/** @package */

module.exports = {
  /**
   * @return {boolean}
   */
  isArray: x => Array.isArray(x),

  /**
   * Check whether `x` is a plain object.
   * @return {boolean}
   */
  isObject: x => x != null && Object.getPrototypeOf(x) === Object.prototype,

  /**
   * @return {boolean}
   */
  isString: x => typeof x == 'string'
};