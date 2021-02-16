/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {assert_number} = require('./private/helpers');


/**
 * @namespace
 * @alias ROOT
 */
module.exports = {

  /**
   * Takes 1 away from `x`.
   *
   * @example
   * ```javascript
   * dec(43);
   * //=> 42
   * ```
   *
   * @example
   * > Does not work with number objects
   *
   * ```javascript
   * dec(new Number(43));
   * // ERR!
   * ```
   *
   * @public
   * @param {number} x Any number
   * @return {number}
   */
  dec: x => {
    assert_number(x, 'dec: `x` is not a number');
    return x - 1;
  },

  /**
   * Adds 1 to `x`.
   *
   * @example
   * ```javascript
   * inc(41);
   * //=> 42
   * ```
   *
   * @example
   * > Does not work with number objects!
   *
   * ```javascript
   * inc(new Number(41));
   * // ERR!
   * ```
   *
   * @public
   * @param {number} x Any number
   * @return {number}
   * @throws When `x` is not a number.
   */
  inc: x => {
    assert_number(x, 'inc: `x` is not a number');
    return x + 1;
  }
};