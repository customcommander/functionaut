const testcheck = require('./_check');
const {or: sut, __, T} = require('..');

const verify =
  (res, a, b) =>
    Object.is(res, T(a) ? a : b);

testcheck('or(a, b)',
  ['primitive', 'primitive'], (a, b) =>
    verify(sut(a, b), a, b));

testcheck('or(b)(a)',
  ['primitive', 'primitive'], (a, b) =>
    verify(sut(b)(a), a, b));

testcheck('or(a, __)(b)',
  ['primitive', 'primitive'], (a, b) =>
    verify(sut(a, __)(b), a, b));
