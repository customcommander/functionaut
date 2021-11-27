/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

const {Recur, Args, Value} = require('./_symbols');

/**
 * @summary
 * Generates a stack-safe recursive function.
 * 
 * @description
 * Colloquially known as "trampoline" this function allows you to implement
 * stack-safe recursive functions. You must use `recur` to bootstrap the next
 * recursive call and `cease` to signal the exit condition and the return value.
 *
 * @example
 * // Without tail call optimization recursive functions can exhaust the stack:
 * const nums =
 *   (x, y, ret = []) =>
 *     (x === y
 *       ? ret
 *       : nums(x+1, y, (ret.push(x), ret)));
 *
 * nums(1, 1000);
 * //=> [
 * //=>    1,  2,  3,   4,  5,  6,  7,  8,  9, 10, 11, 12,
 * //=>   13, 14, 15,  16, 17, 18, 19, 20, 21, 22, 23, 24,
 * //=>   25, 26, 27,  28, 29, 30, 31, 32, 33, 34, 35, 36,
 * //=>   37, 38, 39,  40, 41, 42, 43, 44, 45, 46, 47, 48,
 * //=>   49, 50, 51,  52, 53, 54, 55, 56, 57, 58, 59, 60,
 * //=>   61, 62, 63,  64, 65, 66, 67, 68, 69, 70, 71, 72,
 * //=>   73, 74, 75,  76, 77, 78, 79, 80, 81, 82, 83, 84,
 * //=>   85, 86, 87,  88, 89, 90, 91, 92, 93, 94, 95, 96,
 * //=>   97, 98, 99, 100,
 * //=>   ... 899 more items
 * //=> ]
 * 
 * nums(1, 10000);
 * //=> Uncaught RangeError: Maximum call stack size exceeded
 *
 * @example
 * // With loop/recur you can build the same recursive function without fear:
 * const nums =
 *   loop((x, y, ret = []) =>
 *     (x === y
 *       ? cease(ret)
 *       : recur(x + 1, y, (ret.push(x), ret))));
 *
 * nums(1, 100000); // × 10 more!
 * //=> [
 * //=>    1,  2,  3,   4,  5,  6,  7,  8,  9, 10, 11, 12,
 * //=>   13, 14, 15,  16, 17, 18, 19, 20, 21, 22, 23, 24,
 * //=>   25, 26, 27,  28, 29, 30, 31, 32, 33, 34, 35, 36,
 * //=>   37, 38, 39,  40, 41, 42, 43, 44, 45, 46, 47, 48,
 * //=>   49, 50, 51,  52, 53, 54, 55, 56, 57, 58, 59, 60,
 * //=>   61, 62, 63,  64, 65, 66, 67, 68, 69, 70, 71, 72,
 * //=>   73, 74, 75,  76, 77, 78, 79, 80, 81, 82, 83, 84,
 * //=>   85, 86, 87,  88, 89, 90, 91, 92, 93, 94, 95, 96,
 * //=>   97, 98, 99, 100,
 * //=>   ... 99899 more items
 * //=> ]
 *
 * @param {function()} fn 
 * @return {function()}
 * @see recur
 * @see cease
 */
module.exports = fn => (...init) => {
  let res = fn(...init);
  while (res[Recur]) res = fn(...res[Args]);
  return res[Value];
};
