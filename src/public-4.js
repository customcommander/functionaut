const {curry} = require('./public-2');
const {is_number} = require('./private');

/**
 * @namespace
 * @alias math
 */
module.exports = {

  /**
   * Adds `a` and `b`.
   *
   * @example
   * ```javascript
   * add(1, 2);
   * //=> 3
   * ```
   *
   * @public
   * @param {number} a
   * @param {number} b
   * @return {number}
   * @throws If neither `a` nor `b` is a number
   */
  add: curry((a, b) => {
    if (!is_number(a)) throw new Error('`a` is not a number');
    if (!is_number(b)) throw new Error('`b` is not a number');
    return a + b;
  })
};