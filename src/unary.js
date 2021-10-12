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
   * Takes a function `fn` of any arity and returns
   * a (curried) version of it that takes exactly one
   * parameter. Any extra parameters are discarded.
   *
   * @example
   * ```javascript
   * ['1', '2', '3'].map(parseInt);
   * //=> [1, NaN, NaN]
   * // equivalent to [parseInt('1', 0), parseInt('2', 1), parseInt('3', 2)]
   * // array indices................^.................^.................^
   *
   * ['1', '2', '3'].map(unary(parseInt));
   * //=> [1, 2, 3]
   * // equivalent to [parseInt('1'), parseInt('2'), parseInt('3')]
   * ```
   *
   * @public
   * @param {function()} fn
   * @return {function()}
   */
  unary: fn => curry(x => fn(x))
};
