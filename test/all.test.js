const td = require('testdouble');
const test = require('tape');
const {all: sut} = require('..');

test('returns true if xs is empty; does not invoke pred at all', t => {
  const p = td.func();
  const expected = [].every(() => true);

  t.same(sut(p)([]), expected);
  t.same(sut(p)(""), expected);
  t.same(sut(p)({}), expected);

  td.verify(p(), {times: 0, ignoreExtraArgs: true});

  t.end();
});

test('returns true if pred is true for all x in xs', t => {
  const p = td.func();
  td.when(p(td.matchers.anything())).thenReturn(true);

  t.same(sut(p)([1, 2]), true);
  t.same(sut(p)({a: 4, b: 5}), true);
  t.same(sut(p)("🥑🌯"), true);

  td.verify(p(1), {times: 1});
  td.verify(p(2), {times: 1});
  td.verify(p(4), {times: 1});
  td.verify(p(5), {times: 1});
  td.verify(p("🥑"), {times: 1});
  td.verify(p("🌯"), {times: 1});

  t.end();
});

test('returns false if pred is false for any x of xs', t => {
  const p = td.func();
  td.when(p(td.matchers.anything())).thenReturn(false);

  t.same(sut(p)([1, 2]), false);
  t.same(sut(p)({a: 4, b: 5}), false);
  t.same(sut(p)("🥑🌯"), false);

  td.verify(p(1), {times: 1});
  td.verify(p(2), {times: 0});
  td.verify(p(4), {times: 1});
  td.verify(p(5), {times: 0});
  td.verify(p("🥑"), {times: 1});
  td.verify(p("🌯"), {times: 0});

  t.end();
});

test('does not work with truthy predicates', t => {
  const p = td.func();
  td.when(p(td.matchers.anything())).thenReturn(1);

  t.same(sut(p)([1, 2]), false);
  t.same(sut(p)({a: 4, b: 5}), false);
  t.same(sut(p)("🥑🌯"), false);

  td.verify(p(1), {times: 1});
  td.verify(p(2), {times: 0});
  td.verify(p(4), {times: 1});
  td.verify(p(5), {times: 0});
  td.verify(p("🥑"), {times: 1});
  td.verify(p("🌯"), {times: 0});

  t.end();
});
