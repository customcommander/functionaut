# Glossary

!!! info

    List of terms and concepts used throughout the library.

## functional placeholder

A special value used in curried functions that will be substituted with the real value later on.
Useful with [operator functions](./glossary.md#operator-function).

## logical truth

Any value that is neither `false` nor [nil](./glossary.md#nil) constitutes logical truth.
Please note that `0`, `''` and `NaN` also constitute logical truth.

## logical falsity

Any value that is either `false` or [nil](./glossary.md#nil) constitutes logical falsity.

## nil

Either `null` or `undefined`.

## operator function

An operator function is a binary function with *left* and *right* sections.

To illustrate this concept we will use the operator function [`subtract`](../api/subtract.md)
which is the functional equivalent of `a - b`.

When called with one argument the operator function assumes it has been given the *right* section and returns
a function that takes the *left* section:

```javascript title="Similar to x - 2"
const sub2 = subtract(2);

sub2(44);
//=> 42
```

When called with two arguments **and** the second argument is the
[functional placeholder](./glossary.md#functional-placeholder), the operator function
assumes it has been given the *left* section and returns a function that takes the *right* section.

```javascript title="Similar to 44 - x"
const subFrom44 = subtract(44, __);

subFrom44(2);
//=> 42
```

Operator functions in this library have been inspired by this [answer from Stack Overflow](https://stackoverflow.com/a/25720884/1244884).

## predicate

A predicate is a function that uses [logical truth](./glossary.md#logical-truth)
or [logical falsity](./glossary.md#logical-falsity) to make a decision.
