/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @summary
 * Applies a series of functions to a series of values.
 *
 * @description
 * Take one or more functions then take one or more values. Return an array with the results
 * of applying each function to the values.
 *
 * @example
 * // Producing a restaurant bill:
 * const items = (...xs) => xs.map(([i]) => i).join(', ');
 * const total = (...xs) => xs.reduce((t, [, p]) => t + p, 0);
 * const bill = juxt(items, total);
 * 
 * bill( ['burrito', 5.50]
 *     , ['beer'   , 4.50]
 *     , ['coffee' , 2.80]);
 *
 * //=> ["burrito, beer, coffee", 12.8]
 *
 * @param  {...function(...?): ?} fn
 * @returns {function(...?): Array<?>}
 */
module.exports = (...fn) => (...args) => fn.map(f => f(...args));
