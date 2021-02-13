## [1.8.1](https://github.com/customcommander/project-blueprint/compare/v1.8.0...v1.8.1) (2021-02-13)


### Bug Fixes

* fix bug where table of contents was not properly sorted ([16b72e3](https://github.com/customcommander/project-blueprint/commit/16b72e3b9ce9cc6984c0e54977acaafb662bca7b))

# [1.8.0](https://github.com/customcommander/project-blueprint/compare/v1.7.0...v1.8.0) (2021-02-13)


### Bug Fixes

* fix typo in readme ([12c3c88](https://github.com/customcommander/project-blueprint/commit/12c3c88bc7ab3cd6946aaaf91bd8e3fbdb9843ed))
* remove public access flag when parsing jsdoc annotations and document corresponding makefile target ([810b6e1](https://github.com/customcommander/project-blueprint/commit/810b6e1924e862b4ed08c67a7edcf7f552c34905))


### Features

* add import snippets in docs ([d027fd5](https://github.com/customcommander/project-blueprint/commit/d027fd56fb4949121ad20580a8f92710ecd6c2f2))
* add support for [@throws](https://github.com/throws) jsdoc tag in documentation ([83ddb8d](https://github.com/customcommander/project-blueprint/commit/83ddb8d71a658685b72d9b798bde1f35bd18f90c))
* allow custom intro for docs. closes [#10](https://github.com/customcommander/project-blueprint/issues/10) ([98421a2](https://github.com/customcommander/project-blueprint/commit/98421a22a5089df3bd18136b1f3fbc14fbc879cf))
* allow custom logo for docs ([e8cba61](https://github.com/customcommander/project-blueprint/commit/e8cba61d8960639573f6fa3a9665419c929b3d26))
* does not package code that has no description ([64b1770](https://github.com/customcommander/project-blueprint/commit/64b1770c29cd365be3f93ecabbbc3519e675d4d0))

# [1.7.0](https://github.com/customcommander/project-blueprint/compare/v1.6.0...v1.7.0) (2021-02-07)


### Bug Fixes

* fix bold rendering in deprecation warning ([d5cff67](https://github.com/customcommander/project-blueprint/commit/d5cff67e00d91a25f0db4a07f41a4f00c621469f))
* fix bug where parameters table was reduced to only one row ([bc2e939](https://github.com/customcommander/project-blueprint/commit/bc2e939ae39cb74057bed0cf36359f81ec7748bc))


### Features

* add param description and indicate when a param is optional ([04822a2](https://github.com/customcommander/project-blueprint/commit/04822a2a1acb7aeee6fd01afb35859f772d6cf98))

# [1.6.0](https://github.com/customcommander/project-blueprint/compare/v1.5.0...v1.6.0) (2021-02-07)


### Features

* implement curry to experiment with the closure compiler ([7b11812](https://github.com/customcommander/project-blueprint/commit/7b118122d857f7be81c7f955a0fb1d0eb0bff832))

# [1.5.0](https://github.com/customcommander/project-blueprint/compare/v1.4.2...v1.5.0) (2021-02-06)


### Features

* add support for deprecation ([d7c1e19](https://github.com/customcommander/project-blueprint/commit/d7c1e19e2e5eb7123336b8119f507fb1c906a6bd))
* add support for description, parameters and return value ([47a642c](https://github.com/customcommander/project-blueprint/commit/47a642c38e5510e90a9cb345a8c9eed5a2a7dc5a))

## [1.4.2](https://github.com/customcommander/project-blueprint/compare/v1.4.1...v1.4.2) (2021-02-06)


### Bug Fixes

* deindent run command when building doc ([5693b06](https://github.com/customcommander/project-blueprint/commit/5693b06eb6b78be7a93b4444e656e64810bdebb7))

## [1.4.1](https://github.com/customcommander/project-blueprint/compare/v1.4.0...v1.4.1) (2021-02-06)


### Bug Fixes

* fix setup step on docs deployment ([7d8eff8](https://github.com/customcommander/project-blueprint/commit/7d8eff8d8d7c8dd9395234f4cd8ed2586e568a22))

# [1.4.0](https://github.com/customcommander/project-blueprint/compare/v1.3.0...v1.4.0) (2021-02-06)


### Features

* autogenerate docs using slate. basic support ([7794c98](https://github.com/customcommander/project-blueprint/commit/7794c9868ac4ea5ec51d2a50d3fbee684acbf361))

# [1.3.0](https://github.com/customcommander/project-blueprint/compare/v1.2.0...v1.3.0) (2021-02-05)


### Bug Fixes

* minify node distribution files ([cce2fa4](https://github.com/customcommander/project-blueprint/commit/cce2fa42cd1d4d0cdbedbfeaffcda7225efc622a))
* specify es2019 as input language when transpiling for browser ([224b183](https://github.com/customcommander/project-blueprint/commit/224b183f94758adbdf4083824d6ab067e4da32b7))


### Features

* add basic testing support ([821fffe](https://github.com/customcommander/project-blueprint/commit/821fffee40d14a5e7afeeb2a4d1b65c1a2f9b690))

# [1.2.0](https://github.com/customcommander/project-blueprint/compare/v1.1.0...v1.2.0) (2021-02-04)


### Bug Fixes

* pass secrets as env vars not as key=val pairs ([350eb76](https://github.com/customcommander/project-blueprint/commit/350eb769afc03fb97fda6c3ecebfbd3c8f7143dd))


### Features

* add new github workflow on pull requests ([473d0a9](https://github.com/customcommander/project-blueprint/commit/473d0a93f2e3f920e1ae70fb8f956eebf40889b3))
* use google closure compiler to produce a browser bundle ([ea36c05](https://github.com/customcommander/project-blueprint/commit/ea36c056eca56719ff484b432e633ba2f9f42452))

# [1.1.0](https://github.com/customcommander/project-blueprint/compare/v1.0.2...v1.1.0) (2021-02-01)


### Bug Fixes

* make sure vscode uses bash when working inside a container ([f32c728](https://github.com/customcommander/project-blueprint/commit/f32c728d8eb50062effac84e639d6d3ce20f4719))


### Features

* export symbols based on jsdoc annotations ([79af28f](https://github.com/customcommander/project-blueprint/commit/79af28f585bf923d479bf000f866ba8af9fe8cd6))

## [1.0.2](https://github.com/customcommander/project-blueprint/compare/v1.0.1...v1.0.2) (2021-01-28)


### Bug Fixes

* set public access in package.json to fix 402 npm error ([c18ec88](https://github.com/customcommander/project-blueprint/commit/c18ec888aedca7e58d477b367ea239dd1541f481))

## [1.0.1](https://github.com/customcommander/project-blueprint/compare/v1.0.0...v1.0.1) (2021-01-28)


### Bug Fixes

* pass env vars to docker container in gh workflow ([28be287](https://github.com/customcommander/project-blueprint/commit/28be287f35ec971fe77457a54a1c402bde054877))

# 1.0.0 (2021-01-28)


### Bug Fixes

* implement a basic build and release pipeline ([b1fa01f](https://github.com/customcommander/project-blueprint/commit/b1fa01f0212193e64529d7c9b2ef8b737b0a2c1a))
