const testcheck = require('./_check');
const {and: sut, __, F} = require('..');

const verify = (res, a, b) => (
  F(a)
    ? Object.is(res, a)
    : Object.is(res, b)
);

testcheck('and(a, b)',
  ['primitive', 'primitive'], (a, b) =>
    verify(sut(a, b), a, b));

testcheck('and(b)(a)',
  ['primitive', 'primitive'], (a, b) =>
    verify(sut(b)(a), a, b));

testcheck('and(a, __)(b)',
  ['primitive', 'primitive'], (a, b) =>
    verify(sut(a, __)(b), a, b));
