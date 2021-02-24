const test = require('tape');
const td = require('testdouble');
const {map} = require('../dist');

test('map applies the function to each element of the list.', t => {
  const translate = td.function();
  td.when(translate('🌯')).thenReturn('burrito');
  td.when(translate('🍣')).thenReturn('sushi');
  t.same(map(translate)('🌯🍣'), 'burritosushi');
  t.same(map(translate)(['🌯', '🍣']), ['burrito', 'sushi']);
  t.same(map(translate)({a: '🌯', b: '🍣'}), {a: 'burrito', b: 'sushi'});
  td.verify(translate(/* … */), {ignoreExtraArgs: true, times: 6});
  t.end();
});

test('map does not mutate the original list.', t => {
  const map42 = map(() => 42);
  const str = '🌯🌮';
  const arr = [1, 2];
  const obj = {a: 'x', b: 'y'};
  t.notSame(str, map42(str));
  t.notSame(arr, map42(arr));
  t.notSame(obj, map42(obj));
  t.end();
});

test('map does not call the function when the list is empty.', t => {
  const noop = td.function();
  map(noop)('');
  map(noop)([]);
  map(noop)({});
  td.verify(noop(/* … */), {ignoreExtraArgs: true, times: 0});
  t.end();
});

test('map returns null when not given a list.', t => {
  const noop = td.function();
  t.same(map(noop)(null), null);
  td.verify(noop(/* … */), {ignoreExtraArgs: true, times: 0});
  t.end();
});

test('map fails when not given a function.', t => {
  t.throws(() => map([])(noop));
  t.end();
});
