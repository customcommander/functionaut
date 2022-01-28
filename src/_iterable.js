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

module.exports = xs => {
  if (Array.isArray(xs)) return iter_idx(xs);
  return iter_obj(xs);
};
