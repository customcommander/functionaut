const testcheck = require('./_check');
const {mod: sut, __} = require('..');

const verif = (res, a, b) =>
  Object.is(res, a % b);

testcheck('mod(a, b)',
  ['number', 'number'], (a, b) =>
    verif(sut(a, b), a, b));

testcheck('mod(b)(a)',
  ['number', 'number'], (a, b) =>
    verif(sut(b)(a), a, b));

testcheck('mod(a, __)(b)',
  ['number', 'number'], (a, b) =>
    verif(sut(a, __)(b), a, b));
