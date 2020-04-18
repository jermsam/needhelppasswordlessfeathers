// Initializes the `address` service on path `/address`
const { Address } = require('./address.class');
const createModel = require('../../models/address.model');
const hooks = require('./address.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/address', new Address(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('address');

  service.hooks(hooks);
};
