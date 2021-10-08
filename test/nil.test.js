const test = require('tape');
const {nil: sut} = require('..');

test('nil(x) returns true if x is either null or undefined', t => {
  t.true(sut(null), 'null is nil');
  t.true(sut(undefined), 'undefined is nil');
  t.true(sut(void 0), 'void 0 is nil');
  t.true(sut(), 'call with no argument is nil');
  t.false(sut(0), '0 is not nil');
  t.false(sut(false), 'false is not nil');
  t.false(sut(''), 'empty string is not nil');
  t.false(sut(NaN), 'NaN is not nil');
  t.end();
});
