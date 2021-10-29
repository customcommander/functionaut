# [2.2.0](https://github.com/customcommander/functionaut/compare/v2.1.0...v2.2.0) (2021-10-29)


### Features

* implement allfn ([472b596](https://github.com/customcommander/functionaut/commit/472b59649ce7c750e83006b99f615b996eff3aeb))
* implement anyfn ([14c0f64](https://github.com/customcommander/functionaut/commit/14c0f64e58501022338194ced3f3b261343ea253))
* implement nonefn ([e5b9172](https://github.com/customcommander/functionaut/commit/e5b9172f1ad35048a4c9654520cc2e318473be98))

# [2.1.0](https://github.com/customcommander/functionaut/compare/v2.0.0...v2.1.0) (2021-10-27)


### Bug Fixes

* into: stop mutating init ([5295494](https://github.com/customcommander/functionaut/commit/52954940b32ff3fa32ecfda1e3e90d2bac9d0a5e))


### Features

* implement any ([077261e](https://github.com/customcommander/functionaut/commit/077261e0b3799790915f7c080278ae2d302035dc))
* implement none ([0530a94](https://github.com/customcommander/functionaut/commit/0530a944a4085e06e420545fd14ef00463d3934f))

# [2.0.0](https://github.com/customcommander/functionaut/compare/v1.13.0...v2.0.0) (2021-10-12)


### Bug Fixes

* the function returned by unary does not need to be curried ([cf51ece](https://github.com/customcommander/functionaut/commit/cf51ece80577967154e90f1b05012e9214b074cd))


### chore

* remove type checking. close [#17](https://github.com/customcommander/functionaut/issues/17) ([a03793f](https://github.com/customcommander/functionaut/commit/a03793fe2474a2f5bd0b8421f95730567ed5271f))


### Features

* all checks the element of a list against a predicate. close [#24](https://github.com/customcommander/functionaut/issues/24) ([8f9bc01](https://github.com/customcommander/functionaut/commit/8f9bc01382a83c7f89d4aca7caae2711f9e171b3))


### BREAKING CHANGES

* The function has been changed to accept only one predicate and a list
of values instead of any number of parameters.

Migration:

v1: `all(isNum, isOdd)(1, 2, 3)`

v2: `all(x => isNum(x) === true && isOdd(x) === true, [1, 2, 3])`
* Type checking parameters is gone.
See corresponding Architecture Decision Record (ADR).

# [1.13.0](https://github.com/customcommander/functionaut/compare/v1.12.0...v1.13.0) (2021-10-11)


### Features

* implement some ([0cfc779](https://github.com/customcommander/functionaut/commit/0cfc7795dc956158e2cd8637719b0c77efc54730))

# [1.12.0](https://github.com/customcommander/functionaut/compare/v1.11.1...v1.12.0) (2021-10-09)


### Features

* implement fallback. close [#19](https://github.com/customcommander/functionaut/issues/19) ([3bce5d3](https://github.com/customcommander/functionaut/commit/3bce5d304569106686b3e5d7e17144f79eaff0d3))
* implement nil. close [#20](https://github.com/customcommander/functionaut/issues/20) ([269b1f5](https://github.com/customcommander/functionaut/commit/269b1f54aad18554560f9684958166d3caa04537))

## [1.11.1](https://github.com/customcommander/functionaut/compare/v1.11.0...v1.11.1) (2021-07-18)


### Bug Fixes

* function on can take all four parameters in one go ([7bc4436](https://github.com/customcommander/functionaut/commit/7bc44366ca90c98b96a8d6286972efc48e5df55b))

# [1.11.0](https://github.com/customcommander/functionaut/compare/v1.10.0...v1.11.0) (2021-07-16)


### Features

* implement concede ([1ae7d5f](https://github.com/customcommander/functionaut/commit/1ae7d5f4b867f3301bf4823c403ac46826c401b8))
* implement juxt ([c2209c1](https://github.com/customcommander/functionaut/commit/c2209c199d075863fdc0e44c5e8e20a16e7391c5))
* implement partial ([71f3bd8](https://github.com/customcommander/functionaut/commit/71f3bd84d7885c7439fc8f346e34a10388da420e))
* implement when ([c3a135e](https://github.com/customcommander/functionaut/commit/c3a135e3ae8e859cfcd22482b88699748ad7d7ed))

# [1.10.0](https://github.com/customcommander/functionaut/compare/v1.9.0...v1.10.0) (2021-07-15)


### Features

* implement all ([f3d6e57](https://github.com/customcommander/functionaut/commit/f3d6e579165b38d4941f86ffb3ee345c0b84174b))
* implement eq and ne ([12693df](https://github.com/customcommander/functionaut/commit/12693dfdc938c6c618dd83e835907f845a6c423f))
* implement on ([482af83](https://github.com/customcommander/functionaut/commit/482af83ca9653d1cf61143973fe9e2f19e3a0e51))
* implement upper and lower ([979fa6b](https://github.com/customcommander/functionaut/commit/979fa6bf47a067c7bc607ad7ea61306c8ffe88f9))

# [1.9.0](https://github.com/customcommander/functionaut/compare/v1.8.0...v1.9.0) (2021-07-06)


### Features

* implement cond ([3d44510](https://github.com/customcommander/functionaut/commit/3d445102fd7b1e1528e097eb32fa42d16e3f02b2))

# [1.8.0](https://github.com/customcommander/functionaut/compare/v1.7.0...v1.8.0) (2021-06-11)


### Features

* implement add ([d0ba92a](https://github.com/customcommander/functionaut/commit/d0ba92a1e38652a5242a6920285ba48dcce54038))

# [1.7.0](https://github.com/customcommander/functionaut/compare/v1.6.0...v1.7.0) (2021-03-28)


### Bug Fixes

* add examples for into. closes [#7](https://github.com/customcommander/functionaut/issues/7) ([88bc511](https://github.com/customcommander/functionaut/commit/88bc511e1af173a1b1d85db9d42abdb7912a1824))


### Features

* implement drop ([726a14d](https://github.com/customcommander/functionaut/commit/726a14d8a4bfa75883739c582ceea05fb239c389))

# [1.6.0](https://github.com/customcommander/functionaut/compare/v1.5.0...v1.6.0) (2021-03-07)


### Features

* implement constant ([9ea92ae](https://github.com/customcommander/functionaut/commit/9ea92ae61a75da3bfd1f274332345c881304b0bf))
* implement identity ([5a03704](https://github.com/customcommander/functionaut/commit/5a0370457228b44c65589ed532dcc247229dc54c))

# [1.5.0](https://github.com/customcommander/functionaut/compare/v1.4.0...v1.5.0) (2021-03-02)


### Features

* implement loop/recur to design stack-safe recursive functions ([b001bce](https://github.com/customcommander/functionaut/commit/b001bceb92754ffe475bc3bd7fbc110752384bde))

# [1.4.0](https://github.com/customcommander/functionaut/compare/v1.3.0...v1.4.0) (2021-02-27)


### Features

* implement flip ([b6409df](https://github.com/customcommander/functionaut/commit/b6409dfc976d4b0daee6703830dd6c9d0c9c345a))
* implement unary ([4d9fb3e](https://github.com/customcommander/functionaut/commit/4d9fb3e5f105a4bbce3bc2b2466059647fd27759))

# [1.3.0](https://github.com/customcommander/functionaut/compare/v1.2.0...v1.3.0) (2021-02-27)


### Features

* implement compose ([6ca623a](https://github.com/customcommander/functionaut/commit/6ca623aa7155d2c0695118df725cddad5a404126))
* implement map, take, filter and into ([c11418d](https://github.com/customcommander/functionaut/commit/c11418db6f8f2b92156b2b881870a6630a461d50))

# [1.2.0](https://github.com/customcommander/functionaut/compare/v1.1.0...v1.2.0) (2021-02-16)


### Features

* implement inc and dec ([84d503c](https://github.com/customcommander/functionaut/commit/84d503cbd119300cf3b271124b531614fca7a6dc))

# [1.1.0](https://github.com/customcommander/functionaut/compare/v1.0.0...v1.1.0) (2021-02-14)


### Features

* implement unfold ([a194bc0](https://github.com/customcommander/functionaut/commit/a194bc096ce8d86152616b56b392bba24a26cca3))
* implement zip, zip3 and zip4 ([8e910f6](https://github.com/customcommander/functionaut/commit/8e910f6d53dc59e3c6d2d7aa35e6a02a2f885ed5))

# 1.0.0 (2021-02-13)


### Features

* implement curry ([3845355](https://github.com/customcommander/functionaut/commit/38453557702e4814c123f41507d3b08e09df216a))
