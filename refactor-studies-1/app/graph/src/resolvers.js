const GraphQLJSON = require('graphql-type-json');
const { $auth, $kast } = require('micro');
const { withFilter } = require('graphql-subscriptions');

module.exports = {
  JSON: GraphQLJSON,

  Query: {
    getMe: (root, { token }) => $auth.getMe({ token }),
    // we should define permission on attribute and use something like $kast.read(d?ql)
    getKasts: (root, { userId }) => $kast.find({ userId }),
    getKast: (root, { kastId: _id }) => $kast.findOne({ _id })
  },

  Mutation: {
    createKast: (root, { input }) => $kast.create(input),
    duplicateKast: (root, { kastId }) => $kast.duplicate({ kastId }),
    registerAuth: (root, { input }) => $auth.register(input),
    login: (root, { input }) => $auth.login(input)
  },

  Subscription: {
    kastUpdated: {
      subscribe:  withFilter(
        (root, args, { pubsub }) => pubsub.asyncIterator('kast.updated'),
        (payload, variables) => payload.id === variables.kastId
      ),
      resolve: (event) => ({
        ...event,
        _changes_: Object.keys(event).filter(k => k !== 'id')
      })
    },
    slideUpdated: {
      subscribe:  withFilter(
        (root, args, { pubsub }) => pubsub.asyncIterator('slide.updated'),
        (payload, variables) => payload.kastId === variables.kastId
      ),
      resolve: (event) => event
    }
  },
};