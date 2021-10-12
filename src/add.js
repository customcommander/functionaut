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
   * Adds `a` and `b`.
   *
   * @example
   * > Curried function that adds two numbers
   *
   * ```javascript
   * const add10 = add(10);
   * add10(32);
   * //=> 42
   * ```
   *
   * @public
   * @param {number} a
   * @param {number} b
   * @return {number}
   */
  add: curry((a, b) => a + b)
};
