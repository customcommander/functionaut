/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {Transformer} = require('./_transformer');
const {SameListType} = require('./_symbols');
const curry = require("./curry");
const into = require("./into");

/** @constructor */
function Mapper(fn, xf) {
  this.fn = fn;
  this.xf = xf;
};

Transformer(Mapper, function(acc, value, key) {
  return Transformer.step(this.xf, acc, this.fn(value), key);
});

/**
 * @summary
 * Apply a function to each element of a list.
 *
 * @description
 * Take a function `fn` then a list `xs`.
 * Return a list of the same type with the result of applying `fn` to each element of `xs`.
 *
 * @example
 * // Works with arrays and objects.
 * const double = map(x => x + x);
 *
 * double([1, 2, 3]);
 * //=> [2, 4, 6]
 *
 * double({a: 1, b: 2, c: 3});
 * //=> {a: 2, b: 4, c: 6}
 *
 * @curried
 * @transducer
 * @param {function()} fn
 * @param {Array|Object} xs
 * @return {Array|Object}
 * @see into
 */
module.exports = curry((fn, xs) => {
  const transducer = xf => new Mapper(fn, xf);
  return (Transformer.is(xs)
            ? transducer(xs)
            : into(SameListType, transducer, xs));
});
