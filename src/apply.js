/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');

/**
 * @summary
 * Applies `f` to `xs`.
 *
 * @description
 * Takes a function `f` then a list of arguments `xs`.
 * Applies `f` to the arguments and returns the result.
 *
 * @example
 * // Adds the numbers in each tuple.
 * map(apply(add))([[1,2],[3,4],[5,6]]);
 * //=> [3,7,11]
 *
 * @function
 * @param {function(...?): ?} f
 * @param {Array} xs
 * @return {?}
 */
module.exports = curry((f, xs) => f(...xs));
