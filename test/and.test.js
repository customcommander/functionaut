const testcheck = require('./_check');
const {and: sut, __, T} = require('..');

const verify =
  (res, a, b) =>
    Object.is(res, T(a) && T(b) ? b : a);

testcheck('and(a, b)',
  ['primitive', 'primitive'], (a, b) =>
    verify(sut(a, b), a, b));

testcheck('and(b)(a)',
  ['primitive', 'primitive'], (a, b) =>
    verify(sut(b)(a), a, b));

testcheck('and(a, __)(b)',
  ['primitive', 'primitive'], (a, b) =>
    verify(sut(a, __)(b), a, b));
