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
   * Allows the partial application of a non-curried function.
   * Takes a function `f` and a list of initial arguments and
   * returns a new function that takes the remaining arguments and
   * applies `f` to both lists of arguments.
   *
   * @example
   * ```javascript
   * const msg = (a, b, c) => `${a} ${b} ${c}`;
   *
   * partial(msg, 'Hello')('World', '!');
   * //=> "Hello World !"
   *
   * partial(msg, 'Hello', 'World')('!');
   * //=> "Hello World !"
   * ```
   *
   * @public
   * @param {function(...?): ?} f The partially applied function.
   * @param  {...?} init The initial list of arguments
   * @returns {function(...?): ?} A function that takes the remaining arguments
   *                              then applies `f` to both lists of arguments.
   */
  partial: (f, ...init) => (...tail) => f(...init, ...tail)
};
