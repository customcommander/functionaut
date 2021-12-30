/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const T = require('./T');

/**
 * @summary
 * True if one predicate returned logical true when applied to arguments.
 *
 * @description
 * Takes one or more predicates and returns a function
 * that takes any number of arguments and returns `true`
 * if one predicate returned logical true when applied to these arguments.
 * Returns `false` if none did.
 *
 * @example
 * // Make sure that both x and y are either numbers or strings.
 * const is_num = x => typeof x == 'number';
 * const is_str = x => typeof x == 'string';
 *
 * const num_or_str = anyfn( (x, y) => is_num(x) && is_num(y)
 *                         , (x, y) => is_str(x) && is_str(y));
 *
 * num_or_str(  40,    2); //=> true
 * num_or_str('21', '21'); //=> true
 * num_or_str('40',    2); //=> false
 *
 * @param {...function(...?): boolean} fn One or more predicates
 * @returns {function(...?): boolean}
 * @see allfn
 * @see nonefn
 */
module.exports = (...fn) => (...args) => fn.some(f => T(f(...args)));
