/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const curry = require('./curry');
const T = require('./T');
 
/**
 * @summary
 * Makes sure given predicate is true for each element of the list.
 *
 * @description
 * Takes a predicate `pred` and a list `xs` and returns `true` if `pred(x)`
 * has returned logical true for each `x` of the list. Returns `false`
 * as soon as `pred(x)` returns logical false.
 *
 * @example
 * // Make sure all elements are numbers.
 * const numbers = allmap(x => typeof x == 'number');
 *
 * numbers([]);                   //> true
 * numbers([0,   1, 2]);          //> true
 * numbers([0, '1', 2]);          //> false
 *
 * numbers({});                   //> true
 * numbers({a: 1, b:   2, c: 3}); //> true
 * numbers({a: 1, b: '2', c: 3}); //> false
 *
 * @curried
 * @function
 * @param {function(?): boolean} pred
 * @param {Array|Object} xs
 * @returns {boolean}
 */
module.exports = curry((pred, xs) => {
  for (let [_, v] of iter(xs)) if (T(pred(v))) return true;
  return false;
});
