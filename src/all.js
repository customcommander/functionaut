/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const curry = require('./curry');
const F = require('./F');

/**
 * @summary
 * Returns true if `pred` has returned logical true for all elements of `xs`.
 *
 * @example
 * // This example shows that `all` can with arrays, objects and strings.
 * const allx = all(x => x === 'x');
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
 * // Checking strings
 * allx('x');                     //=> true
 * allx('xx');                    //=> true
 * allx('xyx');                   //=> false
 *
 * @curried
 * @param {function(?): boolean} pred Predicate
 * @param {Array|Object|string} xs List of values
 * @returns {boolean}
 */
module.exports = curry((pred, xs) => {
  for (let [_, v] of iter(xs)) if (F(pred(v))) return false;
  return true;
});
