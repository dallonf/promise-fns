import { expect } from 'chai';
import { spy, stub } from 'sinon';
import alwaysAfter from '../../src/alwaysAfter';

describe('alwaysAfter', function() {
  it('should run after promise resolves', async function() {
    const cleanup = spy();
    const result = await alwaysAfter(
      Promise.resolve('batman'),
      cleanup
    );
    expect(result).to.equal('batman');
    expect(cleanup).to.have.been.called();
  });

  it('should run after promise rejects', async function() {
    const err = new Error("Some days you just can't get rid of a bomb!");
    const cleanup = spy();
    try {
      const result = await alwaysAfter(
        Promise.reject(err),
        cleanup
      );
    } catch (caughtErr) {
      expect(caughtErr).to.equal(err);
      expect(cleanup).to.have.been.called();
      return;
    }
    throw new Error('expected to catch an error');
  });

  it('should not run until promise resolves', async function() {
    let resolve;
    const initialPromise = new Promise(_resolve => resolve = _resolve);
    const cleanup = spy();

    const resultPromise = alwaysAfter(initialPromise, cleanup);
    await new Promise(setImmediate); // wait a tick
    expect(cleanup).not.to.have.been.called();
    resolve();
    await resultPromise;
    expect(cleanup).to.have.been.called(); 
  });

  it('should allow asynchronous cleanup', async function() {
    let resolve;
    const initialPromise = Promise.resolve('batman');
    const cleanupPromise = new Promise(_resolve => resolve = _resolve);
    const cleanup = stub().returns(cleanupPromise);
    const after = spy();

    const resultPromise = alwaysAfter(initialPromise, cleanup);
    resultPromise.then(after);
    await initialPromise;
    expect(cleanup).to.have.been.called();
    expect(after).not.to.have.been.called('alwaysAfter result should not have resolved yet');
    resolve('joker');
    const result = await resultPromise;
    expect(after).to.have.been.called();
    expect(result).to.equal('batman');
  });

  it('should propagate errors from callback', async function() {
    const err = new Error("Let's put a smile on that face");
    const cleanup = () => {
      throw err;
    };

    try {
      await alwaysAfter(Promise.resolve('batman'), cleanup);
    } catch (caughtErr) {
      expect(caughtErr).to.equal(err);
      return;
    }
    throw new Error('expected promise to throw');
  });
});