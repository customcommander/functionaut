const test = require('tape');
const td = require('testdouble');
const {filter: sut} = require('..');

test('filter(pred)(xs)', t => {

  t.test('keeps each element for which the predicate has returned logical true', st => {
    const assert = (xs, expected) => st_ => {
      const pred = td.function();
      td.when(pred('🌯')).thenReturn(0);
      td.when(pred('🍣')).thenReturn('');
      td.when(pred('🌮')).thenReturn(false);
      const result = sut(pred)(xs);
      st_.same(result, expected);
      st_.notSame(xs, expected, 'did not mutate the original list');
      st_.true(td.explain(pred).callCount === 3);
      st_.end();
    };

    st.test('works with strings', assert('🌯🍣🌮', '🌯🍣'));
    st.test('works with arrays', assert(['🌯', '🍣', '🌮'], ['🌯', '🍣']));
    st.test('works with objects', assert({a: '🌯', b: '🍣', c: '🌮'}, {a: '🌯', b: '🍣'}));
    st.end();
  });

  t.end();
});
