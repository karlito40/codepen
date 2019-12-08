const cache = {};

export default {
  set: (k, v) => {
    cache[k] = v;
    localStorage.setItem(k, JSON.stringify(cache[k]));
  },
  
  get: (k) => {
    if (cache.hasOwnProperty(k)) {
      return cache[k];
    }
    
    const v = JSON.parse(localStorage.getItem(k));
    cache[k] = v;
    return v;
  }
};