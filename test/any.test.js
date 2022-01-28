const td = require('testdouble');
const test = require('tape');
const {any: sut, identity} = require('..');

test('any(pred)(xs)', t => {

  t.test('false when given an empty list', st => {
    const assert = xs => st_ => {
      const pred = td.func();
      st_.true(sut(pred)(xs) === false);
      st_.true(td.explain(pred).callCount === 0);
      st_.end();
    };
    st.test('array' , assert([]));
    st.test('object', assert({}));
    st.end();
  });

  t.test('false when pred failed for all elements of the list', st => {
    const assert = xs => st_ => {
      const pred =  td.func();
      td.when(pred('🍦')).thenDo(() => (st_.pass('pred("🍦") returned logical false'), false));
      td.when(pred('🍬')).thenDo(() => (st_.pass('pred("🍬") returned logical false'), null));
      td.when(pred('🥓')).thenDo(() => (st_.pass('pred("🥓") returned logical false'), undefined));
      st_.plan(4);
      st_.true(sut(pred)(xs) === false);
      st_.end();
    };
    st.test('array' , assert(['🍦', '🍬', '🥓']));
    st.test('object', assert({x:'🍦', y:'🍬', z:'🥓'}));
    st.end();
  });

  t.test('true when pred passed for any element of the list', st => {
    const assert = xs => st_ => {
      const pred = td.func();
      td.when(pred('🌯')).thenReturn(0);
      td.when(pred('🥑')).thenReturn(NaN);
      td.when(pred('🍣')).thenReturn('');
      st_.true(sut(pred)(xs) === true);
      st_.true(td.explain(pred).callCount === 1);
      st_.end();
    };
    st.test('array' , assert(['🌯', '💥', '💥']));
    st.test('object', assert({x:'🥑', y:'💥', z:'💥'}));
    st.end();
  });

  t.end();
});
