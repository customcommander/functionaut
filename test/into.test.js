const test = require('tape');
const td = require('testdouble');
const {compose, map, into, take, filter, drop, identity} = require('..');

test('into(ys)(transducer)(xs) -> do not mutate ys', t => {
  const arr = [];
  into(arr)(map(identity))([1, 2, 3]);
  t.same(arr, []);

  const obj = {};
  into(obj)(map(identity))({a:1,b:2,c:3});
  t.same(obj, {});

  t.end();
});

test('into(ys)(transducer)(xs) -> from any list to any other list', t => {
  t.same(into([])(map(identity))([1,2,3])      , [1,2,3]);
  t.same(into([])(map(identity))({x:1,y:2,z:3}), [1,2,3]);

  t.same(into('')(map(identity))([1,2,3])      , '123');
  t.same(into('')(map(identity))({x:1,y:2,z:3}), '123');

  t.same(into({})(map(identity))([1,2,3])      , {0:1,1:2,2:3});
  t.same(into({})(map(identity))({x:1,y:2,z:3}), {x:1,y:2,z:3});

  t.end();
});

test('into(ys)(transducer)(xs) -> ys can be non-empty', t => {
  const transducer = map(identity);
  t.same(into([0])(transducer)([1,2,3]), [0,1,2,3]);
  t.same(into({a:0})(transducer)({b:1,c:2,d:3}), {a:0,b:1,c:2,d:3});
  t.end();
});

test('into(ys)(transducer)(xs) -> can compose transducers', t => {
  const f = td.func();
  const g = td.func();
  const transducer = compose(drop(1), map(f), filter(g), take(2));

  td.when(f('1')).thenDo(() => t.fail(`Expected '1' to have been dropped`));
  td.when(f('2')).thenReturn('two');
  td.when(f('3')).thenReturn('three');
  td.when(f('4')).thenReturn('four');
  td.when(f('5')).thenDo(() => t.fail(`Expected '5' to have been ignored since two elements have been taken already`));
  td.when(g('two')).thenReturn(true);
  td.when(g('three')).thenReturn(false);
  td.when(g('four')).thenReturn(true);

  t.same(into([])(transducer)(['1','2','3','4','5'])          , ['two', 'four']);
  t.same(into([])(transducer)({a:'1',b:'2',c:'3',d:'4',e:'5'}), ['two', 'four']);
  t.end();
});
