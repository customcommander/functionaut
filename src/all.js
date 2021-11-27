/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const curry = require('./curry');

/**
 * @summary
 * Returns true if each element of a list passed given predicate.
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
  for (let [_, v] of iter(xs)) if (pred(v) !== true) return false;
  return true;
});
