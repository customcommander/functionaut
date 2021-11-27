/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {Transformer} = require('./_transformer');
const {SameListType} = require('./_symbols');
const curry = require('./curry');
const into = require('./into');

/** @constructor */
function Drop(n, xf) {
  this.n = Object.is(n, NaN) ? 0 : n;
  this.xf = xf;
}

Transformer(Drop, function(acc, value, key) {
  if (this.n > 0) {
    this.n--;
    return acc;
  } else {
    return Transformer.step(this.xf, acc, value, key);
  }
});

/**
 * @summary
 * Returns a new list without the first `n` elements of the original list.
 *
 * @description
 * Drops the first `n` items from `xs` and returns the rest in a new list of the same type.
 *
 * When `n` is 0 or negative `drop` does nothing.
 * When `n` is larger than the number of items `drop` returns an empty list of the same type.
 *
 * @example
 * // Works with arrays, objects and strings
 * const drop2 = drop(2);
 *
 * drop2([1, 2, 3]);
 * //=> [3]
 *
 * drop2({a: 1, b: 2, c: 3});
 * //=> {c: 3}
 *
 * drop2("🌯🍣🌮");
 * //=> "🌮"
 *
 * @curried
 * @transducer
 * @param {number} n Number of items to drop.
 * @param {Array|Object|string} xs List to drop from.
 * @return {Array|Object|string}
 */
module.exports = curry((n, xs) => {
  const transducer = xf => new Drop(n, xf);
  return (Transformer.is(xs)
            ? transducer(xs)
            : into(SameListType, transducer, xs));
});
