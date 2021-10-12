const test = require('tape');
const {lower} = require('..');

test('lower returns `s` lowercased', t => {
  t.same(lower('FOO'), 'foo');
  t.end();
});
