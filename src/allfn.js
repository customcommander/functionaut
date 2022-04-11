/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const T = require('./T');
const curry = require('./curry');

/**
 * @summary
 * Checks that all predicates have been satisfied.
 *
 * @description
 * Takes an array of predicates and a `x`.
 * Returns `true` if each predicate passed when applied to `x`.
 * Returns `false` if one didn't.
 *
 * @example
 * // Make sure that `x` is an even number greater than ten.
 * const check = allfn([ x => typeof x == 'number'
 *                     , x => x % 2 == 0
 *                     , x => x > 10 ]);
 *
 * check('42'); //> false (1)
 * check(13);   //> false (2)
 * check(8);    //> false (3)
 * check(42);   //> true  (4)
 *
 * // 1: **failed:** not a number.
 * // 2: **failed:** not an even number.
 * // 3: **failed:** not a number greater than ten.
 * // 4: **passed:** even number greater than ten.
 *
 * @function
 * @curried
 * @param {Array<function(?): ?>} fs Array of predicates
 * @param {?} x
 * @returns {boolean}
 * @see all
 * @see allmap
 */
module.exports = curry((fs, x) => fs.every(f => T(f(x))));
