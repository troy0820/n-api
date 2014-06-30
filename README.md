n-api
=====

node.js api for n (https://www.npmjs.org/package/n). Minor version is in step with `n`.

## Usage

- Set the node version:
```js
var n = require('n-api');

n('latest');
// do some stuff
```

- List the available node versions
```js
var list = n.ls(); // [ '0.8.6', '0.8.7', ... '0.11.13' ]
```
