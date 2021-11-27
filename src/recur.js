/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {Recur, Args} = require('./_symbols');

/**
 * @summary
 * Bootstrap the next recursive call in a `loop`-induced recursive function.
 * @param  {...?} args
 * @return {Object}
 * @see loop
 */
module.exports = (...args) => ({[Recur]: true, [Args]: args});
