/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a * b`.
 *
 * @example
 * map(mult(2))([5,10,15]);
 * //=> [10,20,30]
 *
 * @operator
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number}
 * @see __
 */
module.exports = op((a, b) => a * b);
