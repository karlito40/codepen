const { Micro, App, Pubsub, Bus } = require('micro');

Micro
  .add(Pubsub({ url: 'nats://localhost:4222' }))
  .add(Bus({ url: 'pulsar://localhost:6650' }))
  .add(App({ 
    rootDir: __dirname,
    transporter: 'nats://localhost:4222',
  }));

Micro.start().then(async () => {
  // proxies are not ready before initialization
  // petit gotcha suite à la nouvelle facon d'exporter les trucs (Micro.$svc feature has been removed)
  const { $kast, app } = require('micro');
  
  const kast = await $kast.findOne();
  app.emit('participant.join', { kastId: kast.id, userId: 'zidhzi' });
  Micro.stop();
});