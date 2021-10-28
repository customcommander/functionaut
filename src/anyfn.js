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
   * if one predicate passed when applied to these arguments.
   * Returns `false` if none did.
   *
   * @example
   * > Make sure that both x and y are either numbers or strings.
   *
   * ```javascript
   * const is_num = x => typeof x == 'number';
   * const is_str = x => typeof x == 'string';
   *
   * const num_or_str = anyfn( (x, y) => is_num(x) && is_num(y)
   *                         , (x, y) => is_str(x) && is_str(y));
   *
   * num_or_str(  40,    2); //=> true
   * num_or_str('21', '21'); //=> true
   * num_or_str('40',    2); //=> false
   * ```
   *
   * @public
   * @param {...function(...?): boolean} fn One or more predicates
   * @returns {function(...?): boolean}
   * @see allfn
   * @see nonefn
   */
  anyfn: (...fn) => (...args) => fn.some(f => f(...args) === true)
};
