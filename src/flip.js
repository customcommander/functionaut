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
   * Takes a function `fn` of arity 2 (or more) and returns
   * a (curried) version of it in which the first two parameters
   * have been swapped.
   *
   * @example
   * ```javascript
   * const x = (a, b, c) => a + b + c;
   * x('foo', 'bar', 'baz');
   * //=> 'foobarbaz'
   *
   * const y = flip(x);
   * y('foo')('bar', 'baz');
   * //=> 'barfoobaz'
   * ```
   *
   * @public
   * @param {function()} fn
   * @return {function()}
   */
  flip: fn => curry(function (a, b) {
    const [x, y, ...z] = Array.from(arguments);
    return fn(y, x, ...z);
  })
};
