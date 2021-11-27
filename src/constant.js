/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @summary
 * Takes a `x` and returns a function that _always_ returns `x`.
 *
 * @example
 * const answer = constant(42);
 *
 * answer();
 * //=> 42
 *
 * answer('foobar');
 * //=> 42
 *
 * @param {?} x
 * @returns {function(): ?}
 */
module.exports = x => () => x;
