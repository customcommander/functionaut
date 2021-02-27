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
 * @namespace
 * @alias ROOT
 */
module.exports = {

  /**
   * Takes the first `n` elements from `xs` and returns them in a new list of the same type.
   *
   * An empty list of the same type is returned when `n` is either `0`, `NaN`,
   * `-Infinity` or any other negative number. A full list (of the same type)
   * is returned when `n` is either Infinity or greater than the number of elements
   * in `xs`.
   *
   * @example
   * > Works with arrays, objects and strings
   *
   * ```javascript
   * const take2 = take(2);
   *
   * take2([1, 2, 3]);
   * //=> [1, 2]
   *
   * take2({a: 1, b: 2, c: 3});
   * //=> {a: 1, b: 2}
   *
   * take2("🌯🍣🌮");
   * //=> "🌯🍣"
   * ```
   *
   * @example
   * > Emojis aren't single codepoint characters which is why these attempts at extracting the first character fails:
   *
   * ```javascript
   * "🌯🍣🌮".split("")[0];
   * //=> "�"
   * "🌯🍣🌮".slice(0, 1);
   * //=> "�"
   *
   * // because
   * "🌯".length === 2;
   * //=> true
   * ```
   *
   * @public
   * @param {number} n Number of elements to take.
   * @param {Array|Object|string} xs List to take from.
   * @return {Array|Object|string}
   * @throws When `n` is not a number.
   */
  take: curry((n, xs) => {
    assert_number(n, 'take: `n` is not a number');
    const transducer = xf => new Take(n, xf);
    return ( isArray(xs)        ? into([], transducer, xs)
           : isString(xs)       ? into('', transducer, xs)
           : isObject(xs)       ? into({}, transducer, xs)
           : Transformer.is(xs) ? transducer(xs)
                                : null);
  })
};
