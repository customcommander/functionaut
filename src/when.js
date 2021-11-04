/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');
const T = require('./T');

/**
 * @summary
 * Returns `g(x)` if `f(x)` returns `true`. Returns `undefined` otherwise.
 *
 * @example
 * when(eq(40), add(2))(40);
 * //=> 42
 *
 * when(eq(40), add(2))(41);
 * //=> undefined
 *
 * @curried
 * @param {function(?): boolean} f Predicate. Must return `true` not thruthy.
 * @param {function(?): ?} g Function applied to `x` if predicate is satisfied.
 * @param {?} x
 * @returns {?}
 */
module.exports = curry(function (f, g, x /* <- x is needed to maintain the function arity */) {
  const [/*f*/,/*g*/,...xs] = Array.from(arguments);
  return T(f(...xs)) ? g(...xs) : undefined;
});
