/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {assert_number} = require('./private/helpers');
const {isArray, isString, isObject} = require('./_internal');
const {Transformer} = require('./_transformer');
const {curry} = require('./functions');
const {into} = require('./transducer');

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
 * @namespace
 * @alias ROOT
 */
module.exports = {

  /**
   * Drops the first `n` items from `xs` and returns the rest in a new list of the same type.
   *
   * When `n` is 0 or negative `drop` does nothing.
   * When `n` is larger than the number of items `drop` returns an empty list of the same type.
   *
   * @example
   * > Works with arrays, objects and strings
   *
   * ```javascript
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
   * ```
   *
   * @public
   * @param {number} n Number of items to drop.
   * @param {Array|Object|string} xs List to drop from.
   * @return {Array|Object|string}
   * @throws When `n` is not a number.
   * @see into
   */
  drop: curry((n, xs) => {
    assert_number(n, 'drop: `n` is not a number');
    const transducer = xf => new Drop(n, xf);
    return ( isArray(xs)        ? into([], transducer, xs)
           : isString(xs)       ? into('', transducer, xs)
           : isObject(xs)       ? into({}, transducer, xs)
           : Transformer.is(xs) ? transducer(xs)
                                : null);
  })
};
