/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {Transformer} = require('./_transformer');
const {SameListType} = require('./_symbols');
const curry = require('./curry');
const into = require('./into');

/** @constructor */
function Take(n, xf) {
  this.n = Object.is(n, NaN) ? 0 : n;
  this.xf = xf;
}

Transformer(Take, function(acc, value, key) {
  if (this.n > 0) acc = Transformer.step(this.xf, acc, value, key);
  this.n--;
  if (this.n == 0) acc = Transformer.Reduced(acc);
  return acc;
});

/**
 * @summary
 * Returns a new list with only the first `n` elements from `xs`.
 *
 * @description
 * Takes the first `n` elements from `xs` and returns them in a new list of the same type.
 *
 * An empty list of the same type is returned when `n` is either `0`, `NaN`,
 * `-Infinity` or any other negative number. A full list (of the same type)
 * is returned when `n` is either Infinity or greater than the number of elements
 * in `xs`.
 *
 * @example
 * // Works with arrays and objects.
 * const take2 = take(2);
 *
 * take2([1, 2, 3]);
 * //=> [1, 2]
 *
 * take2({a: 1, b: 2, c: 3});
 * //=> {a: 1, b: 2}
 *
 * @curried
 * @transducer
 * @param {number} n Number of elements to take.
 * @param {Array|Object} xs List to take from.
 * @return {Array|Object}
 */
module.exports = curry((n, xs) => {
  const transducer = xf => new Take(n, xf);
  return (Transformer.is(xs)
            ? transducer(xs)
            : into(SameListType, transducer, xs));
});
