const Throw =
  msg => { throw new Error(msg); };

const assert =
  pred => (x, err) =>
    pred(x) === true || Throw(err);

const assert_function =
  assert(x => typeof x === 'function');

module.exports =
  { assert_function
  };
