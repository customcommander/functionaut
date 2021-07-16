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
   * @see concede
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
   * Same as `compose` but avoids null pointer exception during
   * execution by exiting as soon as nil (either `null` or `undefined`)
   * is returned by a function in the composition. Returns either nil
   * or the value returned by the leftmost function.
   *
   * @example
   * > Reading a nested property may throw an error:
   *
   * ```javascript
   * const at = k => o => o[k];
   * const path1 = compose(at('baz'), at('bar'), at('foo'));
   *
   * path1({foo: {bar: {baz: 42}}});
   * //=> 42
   *
   * path1({foo: {}})
   * //=> Uncaught TypeError: Cannot read property 'baz' of undefined
   * ```
   *
   * > Same with concede:
   *
   * ```javascript
   * const path2 = concede(at('baz'), at('bar'), at('foo'));
   *
   * path2({foo: {bar: {baz: 42}}});
   * //=> 42
   *
   * path2({foo: {}});
   * //=> undefined
   * ```
   *
   * @public
   * @param  {...function()} fn
   * @returns {function()}
   * @throws When called with no or non-function arguments.
   * @see compose
   */
  concede: (...fn) => {
    if (fn.length === 0) throw new Error('concede: called with no arguments');
    fn.forEach((f, i) => assert_function(f, `concede: arg at ${i} is not a function`));
    return (...args) => {
      let i = fn.length - 1;
      let x = fn[i](...args);
      while (x != null && --i >= 0) x = fn[i](x);
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
  },

  /**
   * Takes a binary function `f` and a unary function `g` and returns
   * a curried binary function that takes an `a` and a `b`.
   * Applies `f` to the result of `g(a)` and `g(b)`.
   *
   * @example
   * > Building a case-insensitive string comparison function.
   *
   * ```javascript
   * const streqi = on(eq, lower); // i.e. (a, b) => eq(lower(a), lower(b))
   * 
   * streqi('FOObar', 'fooBAR');
   * //=> true
   * ```
   *
   * @public
   * @param {function(?, ?): ?} f
   * @param {function(?): ?} g
   * @return {function(?, ?): ?}
   * @throws When either `f` or `g` is not a function.
   */
  on: _curry((f, g) => {
    assert_function(f, 'on: `f` is not a function');
    assert_function(g, 'on: `g` is not a function');
    return _curry((a, b) => f(g(a), g(b)));
  }),

  /**
   * Allows the partial application of a non-curried function.
   * Takes a function `f` and a list of initial arguments and
   * returns a new function that takes the remaining arguments and
   * applies `f` to both lists of arguments.
   *
   * @example
   * ```javascript
   * const msg = (a, b, c) => `${a} ${b} ${c}`;
   *
   * partial(msg, 'Hello')('World', '!');
   * //=> "Hello World !"
   *
   * partial(msg, 'Hello', 'World')('!');
   * //=> "Hello World !"
   * ```
   *
   * @public
   * @param {function(...?): ?} f The partially applied function.
   * @param  {...?} init The initial list of arguments
   * @returns {function(...?): ?} A function that takes the remaining arguments
   *                              then applies `f` to both lists of arguments.
   * @throws When `f` is not a function
   */
  partial: (f, ...init) => {
    assert_function(f, 'partial: `f` is not a function');
    return (...tail) => f(...init, ...tail);
  },

  /**
   * Takes a list of functions and returns a function that
   * takes a list of arguments and applies each function to them.
   * Returns an array with the results.
   *
   * @example
   * > Producing a restaurant bill:
   *
   * ```javascript
   * const items = (...xs) => xs.map(([i]) => i).join(', ');
   * const total = (...xs) => xs.reduce((t, [, p]) => t + p, 0);
   * const bill = juxt(items, total);
   * 
   * bill( ['burrito', 5.50]
   *     , ['beer'   , 4.50]
   *     , ['coffee' , 2.80]);
   *
   * //=> ["burrito, beer, coffee", 12.8]
   *```
   *
   * @public
   * @param  {...function(...?): ?} fn
   * @returns {function(...?): Array<?>}
   * @throws When called with no functions.
   */
  juxt: (...fn) => {
    if (fn.length === 0) throw new Error(`juxt: called with no arguments`);
    fn.forEach((f, i) => assert_function(f, `juxt: arg at ${i} is not a function`));
    return (...args) => fn.map(f => f(...args));
  }
};
