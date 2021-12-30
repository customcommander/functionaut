const td = require('testdouble');
const test = require('tape');
const {none: sut} = require('..');

test('none(pred)(xs)', t => {

  t.test('true when xs is empty', st => {
    const assert = xs => st_ => {
      const pred = td.func();
      st_.true(sut(pred)(xs) === true);
      st_.true(td.explain(pred).callCount === 0);
      st_.end();
    };
    st.test('arrays' , assert([]));
    st.test('objects', assert({}));
    st.test('strings', assert(''));
    st.end();
  });

  t.test('true when pred returned logical false for all elements', st => {
    const assert = xs => st_ => {
      const pred = td.func();
      td.when(pred('🍦')).thenDo(() => (st_.pass('pred("🍦") returned logical false'), false));
      td.when(pred('🍬')).thenDo(() => (st_.pass('pred("🍬") returned logical false'), null));
      td.when(pred('🥓')).thenDo(() => (st_.pass('pred("🥓") returned logical false'), undefined));
      st_.plan(4);
      st_.true(sut(pred)(xs) === true);
      st_.end();
    };
    st.test('arrays' , assert(['🍦', '🍬', '🥓']));
    st.test('objects', assert({x:'🍦', y:'🍬', z:'🥓'}));
    st.test('strings', assert('🍦🍬🥓'));
    st.end();
  });

  t.test('false when pred returned logical true for any element', st => {
    const assert = xs => st_ => {
      const pred = td.func();
      td.when(pred('🌯')).thenDo(() => (st_.pass('pred("🌯") returned logical true'), 0));
      st_.plan(3);
      st_.true(sut(pred)(xs) === false);
      st_.true(td.explain(pred).callCount === 1);
      st_.end();
    };
    st.test('arrays' , assert(['🌯', '🍬', '🥓']));
    st.test('objects', assert({x:'🌯', y:'🍬', z:'🥓'}));
    st.test('strings', assert('🌯🍬🥓'));
    st.end();
  });

  t.end();
});
