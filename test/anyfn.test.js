const test = require('tape');
const td = require('testdouble');
const {anyfn: sut} = require('..');

test('anyfn(...fn)(...args)', t => {

  t.test('true when any fn returned logical true when applied to the arguments', st => {
    const a = Symbol();
    const b = Symbol();
    const f = td.func();
    const g = td.func();
    const h = td.func();

    td.when(f(a, b)).thenDo(() => (st.pass('f(a, b) returned logical false'), false));
    td.when(g(a, b)).thenDo(() => (st.pass('g(a, b) returned logical true'), 0));

    st.plan(4)
    st.true(sut(f, g, h)(a, b) === true);
    st.true(td.explain(h).callCount === 0);
    st.end();
  });

  t.test('false when no fn returned logical true when applied to the arguments', st => {
    const a = Symbol();
    const b = Symbol();
    const f = td.func();

    td.when(f(a, b)).thenDo(() => (st.pass('f(a, b) called ✓'), false));

    st.plan(5);
    st.true(sut(f, f, f)(a, b) === false);
    st.true(td.explain(f).callCount === 3);
    st.end();
  });

  t.end();
});
