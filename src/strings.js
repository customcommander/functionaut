/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {assert_string} = require('./private/helpers');

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
  * @throws When `s` is not a string.
  * @see lower
  */
  upper: s => {
    assert_string(s, 'upper: `s` is not a string');
    return s.toUpperCase();
  },

  /**
  * Returns `s` lowercased.
  *
  * @example
  * ```javascript
  * lower('FOO');
  * //=> 'foo'
  * ```
  *
  * @public
  * @param {string} s
  * @return {string}
  * @throws When `s` is not a string.
  * @see upper
  */
  lower: s => {
    assert_string(s, 'lower: `s` is not a string');
    return s.toLowerCase();
  }
};