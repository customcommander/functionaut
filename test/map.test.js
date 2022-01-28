const test = require('tape');
const td = require('testdouble');
const {map: sut} = require('..');

test('map applies the function to each element of the list.', t => {
  const translate = td.function();
  td.when(translate('🌯')).thenReturn('burrito');
  td.when(translate('🍣')).thenReturn('sushi');
  t.same(sut(translate)(['🌯', '🍣']), ['burrito', 'sushi']);
  t.same(sut(translate)({a: '🌯', b: '🍣'}), {a: 'burrito', b: 'sushi'});
  t.end();
});

test('map does not mutate the original list.', t => {
  const map42 = sut(() => 42);
  const arr = [1, 2];
  const obj = {a: 'x', b: 'y'};
  t.notSame(arr, map42(arr));
  t.notSame(obj, map42(obj));
  t.end();
});

test('map does not call the function when the list is empty.', t => {
  const noop = td.function();
  sut(noop)([]);
  sut(noop)({});
  td.verify(noop(/* … */), {ignoreExtraArgs: true, times: 0});
  t.end();
});
