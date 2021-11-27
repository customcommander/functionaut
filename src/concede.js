/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @summary
 * Function composition without null pointer exception.
 * 
 * @description
 * Same as `compose` but avoids null pointer exception during
 * execution by exiting as soon as nil (either `null` or `undefined`)
 * is returned by a function in the composition. Returns either nil
 * or the value returned by the leftmost function.
 *
 * @example
 * // Reading a nested property may throw an error:
 *
 * const at = k => o => o[k];
 * const path1 = compose(at('baz'), at('bar'), at('foo'));
 *
 * path1({foo: {bar: {baz: 42}}});
 * //=> 42
 *
 * path1({foo: {}})
 * //=> Uncaught TypeError: Cannot read property 'baz' of undefined
 *
 * @example
 * // Same with concede:
 * const path2 = concede(at('baz'), at('bar'), at('foo'));
 *
 * path2({foo: {bar: {baz: 42}}});
 * //=> 42
 *
 * path2({foo: {}});
 * //=> undefined
 *
 * @param  {...function(?): ?} fn
 * @returns {function(...?): ?}
 * @see compose
 */
module.exports = (...fn) => (...args) => {
  let i = fn.length - 1;
  let x = fn[i](...args);
  while (x != null && --i >= 0) x = fn[i](x);
  return x;
};
