export default {
  _store: {},

  get (k) {
    return this._store[k];
  },

  set (k, v) {
    this._store[k] = v;
  }
}