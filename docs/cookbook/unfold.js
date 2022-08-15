/**
@fileoverview

@example
// Generate ten multiples of 5
const range = unfold(lte(10), mult(5), inc);

range(1);
//=> [5,10,15,20,25,30,35,40,45,50]

@example
// Numbers between 10 and 0 included
const range = unfold(gte(0), identity, dec);

range(10);
//=> [10,9,8,7,6,5,4,3,2,1,0]
*/

const test = require('tape');
const {unfold: sut, gte, lte, inc, mult, identity, dec} = require('../..');

test('range', t => {
  const range = sut(lte(10), mult(5), inc);
  t.same(range(1), [5,10,15,20,25,30,35,40,45,50]);
  t.end();
});

test('range 2', t => {
  const range = sut(gte(0), identity, dec);
  t.same(range(10), [10,9,8,7,6,5,4,3,2,1,0]);
  t.end();
});
