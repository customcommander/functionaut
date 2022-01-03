const testcheck = require('./_check');
const {dec: sut} = require('..');

testcheck('dec(x)',
  ['number'], x =>
    Object.is(sut(x), x - 1));
