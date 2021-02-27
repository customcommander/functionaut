/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {assert_function} = require("./private/helpers");
const {isArray, isObject, isString} = require("./_internal");
const {Transformer} = require('./_transformer');
const {curry} = require("./functions");
const {into} = require("./transducer");

/** @constructor */
function Mapper(fn, xf) {
  this.fn = fn;
  this.xf = xf;
};

Transformer(Mapper, function(acc, value, key) {
  return Transformer.step(this.xf, acc, this.fn(value), key);
});

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {

  /**
   * Applies `fn` to each element of `xs` and returns a new list of the same type.
   *
   * @example
   * > Works with arrays, objects and strings
   *
   * ```javascript
   * const double = map(x => x + x);
   *
   * double([1, 2, 3]);
   * //=> [2, 4, 6]
   *
   * double({a: 1, b:2, c: 3});
   * //=> {a: 2, b: 4, c: 6}
   *
   * double("🌯🍣🌮");
   * //=> "🌯🌯🍣🍣🌮🌮"
   * ```
   *
   * @public
   * @param {function()} fn
   * @param {Array|Object|string} xs
   * @return {Array|Object|string}
   * @see into
   */
  map: curry((fn, xs) => {
    assert_function(fn, 'map: `fn` is not a function');
    const transducer = xf => new Mapper(fn, xf);
    return ( isArray(xs)        ? into([], transducer, xs)
           : isObject(xs)       ? into({}, transducer, xs)
           : isString(xs)       ? into('', transducer, xs)
           : Transformer.is(xs) ? transducer(xs)
                                : null);
  })
};
