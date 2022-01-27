/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const op = require('./_operator');

/**
 * @summary
 * Functional equilvant of `a ?? b`.
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
 * @operator
 * @function
 * @param {?} a Any
 * @param {?} b Any
 * @return {?}
 */
module.exports = op((a, b) => a ?? b);
