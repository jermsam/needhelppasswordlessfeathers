const app = require('../../src/app');

describe('\'smser\' service', () => {
  it('registered the service', () => {
    const service = app.service('smser');
    expect(service).toBeTruthy();
  });
});
