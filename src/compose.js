/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @summary
 * Performs a right-to-left function composition.
 *
 * @description
 * Given a list of functions returns a new function that takes any number of parameters and applies
 * the rightmost function to them, the result of which is fed into the second rightmost function, etc.
 * Returns the return value of the leftmost function.
 *
 * @example
 * const answer = compose(inc, inc, add);
 * answer(30, 10);
 * //=> 42
 *
 * @public
 * @param  {...function(...?): ?} fn
 * @returns {function(...?): ?}
 * @see concede
 */
module.exports = (...fn) => (...args) => {
  let i = fn.length - 1;
  let x = fn[i](...args);
  while (--i >= 0) x = fn[i](x);
  return x;
};
