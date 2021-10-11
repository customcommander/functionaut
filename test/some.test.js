const test = require('tape');
const td = require('testdouble');
const {some: sut} = require('..');

test('returns the first truthy value and ignore all other functions', t => {
  const fn1 = td.func();
  const fn2 = td.func();
  const fn3 = td.func();
  const something = sut(fn1, fn2, fn3);

  td.when(fn1(1, 2, 3)).thenReturn(null);
  td.when(fn2(1, 2, 3)).thenReturn('🌯');

  // Returns the first truthy value and ignores all other functions.
  t.same(something(1, 2, 3), '🌯');
  td.verify(fn3(), {times: 0, ignoreExtraArgs: true});

  td.when(fn1(2, 3, 4)).thenReturn(0);
  td.when(fn2(2, 3, 4)).thenReturn('');
  td.when(fn3(2, 3, 4)).thenReturn('🤷‍♂️');

  // Returns whatever the last function has returned
  t.same(something(2, 3, 4), '🤷‍♂️');

  t.end();
});
