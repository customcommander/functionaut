/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');
const T = require('./T');

/**
 * @summary
 * Produces a list of values from `x`.
 *
 * @description
 * First the predicate `pred` is applied to `x`.
 * If logical true the result of applying `map` to `x` is added to the list.
 * Then the predicate is applied to the next value of `x` which is
 * obtained by applying `next` to `x` and the process repeats until
 * the predicate returns logical false.
 *
 * @example
 * // List of ten consecutive days starting from Wednesday.
 * const day =
 *   x =>
 *     ( x === 1 ? 'Mon'
 *     : x === 2 ? 'Tue'
 *     : x === 3 ? 'Wed'
 *     : x === 4 ? 'Thu'
 *     : x === 5 ? 'Fri'
 *     : x === 6 ? 'Sat'
 *               : 'Sun');
 *
 * unfold( x => x < 13        // (1)
 *       , x => day(x % 7)    // (2)
 *       , x => x + 1         // (3)
 *       , 3);                // (4)
 *
 * //=> ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
 *
 * // 1: Continues unfolding whilst the current value of `x` satisfies the predicate.
 * // 2: Transforms `x`. The result is accumulated into the list.
 * // 3: Returns the next value for `x`.
 * // 4: Starting value for `x`.
 *
 * @curried
 * @param {function(*): boolean} pred `unfold` continues whilst the predicate applied to `x` returns `true`.
 * @param {function(*): *} map `unfold` applies `map` to `x` and adds the result to the list.
 * @param {function(*): *} next `unfold` determines the next value of `x` by applying `next` to it.
 * @param {*} x
 * @return {Array<*>} The result of applying `map` to `x` and all its subsequent values.
 */
module.exports = curry((pred, map, next, x) => {
  const ret = [];
  for (let y = x; T(pred(y)); y = next(y)) ret.push(map(y));
  return ret;
});
