const td = require('testdouble');
const test = require('tape');
const {cond: sut} = require('..');

test('cond(...fn)(...args)', t => {

  t.test('invokes predicates until one returns logical true', st => {
    const a = Symbol();
    const b = Symbol();
    const f1 = td.func();
    const f2 = td.func();
    const g1 = td.func();
    const g2 = td.func();
    const h1 = td.func();
    const h2 = td.func();
    td.when(f1(a, b)).thenDo(() => (st.pass('1st predicate invoked'), false));
    td.when(g1(a, b)).thenDo(() => (st.pass('2nd predicate invoked'), 0));
    sut(f1, f2, g1, g2, h1, h2)(a, b);
    st.true(td.explain(h1).callCount === 0);
    st.end();
  });

  t.test('skips functions until a predicate has returned logical true', st => {
    const a = Symbol();
    const b = Symbol();
    const f1 = td.func();
    const f2 = td.func();
    const g1 = td.func();
    const g2 = td.func();
    const h1 = td.func();
    const h2 = td.func();
    td.when(g1(a, b)).thenReturn(0);
    sut(f1, f2, g1, g2, h1, h2)(a, b);
    st.true(td.explain(f2).callCount === 0, '1st function skipped');
    st.true(td.explain(h2).callCount === 0, '3rd function skipped');
    st.end();
  });

  t.test('returns the value returned by the function when applied to the arguments', st => {
    const a = Symbol();
    const b = Symbol();
    const c = Symbol();
    const f1 = td.func();
    const f2 = td.func();
    const g1 = td.func();
    const g2 = td.func();
    const h1 = td.func();
    const h2 = td.func();
    td.when(g1(a, b)).thenReturn(0);
    td.when(g2(a, b)).thenReturn(c);
    st.true(sut(f1, f2, g1, g2, h1, h2)(a, b) === c);
    st.end();
  });

  t.test('returns undefined when no predicates passed', st => {
    const a = Symbol();
    const b = Symbol();
    const f1 = td.func();
    const f2 = td.func();
    const g1 = td.func();
    const g2 = td.func();
    const h1 = td.func();
    const h2 = td.func();
    st.true(sut(f1, f2, g1, g2, h1, h2)(a, b) === undefined);
    st.end();
  });

  t.end();
});
