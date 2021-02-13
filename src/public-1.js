const {is_number} = require('./private');

const inc = x => is_number(x) ? x + 1 : x;
const dec = x => is_number(x) ? x - 1 : x;

/**
 * @namespace
 * @alias math
 */
module.exports = {

  /**
   * Adds 1 to `x`.
   *
   * @public
   * @function
   * @param {number} x
   * @return {number}
   */
  inc,

  /**
   * Takes 1 away from `x`.
   *
   * @public
   * @function
   * @param {number} x
   * @return {number}
   */
  dec
};
