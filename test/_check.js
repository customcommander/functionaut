const test = require('tape');
const jsc = require('jsverify');

const LogicalFalseArbitrary =
  jsc.nonshrink(jsc.elements([false, null, undefined]));

const LogicalTrueArbitrary =
  jsc.oneof([ jsc.integer
            , jsc.string
            , jsc.nonshrink(jsc.elements([true, NaN]))]);

const jscEnv = {
  logicf: LogicalFalseArbitrary,
  logict: LogicalTrueArbitrary,
  xs: jsc.oneof( jsc.array(jsc.char)
               , jsc.string
               , jsc.dict(jsc.char))
};

module.exports = (statement, arbitraries, verifn) => {
  test(statement, t => {
    const res = jsc.check(jsc.forall(...arbitraries, jscEnv, verifn));
    t.same(res, true);
    t.end();
  });
};
