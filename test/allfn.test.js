const test = require('tape');
const td = require('testdouble');
const {allfn: sut} = require('..');

test('allfn(...fn)(...args)', t => {

  t.test('true when each fn returned logical true when applied to args', st => {
    const a = Symbol();
    const b = Symbol();
    const f = td.func();
    const g = td.func();
    const h = td.func();
    td.when(f(a, b)).thenDo(() => (st.pass('f(a, b) has returned logical true'), NaN));
    td.when(g(a, b)).thenDo(() => (st.pass('g(a, b) has returned logical true'), 0));
    td.when(h(a, b)).thenDo(() => (st.pass('h(a, b) has returned logical true'), ''));
    st.plan(4);
    st.true(sut(f, g, h)(a, b) === true);
    st.end();
  });

  t.test('false when any fn returned logical false when applied to args', st => {
    const a = Symbol();
    const b = Symbol();
    const f = td.func();
    const g = td.func();
    const h = td.func();
    td.when(f(a, b)).thenReturn(false);
    st.true(sut(f, g, h)(a, b) === false, 'false as `f(a, b)` returned logical false');
    st.true(td.explain(g).callCount === 0, 'g was not called at all');
    st.true(td.explain(h).callCount === 0, 'h was not called at all');
    st.end();
  });

  t.end();
});
