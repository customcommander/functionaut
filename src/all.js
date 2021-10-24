/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const iter = require('./_iterable');
const {curry} = require('./curry');

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {
  /**
   * Returns true if all elements of xs have satisfied given predicate.
   * Returns false as soon as one element didn't.
   * A predicate must return `true` not truthy.
   *
   * @example
   * > Assert that a list is made of 'x'.
   *
   * ```javascript
   * const allx = all(x => x === 'x');
   *
   * allx(['x']);                   //=> true
   * allx(['x', 'x']);              //=> true
   * allx(['x', 'y', 'x']);         //=> false
   *
   * allx('x');                     //=> true
   * allx('xx');                    //=> true
   * allx('xyx');                   //=> false
   *
   * allx({a:'x'});                 //=> true
   * allx({a:'x', b: 'x'});         //=> true
   * allx({a:'x', b: 'y', c: 'x'}); //=> false
   * ```
   *
   * @public
   * @param {function(?): boolean} pred Predicate
   * @param {Array|Object|string} xs List of values
   * @returns {boolean}
   */
  all: curry((pred, xs) => {
    for (let [_, v] of iter(xs)) if (pred(v) !== true) return false;
    return true;
  })
};