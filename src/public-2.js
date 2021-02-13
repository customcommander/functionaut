const _curry =
  fn => (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : _curry(fn.bind(null, ...args));

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {

  /**
   * Returns a curried version of `fn`.
   *
   * @example
   * ```javascript
   * const add3 = curry((a, b, c) => a + b + c);
   * add3(1, 2, 3);
   * //=> 6
   * add3(1)(2)(3);
   * //=> 6
   * add3(1)()(2)()(3);
   * //=> 6
   * ```
   *
   * @public
   * @function
   * @param {function()} fn
   * @return {function()}
   */
  curry: _curry
};
