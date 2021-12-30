/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const curry = require('./curry');
const T = require('./T');

/**
 * @summary
 * True if given predicate returned logical true for at least one element of the list.
 *
 * @example
 * // Check that a list does contain at least one 'x'.
 * const has_x = any(x => x === 'x');
 *
 * has_x(['a','b','c']);            //=> false
 * has_x(['a','x','c']);            //=> true
 *
 * has_x('abc');                    //=> false
 * has_x('axc');                    //=> true
 *
 * has_x({m: 'a', n: 'b', o: 'c'}); //=> false
 * has_x({m: 'a', n: 'x', o: 'c'}); //=> true
 *
 * @curried
 * @param {function(?): boolean} pred Predicate
 * @param {Array|Object|string} xs List of values
 * @returns {boolean}
 * @see all
 * @see none
 */
module.exports = curry((pred, xs) => {
  for (let [_, v] of iter(xs)) if (T(pred(v))) return true;
  return false;
});
