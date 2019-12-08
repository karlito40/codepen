require('module-alias/register')

const { Micro, App, Mongo, Pubsub, Bus } = require('micro');
const { Kast } = require('./models');
const { proxify } = App;

Micro
  .add(Mongo({ url: 'mongodb://mongo:27017/kast' }))
  .add(Pubsub({ url: 'nats://nats:4222' }))
  .add(Bus({ url: 'pulsar://pulsar:6650' }))
  .add(App({ 
    rootDir: __dirname,
    transporter: 'nats://nats:4222',
    services: {
      kast: {
        findOneOrThrow: proxify(Kast.findOneOrThrow.bind(Kast)),
        findOne: proxify(Kast.findOne.bind(Kast)),
        find: proxify(Kast.find.bind(Kast))
      }
    }
  }));

Micro.start();