const td = require('testdouble');
const test = require('tape');
const {all: sut} = require('..');

test('all returns true when there are no arguments to verify', t => {
  const p = td.func();
  t.same(sut(p)(), true);
  td.verify(p(), {ignoreExtraArgs: true, times: 0});
  t.end();
});

test('all returns true when all predicates returned true for all arguments', t => {
  const p1 = td.func();
  td.when(p1(1)).thenReturn(true);
  td.when(p1(2)).thenReturn(true);
  td.when(p1(3)).thenReturn(true);

  const p2 = td.func();
  td.when(p2(1)).thenReturn(true);
  td.when(p2(2)).thenReturn(true);
  td.when(p2(3)).thenReturn(true);

  t.same(sut(p1, p2)(1), true);
  t.same(sut(p1, p2)(1, 2), true);
  t.same(sut(p1, p2)(1, 2, 3), true);
  t.end();
});

test('all returns false when a predicate returns false for any argument', t => {
  const p1 = td.func();
  td.when(p1(1)).thenReturn(true);
  td.when(p1(2)).thenReturn(true);
  td.when(p1(3)).thenReturn(false);

  const p2 = td.func();
  td.when(p2(1)).thenReturn(true);
  td.when(p2(2)).thenReturn(true);
  td.when(p2(3)).thenThrow(new Error('all should short-circuit when a predicate returns false'));

  t.same(sut(p1, p2)(1), true);
  t.same(sut(p1, p2)(1, 2), true);
  t.same(sut(p1, p2)(1, 2, 3), false);
  t.end();
});

test('all only accepts true not truthy', t => {
  const p1 = td.func();
  td.when(p1(1)).thenReturn(42);
  t.same(sut(p1)(1), false);
  t.end();
});
