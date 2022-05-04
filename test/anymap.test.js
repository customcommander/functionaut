const iter = require('../src/_iterable');
const testcheck = require('./_check');
const {anymap: sut, T} = require('..');

testcheck('anymap(f)(xs)', ['xs'], xs => {
  let expected = [...iter(xs)].some(([, v]) => T(v));
  return sut(x => x)(xs) === expected;
});
