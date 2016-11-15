import { expect } from 'chai';
import { spy } from 'sinon';
import toCallback from '../../src/toCallback';

describe('toCallback', function() {
  it('should call the callback with the resolved value', async function() {
    const promise = Promise.resolve('batman');
    const cb = spy();
    await toCallback(promise, cb);
    expect(cb).to.have.been.calledWith(null, 'batman');
  });

  it('should call the callback with the rejected value', async function() {
    const err = new Error("Joke's on you!");
    const promise = Promise.reject(err);
    const cb = spy();
    await toCallback(promise, cb);
    expect(cb).to.have.been.calledWith(err);
  });

  describe('when callback throws errors', function() {
    let uncaughtExceptionHandler;
    let backupHandlers;
    beforeEach(function() {
      uncaughtExceptionHandler = spy();
      backupHandlers = process.listeners('uncaughtException'); 
      backupHandlers.forEach(h => process.removeListener('uncaughtException', h));
      process.addListener('uncaughtException', uncaughtExceptionHandler);
    });

    afterEach(function() {
      process.removeListener('uncaughtException', uncaughtExceptionHandler);
      backupHandlers.forEach(h => process.addListener('uncaughtException', h));
    })

    it('should not swallow errors in the callback on the resolve path', async function() {
      const err = new Error("Gotham is ashes"); 
      const promise = Promise.resolve('batman');
      const cb = () => {
        throw err;
      };
      await toCallback(promise, cb);
      expect(uncaughtExceptionHandler).to.have.been.calledWith(err);
    });

    it('should not swallow errors in the callback on the reject path', async function() {
      const err = new Error("Gotham is ashes"); 
      const promise = Promise.reject(new Error("Joke's on you!"));
      const cb = () => {
        throw err;
      };
      await toCallback(promise, cb);
      expect(uncaughtExceptionHandler).to.have.been.calledWith(err);
    });
  });
});