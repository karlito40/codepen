const { partialRight } = require('lodash')

const broker = {
  call (action, args, options) {
    return { action, args, options };
  }
}

const lib = {
  broker,
  request (...args) {
    return this.broker.call(...args);
  },
  withProxy (prop) {
    if (!prop || !prop.startsWith('$')) {
      return false;
    }

    const serviceName = prop.slice(1);
    return new Proxy({}, {
      get: (_, methodName) => {
        if(methodName === 'opts') {
          return (requestOptions) => new Proxy({}, {
            get(_, methodName) {
              const request = lib.request.bind(lib, `${serviceName}.${methodName}`);
              return partialRight(request, requestOptions);
            }
          });
        }

        return lib.request.bind(lib, `${serviceName}.${methodName}`);
      }
    });
  }
}
