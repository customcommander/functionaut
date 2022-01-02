/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const curry = require('./curry');

/**
 * @summary
 * Returns `x` if `y` is `nil`. Otherwise returns `y`.
 *
 * @example
 * const your_name = fallback('john doe');
 * 
 * your_name('tom');
 * //=> 'tom'
 * 
 * your_name(null);
 * //=> 'john doe'
 *
 * @curried
 * @param {?} x Any
 * @param {?} y Any
 * @return {?}
 */
module.exports = curry((x, y) => y == null ? x : y);
