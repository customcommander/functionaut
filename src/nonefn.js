/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const F = require('./F');

/**
 * @summary
 * True if no predicates passed when applied to arguments.
 *
 * @description
 * Takes one or more predicates and returns a function
 * that takes any number of arguments and returns `true`
 * if no predicates returned logical true when applied
 * to these arguments. Returns `false` if one did.
 *
 * @example
 * // Make sure that both x and y are neither numbers or strings.
 * const is_num = x => typeof x == 'number';
 * const is_str = x => typeof x == 'string';
 *
 * const no_num_or_str = nonefn( (x, _) => is_num(x) || is_str(x)
 *                             , (_, y) => is_str(y) || is_str(y));
 *
 * no_num_or_str(    40,      2); //=> false
 * no_num_or_str(  '21',   '21'); //=> false
 * no_num_or_str(  '40',      2); //=> false
 * no_num_or_str(['40'], {x: 2}); //=> true
 *
 * @param {...function(...?): boolean} pred One or more predicates
 * @returns {function(...?): boolean}
 * @see allfn
 * @see anyfn
 */
module.exports = (...pred) => (...args) => pred.every(p => F(p(...args)));
