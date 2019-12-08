const { ApolloServer, gql } = require('apollo-server');
const { NatsPubSub } = require('graphql-nats-subscriptions');
const { omit } = require('lodash');
const Mod = require('./Mod');

module.exports = (opts) => new GraphMod('graph', opts);
module.exports.gql = gql;

class GraphMod extends Mod {
  constructor (key, opts) {
    super(key);
    this.onBoot = this.onBoot.bind(this, opts);
  }

  onBoot(apolloOpts) {
    const { context, formatError } = apolloOpts;

    this.pubsub = this.micro.mod('pubsub');
    this.logger = this.micro.mod('logger');

    this.server = new ApolloServer({
      ...apolloOpts,
      formatError: (err) => {
        this.logger.log(err);
        
        const sanitizedError = omit(err, 'extensions.exception.ctx')
        return formatError ? formatError(sanitizedError) : sanitizedError;
      },
      context: (params) => ({
        ...this.pubsub && { pubsub: new NatsPubSub(this.pubsub) },
        ...context && context(params)
      })
    });
  }

  start () {
    return this.server.listen().then(({ url }) => {
      this.logger.info(`🚀  Graph server ready at ${url}`)
    });
  }

  stop () {
    return this.server.stop();
  }
}