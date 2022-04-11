const testcheck = require('./_check');
const {allfn: sut, T} = require('..');

testcheck('allfn(fs)(x)', ['[() -> primitive]'], fs => {

  // Expected outcome if fs is empty. So we start with that.
  let expected = true;

  // A predicate is considered satisfied if it returns logical true.
  // As soon as a predicate returns logical false we do not call any remaining ones.
  // At the end `i` will be the number of expected calls.
  let i = 0;
  while (i < fs.length && (expected = T(fs[i++]())));

  // Next we need to verify that predicates have been called `i` many times
  // and that they all have been passed `x` as their parameter.
  // At the end both `i` and `j` should be the same.
  const x = Symbol();
  let j = 0;
  const spies = fs.map((f, idx) => (y) => {
    if (y !== x) {
      throw new Error(`Predicate #${idx} was not applied to 'x'`);
    }
    j++;
    return f();
  });

  let actual;
  try {
    actual = sut(spies)(x);
  } catch (e) {
    return e.message;
  }

  if (i !== j) {
    throw new Error(`Expected ${i} predicate calls. Got ${j}.`);
  }

  if (actual !== expected) {
    throw new Error(`Expected ${expected}. Got ${actual}`);
  }
  
  return true;
});
