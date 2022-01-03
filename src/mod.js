/**
* @license MIT
* @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
*/

const op = require('./_operator');

/**
 * @summary
 * Functional equivalent of `a % b`.
 *
 * @example
 * map(mod(4))([10,15,20,25]);
 * //=> [2,3,0,1]
 *
 * @operator
 * @function
 * @param {number} a
 * @param {number} b
 * @return {number}
 * @see __
 */
module.exports = op((a, b) => a % b);
