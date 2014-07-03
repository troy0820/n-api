n-api
=====

[![Build Status](https://travis-ci.org/tjwebb/n-api.svg?branch=master)](https://travis-ci.org/tjwebb/n-api)

node.js api for n (https://www.npmjs.org/package/n). Minor version is in step with `n`.

## Usage

### `n(<version>)`

Switch to the specified node version. Download and Install if not present on
system.

```js
var n = require('n-api');

n('latest');
// do some stuff
```

### `n.ls()`

List availble versions;

```js
var list = n.ls(); // [ '0.8.6', '0.8.7', ... '0.11.13' ]
```

### `n.use(<version>, <cmd>)`

Run `cmd` with the specified `version` of node.

```js
n.use('0.11.13', 'app.js');
```

### `n.bin(<version>)`

Return the location of the node binary for the specified `version`, or `null`
if that version is not installed.o
### License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

### Author

[Travis Webb](https://github.com/tjwebb) ([me@traviswebb.com](mailto:me@traviswebb.com))
