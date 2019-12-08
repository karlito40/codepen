const logger = require('./mods/Logger')();

let Micro;
module.exports = Micro = {
  // well well we should rewrite everything but i have no time
  mods: new Map([[logger.key, logger]]),

  add (mod) {
    mod.boot(this);
    this.mods.set(mod.key, mod);

    return this;
  },

  replace (targetedKey, mod) {
    if (this.mod(targetedKey)) {
      this.mod(targetedKey).stop();
      this.mod(targetedKey).delete()
    }
    
    return this.add(mod);
  },

  async start () {
    for (const mod of this.mods.values()) {
      await mod.start();
    }

    return this;
  },
  
  async stop () {
    for (const mod of this.mods.values()) {
      await mod.stop();
    }

    return this;
  },

  async shutdown () {
    return this.stop()
      .catch((err) => this.mod('logger').error(err))
      .then(() => process.exit(0));   
  },

  mod (modId) {
    return this.mods.get(modId);
  }
};

const shutdown = Micro.shutdown.bind(Micro);

process.on("beforeExit", shutdown);
process.on("exit", shutdown);
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// gracefulll shutdown for nodemon
process.once('SIGUSR2', async () => {
  await Micro.stop();
  process.kill(process.pid, 'SIGUSR2');
});