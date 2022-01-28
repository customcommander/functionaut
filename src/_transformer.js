/**
 * @license MIT
 * @copyright (c) 2021 Julien Gonzalez <hello@spinjs.com>
 */

/**
 * @package
 * @fileoverview
 * This module provides syntactic sugar to create and work with transformers.
 * A transformer is any object that implements the "Transducer Protocol".
 * https://github.com/cognitect-labs/transducers-js#the-transducer-protocol
 */

// The various symbols expected under the transducer namespace.
const SYM_INIT = '@@transducer/init';
const SYM_STEP = '@@transducer/step';
const SYM_RESULT = '@@transducer/result';
const SYM_REDUCED = '@@transducer/reduced';
const SYM_VALUE = '@@transducer/value';

/**
 * Takes a transformer constructor `xfor` and puts the given functions
 * on its prototype at specific namespaced locations.
 * Each function can assume that `this` refers to the transformer instance.
 * There is a default implementation for both init and result functions.
 * @param {function(...?)} xfor
 * @param {Transformer.Step} stepFn Transducer step function.
 * @param {?Transformer.Result=} resultFn Transducer result function.
 * @param {?Transformer.Init=} initFn Transducer init function.
 */
const Transformer = (xfor, stepFn, resultFn = Transformer.Result, initFn = Transformer.Init) => {
  xfor.prototype[SYM_STEP] = stepFn;
  xfor.prototype[SYM_RESULT] = resultFn;
  xfor.prototype[SYM_INIT] = initFn;
};

/** @typedef {Array|Object} */
Transformer.Iterable;

/** @typedef {function()} */
Transformer.Init = function() { /* To the best of my knowledge a no-op is a safe default here. */ };

/** @typedef {function(Transformer.Iterable, ?, ?): Transformer.Iterable} */
Transformer.Step = function(acc, value, key) { throw new Error('A transformer must implement a `@@transducer/step` method'); };

/** @typedef {function(Transformer.Iterable): Transformer.Iterable} */
Transformer.Result = function(acc) { return acc; };

/**
 * True if `x` is in a reduced box.
 * @param {?} x
 * @return {boolean}
 */
Transformer.isReduced = x =>
  (x?.[SYM_REDUCED] === true);

/**
 * Puts `x` into the reduced box to signal the end of a reduction.
 * @param {?} x
 * @return {?}
 */
Transformer.Reduced = x =>
  (x?.[SYM_REDUCED] === true
    ? x
    : ({ [SYM_REDUCED]: true
      ,  [SYM_VALUE]: x }));

/**
 * Takes `x` out of the reduced box or returns `x` if it wasn't in such a box.
 * @param {?} x
 * @return {?}
 */
Transformer.Value = x =>
  (x?.[SYM_VALUE] || x);

/**
 * Applies `xf`'s step function to the remaining parameters.
 * @param {Object} xf
 * @param {Transformer.Iterable} acc
 * @param {?} value
 * @param {?} key
 * @return {Transformer.Iterable}
 */
Transformer.step = (xf, acc, value, key) =>
  xf[SYM_STEP](acc, value, key);

/**
 * Applies `xf`'s result function to `acc.
 * @param {Object} xf
 * @param {Transformer.Iterable} acc
 * @return {Transformer.Iterable}
 */
Transformer.result = (xf, acc) =>
  xf[SYM_RESULT](acc);

/**
 * True if `x` is a transformer.
 * @param {?} x
 * @return {boolean}
 */
Transformer.is = x =>
  (  (typeof x?.[SYM_INIT] == 'function')
  && (typeof x?.[SYM_STEP] == 'function')
  && (typeof x?.[SYM_RESULT] == 'function'));

module.exports = {
  Transformer
};
