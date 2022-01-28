/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {Transformer} = require('./_transformer');
const {SameListType} = require('./_symbols');
const T = require('./T');
const curry = require('./curry');
const into = require('./into');

/** @constructor */
function Filter(pred, xf) {
  this.pred = pred;
  this.xf = xf;
}

Transformer(Filter, function(acc, value, key) {
  return (T(this.pred(value))
            ? Transformer.step(this.xf, acc, value, key)
            : acc);
});

/**
 * @summary
 * Returns a new list with only the elements that passed a predicate.
 *
 * @description
 * Keeps the elements in `xs` that satisfied the predicate `fn`
 * and returns a new list of the same type. The predicate must return logical true.
 *
 * @example
 * // Works with arrays and objects
 * const even = filter(x => x % 2 === 0);
 *
 * even([1, 2, 3, 4]);
 * //=> [2, 3]
 *
 * even({a: 1, b: 2, c: 3, d: 4});
 * //=> {b: 2, d: 4}
 *
 * @curried
 * @transducer
 * @param {function(*): boolean} pred
 * @param {Array|Object} xs
 * @return {Array|Object}
 */
module.exports = curry((pred, xs) => {
  const transducer = xf => new Filter(pred, xf);
  return (Transformer.is(xs)
            ? transducer(xs)
            : into(SameListType, transducer, xs));
});
