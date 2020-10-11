const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    hello (msg: String): Hello
  }

  type Hello {
    id: Int
    msg: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: (_, { msg }) => ({
      id: '3213',
      msg: msg
    }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});