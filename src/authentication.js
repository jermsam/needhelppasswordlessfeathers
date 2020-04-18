const { AuthenticationService, JWTStrategy,authenticate} = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const { iff, disallow } = require('feathers-hooks-common');

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  //  const {authStrategies}=app.get('authentication');
  app.service('authentication').hooks({
    before: {
      create: [
        // Disallows local authentication from external providers
        iff(hook => hook.data.strategy === 'local', disallow('external')),
        // Put the userId onto params.payload so that it gets into the jwt token.
        iff(hook => hook.data.strategy === 'local', hook => {
          const query = { email: hook.data.email };
          return hook.app.service('users').find({ query }).then(users => {
            hook.params.payload = { userId: users.data[0].id };
            return hook;
          });
        }),
        authenticate('jwt')
      ],
      remove: [
        authenticate('jwt')
      ]
    }
  });
};
