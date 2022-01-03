const testcheck = require('./_check');
const {div: sut, __} = require('..');

const verif = (res, a, b) =>
  Object.is(res, a / b);

testcheck('div(a, b)',
  ['number', 'number'], (a, b) =>
    verif(sut(a, b), a, b));

testcheck('div(b)(a)',
  ['number', 'number'], (a, b) =>
    verif(sut(b)(a), a, b));

testcheck('div(a, __)(b)',
  ['number', 'number'], (a, b) =>
    verif(sut(a, __)(b), a, b));
