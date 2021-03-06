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
  },

  /**
   * Returns its argument.
   *
   * @example
   * ```javascript
   * identity(42);
   * //=> 42
   * ```
   *
   * @public
   * @param {?} x
   * @returns {?}
   */
  identity: x => x,

  /**
   * Takes a `x` and returns a function that _always_ returns `x`.
   *
   * @example
   * ```javascript
   * const answer = constant(42);
   *
   * answer();
   * //=> 42
   *
   * answer('foobar');
   * //=> 42
   * ```
   *
   * @public
   * @param {?} x
   * @returns {function(): ?}
   */
  constant: x => () => x,

  /**
   * Takes a list of predicate/function pairs and returns a function that takes
   * any number of arguments and applies them to the predicates until one is
   * satisfied. At which point the function associated with that predicate
   * is applied to the same arguments and we take its return value.
   * Predicates must return true (not truthy). Returns `undefined` when
   * no predicates are satisfied.
   *
   * @example
   * ```javascript
   * const record = cond( ({age}) => age < 5,
   *                        ({name}) => `Free for ${name}.`,
   * 
   *                      ({age}) => age < 12,
   *                        ({name}) => `50% discount for ${name}.`,
   * 
   *                      ({age}) => age < 20,
   *                        ({name}) => `20% discount for ${name}.`,
   * 
   *                      ({age}) => age < 65,
   *                        ({name}) => `Standard charge for ${name}.`,
   * 
   *                      ({age}) => age >= 65,
   *                        ({name}) => `40% discount for ${name}.`);
   *
   * record({name: 'Harry', age: 2});
   * //=> 'Free for Harry.'
   *
   * record({name: 'Jane', age: 11});
   * //=> '50% discount for Jane.'
   *
   * record({name: 'Idris', age: 18});
   * //=> '20% discount for Idris.'
   *
   * record({name: 'Bob', age: 40});
   * //=> 'Standard charge for Bob.'
   *
   * record({name: 'John', age: 65});
   * //=> '40% discount for John.'
   * ```
   *
   * @public
   * @param  {...function()} fn
   * @return {function()}
   * @throws When called with no or a non-even number of arguments or with non-function arguments.
   */
  cond: (...fn) => {
    fn.forEach((f, i) => assert_function(f, `cond: arg at ${i} is not a function.`));
    if (fn.length === 0) throw new Error('cond: called with no arguments.');
    if (fn.length % 2 !== 0) throw new Error('cond: called with uneven number of arguments.');
    return (...args) => {
      for (let i=0; i<fn.length; i+=2) {
        if (fn[i](...args) === true) return fn[i+1](...args);
      }
    };
  }
};
