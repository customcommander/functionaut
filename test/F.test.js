const testcheck = require('./_check');
const {F: sut} = require('..');

testcheck('F(x) -> true when x is logical false', ['logicf'], x => sut(x) === true);
testcheck('F(x) -> false when x is not logical false', ['logict'], x => sut(x) === false);
