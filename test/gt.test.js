const testcheck = require('./_check');
const {gt: sut, __} = require('..');

testcheck('gt(a, b)',
  ['number', 'number'], (a, b) =>
    sut(a, b) === a > b);

testcheck('gt(b)(a)',
  ['number', 'number'], (a, b) =>
    sut(b)(a) === a > b);

testcheck('gt(a, __)(b)',
  ['number', 'number'], (a, b) =>
    sut(a, __)(b) === a > b);
