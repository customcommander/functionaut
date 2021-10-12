/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {
  /**
   * Takes a list of functions and returns a function that
   * takes a list of arguments and applies each function to them.
   * Returns an array with the results.
   *
   * @example
   * > Producing a restaurant bill:
   *
   * ```javascript
   * const items = (...xs) => xs.map(([i]) => i).join(', ');
   * const total = (...xs) => xs.reduce((t, [, p]) => t + p, 0);
   * const bill = juxt(items, total);
   * 
   * bill( ['burrito', 5.50]
   *     , ['beer'   , 4.50]
   *     , ['coffee' , 2.80]);
   *
   * //=> ["burrito, beer, coffee", 12.8]
   *```
   *
   * @public
   * @param  {...function(...?): ?} fn
   * @returns {function(...?): Array<?>}
   */
  juxt: (...fn) => (...args) => fn.map(f => f(...args))
};
