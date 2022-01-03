const testcheck = require('./_check');
const {mult: sut, __} = require('..');

const verif = (res, a, b) =>
  Object.is(res, a * b);

testcheck('mult(a, b)',
  ['number', 'number'], (a, b) =>
    verif(sut(a, b), a, b));

testcheck('mult(b)(a)',
  ['number', 'number'], (a, b) =>
    verif(sut(b)(a), a, b));

testcheck('mult(a, __)(b)',
  ['number', 'number'], (a, b) =>
    verif(sut(a, __)(b), a, b));
