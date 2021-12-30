/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const curry = require('./curry');
const T = require('./T');

/**
 * @summary
 * True if no elements of a list satisfied given predicate.
 *
 * @description
 * Returns true if predicate returned logical false
 * for all elements of the list. When a predicate returns
 * logical true, the function returns false immediately.
 *
 * @example
 * // Check that a list does not contain any 'x'
 * const no_x = none(x => x === 'x');
 *
 * no_x(['a', 'b', 'c']);          //=> true
 * no_x(['a', 'x', 'c']);          //=> false
 *
 * no_x('abc');                    //=> true
 * no_x('axc');                    //=> false
 * 
 * no_x({m: 'a', n: 'b', o: 'c'}); //=> true
 * no_x({m: 'a', n: 'x', o: 'c'}); //=> false
 *
 * @curried
 * @param {function(?): boolean} pred Predicate
 * @param {Array|Object|string} xs List of values
 * @returns {boolean}
 * @see all
 * @see any
 */
module.exports = curry((pred, xs) => {
  for (let [_, v] of iter(xs)) if (T(pred(v))) return false;
  return true;
});
