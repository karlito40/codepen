require('module-alias/register')

const { Micro, App, Pubsub, Graph } = require('micro');

Micro
  .add(Pubsub({ url: 'nats://nats:4222' }))
  .add(App({ transporter: 'nats://nats:4222', rootDir: __dirname }))
  .add(Graph({
    typeDefs: require('./schema'),
    resolvers: require('./resolvers')
  }))
  
Micro.start();
