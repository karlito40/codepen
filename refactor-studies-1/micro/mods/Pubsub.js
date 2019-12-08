const NATS = require('nats');
const Mod = require('./Mod');

module.exports = (opts) => new PubsubMod('pubsub', opts);

class PubsubMod extends Mod {
  constructor (key, opts) {
    super(key);
    
    this.transporter = NATS;
    this.client = null;
    this.connected = false;

    this.start = this.start.bind(this, opts);
  }

  start ({ url }) {
    const logger = this.micro.mod('logger');

    return new Promise((resolve, reject) => {
      this.client = this.transporter.connect({ url, json: true });
      this.client.on('connect', () => {
        logger.info('Pubsub - connected.');
        this.connected = true;
        resolve(this);
      });
  
      this.client.on('reconnect', () => {
        logger.info('Pubsub - reconnected.');
        this.connected = true;
      });
  
      this.client.on('disconnect', () => {
        logger.warn('Pubsub - disconnected.');
        this.connected = false;
      });
  
      this.client.on('error', (e) => {
        logger.error('Pubsub - error.', e.message);
        logger.debug(e);

        if (!this.connected) {
          reject(e);
        }
      });
  
      this.client.on('close', () => {
        logger.info('Pubsub - closed');
        this.connected = false;
        // Hint from moleculer: It won't try reconnecting again, so we kill the process.
        // this is what moleculer does !
        this.micro.shutdown();
      });
    });

  }

  stop () {
    return this.client ? this.client.close() : Promise.resolve();
  }

  publish (...args) {
    return this.client.publish(...args);
  }

  subscribe (...args) {
    return this.client.subscribe(...args);
  }

  unsubscribe (...args) {
    return this.client.unsubscribe(...args);
  }
}
