const testcheck = require('./_check');
const {lte: sut, __} = require('..');

testcheck('lte(a, b)',
  ['number', 'number'], (a, b) =>
    sut(a, b) === a <= b);

testcheck('lte(b)(a)',
  ['number', 'number'], (a, b) =>
    sut(b)(a) === a <= b);

testcheck('lte(a, __)(b)',
  ['number', 'number'], (a, b) =>
    sut(a, __)(b) === a <= b);
