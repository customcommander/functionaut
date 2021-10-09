const test = require('tape');
const {fallback: sut} = require('..');

test('fallback', t => {
  const your_name = sut('john doe');
  t.equal('tom', your_name('tom'));
  t.equal(0, your_name(0));
  t.equal(false, your_name(false));
  t.equal('john doe', your_name(null));
  t.equal('john doe', your_name(undefined));
  t.end();
});
