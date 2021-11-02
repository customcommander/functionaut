/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @summary
 * True if `x` is logical false (i.e. either `nil` or `false`).
 *
 * @example
 * F(null);      //=> true
 * F(undefined); //=> true
 * F(false);     //=> true
 * F(0);         //=> false
 * F('');        //=> false
 * F(NaN);       //=> false
 *
 * @param {?} x
 * @return {boolean}
 * @see T
 */
module.exports = x => x == null || x === false;
