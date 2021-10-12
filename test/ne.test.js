const test = require('tape');
const {ne} = require('..');

test('ne returns true if both parameters are not equal', t => {
  const run = (a, b) => t.same(ne(a)(b), Object.is(a, b) == false);
  run(1, '1');
  run(0, false);
  run(+0, -0);
  run(NaN, NaN);
  run(null, undefined);
  t.end();
});
