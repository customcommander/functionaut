/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');
const T = require('./T');

/**
 * @summary
 * Functional equivalent of `a && b` but works with logical truth instead of truthy.
 *
 * @example
 * map(and(42))([0, 1, false]);
 * //=> [42, 42, false]
 *
 * @operator
 * @function
 * @param {?} a
 * @param {?} b
 * @return {?}
 * @see __
 */
module.exports = op((a, b) => T(a) && T(b) ? b : a);
