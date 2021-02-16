const Throw = msg => { throw new Error(msg); };

/**
 * @param {function(*): boolean} pred
 * @return {function(*, string): boolean}
 */
const assert =
  pred => (x, err) =>
    pred(x) === true || Throw(err);

module.exports = {
  assert_array: assert(x => Array.isArray(x)),
  assert_function: assert(x => typeof x === 'function')
};
