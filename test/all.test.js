const testcheck = require('./_check');
const {all: sut, allmap} = require('..');

testcheck('all(xs)',
  ['xs'],
    xs => sut(xs) === allmap(x => x)(xs));