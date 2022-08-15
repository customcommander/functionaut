/**
@fileoverview

@example
// Adds all the numbers
const sum = fold(add, 0);

sum([1, 2, 3]);
//=> 6

sum({a: 4, b: 5, c: 6});
//=> 15

@example
// Finds the youngest person
const youngest =
  fold( (prev, cur) => prev == null || prev.age > cur.age ? cur : prev, null);

youngest([ {name: 'john', age: 21}
         , {name: 'jake', age: 18}
         , {name: 'jill', age: 37}]);

//=> {name: 'jake', age: 18}
*/

const test = require('tape');
const {fold: sut, add} = require('../..');

test('sum', t => {
  const sum = sut(add, 0);
  t.same(sum([1, 2, 3]), 6);
  t.same(sum({a: 4, b: 5, c: 6}), 15);
  t.end();
});

test('youngest', t => {
  const youngest = sut((prev, cur) => prev == null || prev.age > cur.age ? cur : prev, null);
  t.same(youngest( [ {name: 'john', age: 21}
                   , {name: 'jake', age: 18}
                   , {name: 'jill', age: 37}])
                 , {name: 'jake', age: 18});
  t.end();
});
