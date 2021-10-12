const test = require('tape');
const td = require('testdouble');
const {compose, map, into, take, filter, drop} = require('..');

test('into reduces a list into another list.', t => {
  const transducer = compose(map(x => x + x), map(x => `(${x})`));

  t.same(into([])(transducer)(['a', 'b']), ['(aa)', '(bb)']);
  t.same(into('')(transducer)(['a', 'b']), '(aa)(bb)');
  t.same(into({})(transducer)(['a', 'b']), {0: '(aa)', 1: '(bb)'});

  t.same(into([])(transducer)('ab'), ['(aa)', '(bb)']);
  t.same(into('')(transducer)('ab'), '(aa)(bb)');
  t.same(into({})(transducer)('ab'), {0: '(aa)', 1: '(bb)'});

  t.same(into([])(transducer)({x: 'a', y: 'b'}), ['(aa)', '(bb)']);
  t.same(into('')(transducer)({x: 'a', y: 'b'}), '(aa)(bb)');
  t.same(into({})(transducer)({x: 'a', y: 'b'}), {x: '(aa)', y: '(bb)'});

  t.end();
});

test('into returns null when not given a list.', t => {
  const transducer = td.function();
  t.same(into('')(transducer)(null), null);
  t.same(into([])(transducer)(null), null);
  t.same(into({})(transducer)(null), null);
  td.verify(transducer(/* … */), {ignoreExtraArgs: true, times: 0});
  t.end();
});

test('into returns null when not given a list to reduce into.', t => {
  const transducer = td.function();
  t.same(into(null)(transducer)(''), null);
  t.same(into(null)(transducer)([]), null);
  t.same(into(null)(transducer)({}), null);
  td.verify(transducer(/* … */), {ignoreExtraArgs: true, times: 0});
  t.end();
});

test('into: take · map', t => {
  const fn = td.function();
  td.when(fn('a')).thenReturn('A');
  td.when(fn('b')).thenReturn('B');
  td.when(fn('c')).thenThrow(new Error('was not expecting that call'));

  const transducer = compose(take(2), map(fn));

  t.equals(into('')(transducer)(['a', 'b', 'c']), 'AB');
  t.equals(into('')(transducer)({x: 'a', y: 'b', z: 'c'}), 'AB');
  t.equals(into('')(transducer)('abc'), 'AB');

  t.deepEquals(into([])(transducer)(['a', 'b', 'c']), ['A', 'B']);
  t.deepEquals(into([])(transducer)('abc'), ['A', 'B']);
  t.deepEquals(into([])(transducer)({x: 'a', y: 'b', z: 'c'}), ['A', 'B']);

  t.deepEquals(into({})(transducer)('abc'), {0: 'A', 1: 'B'});
  t.deepEquals(into({})(transducer)(['a', 'b', 'c']), {0: 'A', 1: 'B'});
  t.deepEquals(into({})(transducer)({x: 'a', y: 'b', z: 'c'}), {x: 'A', y: 'B'});
  t.end();
});

test('into: drop · map · take', t => {
  const fn = td.function();
  td.when(fn('a')).thenThrow(new Error('was not expecting map("a")'));
  td.when(fn('b')).thenReturn('B');
  td.when(fn('c')).thenThrow(new Error('was not expecting map("c")'));

  const transducer = compose(drop(1), map(fn), take(1));

  t.same(into('')(transducer)(['a', 'b', 'c']), 'B');
  t.same(into('')(transducer)({x: 'a', y: 'b', z: 'c'}), 'B');
  t.same(into('')(transducer)('abc'), 'B');

  t.same(into([])(transducer)(['a', 'b', 'c']), ['B']);
  t.same(into([])(transducer)({x: 'a', y: 'b', z: 'c'}), ['B']);
  t.same(into([])(transducer)('abc'), ['B']);

  t.same(into({})(transducer)(['a', 'b', 'c']), {1: 'B'});
  t.same(into({})(transducer)({x: 'a', y: 'b', z: 'c'}), {y: 'B'});
  t.same(into({})(transducer)('abc'), {1: 'B'});
  t.end();
});

test('into: filter · map · take', t => {
  const f = td.function();
  td.when(f('🌯')).thenReturn(true);
  td.when(f('🌮')).thenReturn(false);
  td.when(f('🍣')).thenReturn(true);
  td.when(f('🍤')).thenReturn(true);
  
  const m = td.function();
  td.when(m('🌯')).thenReturn('burrito');
  td.when(m('🌮')).thenReturn('oops1');
  td.when(m('🍣')).thenReturn('sushi');
  td.when(m('🍤')).thenReturn('oops2');

  const transducer = compose(filter(f), map(m), take(2));

  t.equals(into('')(transducer)('🌯🌮🍣🍤'), 'burritosushi');
  t.deepEquals(into('')(transducer)(['🌯', '🌮', '🍣', '🍤']), 'burritosushi');
  t.deepEquals(into('')(transducer)({a: '🌯', b: '🌮', c: '🍣', d: '🍤'}), 'burritosushi');

  t.deepEquals(into([])(transducer)('🌯🌮🍣🍤'), ['burrito', 'sushi']);
  t.deepEquals(into([])(transducer)(['🌯', '🌮', '🍣', '🍤']), ['burrito', 'sushi']);
  t.deepEquals(into([])(transducer)({a: '🌯', b: '🌮', c: '🍣', d: '🍤'}), ['burrito', 'sushi']);

  t.deepEquals(into({})(transducer)('🌯🌮🍣🍤'), {0: 'burrito', 2: 'sushi'});
  t.deepEquals(into({})(transducer)(['🌯', '🌮', '🍣', '🍤']), {0: 'burrito', 2: 'sushi'});
  t.deepEquals(into({})(transducer)({a: '🌯', b: '🌮', c: '🍣', d: '🍤'}), {a: 'burrito', c: 'sushi'});
  t.end();
});