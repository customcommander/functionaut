/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {assert_function} = require('./private/helpers');
const {curry} = require('./functions');

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {
  /**
   * True if `a` and `b` are equal. Use `Object.is`.
   *
   * @example
   * ```javascript
   * const eq42 = eq(42);
   *
   * eq42(42);
   * //=> true
   *
   * eq42('42');
   * //=> false
   *
   * eq(NaN, NaN);
   * //=> true;
   * ```
   *
   * @public
   * @param {?} a
   * @param {?} b
   * @return {boolean}
   * @see ne
   */
  eq: curry((a, b) => Object.is(a, b) == true),

  /**
   * True if `a` and `b` are not equal. Use `Object.is`.
   *
   * @example
   * ```javascript
   * ne(null, undefined);
   * //=> true
   *
   * ne(NaN, NaN);
   * //=> false
   * ```
   *
   * @public
   * @param {?} a
   * @param {?} b
   * @return {boolean}
   * @see eq
   */
  ne: curry((a, b) => Object.is(a, b) == false),

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
   * @throws When called with no or non-function predicates.
   */
  all: (...fn) => {
    if (fn.length === 0) throw new Error('all: called with no predicates.');
    fn.forEach((f, i) => assert_function(f, `all: arg at ${i} is not a function.`));
    return (...arg) => arg.every(a => fn.every(f => f(a) === true));
  }
};