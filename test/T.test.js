const testcheck = require('./_check');
const {T: sut} = require('..');

testcheck('T(x) -> true if `x` is logical true.', ['logict'], x => sut(x) === true);
testcheck('T(x) -> false if `x` is not logical true.', ['logicf'], x => sut(x) === false);
