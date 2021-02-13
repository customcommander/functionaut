# How to contribute?

## Exports

Only modules correctly documented will be made available to the public.

src/inc.js:

```javascript
/** @namespace / */

/**
 * @public
 * @function inc
 */
module.exports = inc;
```

src/utils.js:

```javascript
/** @namespace /helpers/types */

/**
 * @public
 * @function is_string
 * @param {*} x
 * @return {boolean}
 */
const is_string = x => typeof x === 'string';

/**
 * @public
 * @function is_number
 * @param {*} x
 * @return {boolean}
 */
const is_number = x => typeof x === 'number';

module.exports = {
  is_number,
  is_string
};
```


will generate the following in dist/index.js:

```javascript
module.exports {
  inc: require('./inc.js'),
  helpers: {
    types: {
      is_string: require('./utils').is_string,
      is_number: require('./utils').is_number
    }
  }
};
```