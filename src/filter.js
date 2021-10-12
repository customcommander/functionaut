/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {isArray, isString, isObject} = require('./_internal');
const {Transformer} = require('./_transformer');
const {curry} = require('./curry');
const {into} = require('./into');

/** @constructor */
function Filter(fn, xf) {
  this.fn = fn;
  this.xf = xf;
}

Transformer(Filter, function(acc, value, key) {
  return (this.fn(value) === true
            ? Transformer.step(this.xf, acc, value, key)
            : acc);
});

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {
  /**
   * Keeps the elements in `xs` that satisfy the predicate `fn`
   * and returns a new list of the same type.
   *
   * @example
   * > Works with arrays, objects and strings
   *
   * ```javascript
   * const even = filter(x => x % 2 === 0);
   *
   * even([1, 2, 3, 4]);
   * //=> [2, 3]
   *
   * even({a: 1, b: 2, c: 3, d: 4});
   * //=> {b: 2, d: 4}
   *
   * filter(x => x === "🌯", "🌯🍣🌯🍣🌯🍣");
   * //=> "🌯🌯🌯"
   * ```
   *
   * @public
   * @param {function(*): boolean} fn
   * @param {Array|Object|string} xs
   * @return {Array|Object|string}
   * @see take
   * @see into
   */
  filter: curry((fn, xs) => {
    const transducer = xf => new Filter(fn, xf);
    return ( isArray(xs)        ? into([], transducer, xs)
           : isString(xs)       ? into('', transducer, xs)
           : isObject(xs)       ? into({}, transducer, xs)
           : Transformer.is(xs) ? transducer(xs)
                                : null);
  })
};
