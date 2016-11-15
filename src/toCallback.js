import unswallowErrors from './unswallowErrors';

export default function toCallback(promise, cb) {
  return promise.then(
    result => { cb(null, result); },
    err => { cb(err); }
  ).catch(unswallowErrors);
}