![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@customcommander/functionaut)
![Maintenance](https://img.shields.io/maintenance/yes/2022)

# Functionaut

General purpose library for the functional programming hobbyist.

## Installation

```
npm i @customcommander/functionaut
```

### Browser

A browser bundle is available and exports the library under the `window['@customcommander/functionaut']` namespace:

```html
<script src="./node_modules/@customcommander/functionaut/dist/browser.min.js"></script>
<script>
  const {map, add} = window['@customcommander/functionaut'];
  map(add(42))([0, 1, 2]);
  //=> [42, 43, 44]
</script>
```
