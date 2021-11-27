const jsc = require('jsverify');
const td = require('testdouble');
const test = require('tape');
const {all: sut, F, T} = require('..');

test('all(f)(xs) -> applies f to each x of xs', t => {
  const list = jsc.oneof( jsc.array(jsc.char)
                        , jsc.string
                        , jsc.dict(jsc.char));

  jsc.assert(jsc.forall(list, xs => {
    const pred = td.func();
    td.when(pred(td.matchers.isA(String))).thenReturn(true);
    sut(pred)(xs);
    return td.explain(pred).callCount === Object.values(xs).length;
  }));

  t.pass('✓');
  t.end();
});

test('all(f)(xs) -> true if f(x) returned logical true for all x', t => {
  const list = jsc.array(jsc.oneof( jsc.number
                                  , jsc.bool
                                  , jsc.falsy
                                  , jsc.string));

  jsc.assert(jsc.forall(list, xs => {
    const success = xs.some(F) !== true;
    return sut(T)(xs) === success;
  }));

  t.pass('✓');
  t.end();
});
