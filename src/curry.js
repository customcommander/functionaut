/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @summary
 * Return a curried version of `fn`.
 *
 * @example
 * const add = curry((a, b) => a + b);
 *
 * [1, 2, 3].map(add(10));
 * //=> [11, 12, 13]
 *
 * @param {function(...?): ?} fn Function to curry.
 * @return {function(...?): ?}
 */
module.exports = function _curry(fn) {
  return (...args) =>
    (args.length >= fn.length
      ? fn(...args)
      : _curry(fn.bind(null, ...args)));
};
