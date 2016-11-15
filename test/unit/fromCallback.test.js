import { assert } from 'chai';
import fromCallback from '../../src/fromCallback';

describe('fromCallback', function() {
  it('should return a resolved promise', async function() {
    const callbackFn = (arg1, arg2, cb) => {
      cb(null, `${arg1}${arg2}`);
    };
    const result = await fromCallback(cb => callbackFn('bat', 'man', cb));
    assert.equal(result, 'batman');
  });

  it('should return a rejected promise', async function() {
    const err = new Error('uh oh');
    const callbackFn = (arg1, arg2, cb) => {
      cb(err);
    };
    try {
      const result = await fromCallback(cb => callbackFn('bat', 'man', cb));
    } catch (caughtError) {
      assert.equal(caughtError, err);
      return;
    }
    assert(false, 'no error caught');
  });
});