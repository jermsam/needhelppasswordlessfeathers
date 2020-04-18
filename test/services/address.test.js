const app = require('../../src/app');

describe('\'address\' service', () => {
  it('registered the service', () => {
    const service = app.service('address');
    expect(service).toBeTruthy();
  });
});
