const testcheck = require('./_check');
const {fallback: sut, __} = require('..');

const verif = (res, a, b) =>
  Object.is(res, a ?? b);

testcheck('fallback(a, b)',
  ['primitive', 'primitive'], (a, b) =>
    verif(sut(a, b), a, b));

testcheck('fallback(b)(a)',
  ['primitive', 'primitive'], (a, b) =>
    verif(sut(b)(a), a, b));

testcheck('fallback(a, __)(b)',
  ['primitive', 'primitive'], (a, b) =>
    verif(sut(a, __)(b), a, b));
