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
  dec: x => x - 1,

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
   */
  inc: x => x + 1,

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