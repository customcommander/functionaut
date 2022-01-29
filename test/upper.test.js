const check = require('./_check');
const {upper: sut} = require('..');

check('upper(s)',
  ['string'], s =>
    sut(s) === s.toUpperCase());
