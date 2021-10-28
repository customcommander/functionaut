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
   * Takes one or more predicates and returns a function
   * that takes any number of arguments and returns `true`
   * if each predicate has returned `true` when applied
   * to these arguments.
   *
   * @example
   * > Make sure that both x and y are numbers and produce the correct answer when added up.
   *
   * ```javascript
   * const is_num = x => typeof x == 'number';
   *
   * const can_answer = allfn( (x, y) => is_num(x) && is_num(y)
   *                         , (x, y) => x + y === 42);
   *
   * can_answer(  40,  2); //=> true
   * can_answer(  21, 21); //=> true
   * can_answer(  20, 30); //=> false
   * can_answer('40',  2); //=> false
   * ```
   *
   * @public
   * @param {...function(...?): boolean} fn One or more predicates
   * @returns {function(...?): boolean}
   * @see anyfn
   * @see nonefn
   */
  allfn: (...fn) => (...args) => fn.every(f => f(...args) === true)
};
