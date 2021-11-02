const test = require('tape');
const {F: sut} = require('..');

test('F(x) -> true if x is either nil or false', t => {
  t.same(sut(false)    , true);
  t.same(sut(null)     , true);
  t.same(sut(undefined), true);
  t.same(sut({})       , false);
  t.same(sut([])       , false);
  t.same(sut(0)        , false);
  t.same(sut('')       , false);
  t.same(sut(NaN)      , false);
  t.end();
});
