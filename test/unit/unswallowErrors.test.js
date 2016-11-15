import { expect } from 'chai';
import { spy } from 'sinon';
import unswallowErrors from '../../src/unswallowErrors';

describe('unswallowErrors', function() {
    const err = new Error('WHY DID YOU SAY THAT NAAAAME');

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
    });

    it('should rethrow errors when used as a catch handler', async function () {
      await Promise.reject(err)
        .catch(unswallowErrors);
      expect(uncaughtExceptionHandler).to.have.been.calledWith(err);
    });

    it('should be a no-op when used as a catch handler', async function () {
      await Promise.resolve('Martha')
        .catch(unswallowErrors);
      expect(uncaughtExceptionHandler).not.to.have.been.called();
    });

    it('should rethrow errors when used as a function', async function () {
      await unswallowErrors(Promise.reject(err));
      expect(uncaughtExceptionHandler).to.have.been.calledWith(err);
    });

    it('should be a no-op when used as a catch handler', async function () {
      await unswallowErrors(Promise.resolve('Martha'));
      expect(uncaughtExceptionHandler).not.to.have.been.called();
    });

});