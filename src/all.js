/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const allmap = require('./allmap');

/**
 * @summary
 * Returns `true` if each element of a list is logical true.
 *
 * @example
 * all([]);                    //> true
 * all([0, 1, 2]);             //> true
 * all([0, 1, null]);          //> false
 *
 * all({});                    //> true
 * all({a: 0, b: 1});          //> true
 * all({a: 0, b: 1, c: null}); //> false
 *
 * @param {Array|Object} xs List of values
 * @returns {boolean}
 */
module.exports = allmap(x => x);
