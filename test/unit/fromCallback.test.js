import { expect } from 'chai';
import fromCallback from '../../src/fromCallback';

describe('fromCallback', function() {
  it('should return a resolved promise', async function() {
    const callbackFn = (arg1, arg2, cb) => {
      cb(null, `${arg1}${arg2}`);
    };
    const result = await fromCallback(cb => callbackFn('bat', 'man', cb));
    expect(result).to.equal('batman');
  });

  it('should return a rejected promise', async function() {
    const err = new Error('uh oh');
    const callbackFn = (arg1, arg2, cb) => {
      cb(err);
    };
    try {
      const result = await fromCallback(cb => callbackFn('bat', 'man', cb));
    } catch (caughtError) {
      expect(caughtError).to.equal(caughtError);
      return;
    }
    throw new Error('no error caught');
  });

  it('should return an array if the response has multiple arguments', async function() {
    const callbackFn = (cb) => {
      cb(null, 'alfred', 'robin', 'oracle');
    };
    const result = await fromCallback(cb => callbackFn(cb));
    expect(result).to.deep.equal(['alfred', 'robin', 'oracle']);
  });
});