/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');

/**
 * @summary
 * Swap the first two arguments of a function.
 *
 * @description
 * Take a function `fn` of arity 2 (or more) and return
 * a curried version of it where the first two parameters
 * have been swapped.
 *
 * @example
 * const x = (a, b, c) => a + b + c;
 *
 * x('foo', 'bar', 'baz');
 * //=> 'foobarbaz'
 *
 * const y = flip(x);
 *
 * y('foo')('bar', 'baz');
 * //=> 'barfoobaz'
 *
 * @param {function(?, ?, ...?): ?} fn
 * @return {function(?, ?, ...?): ?}
 */
module.exports = fn => curry(function (a, b) {
  const [x, y, ...z] = Array.from(arguments);
  return fn(y, x, ...z);
});
