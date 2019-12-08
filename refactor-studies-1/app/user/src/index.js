require('module-alias/register')

const { Micro, App, Mongo, Pubsub, Bus } = require('micro');
const { User } = require('./models');
const { proxify } = App;

Micro
  .add(Mongo({ url: 'mongodb://mongo:27017/user' }))
  .add(Pubsub({ url: 'nats://nats:4222' }))
  .add(Bus({ url: 'pulsar://pulsar:6650' }))
  .add(App({ 
    rootDir: __dirname,
    transporter: 'nats://nats:4222',
    services: {
      // ca serait plus cool d'avoir un App().injectModel(User, MonDocument, etc...)
      user: {
        findOneOrThrow: proxify(User.findOneOrThrow.bind(User)),
        findOne: proxify(User.findOne.bind(User)),
        find: proxify(User.find.bind(User))
      }
    }
  }));

Micro.start();