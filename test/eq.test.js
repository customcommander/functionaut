const test = require('tape');
const {eq} = require('..');

test('eq returns true if both parameters are equal', t => {
  const run = (a, b) => t.same(eq(a)(b), Object.is(a, b));
  run(1, '1');
  run(0, false);
  run(+0, -0);
  run(NaN, NaN);
  run(null, undefined);
  t.end();
});
