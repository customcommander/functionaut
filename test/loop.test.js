const test = require('tape');
const td = require('testdouble');
const {loop, recur, cease} = require('..');

test('loop takes a function and returns another function.', t => {
  const fn = td.function();
  t.true(typeof loop(fn) === 'function');
  td.verify(fn(), {ignoreExtraArgs: true, times: 0});
  t.end();
});

test('loop returns a function that can recurse and return.', t => {
  const fn = td.function();
  td.when(fn(39, 1)).thenReturn(recur(40, 1));
  td.when(fn(40, 1)).thenReturn(recur(41, 1));
  td.when(fn(41, 1)).thenReturn(cease(42));
  t.same(loop(fn)(39, 1), 42);
  t.end();
});

test('loop avoids "Maximum call stack size exceeded" error.', t => {
  const nums =
    loop((x, y, ret = []) =>
      (x === y
        ? cease(ret)
        : recur(x + 1, y, (ret.push(x), ret))));

  t.doesNotThrow(() => nums(1, 10000), /Maximum call stack size exceeded/);
  t.doesNotThrow(() => nums(1, 100000), /Maximum call stack size exceeded/);

  t.end();
});
