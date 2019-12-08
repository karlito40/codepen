const mongoose = require('mongoose');
const Mod = require('./Mod');

mongoose.plugin(function install (schema /* , options*/) {
  schema.static('findOneOrThrow', async function (...args) {
    const res = await this.findOne(...args);
    if (!res) {
      throw new Error(`${this.modelName.toUpperCase()}_NOT_FOUND`);
    }

    return res;
  });
});

module.exports = (opts) => new MongoMod('mongo', opts);
module.exports.mongoose = mongoose;
module.exports.ObjectId = mongoose.Types.ObjectId;

class MongoMod extends Mod {
  constructor (key, { url }) {
    super(key);

    this.mongoose = mongoose;
    this.start = this.start.bind(this, { url });
  }

  onBoot () {
    this._prepareLog();
  }

  start ({ url }) {
    return this.mongoose.connect(url, { useNewUrlParser: true });
  }

  stop () {
    return this.mongoose.disconnect();
  }

  _prepareLog () {
    const logger = this.micro.mod('logger');
    this.mongoose.connection.once('open', () => {
      logger.log('MongoDB - connection opened');
    });
  
    this.mongoose.connection.on('connecting', () => {
      logger.log('MongoDB - connecting...');
    });
  
    this.mongoose.connection.on('disconnected', () => {
      logger.log('MongoDB - disconnected');
    });
  
    this.mongoose.connection.on('reconnect', () => {
      logger.log('MongoDB - reconnected');
    });
  
    this.mongoose.connection.on('reconnectFailed', () => {
      logger.log('MongoDB - reconnect FAILED. Sending SIGTERM...');
      this.micro.shutdown();
    });
  }
}
