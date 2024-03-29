/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const T = require('./T');

/**
 * @summary
 * Functional equivalent of a `switch` statement.
 *
 * @description
 * Takes a list of predicate/function pairs and returns a function that takes
 * any number of arguments and applies them to the predicates until one is
 * satisfied. At which point the function associated with that predicate
 * is applied to the same arguments and we take its return value.
 * Predicates must return logical true. Returns `undefined` when
 * no predicates are satisfied.
 *
 * @example
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
 *
 * @param  {...function()} fn
 * @return {function()}
 */
module.exports = (...fn) => (...args) => {
  for (let i=0; i<fn.length; i+=2) {
    if (T(fn[i](...args))) return fn[i+1](...args);
  }
};
