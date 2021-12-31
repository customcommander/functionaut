const test = require('tape');
const td = require('testdouble');
const {nonefn: sut} = require('..');

test('nonefn(...pred)(...args)', t => {

  t.test('true when no predicate returned logical true', st => {
    // args
    const a = Symbol();
    const b = Symbol();
    // predicates
    const f = td.func();
    const g = td.func();
    const h = td.func();

    td.when(f(a, b)).thenDo(() => (st.pass('f(a, b) returned logical false'), false));
    td.when(g(a, b)).thenDo(() => (st.pass('g(a, b) returned logical false'), null));
    td.when(h(a, b)).thenDo(() => (st.pass('h(a, b) returned logical false'), undefined));

    const result = sut(f, g, h)(a, b);

    st.plan(7);
    st.true(result === true);
    st.true(td.explain(f).callCount === 1);
    st.true(td.explain(g).callCount === 1);
    st.true(td.explain(h).callCount === 1);
    st.end();
  });

  t.test('false when one predicate returned logical true', st => {
    // args
    const a = Symbol();
    const b = Symbol();
    // predicates
    const f = td.func();
    const g = td.func();

    td.when(f(a, a)).thenReturn(0);
    td.when(f(a, b)).thenReturn('');
    td.when(f(b, b)).thenReturn(NaN);

    st.true(sut(f, g)(a, a) === false);
    st.true(sut(f, g)(a, b) === false);
    st.true(sut(f, g)(b, b) === false);
    st.true(td.explain(g).callCount === 0);
    st.end();
  });

  t.end();
});
