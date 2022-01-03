const testcheck = require('./_check');
const {lt: sut, __} = require('..');

testcheck('lt(a, b)',
  ['number', 'number'], (a, b) =>
    sut(a, b) === a < b);

testcheck('lt(b)(a)',
  ['number', 'number'], (a, b) =>
    sut(b)(a) === a < b);

testcheck('lt(a, __)(b)',
  ['number', 'number'], (a, b) =>
    sut(a, __)(b) === a < b);
