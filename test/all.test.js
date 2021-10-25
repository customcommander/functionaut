const td = require('testdouble');
const test = require('tape');
const {all: sut} = require('..');

test('all(pred)(xs) -> true if xs is empty', t => {
  const f = td.func();
  t.same(sut(f)([]), true);
  t.same(sut(f)(""), true);
  t.same(sut(f)({}), true);
  td.verify(f(), {times: 0, ignoreExtraArgs: true});
  t.end();
});

test('all(pred)(xs) -> true if pred(x) is true (not truthy) for all x of xs', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();
  td.when(f(1)).thenReturn(true);
  td.when(f(2)).thenReturn(true);
  td.when(g(4)).thenReturn(true);
  td.when(g(5)).thenReturn(true);
  td.when(h("🥑")).thenReturn(true);
  td.when(h("🌯")).thenReturn(true);
  t.same(sut(f)([1, 2]), true);
  t.same(sut(g)({a: 4, b: 5}), true);
  t.same(sut(h)("🥑🌯"), true);
  td.verify(f(), {times: 2, ignoreExtraArgs: true});
  td.verify(g(), {times: 2, ignoreExtraArgs: true});
  td.verify(h(), {times: 2, ignoreExtraArgs: true});
  t.end();
});

test('all(pred)(xs) -> false if pred(x) is false for any x of xs', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();
  td.when(f(1)).thenReturn(false);
  td.when(g(4)).thenReturn(false);
  td.when(h("🥑")).thenReturn(false);
  t.same(sut(f)([1, 2]), false);
  t.same(sut(g)({a: 4, b: 5}), false);
  t.same(sut(h)("🥑🌯"), false);
  td.verify(f(), {times: 1, ignoreExtraArgs: true});
  td.verify(g(), {times: 1, ignoreExtraArgs: true});
  td.verify(h(), {times: 1, ignoreExtraArgs: true});
  t.end();
});

test('all(pred)(xs) -> false even if pred(x) is truthy for all x of xs', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();
  td.when(f(1)).thenReturn(1);
  td.when(g(4)).thenReturn([true]);
  td.when(h("🥑")).thenReturn(10);
  t.same(sut(f)([1, 2]), false);
  t.same(sut(g)({a: 4, b: 5}), false);
  t.same(sut(h)("🥑🌯"), false);
  td.verify(f(), {times: 1, ignoreExtraArgs: true});
  td.verify(g(), {times: 1, ignoreExtraArgs: true});
  td.verify(h(), {times: 1, ignoreExtraArgs: true});
  t.end();
});
