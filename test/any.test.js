const td = require('testdouble');
const test = require('tape');
const {any: sut} = require('..');

test('any(pred)(xs) -> false when xs is empty', t => {
  const f = td.func();
  t.same(sut(f)([]), false);
  t.same(sut(f)(""), false);
  t.same(sut(f)({}), false);
  td.verify(f(), {times: 0, ignoreExtraArgs: true});
  t.end();
});

test('any(pred)(xs) -> true if pred(x) returned true for one x of xs', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();
  td.when(f(1)).thenReturn(true);
  td.when(g(4)).thenReturn(true);
  td.when(h("🥑")).thenReturn(true);
  t.same(sut(f)([1, 2]), true);
  t.same(sut(g)({a: 4, b: 5}), true);
  t.same(sut(h)("🥑🌯"), true);
  td.verify(f(), {times: 1, ignoreExtraArgs: true});
  td.verify(g(), {times: 1, ignoreExtraArgs: true});
  td.verify(h(), {times: 1, ignoreExtraArgs: true});
  t.end();
});

test('any(pred)(xs) -> false even if pred(x) returned truthy for all x of xs', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();
  td.when(f(1)).thenReturn(1);
  td.when(f(2)).thenReturn('true');
  td.when(g(4)).thenReturn([]);
  td.when(g(5)).thenReturn([true]);
  td.when(h("🥑")).thenReturn(10);
  td.when(h("🌯")).thenReturn(20);
  t.same(sut(f)([1, 2]), false);
  t.same(sut(g)({a: 4, b: 5}), false);
  t.same(sut(h)("🥑🌯"), false);
  td.verify(f(), {times: 2, ignoreExtraArgs: true});
  td.verify(g(), {times: 2, ignoreExtraArgs: true});
  td.verify(h(), {times: 2, ignoreExtraArgs: true});
  t.end();
});

test('any(pred)(xs) -> false if pred(x) returned false for all x of xs', t => {
  const f = td.func();
  const g = td.func();
  const h = td.func();
  td.when(f(1)).thenReturn(false);
  td.when(f(2)).thenReturn(false);
  td.when(g(4)).thenReturn(false);
  td.when(g(5)).thenReturn(false);
  td.when(h("🥑")).thenReturn(false);
  td.when(h("🌯")).thenReturn(false);
  t.same(sut(f)([1, 2]), false);
  t.same(sut(g)({a: 4, b: 5}), false);
  t.same(sut(h)("🥑🌯"), false);
  td.verify(f(), {times: 2, ignoreExtraArgs: true});
  td.verify(g(), {times: 2, ignoreExtraArgs: true});
  td.verify(h(), {times: 2, ignoreExtraArgs: true});
  t.end();
});
