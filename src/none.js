/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const curry = require('./curry');

/**
 * @summary
 * True if no elements of a list satisfied given predicate.
 *
 * @description
 * True if all elements of `xs` didn't satisfy predicate `pred`.
 * Otherwise returns false as soon as one did.
 *
 * @example
 * // Check that a list does not contain any 'x'
 * const no_x = none(x => x === 'x');
 *
 * no_x(['a','b','c']);            //=> true
 * no_x(['a','x','c']);            //=> false
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
  for (let [_, v] of iter(xs)) if (pred(v) === true) return false;
  return true;
});
