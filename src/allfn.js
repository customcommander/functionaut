/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @summary
 * Returns a function that returns true if all predicates have passed when applied to its arguments.
 *
 * @description
 * Takes one or more predicates and returns a function
 * that takes any number of arguments and returns `true`
 * if each predicate has returned `true` when applied
 * to these arguments.
 *
 * @example
 * // Make sure that both `x` and `y` are numbers and produce the correct answer when added up.
 * const is_num = x => typeof x == 'number';
 *
 * const can_answer =
 *  allfn( (x, y) => is_num(x) && is_num(y) // (1)
 *       , (x, y) => x + y === 42);         // (2)
 *
 * can_answer(  40,  2); //=> true             (3)
 * can_answer(  20, 30); //=> false            (4)
 * can_answer('40',  2); //=> false            (5)
 *
 * // 1: **1st predicate:** checks both arguments are numbers.
 * // 2: **2nd predicate:** checks numbers add up to 42.
 * // 3: **passed:** both arguments are numbers and add up to 42.
 * // 4: **failed:** both arguments are numbers but do not add up to 42.
 * // 5: **failed:** 1st argument is not a number.
 *
 * @param {...function(...?): boolean} fn One or more predicates
 * @returns {function(...?): boolean}
 * @see anyfn
 * @see nonefn
 */
module.exports = (...fn) => (...args) => fn.every(f => f(...args) === true);
