/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {isArray, isString, isObject} = require('./_internal');
const {Transformer} = require('./_transformer');
const {curry} = require('./curry');

/** @constructor */
function Push() {};
Transformer(Push, function(acc, value) {
  acc.push(value);
  return acc;
});

/** @constructor */
function Append() {}
Transformer(Append, function(acc, value) {
  return acc + value;
});

/** @constructor */
function Assoc() {}
Transformer(Assoc, function(acc, value, key) {
  acc[key] = value;
  return acc;
});

const iterList = (xf, init, xs) => {
  let acc = init;
  let key = 0;
  for (const value of xs) {
    acc = Transformer.step(xf, acc, value, key);
    if (Transformer.isReduced(acc)) {
      acc = Transformer.Value(acc);
      break;
    }
    key++;
  }
  return Transformer.result(xf, acc);
};

const iterObject = (xf, init, xs) => {
  let acc = init;
  for (const [key, value] of Object.entries(xs)) {
    acc = Transformer.step(xf, acc, value, key);
    if (Transformer.isReduced(acc)) {
      acc = Transformer.Value(acc);
      break;
    }
  }
  return Transformer.result(xf, acc);
};

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {
  /**
   * Reduces a list into another list (not necessarily of the same type)
   * by applying a serie of transformations (`transducer`) to each value
   * of the list in a single iteration. The transducer is defined by composing
   * list functions together. Be aware that due to the nature of transducers
   * the order of execution will be left to right.
   *
   * The following functions act as transducers when composed:
   *
   * - filter
   * - map
   * - take
   * - drop
   *
   * @example
   * > Map over the elements and accumulate into a string:
   *
   * ```javascript
   * into('', map(inc), [10, 20, 30]);
   * //=> '112131'
   * ```
   *
   * @example
   * > Map over the properties and accumulate into an array:
   *
   * ```javascript
   * into([], map(inc), {a: 10, b: 20, c: 30});
   * //=> [11, 21, 31]
   * ```
   *
   * @example
   * > Map over the characters and accumulate into a string:
   *
   * ```javascript
   * into('', map(c => c.repeat(parseInt(c))), '1234');
   * //=> '1223334444'
   * ```
   *
   * @example
   * > Transducer example: take only the first two elements, increment them and accumulate into a string:
   *
   * ```javascript
   * into('', compose(take(2), map(inc)), [10, 20, 30]);
   * //=> '1121'
   * ```
   *
   * @public
   * @param {Array|Object|string} init
   * @param {function()} transducer
   * @param {Array|Object|string} xs
   * @return {Array|Object|string}
   * @see filter
   * @see map
   * @see take
   * @see drop
   */
  into: curry((init, transducer, xs) => {
    const iter =
      ( isArray(xs)  ? iterList
      : isString(xs) ? iterList
      : isObject(xs) ? iterObject
                     : null);

    if (!iter) return null;

    const xf =
      ( isArray(init)  ? transducer(new Push())
      : isString(init) ? transducer(new Append())
      : isObject(init) ? transducer(new Assoc())
                       : null);

    if (!xf) return null;

    const start =
      ( isArray(init)  ? [...init]
      : isObject(init) ? {...init}
                       : init);

    return iter(xf, start, xs);
  })
};
