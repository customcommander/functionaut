const test = require('tape');
const {inc} = require('../dist').math;

test('inc: add 1 to given number',  t => {
  t.true(inc(41) === 42);
  t.end();
});
