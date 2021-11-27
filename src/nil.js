/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @summary
 * True if `x` is either `null` or `undefined`.
 *
 * @example
 * nil(null);
 * //=> true
 *
 * nil(undefined);
 * //=> true
 *
 * nil(false);
 * //=> false
 *
 * nil(NaN);
 * //=> false
 *
 * @param {?} x Any
 * @return {boolean}
 */
module.exports = x => x == null;
