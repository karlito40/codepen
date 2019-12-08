require('module-alias/register')

const { Micro, App, Mongo, Pubsub, Bus } = require('micro');

Micro
  .add(Mongo({ url: 'mongodb://mongo:27017/authentication' }))
  .add(Pubsub({ url: 'nats://nats:4222' }))
  .add(Bus({ url: 'pulsar://pulsar:6650' }))
  .add(App({
    rootDir: __dirname,
    transporter: 'nats://nats:4222',
  }));

Micro.start(); 
