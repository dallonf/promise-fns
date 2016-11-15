import { assert } from 'chai';
import fromCallback from '../../src/fromCallback';

describe('fromCallback', function() {
  it('should return a resolved promise', async function() {{
    const hasCallback = (arg1, arg2, cb) => {
      cb(null, `${arg1}${arg2}`);
    };
    const result = await fromCallback(cb => hasCallback('bat', 'man', cb));
    assert.equal(result, 'batman');
  }});
});