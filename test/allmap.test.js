const iter = require('../src/_iterable');
const testcheck = require('./_check');
const {allmap: sut, F} = require('..');

testcheck('allmap(f)(xs)', ['xs'], xs => {
  let f_ncall_wanted = 0; // How many times we expect `f` to be called.
  let f_ncall_actual = 0; // How many times was `f` actually called.
  let wanted = true;      // Default outcome if `xs` is empty.
  for (let [, v] of iter(xs)) {
    f_ncall_wanted++;
    if (F(v)) {
      wanted = false;
      break;
    }
  }
  const f = x => (f_ncall_actual++, x);
  return (sut(f)(xs) === wanted) && (f_ncall_wanted === f_ncall_actual);
});
