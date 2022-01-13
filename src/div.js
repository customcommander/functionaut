/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a / b`.
 *
 * @example
 * map(div(4))([20,40,60,80])
 * //=> [5,10,15,20]
 *
 * @operator
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number}
 * @see __
 */
module.exports = op((a, b) => a / b);
