const testcheck = require('./_check');
const {subtract: sut, __} = require('..');

testcheck('subtract(a, b)',
  ['number', 'number'], (a, b) =>
    sut(a, b) === a - b);

testcheck('subtract(b)(a)',
  ['number', 'number'], (a, b) =>
    sut(b)(a) === a - b);

testcheck('subtract(a, __)(b)',
  ['number', 'number'], (a, b) =>
    sut(a, __)(b) === a - b);
