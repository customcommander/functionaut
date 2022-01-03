const testcheck = require('./_check');
const {gte: sut, __} = require('..');

testcheck('gte(a, b)',
  ['number', 'number'], (a, b) =>
    sut(a, b) === a >= b);

testcheck('gte(b)(a)',
  ['number', 'number'], (a, b) =>
    sut(b)(a) === a >= b);

testcheck('gte(a, __)(b)',
  ['number', 'number'], (a, b) =>
    sut(a, __)(b) === a >= b);
