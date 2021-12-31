/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');
const T = require('./T');

/**
 * @summary
 * Returns `fn(...x)` if `pred(...x)` has returned logical true. Otherwise returns `undefined`.
 *
 * @example
 * when(eq(40), add(2))(40);
 * //=> 42
 *
 * when(eq(40), add(2))(41);
 * //=> undefined
 *
 * @curried
 * @param {function(...?): boolean} pred Predicate. Must return logical true.
 * @param {function(...?): ?} fn Function applied to the arguments if predicate is satisfied
 * @param {...?} x One or more arguments
 * @returns {?}
 */
module.exports = curry(function (pred, fn, x /* <- x is needed to maintain the function arity */) {
  const [,,...xs] = Array.from(arguments);
  return T(pred(...xs)) ? fn(...xs) : undefined;
});
