/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {curry} = require('./curry');

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {
  /**
   * Produces a list of values from `x`.
   *
   * First the predicate `pred` is applied to `x`.
   * If true the result of applying `map` to `x` is added to the list.
   * Then the predicate is applied to the next value of `x` which is
   * obtained by applying `next` to `x` and the process repeats until
   * the predicate returns false.
   *
   * @example
   * > List of ten consecutive days starting from Wednesday.
   *
   * ```javascript
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
   * unfold( x => x < 13        // pred
   *       , x => day(x % 7)    // map
   *       , x => x + 1         // next
   *       , 3);                // x
   *
   * //=> ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
   * ```
   *
   * @public
   * @param {function(*): boolean} pred `unfold` continues whilst the predicate applied to `x` returns `true`.
   * @param {function(*): *} map `unfold` applies `map` to `x` and adds the result to the list.
   * @param {function(*): *} next `unfold` determines the next value of `x` by applying `next` to it.
   * @param {*} x
   * @return {Array<*>} The result of applying `map` to `x` and all its subsequent values.
   */
  unfold: curry((pred, map, next, x) => {
    const ret = [];
    for (let y = x; pred(y) === true; y = next(y)) ret.push(map(y));
    return ret;
  })
};
