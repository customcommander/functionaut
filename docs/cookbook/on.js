/**
@fileoverview

@example
// A case-insensitive string equality function
const streqi = on(eq, lower);

streqi('foo', 'FOO');
//=> true
*/

const test = require('tape');
const {on: sut, eq, lower} = require('../..');

test('streqi', t => {
  const streqi = sut(eq, lower);
  t.true(streqi('foo', 'FOO'))
  t.end();
});
