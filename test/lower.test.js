const check = require('./_check');
const {lower: sut} = require('..');

check('lower(s)',
  ['string'], s =>
    sut(s) === s.toLowerCase());
