const Mod = require('./Mod');

module.exports = () => {
  const mod = new Mod('logger');
  Object.entries(console).forEach(([k, v]) => {
  	mod[k] = typeof v === 'function' ? v.bind(k) : v;
  });

  mod.start = () => Promise.resolve();
  mod.stop = () => Promise.resolve();
  return mod;
};