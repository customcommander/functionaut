/**
* @license MIT
* @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
*/

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a ** b`.
 *
 * @example
 * map(exp(2))([2,3,4,5]);
 * //=> [4,9,16,25]
 *
 * @operator
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number}
 * @see __
 */
module.exports = op((a, b) => a ** b);
