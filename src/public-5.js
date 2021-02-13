/**
 * @namespace
 * @alias string
 */
module.exports = {

  /**
   * Wraps `str` between `prefix` and `suffix`.
   *
   * @example
   * ```javascript
   * wrap("foo");
   * //=> "(foo)"
   * 
   * wrap("foo", "<", ">");
   * //=> "<foo>"
   * ```
   *
   * @public
   * @param {string} str The string to wrap.
   * @param {string} [prefix] Default "(".
   * @param {string} [suffix] Default ")".
   * @return {string}
   */
  wrap: (str, prefix, suffix) => `${prefix}${str}${suffix}`
};