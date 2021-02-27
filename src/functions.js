/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {assert_function} = require('./private/helpers');

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
   * Performs a right-to-left function composition.
   *
   * Given a list of functions returns a new function that takes an indefinite number of parameters and applies
   * the rightmost function to these, the result of which is fed into the second rightmost function, etc.
   * Returns the return value of the leftmost function.
   *
   * @example
   * ```javascript
   * const comp = compose(x => x + 2, (x, y) => x + y);
   * comp(30, 10);
   * //=> 42
   * ```
   *
   * @public
   * @param  {...function()} fn
   * @returns {function()}
   * @throws When called with no arguments or with some non-function arguments.
   */
  compose: (...fn) => {
    if (fn.length === 0) throw new Error('compose: called with no arguments');
    fn.forEach((f, i) => assert_function(f, `compose: arg at ${i} is not a function`));
    return (...args) => {
      let i = fn.length - 1;
      let x = fn[i](...args);
      while (--i >= 0) x = fn[i](x);
      return x;
    };
  },

  /**
   * Returns a curried version of `fn`.
   *
   * @example
   * ```javascript
   * const add = curry((a, b) => a + b);
   *
   * [1, 2, 3].map(add(10));
   * //=> [11, 12, 13]
   * ```
   *
   * @public
   * @param {function()} fn Function to curry.
   * @return {function()}
   * @throws When `fn` is not a function.
   */
  curry: fn => {
    assert_function(fn, 'curry: `fn` is not a function');
    return _curry(fn);
  },

  /**
   * Takes a function `fn` of arity 2 (or more) and returns
   * a (curried) version of it in which the first two parameters
   * have been swapped.
   *
   * @example
   * ```javascript
   * const x = (a, b, c) => a + b + c;
   * x('foo', 'bar', 'baz');
   * //=> 'foobarbaz'
   *
   * const y = flip(x);
   * y('foo')('bar', 'baz');
   * //=> 'barfoobaz'
   * ```
   *
   * @public
   * @param {function()} fn
   * @return {function()}
   */
  flip: fn => {
    assert_function(fn, 'flip: `fn` is not a function');
    return _curry(function (a, b) {
      const [x, y, ...z] = Array.from(arguments);
      return fn(y, x, ...z);
    });
  },

  /**
   * Takes a function `fn` of any arity and returns
   * a (curried) version of it that takes exactly one
   * parameter. Any extra parameters are discarded.
   *
   * @example
   * ```javascript
   * ['1', '2', '3'].map(parseInt);
   * //=> [1, NaN, NaN]
   * // equivalent to [parseInt('1', 0), parseInt('2', 1), parseInt('3', 2)]
   * // array indices................^.................^.................^
   *
   * ['1', '2', '3'].map(unary(parseInt));
   * //=> [1, 2, 3]
   * // equivalent to [parseInt('1'), parseInt('2'), parseInt('3')]
   * ```
   * @public
   * @param {function()} fn
   * @return {function()}
   * @throws When `fn` is not a function.
   */
  unary: fn => {
    assert_function(fn, 'unary: `fn` is not a function');
    return _curry(x => fn(x));
  }
};
