module.exports = function preserveScope(obj, prop) {
  return typeof obj[prop] === 'function' 
        ? obj[prop].bind(obj)
        : obj[prop];
}