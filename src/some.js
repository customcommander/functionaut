/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @namespace
 * @alias ROOT
 */
module.exports = {
  /**
   * Takes one or more functions and returns another function
   * that takes any number of parameters.
   *
   * Starting with the leftmost function applies each to
   * the parameters until one returns a truthy value in which
   * case all other functions are ignored and we return that value.
   *
   * Otherwise returns whatever the last function has returned.
   *
   * @example
   * ```javascript
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
   * ```
   *
   * @public
   * @param {...function()} fn
   * @return {?}
   */
  some: function _some() {
    const fns = Array.from(arguments);
    return (...args) => {
      let ret;
      let i = 0;
      do ret = fns[i](...args); while (!ret && ++i<fns.length);
      return ret;
    };
  }
};
