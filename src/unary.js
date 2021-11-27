/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @summary
 * Takes a function `fn` of any arity and returns version of it that takes exactly one parameter.
 *
 * @example
 * // It easy to forget that `parseInt` can take a number *and* a radix:
 * ['1', '2', '3'].map(parseInt);
 * //=> [1, NaN, NaN]
 * // equivalent to [parseInt('1', 0), parseInt('2', 1), parseInt('3', 2)]
 * // array indices................^.................^.................^
 *
 * @example
 * // We can avoid this with `unary`:
 * ['1', '2', '3'].map(unary(parseInt));
 * //=> [1, 2, 3]
 * // equivalent to [parseInt('1'), parseInt('2'), parseInt('3')]
 *
 * @param {function(...?): ?} fn
 * @return {function(?): ?}
 */
module.exports = fn => x => fn(x);
