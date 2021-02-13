const test = require('tape');
const {add: sut} = require('../dist').math;

test('add two numbers', t => {
  t.true(sut(1, 2) === 3, 'add two numbers');
  t.true(sut(1)()()(2) === 3, 'add is curried');
  t.throws(() => sut("a", 10), 'a is not a number so should throw');
  t.throws(() => sut(10, "b"), 'b is not a number so should throw');
  t.throws(() => sut("a", "b"), 'neither a nor b is so should throw');
  t.end();
});
