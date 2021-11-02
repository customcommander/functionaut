/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */


/**
 * @summary
 * True if `x` is logical true (i.e. neither `nil` nor `false`).
 *
 * @example
 * T(true);      //=> true
 * T([]);        //=> true
 * T(42);        //=> true
 * T(0);         //=> true
 * T('');        //=> true
 * T(NaN);       //=> true
 * T(null);      //=> false
 * T(undefined); //=> false
 * T(false);     //=> false
 *
 * @param {?} x
 * @return {boolean}
 * @see F
 */
module.exports = x => x != null && x !== false;
