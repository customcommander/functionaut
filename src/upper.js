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
   * Returns `s` uppercased.
   *
   * @example
   * ```javascript
   * upper('foo');
   * //=> 'FOO'
   * ```
   *
   * @public
   * @param {string} s
   * @return {string}
   * @see lower
   */
  upper: s => s.toUpperCase()
};
