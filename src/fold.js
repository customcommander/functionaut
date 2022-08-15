/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const curry = require('./curry');

/**
* @summary
* Reduce a list.
*
* @description
* Reduce a list `xs` by applying `f` first to the initial value and
* the first element of the list, then to value returned by the
* previous reduction and subsequent element of the list.
*
* @example
* // Product of a list
* const product = fold(mult, 1);
*
* product([1,2,3,4]);
* //=> 24
*
* @curried
* @param {function(?, ?): ?} f Binary function.
* @param {?} init Initial value
* @param {?} xs A list (either an array or an object)
* @return {?}
*/
module.exports = curry((f, init, xs) => {
  let y = init;
  for (let [, x] of iter(xs)) y = f(y, x);
  return y;
});
