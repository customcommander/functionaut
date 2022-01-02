const testcheck = require('./_check');
const {ne: sut, __} = require('..');

testcheck('ne(a, b)',
  ['primitive', 'primitive'], (a, b) =>
    sut(a, b) === !Object.is(a, b));

testcheck('ne(b)(a)',
  ['primitive', 'primitive'], (a, b) =>
    sut(b)(a) === !Object.is(a, b));

testcheck('ne(a, _)(b)',
  ['primitive', 'primitive'], (a, b) =>
    sut(a, __)(b) === !Object.is(a, b));
