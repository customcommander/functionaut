const test = require('tape');
const td = require('testdouble');
const {unary} = require('../dist');

test('unary returns a version of function that takes exactly one parameter.', t => {
  const fn = td.function();
  const ufn =unary(fn);
  ufn(1);
  ufn(2, 3);
  ufn(4, 5, 6);
  td.verify(fn(1));
  td.verify(fn(2));
  td.verify(fn(4));
  t.end();
});

test('unary fails when not given a function.', t => {
  t.throws(() => unary([]));
  t.end();
});