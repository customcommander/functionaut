/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const {Transformer} = require('./_transformer');
const {SameListType} = require('./_symbols');
const curry = require('./curry');

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

/**
 * @summary
 * Transform a list into another list.
 *
 * @description
 * Reduces a list into another list (not necessarily of the same type)
 * by applying a serie of transformations (`transducer`) to each value
 * of the list in a single iteration. The transducer is defined by composing
 * list functions together. Be aware that due to the nature of transducers
 * the order of execution will be left to right.
 *
 * @example
 * // Map over the elements and accumulate into a string:
 * into('', map(inc), [10, 20, 30]);
 * //=> '112131'
 *
 * @example
 * // Map over the properties and accumulate into an array:
 * into([], map(inc), {a: 10, b: 20, c: 30});
 * //=> [11, 21, 31]
 *
 * @example
 * // Transducer example: take only the first two elements, increment them and accumulate into a string:
 * into('', compose(take(2), map(inc)), [10, 20, 30]);
 * //=> '1121'
 *
 * @curried
 * @param {Array|Object|string} init
 * @param {function()} transducer
 * @param {Array|Object} xs
 * @return {Array|Object|string}
 */
module.exports = curry((init, transducer, xs) => {
  const dest = Object.prototype.toString.call(init === SameListType ? xs : init);
  const start =
    { '[object Array]':  () => [transducer(new Push())  , (init === SameListType ? [] : [...init])]
    , '[object String]': () => [transducer(new Append()), (init === SameListType ? '' : init)     ]
    , '[object Object]': () => [transducer(new Assoc()) , (init === SameListType ? {} : {...init})]};

  let [xf, acc] = start[dest]();

  for (let [key, value] of iter(xs)) {
    acc = Transformer.step(xf, acc, value, key);
    if (Transformer.isReduced(acc)) {
      acc = Transformer.Value(acc);
      break;
    }
  }

  return Transformer.result(xf, acc);
});
