const testcheck = require('./_check');
const {exp: sut, __} = require('..');

const verif = (res, a, b) =>
  Object.is(res, a ** b);

testcheck('exp(a, b)',
  ['number', 'number'], (a, b) =>
    verif(sut(a, b), a, b));

testcheck('exp(b)(a)',
  ['number', 'number'], (a, b) =>
    verif(sut(b)(a), a, b));

testcheck('exp(a, __)(b)',
  ['number', 'number'], (a, b) =>
    verif(sut(a, __)(b), a, b));
