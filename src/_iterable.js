/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

function* iter_obj(xs) {
  for (let x in xs) {
    if (xs.propertyIsEnumerable(x)) {
      yield [x, xs[x]];
    }
  }
}

function* iter_idx(xs) {
  let i = -1;
  for (let x of xs) yield [++i, x];
}

const whichIter =
  { '[object String]': iter_idx
  , '[object Array]': iter_idx
  , '[object Object]': iter_obj };

module.exports = xs => {
  const type = Object.prototype.toString.call(xs);
  return whichIter[type](xs);
};
