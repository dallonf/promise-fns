# promise-fns

![Build Status](https://img.shields.io/travis/dallonf/promise-fns.svg)
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
import * as promiseFns from 'promise-fns';
// CommonJS
var promiseFns = require('promise-fns');
```

For these functions to work, you will need to have a global `Promise` object that is compatible with the ES6 Promise spec.

## Usage

### fromCallback(cb => fn(...args, cb)) => Promise

Allows you to capture the result of a Node callback function as a promise. This assumes the Node callback pattern of `function(err, result)`.

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

### toCallback(promise, cb) => Promise

Allows you to handle a Promise with a standard Node callback.

Example:

```javascript
promiseFns.toCallback(somethingThatReturnsAPromise(), (err, result) => {
  // Normal Node-style callback
});
```

This function will also return a Promise of void when the callback is finished (synchronously) executing. You probably won't need this.

### alwaysAfter(promise, cb: () => Promise) => Promise

Allow you to insert a handler after a promise, whether it rejects or resolves. This is conceptually similar to a `try/finally` block.

Example:

```javascript
const stream = openStream();
return promiseFns.alwaysAfter(readFromStream(stream), () => stream.close());
```

Returns a promise that will resolve or reject with the value of the `promise` argument. The only exception is if `cb` throws; then that error will propagate normally through Promise rejections.

`cb` can optionally return a promise of its own. In this case, the `alwaysAfter` promise will not resolve until `cb`'s promise. This is useful for asynchronous teardown logic. 

### unswallowErrors(promise | error) => Promise

**Note: most Promise implementations lately will log unhandled rejections to the console by default. You very likely don't need this for ordinary error handling!**

Promises have an annoying habit of capturing all thrown errors and exceptions as their own rejection, and it can be difficult to break out of this. This function takes an error and throws it outside of the control of the Promise implementation so that it's simply an unhandled exception. You can use it as a `catch` handler: 

Example:

```javascript
  doAThing()
    .then(doSomethingElse)
    .catch(promiseFns.unswallowErrors)
```

You can also wrap the promise in the call:

```javascript
  promiseFns.unswallowErrors(doAThing().then(doSomethingElse));
```

Or use it outside of promises entirely...

```javascript
  // Your collaborators may not like you if you do things like this often. 
  try {
    promiseFns.unswallowErrors(new Error("don't catch me!"));
  } catch (err) {
    // won't be caught
  }
```

This function will also a return a Promise that resolves after any error has been raised. (or immediately, if there was no error to handle)

It's worth nothing that `toCallback` uses this behind the scenes to avoid errors within the callback being swallowed.

## License

MIT License

Copyright (c) 2021 Dallon Feldner

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
