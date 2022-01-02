const testcheck = require('./_check');
const {eq: sut, __} = require('..');

testcheck('eq(a, b)',
  ['primitive', 'primitive'], (a, b) =>
    sut(a, b) === Object.is(a, b));

testcheck('eq(b)(a)',
  ['primitive', 'primitive'], (a, b) =>
    sut(b)(a) === Object.is(a, b));

testcheck('eq(a, __)(b)',
  ['primitive', 'primitive'], (a, b) =>
    sut(a, __)(b) === Object.is(a, b));
