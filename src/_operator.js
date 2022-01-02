/**
 * @license MIT
 * @copyright (c) 2022 Julien Gonzalez <hello@spinjs.com>
 */

const __ = require('./__');

/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
module.exports = fn => function (a, b) {
  const nargs = arguments.length;
  // fn(b) -> a => fn(a, b)
  if (nargs == 1) return x => fn(x, a);
  // fn(a, __) -> b => fn(a, b)
  if (nargs > 1 && b === __) return x => fn(a, x);
  return fn(a, b);
};
