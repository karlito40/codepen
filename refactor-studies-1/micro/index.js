const Micro = require('./Micro');
const { preserveScope } = require('./utils');

const _exports = {
  ...require('./mods'),
  Micro
};

module.exports = new Proxy({}, {
  get (_, prop) {
    if (_exports[prop]) {
      return _exports[prop];
    }

    for(const mod of Micro.mods.values()) {
      const customProxy = mod.withProxy(prop);
      if (customProxy) {
        return customProxy;
      }
    }

    return new Proxy({}, {
      get(_, target) {
        const mod = Micro.mod(prop);
        return preserveScope(mod, target);
      }
    });
  }
});