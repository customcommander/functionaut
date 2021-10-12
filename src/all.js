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
   * Takes a list of predicates and returns a function that takes
   * any number of arguments and returns true if and only if
   * all predicates return true for all arguments.
   * Returns true when called with no arguments.
   * Predicates must return `true` (not truthy).
   *
   * @example
   * > Check all elements are odd numbers (Vanilla JS):
   *
   * ```javascript
   * const isNum = x => typeof x === 'number';
   * const isOdd = x => x % 2 !== 0;
   *
   * const xs = [1, "3", 5];
   * const ys = [1, 3, 5];
   *
   * xs.every(x => isNum(x) && isOdd(x));
   * //=> false
   *
   * ys.every(x => isNum(x) && isOdd(x));
   * //=> true
   * ```
   *
   * > With all:
   *
   * ```javascript
   * const oddNumber = all(isNum, isOdd);
   *
   * xs.every(x => oddNumber(x));
   * //=> false
   *
   * ys.every(y => oddNumber(y));
   * //=> true
   *
   * oddNumber(...xs);
   * //=> false
   *
   * oddNumber(...ys);
   * //=> true
   * ```
   *
   * @public
   * @param  {...function(?): boolean} fn
   * @returns {function(...?): boolean}
   */
  all: (...fn) => (...arg) => arg.every(a => fn.every(f => f(a) === true))
};