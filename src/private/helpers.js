const Throw =
  msg => { throw new Error(msg); };

/**
 * @param {function(*): boolean} pred
 * @return {function(*, string): boolean}
 */
const assert =
  pred => (x, err) =>
    pred(x) === true || Throw(err);

/**
 * @function
 */
const assert_function =
  assert(x => typeof x === 'function');

/**
 * @function
 */
const assert_array =
  assert(x => Array.isArray(x));

module.exports = {
  assert_array,
  assert_function
};
