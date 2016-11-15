import setImmediate from 'set-immediate-shim';

function unswallowErrorHandler(err) {
  return new Promise(resolve => {
    setImmediate(() => {
      // resolve sometime after the error is thrown
      setImmediate(resolve);
      throw err;
    })
  })
}

export default function unswallowErrors(input) {
  if (typeof input.then === 'function' && typeof input.catch === 'function') {
    // It was passed a promise
    return input.catch(unswallowErrorHandler);
  } else {
    // It was used as a handler
    return unswallowErrorHandler(input);
  }
}