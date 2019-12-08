const glob = require('glob');
const Pulsar = require('pulsar-client');
const { basename } = require('path');
const Mod = require('./Mod');

module.exports = (opts) => new BusMod('bus', opts);

class BusMod extends Mod {
  constructor (key, opts) {
    super(key);
    
    this.producers = {};
    this.consumers = {};

    this.onBoot = this.onBoot.bind(this, opts);
  }

  onBoot ({ url }) {
    this.logger = this.micro.mod('logger');
    
    this.client = new Pulsar.Client({
      serviceUrl: url,
      operationTimeoutSeconds: 30,
    });
  }

  async start () {
    // hack
    await this.emit('__etablished_connection__', {});
    return this._removeProducer('__etablished_connection__');
  }

  stop () {
    return this.client.close();
  }

  async emit (event, payload = {}) {
    this.logger.log('[Bus] emit', event, payload);
    
    const producer = await this._getOrCreateProducer(event);
    return producer.send({
      data: Buffer.from(JSON.stringify(payload))
    });
  }

  async on (groupId, event, cb) {
    const consumer = await this._createConsumer(groupId, `persistent://public/default/${event}`);
  
    do {
      const msg = await consumer.receive()
      this.logger.log('[Bus] received', event);
      
      let data = msg.getData().toString();
      try {
        data = JSON.parse(data);
      } catch (e) {}

      // use acknowledgeId instead
      const ack = () => consumer.acknowledge(msg);
      cb(data, ack);
    } while(true);
  }

  matchAndListen ({ cwd, matcher }) {
    const files = glob.sync(matcher.methods, { cwd });
    files.forEach((file) => {
      const groupId = file.match(matcher.name)[1];
      const eventName = basename(file, '.js');
      const handler = require(`${cwd}/${file}`);
      
      this.on(groupId, eventName, handler);
    }, {});
  }

  async _createConsumer (groupId, topic) {
    const consumerId = `${groupId}-${topic}`;
    if (this.consumers[consumerId]) {
      throw new Error('Multiple subscriber are not support (if you really need it, you will have to create a subscriber for each callback)');
    }

    this.logger.log('[Bus] create consumer for', groupId, 'on', topic);

    return this.consumers[consumerId] = this.client.subscribe({
      topic,
      subscription: groupId,
      subscriptionType: 'Shared',
      ackTimeoutMs: 10000,
    });
  }

  async _getOrCreateProducer (topic) {
    if (this.producers[topic]) {
      return this.producers[topic];
    }
  
    return this.producers[topic] = await this.client.createProducer({ topic });
  }

  async _removeProducer (topic) {
    const res = await this.producers[topic].close();

    this.producers[topic] = null;
    delete this.producers[topic];
    
    return res;
  }
}
