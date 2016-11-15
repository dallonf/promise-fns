# promise-fns

![Build Status](https://img.shields.io/travis/dallonf/promise-fns.svg)
![Coverage](https://img.shields.io/coveralls/dallonf/promise-fns.svg)
![Downloads](https://img.shields.io/npm/dm/promise-fns.svg)
![Downloads](https://img.shields.io/npm/dt/promise-fns.svg)
![npm version](https://img.shields.io/npm/v/promise-fns.svg)
![dependencies](https://img.shields.io/david/dallonf/promise-fns.svg)
![dev dependencies](https://img.shields.io/david/dev/dallonf/promise-fns.svg)
![License](https://img.shields.io/npm/l/promise-fns.svg)

Helper functions that I always seem to need when working with Promises

## Getting Started

Install it via npm:

```shell
npm install --save promise-fns
```

And include in your project:

```javascript
// ES6
import promiseFns from 'promise-fns';
// CommonJS
var promiseFns = require('promise-fns');
```

For these functions to work, you will need to have a global `Promise` object that is compatible with the ES6 Promise spec.

## Usage

### fromCallback(cb => fn(...args, cb)) => Promise

Allows you to capture the result of a callback function as a promise.

Example: 

```javascript
promiseFns.fromCallback(cb => fs.readFile('/batcave/batmobile/schematics', 'utf-8', cb))
  .then(schematics => build(schematics));
```

If a callback function returns multiple arguments, the promise will resolve with an array:

```javascript
function sidekicks(cb) {
  cb(null, 'alfred', 'robin', 'oracle');
}

promiseFns.fromCallback(cb => sidekicks(cb))
  .then(names => console.log(names)) // ['alred', 'robin', 'oracle']
```

## License

MIT License

Copyright (c) 2016 Dallon Feldner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
