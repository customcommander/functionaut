const test = require('tape');
const td = require('testdouble');
const {some: sut} = require('..');

test('some(...fn)(...args)', t => {

  t.test('applies functions to args whilst they return logical false', st => {
    const a = Symbol();
    const b = Symbol();
    const f = td.func();
    const g = td.func();

    td.when(f(a, b)).thenDo(() => (st.pass('f(a, b) called'), false));
    td.when(g(a, b)).thenDo(() => (st.pass('g(a, b) called'), false));

    st.plan(2);
    sut(f, g)(a, b);
    st.end();
  });

  t.test('returns the first truthy value and ignore all other functions', st => {
    const a = Symbol();
    const b = Symbol();
    const f = td.func();
    const g = td.func();

    td.when(f(a, a)).thenReturn(0);
    td.when(f(a, b)).thenReturn('');

    st.true(sut(f, g)(a, a) === 0);
    st.true(sut(f, g)(a, b) === '');
    st.true(td.explain(g).callCount === 0);
    st.end();
  });

  t.test('returns whatever the last function has returned', st => {
    const a = Symbol();
    const b = Symbol();
    const z = Symbol();
    const f = td.func();
    const g = td.func();
    const h = td.func();

    td.when(h(a, b)).thenReturn(z);

    st.true(sut(f, g, h)(a, b) === z);
    st.end();
  });

  t.end();
});
