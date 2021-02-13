const test = require('tape');
const {answer} = require('../dist').misc.random;

test('answer to the universe and everything', t => {
  t.true(answer() === 42);
  t.end();
});
