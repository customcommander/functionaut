const test = require('tape');
const {T: sut} = require('..');

test('T(x) -> true if x is neither nil nor false', t => {
  t.same(sut({})       , true);
  t.same(sut([])       , true);
  t.same(sut(0)        , true);
  t.same(sut('')       , true);
  t.same(sut(NaN)      , true);
  t.same(sut(false)    , false);
  t.same(sut(null)     , false);
  t.same(sut(undefined), false);
  t.end();
});
