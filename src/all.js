/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const curry = require('./curry');
const F = require('./F');

/**
 * @summary
 * Returns `true` if predicate passed for all elements of the list.
 *
 * @example
 * // Returns `true` if all elements of a list are equal to `x`:
 * const allx = all(eq('x'));
 *
 * // Checking arrays
 * allx(['x']);                   //=> true
 * allx(['x', 'x']);              //=> true
 * allx(['x', 'y', 'x']);         //=> false
 *
 * // Checking objects
 * allx({a:'x'});                 //=> true
 * allx({a:'x', b: 'x'});         //=> true
 * allx({a:'x', b: 'y', c: 'x'}); //=> false
 *
 * @curried
 * @param {function(?): boolean} pred Predicate
 * @param {Array|Object} xs List of values
 * @returns {boolean}
 */
module.exports = curry((pred, xs) => {
  for (let [_, v] of iter(xs)) if (F(pred(v))) return false;
  return true;
});
