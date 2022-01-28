const td = require('testdouble');
const test = require('tape');
const testcheck = require('./_check');
const {all: sut, identity} = require('..');

test('all(pred)(xs)', t => {

  // Takes a list of three elements '🌯', '🥑' and '🍣'.
  // Makes sure that pred passes for each one of them,
  // and that the function returns true as a result.
  const pass = xs => _t => {
    const pred = td.func();
    td.when(pred('🌯')).thenDo(() => (_t.pass('pred("🌯") ✓'), true));
    td.when(pred('🥑')).thenDo(() => (_t.pass('pred("🥑") ✓'), true));
    td.when(pred('🍣')).thenDo(() => (_t.pass('pred("🍣") ✓'), true));
    _t.plan(4);
    _t.true(sut(pred)(xs) === true);
    _t.end();
  };

  // Takes a non-empty list which first element is '🍦'.
  // When pred is applied to it returns false.
  // Makes sure that the function returns false as a result
  // and that pred wasnt' applied to other elements of the list.
  const fail = xs => _t => {
    const pred = td.func();
    td.when(pred('🍦')).thenReturn(false);
    _t.true(sut(pred)(xs) === false);
    _t.true(td.explain(pred).callCount === 1);
    _t.end();
  };

  // An empty list always returns true.
  // Makes sure pred wasn't invoked at all.
  const pass_empty = xs => _t => {
    const pred = td.func();
    _t.true(sut(pred)(xs) === true);
    _t.true(td.explain(pred).callCount === 0);
    _t.end();
  };

  t.test('arrays: true if pred passed for all elements',
    pass(['🌯', '🥑', '🍣']));

  t.test('arrays: true for empty arrays',
    pass_empty([]));

  t.test('arrays: false if pred failed for any element',
    fail(['🍦', '🥑', '🍣']));

  t.test('objects: true if pred passed for all properties',
    pass({x:'🌯', y:'🥑', z:'🍣'}));

  t.test('objects: true for empty objects',
    pass_empty({}));

  t.test('objects: false if pred failed for any properties',
    fail({x:'🍦', y:'🥑', z:'🍣'}));

  t.end();
});

testcheck('all(pred)(xs) -> true if pred(x) passed for all x of xs',
  ['xs'], xs =>
    sut(identity)(xs));
