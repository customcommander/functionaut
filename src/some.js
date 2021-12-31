/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const F = require('./F');

/**
 * @summary
 * Apply functions to arguments until one returns logical true.
 *
 * @description
 * Takes one or more functions and returns another function
 * that takes any number of parameters.
 *
 * Starting with the leftmost function applies each to
 * the parameters until one returns logical true in which
 * case all other functions are ignored and we return that value.
 *
 * Otherwise returns whatever the last function has returned.
 *
 * @example
 * const grade = some( when(x => x >=    1, constant('Perfect'))
 *                   , when(x => x >= 0.85, constant('Good'))
 *                   , when(x => x >= 0.60, constant('Medium'))
 *                   , when(x => x >= 0.34, constant('Poor'))
 *                   ,                      constant('No'));
 *
 * grade(1);
 * //=> 'Perfect'
 *
 * grade(0.92);
 * //=> 'Good'
 *
 * grade(0.70);
 * //=> 'Medium'
 *
 * grade(0.50);
 * //=> 'Poor'
 *
 * grade(0.20);
 * //=> 'No'
 *
 * @param {...function(...?): ?} fns
 * @return {function(...?): ?}
 */
module.exports = (...fns) => (...args) => {
  let ret;
  let i = 0;
  do ret = fns[i](...args); while (F(ret) && ++i<fns.length);
  return ret;
};
