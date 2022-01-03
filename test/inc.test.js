const testcheck = require('./_check');
const {inc: sut} = require('..');

testcheck('inc(x)',
  ['number'], x =>
    Object.is(sut(x), x + 1));
