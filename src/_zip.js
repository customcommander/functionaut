/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @param {Array} a
 * @param {Array} b
 * @param {?Array} c
 * @param {?Array} d
 * @return {Array<Array>}
 */
module.exports = (a, b, c = null, d = null) => {
  const zip3 = c !== null && d === null;
  const zip4 = c !== null && d !== null;

  const zipN =
    ( zip4 ? i => [a[i], b[i], c[i], d[i]]
    : zip3 ? i => [a[i], b[i], c[i]]
          : i => [a[i], b[i]]);

  // smallest array length is the maximum number
  // of items we can take from each array.
  const len =
    ( zip4 ? Math.min(a.length, b.length, c.length, d.length)
    : zip3 ? Math.min(a.length, b.length, c.length)
          : Math.min(a.length, b.length));

  const ret = [];
  for (let i = 0; i < len; i += 1) ret.push(zipN(i));
  return ret;
};
