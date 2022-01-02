const testcheck = require('./_check');
const {add: sut, __} = require('..');

testcheck('add(a, b)',
  ['number', 'number'], (a, b) =>
    sut(a, b) === a + b);

testcheck('add(b)(a)',
  ['number', 'number'], (a, b) =>
    sut(b)(a) === a + b);

testcheck('add(a, __)(b)',
  ['number', 'number'], (a, b) =>
    sut(a, __)(b) === a + b);
