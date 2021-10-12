const test = require('tape');
const {add} = require('..');

test('add', t => {
  t.true(add(40)(2), 42);
  t.end();
});
