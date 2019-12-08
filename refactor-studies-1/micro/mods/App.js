const glob = require('glob');
const { basename } = require('path');
const { merge, partialRight } = require('lodash');
const { ServiceBroker, Errors } = require('moleculer');
const { camelCase } = require('lodash');
const Mod = require('./Mod');

module.exports = (opts) => new AppMod('app', opts);

module.exports.MoleculerError = Errors.MoleculerError;

module.exports.proxify = (f) => async (params) => {
  const args = params && params.__proxy ? params.__proxy : [params];
  return await f(...args);
}

class AppMod extends Mod {
  constructor (key, opts) {
    super(key);
    
    this.options = {
      busMatcher: {
        methods: '**/$*/listeners/!(*.test).js',
        name: /\$(.*?)\//
      },
      serviceMatcher: {
        methods: '**/$*/methods/!(*.test).js',
        name: /\$(.*?)\//
      },
      ...opts
    };
  }

  start () {
    this.broker = new ServiceBroker({
      transporter: this.options.transporter,
      // we cannot filter logs won't works my own logger :/
      // logger: this.micro.mod('logger'),
      skipProcessEventRegistration: true
    });
    
    const { rootDir, services: serviceTemplates, serviceMatcher, busMatcher } = this.options;

    if (busMatcher && this.micro.mod('bus')) {
      this.micro.mod('bus').matchAndListen({
        cwd: rootDir,
        matcher: busMatcher
      });
    }

    if (serviceTemplates || serviceMatcher) {
      const services = buildServices(this.options);
      for (const service of services) {
        this.broker.createService(service);
      }
    }

    return this.broker.start();
  }

  stop () {
    return this.broker.stop();
  }

  async request(...args) {
    const res = await this.broker.call(...args);
    return res;
  }

  emit (event, payload, { volatile = true, persistent = true } = {}) {
    if (volatile) {
      this.micro.mod('pubsub').publish(event, payload);
    }

    if (persistent) {
      this.micro.mod('bus').emit(event, payload);
    }
  }

  makeValidator (schema) {
    return function validate (action) {
      return function actionController (input, ctx) {
        const { error } = schema.validate(input);
        if (error) {
          throw error;
        }
  
        return action(input, ctx);
      }
    }
  }

  withProxy (prop) {
    if (!prop || !prop.startsWith('$')) {
      return false;
    }
    const serviceName = prop.slice(1);
    const makeRequest = (methodName, options) => {
      const request = partialRight(this.request.bind(this, `${serviceName}.${methodName}`), options)
      
      return (...requestArgs) => {
        const requestParams = requestArgs.length > 1 ? { __proxy: requestArgs } : requestArgs[0];
        return request(requestParams);
      };
    }

    return new Proxy({}, {
      get: (_, methodName) => {
        if(methodName === 'opts') {
          return (requestOptions) => new Proxy({}, {
            get: (_, methodName) => makeRequest(methodName, requestOptions)
          });
        }

        return makeRequest(methodName);
      }
    });
  }
}

function buildServices ({ rootDir, serviceMatcher, services: serviceTemplates } = {}) {
  const hooks = {
    error: {
      "*": function(ctx, err) {
        this.logger.error(`Error occurred when '${ctx.action.name}' action was called`, err);
        // Throw further the error
        throw err;
      }
    }
  };

  const matchedServices = serviceMatcher 
    ? matchAndBuild({ matcher: serviceMatcher, cwd: rootDir }, hooks) 
    : {};
    
  const simpleServices = serviceTemplates ? 
    rawBuild(serviceTemplates, hooks)
    : {};

  return Object.values(merge({}, matchedServices, simpleServices));
}

function rawBuild (serviceTemplates, hooks) {
  return Object.entries(serviceTemplates).reduce((acc, [serviceName, actions]) => {
    const actionsEntries = Object.entries(actions)
      .map(([name, action]) => [name, (ctx) => action(ctx.params, ctx)])
    const actionsRevamp = Object.fromEntries(actionsEntries);

    acc[serviceName] = {
      name: serviceName,
      actions: actionsRevamp,
      hooks
    };

    return acc;
  }, {});
}

function matchAndBuild ({ cwd, matcher }, hooks) {
  const files = glob.sync(matcher.methods, { cwd });
  return files.reduce((services, file) => {
    const serviceName = file.match(matcher.name)[1];
    const service = services[serviceName] || {
      name: serviceName,
      actions: {},
      hooks
    };

    const methodName = camelCase(basename(file, '.js'));
    const action = require(`${cwd}/${file}`);
    service.actions[methodName] = (ctx) => action(ctx.params, ctx);
    services[serviceName] = service;
    return services;
  }, {});
}
