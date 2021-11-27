/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */
const {Recur, Value} = require('./_symbols');

/**
 * @summary
 * Exit condition in a `loop`-induced recursive function. Hold its return value.
 * @param {?} value 
 * @return {Object}
 * @see loop
 */
module.exports = value => ({[Recur]: false, [Value]: value});
