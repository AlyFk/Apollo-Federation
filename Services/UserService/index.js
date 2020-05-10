const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const { users } = require("../../data");

const port = 4001;

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String
  }
  extend type Query {
    user(id: ID!): User
    users: [User]
  }
`;

const resolvers = {
    User: {
    __resolveReference(object) {
      return users.find((user) => user.id === object.id);
    },
  },
  Query: {
    user(_, { id }) {
      return users.find((user) => user.id === id);
    },
    users() {
      return users;
    },
  },
};

const server = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});

server.listen({ port }).then(({ url }) => {
  console.log(`People service ready at ${url}`);
});