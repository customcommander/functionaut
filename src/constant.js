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
   * Takes a `x` and returns a function that _always_ returns `x`.
   *
   * @example
   * ```javascript
   * const answer = constant(42);
   *
   * answer();
   * //=> 42
   *
   * answer('foobar');
   * //=> 42
   * ```
   *
   * @public
   * @param {?} x
   * @returns {function(): ?}
   */
  constant: x => () => x
};
